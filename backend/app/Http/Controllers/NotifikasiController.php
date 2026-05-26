<?php

namespace App\Http\Controllers;

use App\Models\Notifikasi;
use App\Services\NotificationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotifikasiController extends Controller
{
    protected NotificationService $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    /**
     * Get user's notifications.
     */
    public function index(Request $request): JsonResponse
    {
        $userId = $request->user()->id;

        $notifikasis = Notifikasi::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 20));

        $unreadCount = $this->notificationService->getUnreadCount($userId);

        return response()->json([
            'status' => 'success',
            'data' => $notifikasis->items(),
            'unread_count' => $unreadCount,
            'pagination' => [
                'current_page' => $notifikasis->currentPage(),
                'last_page' => $notifikasis->lastPage(),
                'per_page' => $notifikasis->perPage(),
                'total' => $notifikasis->total(),
            ],
        ]);
    }

    /**
     * Mark notification as read.
     */
    public function markAsRead(Notifikasi $notifikasi): JsonResponse
    {
        $this->notificationService->markAsRead($notifikasi->id);

        return response()->json([
            'status' => 'success',
            'message' => 'Notifikasi ditandai sudah dibaca.',
        ]);
    }

    /**
     * Mark all notifications as read.
     */
    public function markAllAsRead(Request $request): JsonResponse
    {
        $this->notificationService->markAllAsRead($request->user()->id);

        return response()->json([
            'status' => 'success',
            'message' => 'Semua notifikasi ditandai sudah dibaca.',
        ]);
    }

    /**
     * Get unread count.
     */
    public function unreadCount(Request $request): JsonResponse
    {
        $count = $this->notificationService->getUnreadCount($request->user()->id);

        return response()->json([
            'status' => 'success',
            'data' => ['unread_count' => $count],
        ]);
    }
}