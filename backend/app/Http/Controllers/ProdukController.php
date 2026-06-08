<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProdukRequest;
use App\Models\Produk;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProdukController extends Controller
{
    /**
     * Display a listing of products with optional filtering and search.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Produk::with(["gambarUtama", "ulasans", "kategori"]);

        // Search by name
        if ($request->has("search")) {
            $query->where("nama_produk", "like", "%" . $request->search . "%");
        }

        // Filter by category
        if ($request->has("kategori")) {
            $query->where("kategori", $request->kategori);
        }

        // Filter by price range
        if ($request->has("harga_min")) {
            $query->where("harga", ">=", $request->harga_min);
        }
        if ($request->has("harga_max")) {
            $query->where("harga", "<=", $request->harga_max);
        }

        // Sort
        $sortField = $request->get("sort_by", "created_at");
        $sortOrder = $request->get("sort_order", "desc");
        $allowedSorts = [
            "nama_produk",
            "harga",
            "created_at",
            "rating_rata_rata",
            "stok",
        ];

        if (in_array($sortField, $allowedSorts)) {
            $query->orderBy($sortField, $sortOrder === "asc" ? "asc" : "desc");
        }

        $perPage = $request->get("per_page", 20);
        $produks = $query->paginate($perPage);

        return response()->json([
            "status" => "success",
            "data" => $produks->items(),
            "pagination" => [
                "current_page" => $produks->currentPage(),
                "last_page" => $produks->lastPage(),
                "per_page" => $produks->perPage(),
                "total" => $produks->total(),
            ],
        ]);
    }

    /**
     * Store a newly created product.
     */
    public function store(ProdukRequest $request): JsonResponse
    {
        $produk = Produk::create($request->validated());

        return response()->json(
            [
                "status" => "success",
                "message" => "Produk berhasil ditambahkan.",
                "data" => $produk->load("gambarUtama"),
            ],
            201,
        );
    }

    /**
     * Display the specified product.
     */
    public function show(Produk $produk): JsonResponse
    {
        $produk->load([
            "gambars",
            "ulasans.pelanggan.user",
            "gambarUtama",
            "kategori",
        ]);

        return response()->json([
            "status" => "success",
            "data" => $produk,
        ]);
    }

    /**
     * Update the specified product.
     */
    public function update(ProdukRequest $request, Produk $produk): JsonResponse
    {
        $produk->update($request->validated());

        return response()->json([
            "status" => "success",
            "message" => "Produk berhasil diperbarui.",
            "data" => $produk->fresh()->load("gambarUtama"),
        ]);
    }

    /**
     * Remove the specified product.
     */
    public function destroy(Produk $produk): JsonResponse
    {
        $produk->delete();

        return response()->json([
            "status" => "success",
            "message" => "Produk berhasil dihapus.",
        ]);
    }

    /**
     * Get unique categories for filter
     */
    public function categories(): JsonResponse
    {
        $categories = Produk::select("kategori")
            ->whereNotNull("kategori")
            ->distinct()
            ->pluck("kategori");

        return response()->json([
            "status" => "success",
            "data" => $categories,
        ]);
    }
}
