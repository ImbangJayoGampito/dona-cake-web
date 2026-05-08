<?php

use Livewire\Component;
use TallStackUi\Traits\Interactions;

new class extends Component
{
    use Interactions;

    public function render()
    {
        // Dummy data - add 'index' for the # column
        $items = collect([
            ['index' => 1, 'id' => 1, 'name' => 'Black Forest', 'category' => 'Cake', 'price' => 250000, 'stock' => 10],
            ['index' => 2, 'id' => 2, 'name' => 'Red Velvet', 'category' => 'Cake', 'price' => 230000, 'stock' => 8],
            ['index' => 3, 'id' => 3, 'name' => 'Cheesecake', 'category' => 'Cake', 'price' => 280000, 'stock' => 5],
            ['index' => 4, 'id' => 4, 'name' => 'Donat Coklat', 'category' => 'Donut', 'price' => 15000, 'stock' => 25],
            ['index' => 5, 'id' => 5, 'name' => 'Croissant', 'category' => 'Pastry', 'price' => 20000, 'stock' => 12],
        ]);

        // Headers must use 'index' key as per documentation
        $headers = [
            ['index' => 'index', 'label' => '#'],
            ['index' => 'id', 'label' => 'ID'],
            ['index' => 'name', 'label' => 'Nama Produk'],
            ['index' => 'category', 'label' => 'Kategori'],
            ['index' => 'price', 'label' => 'Harga'],
            ['index' => 'stock', 'label' => 'Stok'],
            ['index' => 'action', 'label' => 'Aksi'], // Column for action buttons
        ];

        return view('katalogmenu::livewire.mfc.katalog.view.view', [
            'items' => $items,
            'headers' => $headers
        ]);
    }

    // Example action methods
    public function viewItem($id)
    {
        // Handle view action
    }

    public function edit($id)
    {
        // Handle edit action
    }

    public function delete($id)
    {
        // Handle delete action
    }
};
