<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Pelanggan;
use App\Models\Booking;
use App\Enums\RoleEnum;
use App\Enums\BookingStatus;
use App\Services\NotificationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class AdminController extends Controller
{
    protected NotificationService $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    /**
     * List all users (admin only).
     */
    public function users(Request $request): JsonResponse
    {
        $query = User::with(['pelanggan', 'roles']);

        if ($request->has('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('username', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->has('role')) {
            $query->role($request->role);
        }

        $users = $query->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 20));

        return response()->json([
            'status' => 'success',
            'data' => $users->items(),
            'pagination' => [
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'per_page' => $users->perPage(),
                'total' => $users->total(),
            ],
        ]);
    }

    /**
     * Create a new user (admin only).
     */
    public function createUser(Request $request): JsonResponse
    {
        $request->validate([
            'username' => 'required|string|max:255|unique:users',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|string|in:' . implode(',', array_column(RoleEnum::cases(), 'value')),
        ]);

        $user = User::create([
            'username' => $request->username,
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Create pelanggan record if role is user
        if ($request->role === 'user') {
            Pelanggan::create(['user_id' => $user->id]);
        }

        $user->assignRole($request->role);

        return response()->json([
            'status' => 'success',
            'message' => 'Pengguna berhasil dibuat.',
            'data' => $user->load('pelanggan'),
        ], 201);
    }

    /**
     * Update user role (admin only).
     */
    public function updateRole(Request $request, User $user): JsonResponse
    {
        $request->validate([
            'role' => 'required|string|in:' . implode(',', array_column(RoleEnum::cases(), 'value')),
        ]);

        // Prevent admin from changing own role
        if ($user->id === $request->user()->id) {
            return response()->json([
                'status' => 'error',
                'message' => 'Anda tidak dapat mengubah peran Anda sendiri.',
            ], 403);
        }

        $oldRoles = $user->getRoleNames()->first();
        $user->syncRoles([$request->role]);

        return response()->json([
            'status' => 'success',
            'message' => 'Peran pengguna berhasil diubah.',
            'data' => [
                'user' => $user->fresh(),
                'old_role' => $oldRoles,
                'new_role' => $request->role,
            ],
        ]);
    }

    /**
     * Delete user (admin only).
     */
    public function deleteUser(Request $request, User $user): JsonResponse
    {
        if ($user->id === $request->user()->id) {
            return response()->json([
                'status' => 'error',
                'message' => 'Anda tidak dapat menghapus akun Anda sendiri.',
            ], 403);
        }

        $user->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Pengguna berhasil dihapus.',
        ]);
    }

    /**
     * Get dashboard statistics.
     */
    public function dashboard(): JsonResponse
    {
        $totalUsers = User::count();
        $totalPelanggan = Pelanggan::count();
        $totalProduk = \App\Models\Produk::count();
        $totalPesanan = \App\Models\Pesanan::count();
        $pesananBaru = \App\Models\Pesanan::where('status_pesanan', 'menunggu_pembayaran')->count();
        $bookingMenunggu = Booking::where('status_verifikasi', BookingStatus::MENUNGGU_VERIFIKASI->value)->count();
        $transaksiMenungguKonfirmasi = \App\Models\Transaksi::where('status_transaksi', 'menunggu_konfirmasi')->count();

        $statusBreakdown = [
            'menunggu_pembayaran' => \App\Models\Pesanan::where('status_pesanan', 'menunggu_pembayaran')->count(),
            'menunggu_konfirmasi_pembayaran' => \App\Models\Pesanan::where('status_pesanan', 'menunggu_konfirmasi_pembayaran')->count(),
            'dibayar' => \App\Models\Pesanan::where('status_pesanan', 'dibayar')->count(),
            'diproses' => \App\Models\Pesanan::where('status_pesanan', 'diproses')->count(),
            'selesai' => \App\Models\Pesanan::where('status_pesanan', 'selesai')->count(),
            'dibatalkan' => \App\Models\Pesanan::where('status_pesanan', 'dibatalkan')->count(),
            'pembayaran_dibatalkan' => \App\Models\Pesanan::where('status_pesanan', 'pembayaran_dibatalkan')->count(),
        ];

        $pesananHariIni = \App\Models\Pesanan::whereDate('created_at', today())->count();
        $sedangDiproses = \App\Models\Pesanan::whereIn('status_pesanan', ['dibayar', 'diproses'])->count();
        $siapDiambil = \App\Models\Pesanan::where('status_pesanan', 'selesai')->count();
        $pending = \App\Models\Pesanan::whereIn('status_pesanan', ['menunggu_pembayaran', 'menunggu_konfirmasi_pembayaran'])->count();

        return response()->json([
            'status' => 'success',
            'data' => [
                'total_users' => $totalUsers,
                'total_pelanggan' => $totalPelanggan,
                'total_produk' => $totalProduk,
                'total_pesanan' => $totalPesanan,
                'pesanan_baru' => $pesananBaru,
                'booking_menunggu' => $bookingMenunggu,
                'transaksi_menunggu_konfirmasi' => $transaksiMenungguKonfirmasi,
                'status_breakdown' => $statusBreakdown,
                'pesanan_hari_ini' => $pesananHariIni,
                'sedang_diproses' => $sedangDiproses,
                'siap_diambil' => $siapDiambil,
                'pending' => $pending,
            ],
        ]);
    }
}