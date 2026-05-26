<?php extract((new \Illuminate\Support\Collection($attributes->getAttributes()))->mapWithKeys(function ($value, $key) { return [Illuminate\Support\Str::camel(str_replace([':', '.'], ' ', $key)) => $value]; })->all(), EXTR_SKIP); ?>
@props(['icon','error','internal'])
<x-icon :icon="$icon" :error="$error" :internal="$internal" {{ $attributes }}>

{{ $slot ?? "" }}
</x-icon>