<?php

namespace Modules\Booking\Livewire;

use App\Models\Booking;          // ← root model, bukan module
use Illuminate\Support\Facades\Auth;
use Livewire\Component;
use Livewire\WithFileUploads;
use TallStackUi\Traits\Interactions;

class BookingForm extends Component
{
    use WithFileUploads, Interactions;

    public ?string $ukuran = null;
    public $desain_custom;           // file upload
    public ?string $tgl_ambil = null;

    protected function rules(): array
    {
        return [
            'ukuran'        => 'required|string|max:100',
            'desain_custom' => 'nullable|image|max:2048',
            'tgl_ambil'     => 'required|date|after:today',
        ];
    }

    public function submit(): void
    {
        $this->validate();

        $url = null;
        if ($this->desain_custom) {
            $url = $this->desain_custom->store('desain', 'public');
        }

        $pelangganId = Auth::user()->pelanggan->id;

        Booking::create([
            'pelanggan_id'      => $pelangganId,
            'ukuran'            => $this->ukuran,
            'desain_custom_url' => $url,
            'tgl_ambil'         => $this->tgl_ambil,
            'status_verifikasi' => 'pending',
        ]);

        $this->toast()->success('Booking berhasil!', 'Menunggu verifikasi admin.')->send();
        $this->reset(['ukuran', 'desain_custom', 'tgl_ambil']);
    }

    public function render()
    {
        return view('booking::livewire.booking-form.booking-form');
    }
}