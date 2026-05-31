<?php

namespace App\Http\Controllers;

use App\Models\Keranjang;
use App\Models\Produk;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class KeranjangController extends Controller
{
    /**
     * Display user's cart.
     */
    public function index(Request $request): JsonResponse
    {
        $keranjang = Keranjang::with(['produk.gambarUtama', 'produk.ulasans'])
            ->where('user_id', $request->user()->id)
            ->get();

        $total = $keranjang->sum(fn($item) => $item->produk->harga * $item->kuantitas);

        return response()->json([
            'status' => 'success',
            'data' => [
                'items' => $keranjang,
                'total_harga' => round($total, 2),
                'jumlah_item' => $keranjang->sum('kuantitas'),
            ],
        ]);
    }

    /**
     * Add item to cart.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'produk_id' => 'required|exists:produks,id',
            'kuantitas' => 'required|integer|min:1',
            'catatan' => 'nullable|string|max:500',
        ]);

        $userId = $request->user()->id;
        $produkId = $request->produk_id;

        // Check if product exists and is in stock
        $produk = Produk::findOrFail($produkId);
        if ($produk->stok < $request->kuantitas) {
            return response()->json([
                'status' => 'error',
                'message' => "Stok {$produk->nama_produk} tidak mencukupi.",
            ], 400);
        }

        // Update quantity if already in cart, otherwise create new
        $existing = Keranjang::where('user_id', $userId)
            ->where('produk_id', $produkId)
            ->first();

        if ($existing) {
            $existing->update([
                'kuantitas' => $existing->kuantitas + $request->kuantitas,
                'catatan' => $request->catatan ?? $existing->catatan,
            ]);
            $item = $existing;
        } else {
            $item = Keranjang::create([
                'user_id' => $userId,
                'produk_id' => $produkId,
                'kuantitas' => $request->kuantitas,
                'catatan' => $request->catatan,
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Barang telah ditambahkan ke keranjang!',
            'data' => $item->load('produk.gambarUtama'),
        ], 201);
    }

    /**
     * Update cart item quantity.
     */
    public function update(Request $request, Keranjang $keranjang): JsonResponse
    {
        if ($keranjang->user_id !== $request->user()->id) {
            return response()->json(['status' => 'error', 'message' => 'Akses ditolak.'], 403);
        }

        $request->validate([
            'kuantitas' => 'required|integer|min:1',
            'catatan' => 'nullable|string|max:500',
        ]);

        $produk = $keranjang->produk;
        if ($produk->stok < $request->kuantitas) {
            return response()->json([
                'status' => 'error',
                'message' => "Stok {$produk->nama_produk} tidak mencukupi.",
            ], 400);
        }

        $keranjang->update([
            'kuantitas' => $request->kuantitas,
            'catatan' => $request->catatan,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Keranjang berhasil diperbarui.',
            'data' => $keranjang->fresh()->load('produk.gambarUtama'),
        ]);
    }

    /**
     * Remove item from cart.
     */
    public function destroy(Request $request, Keranjang $keranjang): JsonResponse
    {
        if ($keranjang->user_id !== $request->user()->id) {
            return response()->json(['status' => 'error', 'message' => 'Akses ditolak.'], 403);
        }

        $keranjang->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Item berhasil dihapus dari keranjang.',
        ]);
    }

    /**
     * Clear entire cart.
     */
    public function clear(Request $request): JsonResponse
    {
        Keranjang::where('user_id', $request->user()->id)->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Keranjang berhasil dikosongkan.',
        ]);
    }
}