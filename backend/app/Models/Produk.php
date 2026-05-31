<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $nama_produk
 * @property float $harga
 * @property int $stok
 * @property string|null $kategori
 * @property float $rating_rata_rata
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property-read Ulasan[]|HasMany $ulasans
 * @property-read Gambar[]|MorphMany $gambars
 * @property-read Gambar|null $gambarUtama
 * @property-read Gambar|null $gambarTerbaru
 */
class Produk extends Model
{
    protected $fillable = [
        'nama_produk',
        'harga',
        'stok',
        'kategori',
        'deskripsi',
        'rating_rata_rata',
    ];

    protected $casts = [
        'harga' => 'float',
        'stok' => 'integer',
        'rating_rata_rata' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function ulasans(): HasMany
    {
        return $this->hasMany(Ulasan::class);
    }

    /**
     * Relasi polymorphic ke gambar (one-to-many)
     * Satu produk bisa memiliki banyak gambar
     */
    public function gambars(): MorphMany
    {
        return $this->morphMany(Gambar::class, 'gambarable');
    }

    /**
     * Relasi untuk mengambil gambar pertama/utama produk
     */
    public function gambarUtama()
    {
        return $this->morphOne(Gambar::class, 'gambarable')->latest();
    }

    /**
     * Relasi untuk mengambil gambar terbaru
     */
    public function gambarTerbaru()
    {
        return $this->morphOne(Gambar::class, 'gambarable')->latestOfMany();
    }

    public function keranjangs(): HasMany
    {
        return $this->hasMany(Keranjang::class);
    }

    public function itemPesanans(): HasMany
    {
        return $this->hasMany(ItemPesanan::class);
    }

    public function historiAktivitas(): HasMany
    {
        return $this->hasMany(HistoriAktivitas::class, 'produk_terkait', 'id');
    }
}
