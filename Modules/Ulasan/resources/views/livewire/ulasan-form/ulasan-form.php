<?php

namespace Modules\Ulasan\Livewire;

use App\Models\Ulasan;
use App\Models\Produk;
use Illuminate\Support\Facades\Auth;
use Livewire\Component;
use TallStackUi\Traits\Interactions;

class UlasanForm extends Component
{
    use Interactions;

    public int $produk_id;
    public int $rating = 5;
    public ?string $komentar = null;

    protected function rules(): array
    {
        return [
            'produk_id' => 'required|exists:produks,id',
            'rating'    => 'required|integer|min:1|max:5',
            'komentar'  => 'nullable|string|max:500',
        ];
    }

    public function submit(): void
    {
        $this->validate();

        $pelangganId = Auth::user()->pelanggan->id;

        // Cegah duplikat ulasan untuk produk yang sama
        $sudahUlasan = Ulasan::where('pelanggan_id', $pelangganId)
                             ->where('produk_id', $this->produk_id)
                             ->exists();

        if ($sudahUlasan) {
            $this->toast()->error('Kamu sudah mengulas produk ini.')->send();
            return;
        }

        Ulasan::create([
            'pelanggan_id' => $pelangganId,
            'produk_id'    => $this->produk_id,
            'rating'       => $this->rating,
            'komentar'     => $this->komentar,
        ]);

        // Update rating rata-rata produk
        $produk = Produk::find($this->produk_id);
        $produk->rating_rata_rata = $produk->ulasans()->avg('rating');
        $produk->save();

        $this->toast()->success('Ulasan berhasil dikirim!')->send();
        $this->reset(['rating', 'komentar']);
    }

    public function render()
    {
        return view('ulasan::livewire.ulasan-form.ulasan-form', [
            'produks' => Produk::all(),
        ]);
    }
}