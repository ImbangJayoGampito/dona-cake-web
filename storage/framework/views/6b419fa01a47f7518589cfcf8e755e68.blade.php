<?php extract((new \Illuminate\Support\Collection($attributes->getAttributes()))->mapWithKeys(function ($value, $key) { return [Illuminate\Support\Str::camel(str_replace([':', '.'], ' ', $key)) => $value]; })->all(), EXTR_SKIP); ?>
@props(['size','onlyIcons','block','customization'])
<x-ts-ui::theme-switch.variations.segmented :size="$size" :onlyIcons="$onlyIcons" :block="$block" :customization="$customization" >

{{ $slot ?? "" }}
</x-ts-ui::theme-switch.variations.segmented>