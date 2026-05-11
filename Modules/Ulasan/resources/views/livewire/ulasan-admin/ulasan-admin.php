<?php

namespace Modules\Ulasan\Livewire;

use App\Models\Ulasan;
use Livewire\Component;
use Livewire\WithPagination;
use TallStackUi\Traits\Interactions;

class UlasanAdmin extends Component
{
    use WithPagination, Interactions;

    public string $filterRating = '';

    public function toggleVisibility(int $id): void
    {
        $ulasan = Ulasan::findOrFail($id);
        $ulasan->update(['is_visible' => !$ulasan->is_visible]);
        $this->toast()->info('Visibilitas ulasan diperbarui.')->send();
    }

    public function render()
    {
        $query = Ulasan::with(['pelanggan.user', 'produk'])->latest();

        if ($this->filterRating !== '') {
            $query->where('rating', $this->filterRating);
        }

        return view('ulasan::livewire.ulasan-admin.ulasan-admin', [
            'ulasans' => $query->paginate(15),
        ]);
    }
}