{{-- Modules/Booking/resources/views/livewire/booking-form.blade.php --}}
<div>
    <x-card>
        <x-slot:header>Form Booking Kue Custom</x-slot:header>

        <x-form.input
            wire:model="ukuran"
            label="Ukuran Kue"
            placeholder="contoh: 20cm, 2 tier..."
        />

        <x-form.upload
            wire:model="desain_custom"
            label="Upload Desain (opsional)"
            accept="image/*"
        />

        <x-form.date
            wire:model="tgl_ambil"
            label="Tanggal Ambil"
        />

        <x-slot:footer>
            <x-button wire:click="submit" label="Ajukan Booking" />
        </x-slot:footer>
    </x-card>
</div>