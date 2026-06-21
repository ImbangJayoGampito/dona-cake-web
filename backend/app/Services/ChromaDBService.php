<?php

namespace App\Services;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class ChromaDBService
{
    private string $baseUrl;
    private int $timeout;

    public function __construct()
    {
        $this->baseUrl = Config::get('chromadb.base_url', 'http://127.0.0.1:8001');
        $this->timeout = 60;
    }

    /**
     * Query ChromaDB for documents relevant to the given prompt.
     *
     * @param string $prompt The user's question/prompt
     * @param int $nResults Number of results to return (default: 3)
     * @return array Array of documents with 'source', 'content', 'excerpt', 'products' keys
     * @throws RuntimeException
     */
    public function query(string $prompt, int $nResults = 3): array
    {
        $endpoint = rtrim($this->baseUrl, '/') . '/query';

        $response = Http::timeout($this->timeout)
            ->acceptJson()
            ->post($endpoint, [
                'prompt' => $prompt,
                'n_results' => $nResults,
            ]);

        if (!$response->successful()) {
            throw new RuntimeException(
                'ChromaDB query failed: ' . $response->body()
            );
        }

        $body = $response->json();

        if (($body['status'] ?? '') !== 'success') {
            throw new RuntimeException(
                'ChromaDB query error: ' . ($body['message'] ?? 'Unknown error')
            );
        }

        $documents = $body['documents'] ?? [];
        $metadatas = $body['metadatas'] ?? [];
        $distances = $body['distances'] ?? [];

        // Transform into the same format expected by VirtualAssistantService
        $result = [];
        foreach ($documents as $i => $content) {
            $meta = $metadatas[$i] ?? [];

            $result[] = [
                'source' => $meta['source'] ?? 'unknown',
                'content' => $content ?? '',
                'excerpt' => $meta['excerpt'] ?? '',
                'products' => $meta['products'] ?? [],
                'distance' => $distances[$i] ?? 0.0,
            ];
        }

        return $result;
    }

    /**
     * Trigger reindex of all knowledge documents into ChromaDB.
     *
     * @return array Response with status and message
     * @throws RuntimeException
     */
    public function reindex(): array
    {
        $endpoint = rtrim($this->baseUrl, '/') . '/reindex';

        $response = Http::timeout(300) // 5 minutes timeout for indexing
            ->acceptJson()
            ->post($endpoint);

        if (!$response->successful()) {
            throw new RuntimeException(
                'ChromaDB reindex failed: ' . $response->body()
            );
        }

        return $response->json();
    }

    /**
     * Check if ChromaDB service is healthy.
     *
     * @return bool
     */
    public function isHealthy(): bool
    {
        try {
            $endpoint = rtrim($this->baseUrl, '/') . '/health';
            $response = Http::timeout(5)->get($endpoint);
            return $response->successful();
        } catch (\Throwable) {
            return false;
        }
    }
}