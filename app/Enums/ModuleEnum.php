<?php

namespace App\Enums;

enum ModuleEnum: string
{
    case Produk = 'produk';
    case Pesanan = 'pesanan';
    case Booking = 'booking';
    case Keuangan = 'keuangan';
    case Laporan = 'laporan-ulasan';
    case KatalogMenu = 'katalog-menu';
    case Auth = 'auth';
}
