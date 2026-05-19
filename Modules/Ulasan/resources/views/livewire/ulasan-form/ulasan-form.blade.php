    <div class="space-y-6">
        <x-card header="Kirim Ulasan Produk">
            <div class="space-y-6">
                @if (session('message'))
                    <x-alert color="green" icon="check-circle">
                        {{ session('message') }}
                    </x-alert>
                @endif

                <form wire:submit.prevent="submit" class="space-y-4">
                    <div>
    					<label class="block text-sm font-medium text-slate-700 mb-2">Pilih Produk</label>

    					@if ($locked)
        					{{-- Produk sudah dipilih dari URL, dikunci --}}
        					<input
            					type="text"
            					value="{{ $products->firstWhere('id', $produk_id)?->nama_produk ?? '-' }}"
            					disabled
            					class="block w-full rounded border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-500 cursor-not-allowed"
        					>
    					@else
        					{{-- Mode bebas pilih produk --}}
        					<select wire:model.live="produk_id" class="block w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20">
            					<option value="">-- Pilih Produk --</option>
            					@foreach ($products as $product)
                					<option value="{{ $product->id }}">{{ $product->nama_produk }}</option>
            					@endforeach
        					</select>
    					@endif

    					@error('produk_id') <p class="text-sm text-red-600 mt-1">{{ $message }}</p> @enderror
					</div>

                    <div>
    					<label class="block text-sm font-medium text-slate-700 mb-2">Rating</label>
    					<div class="flex gap-1">
        					@for ($i = 1; $i <= 5; $i++)
            					<button
                					type="button"
                					wire:click="$set('rating', {{ $i }})"
                					class="text-3xl transition-colors duration-150 
                       					{{ $i <= $rating ? 'text-yellow-400' : 'text-slate-300' }}
                       					hover:text-yellow-300"
            					>★</button>
        					@endfor
    					</div>
    					<p class="text-xs text-slate-500 mt-1">Rating dipilih: {{ $rating }} bintang</p>
    					@error('rating') <p class="text-sm text-red-600 mt-1">{{ $message }}</p> @enderror
					</div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2">Komentar</label>
                        <textarea wire:model="komentar" rows="5" class="block w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20" placeholder="Tulis pengalaman Anda..."></textarea>
                        @error('komentar') <p class="text-sm text-red-600 mt-1">{{ $message }}</p> @enderror
                    </div>

                    <x-button type="submit" primary>Kirim Ulasan</x-button>
                </form>
            </div>
        </x-card>

        <x-card header="Ulasan Terakhir">
            @if ($existingReviews->isEmpty())
                <x-alert color="amber" icon="information-circle">
                    Belum ada ulasan untuk produk ini.
                </x-alert>
            @else
                <div class="space-y-4">
                    @foreach ($existingReviews as $review)
                        <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                            <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <p class="text-sm font-semibold">{{ $review->pelanggan?->user?->name ?? 'Pelanggan' }}</p>
                                    <p class="text-sm text-slate-500">{{ $review->created_at->format('d M Y H:i') }}</p>
                                </div>
                                <span class="text-yellow-500 text-sm">{{ str_repeat('★', $review->rating) }}{{ str_repeat('☆', 5 - $review->rating) }}</span>
                            </div>
                            <p class="mt-3 text-slate-700 dark:text-slate-300">{{ $review->komentar ?: 'Tidak ada komentar.' }}</p>
                        </div>
                    @endforeach
                </div>
            @endif
        </x-card>
    </div>
