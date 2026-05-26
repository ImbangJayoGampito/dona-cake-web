<?php extract((new \Illuminate\Support\Collection($attributes->getAttributes()))->mapWithKeys(function ($value, $key) { return [Illuminate\Support\Str::camel(str_replace([':', '.'], ' ', $key)) => $value]; })->all(), EXTR_SKIP); ?>
@props(['offset','position'])
<x-floating :offset="$offset" :position="$position" {{ $attributes }}>
<x-slot name="transition" >{{ $transition }}</x-slot>
{{ $slot ?? "" }}
</x-floating>