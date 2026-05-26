<?php extract((new \Illuminate\Support\Collection($attributes->getAttributes()))->mapWithKeys(function ($value, $key) { return [Illuminate\Support\Str::camel(str_replace([':', '.'], ' ', $key)) => $value]; })->all(), EXTR_SKIP); ?>
@props(['label','hint','invalidate'])
<x-input :label="$label" :hint="$hint" :invalidate="$invalidate" {{ $attributes }}>
<x-slot name="suffix" class="ml-1 mr-2">{{ $suffix }}</x-slot>
{{ $slot ?? "" }}
</x-input>