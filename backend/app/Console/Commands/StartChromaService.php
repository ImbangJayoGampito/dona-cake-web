<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class StartChromaService extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'chatbot:start-chroma';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Start the ChromaDB Python service for semantic search';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $pythonPath = 'python';
        $scriptPath = base_path('../virtual-assistant/chroma_service.py');

        if (!file_exists($scriptPath)) {
            $this->error("ChromaDB service script not found at: {$scriptPath}");
            return Command::FAILURE;
        }

        $this->info('Starting ChromaDB service...');

        if (PHP_OS_FAMILY === 'Windows') {
            $command = sprintf(
                'start "ChromaDB" cmd /c "%s %s"',
                $pythonPath,
                $scriptPath
            );
        } else {
            $command = sprintf(
                'nohup %s %s > /dev/null 2>&1 &',
                $pythonPath,
                $scriptPath
            );
        }

        exec($command);

        $this->info('ChromaDB service started on http://127.0.0.1:8001');
        $this->line('');
        $this->line('Run "php artisan chatbot:reindex" to index knowledge documents.');

        return Command::SUCCESS;
    }
}