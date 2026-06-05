<?php

namespace Database\Seeders;

use App\Models\Produk;
use Illuminate\Database\Seeder;

class ProdukSeeder extends Seeder
{
    /**
     * Seed the products table from Regular_Cake and Bento_Cake data.
     */
    public function run(): void
    {
        // ----- Regular Cakes (from Regular_Cake(2).xlsx) -----
        // Each cake may have direct harga (no size) or size-based prices (22,24,26 cm)
        $regularCakes = [
            // format: [nama, harga, harga_22cm, harga_24cm, harga_26cm]
            ["coklat_vanilla", null, 47000, 70000, 95000],
            ["bolu_keju", null, 47000, 70000, 95000],
            ["bolu_pandan", null, 47000, 70000, 95000],
            ["bolu_vanilla", null, 47000, 70000, 95000],
            ["bolu_tapai", null, 47000, 70000, 95000],
            ["coklat_pandan", null, 47000, 70000, 95000],
            ["bolu_pisang", null, 47000, 70000, 95000],
            ["bolu_coklat", null, 47000, 70000, 95000],
            ["bolu_caramel", null, 47000, 70000, 95000],
            ["bolu_blueberry", 50000, null, null, null],
            ["bolu_brownies", 50000, null, null, null],
            ["banana_bread", 55000, null, null, null],
        ];

        foreach ($regularCakes as $cake) {
            $nama = $cake[0];
            $hargaDirect = $cake[1];
            $harga22 = $cake[2];
            $harga24 = $cake[3];
            $harga26 = $cake[4];

            // If direct harga exists, create a single product (e.g., bolu_blueberry, banana_bread)
            if ($hargaDirect !== null) {
                $this->createProduct($nama, $hargaDirect, "Regular Cake");
            }

            // If size-based prices exist, create one product per size
            if ($harga22 !== null) {
                $this->createProduct($nama . " 22cm", $harga22, "Regular Cake");
            }
            if ($harga24 !== null) {
                $this->createProduct($nama . " 24cm", $harga24, "Regular Cake");
            }
            if ($harga26 !== null) {
                $this->createProduct($nama . " 26cm", $harga26, "Regular Cake");
            }
        }

        // ----- Bento Cakes (from Bento_Cake(1).xlsx) -----
        $bentoCakes = [
            ["ukuran" => 10, "harga" => 35000],
            ["ukuran" => 12, "harga" => 55000],
            ["ukuran" => 14, "harga" => 75000],
            ["ukuran" => 15, "harga" => 80000],
            ["ukuran" => 16, "harga" => 95000],
            ["ukuran" => 18, "harga" => 135000],
            ["ukuran" => 21, "harga" => 235000],
        ];

        foreach ($bentoCakes as $bento) {
            $nama = "Bento Cake {$bento["ukuran"]}cm";
            $this->createProduct($nama, $bento["harga"], "Bento Cake");
        }
    }

    /**
     * Helper to create a product with default stock and rating.
     */
    private function createProduct(
        string $nama,
        float $harga,
        string $kategori,
    ): void {
        Produk::create([
            "nama_produk" => $nama,
            "harga" => $harga,
            "stok" => 0, // default stock, adjust as needed
            "kategori" => $kategori,
            "deskripsi" => null,
            "rating_rata_rata" => 0.0,
        ]);
    }
}
