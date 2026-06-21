<?php

namespace Database\Seeders;

use App\Models\Kategori;
use Illuminate\Database\Seeder;

class KategoriSeeder extends Seeder
{
    /**
     * Categories matching frontend BookingConfig.CATEGORIES
     */
    private const CATEGORIES = [
        [
            "id" => "floral",
            "nama_kategori" => "Floral",
            "slug" => "floral",
            "deskripsi" =>
                "Kue dengan dekorasi bunga-bunga yang indah dan elegan",
            "color" => "bg-rose-500",
            "urutan" => 1,
            "is_active" => true,
        ],
        [
            "id" => "birthday",
            "nama_kategori" => "Birthday",
            "slug" => "birthday",
            "deskripsi" =>
                "Kue ulang tahun dengan berbagai tema dan dekorasi meriah",
            "color" => "bg-blue-500",
            "urutan" => 2,
            "is_active" => true,
        ],
        [
            "id" => "wedding",
            "nama_kategori" => "Wedding",
            "slug" => "wedding",
            "deskripsi" => "Kue pernikahan elegan dengan desain mewah",
            "color" => "bg-purple-500",
            "urutan" => 3,
            "is_active" => true,
        ],
        [
            "id" => "minimalist",
            "nama_kategori" => "Minimalist",
            "slug" => "minimalist",
            "deskripsi" => "Kue dengan desain simpel dan modern",
            "color" => "bg-slate-500",
            "urutan" => 4,
            "is_active" => true,
        ],
        [
            "id" => "kue-basah",
            "nama_kategori" => "Kue Basah",
            "slug" => "kue-basah",
            "deskripsi" => "Kue basah tradisional dan modern yang lezat",
            "color" => "bg-amber-500",
            "urutan" => 5,
            "is_active" => true,
        ],
    ];

    public function run(): void
    {
        foreach (self::CATEGORIES as $category) {
            Kategori::updateOrCreate(
                ["slug" => $category["slug"]],
                [
                    "nama_kategori" => $category["nama_kategori"],
                    "deskripsi" => $category["deskripsi"],
                    "is_active" => $category["is_active"],
                ],
            );
        }

        $this->command->info("Kategori seeded successfully!");
        $this->command->info("Total categories: " . Kategori::count());
    }
}
