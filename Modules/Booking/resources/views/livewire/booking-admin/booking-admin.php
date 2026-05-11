<?php

namespace Modules\Booking\Livewire;

use App\Models\Booking;
use Livewire\Component;
use Livewire\WithPagination;
use TallStackUi\Traits\Interactions;

class BookingAdmin extends Component
{
    use WithPagination, Interactions;

    public ?int $selectedId = null;
    public ?float $harga_final = null;
    public bool $showModal = false;

    public function openModal(int $id): void
    {
        $booking = Booking::findOrFail($id);
        $this->selectedId   = $id;
        $this->harga_final  = $booking->harga_final;
        $this->showModal    = true;
    }

    public function approve(): void
    {
        $this->validate(['harga_final' => 'required|numeric|min:0']);

        Booking::findOrFail($this->selectedId)->update([
            'harga_final'       => $this->harga_final,
            'status_verifikasi' => 'disetujui',
        ]);

        $this->toast()->success('Booking disetujui!')->send();
        $this->showModal = false;
    }

    public function reject(int $id): void
    {
        Booking::findOrFail($id)->update(['status_verifikasi' => 'ditolak']);
        $this->toast()->warning('Booking ditolak.')->send();
    }

    public function render()
    {
        return view('booking::livewire.booking-admin.booking-admin', [
            'bookings' => Booking::with('pelanggan.user')
                            ->latest()
                            ->paginate(10),
        ]);
    }
}