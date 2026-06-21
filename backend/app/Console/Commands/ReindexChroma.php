<?php

namespace App\Console\Commands;

use App\Services\ChromaDBService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class ReindexChroma extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'chatbot:reindex
                            {--force : Skip confirmation prompt}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Re-index all knowledge documents into ChromaDB for semantic search';

    /**
     * Execute the console command.
     */
    public function handle(ChromaDBService $chromaDB): int
    {
        $this->info('=== ChromaDB Reindex ===');
        $this->line('');

        // Check health first
        $this->line('Checking ChromaDB service health...');
        if (!$chromaDB->isHealthy()) {
            $this->error('ChromaDB service is not running!');
            $this->line('');
            $this->line('Make sure the ChromaDB Python service is running:');
            $this->line('  cd virtual-assistant && python chroma_service.py');
            $this->line('');
            $this->line('Or use the start script:');
            $this->line('  php artisan chatbot:start-chroma');
            return Command::FAILURE;
        }
        $this->info('✓ ChromaDB service is healthy');

        // Confirm unless --force
        if (!$this->option('force')) {
            if (!$this->confirm('This will delete existing index and rebuild from scratch. Continue?')) {
                $this->info('Reindex cancelled.');
                return Command::SUCCESS;
            }
        }

        $this->line('');
        $this->line('Reindexing knowledge documents into ChromaDB...');
        $this->line('This may take a few minutes depending on the number of documents.');
        $this->line('');

        try {
            $result = $chromaDB->reindex();
        } catch (\Throwable $e) {
            $this->error('Reindex failed: ' . $e->getMessage());
            Log::error('ChromaDB reindex failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return Command::FAILURE;
        }

        if (($result['status'] ?? '') === 'success') {
            $total = $result['total_documents'] ?? 0;
            $this->info("✓ Reindex completed successfully!");
            $this->info("  Total documents indexed: {$total}");
            return Command::SUCCESS;
        }

        $this->error('Reindex failed: ' . ($result['message'] ?? 'Unknown error'));
        return Command::FAILURE;
    }
}