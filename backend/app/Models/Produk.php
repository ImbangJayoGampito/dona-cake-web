<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
/**
 * @property int $id
 * @property string $nama_produk
 * @property float $harga
 * @property int $stok
 * @property string|null $deskripsi
 * @property int|null $kategori_id  // Changed from $kategori
 * @property float $rating_rata_rata
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property-read Kategori|null $kategori  // Changed relationship
 * @property-read Ulasan[]|HasMany $ulasans
 * @property-read Gambar[]|MorphMany $gambars
 * @property-read Gambar|null $gambarUtama
 * @property-read Gambar|null $gambarTerbaru
 * @property-read Keranjang[]|HasMany $keranjangs
 * @property-read ItemPesanan[]|HasMany $itemPesanans
 */
class Produk extends Model
{
    protected $table = "produks";

    protected $fillable = [
        "nama_produk",
        "harga",
        "stok",
        "slug",
        "kategori_id", // Changed from 'kategori'
        "deskripsi",
        "keterangan",
        "rating_rata_rata",
    ];

    protected $casts = [
        "harga" => "decimal:2",
        "stok" => "integer",
        "rating_rata_rata" => "decimal:2",
        "created_at" => "datetime",
        "updated_at" => "datetime",
    ];

    /**
     * Relationship with Kategori (Fixed from string to foreign key)
     */
    public function kategori(): BelongsTo
    {
        return $this->belongsTo(Kategori::class, "kategori_id");
    }
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($produk) {
            if (empty($produk->slug)) {
                $produk->slug = Str::slug($produk->nama_produk);
            }
        });
    }
    /**
     * Relationship with Ulasan
     */
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
        return $this->morphMany(Gambar::class, "gambarable");
    }

    /**
     * Relasi untuk mengambil gambar pertama/utama produk
     */
    public function gambarUtama()
    {
        return $this->morphOne(Gambar::class, "gambarable")->latest();
    }

    /**
     * Relasi untuk mengambil gambar terbaru
     */
    public function gambarTerbaru()
    {
        return $this->morphOne(Gambar::class, "gambarable")->latestOfMany();
    }

    /**
     * Relationship with Keranjang
     */
    public function keranjangs(): HasMany
    {
        return $this->hasMany(Keranjang::class);
    }

    /**
     * Relationship with ItemPesanan
     */
    public function itemPesanans(): HasMany
    {
        return $this->hasMany(ItemPesanan::class);
    }

    /**
     * Check if product is in stock
     */
    public function isInStock(): bool
    {
        return $this->stok > 0;
    }

    /**
     * Check if product has sufficient stock
     */
    public function hasSufficientStock(int $quantity): bool
    {
        return $this->stok >= $quantity;
    }

    /**
     * Reduce stock
     */
    public function reduceStock(int $quantity): bool
    {
        if (!$this->hasSufficientStock($quantity)) {
            return false;
        }

        $this->stok -= $quantity;
        return $this->save();
    }

    /**
     * Increase stock
     */
    public function increaseStock(int $quantity): bool
    {
        $this->stok += $quantity;
        return $this->save();
    }

    /**
     * Update average rating
     */
    public function updateRating(): void
    {
        $this->rating_rata_rata = $this->ulasans()->avg("rating") ?? 0;
        $this->save();
    }

    /**
     * Scope for products with low stock
     */
    public function scopeLowStock($query, int $threshold = 10)
    {
        return $query->where("stok", "<=", $threshold);
    }

    /**
     * Scope for products with high rating
     */
    public function scopeHighRated($query, float $minRating = 4.0)
    {
        return $query->where("rating_rata_rata", ">=", $minRating);
    }

    /**
     * Scope for products in stock
     */
    public function scopeInStock($query)
    {
        return $query->where("stok", ">", 0);
    }

    /**
     * Scope by kategori
     */
    public function scopeByKategori($query, $kategoriId)
    {
        return $query->where("kategori_id", $kategoriId);
    }

    /**
     * Accessor for formatted price
     */
    public function getFormattedHargaAttribute(): string
    {
        return "Rp " . number_format($this->harga, 0, ",", ".");
    }

    /**
     * Accessor for stock status
     */
    public function getStockStatusAttribute(): string
    {
        if ($this->stok <= 0) {
            return "Habis";
        }

        if ($this->stok <= 5) {
            return "Hampir Habis";
        }

        return "Tersedia";
    }

    /**
     * Accessor for stock badge color
     */
    public function getStockBadgeColorAttribute(): string
    {
        return match ($this->stock_status) {
            "Habis" => "red",
            "Hampir Habis" => "yellow",
            "Tersedia" => "green",
            default => "gray",
        };
    }
}
