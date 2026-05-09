<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property float $jumlah_bayar
 * @property string $metode_pembayaran
 * @property Carbon $tgl_transaksi
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Transaksi extends Model
{
    protected $fillable = [
        'jumlah_bayar',
        'metode_pembayaran',
        'tgl_transaksi',
    ];

    protected $casts = [
        'jumlah_bayar' => 'float',
        'tgl_transaksi' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
