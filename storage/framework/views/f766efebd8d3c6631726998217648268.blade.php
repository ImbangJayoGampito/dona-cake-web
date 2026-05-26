<?php extract((new \Illuminate\Support\Collection($attributes->getAttributes()))->mapWithKeys(function ($value, $key) { return [Illuminate\Support\Str::camel(str_replace([':', '.'], ' ', $key)) => $value]; })->all(), EXTR_SKIP); ?>
@props(['id','label','error'])
<x-label :id="$id" :label="$label" :error="$error" {{ $attributes }}>

{{ $slot ?? "" }}
</x-label>