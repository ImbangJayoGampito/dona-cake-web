<?php

namespace App\Services;

use App\Models\Pesanan;
use App\Models\Booking;
use App\Models\ItemPesanan;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class ProductionQueueService
{
    /**
     * Get the production queue sorted by priority and deadline
     * Custom designs have higher priority, sorted by tgl_pesanan ascending
     */
    public function getQueue(): array
    {
        // Get orders that need production
        $pesanans = Pesanan::with(['pelanggan.user', 'itemPesanans.produk'])
            ->whereIn('status_pesanan', [Pesanan::STATUS_DIBAYAR, Pesanan::STATUS_DIPROSES])
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'tipe' => 'pesanan',
                    'pelanggan' => $item->pelanggan->user->name ?? 'N/A',
                    'produk' => $item->itemPesanans->map(fn($i) => $i->produk->nama_produk . ' x' . $i->kuantitas)->implode(', '),
                    'tanggal' => $item->tgl_pesanan,
                    'deadline' => $item->tgl_pesanan->addDays(3), // estimated 3 days production
                    'status' => $item->status_pesanan,
                    'prioritas' => 'normal',
                ];
            });

        // Get bookings that need production
        $bookings = Booking::with(['pelanggan.user'])
            ->whereIn('status_verifikasi', [Booking::STATUS_DISETUJUI])
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'tipe' => 'booking',
                    'pelanggan' => $item->pelanggan->user->name ?? 'N/A',
                    'produk' => 'Custom Design: ' . ($item->ukuran ?? 'N/A'),
                    'tanggal' => $item->created_at,
                    'deadline' => $item->tgl_ambil,
                    'status' => $item->status_verifikasi,
                    'prioritas' => 'tinggi', // custom designs have higher priority
                ];
            });

        // Merge, sort by priority then deadline
        $queue = $pesanans->concat($bookings)->toArray();

        usort($queue, function ($a, $b) {
            // Higher priority first, then earlier deadline
            $priorityOrder = ['tinggi' => 0, 'normal' => 1];
            $aPrio = $priorityOrder[$a['prioritas']] ?? 1;
            $bPrio = $priorityOrder[$b['prioritas']] ?? 1;
            
            if ($aPrio !== $bPrio) {
                return $aPrio - $bPrio;
            }

            return $a['deadline'] <=> $b['deadline'];
        });

        return $queue;
    }

    /**
     * Get daily production capacity
     * Can be configured in settings
     */
    public function getDailyCapacity(): int
    {
        return 10; // Default daily capacity
    }

    /**
     * Get today's production load
     */
    public function getTodayLoad(): array
    {
        $today = now()->startOfDay();
        $tomorrow = now()->endOfDay();

        $count = Pesanan::whereIn('status_pesanan', [Pesanan::STATUS_DIBAYAR, Pesanan::STATUS_DIPROSES])
            ->whereBetween('tgl_pesanan', [$today, $tomorrow])
            ->count();

        $bookingCount = Booking::where('status_verifikasi', Booking::STATUS_DISETUJUI)
            ->whereBetween('tgl_ambil', [$today, $tomorrow])
            ->count();

        return [
            'total' => $count + $bookingCount,
            'pesanan' => $count,
            'booking' => $bookingCount,
            'kapasitas' => $this->getDailyCapacity(),
        ];
    }
}