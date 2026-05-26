<?php extract((new \Illuminate\Support\Collection($attributes->getAttributes()))->mapWithKeys(function ($value, $key) { return [Illuminate\Support\Str::camel(str_replace([':', '.'], ' ', $key)) => $value]; })->all(), EXTR_SKIP); ?>
@props(['icon','invalidate'])
<x-input :icon="$icon" :invalidate="$invalidate" {{ $attributes }}>

{{ $slot ?? "" }}
</x-input>