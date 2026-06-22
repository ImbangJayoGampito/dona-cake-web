<?php

namespace Database\Seeders;

use App\Models\Produk;
use App\Models\Kategori;
use Illuminate\Database\Seeder;

class ProdukSeeder extends Seeder
{
    public function run(): void
    {
        // Get category IDs
        $floralId = Kategori::where("slug", "floral")->first()->id;
        $birthdayId = Kategori::where("slug", "birthday")->first()->id;
        $weddingId = Kategori::where("slug", "wedding")->first()->id;
        $minimalistId = Kategori::where("slug", "minimalist")->first()->id;
        $kueBasahId = Kategori::where("slug", "kue-basah")->first()->id;

        // ---- Produk Kue Basah (Data Real / Production) ----
        $realProducts = [
            ["Kue Coklat Vanilla", 47000, 50, "-"],
            ["Kue Bolu Keju", 47000, 50, "-"],
            ["Kue Bolu Pandan", 47000, 50, "-"],
            ["Kue Bolu Vanilla", 47000, 50, "-"],
            ["Kue Bolu Tapai", 47000, 50, "-"],
            ["Kue Coklat Pandan", 47000, 50, "-"],
            ["Kue Bolu Pisang", 47000, 50, "-"],
            ["Kue Bolu Coklat", 47000, 50, "-"],
            ["Kue Bolu Caramel", 47000, 50, "-"],
            ["Kue Bolu Blueberry", 50000, 30, "Best Seller"],
            ["Kue Bolu Brownies", 55000, 30, "Best Seller"],
            ["Kue Banana Bread", 55000, 30, "-"],
        ];

        foreach ($realProducts as $product) {
            $this->createProduct(
                $product[0], // nama
                $product[1], // harga
                $kueBasahId, // kategori_id
                $product[2], // stok
                $product[3]  // keterangan
            );
        }

        $this->command->info("Produk seeder completed successfully!");
        $this->command->info("Total products created: " . Produk::count());
    }

    private function createProduct(
        string $nama,
        float $harga,
        int $kategoriId,
        int $stok = 50,
        string $keterangan = '-',
    ): void {
        $rating = rand(40, 50) / 10;
        $deskripsi = $nama . " - Kue berkualitas premium dengan rasa yang lezat";

        Produk::firstOrCreate(
            ["nama_produk" => $nama],
            [
                "harga" => $harga,
                "stok" => $stok,
                "kategori_id" => $kategoriId,
                "deskripsi" => $deskripsi,
                "keterangan" => $keterangan,
                "rating_rata_rata" => $rating,
            ]
        );
    }
}