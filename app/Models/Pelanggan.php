<?php

namespace App\Models;

use App\Models\Ulasan;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
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

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function ulasans(): HasMany
    {
        return $this->hasMany(Ulasan::class);
    }
}
