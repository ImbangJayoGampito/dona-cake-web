<?php

namespace Modules\Ulasan\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Pelanggan;
use App\Models\Produk;
use App\Models\Ulasan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UlasanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Ulasan::with(['produk', 'pelanggan.user'])->get());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('ulasan::create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'produk_id' => 'required|exists:produks,id',
            'rating' => 'required|integer|min:1|max:5',
            'komentar' => 'nullable|string|max:1000',
        ]);

        $user = Auth::user();
        $pelanggan = $user->pelanggan;
        if (!$pelanggan) {
            $pelanggan = Pelanggan::create(['user_id' => $user->id]);
        }

        $review = Ulasan::create(array_merge($data, [
            'pelanggan_id' => $pelanggan->id,
            'is_visible' => true,
        ]));

        $this->updateProductRating($review->produk);

        return response()->json($review, 201);
    }

    /**
     * Show the specified resource.
     */
    public function show(Ulasan $ulasan)
    {
        return response()->json($ulasan->load(['produk', 'pelanggan.user']));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ulasan $ulasan)
    {
        return view('ulasan::edit', compact('ulasan'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ulasan $ulasan)
    {
        $data = $request->validate([
            'rating' => 'sometimes|required|integer|min:1|max:5',
            'komentar' => 'nullable|string|max:1000',
            'is_visible' => 'sometimes|boolean',
        ]);

        $ulasan->update($data);
        $this->updateProductRating($ulasan->produk);

        return response()->json($ulasan);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ulasan $ulasan)
    {
        $produk = $ulasan->produk;
        $ulasan->delete();

        if ($produk) {
            $this->updateProductRating($produk);
        }

        return response()->json(['message' => 'Ulasan dihapus']);
    }

    protected function updateProductRating(Produk $produk): void
    {
        $rating = $produk->ulasans()->where('is_visible', true)->avg('rating');
        $produk->update(['rating_rata_rata' => $rating ?: 0]);
    }
}
