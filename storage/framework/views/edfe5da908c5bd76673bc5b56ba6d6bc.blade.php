<?php extract((new \Illuminate\Support\Collection($attributes->getAttributes()))->mapWithKeys(function ($value, $key) { return [Illuminate\Support\Str::camel(str_replace([':', '.'], ' ', $key)) => $value]; })->all(), EXTR_SKIP); ?>
@props(['label','options','required','invalidate'])
<x-select.styled :label="$label" :options="$options" :required="$required" :invalidate="$invalidate" {{ $attributes }}>

{{ $slot ?? "" }}
</x-select.styled>