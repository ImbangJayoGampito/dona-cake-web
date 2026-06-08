<?php

namespace Database\Seeders;

use App\Models\Produk;
use App\Models\Kategori;
use Illuminate\Database\Seeder;

class ProdukSeeder extends Seeder
{
    public function run(): void
    {
        // Get category IDs based on new categories from frontend
        $floralId = Kategori::where("slug", "floral")->first()->id;
        $birthdayId = Kategori::where("slug", "birthday")->first()->id;
        $weddingId = Kategori::where("slug", "wedding")->first()->id;
        $minimalistId = Kategori::where("slug", "minimalist")->first()->id;

        // ----- Floral Category Products -----
        $floralCakes = [
            ["Rose Garden Cake", 85000, 120000, 175000],
            ["Lavender Dream Cake", 90000, 125000, 180000],
            ["Cherry Blossom Cake", 95000, 130000, 185000],
            ["Sunflower Delight", 80000, 115000, 165000],
            ["Orchid Elegance", 100000, 140000, 195000],
        ];

        foreach ($floralCakes as $cake) {
            $nama = $cake[0];
            $harga22 = $cake[1];
            $harga24 = $cake[2];
            $harga26 = $cake[3];

            if ($harga22 !== null) {
                $this->createProduct($nama . " 22cm", $harga22, $floralId);
            }
            if ($harga24 !== null) {
                $this->createProduct($nama . " 24cm", $harga24, $floralId);
            }
            if ($harga26 !== null) {
                $this->createProduct($nama . " 26cm", $harga26, $floralId);
            }
        }

        // ----- Birthday Category Products -----
        $birthdayCakes = [
            ["Happy Birthday Classic", 65000, 95000, 135000],
            ["Number Cake 1", 75000, null, null],
            ["Number Cake 2", 75000, null, null],
            ["Rainbow Sprinkle", 70000, 100000, 145000],
            ["Chocolate Explosion", 80000, 110000, 155000],
            ["Unicorn Dream", 85000, 120000, 165000],
            ["Candy Land Cake", 70000, 100000, 145000],
        ];

        foreach ($birthdayCakes as $cake) {
            $nama = $cake[0];
            $harga22 = $cake[1];
            $harga24 = $cake[2];
            $harga26 = $cake[3];

            if ($harga22 !== null) {
                $this->createProduct($nama . " 22cm", $harga22, $birthdayId);
            }
            if ($harga24 !== null) {
                $this->createProduct($nama . " 24cm", $harga24, $birthdayId);
            }
            if ($harga26 !== null) {
                $this->createProduct($nama . " 26cm", $harga26, $birthdayId);
            }
        }

        // ----- Wedding Category Products -----
        $weddingCakes = [
            ["Classic White Wedding", 250000, 350000, 450000],
            ["Gold Leaf Elegance", 350000, 450000, 550000],
            ["Roses Romance", 300000, 400000, 500000],
            ["Pearl Princess", 280000, 380000, 480000],
            ["Victorian Garden", 320000, 420000, 520000],
            ["Modern Minimalist Wedding", 200000, 300000, 400000],
        ];

        foreach ($weddingCakes as $cake) {
            $nama = $cake[0];
            $harga22 = $cake[1];
            $harga24 = $cake[2];
            $harga26 = $cake[3];

            if ($harga22 !== null) {
                $this->createProduct($nama . " 22cm", $harga22, $weddingId);
            }
            if ($harga24 !== null) {
                $this->createProduct($nama . " 24cm", $harga24, $weddingId);
            }
            if ($harga26 !== null) {
                $this->createProduct($nama . " 26cm", $harga26, $weddingId);
            }
        }

        // ----- Minimalist Category Products -----
        $minimalistCakes = [
            ["Naked Cake", 80000, 110000, 160000],
            ["Semi Naked Cake", 75000, 105000, 155000],
            ["Watercolor Cake", 90000, 120000, 170000],
            ["Geode Cake", 120000, 150000, 200000],
            ["Terrazzo Cake", 95000, 125000, 175000],
            ["Monochrome Elegance", 70000, 100000, 145000],
            ["Marble Effect", 85000, 115000, 165000],
        ];

        foreach ($minimalistCakes as $cake) {
            $nama = $cake[0];
            $harga22 = $cake[1];
            $harga24 = $cake[2];
            $harga26 = $cake[3];

            if ($harga22 !== null) {
                $this->createProduct($nama . " 22cm", $harga22, $minimalistId);
            }
            if ($harga24 !== null) {
                $this->createProduct($nama . " 24cm", $harga24, $minimalistId);
            }
            if ($harga26 !== null) {
                $this->createProduct($nama . " 26cm", $harga26, $minimalistId);
            }
        }

        // ----- Bento Cakes (All Categories) -----
        $bentoPrices = [
            10 => 35000,
            12 => 55000,
            14 => 75000,
            15 => 80000,
            16 => 95000,
            18 => 135000,
            21 => 235000,
        ];

        // Create bento cakes for each theme
        $categories = [
            ["id" => $floralId, "prefix" => "Floral"],
            ["id" => $birthdayId, "prefix" => "Birthday"],
            ["id" => $weddingId, "prefix" => "Wedding"],
            ["id" => $minimalistId, "prefix" => "Minimalist"],
        ];

        foreach ($categories as $category) {
            foreach ($bentoPrices as $ukuran => $harga) {
                $nama = "{$category["prefix"]} Bento Cake {$ukuran}cm";
                $this->createProduct($nama, $harga, $category["id"]);
            }
        }

        $this->command->info("Produk seeder completed successfully!");
        $this->command->info("Total products created: " . Produk::count());
    }

    private function createProduct(
        string $nama,
        float $harga,
        int $kategoriId,
    ): void {
        // Generate random stock between 5-50
        $stok = rand(5, 50);

        // Generate random rating between 4.0 - 5.0
        $rating = rand(40, 50) / 10;

        // Generate description based on category
        $deskripsi = $this->generateDescription($nama, $kategoriId);

        Produk::create([
            "nama_produk" => $nama,
            "harga" => $harga,
            "stok" => $stok,
            "kategori_id" => $kategoriId,
            "deskripsi" => $deskripsi,
            "rating_rata_rata" => $rating,
        ]);
    }

    private function generateDescription(string $nama, int $kategoriId): string
    {
        $descriptions = [
            "Kue berkualitas premium dengan rasa yang lezat",
            "Dibuat dari bahan-bahan pilihan terbaik",
            "Fresh baked setiap hari dengan resep spesial",
            "Cocok untuk berbagai acara spesial Anda",
            "Dengan dekorasi yang menarik dan elegan",
        ];

        return $nama . " - " . $descriptions[array_rand($descriptions)];
    }
}
