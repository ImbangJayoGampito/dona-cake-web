<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $pesanan_id
 * @property int $produk_id
 * @property int $kuantitas
 * @property float $subtotal
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class ItemPesanan extends Model
{
    protected $fillable = [
        'pesanan_id',
        'produk_id',
        'kuantitas',
        'subtotal',
    ];

    protected $casts = [
        'pesanan_id' => 'integer',
        'produk_id' => 'integer',
        'kuantitas' => 'integer',
        'subtotal' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
