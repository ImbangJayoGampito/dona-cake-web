<?php extract((new \Illuminate\Support\Collection($attributes->getAttributes()))->mapWithKeys(function ($value, $key) { return [Illuminate\Support\Str::camel(str_replace([':', '.'], ' ', $key)) => $value]; })->all(), EXTR_SKIP); ?>
@props(['class','xShow'])
<x-ts-ui::icon.heroicons.solid.x-circle :class="$class" :x-show="$xShow" >

{{ $slot ?? "" }}
</x-ts-ui::icon.heroicons.solid.x-circle>