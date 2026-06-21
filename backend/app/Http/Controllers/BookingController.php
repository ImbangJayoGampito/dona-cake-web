<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookingRequest;
use App\Models\Booking;
use App\Models\Pelanggan;
use App\Services\NotificationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Enums\BookingStatus;

class BookingController extends Controller
{
    protected NotificationService $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    /**
     * Display a listing of bookings.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $query = Booking::with(["pelanggan.user", "transaksi"]);

        if ($user->hasRole("user")) {
            $pelanggan = Pelanggan::where("user_id", $user->id)->first();
            if (!$pelanggan) {
                return response()->json(["status" => "success", "data" => []]);
            }
            $query->where("pelanggan_id", $pelanggan->id);
        }

        if ($request->has("status")) {
            $query->where("status_verifikasi", $request->status);
        }

        $query->orderBy("created_at", "desc");
        $bookings = $query->paginate($request->get("per_page", 20));

        return response()->json([
            "status" => "success",
            "data" => $bookings->items(),
            "pagination" => [
                "current_page" => $bookings->currentPage(),
                "last_page" => $bookings->lastPage(),
                "per_page" => $bookings->perPage(),
                "total" => $bookings->total(),
            ],
        ]);
    }

    /**
     * Store a newly created booking (custom order).
     */
    public function store(BookingRequest $request): JsonResponse
    {
        $user = $request->user();
        $pelanggan = Pelanggan::where("user_id", $user->id)->first();

        if (!$pelanggan) {
            return response()->json(
                [
                    "status" => "error",
                    "message" => "Profil pelanggan tidak ditemukan.",
                ],
                400,
            );
        }

        try {
            DB::beginTransaction();

            $booking = Booking::create([
                "pelanggan_id" => $pelanggan->id,
                "ukuran" => $request->ukuran,
                "tgl_ambil" => $request->tgl_ambil,
                "desain_custom_url" => $request->desain_custom_url,
                "catatan" => $request->catatan,
                "status_verifikasi" => BookingStatus::MENUNGGU_VERIFIKASI,
                "rasa_kue" => $request->rasa_kue,
                "jenis_frosting" => $request->jenis_frosting,
                "harga_final" => $request->harga_final,
            ]);

            DB::commit();

            // Notify staff about new booking
            $this->notificationService->sendToStaff(
                "Booking Baru Masuk",
                "Booking custom baru dari {$user->name} untuk ukuran {$request->ukuran}, ambil {$request->tgl_ambil}",
                "info",
                Booking::class,
                $booking->id,
            );

            return response()->json(
                [
                    "status" => "success",
                    "message" =>
                        "Booking berhasil dibuat. Menunggu verifikasi admin.",
                    "data" => $booking->load("pelanggan.user"),
                ],
                201,
            );
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(
                [
                    "status" => "error",
                    "message" => "Gagal membuat booking: " . $e->getMessage(),
                ],
                500,
            );
        }
    }

    /**
     * Display the specified booking.
     */
    public function show(Request $request, Booking $booking): JsonResponse
    {
        $user = $request->user();

        if ($user->hasRole("user")) {
            $pelanggan = Pelanggan::where("user_id", $user->id)->first();
            if (!$pelanggan || $booking->pelanggan_id !== $pelanggan->id) {
                return response()->json(
                    [
                        "status" => "error",
                        "message" =>
                            "Anda tidak memiliki akses ke booking ini.",
                    ],
                    403,
                );
            }
        }

        $booking->load(["pelanggan.user", "transaksi", "notifikasis"]);

        return response()->json([
            "status" => "success",
            "data" => $booking,
        ]);
    }

    /**
     * Verify booking (approve/reject) for staff/admin.
     */
    public function verify(Request $request, Booking $booking): JsonResponse
    {
        $request->validate([
            "status" => "required|string|in:disetujui,ditolak,selesai",
            "catatan" => "nullable|string|max:500",
        ]);

        $newStatus = $request->status;

        if ($newStatus === 'selesai') {
            if ($booking->status_verifikasi !== BookingStatus::DISETUJUI) {
                return response()->json(
                    [
                        "status" => "error",
                        "message" => "Hanya booking yang telah disetujui yang dapat diselesaikan.",
                    ],
                    400,
                );
            }

            $booking->update([
                "status_verifikasi" => BookingStatus::SELESAI,
                "catatan" => $request->catatan ?? $booking->catatan,
            ]);

            // Notify customer
            if ($booking->pelanggan && $booking->pelanggan->user) {
                $this->notificationService->create(
                    $booking->pelanggan->user_id,
                    "Booking Selesai",
                    "Pesanan kue custom Anda #BK-" . str_pad($booking->id, 4, '0', STR_PAD_LEFT) . " telah selesai dan siap untuk diambil!",
                    "success",
                    Booking::class,
                    $booking->id,
                );
            }
        } else {
            if ($booking->status_verifikasi !== BookingStatus::MENUNGGU_VERIFIKASI) {
                return response()->json(
                    [
                        "status" => "error",
                        "message" => "Booking sudah pernah diverifikasi sebelumnya.",
                    ],
                    400,
                );
            }

            $booking->update([
                "status_verifikasi" =>
                    $newStatus === "disetujui"
                        ? BookingStatus::DISETUJUI
                        : BookingStatus::DITOLAK,
                "catatan" => $request->catatan,
            ]);

            // Notify customer
            if ($booking->pelanggan && $booking->pelanggan->user) {
                if ($newStatus === "disetujui") {
                    $this->notificationService->create(
                        $booking->pelanggan->user_id,
                        "Booking Disetujui",
                        "Booking custom anda untuk ukuran {$booking->ukuran} telah disetujui! Silakan lakukan pembayaran.",
                        "success",
                        Booking::class,
                        $booking->id,
                    );
                } else {
                    $this->notificationService->create(
                        $booking->pelanggan->user_id,
                        "Booking Ditolak",
                        "Booking custom anda ditolak. Alasan: " .
                            ($request->catatan ?? "Tidak sesuai ketentuan"),
                        "error",
                        Booking::class,
                        $booking->id,
                    );
                }
            }
        }

        return response()->json([
            "status" => "success",
            "message" => "Booking berhasil diperbarui.",
            "data" => $booking->fresh()->load("pelanggan.user"),
        ]);
    }

    /**
     * Cancel booking by customer.
     */
    public function cancel(Request $request, Booking $booking): JsonResponse
    {
        $user = $request->user();
        $pelanggan = Pelanggan::where("user_id", $user->id)->first();

        if (!$pelanggan || $booking->pelanggan_id !== $pelanggan->id) {
            return response()->json(
                [
                    "status" => "error",
                    "message" => "Anda tidak memiliki akses ke booking ini.",
                ],
                403,
            );
        }

        if (
            !in_array($booking->status_verifikasi, [
                BookingStatus::MENUNGGU_VERIFIKASI,
                BookingStatus::DISETUJUI,
            ])
        ) {
            return response()->json(
                [
                    "status" => "error",
                    "message" =>
                        "Booking tidak dapat dibatalkan pada status ini.",
                ],
                400,
            );
        }

        $booking->update(["status_verifikasi" => BookingStatus::DIBATALKAN]);

        return response()->json([
            "status" => "success",
            "message" => "Booking berhasil dibatalkan.",
        ]);
    }
}
