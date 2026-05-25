<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $pelanggan_id
 * @property int|null $transaksi_id
 * @property string|null $desain_custom_url
 * @property string|null $ukuran
 * @property Carbon|null $tgl_ambil
 * @property float|null $harga_final
 * @property string $status_verifikasi
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Booking extends Model
{
    protected $fillable = [
        'pelanggan_id',
        'transaksi_id',
        'desain_custom_url',
        'ukuran',
        'tgl_ambil',
        'harga_final',
        'status_verifikasi',
    ];

    protected $casts = [
        'pelanggan_id' => 'integer',
        'transaksi_id' => 'integer',
        'tgl_ambil' => 'datetime',
        'harga_final' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
