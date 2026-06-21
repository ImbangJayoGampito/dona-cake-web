<?php

namespace App\Console\Commands;

use App\Models\Pelanggan;
use App\Services\RecommendationService;
use Illuminate\Console\Command;

/**
 * Batch refresh cache rekomendasi untuk semua pelanggan aktif.
 *
 * Jalankan manual:
 *   php artisan recommendation:refresh
 *
 * Jadwalkan otomatis tiap malam jam 02:00 via routes/console.php:
 *
 *   use Illuminate\Support\Facades\Schedule;
 *   Schedule::command('recommendation:refresh')->dailyAt('02:00');
 *
 * Atau jika masih pakai app/Console/Kernel.php (Laravel < 11):
 *
 *   $schedule->command('recommendation:refresh')->dailyAt('02:00');
 */
class RefreshRecommendationCache extends Command
{
    protected $signature   = 'recommendation:refresh {--pelanggan_id= : Refresh hanya untuk satu pelanggan}';
    protected $description = 'Refresh cache rekomendasi untuk semua pelanggan aktif (atau satu pelanggan via --pelanggan_id)';

    public function __construct(protected RecommendationService $recommendationService)
    {
        parent::__construct();
    }

    public function handle(): int
    {
        $specificId = $this->option('pelanggan_id');

        if ($specificId) {
            $pelangganIds = [(int) $specificId];
        } else {
            // Ambil hanya pelanggan yang pernah punya histori aktivitas (efisiensi)
            $pelangganIds = \App\Models\HistoriAktivitas::distinct()
                ->pluck('pelanggan_id')
                ->toArray();
        }

        if (empty($pelangganIds)) {
            $this->info('Tidak ada pelanggan dengan histori aktivitas. Selesai.');
            return self::SUCCESS;
        }

        $this->info("Refresh cache rekomendasi untuk " . count($pelangganIds) . " pelanggan...");
        $bar = $this->output->createProgressBar(count($pelangganIds));
        $bar->start();

        $berhasil = 0;
        $gagal    = 0;

        foreach ($pelangganIds as $pelangganId) {
            try {
                // Hapus cache lama dulu
                $this->recommendationService->invalidateCache($pelangganId);

                // Ambil user_id dari pelanggan untuk memanggil getRecommendations
                $pelanggan = \App\Models\Pelanggan::find($pelangganId);
                if ($pelanggan) {
                    // Panggil getRecommendations → akan compute & simpan ke cache
                    $this->recommendationService->getRecommendations($pelanggan->user_id);
                    $berhasil++;
                }
            } catch (\Throwable $e) {
                $gagal++;
                $this->newLine();
                $this->warn("Gagal untuk pelanggan #{$pelangganId}: " . $e->getMessage());
            }

            $bar->advance();
        }

        $bar->finish();
        $this->newLine();
        $this->info("Selesai. Berhasil: {$berhasil}, Gagal: {$gagal}.");

        return self::SUCCESS;
    }
}
