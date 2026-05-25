<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $pelanggan_id
 * @property int|null $transaksi_id
 * @property Carbon $tgl_pesanan
 * @property float $total_harga
 * @property string $status_pesanan
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Pesanan extends Model
{
    protected $fillable = [
        'pelanggan_id',
        'transaksi_id',
        'tgl_pesanan',
        'total_harga',
        'status_pesanan',
    ];

    protected $casts = [
        'pelanggan_id' => 'integer',
        'transaksi_id' => 'integer',
        'tgl_pesanan' => 'datetime',
        'total_harga' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
