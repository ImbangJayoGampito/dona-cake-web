<?php

namespace App\Enums;

enum BookingStatus: string
{
    case MENUNGGU_VERIFIKASI = "menunggu_verifikasi";
    case DISETUJUI = "disetujui";
    case DITOLAK = "ditolak";
    case DIBATALKAN = "dibatalkan";
    case SELESAI = "selesai";

    public static function getAll(): array
    {
        return array_column(self::cases(), "value");
    }
    public function isActive(): bool
    {
        return $this !== self::DIBATALKAN && $this !== self::DITOLAK;
    }
}
