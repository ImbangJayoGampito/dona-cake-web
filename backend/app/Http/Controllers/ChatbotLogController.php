<?php

namespace App\Http\Controllers;

use App\Models\ChatbotLog;
use App\Models\Pelanggan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ChatbotLogController extends Controller
{
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
            'histori_percakapan' => json_encode([]),
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
        $history = json_decode($chatbotLog->histori_percakapan, true) ?? [];
        
        // Add user message
        $history[] = [
            'role' => 'user',
            'content' => $request->prompt,
            'timestamp' => now()->toIso8601String(),
        ];

        // Simulate response (this would be connected to the actual LLM/RAG system)
        $response = $this->generateResponse($request->prompt, $history);

        // Add assistant response
        $history[] = [
            'role' => 'assistant',
            'content' => $response,
            'timestamp' => now()->toIso8601String(),
        ];

        // Update conversation
        $chatbotLog->update([
            'histori_percakapan' => json_encode($history),
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
                'history' => json_decode($chatbotLog->histori_percakapan, true) ?? [],
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
            'histori_percakapan' => json_encode([]),
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
                'history' => json_decode($chatbotLog->histori_percakapan, true) ?? [],
                'status' => $chatbotLog->status_flag,
                'created_at' => $chatbotLog->created_at,
                'updated_at' => $chatbotLog->updated_at,
            ],
        ]);
    }

    /**
     * Generate a simulated response (placeholder for actual LLM integration).
     */
    private function generateResponse(string $prompt, array $history): string
    {
        // This is a placeholder. In production, this would call the actual LLM/RAG system.
        $lowerPrompt = strtolower($prompt);

        if (str_contains($lowerPrompt, 'menu') || str_contains($lowerPrompt, 'produk') || str_contains($lowerPrompt, 'kue')) {
            return 'Kami memiliki berbagai macam kue lezat! Beberapa produk unggulan kami: Blackforest Cake (Rp 150.000), Choco Crunchy Bento Cake (Rp 45.000), dan Red Velvet Cake (Rp 180.000). Anda bisa melihat katalog lengkap di halaman produk. Ada yang spesifik ingin Anda tanyakan?';
        }

        if (str_contains($lowerPrompt, 'jam') || str_contains($lowerPrompt, 'buka') || str_contains($lowerPrompt, 'operasional')) {
            return 'Toko Dona Cake buka setiap hari Senin - Sabtu pukul 08.00 - 18.00 WIB. Hari Minggu kami buka pukul 09.00 - 15.00 WIB. Ada yang bisa kami bantu lagi?';
        }

        if (str_contains($lowerPrompt, 'harga') || str_contains($lowerPrompt, 'mahal') || str_contains($lowerPrompt, 'murah')) {
            return 'Kisaran harga produk kami bervariasi mulai dari Rp 25.000 hingga Rp 500.000 tergantung ukuran dan jenis kue. Untuk informasi harga lebih detail, silakan cek halaman produk atau beri tahu saya kue apa yang Anda minati!';
        }

        if (str_contains($lowerPrompt, 'pesan') || str_contains($lowerPrompt, 'order') || str_contains($lowerPrompt, 'beli')) {
            return 'Untuk melakukan pemesanan, Anda bisa langsung menambahkan produk ke keranjang dan melakukan checkout. Untuk kue custom, silakan gunakan fitur Booking. Proses pembayaran bisa dilakukan melalui transfer bank. Ada yang ingin ditanyakan lebih lanjut?';
        }

        return 'Terima kasih atas pertanyaannya! Saya akan dengan senang hati membantu Anda. Apakah Anda ingin tahu tentang produk kami, cara pemesanan, atau informasi lainnya seputar Dona Cake?';
    }
}