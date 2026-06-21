<?php

namespace App\Services;

use App\Models\Produk;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class VirtualAssistantService
{
    private ChromaDBService $chromaDB;
    private string $ollamaBaseUrl;
    private string $ollamaModel;
    private int $ollamaMaxTokens;
    private float $temperature;

    public function __construct(ChromaDBService $chromaDB)
    {
        $this->chromaDB = $chromaDB;
        $this->ollamaBaseUrl = Config::get('ollama.base_url', env('OLLAMA_BASE_URL', 'http://127.0.0.1:11434'));
        $this->ollamaModel = Config::get('ollama.model', env('OLLAMA_MODEL', 'llama2'));
        $this->ollamaMaxTokens = Config::get('ollama.max_tokens', env('OLLAMA_MAX_TOKENS', 512));
        $this->temperature = Config::get('ollama.temperature', env('OLLAMA_TEMPERATURE', 0.2));
    }

    public function answer(string $prompt, array $history = []): string
    {
        // Get relevant documents via ChromaDB semantic search
        $documents = $this->getRelevantDocuments($prompt, 3);
        $allProducts = $this->getAllParsedProducts($documents);

        // Get relevant product IDs from parsed knowledge (matched against DB)
        $matchedIds = $this->getMatchedProductIds($allProducts, $prompt);

        // Build messages — LLM only answers plain text
        $messages = $this->buildMessages($prompt, $history, $documents);

        try {
            $llmAnswer = $this->callOllama($messages);
        } catch (\Throwable $exception) {
            $llmAnswer = 'Maaf, asisten virtual sedang tidak tersedia saat ini. Silakan coba lagi beberapa saat lagi.';
        }

        // Build final structured JSON in PHP — not relying on LLM for structure
        $response = [
            'id' => 'respon-' . uniqid(),
            'jawaban' => $llmAnswer,
            'id_produk' => $matchedIds,
        ];

        return json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    }

    /**
     * Get all products parsed from knowledge documents.
     */
    private function getAllParsedProducts(array $documents): array
    {
        $allProducts = [];
        foreach ($documents as $document) {
            if (!empty($document['products'])) {
                $allProducts = array_merge($allProducts, $document['products']);
            }
        }
        return $allProducts;
    }

    /**
     * Match products relevant to the prompt based on token overlap.
     * Returns array of integer id_produk values.
     */
    private function getMatchedProductIds(array $products, string $prompt): array
    {
        if (empty($products)) {
            return [];
        }

        $promptTokens = $this->tokenize($prompt);
        if (empty($promptTokens)) {
            return [];
        }

        $matched = [];
        foreach ($products as $product) {
            if (empty($product['id_produk'])) {
                continue;
            }

            $productTokens = $this->tokenize($product['nama'] . ' ' . ($product['keterangan'] ?? ''));
            $common = array_intersect($promptTokens, $productTokens);

            // Also check harga
            $hargaTokens = $this->tokenize($product['harga']);
            $priceCommon = array_intersect($promptTokens, $hargaTokens);

            // A product matches if there's token overlap in name/keterangan OR price
            if (count($common) > 0 || count($priceCommon) > 0) {
                $matched[] = (int) $product['id_produk'];
            }
        }

        return $matched;
    }

    /**
     * Retrieve relevant documents using ChromaDB semantic search.
     * Falls back to empty array if ChromaDB is unavailable.
     */
    private function getRelevantDocuments(string $prompt, int $limit = 3): array
    {
        try {
            $documents = $this->chromaDB->query($prompt, $limit);

            // Parse products from metadata (they come as array from ChromaDB)
            $dbProducts = Produk::select('id', 'nama_produk', 'harga')->get();
            foreach ($documents as &$document) {
                if (!empty($document['products']) && is_array($document['products'])) {
                    $parsed = [];
                    foreach ($document['products'] as $product) {
                        $nama = $product['nama'] ?? '';
                        $harga = $product['harga'] ?? '';
                        $keterangan = $product['keterangan'] ?? '';

                        $id_produk = null;
                        foreach ($dbProducts as $dbProduct) {
                            if (strcasecmp($dbProduct->nama_produk, $nama) === 0) {
                                $id_produk = (string) $dbProduct->id;
                                break;
                            }
                        }

                        $parsed[] = [
                            'nama' => $nama,
                            'harga' => $harga,
                            'keterangan' => $keterangan,
                            'id_produk' => $id_produk ?? '',
                        ];
                    }
                    $document['products'] = $parsed;
                } else {
                    $document['products'] = [];
                }
            }

            return $documents;
        } catch (\Throwable $exception) {
            // If ChromaDB is unavailable, return empty documents
            // The LLM will receive "Tidak ada dokumen pengetahuan yang relevan"
            return [];
        }
    }

    private function tokenize(string $text): array
    {
        $normalized = preg_replace('/[^\p{L}\p{N} ]+/u', ' ', mb_strtolower($text));
        $tokens = array_filter(explode(' ', $normalized), static fn ($value) => $value !== '' && mb_strlen($value) > 1);
        return array_values(array_unique($tokens));
    }

    private function buildMessages(string $prompt, array $history, array $documents): array
    {
        $system = "Anda adalah asisten virtual Dona Cake yang ramah dan membantu. Jawab pertanyaan pengguna berdasarkan informasi produk yang tersedia di Knowledge di bawah. Balas dalam Bahasa Indonesia. Jangan membuat informasi yang tidak ada di Knowledge. Jika tidak tahu, katakan tidak tahu.";

        $knowledgeBlocks = '';
        foreach ($documents as $document) {
            $knowledgeBlocks .= "
Sumber: {$document['source']}
{$document['excerpt']}
---\n";
        }

        if ($knowledgeBlocks === '') {
            $knowledgeBlocks = 'Tidak ada dokumen pengetahuan yang relevan ditemukan untuk pertanyaan ini.';
        }

        $historyText = '';
        $history = array_slice($history, -10);
        foreach ($history as $entry) {
            if (!isset($entry['role'], $entry['content'])) {
                continue;
            }
            $role = $entry['role'] === 'assistant' ? 'Asisten' : 'Pengguna';
            $historyText .= "{$role}: {$entry['content']}\n";
        }

        $userMessage = "Knowledge:
{$knowledgeBlocks}
Conversation history:
{$historyText}

Pertanyaan:
{$prompt}";

        return [
            ['role' => 'system', 'content' => $system],
            ['role' => 'user', 'content' => $userMessage],
        ];
    }

    private function callOllama(array $messages): string
    {
        $endpoint = rtrim($this->ollamaBaseUrl, '/') . '/v1/chat/completions';

        $payload = [
            'model' => $this->ollamaModel,
            'messages' => $messages,
            'max_tokens' => $this->ollamaMaxTokens,
            'temperature' => $this->temperature,
            'think' => false,
        ];

        $response = Http::timeout(120)
            ->acceptJson()
            ->post($endpoint, $payload);

        if (!$response->successful()) {
            throw new RuntimeException('Ollama request failed: ' . $response->body());
        }

        $body = $response->json();
        if (!isset($body['choices'][0]['message']['content'])) {
            throw new RuntimeException('Ollama response missing content.');
        }

        return trim($body['choices'][0]['message']['content']);
    }
}
