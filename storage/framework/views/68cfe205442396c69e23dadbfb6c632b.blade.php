<?php extract((new \Illuminate\Support\Collection($attributes->getAttributes()))->mapWithKeys(function ($value, $key) { return [Illuminate\Support\Str::camel(str_replace([':', '.'], ' ', $key)) => $value]; })->all(), EXTR_SKIP); ?>
@props(['class'])
<x-ts-ui::icon.heroicons.solid.sun :class="$class" >

{{ $slot ?? "" }}
</x-ts-ui::icon.heroicons.solid.sun>