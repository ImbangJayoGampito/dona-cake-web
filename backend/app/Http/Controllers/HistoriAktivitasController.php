<?php

namespace App\Http\Controllers;

use App\Models\HistoriAktivitas;
use App\Models\Pelanggan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HistoriAktivitasController extends Controller
{
    /**
     * Get user's activity history.
     */
    public function index(Request $request): JsonResponse
    {
        $pelanggan = Pelanggan::where('user_id', $request->user()->id)->first();

        if (!$pelanggan) {
            return response()->json([
                'status' => 'success',
                'data' => [],
            ]);
        }

        $aktivitas = HistoriAktivitas::where('pelanggan_id', $pelanggan->id)
            ->orderBy('waktu_akses', 'desc')
            ->paginate($request->get('per_page', 20));

        return response()->json([
            'status' => 'success',
            'data' => $aktivitas->items(),
            'pagination' => [
                'current_page' => $aktivitas->currentPage(),
                'last_page' => $aktivitas->lastPage(),
                'per_page' => $aktivitas->perPage(),
                'total' => $aktivitas->total(),
            ],
        ]);
    }

    /**
     * Track user activity (can be called from frontend).
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'jenis_aktivitas' => 'required|string|in:view,click,add_to_cart,purchase,like,wishlist,review',
            'produk_terkait' => 'required|integer|exists:produks,id',
        ]);

        $pelanggan = Pelanggan::where('user_id', $request->user()->id)->first();
        if (!$pelanggan) {
            return response()->json(['status' => 'error', 'message' => 'Profil tidak ditemukan.'], 400);
        }

        $bobot = [
            'view' => 0.3,
            'click' => 0.5,
            'add_to_cart' => 0.8,
            'purchase' => 1.0,
            'like' => 0.7,
            'wishlist' => 0.6,
            'review' => 0.9,
        ];

        HistoriAktivitas::create([
            'pelanggan_id' => $pelanggan->id,
            'jenis_aktivitas' => $request->jenis_aktivitas,
            'produk_terkait' => $request->produk_terkait,
            'bobot_interaksi' => $bobot[$request->jenis_aktivitas],
            'waktu_akses' => now(),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Aktivitas tercatat.',
        ], 201);
    }

    /**
     * Store batch of purchase preferences (histori preferensi produk yang dibeli).
     *
     * Request body:
     * {
     *   "preferensi": [
     *     { "produk_terkait": 1 },
     *     { "produk_terkait": 5 },
     *     ...
     *   ]
     * }
     */
    public function storeBatch(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'preferensi' => 'required|array|min:1',
            'preferensi.*.produk_terkait' => 'required|integer|exists:produks,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $pelanggan = Pelanggan::where('user_id', $request->user()->id)->first();
        if (!$pelanggan) {
            return response()->json([
                'status' => 'error',
                'message' => 'Profil pelanggan tidak ditemukan.',
            ], 400);
        }

        $now = now();
        $data = [];
        foreach ($request->preferensi as $item) {
            $data[] = [
                'pelanggan_id' => $pelanggan->id,
                'jenis_aktivitas' => 'purchase',
                'produk_terkait' => $item['produk_terkait'],
                'bobot_interaksi' => 1.0,
                'waktu_akses' => $now,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        HistoriAktivitas::insert($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Preferensi berhasil dicatat.',
            'data' => [
                'total' => count($data),
            ],
        ], 201);
    }
}
