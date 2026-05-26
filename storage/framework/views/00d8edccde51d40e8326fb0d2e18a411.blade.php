<?php extract((new \Illuminate\Support\Collection($attributes->getAttributes()))->mapWithKeys(function ($value, $key) { return [Illuminate\Support\Str::camel(str_replace([':', '.'], ' ', $key)) => $value]; })->all(), EXTR_SKIP); ?>
@props(['hint','invalidate'])
<x-input :hint="$hint" :invalidate="$invalidate" {{ $attributes }}>
<x-slot name="suffix" class="ml-1 mr-2">{{ $suffix }}</x-slot>
<x-slot name="label" >{{ $label }}</x-slot>
{{ $slot ?? "" }}
</x-input>