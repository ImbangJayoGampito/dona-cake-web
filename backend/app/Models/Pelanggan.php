<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;


/**
 * @property int $id
 * @property int $user_id
 * @property string|null $alamat
 * @property string|null $no_telepon
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property-read User $user
 * @property-read Pesanan[] $pesanans
 * @property-read Booking[] $bookings
 * @property-read Ulasan[] $ulasans
 * @property-read HistoriAktivitas[] $historiAktivitas
 */
class Pelanggan extends Model
{
    use HasFactory;
    protected $fillable = ["user_id", "alamat", "no_telepon"];

    protected $casts = [
        "user_id" => "integer",
        "created_at" => "datetime",
        "updated_at" => "datetime",
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function pesanans(): HasMany
    {
        return $this->hasMany(Pesanan::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function ulasans(): HasMany
    {
        return $this->hasMany(Ulasan::class);
    }

    public function historiAktivitas(): HasMany
    {
        return $this->hasMany(HistoriAktivitas::class);
    }
}
