<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $user_id
 * @property string|null $alamat
 * @property string|null $no_telepon
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Pelanggan extends Model
{
    protected $fillable = [
        'user_id',
        'alamat',
        'no_telepon',
    ];

    protected $casts = [
        'user_id' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
