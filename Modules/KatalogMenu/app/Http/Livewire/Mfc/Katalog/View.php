<?php

namespace Modules\KatalogMenu\Http\Livewire\Mfc\Katalog;

use Livewire\Component;
use TallStackUi\Traits\Interactions;

class View extends Component
{
    use Interactions;

    public function render()
    {
        // Dummy data
        $items = collect([
            ['id' => 1, 'name' => 'Black Forest', 'category' => 'Cake', 'price' => 250000, 'stock' => 10],
            ['id' => 2, 'name' => 'Red Velvet', 'category' => 'Cake', 'price' => 230000, 'stock' => 8],
            ['id' => 3, 'name' => 'Cheesecake', 'category' => 'Cake', 'price' => 280000, 'stock' => 5],
            ['id' => 4, 'name' => 'Donat Coklat', 'category' => 'Donut', 'price' => 15000, 'stock' => 25],
            ['id' => 5, 'name' => 'Croissant', 'category' => 'Pastry', 'price' => 20000, 'stock' => 12],
        ]);

        return view('katalogmenu::mfc.katalog.view', [
            'items' => $items
        ]);
    }
}