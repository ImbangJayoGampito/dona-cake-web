<?php

namespace App\Services;

use App\Models\Pesanan;
use App\Models\Transaksi;
use App\Models\Produk;
use App\Models\ItemPesanan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class FinancialService
{
    /**
     * Get financial summary for dashboard
     */
    public function getSummary(?Carbon $startDate = null, ?Carbon $endDate = null): array
    {
        $query = Transaksi::where('status_transaksi', 'dibayar');

        if ($startDate) {
            $query->whereDate('tgl_transaksi', '>=', $startDate);
        }
        if ($endDate) {
            $query->whereDate('tgl_transaksi', '<=', $endDate);
        }

        $totalPendapatan = $query->sum('jumlah_bayar');
        $jumlahTransaksi = $query->count();
        $rataTransaksi = $query->avg('jumlah_bayar');

        return [
            'total_pendapatan' => round($totalPendapatan, 2),
            'jumlah_transaksi' => $jumlahTransaksi,
            'rata_rata_transaksi' => round($rataTransaksi ?? 0, 2),
        ];
    }

    /**
     * Get revenue by category
     */
    public function getRevenueByCategory(?Carbon $startDate = null, ?Carbon $endDate = null): array
    {
        $query = ItemPesanan::select(
                'produks.kategori',
                DB::raw('SUM(item_pesanans.subtotal) as total_revenue'),
                DB::raw('SUM(item_pesanans.kuantitas) as total_sold')
            )
            ->join('produks', 'item_pesanans.produk_id', '=', 'produks.id')
            ->join('pesanans', 'item_pesanans.pesanan_id', '=', 'pesanans.id')
            ->join('transaksis', 'pesanans.transaksi_id', '=', 'transaksis.id')
            ->where('transaksis.status_transaksi', 'dibayar')
            ->groupBy('produks.kategori');

        if ($startDate) {
            $query->whereDate('transaksis.tgl_transaksi', '>=', $startDate);
        }
        if ($endDate) {
            $query->whereDate('transaksis.tgl_transaksi', '<=', $endDate);
        }

        return $query->get()->toArray();
    }

    /**
     * Get revenue by period (daily/weekly/monthly)
     */
    public function getRevenueByPeriod(string $period = 'daily', ?Carbon $startDate = null, ?Carbon $endDate = null): array
    {
        $dateFormat = match($period) {
            'daily' => 'DATE(tgl_transaksi)',
            'weekly' => 'YEARWEEK(tgl_transaksi)',
            'monthly' => 'DATE_FORMAT(tgl_transaksi, \'%Y-%m\')',
            default => 'DATE(tgl_transaksi)',
        };

        $query = Transaksi::select(
                DB::raw("{$dateFormat} as periode"),
                DB::raw('SUM(jumlah_bayar) as total_pendapatan'),
                DB::raw('COUNT(*) as jumlah_transaksi')
            )
            ->where('status_transaksi', 'dibayar')
            ->groupBy('periode')
            ->orderBy('periode', 'asc');

        if ($startDate) {
            $query->whereDate('tgl_transaksi', '>=', $startDate);
        }
        if ($endDate) {
            $query->whereDate('tgl_transaksi', '<=', $endDate);
        }

        return $query->get()->toArray();
    }

    /**
     * Get most popular products
     */
    public function getPopularProducts(int $limit = 10, ?Carbon $startDate = null, ?Carbon $endDate = null): array
    {
        $query = ItemPesanan::select(
                'produks.id',
                'produks.nama_produk',
                'produks.harga',
                DB::raw('SUM(item_pesanans.kuantitas) as total_terjual'),
                DB::raw('SUM(item_pesanans.subtotal) as total_pendapatan')
            )
            ->join('produks', 'item_pesanans.produk_id', '=', 'produks.id')
            ->join('pesanans', 'item_pesanans.pesanan_id', '=', 'pesanans.id')
            ->join('transaksis', 'pesanans.transaksi_id', '=', 'transaksis.id')
            ->where('transaksis.status_transaksi', 'dibayar')
            ->groupBy('produks.id', 'produks.nama_produk', 'produks.harga')
            ->orderBy('total_terjual', 'desc')
            ->limit($limit);

        if ($startDate) {
            $query->whereDate('transaksis.tgl_transaksi', '>=', $startDate);
        }
        if ($endDate) {
            $query->whereDate('transaksis.tgl_transaksi', '<=', $endDate);
        }

        return $query->get()->toArray();
    }

    /**
     * Get customer behavior report
     */
    public function getCustomerBehaviorReport(): array
    {
        $mostOrderedProducts = ItemPesanan::select(
                'produks.nama_produk',
                DB::raw('SUM(item_pesanans.kuantitas) as total_dipesan')
            )
            ->join('produks', 'item_pesanans.produk_id', '=', 'produks.id')
            ->groupBy('produks.nama_produk')
            ->orderBy('total_dipesan', 'desc')
            ->limit(10)
            ->get();

        $peakHours = Pesanan::select(
                DB::raw('HOUR(tgl_pesanan) as jam'),
                DB::raw('COUNT(*) as jumlah_pesanan')
            )
            ->groupBy('jam')
            ->orderBy('jumlah_pesanan', 'desc')
            ->limit(5)
            ->get();

        $avgTransactionPerCustomer = DB::table('pesanans')
            ->join('transaksis', 'pesanans.transaksi_id', '=', 'transaksis.id')
            ->where('transaksis.status_transaksi', 'dibayar')
            ->select(
                'pesanans.pelanggan_id',
                DB::raw('AVG(pesanans.total_harga) as rata_rata_transaksi'),
                DB::raw('COUNT(pesanans.id) as jumlah_pesanan')
            )
            ->groupBy('pesanans.pelanggan_id')
            ->get();

        $customerRetention = DB::table('pesanans')
            ->select(
                'pelanggan_id',
                DB::raw('COUNT(DISTINCT DATE(tgl_pesanan)) as hari_belanja'),
                DB::raw('MIN(tgl_pesanan) as pertama_belanja'),
                DB::raw('MAX(tgl_pesanan) as terakhir_belanja')
            )
            ->groupBy('pelanggan_id')
            ->get();

        return [
            'most_ordered_products' => $mostOrderedProducts,
            'peak_hours' => $peakHours,
            'avg_transaction_per_customer' => $avgTransactionPerCustomer,
            'customer_retention' => $customerRetention,
        ];
    }
}