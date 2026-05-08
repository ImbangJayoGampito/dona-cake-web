<div>
    <h3 class="text-lg font-semibold mb-4">
        The <code class="bg-gray-100 px-1 rounded">katalogmenu::mfc.katalog.view</code>
        mfc component is loaded from the <code class="bg-gray-100 px-1 rounded">KatalogMenu</code> module.
    </h3>

    <x-table :headers="$headers" :rows="$items" striped>

        {{-- Customize the Harga/Price column --}}
        @interact('column_price', $row)
            Rp {{ number_format($row['price'], 0, ',', '.') }}
        @endinteract

        {{-- Customize the Stok/Stock column with badge --}}
        @interact('column_stock', $row)
            <x-badge :color="$row['stock'] > 10 ? 'green' : ($row['stock'] > 5 ? 'yellow' : 'red')">
                {{ $row['stock'] }} unit
            </x-badge>
        @endinteract

        {{-- Add action buttons column --}}
        @interact('column_action', $row)
            <div class="flex gap-2">
                <x-button.circle icon="eye" wire:click="viewItem({{ $row['id'] }})" sm />
                <x-button.circle icon="pencil" wire:click="edit({{ $row['id'] }})" sm />
                <x-button.circle icon="trash" wire:click="delete({{ $row['id'] }})" sm color="red" />
            </div>
        @endinteract

    </x-table>
</div>
