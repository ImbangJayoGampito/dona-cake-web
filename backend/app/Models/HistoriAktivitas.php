<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $pelanggan_id
 * @property string $jenis_aktivitas
 * @property Carbon $waktu_akses
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class HistoriAktivitas extends Model
{
    protected $fillable = [
        'pelanggan_id',
        'jenis_aktivitas',
        'produk_terkait',
        'bobot_interaksi',
        'waktu_akses',
    ];

    protected $casts = [
        'pelanggan_id' => 'integer',
        'bobot_interaksi' => 'float',
        'waktu_akses' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
