<?php extract((new \Illuminate\Support\Collection($attributes->getAttributes()))->mapWithKeys(function ($value, $key) { return [Illuminate\Support\Str::camel(str_replace([':', '.'], ' ', $key)) => $value]; })->all(), EXTR_SKIP); ?>
@props(['class','xBind:class','xShow'])
<x-ts-ui::icon.heroicons.solid.chevron-down :class="$class" :x-bind:class="$xBindClass" :x-show="$xShow" >

{{ $slot ?? "" }}
</x-ts-ui::icon.heroicons.solid.chevron-down>