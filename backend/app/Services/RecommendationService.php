<?php

namespace App\Services;

use App\Models\Produk;
use App\Models\HistoriAktivitas;
use App\Models\Pelanggan;
use App\Models\ItemPesanan;
use App\Enums\ActivityWeight;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

/**
 * Sistem Rekomendasi Hybrid (CBF + CF)
 * Implementasi sesuai dokumen CP300 Dona Cake
 *
 * Alur utama:
 *  1. Bangun matriks R (user-item) dari histori_aktivitas → normalisasi min-max per baris
 *  2. Bangun matriks F (fitur produk: TF-IDF teks + one-hot kategori + harga + stok) → normalisasi per baris
 *  3. CBF  : S = F·Fᵀ,  R(CBF) = R · S
 *  4. CF   : user-based KNN → Rij = Σ R_uj·sim(u,i) / Σ sim(u,i)
 *  5. Alpha: αi = 1 − e^(−λ·Ii)
 *  6. Hybrid: Rij(Hybrid) = (1−α)·R(CF) + α·R(CBF)
 */
class RecommendationService
{
    // Bobot interaksi sesuai Tabel 29 CP300
    // Now using ActivityWeight enum instead of constant array

    // Parameter laju alpha (λ ∈ [0,1])
    const LAMBDA = 0.1;

    // Jumlah tetangga untuk KNN collaborative filtering
    const KNN_K = 10;

    // TTL cache rekomendasi per user (menit)
    const CACHE_TTL_MINUTES = 30;

    // =========================================================================
    // PUBLIC API
    // =========================================================================

    /**
     * Rekomendasi personal untuk user terautentikasi.
     * Hasil di-cache selama CACHE_TTL_MINUTES menit.
     */
    public function getRecommendations(int $userId, int $limit = 10): array
    {
        if (!$userId)
        {
            return $this->getPopularProducts();
        }
        $pelanggan = Pelanggan::where('user_id', $userId)->first();
        if (!$pelanggan) {
            return $this->getPopularProducts($limit);
        }

        $cacheKey = "rekomendasi_pelanggan_{$pelanggan->id}";

        return Cache::remember($cacheKey, now()->addMinutes(self::CACHE_TTL_MINUTES), function () use ($pelanggan, $limit) {
            return $this->computeRecommendations($pelanggan->id, $limit);
        });
    }

    /**
     * Produk populer — fallback cold start atau endpoint publik.
     */
    public function getPopularProducts(int $limit = 10): array
    {
        $products = Produk::withCount(['itemPesanans as total_terjual' => function ($q) {
                $q->select(DB::raw('COALESCE(SUM(kuantitas), 0)'));
            }])
            ->orderBy('total_terjual', 'desc')
            ->orderBy('rating_rata_rata', 'desc')
            ->limit($limit)
            ->with(['gambarUtama', 'ulasans'])
            ->get();

        // If no popular products found, return random products as ultimate fallback
        if ($products->isEmpty()) {
            return $this->getRandomProducts($limit);
        }

        return $products->toArray();
    }

    /**
     * Produk acak — fallback terakhir jika tidak ada produk populer.
     */
    public function getRandomProducts(int $limit = 10): array
    {
        return Produk::inRandomOrder()
            ->limit($limit)
            ->with(['gambarUtama', 'ulasans'])
            ->get()
            ->toArray();
    }

    /**
     * Hapus cache rekomendasi satu user.
     * Dipanggil dari HistoriAktivitasController setelah aktivitas baru dicatat.
     */
    public function invalidateCache(int $pelangganId): void
    {
        Cache::forget("rekomendasi_pelanggan_{$pelangganId}");
    }

    // =========================================================================
    // CORE: COMPUTE RECOMMENDATIONS
    // =========================================================================

    private function computeRecommendations(int $pelangganId, int $limit): array
    {
        // --- 1. Matriks R user-item (hanya baris milik user ini) ---
        $rawScores = $this->buildUserRawScores($pelangganId);   // [produk_id => skor mentah]

        if (empty($rawScores) || array_sum($rawScores) < 0.1) {
            return $this->getPopularProducts($limit);
        }

        // Normalisasi R per baris (sesuai CP300: min-max per user/row)
        $rUser = $this->minMaxNormalize($rawScores);            // [produk_id => [0,1]]

        $totalInteractions = count($rawScores);  // Ii = jumlah produk yang pernah diinteraksi

        // --- 2. Matriks F fitur produk ---
        $allProducts = Produk::with('kategori')->get();
        [$featureMatrix, $productIds] = $this->buildFeatureMatrix($allProducts);
        // featureMatrix: [ produk_id => [fitur_vector yang sudah dinormalisasi per baris] ]

        // --- 3. CBF: S = F·Fᵀ, R(CBF) = R · S ---
        $cbfScores = $this->computeCBF($rUser, $featureMatrix, $productIds);

        // --- 4. CF: user-based KNN ---
        $cfScores = $this->computeCF($pelangganId, $rUser, $productIds);

        // --- 5. Alpha sesuai CP300: αi = 1 − e^(−λ·Ii) ---
        $alpha = $this->calculateAlpha($totalInteractions);

        // --- 6. Hybrid: (1−α)·CF + α·CBF ---
        $interactedIds = array_keys($rawScores);
        $hybridScores  = [];

        foreach ($productIds as $pid) {
            if (in_array($pid, $interactedIds)) {
                continue; // jangan rekomendasikan yang sudah diinteraksi
            }
            $cbf = $cbfScores[$pid] ?? 0.0;
            $cf  = $cfScores[$pid]  ?? 0.0;
            $hybridScores[$pid] = (1 - $alpha) * $cf + $alpha * $cbf;
        }

        arsort($hybridScores);
        $topIds = array_slice(array_keys($hybridScores), 0, $limit);

        if (empty($topIds)) {
            return $this->getRandomProducts($limit);
        }

        // Kembalikan dalam urutan skor tertinggi
        $products = Produk::whereIn('id', $topIds)
            ->with(['gambarUtama', 'ulasans'])
            ->get()
            ->keyBy('id');

        return collect($topIds)
            ->map(fn ($id) => $products->get($id))
            ->filter()
            ->values()
            ->toArray();
    }

    // =========================================================================
    // STEP 1 — MATRIKS R: USER-ITEM INTERACTION
    // =========================================================================

    /**
     * Bangun skor mentah user terhadap produk dari histori_aktivitas + item_pesanans.
     * Rij = Σ w_a  untuk setiap aksi a pada pasangan (user_i, produk_j)
     *
     * @return array [produk_id => float skor mentah]
     */
    private function buildUserRawScores(int $pelangganId): array
    {
        $scores = [];

        // Dari histori_aktivitas (view, click, add_to_cart, like, wishlist, review)
        $history = HistoriAktivitas::where('pelanggan_id', $pelangganId)
            ->whereNotNull('produk_terkait')
            ->get();

        foreach ($history as $h) {
            $w   = ActivityWeight::getWeight($h->jenis_aktivitas);
            $pid = (int) $h->produk_terkait;
            $scores[$pid] = ($scores[$pid] ?? 0) + $w;
        }

        // Dari item_pesanans (purchase) — bobot 1.0 per unit kuantitas
        $purchases = ItemPesanan::select('produk_id', DB::raw('SUM(kuantitas) as total'))
            ->join('pesanans', 'item_pesanans.pesanan_id', '=', 'pesanans.id')
            ->where('pesanans.pelanggan_id', $pelangganId)
            ->groupBy('produk_id')
            ->get();

        foreach ($purchases as $p) {
            $pid = (int) $p->produk_id;
            // purchase sudah tercatat di histori juga, tapi item_pesanans bisa punya sinyal lebih
            // Tambahkan bobot order × kuantitas (sesuai bobot order = 1.0)
            $scores[$pid] = ($scores[$pid] ?? 0) + ($p->total * ActivityWeight::getWeight('order'));
        }

        return $scores;
    }

    // =========================================================================
    // STEP 2 — MATRIKS F: FITUR PRODUK
    // =========================================================================

    /**
     * Bangun matriks fitur F (TF-IDF teks + one-hot kategori + harga + stok),
     * lalu normalisasi min-max per baris (per produk).
     *
     * @return array  [featureMatrix, productIds]
     *                featureMatrix: [produk_id => float[]]
     *                productIds   : int[]
     */
    private function buildFeatureMatrix($allProducts): array
    {
        // --- Kumpulkan semua kategori unik untuk one-hot ---
        $allKategoriIds = $allProducts
            ->pluck('kategori_id')
            ->filter()
            ->unique()
            ->sort()
            ->values()
            ->toArray();

        // --- TF-IDF dari nama_produk + deskripsi ---
        $corpus = [];
        foreach ($allProducts as $p) {
            $text = strtolower(($p->nama_produk ?? '') . ' ' . ($p->deskripsi ?? ''));
            $corpus[$p->id] = $this->tokenize($text);
        }
        $idf = $this->computeIdf($corpus);

        // --- Bangun vektor fitur mentah per produk ---
        $rawFeatures = [];
        $maxHarga    = $allProducts->max('harga') ?: 1;
        $maxStok     = $allProducts->max('stok')  ?: 1;

        foreach ($allProducts as $p) {
            $vector = [];

            // (a) TF-IDF vektor (satu nilai per term di IDF, ambil rata-rata TF-IDF sebagai fitur skalar)
            //     Untuk efisiensi PHP, kita ringkas jadi satu fitur: mean TF-IDF kata-kata produk ini
            $tf    = $this->computeTf($corpus[$p->id]);
            $tfidf = 0.0;
            foreach ($tf as $term => $tfVal) {
                $tfidf += $tfVal * ($idf[$term] ?? 0);
            }
            $vector[] = $tfidf;  // fitur teks teragregasi

            // (b) One-hot kategori
            foreach ($allKategoriIds as $katId) {
                $vector[] = ($p->kategori_id === $katId) ? 1.0 : 0.0;
            }

            // (c) Harga dan stok (normalisasi global agar skala wajar)
            $vector[] = $maxHarga > 0 ? ($p->harga  / $maxHarga) : 0.0;
            $vector[] = $maxStok  > 0 ? ($p->stok   / $maxStok)  : 0.0;

            $rawFeatures[$p->id] = $vector;
        }

        // --- Normalisasi F min-max per baris (per produk) sesuai CP300 ---
        $featureMatrix = [];
        foreach ($rawFeatures as $pid => $vec) {
            $featureMatrix[$pid] = $this->minMaxNormalizeVector($vec);
        }

        $productIds = array_keys($featureMatrix);

        return [$featureMatrix, $productIds];
    }

    // =========================================================================
    // STEP 3 — CONTENT-BASED FILTERING
    // =========================================================================

    /**
     * R(CBF) = R · S,  dimana S = F · Fᵀ  (item-item similarity)
     *
     * Untuk user spesifik:
     *   cbfScore_j = Σ_k  R_ik · S_kj
     *              = Σ_k  R_ik · (F_k · F_j)
     *
     * @param  array $rUser        [produk_id => bobot ternormalisasi] (hanya produk yang pernah diinteraksi)
     * @param  array $featureMatrix [produk_id => float[]]
     * @param  array $productIds   int[]
     * @return array [produk_id => float skor CBF]
     */
    private function computeCBF(array $rUser, array $featureMatrix, array $productIds): array
    {
        $cbfScores = [];

        foreach ($productIds as $j) {
            $fj    = $featureMatrix[$j] ?? [];
            $score = 0.0;

            // Σ_k R_ik · (F_k · F_j)
            foreach ($rUser as $k => $rik) {
                $fk     = $featureMatrix[$k] ?? [];
                $score += $rik * $this->dotProduct($fk, $fj);
            }

            $cbfScores[$j] = $score;
        }

        // Normalisasi output CBF ke [0,1]
        return $this->minMaxNormalize($cbfScores);
    }

    // =========================================================================
    // STEP 4 — COLLABORATIVE FILTERING (user-based KNN)
    // =========================================================================

    /**
     * CF user-based KNN sesuai CP300:
     *   Rij = Σ_{u∈Ni} R_uj · sim(u,i) / Σ_{u∈Ni} sim(u,i)
     *
     * sim(u,i) = cosine similarity antara baris u dan baris i di matriks R.
     *
     * @param  array $rUser      [produk_id => bobot ternormalisasi] — baris user target (i)
     * @param  array $productIds int[]
     * @return array [produk_id => float skor CF]
     */
    private function computeCF(int $pelangganId, array $rUser, array $productIds): array
    {
        // Ambil semua baris R dari user LAIN (hanya user yang pernah berinteraksi)
        $otherHistory = HistoriAktivitas::select('pelanggan_id', 'produk_terkait', DB::raw('SUM(bobot_interaksi) as total_bobot'))
            ->where('pelanggan_id', '!=', $pelangganId)
            ->whereNotNull('produk_terkait')
            ->groupBy('pelanggan_id', 'produk_terkait')
            ->get();

        if ($otherHistory->isEmpty()) {
            return [];
        }

        // Bangun matriks R semua user lain: [pelanggan_id => [produk_id => bobot]]
        $allUserRows = [];
        foreach ($otherHistory as $row) {
            $uid = (int) $row->pelanggan_id;
            $pid = (int) $row->produk_terkait;
            $allUserRows[$uid][$pid] = ($allUserRows[$uid][$pid] ?? 0) + (float) $row->total_bobot;
        }

        // Normalisasi tiap baris user lain
        $allUserRowsNorm = [];
        foreach ($allUserRows as $uid => $scores) {
            $allUserRowsNorm[$uid] = $this->minMaxNormalize($scores);
        }

        // Hitung cosine similarity antara user target dan setiap user lain
        $similarities = [];
        foreach ($allUserRowsNorm as $uid => $rOther) {
            $sim = $this->cosineSimilarity($rUser, $rOther);
            if ($sim > 0) {
                $similarities[$uid] = $sim;
            }
        }

        if (empty($similarities)) {
            return [];
        }

        // Ambil K tetangga terdekat
        arsort($similarities);
        $neighbors = array_slice($similarities, 0, self::KNN_K, true);

        // Rij = Σ R_uj·sim(u,i) / Σ sim(u,i)
        $cfScores  = [];
        $simSum    = array_sum($neighbors);

        foreach ($productIds as $j) {
            $weighted = 0.0;
            foreach ($neighbors as $uid => $sim) {
                $weighted += ($allUserRowsNorm[$uid][$j] ?? 0) * $sim;
            }
            $cfScores[$j] = $simSum > 0 ? $weighted / $simSum : 0.0;
        }

        // Normalisasi output CF ke [0,1]
        return $this->minMaxNormalize($cfScores);
    }

    // =========================================================================
    // STEP 5 — ALPHA
    // =========================================================================

    /**
     * αi = 1 − e^(−λ · Ii)
     * Semakin banyak interaksi → α mendekati 1 → CBF semakin dominan.
     * Sesuai rumus CP300 Bab 3.4.2.
     */
    private function calculateAlpha(int $totalInteractions): float
    {
        return 1.0 - exp(-self::LAMBDA * $totalInteractions);
    }

    // =========================================================================
    // HELPERS — TF-IDF
    // =========================================================================

    private function tokenize(string $text): array
    {
        // Bersihkan karakter non-alfanumerik, split by spasi
        $text   = preg_replace('/[^a-z0-9\s]/', '', $text);
        $tokens = preg_split('/\s+/', trim($text), -1, PREG_SPLIT_NO_EMPTY);
        return $tokens ?: [];
    }

    /**
     * TF: jumlah kemunculan term / total kata dalam dokumen
     * @return array [term => float]
     */
    private function computeTf(array $tokens): array
    {
        if (empty($tokens)) {
            return [];
        }
        $count = array_count_values($tokens);
        $total = count($tokens);
        return array_map(fn ($c) => $c / $total, $count);
    }

    /**
     * IDF: log(N / df_t)
     * @param  array $corpus [produk_id => tokens[]]
     * @return array [term => float]
     */
    private function computeIdf(array $corpus): array
    {
        $n   = count($corpus);
        $df  = [];

        foreach ($corpus as $tokens) {
            foreach (array_unique($tokens) as $term) {
                $df[$term] = ($df[$term] ?? 0) + 1;
            }
        }

        $idf = [];
        foreach ($df as $term => $docFreq) {
            $idf[$term] = log($n / max($docFreq, 1));
        }

        return $idf;
    }

    // =========================================================================
    // HELPERS — NORMALISASI & ALJABAR
    // =========================================================================

    /**
     * Min-max normalisasi array asosiatif [key => float] → [key => float ∈ [0,1]]
     * Sesuai Rij = (Rij - min) / (max - min) dari CP300.
     */
    private function minMaxNormalize(array $scores): array
    {
        if (empty($scores)) {
            return [];
        }

        $min = min($scores);
        $max = max($scores);

        if ($max === $min) {
            // Semua nilai sama → beri 1.0 (relatif maksimal dalam konteks ini)
            return array_map(fn () => 1.0, $scores);
        }

        return array_map(fn ($v) => ($v - $min) / ($max - $min), $scores);
    }

    /**
     * Min-max normalisasi array vektor [float] → [float ∈ [0,1]]
     * Dipakai untuk normalisasi baris matriks F per produk.
     */
    private function minMaxNormalizeVector(array $vec): array
    {
        if (empty($vec)) {
            return [];
        }

        $min = min($vec);
        $max = max($vec);

        if ($max === $min) {
            return array_fill(0, count($vec), 1.0);
        }

        return array_map(fn ($v) => ($v - $min) / ($max - $min), $vec);
    }

    /**
     * Dot product dua vektor.
     * Vektor pendek dipad dengan 0.
     */
    private function dotProduct(array $a, array $b): float
    {
        $len = max(count($a), count($b));
        $sum = 0.0;
        for ($i = 0; $i < $len; $i++) {
            $sum += ($a[$i] ?? 0) * ($b[$i] ?? 0);
        }
        return $sum;
    }

    /**
     * Cosine similarity antara dua vektor asosiatif [produk_id => float].
     */
    private function cosineSimilarity(array $a, array $b): float
    {
        $dot  = 0.0;
        $normA = 0.0;
        $normB = 0.0;

        // Hitung dot product hanya pada kunci yang ada di keduanya
        $allKeys = array_unique(array_merge(array_keys($a), array_keys($b)));

        foreach ($allKeys as $k) {
            $va    = $a[$k] ?? 0.0;
            $vb    = $b[$k] ?? 0.0;
            $dot  += $va * $vb;
            $normA += $va * $va;
            $normB += $vb * $vb;
        }

        $denom = sqrt($normA) * sqrt($normB);
        return $denom > 0 ? $dot / $denom : 0.0;
    }
}
