<x-app-layout>
    <div class="p-6">
        <h1 class="text-3xl font-semibold mb-6">Ulasan Produk</h1>
        <livewire:ulasan::ulasan-form :product_id="$product_id ?? null" />
    </div>
</x-app-layout>
