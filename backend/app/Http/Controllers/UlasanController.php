<?php

namespace App\Http\Controllers;

use App\Http\Requests\UlasanRequest;
use App\Models\Ulasan;
use App\Models\Pelanggan;
use App\Models\Produk;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UlasanController extends Controller
{
    /**
     * Display product reviews.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Ulasan::with(['pelanggan.user', 'produk'])
            ->where('is_visible', true);

        if ($request->has('produk_id')) {
            $query->where('produk_id', $request->produk_id);
        }

        $ulasans = $query->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 20));

        return response()->json([
            'status' => 'success',
            'data' => $ulasans->items(),
            'pagination' => [
                'current_page' => $ulasans->currentPage(),
                'last_page' => $ulasans->lastPage(),
                'per_page' => $ulasans->perPage(),
                'total' => $ulasans->total(),
            ],
        ]);
    }

    /**
     * Store a new review.
     */
    public function store(UlasanRequest $request): JsonResponse
    {
        $user = $request->user();
        $pelanggan = Pelanggan::where('user_id', $user->id)->first();

        if (!$pelanggan) {
            return response()->json([
                'status' => 'error',
                'message' => 'Profil pelanggan tidak ditemukan.',
            ], 400);
        }

        // Check if user has purchased this product
        $hasPurchased = $pelanggan->pesanans()
            ->whereHas('itemPesanans', function ($q) use ($request) {
                $q->where('produk_id', $request->produk_id);
            })
            ->where('status_pesanan', 'selesai')
            ->exists();

        if (!$hasPurchased) {
            return response()->json([
                'status' => 'error',
                'message' => 'Anda hanya dapat mengulas produk yang sudah Anda beli.',
            ], 403);
        }

        // Check for duplicate review
        $existing = Ulasan::where('pelanggan_id', $pelanggan->id)
            ->where('produk_id', $request->produk_id)
            ->exists();

        if ($existing) {
            return response()->json([
                'status' => 'error',
                'message' => 'Anda sudah memberikan ulasan untuk produk ini.',
            ], 400);
        }

        $ulasan = Ulasan::create([
            'pelanggan_id' => $pelanggan->id,
            'produk_id' => $request->produk_id,
            'rating' => $request->rating,
            'komentar' => $request->komentar,
            'is_visible' => true,
        ]);

        // Update product average rating
        $this->updateProductRating($request->produk_id);

        return response()->json([
            'status' => 'success',
            'message' => 'Ulasan berhasil dikirim.',
            'data' => $ulasan->load(['pelanggan.user', 'produk']),
        ], 201);
    }

    /**
     * Update a review.
     */
    public function update(UlasanRequest $request, Ulasan $ulasan): JsonResponse
    {
        $user = $request->user();
        $pelanggan = Pelanggan::where('user_id', $user->id)->first();

        if (!$pelanggan || $ulasan->pelanggan_id !== $pelanggan->id) {
            return response()->json([
                'status' => 'error',
                'message' => 'Anda tidak memiliki akses ke ulasan ini.',
            ], 403);
        }

        $ulasan->update($request->only(['rating', 'komentar']));
        $this->updateProductRating($ulasan->produk_id);

        return response()->json([
            'status' => 'success',
            'message' => 'Ulasan berhasil diperbarui.',
            'data' => $ulasan->fresh()->load(['pelanggan.user', 'produk']),
        ]);
    }

    /**
     * Delete a review.
     */
    public function destroy(Request $request, Ulasan $ulasan): JsonResponse
    {
        $user = $request->user();

        if ($user->hasRole('user')) {
            $pelanggan = Pelanggan::where('user_id', $user->id)->first();
            if (!$pelanggan || $ulasan->pelanggan_id !== $pelanggan->id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Anda tidak memiliki akses ke ulasan ini.',
                ], 403);
            }
        }

        $produkId = $ulasan->produk_id;
        $ulasan->delete();
        $this->updateProductRating($produkId);

        return response()->json([
            'status' => 'success',
            'message' => 'Ulasan berhasil dihapus.',
        ]);
    }

    /**
     * Toggle review visibility (for admin).
     */
    public function toggleVisibility(Ulasan $ulasan): JsonResponse
    {
        $ulasan->update(['is_visible' => !$ulasan->is_visible]);

        return response()->json([
            'status' => 'success',
            'message' => 'Visibilitas ulasan berhasil diubah.',
            'data' => $ulasan->fresh(),
        ]);
    }

    /**
     * Update product average rating from reviews.
     */
    private function updateProductRating(int $produkId): void
    {
        $avgRating = Ulasan::where('produk_id', $produkId)
            ->where('is_visible', true)
            ->avg('rating');

        Produk::where('id', $produkId)->update([
            'rating_rata_rata' => round($avgRating ?? 0, 1),
        ]);
    }
}