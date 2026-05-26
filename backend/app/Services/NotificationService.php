<?php

namespace App\Services;

use App\Models\Notifikasi;
use App\Models\User;

class NotificationService
{
    /**
     * Create a notification for a user
     */
    public function create(int $userId, string $judul, string $pesan, string $tipe = 'info', ?string $notifiableType = null, ?int $notifiableId = null): Notifikasi
    {
        return Notifikasi::create([
            'user_id' => $userId,
            'judul' => $judul,
            'pesan' => $pesan,
            'tipe' => $tipe,
            'notifiable_type' => $notifiableType,
            'notifiable_id' => $notifiableId,
        ]);
    }

    /**
     * Send notification to admin users
     */
    public function sendToAdmins(string $judul, string $pesan, string $tipe = 'info', ?string $notifiableType = null, ?int $notifiableId = null): void
    {
        $admins = User::role('admin')->get();
        foreach ($admins as $admin) {
            $this->create($admin->id, $judul, $pesan, $tipe, $notifiableType, $notifiableId);
        }
    }

    /**
     * Send notification to karyawan users
     */
    public function sendToKaryawans(string $judul, string $pesan, string $tipe = 'info', ?string $notifiableType = null, ?int $notifiableId = null): void
    {
        $karyawans = User::role('karyawan')->get();
        foreach ($karyawans as $karyawan) {
            $this->create($karyawan->id, $judul, $pesan, $tipe, $notifiableType, $notifiableId);
        }
    }

    /**
     * Send notification to both admin and karyawan
     */
    public function sendToStaff(string $judul, string $pesan, string $tipe = 'info', ?string $notifiableType = null, ?int $notifiableId = null): void
    {
        $this->sendToAdmins($judul, $pesan, $tipe, $notifiableType, $notifiableId);
        $this->sendToKaryawans($judul, $pesan, $tipe, $notifiableType, $notifiableId);
    }

    /**
     * Get unread notifications count for a user
     */
    public function getUnreadCount(int $userId): int
    {
        return Notifikasi::where('user_id', $userId)
            ->where('is_read', false)
            ->count();
    }

    /**
     * Mark notification as read
     */
    public function markAsRead(int $notificationId): bool
    {
        return Notifikasi::where('id', $notificationId)->update(['is_read' => true]);
    }

    /**
     * Mark all notifications as read for a user
     */
    public function markAllAsRead(int $userId): bool
    {
        return Notifikasi::where('user_id', $userId)
            ->where('is_read', false)
            ->update(['is_read' => true]);
    }
}