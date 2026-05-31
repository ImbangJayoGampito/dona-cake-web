<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
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
 *
 * @property-read Pelanggan $pelanggan
 * @property-read Transaksi|null $transaksi
 * @property-read Notifikasi[] $notifikasis
 */
class Booking extends Model
{
    const STATUS_MENUNGGU_VERIFIKASI = 'menunggu_verifikasi';
    const STATUS_DISETUJUI = 'disetujui';
    const STATUS_DITOLAK = 'ditolak';
    const STATUS_DIBATALKAN = 'dibatalkan';
    const STATUS_SELESAI = 'selesai';

    protected $fillable = [
        'pelanggan_id',
        'transaksi_id',
        'desain_custom_url',
        'ukuran',
        'tgl_ambil',
        'harga_final',
        'status_verifikasi',
        'catatan',
    ];

    protected $casts = [
        'pelanggan_id' => 'integer',
        'transaksi_id' => 'integer',
        'tgl_ambil' => 'datetime',
        'harga_final' => 'float',
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

    public function notifikasis(): MorphMany
    {
        return $this->morphMany(Notifikasi::class, 'notifiable');
    }
}
