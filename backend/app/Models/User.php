<?php

namespace App\Models;

use App\Enums\RoleEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Spatie\Permission\Traits\HasRoles;
use Laravel\Sanctum\HasApiTokens;

/**
 * @property int      $id
 * @property string   $username
 * @property string   $name
 * @property string   $email
 * @property string   $password
 * @property RoleEnum $role
 * @property Carbon   $email_verified_at
 * @property string   $remember_token
 * @property Carbon   $created_at
 * @property Carbon   $updated_at
 */
class User extends Authenticatable
{
    use HasFactory;
    use Notifiable;
    use HasRoles;
    use HasApiTokens;

    protected $fillable = [
        'username',
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $appends = [
        'role',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
            'role'              => RoleEnum::class,
        ];
    }

    // -------------------------------------------------------
    // Helpers
    // -------------------------------------------------------

    public function getRoleAttribute(): ?string
    {
        return $this->getRoleNames()->first();
    }

    public function isAdmin(): bool
    {
        return $this->hasRole(RoleEnum::Admin->value);
    }

    public function isKaryawan(): bool
    {
        return $this->hasRole(RoleEnum::Karyawan->value);
    }

    public function isUser(): bool
    {
        return $this->hasRole(RoleEnum::User->value);
    }

    // -------------------------------------------------------
    // Relationships
    // -------------------------------------------------------

    public function pelanggan()
    {
        return $this->hasOne(Pelanggan::class);
    }

    public function chatbotLogs()
    {
        return $this->hasMany(ChatbotLog::class);
    }
}
