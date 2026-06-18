<?php

namespace App\Http\Controllers;

use App\Models\Transaksi;
use App\Models\Pesanan;
use App\Models\Booking;
use App\Models\Pelanggan;
use App\Services\NotificationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransaksiController extends Controller
{
    protected NotificationService $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    /**
     * Display a listing of transactions.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $query = Transaksi::with(['pesanans.pelanggan.user', 'bookings.pelanggan.user']);

        if ($user->hasRole('user')) {
            $query->where('user_id', $user->id);
        }

        if ($request->has('status')) {
            $query->where('status_transaksi', $request->status);
        }

        if ($request->has('metode')) {
            $query->where('metode_pembayaran', $request->metode);
        }

        if ($request->has('tanggal_mulai')) {
            $query->whereDate('tgl_transaksi', '>=', $request->tanggal_mulai);
        }
        if ($request->has('tanggal_selesai')) {
            $query->whereDate('tgl_transaksi', '<=', $request->tanggal_selesai);
        }

        $query->orderBy('created_at', 'desc');
        $transaksis = $query->paginate($request->get('per_page', 20));

        return response()->json([
            'status' => 'success',
            'data' => $transaksis->items(),
            'pagination' => [
                'current_page' => $transaksis->currentPage(),
                'last_page' => $transaksis->lastPage(),
                'per_page' => $transaksis->perPage(),
                'total' => $transaksis->total(),
            ],
        ]);
    }

    /**
     * Process payment for an order.
     * Creates a transaction with status 'menunggu_konfirmasi' until staff verifies it.
     */
    public function payOrder(Request $request, Pesanan $pesanan): JsonResponse
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
                'message' => 'Pesanan ini tidak dapat dibayar.',
            ], 400);
        }

        $request->validate([
            'metode_pembayaran' => 'required|string|max:50',
        ]);

        try {
            DB::beginTransaction();

            // Create transaction (pending confirmation)
            $transaksi = Transaksi::create([
                'user_id' => $user->id,
                'jumlah_bayar' => $pesanan->total_harga,
                'metode_pembayaran' => $request->metode_pembayaran,
                'status_transaksi' => Transaksi::STATUS_MENUNGGU_KONFIRMASI,
                'tgl_transaksi' => now(),
            ]);

            // Update order status to waiting confirmation
            $pesanan->update([
                'transaksi_id' => $transaksi->id,
                'status_pesanan' => Pesanan::STATUS_MENUNGGU_KONFIRMASI_PEMBAYARAN,
            ]);

            DB::commit();

            // Notify staff
            $this->notificationService->sendToStaff(
                'Pembayaran Menunggu Konfirmasi',
                "Pembayaran untuk pesanan #{$pesanan->id} dari {$user->name} menunggu konfirmasi. Total: Rp " . number_format($pesanan->total_harga, 0, ',', '.'),
                'info',
                Pesanan::class,
                $pesanan->id
            );

            return response()->json([
                'status' => 'success',
                'message' => 'Pembayaran berhasil dikirim. Menunggu konfirmasi dari staff.',
                'data' => [
                    'transaksi' => $transaksi,
                    'pesanan' => $pesanan->fresh()->load(['pelanggan.user', 'itemPesanans.produk']),
                ],
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Pembayaran gagal: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Process payment for a booking.
     * Creates a transaction with status 'menunggu_konfirmasi' until staff verifies it.
     */
    public function payBooking(Request $request, Booking $booking): JsonResponse
    {
        $user = $request->user();
        $pelanggan = Pelanggan::where('user_id', $user->id)->first();

        if (!$pelanggan || $booking->pelanggan_id !== $pelanggan->id) {
            return response()->json([
                'status' => 'error',
                'message' => 'Anda tidak memiliki akses ke booking ini.',
            ], 403);
        }

        if ($booking->status_verifikasi !== Booking::STATUS_DISETUJUI) {
            return response()->json([
                'status' => 'error',
                'message' => 'Booking belum disetujui atau sudah dibayar.',
            ], 400);
        }

        $request->validate([
            'metode_pembayaran' => 'required|string|max:50',
            'jumlah_bayar' => 'required|numeric|min:0',
        ]);

        try {
            DB::beginTransaction();

            $transaksi = Transaksi::create([
                'user_id' => $user->id,
                'jumlah_bayar' => $request->jumlah_bayar,
                'metode_pembayaran' => $request->metode_pembayaran,
                'status_transaksi' => Transaksi::STATUS_MENUNGGU_KONFIRMASI,
                'tgl_transaksi' => now(),
            ]);

            $booking->update([
                'transaksi_id' => $transaksi->id,
                'harga_final' => $request->jumlah_bayar,
            ]);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Pembayaran booking berhasil dikirim. Menunggu konfirmasi dari staff.',
                'data' => [
                    'transaksi' => $transaksi,
                    'booking' => $booking->fresh()->load('pelanggan.user'),
                ],
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Pembayaran gagal: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * List all transactions waiting for staff confirmation.
     */
    public function pendingConfirmations(Request $request): JsonResponse
    {
        $query = Transaksi::with(['pesanans.pelanggan.user', 'bookings.pelanggan.user'])
            ->where('status_transaksi', Transaksi::STATUS_MENUNGGU_KONFIRMASI)
            ->orderBy('created_at', 'desc');

        $transaksis = $query->paginate($request->get('per_page', 20));

        return response()->json([
            'status' => 'success',
            'data' => $transaksis->items(),
            'pagination' => [
                'current_page' => $transaksis->currentPage(),
                'last_page' => $transaksis->lastPage(),
                'per_page' => $transaksis->perPage(),
                'total' => $transaksis->total(),
            ],
        ]);
    }

    /**
     * Confirm or reject a pending payment (staff only).
     *
     * Request body:
     * - action: "confirm" | "reject"
     * - catatan (optional, for rejection reason)
     */
    public function confirmPayment(Request $request, Transaksi $transaksi): JsonResponse
    {
        if ($transaksi->status_transaksi !== Transaksi::STATUS_MENUNGGU_KONFIRMASI) {
            return response()->json([
                'status' => 'error',
                'message' => 'Transaksi ini tidak menunggu konfirmasi.',
            ], 400);
        }

        $request->validate([
            'action' => 'required|string|in:confirm,reject',
            'catatan' => 'nullable|string|max:500',
        ]);

        $action = $request->action;
        $user = $request->user();

        try {
            DB::beginTransaction();

            if ($action === 'confirm') {
                // Approve payment
                $transaksi->update([
                    'status_transaksi' => Transaksi::STATUS_DIBAYAR,
                ]);

                // Update related order status
                $pesanan = $transaksi->pesanans()->first();
                if ($pesanan) {
                    $pesanan->update([
                        'status_pesanan' => Pesanan::STATUS_DIBAYAR,
                    ]);

                    $this->notificationService->create(
                        $pesanan->pelanggan->user_id,
                        'Pembayaran Dikonfirmasi',
                        "Pembayaran untuk pesanan #{$pesanan->id} telah dikonfirmasi oleh staff. Pesanan akan segera diproses.",
                        'success',
                        Pesanan::class,
                        $pesanan->id
                    );
                }

                // Update related booking status
                $booking = $transaksi->bookings()->first();
                if ($booking) {
                    $this->notificationService->create(
                        $booking->pelanggan->user_id,
                        'Pembayaran Booking Dikonfirmasi',
                        "Pembayaran untuk booking #{$booking->id} telah dikonfirmasi oleh staff.",
                        'success',
                        Booking::class,
                        $booking->id
                    );
                }

                DB::commit();

                return response()->json([
                    'status' => 'success',
                    'message' => 'Pembayaran berhasil dikonfirmasi.',
                    'data' => $transaksi->fresh()->load(['pesanans.pelanggan.user', 'bookings.pelanggan.user']),
                ]);
            } else {
                // Reject payment
                $transaksi->update([
                    'status_transaksi' => Transaksi::STATUS_GAGAL,
                ]);

                $catatan = $request->catatan ?? 'Tidak ada alasan yang diberikan.';

                // Update related order status
                $pesanan = $transaksi->pesanans()->first();
                if ($pesanan) {
                    $pesanan->update([
                        'status_pesanan' => Pesanan::STATUS_PEMBAYARAN_DIBATALKAN,
                    ]);

                    $this->notificationService->create(
                        $pesanan->pelanggan->user_id,
                        'Pembayaran Ditolak',
                        "Pembayaran untuk pesanan #{$pesanan->id} ditolak. Alasan: {$catatan}",
                        'error',
                        Pesanan::class,
                        $pesanan->id
                    );
                }

                // Update related booking status
                $booking = $transaksi->bookings()->first();
                if ($booking) {
                    $this->notificationService->create(
                        $booking->pelanggan->user_id,
                        'Pembayaran Booking Ditolak',
                        "Pembayaran untuk booking #{$booking->id} ditolak. Alasan: {$catatan}",
                        'error',
                        Booking::class,
                        $booking->id
                    );
                }

                DB::commit();

                return response()->json([
                    'status' => 'success',
                    'message' => 'Pembayaran ditolak.',
                    'data' => $transaksi->fresh()->load(['pesanans.pelanggan.user', 'bookings.pelanggan.user']),
                ]);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal memproses konfirmasi: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified transaction.
     */
    public function show(Request $request, Transaksi $transaksi): JsonResponse
    {
        $user = $request->user();

        if ($user->hasRole('user') && $transaksi->user_id !== $user->id) {
            return response()->json([
                'status' => 'error',
                'message' => 'Anda tidak memiliki akses ke transaksi ini.',
            ], 403);
        }

        $transaksi->load(['pesanans.pelanggan.user', 'bookings.pelanggan.user']);

        return response()->json([
            'status' => 'success',
            'data' => $transaksi,
        ]);
    }
}