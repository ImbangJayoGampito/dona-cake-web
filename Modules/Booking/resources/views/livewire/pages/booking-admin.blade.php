{{-- Modules/Booking/resources/views/livewire/booking-admin.blade.php --}}
<div>
    <x-table :headers="['ID','Pelanggan','Ukuran','Tgl Ambil','Status','Aksi']">
        @foreach($bookings as $booking)
        <x-table.row>
            <x-table.cell>{{ $booking->id }}</x-table.cell>
            <x-table.cell>{{ $booking->pelanggan->user->name }}</x-table.cell>
            <x-table.cell>{{ $booking->ukuran ?? '-' }}</x-table.cell>
            <x-table.cell>{{ $booking->tgl_ambil?->format('d/m/Y') ?? '-' }}</x-table.cell>
            <x-table.cell>
                <x-badge :label="$booking->status_verifikasi" />
            </x-table.cell>
            <x-table.cell>
                @if($booking->status_verifikasi === 'pending')
                    <x-button
                        wire:click="openModal({{ $booking->id }})"
                        label="Setujui"
                        sm
                    />
                    <x-button
                        wire:click="reject({{ $booking->id }})"
                        label="Tolak"
                        color="red" sm
                    />
                @endif
            </x-table.cell>
        </x-table.row>
        @endforeach
    </x-table>

    {{ $bookings->links() }}

    <x-modal wire:model="showModal" title="Tetapkan Harga Final">
        <x-form.input
            wire:model="harga_final"
            label="Harga Final (Rp)"
            type="number"
        />
        <x-slot:footer>
            <x-button wire:click="approve" label="Konfirmasi" />
        </x-slot:footer>
    </x-modal>
</div>
