<?php

namespace App\Http\Controllers;

use App\Models\ChatbotLog;
use App\Services\VirtualAssistantService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ChatbotLogController extends Controller
{
    private VirtualAssistantService $virtualAssistantService;

    public function __construct(VirtualAssistantService $virtualAssistantService)
    {
        $this->virtualAssistantService = $virtualAssistantService;
    }

    /**
     * Get user's conversation list.
     */
    public function index(Request $request): JsonResponse
    {
        $conversations = ChatbotLog::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 20));

        return response()->json([
            'status' => 'success',
            'data' => $conversations->items(),
            'pagination' => [
                'current_page' => $conversations->currentPage(),
                'last_page' => $conversations->lastPage(),
                'per_page' => $conversations->perPage(),
                'total' => $conversations->total(),
            ],
        ]);
    }

    /**
     * Start a new conversation with the virtual assistant.
     */
    public function startConversation(Request $request): JsonResponse
    {
        $conversation = ChatbotLog::create([
            'user_id' => $request->user()->id,
            'histori_percakapan' => [],
            'status_flag' => 'aktif',
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Percakapan dimulai.',
            'data' => [
                'id' => $conversation->id,
                'message' => 'Halo! Saya asisten virtual Dona Cake. Ada yang bisa saya bantu?',
            ],
        ], 201);
    }

    /**
     * Send a message in a conversation.
     */
    public function sendMessage(Request $request, ChatbotLog $chatbotLog): JsonResponse
    {
        if ($chatbotLog->user_id !== $request->user()->id || $chatbotLog->status_flag !== 'aktif') {
            return response()->json([
                'status' => 'error',
                'message' => 'Percakapan tidak ditemukan atau sudah berakhir.',
            ], 404);
        }

        $request->validate([
            'prompt' => 'required|string|max:2000',
        ]);

        // Get conversation history
        $history = $chatbotLog->histori_percakapan ?? [];

        // Add user message to history after generating the reply
        $userMessage = [
            'role' => 'user',
            'content' => $request->prompt,
            'timestamp' => now()->toIso8601String(),
        ];

        // Generate response via virtual assistant service with RAG and local Ollama
        $response = $this->virtualAssistantService->answer($request->prompt, $history);

        $history[] = $userMessage;
        $history[] = [
            'role' => 'assistant',
            'content' => $response,
            'timestamp' => now()->toIso8601String(),
        ];

        // Update conversation
        $chatbotLog->update([
            'histori_percakapan' => $history,
        ]);

        return response()->json([
            'status' => 'success',
            'data' => [
                'response' => $response,
                'conversation_id' => $chatbotLog->id,
            ],
        ]);
    }

    /**
     * Show conversation detail.
     */
    public function show(Request $request, ChatbotLog $chatbotLog): JsonResponse
    {
        if ($chatbotLog->user_id !== $request->user()->id) {
            return response()->json([
                'status' => 'error',
                'message' => 'Anda tidak memiliki akses ke percakapan ini.',
            ], 403);
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'id' => $chatbotLog->id,
                'history' => $chatbotLog->histori_percakapan ?? [],
                'status' => $chatbotLog->status_flag,
                'created_at' => $chatbotLog->created_at,
                'updated_at' => $chatbotLog->updated_at,
            ],
        ]);
    }

    /**
     * Reset conversation context.
     */
    public function resetConversation(Request $request, ChatbotLog $chatbotLog): JsonResponse
    {
        if ($chatbotLog->user_id !== $request->user()->id) {
            return response()->json(['status' => 'error', 'message' => 'Akses ditolak.'], 403);
        }

        $chatbotLog->update([
            'histori_percakapan' => [],
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Percakapan telah direset.',
        ]);
    }

    /**
     * Report a conversation.
     */
    public function reportConversation(Request $request, ChatbotLog $chatbotLog): JsonResponse
    {
        if ($chatbotLog->user_id !== $request->user()->id) {
            return response()->json(['status' => 'error', 'message' => 'Akses ditolak.'], 403);
        }

        $request->validate([
            'alasan' => 'required|string|max:500',
            'komentar' => 'nullable|string|max:2000',
        ]);

        $chatbotLog->update([
            'status_flag' => 'dilaporkan',
        ]);

        // In production, this would create a report record for admin review
        return response()->json([
            'status' => 'success',
            'message' => 'Laporan berhasil dikirim. Terima kasih atas masukan Anda.',
        ]);
    }

    /**
     * End a conversation.
     */
    public function endConversation(Request $request, ChatbotLog $chatbotLog): JsonResponse
    {
        if ($chatbotLog->user_id !== $request->user()->id) {
            return response()->json(['status' => 'error', 'message' => 'Akses ditolak.'], 403);
        }

        $chatbotLog->update(['status_flag' => 'selesai']);

        return response()->json([
            'status' => 'success',
            'message' => 'Percakapan telah diakhiri.',
        ]);
    }

    /**
     * Admin: Get all conversations for monitoring.
     */
    public function adminIndex(Request $request): JsonResponse
    {
        $query = ChatbotLog::with('user');

        if ($request->has('search')) {
            $query->whereHas('user', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('username', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->has('status')) {
            $query->where('status_flag', $request->status);
        }

        $conversations = $query->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 20));

        return response()->json([
            'status' => 'success',
            'data' => $conversations->items(),
            'pagination' => [
                'current_page' => $conversations->currentPage(),
                'last_page' => $conversations->lastPage(),
                'per_page' => $conversations->perPage(),
                'total' => $conversations->total(),
            ],
        ]);
    }

    /**
     * Admin: View full conversation detail.
     */
    public function adminShow(ChatbotLog $chatbotLog): JsonResponse
    {
        $chatbotLog->load('user');

        return response()->json([
            'status' => 'success',
            'data' => [
                'id' => $chatbotLog->id,
                'user' => $chatbotLog->user,
                'history' => $chatbotLog->histori_percakapan ?? [],
                'status' => $chatbotLog->status_flag,
                'created_at' => $chatbotLog->created_at,
                'updated_at' => $chatbotLog->updated_at,
            ],
        ]);
    }

}
