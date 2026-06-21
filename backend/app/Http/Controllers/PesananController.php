<?php

namespace App\Http\Controllers;

use App\Http\Requests\PesananRequest;
use App\Models\Pesanan;
use App\Models\ItemPesanan;
use App\Models\Pelanggan;
use App\Models\Produk;
use App\Services\NotificationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PesananController extends Controller
{
    protected NotificationService $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    /**
     * Display a listing of orders.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $query = Pesanan::with(['pelanggan.user', 'itemPesanans.produk', 'transaksi']);

        // Pelanggan only sees their own orders
        if ($user->hasRole('user')) {
            $pelanggan = Pelanggan::where('user_id', $user->id)->first();
            if (!$pelanggan) {
                return response()->json([
                    'status' => 'success',
                    'data' => [],
                    'pagination' => ['current_page' => 1, 'last_page' => 1, 'per_page' => 20, 'total' => 0],
                ]);
            }
            $query->where('pelanggan_id', $pelanggan->id);
        }

        // Filter by status
        if ($request->has('status')) {
            if (str_contains($request->status, ',')) {
                $statuses = explode(',', $request->status);
                $query->whereIn('status_pesanan', $statuses);
            } else {
                $query->where('status_pesanan', $request->status);
            }
        }

        // Filter by today
        if ($request->boolean('today')) {
            $query->whereDate('created_at', today());
        }

        // Filter by date range
        if ($request->has('tanggal_mulai')) {
            $query->whereDate('tgl_pesanan', '>=', $request->tanggal_mulai);
        }
        if ($request->has('tanggal_selesai')) {
            $query->whereDate('tgl_pesanan', '<=', $request->tanggal_selesai);
        }

        $query->orderBy('created_at', 'desc');

        $perPage = $request->get('per_page', 20);
        $pesanans = $query->paginate($perPage);

        return response()->json([
            'status' => 'success',
            'data' => $pesanans->items(),
            'pagination' => [
                'current_page' => $pesanans->currentPage(),
                'last_page' => $pesanans->lastPage(),
                'per_page' => $pesanans->perPage(),
                'total' => $pesanans->total(),
            ],
        ]);
    }

    /**
     * Store a newly created order.
     */
    public function store(PesananRequest $request): JsonResponse
    {
        $user = $request->user();
        $pelanggan = Pelanggan::where('user_id', $user->id)->first();

        if (!$pelanggan) {
            return response()->json([
                'status' => 'error',
                'message' => 'Profil pelanggan tidak ditemukan. Silakan lengkapi profil terlebih dahulu.',
            ], 400);
        }

        try {
            DB::beginTransaction();

            $totalHarga = 0;
            $items = [];

            foreach ($request->items as $item) {
                $produk = Produk::findOrFail($item['produk_id']);
                
                if ($produk->stok < $item['kuantitas']) {
                    return response()->json([
                        'status' => 'error',
                        'message' => "Stok {$produk->nama_produk} tidak mencukupi. Tersedia: {$produk->stok}",
                    ], 400);
                }

                $subtotal = $produk->harga * $item['kuantitas'];
                $totalHarga += $subtotal;

                $items[] = [
                    'produk_id' => $produk->id,
                    'kuantitas' => $item['kuantitas'],
                    'subtotal' => $subtotal,
                    'catatan' => $item['catatan'] ?? null,
                ];
            }

            // Create order
            $pesanan = Pesanan::create([
                'pelanggan_id' => $pelanggan->id,
                'tgl_pesanan' => now(),
                'total_harga' => $totalHarga,
                'status_pesanan' => Pesanan::STATUS_MENUNGGU_PEMBAYARAN,
            ]);

            // Create order items
            foreach ($items as $item) {
                $pesanan->itemPesanans()->create($item);
            }

            DB::commit();

            // Notify staff about new order
            $this->notificationService->sendToStaff(
                'Pesanan Baru Masuk',
                "Pesanan baru #{$pesanan->id} dari {$user->name} dengan total Rp " . number_format($totalHarga, 0, ',', '.'),
                'info',
                Pesanan::class,
                $pesanan->id
            );

            return response()->json([
                'status' => 'success',
                'message' => 'Pesanan berhasil dibuat. Silakan lakukan pembayaran.',
                'data' => $pesanan->load(['pelanggan.user', 'itemPesanans.produk']),
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal membuat pesanan: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified order.
     */
    public function show(Request $request, Pesanan $pesanan): JsonResponse
    {
        $user = $request->user();

        // Pelanggan can only view own orders
        if ($user->hasRole('user')) {
            $pelanggan = Pelanggan::where('user_id', $user->id)->first();
            if (!$pelanggan || $pesanan->pelanggan_id !== $pelanggan->id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Anda tidak memiliki akses ke pesanan ini.',
                ], 403);
            }
        }

        $pesanan->load(['pelanggan.user', 'itemPesanans.produk', 'transaksi', 'notifikasis']);

        return response()->json([
            'status' => 'success',
            'data' => $pesanan,
        ]);
    }

    /**
     * Update order status (for staff/admin).
     */
    public function update(Request $request, Pesanan $pesanan): JsonResponse
    {
        $request->validate([
            'status_pesanan' => 'required|string',
        ]);

        $newStatus = $request->status_pesanan;

        // Validate status transition
        if (!$pesanan->canTransitionTo($newStatus)) {
            return response()->json([
                'status' => 'error',
                'message' => "Tidak dapat mengubah status dari '{$pesanan->status_pesanan}' ke '{$newStatus}'.",
            ], 400);
        }

        $pesanan->update(['status_pesanan' => $newStatus]);

        // Send notification to customer
        $pelanggan = $pesanan->pelanggan;
        if ($pelanggan && $pelanggan->user) {
            $statusLabels = [
                Pesanan::STATUS_MENUNGGU_KONFIRMASI_PEMBAYARAN => 'Pembayaran menunggu konfirmasi',
                Pesanan::STATUS_DIBAYAR => 'Pembayaran diterima',
                Pesanan::STATUS_DIPROSES => 'Pesanan sedang diproses',
                Pesanan::STATUS_SELESAI => 'Pesanan selesai',
                Pesanan::STATUS_DIBATALKAN => 'Pesanan dibatalkan',
                Pesanan::STATUS_PEMBAYARAN_DIBATALKAN => 'Pembayaran dibatalkan',
            ];

            $this->notificationService->create(
                $pelanggan->user_id,
                'Status Pesanan Diperbarui',
                "Pesanan #{$pesanan->id}: " . ($statusLabels[$newStatus] ?? $newStatus),
                $newStatus === Pesanan::STATUS_SELESAI ? 'success' : 'info',
                Pesanan::class,
                $pesanan->id
            );
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Status pesanan berhasil diperbarui.',
            'data' => $pesanan->fresh()->load(['pelanggan.user', 'itemPesanans.produk']),
        ]);
    }

    /**
     * Cancel order by customer (only if status is menunggu_pembayaran).
     */
    public function cancel(Request $request, Pesanan $pesanan): JsonResponse
    {
        $user = $request->user();
        $pelanggan = Pelanggan::where('user_id', $user->id)->first();

        if (!$pelanggan || $pesanan->pelanggan_id !== $pelanggan->id) {
            return response()->json([
                'status' => 'error',
                'message' => 'Anda tidak memiliki akses ke pesanan ini.',
            ], 403);
        }

        if ($pesanan->status_pesanan !== Pesanan::STATUS_MENUNGGU_PEMBAYARAN) {
            return response()->json([
                'status' => 'error',
                'message' => 'Pesanan hanya dapat dibatalkan sebelum pembayaran.',
            ], 400);
        }

        $pesanan->update(['status_pesanan' => Pesanan::STATUS_DIBATALKAN]);

        return response()->json([
            'status' => 'success',
            'message' => 'Pesanan berhasil dibatalkan.',
        ]);
    }
}
