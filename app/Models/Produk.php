<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
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
 */
class Produk extends Model
{
    protected $fillable = [
        'nama_produk',
        'harga',
        'stok',
        'kategori',
        'rating_rata_rata',
    ];

    protected $casts = [
        'harga' => 'float',
        'stok' => 'integer',
        'rating_rata_rata' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
