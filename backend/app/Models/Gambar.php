<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Exception;
use Illuminate\Database\Eloquent\Model as EloquentModel;
/**
 * @property int $id
 * @property string $gambar_url
 * @property string|null $gambar_alt
 * @property string|null $gambar_title
 * @property string $path
 * @property string $gambarable_type * @property int $gambarable_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property-read Model|EloquentModel $gambarable
 */
class Gambar extends Model
{
    protected $table = 'gambars';

    protected $fillable = [
        'gambar_url',
        'gambar_alt',
        'gambar_title',
        'path',
        'gambarable_id',
        'gambarable_type'
    ];

    /**
     * Update file gambar
     */
    public function updateFile(UploadedFile $newFile, array $attributes = []): bool
    {
        // Delete old file
        $this->deleteFile();

        // Create new file
        $filename = time() . '_' . uniqid() . '.' . $newFile->getClientOriginalExtension();
        $directory = dirname($this->path) ?: 'gambars';
        $path = $newFile->storeAs($directory, $filename, 'public');

        // Update attributes
        $this->update(array_merge([
            'gambar_url' => Storage::url($path),
            'gambar_alt' => pathinfo($newFile->getClientOriginalName(), PATHINFO_FILENAME),
            'gambar_title' => $filename,
            'path' => $path,
        ], $attributes));

        return true;
    }

    /**
     * Create image for any model (polymorphic)
     */
    public static function createForModel(EloquentModel $model, UploadedFile $file): ?self
    {
        // Validate file type
        $allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!in_array($file->getMimeType(), $allowedMimes)) {
            throw new \Exception('Invalid file type. Only images are allowed.');
        }

        $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        $directory = strtolower(class_basename($model)) . 's/' . $model->id;
        $path = $file->storeAs($directory, $filename, 'public');

        $defaultAttributes = [
            'gambar_url' => Storage::url($path),
            'gambar_alt' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
            'gambar_title' => $filename,
            'path' => $path,
        ];

        $image = new self($defaultAttributes);
        $image->gambarable()->associate($model);
        $image->save();

        return $image;
    }

    /**
     * Accessor for gambar_url - ensures valid URL
     */
    public function getGambarUrlAttribute($value)
    {
        if ($this->path && Storage::disk('public')->exists($this->path)) {
            return Storage::url($this->path);
        }
        return $value;
    }

    /**
     * Boot the model
     */
    protected static function booted(): void
    {
        // Delete file when model is being deleted
        static::deleting(function (self $image) {
            $image->deleteFile();
        });

        // Log after deletion
        static::deleted(function (self $image) {
            Log::info("Gambar record deleted from database: ID {$image->id}");
        });

        // Log creation
        static::created(function (self $image) {
            Log::info("Gambar created: ID {$image->id}, Path: {$image->path}");
        });
    }

    /**
     * Delete physical file from storage
     */
    public function deleteFile(): ?string
    {
        if (!$this->path) {
            return "Tidak ada path file";
        }

        try {
            if (!Storage::disk('public')->exists($this->path)) {
                // File doesn't exist - log and return null
                Log::warning("File tidak ditemukan: {$this->path}");
                return null;
            }

            $deleted = Storage::disk('public')->delete($this->path);

            if ($deleted) {
                Log::info("Image file deleted: {$this->path}");
                return null; // Success
            } else {
                Log::error("Gagal menghapus file (delete() returned false): {$this->path}");
                return "Gagal menghapus file dari storage";
            }
        } catch (Exception $e) {
            Log::error("Failed to delete image file {$this->path}: " . $e->getMessage());
            return $e->getMessage();
        }
    }

    /**
     * Polymorphic relationship
     */
    public function gambarable(): MorphTo
    {
        return $this->morphTo();
    }
}
