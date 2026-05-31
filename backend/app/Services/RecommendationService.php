<?php

namespace App\Services;

use App\Models\Produk;
use App\Models\HistoriAktivitas;
use App\Models\Pelanggan;
use App\Models\ItemPesanan;
use App\Models\Ulasan;
use Illuminate\Support\Facades\DB;

class RecommendationService
{
    const ACTION_WEIGHTS = [
        'view' => 0.3,
        'click' => 0.5,
        'add_to_cart' => 0.8,
        'purchase' => 1.0,
        'like' => 0.7,
        'wishlist' => 0.6,
        'review' => 0.9,
    ];

    /**
     * Get personalized recommendations for a user
     */
    public function getRecommendations(int $userId, int $limit = 10): array
    {
        $pelanggan = Pelanggan::where('user_id', $userId)->first();
        if (!$pelanggan) {
            return $this->getPopularProducts($limit);
        }

        $userProducts = $this->getUserProductMatrix($pelanggan->id);
        $totalInteractions = array_sum(array_column($userProducts, 'bobot'));
        
        // If user has few interactions, use popularity-based fallback
        if ($totalInteractions < 1.0) {
            return $this->getPopularProducts($limit);
        }

        // Get Content-Based recommendations
        $cbfScores = $this->getContentBasedScores($pelanggan->id, $userProducts);
        
        // Get Collaborative Filtering recommendations
        $cfScores = $this->getCollaborativeFilteringScores($pelanggan->id);

        // Calculate alpha for weighted hybrid
        $alpha = $this->calculateAlpha($totalInteractions);

        // Combine scores: weighted hybrid
        $hybridScores = [];
        $allProductIds = array_unique(array_merge(array_keys($cbfScores), array_keys($cfScores)));

        foreach ($allProductIds as $productId) {
            $cbfScore = $cbfScores[$productId] ?? 0;
            $cfScore = $cfScores[$productId] ?? 0;
            $hybridScores[$productId] = ($alpha * $cbfScore) + ((1 - $alpha) * $cfScore);
        }

        // Exclude already purchased/interacted products
        $excludedIds = array_column($userProducts, 'produk_id');

        // Sort and limit
        arsort($hybridScores);
        $recommendedIds = array_diff(array_keys($hybridScores), $excludedIds);
        $recommendedIds = array_slice($recommendedIds, 0, $limit);

        return Produk::whereIn('id', $recommendedIds)
            ->with(['gambarUtama', 'ulasans'])
            ->get()
            ->toArray();
    }

    /**
     * Get popular products as fallback
     */
    public function getPopularProducts(int $limit = 10): array
    {
        return Produk::withCount(['itemPesanans as total_terjual' => function($q) {
                $q->select(DB::raw('COALESCE(SUM(kuantitas), 0)'));
            }])
            ->orderBy('total_terjual', 'desc')
            ->orderBy('rating_rata_rata', 'desc')
            ->limit($limit)
            ->get()
            ->toArray();
    }

    /**
     * Build user-product interaction matrix for a specific user
     */
    private function getUserProductMatrix(int $pelangganId): array
    {
        // Get interaction history
        $history = HistoriAktivitas::where('pelanggan_id', $pelangganId)
            ->whereNotNull('produk_terkait')
            ->get();

        $productScores = [];
        foreach ($history as $h) {
            $weight = self::ACTION_WEIGHTS[$h->jenis_aktivitas] ?? 0.3;
            $prodId = (int) $h->produk_terkait;
            if (!isset($productScores[$prodId])) {
                $productScores[$prodId] = 0;
            }
            $productScores[$prodId] += $weight;
        }

        // Also get purchase history
        $purchases = ItemPesanan::select('produk_id', DB::raw('SUM(kuantitas) as total'))
            ->join('pesanans', 'item_pesanans.pesanan_id', '=', 'pesanans.id')
            ->where('pesanans.pelanggan_id', $pelangganId)
            ->groupBy('produk_id')
            ->get();

        foreach ($purchases as $p) {
            $prodId = (int) $p->produk_id;
            if (!isset($productScores[$prodId])) {
                $productScores[$prodId] = 0;
            }
            $productScores[$prodId] += $p->total * 1.0; // purchase weight
        }

        $result = [];
        foreach ($productScores as $prodId => $score) {
            $result[] = ['produk_id' => $prodId, 'bobot' => $score];
        }

        return $result;
    }

    /**
     * Content-Based Filtering: recommends products similar to what user liked
     */
    private function getContentBasedScores(int $pelangganId, array $userProducts): array
    {
        if (empty($userProducts)) {
            return [];
        }

        // Get categories user interacted with
        $productIds = array_column($userProducts, 'produk_id');
        $userProductsData = Produk::whereIn('id', $productIds)->get();
        $preferredCategories = $userProductsData->pluck('kategori')->filter()->unique()->values()->toArray();

        // Find similar products in same category
        $similarProducts = Produk::whereIn('kategori', $preferredCategories)
            ->whereNotIn('id', $productIds)
            ->get();

        $scores = [];
        foreach ($similarProducts as $product) {
            // Simple category-based similarity with popularity boost
            $categoryMatch = in_array($product->kategori, $preferredCategories) ? 0.6 : 0;
            $popularity = min($product->rating_rata_rata / 5, 1) * 0.4;
            $scores[$product->id] = $categoryMatch + $popularity;
        }

        return $scores;
    }

    /**
     * Collaborative Filtering: recommends products liked by similar users
     */
    private function getCollaborativeFilteringScores(int $pelangganId): array
    {
        // Get user purchased product IDs
        $userProductIds = ItemPesanan::select('produk_id')
            ->join('pesanans', 'item_pesanans.pesanan_id', '=', 'pesanans.id')
            ->where('pesanans.pelanggan_id', $pelangganId)
            ->pluck('produk_id')
->toArray();

        // Find other users who bought similar products
        $similarUserIds = ItemPesanan::select('pesanans.pelanggan_id')
            ->join('pesanans', 'item_pesanans.pesanan_id', '=', 'pesanans.id')
            ->whereIn('item_pesanans.produk_id', $userProductIds)
            ->where('pesanans.pelanggan_id', '!=', $pelangganId)
            ->groupBy('pesanans.pelanggan_id')
            ->pluck('pesanans.pelanggan_id')
->toArray();

        if (empty($similarUserIds)) {
            return [];
        }

        // Get products bought by similar users
        $recommendedProducts = ItemPesanan::select('produk_id', DB::raw('SUM(kuantitas) as total'))
            ->join('pesanans', 'item_pesanans.pesanan_id', '=', 'pesanans.id')
            ->whereIn('pesanans.pelanggan_id', $similarUserIds)
            ->whereNotIn('item_pesanans.produk_id', $userProductIds)
            ->groupBy('produk_id')
            ->get();

        $scores = [];
        foreach ($recommendedProducts as $item) {
            $scores[$item->produk_id] = min($item->total / 10, 1); // normalized score
        }

        return $scores;
    }

    /**
     * Calculate alpha using diminishing returns formula
     * alpha = 1 - (1 / (|x| + 1))
     * where x = total_interactions * learning_rate
     */
    private function calculateAlpha(float $totalInteractions, float $learningRate = 0.1): float
    {
        $x = $totalInteractions * $learningRate;
        $x = abs($x);
        return 1 - (1 / ($x + 1));
    }
}