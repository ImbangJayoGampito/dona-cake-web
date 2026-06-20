<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property float $jumlah_bayar
 * @property string $metode_pembayaran
 * @property string $status_transaksi
 * @property string|null $id_transaksi_gateway
 * @property Carbon $tgl_transaksi
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property-read Pesanan[] $pesanans
 * @property-read Booking[] $bookings
 */
class Transaksi extends Model
{
    const STATUS_MENUNGGU = 'menunggu';
    const STATUS_MENUNGGU_KONFIRMASI = 'menunggu_konfirmasi';
    const STATUS_DIBAYAR = 'dibayar';
    const STATUS_GAGAL = 'gagal';
    const STATUS_DIKEMBALIKAN = 'dikembalikan';

    protected $fillable = [
        'user_id',
        'jumlah_bayar',
        'metode_pembayaran',
        'status_transaksi',
        'id_transaksi_gateway',
        'tgl_transaksi',
    ];

    protected $casts = [
        'jumlah_bayar' => 'float',
        'tgl_transaksi' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function pesanans(): HasMany
    {
        return $this->hasMany(Pesanan::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function gambars(): MorphMany
    {
        return $this->morphMany(Gambar::class, 'gambarable');
    }
}
