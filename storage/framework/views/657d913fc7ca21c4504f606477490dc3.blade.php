<?php extract((new \Illuminate\Support\Collection($attributes->getAttributes()))->mapWithKeys(function ($value, $key) { return [Illuminate\Support\Str::camel(str_replace([':', '.'], ' ', $key)) => $value]; })->all(), EXTR_SKIP); ?>
@props(['id','property','error','label','hint','invalidate'])
<x-wrapper.input :id="$id" :property="$property" :error="$error" :label="$label" :hint="$hint" :invalidate="$invalidate" {{ $attributes }}>

{{ $slot ?? "" }}
</x-wrapper.input>