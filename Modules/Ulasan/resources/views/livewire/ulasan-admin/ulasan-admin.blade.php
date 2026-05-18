<x-app-layout>
    <div class="p-6 space-y-6">
        <x-card header="Manajemen Ulasan">
            <div class="grid gap-4 md:grid-cols-3 mb-6">
                <x-input
                    label="Cari"
                    wire:model.debounce.500ms="search"
                    placeholder="Cari produk, pelanggan, komentar"
                />

                <x-select.styled
                    label="Filter Produk"
                    :options="$products->map(fn($product) => ['value' => $product->id, 'label' => $product->nama_produk])->toArray()"
                    wire:model="filterProduk"
                />

                <div class="flex items-end">
                    <x-checkbox
                        label="Hanya tampilkan visible"
                        wire:model="showOnlyVisible"
                    />
                </div>
            </div>

            @if ($reviews->isEmpty())
                <x-alert color="amber" icon="information-circle">
                    Tidak ada ulasan yang ditemukan.
                </x-alert>
            @else
                <div class="overflow-x-auto">
                    <x-table :headers="['Produk', 'Pelanggan', 'Rating', 'Komentar', 'Visible', 'Aksi']">
                        @foreach ($reviews as $review)
                            <x-table.row>
                                <x-table.cell>{{ $review->produk->nama_produk ?? 'Produk tidak ditemukan' }}</x-table.cell>
                                <x-table.cell>{{ $review->pelanggan?->user?->name ?? 'Pelanggan' }}</x-table.cell>
                                <x-table.cell>{{ $review->rating }} / 5</x-table.cell>
                                <x-table.cell>{{ $review->komentar ? mb_strimwidth($review->komentar, 0, 80, '...') : '-' }}</x-table.cell>
                                <x-table.cell>
                                    <x-badge
                                        :label="$review->is_visible ? 'Ya' : 'Tidak'"
                                        :color="$review->is_visible ? 'green' : 'slate'"
                                    />
                                </x-table.cell>
                                <x-table.cell>
                                    <x-button wire:click="toggleVisibility({{ $review->id }})" sm>
                                        Toggle Visibility
                                    </x-button>
                                </x-table.cell>
                            </x-table.row>
                        @endforeach
                    </x-table>
                </div>
            @endif
        </x-card>
    </div>
</x-app-layout>
