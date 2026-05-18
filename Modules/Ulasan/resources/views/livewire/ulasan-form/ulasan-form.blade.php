<div class="space-y-6 p-6">
    <div class="bg-white shadow-sm rounded-lg p-6">
        <h2 class="text-2xl font-semibold mb-4">Kirim Ulasan Produk</h2>

        @if (session('message'))
            <div class="mb-4 rounded border border-green-300 bg-green-50 p-4 text-green-700">
                {{ session('message') }}
            </div>
        @endif

        <form wire:submit.prevent="submit" class="space-y-4">
            <div>
                <label class="block font-medium text-sm text-gray-700">Pilih Produk</label>
                <select wire:model="produk_id" class="block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="">-- Pilih Produk --</option>
                    @foreach($products as $product)
                        <option value="{{ $product->id }}">{{ $product->nama_produk }}</option>
                    @endforeach
                </select>
                @error('produk_id') <span class="text-red-600 text-sm">{{ $message }}</span> @enderror
            </div>

            <div>
                <label class="block font-medium text-sm text-gray-700">Rating</label>
                <select wire:model="rating" class="block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    @for ($i = 1; $i <= 5; $i++)
                        <option value="{{ $i }}">{{ $i }} bintang</option>
                    @endfor
                </select>
                @error('rating') <span class="text-red-600 text-sm">{{ $message }}</span> @enderror
            </div>

            <div>
                <label class="block font-medium text-sm text-gray-700">Komentar</label>
                <textarea wire:model="komentar" rows="5" class="block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Tulis pengalaman Anda..."></textarea>
                @error('komentar') <span class="text-red-600 text-sm">{{ $message }}</span> @enderror
            </div>

            <div>
                <button type="submit" class="inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    Kirim Ulasan
                </button>
            </div>
        </form>
    </div>

    <div class="bg-white shadow-sm rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4">Ulasan Terakhir</h3>

        @if ($existingReviews->isEmpty())
            <div class="text-gray-600">Belum ada ulasan untuk produk ini.</div>
        @else
            <div class="space-y-4">
                @foreach ($existingReviews as $review)
                    <div class="rounded border border-gray-200 p-4">
                        <div class="flex justify-between items-start gap-4">
                            <div>
                                <p class="text-sm font-semibold">{{ $review->pelanggan?->user?->name ?? 'Pelanggan' }}</p>
                                <p class="text-sm text-gray-500">{{ $review->created_at->format('d M Y H:i') }}</p>
                            </div>
                            <span class="text-yellow-500">{{ str_repeat('★', $review->rating) }}{{ str_repeat('☆', 5 - $review->rating) }}</span>
                        </div>
                        <p class="mt-3 text-gray-700">{{ $review->komentar ?: 'Tidak ada komentar.' }}</p>
                    </div>
                @endforeach
            </div>
        @endif
    </div>
</div>
