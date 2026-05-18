<?php

namespace Database\Seeders;

use App\Models\Produk;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'nama_produk' => 'Black Forest',
                'harga' => 95000,
                'stok' => 20,
                'kategori' => 'Cake',
            ],
            [
                'nama_produk' => 'Red Velvet',
                'harga' => 105000,
                'stok' => 18,
                'kategori' => 'Cake',
            ],
            [
                'nama_produk' => 'Cheese Cake',
                'harga' => 115000,
                'stok' => 15,
                'kategori' => 'Cake',
            ],
        ];

        foreach ($products as $product) {
            Produk::updateOrCreate(
                ['nama_produk' => $product['nama_produk']],
                $product
            );
        }
    }
}
