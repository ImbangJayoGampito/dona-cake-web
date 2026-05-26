<?php extract((new \Illuminate\Support\Collection($attributes->getAttributes()))->mapWithKeys(function ($value, $key) { return [Illuminate\Support\Str::camel(str_replace([':', '.'], ' ', $key)) => $value]; })->all(), EXTR_SKIP); ?>
@props(['class','outline'])
<x-ts-ui::icon.heroicons.outline.exclamation-circle :class="$class" :outline="$outline" >

{{ $slot ?? "" }}
</x-ts-ui::icon.heroicons.outline.exclamation-circle>