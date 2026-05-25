<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $user_id
 * @property string $histori_percakapan
 * @property string $status_flag
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class ChatbotLog extends Model
{
    protected $fillable = [
        'user_id',
        'histori_percakapan',
        'status_flag',
    ];

    protected $casts = [
        'user_id' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
