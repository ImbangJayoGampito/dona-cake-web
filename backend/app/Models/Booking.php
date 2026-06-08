<?php

namespace App\Models;

use App\Enums\BookingStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $pelanggan_id
 * @property int|null $transaksi_id
 * @property int|null $kategori_id
 * @property string|null $desain_custom_url
 * @property string|null $deskripsi_custom
 * @property string $jenis_frosting
 * @property string $rasa_kue
 * @property string|null $tema_dekorasi
 * @property string|null $ukuran
 * @property Carbon|null $tgl_ambil
 * @property float|null $harga_final
 * @property string $status_verifikasi
 * @property string|null $catatan
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property-read Pelanggan $pelanggan
 * @property-read Transaksi|null $transaksi
 * @property-read Kategori|null $kategori
 * @property-read Notifikasi[] $notifikasis
 */
class Booking extends Model
{
    protected $table = "bookings";

    protected $fillable = [
        "pelanggan_id",
        "transaksi_id",
        "kategori_id",
        "desain_custom_url",
        "deskripsi_custom",
        "jenis_frosting",
        "rasa_kue",
        "tema_dekorasi",
        "ukuran",
        "tgl_ambil",
        "harga_final",
        "status_verifikasi",
        "catatan",
    ];

    protected $casts = [
        "pelanggan_id" => "integer",
        "transaksi_id" => "integer",
        "kategori_id" => "integer",
        "tgl_ambil" => "datetime",
        "harga_final" => "decimal:2",
        "created_at" => "datetime",
        "updated_at" => "datetime",
        "status_verifikasi" => BookingStatus::class, // Auto-cast to enum
    ];

    /**
     * Get the pelanggan (customer) for this booking
     */
    public function pelanggan(): BelongsTo
    {
        return $this->belongsTo(Pelanggan::class);
    }

    /**
     * Get the transaksi for this booking
     */
    public function transaksi(): BelongsTo
    {
        return $this->belongsTo(Transaksi::class);
    }

    /**
     * Get the kategori for this booking
     */
    public function kategori(): BelongsTo
    {
        return $this->belongsTo(Kategori::class);
    }

    /**
     * Get all notifications for this booking
     */
    public function notifikasis(): MorphMany
    {
        return $this->morphMany(Notifikasi::class, "notifiable");
    }

    /**
     * Check if booking is pending verification
     */
    public function isPending(): bool
    {
        return $this->status_verifikasi === BookingStatus::MENUNGGU_VERIFIKASI;
    }

    /**
     * Check if booking is approved
     */
    public function isApproved(): bool
    {
        return $this->status_verifikasi === BookingStatus::DISETUJUI;
    }

    /**
     * Check if booking is rejected
     */
    public function isRejected(): bool
    {
        return $this->status_verifikasi === BookingStatus::DITOLAK;
    }

    /**
     * Check if booking is cancelled
     */
    public function isCancelled(): bool
    {
        return $this->status_verifikasi === BookingStatus::DIBATALKAN;
    }

    /**
     * Check if booking is completed
     */
    public function isCompleted(): bool
    {
        return $this->status_verifikasi === BookingStatus::SELESAI;
    }

    /**
     * Approve the booking
     */
    public function approve(): bool
    {
        if (!$this->isPending()) {
            return false;
        }

        $this->status_verifikasi = BookingStatus::DISETUJUI;
        return $this->save();
    }

    /**
     * Reject the booking
     */
    public function reject(): bool
    {
        if (!$this->isPending()) {
            return false;
        }

        $this->status_verifikasi = BookingStatus::DITOLAK;
        return $this->save();
    }

    /**
     * Cancel the booking
     */
    public function cancel(): bool
    {
        if ($this->isCompleted()) {
            return false;
        }

        $this->status_verifikasi = BookingStatus::DIBATALKAN;
        return $this->save();
    }

    /**
     * Complete the booking
     */
    public function complete(): bool
    {
        if (!$this->isApproved()) {
            return false;
        }

        $this->status_verifikasi = BookingStatus::SELESAI;
        return $this->save();
    }

    /**
     * Get formatted price attribute
     */
    public function getFormattedHargaFinalAttribute(): string
    {
        return "Rp " . number_format($this->harga_final, 0, ",", ".");
    }

    /**
     * Get formatted date attribute
     */
    public function getFormattedTglAmbilAttribute(): string
    {
        return $this->tgl_ambil ? $this->tgl_ambil->format("d F Y H:i") : "-";
    }


    /**
     * Scope for pending bookings
     */
    public function scopePending($query)
    {
        return $query->where(
            "status_verifikasi",
            BookingStatus::MENUNGGU_VERIFIKASI,
        );
    }

    /**
     * Scope for approved bookings
     */
    public function scopeApproved($query)
    {
        return $query->where("status_verifikasi", BookingStatus::DISETUJUI);
    }

    /**
     * Scope for completed bookings
     */
    public function scopeCompleted($query)
    {
        return $query->where("status_verifikasi", BookingStatus::SELESAI);
    }

    /**
     * Scope for today's pickups
     */
    public function scopeTodayPickup($query)
    {
        return $query->whereDate("tgl_ambil", today());
    }

    /**
     * Scope for upcoming pickups
     */
    public function scopeUpcoming($query)
    {
        return $query->where("tgl_ambil", ">", now());
    }
}
