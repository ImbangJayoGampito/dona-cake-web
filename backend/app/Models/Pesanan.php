<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
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
 *
 * @property-read Pelanggan $pelanggan
 * @property-read Transaksi|null $transaksi
 * @property-read ItemPesanan[] $itemPesanans
 * @property-read Notifikasi[] $notifikasis
 */
class Pesanan extends Model
{
    const STATUS_MENUNGGU_PEMBAYARAN = 'menunggu_pembayaran';
    const STATUS_DIBAYAR = 'dibayar';
    const STATUS_DIPROSES = 'diproses';
    const STATUS_SELESAI = 'selesai';
    const STATUS_DIBATALKAN = 'dibatalkan';
    const STATUS_PEMBAYARAN_DIBATALKAN = 'pembayaran_dibatalkan';

    const STATUS_TRANSITIONS = [
        self::STATUS_MENUNGGU_PEMBAYARAN => [self::STATUS_DIBAYAR, self::STATUS_PEMBAYARAN_DIBATALKAN],
        self::STATUS_DIBAYAR => [self::STATUS_DIPROSES, self::STATUS_DIBATALKAN],
        self::STATUS_DIPROSES => [self::STATUS_SELESAI, self::STATUS_DIBATALKAN],
        self::STATUS_SELESAI => [],
        self::STATUS_DIBATALKAN => [],
        self::STATUS_PEMBAYARAN_DIBATALKAN => [self::STATUS_MENUNGGU_PEMBAYARAN],
    ];

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

    public function pelanggan(): BelongsTo
    {
        return $this->belongsTo(Pelanggan::class);
    }

    public function transaksi(): BelongsTo
    {
        return $this->belongsTo(Transaksi::class);
    }

    public function itemPesanans(): HasMany
    {
        return $this->hasMany(ItemPesanan::class);
    }

    public function notifikasis(): MorphMany
    {
        return $this->morphMany(Notifikasi::class, 'notifiable');
    }

    /**
     * Check if status transition is valid
     */
    public function canTransitionTo(string $newStatus): bool
    {
        if (!isset(self::STATUS_TRANSITIONS[$this->status_pesanan])) {
            return false;
        }
        return in_array($newStatus, self::STATUS_TRANSITIONS[$this->status_pesanan]);
    }
}
