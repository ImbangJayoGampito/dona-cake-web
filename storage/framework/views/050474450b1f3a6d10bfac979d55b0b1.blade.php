<?php extract((new \Illuminate\Support\Collection($attributes->getAttributes()))->mapWithKeys(function ($value, $key) { return [Illuminate\Support\Str::camel(str_replace([':', '.'], ' ', $key)) => $value]; })->all(), EXTR_SKIP); ?>
@props(['id','property','error','label','position','alignment','invalidate'])
<x-wrapper.radio :id="$id" :property="$property" :error="$error" :label="$label" :position="$position" :alignment="$alignment" :invalidate="$invalidate" {{ $attributes }}>

{{ $slot ?? "" }}
</x-wrapper.radio>