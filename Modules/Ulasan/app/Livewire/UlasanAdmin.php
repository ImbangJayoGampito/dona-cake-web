<?php

namespace Modules\Ulasan\Livewire;

use App\Models\Produk;
use App\Models\Ulasan;
use Livewire\Component;

class UlasanAdmin extends Component
{
    public string $search = '';
    public ?int $filterProduk = null;
    public bool $showOnlyVisible = false;
    public $products;

    protected $listeners = [
        'refreshReviews' => '$refresh',
    ];

    public function mount(): void
    {
        $this->products = Produk::orderBy('nama_produk')->get();
    }

    public function toggleVisibility(Ulasan $ulasan): void
    {
        $ulasan->update(['is_visible' => !$ulasan->is_visible]);
        $this->dispatchBrowserEvent('notification', [
            'message' => 'Visibilitas ulasan diperbarui.',
            'type' => 'success',
        ]);
    }

    public function render()
    {
        $query = Ulasan::with(['produk', 'pelanggan.user'])
            ->orderBy('created_at', 'desc');

        if ($this->search) {
            $query->where(function ($q) {
                $q->whereHas('produk', fn ($sub) => $sub->where('nama_produk', 'like', '%'.$this->search.'%'))
                    ->orWhereHas('pelanggan.user', fn ($sub) => $sub->where('name', 'like', '%'.$this->search.'%'))
                    ->orWhere('komentar', 'like', '%'.$this->search.'%');
            });
        }

        if ($this->filterProduk) {
            $query->where('produk_id', $this->filterProduk);
        }

        if ($this->showOnlyVisible) {
            $query->where('is_visible', true);
        }

        return view('ulasan::livewire.ulasan-admin.ulasan-admin', [
            'reviews' => $query->get(),
        ]);
    }
}
