<div class="space-y-6 p-6">
    <div class="bg-white shadow-sm rounded-lg p-6">
        <h2 class="text-2xl font-semibold mb-4">Manajemen Ulasan</h2>

        <div class="grid gap-4 md:grid-cols-3 mb-6">
            <div>
                <label class="block font-medium text-sm text-gray-700">Cari</label>
                <input wire:model.debounce.500ms="search" type="text" class="block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Cari produk, pelanggan, komentar" />
            </div>
            <div>
                <label class="block font-medium text-sm text-gray-700">Filter Produk</label>
                <select wire:model="filterProduk" class="block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="">Semua Produk</option>
                    @foreach($products as $product)
                        <option value="{{ $product->id }}">{{ $product->nama_produk }}</option>
                    @endforeach
                </select>
            </div>
            <div class="flex items-end gap-2">
                <label class="inline-flex items-center gap-2 text-sm text-gray-700">
                    <input wire:model="showOnlyVisible" type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    Hanya tampilkan visible
                </label>
            </div>
        </div>

        @if ($reviews->isEmpty())
            <div class="text-gray-600">Tidak ada ulasan yang ditemukan.</div>
        @else
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider">Produk</th>
                            <th class="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider">Pelanggan</th>
                            <th class="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider">Rating</th>
                            <th class="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider">Komentar</th>
                            <th class="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider">Visible</th>
                            <th class="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                        @foreach ($reviews as $review)
                            <tr>
                                <td class="px-4 py-3 text-sm text-gray-700">{{ $review->produk->nama_produk ?? 'Produk tidak ditemukan' }}</td>
                                <td class="px-4 py-3 text-sm text-gray-700">{{ $review->pelanggan?->user?->name ?? 'Pelanggan' }}</td>
                                <td class="px-4 py-3 text-sm text-gray-700">{{ $review->rating }} / 5</td>
                                <td class="px-4 py-3 text-sm text-gray-700">{{ $review->komentar ? mb_strimwidth($review->komentar, 0, 80, '...') : '-' }}</td>
                                <td class="px-4 py-3 text-sm text-gray-700">{{ $review->is_visible ? 'Ya' : 'Tidak' }}</td>
                                <td class="px-4 py-3 text-sm text-gray-700">
                                    <button wire:click="toggleVisibility({{ $review->id }})" class="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700">Toggle Visibility</button>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        @endif
    </div>
</div>
