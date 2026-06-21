<?php

namespace App\Services;

use App\Models\Produk;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use RuntimeException;

class VirtualAssistantService
{
    private string $knowledgePath;
    private string $ollamaBaseUrl;
    private string $ollamaModel;
    private int $ollamaMaxTokens;
    private float $temperature;

    public function __construct()
    {
        $this->knowledgePath = base_path('../virtual-assistant/knowledge');
        $this->ollamaBaseUrl = Config::get('ollama.base_url', env('OLLAMA_BASE_URL', 'http://127.0.0.1:11434'));
        $this->ollamaModel = Config::get('ollama.model', env('OLLAMA_MODEL', 'llama2'));
        $this->ollamaMaxTokens = Config::get('ollama.max_tokens', env('OLLAMA_MAX_TOKENS', 512));
        $this->temperature = Config::get('ollama.temperature', env('OLLAMA_TEMPERATURE', 0.2));
    }

    public function answer(string $prompt, array $history = []): string
    {
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

    private function getRelevantDocuments(string $prompt, int $limit = 3): array
    {
        $promptTokens = $this->tokenize($prompt);
        $documents = $this->loadKnowledgeDocuments();

        foreach ($documents as &$document) {
            $documentTokens = $this->tokenize($document['content']);
            $document['score'] = $this->scoreDocument($promptTokens, $documentTokens);
        }

        usort($documents, static fn ($a, $b) => $b['score'] <=> $a['score']);

        return array_slice(array_filter($documents, static fn ($doc) => $doc['score'] > 0), 0, $limit);
    }

    private function loadKnowledgeDocuments(): array
    {
        if (!File::exists($this->knowledgePath) || !File::isDirectory($this->knowledgePath)) {
            return [];
        }

        $files = File::allFiles($this->knowledgePath);
        $documents = [];

        foreach ($files as $file) {
            $extension = strtolower($file->getExtension());
            if (!in_array($extension, ['txt', 'md', 'json', 'html', 'htm'], true)) {
                continue;
            }

            $content = trim(File::get($file->getRealPath()));
            if ($content === '') {
                continue;
            }

            $parsedProducts = $this->parseProductKnowledge($content);

            $documents[] = [
                'source' => $file->getRelativePathname(),
                'content' => $this->normalizeText($content),
                'excerpt' => $this->extractExcerpt($content),
                'products' => $parsedProducts,
            ];
        }

        return $documents;
    }

    /**
     * Parse product knowledge file format (Nama:/Harga:/Keterangan: blocks)
     * into structured array of products with ids matched from database.
     */
    private function parseProductKnowledge(string $content): array
    {
        $products = [];
        $blocks = preg_split('/---/', $content);

        $dbProducts = Produk::select('id', 'nama_produk', 'harga')->get();

        foreach ($blocks as $block) {
            $block = trim($block);
            if ($block === '') {
                continue;
            }

            $lines = explode("\n", $block);
            $nama = '';
            $harga = '';
            $keterangan = '';

            foreach ($lines as $line) {
                $line = trim($line);
                if (str_starts_with($line, 'Nama:')) {
                    $nama = trim(substr($line, 5));
                } elseif (str_starts_with($line, 'Harga:')) {
                    $harga = trim(substr($line, 6));
                } elseif (str_starts_with($line, 'Keterangan:')) {
                    $keterangan = trim(substr($line, 11));
                }
            }

            if ($nama !== '' && $harga !== '') {
                $id_produk = null;
                foreach ($dbProducts as $dbProduct) {
                    if (strcasecmp($dbProduct->nama_produk, $nama) === 0) {
                        $id_produk = (string) $dbProduct->id;
                        break;
                    }
                }

                $products[] = [
                    'nama' => $nama,
                    'harga' => $harga,
                    'keterangan' => $keterangan,
                    'id_produk' => $id_produk ?? '',
                ];
            }
        }

        return $products;
    }

    private function scoreDocument(array $promptTokens, array $documentTokens): float
    {
        if (empty($promptTokens) || empty($documentTokens)) {
            return 0.0;
        }

        $common = array_intersect($promptTokens, $documentTokens);
        $score = count($common);

        $documentFrequency = array_count_values($documentTokens);
        foreach ($common as $token) {
            $score += min($documentFrequency[$token], 3);
        }

        return $score / max(1, count($documentTokens));
    }

    private function tokenize(string $text): array
    {
        $normalized = preg_replace('/[^\p{L}\p{N} ]+/u', ' ', mb_strtolower($text));
        $tokens = array_filter(explode(' ', $normalized), static fn ($value) => $value !== '' && mb_strlen($value) > 1);
        return array_values(array_unique($tokens));
    }

    private function normalizeText(string $text): string
    {
        return preg_replace('/\s+/u', ' ', trim($text));
    }

    private function extractExcerpt(string $content): string
    {
        return Str::limit(preg_replace('/\s+/u', ' ', trim($content)), 600, '...');
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