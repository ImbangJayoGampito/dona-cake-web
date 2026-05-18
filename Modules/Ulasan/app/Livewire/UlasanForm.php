<?php

namespace Modules\Ulasan\Livewire;

use App\Models\Pelanggan;
use App\Models\Produk;
use App\Models\Ulasan;
use Illuminate\Support\Facades\Auth;
use Livewire\Component;

class UlasanForm extends Component
{
    public ?int $produk_id = null;
    public int $rating = 5;
    public ?string $komentar = null;
    public $products;
    public $existingReviews;

    protected $rules = [
        'produk_id' => 'required|exists:produks,id',
        'rating' => 'required|integer|min:1|max:5',
        'komentar' => 'nullable|string|max:1000',
    ];

    public function mount(): void
    {
        $this->products = Produk::orderBy('nama_produk')->get();
        if ($this->products->isNotEmpty() && !$this->produk_id) {
            $this->produk_id = $this->products->first()->id;
        }

        $this->loadReviews();
    }

    public function updatedProdukId(): void
    {
        $this->loadReviews();
    }

    public function submit(): void
    {
        $this->validate();

        $user = Auth::user();
        $pelanggan = $user->pelanggan;
        if (!$pelanggan) {
            $pelanggan = Pelanggan::create([
                'user_id' => $user->id,
            ]);
        }

        $review = Ulasan::create([
            'pelanggan_id' => $pelanggan->id,
            'produk_id' => $this->produk_id,
            'rating' => $this->rating,
            'komentar' => $this->komentar,
            'is_visible' => true,
        ]);

        $this->updateProductRating($review->produk);

        $this->komentar = null;
        $this->rating = 5;

        $this->loadReviews();

        session()->flash('message', 'Ulasan berhasil dikirim.');
    }

    protected function loadReviews(): void
    {
        if (!$this->produk_id) {
            $this->existingReviews = collect();
            return;
        }

        $this->existingReviews = Ulasan::with(['pelanggan.user'])
            ->where('produk_id', $this->produk_id)
            ->where('is_visible', true)
            ->latest()
            ->limit(10)
            ->get();
    }

    protected function updateProductRating(Produk $produk): void
    {
        $average = (float) $produk->ulasans()
            ->where('is_visible', true)
            ->avg('rating');

        $produk->update(['rating_rata_rata' => $average]);
    }

    public function render()
    {
        return view('ulasan::livewire.ulasan-form.ulasan-form');
    }
}
