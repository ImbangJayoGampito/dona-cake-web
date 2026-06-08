<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Kategori extends Model
{
    protected $table = "kategoris";

    protected $fillable = ["nama_kategori", "slug", "deskripsi", "is_active"];

    protected $casts = [
        "is_active" => "boolean",
    ];

    /**
     * Boot the model to auto-generate slug
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($kategori) {
            if (empty($kategori->slug)) {
                $kategori->slug = Str::slug($kategori->nama_kategori);
            }
        });

        static::updating(function ($kategori) {
            if ($kategori->isDirty("nama_kategori")) {
                $kategori->slug = Str::slug($kategori->nama_kategori);
            }
        });
    }

    /**
     * Get all products in this category
     */
    public function produks(): HasMany
    {
        return $this->hasMany(Produk::class, "kategori_id");
    }

    /**
     * Get all bookings in this category
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class, "kategori_id");
    }

    /**
     * Scope for active categories only
     */
    public function scopeActive($query)
    {
        return $query->where("is_active", true);
    }

    /**
     * Get route key name for URL binding
     */
    public function getRouteKeyName()
    {
        return "slug";
    }

    /**
     * Get color attribute (for frontend)
     */
    public function getColorAttribute(): string
    {
        $colors = [
            "floral" => "bg-rose-500",
            "birthday" => "bg-blue-500",
            "wedding" => "bg-purple-500",
            "minimalist" => "bg-slate-500",
        ];

        return $colors[$this->slug] ?? "bg-gray-500";
    }

    /**
     * Get icon attribute
     */
    public function getIconAttribute(): string
    {
        $icons = [
            "floral" => "🌸",
            "birthday" => "🎂",
            "wedding" => "💍",
            "minimalist" => "✨",
        ];

        return $icons[$this->slug] ?? "🍰";
    }
}
