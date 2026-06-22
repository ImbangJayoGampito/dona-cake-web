<?php

namespace App\Http\Controllers;

use App\Models\HistoriAktivitas;
use App\Models\Pelanggan;
use App\Services\RecommendationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HistoriAktivitasController extends Controller
{
    
    public function __construct(protected RecommendationService $recommendationService)
    {
    }

    /**
     * Get user's activity history.
     */
    public function index(Request $request): JsonResponse
    {
        $pelanggan = Pelanggan::where('user_id', $request->user()->id)->first();

        if (!$pelanggan) {
            return response()->json([
                'status' => 'success',
                'data'   => [],
            ]);
        }

        $aktivitas = HistoriAktivitas::where('pelanggan_id', $pelanggan->id)
            ->orderBy('waktu_akses', 'desc')
            ->paginate($request->get('per_page', 20));

        return response()->json([
            'status'     => 'success',
            'data'       => $aktivitas->items(),
            'pagination' => [
                'current_page' => $aktivitas->currentPage(),
                'last_page'    => $aktivitas->lastPage(),
                'per_page'     => $aktivitas->perPage(),
                'total'        => $aktivitas->total(),
            ],
        ]);
    }

    /**
     * Track user activity dan invalidate cache rekomendasi.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'jenis_aktivitas' => 'required|string|in:view,click,add_to_cart,purchase,like,wishlist,review',
            'produk_terkait'  => 'required|integer|exists:produks,id',
        ]);

        $pelanggan = Pelanggan::where('user_id', $request->user()->id)->first();
        if (!$pelanggan) {
            return response()->json(['status' => 'error', 'message' => 'Profil tidak ditemukan.'], 400);
        }

        $bobot = \App\Enums\ActivityWeight::getAll();

        HistoriAktivitas::create([
            'pelanggan_id'    => $pelanggan->id,
            'jenis_aktivitas' => $request->jenis_aktivitas,
            'produk_terkait'  => $request->produk_terkait,
            'bobot_interaksi' => $bobot[$request->jenis_aktivitas],
            'waktu_akses'     => now(),
        ]);

        // Invalidate cache rekomendasi user ini agar hasil segar saat request berikutnya
        $this->recommendationService->invalidateCache($pelanggan->id);

        return response()->json([
            'status'  => 'success',
            'message' => 'Aktivitas tercatat.',
        ], 201);
    }

    /**
     * Store multiple activity histories in batch.
     */
    public function storeBatch(Request $request): JsonResponse
    {
        $request->validate([
            'aktivitas' => 'required|array',
            'aktivitas.*.jenis_aktivitas' => 'required|string|in:login,order,booking,review,view_product,search,add_to_cart',
            'aktivitas.*.produk_terkait' => 'required|integer|exists:produks,id',
        ]);

        $pelanggan = Pelanggan::where('user_id', $request->user()->id)->first();
        if (!$pelanggan) {
            return response()->json(['status' => 'error', 'message' => 'Profil tidak ditemukan.'], 400);
        }

        $bobot = \App\Enums\ActivityWeight::getAll();

        $aktivitasToCreate = [];
        foreach ($request->aktivitas as $aktivitas) {
            $aktivitasToCreate[] = [
                'pelanggan_id'    => $pelanggan->id,
                'jenis_aktivitas' => $aktivitas['jenis_aktivitas'],
                'produk_terkait'  => $aktivitas['produk_terkait'],
                'bobot_interaksi' => $bobot[$aktivitas['jenis_aktivitas']],
                'waktu_akses'     => now(),
            ];
        }

        HistoriAktivitas::insert($aktivitasToCreate);

        // Invalidate cache rekomendasi user ini agar hasil segar saat request berikutnya
        $this->recommendationService->invalidateCache($pelanggan->id);

        return response()->json([
            'status'  => 'success',
            'message' => 'Aktivitas batch tercatat.',
            'count'   => count($aktivitasToCreate),
        ], 201);
    }
}
