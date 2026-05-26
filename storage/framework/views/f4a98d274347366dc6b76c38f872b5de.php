<?php extract((new \Illuminate\Support\Collection($attributes->getAttributes()))->mapWithKeys(function ($value, $key) { return [Illuminate\Support\Str::camel(str_replace([':', '.'], ' ', $key)) => $value]; })->all(), EXTR_SKIP); ?>
<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag;

$__newAttributes = [];
$__propNames = \Illuminate\View\ComponentAttributeBag::extractPropNames((['size','onlyIcons','block','customization']));

foreach ($attributes->all() as $__key => $__value) {
    if (in_array($__key, $__propNames)) {
        $$__key = $$__key ?? $__value;
    } else {
        $__newAttributes[$__key] = $__value;
    }
}

$attributes = new \Illuminate\View\ComponentAttributeBag($__newAttributes);

unset($__propNames);
unset($__newAttributes);

foreach (array_filter((['size','onlyIcons','block','customization']), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
}

$__defined_vars = get_defined_vars();

foreach ($attributes->all() as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
}

unset($__defined_vars, $__key, $__value); ?>
<?php if (isset($component)) { $__componentOriginal861b2091e20708d3715f1a30ac41a9a6 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal861b2091e20708d3715f1a30ac41a9a6 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'ts-ui::components.theme-switch.variations.segmented','data' => ['size' => $size,'onlyIcons' => $onlyIcons,'block' => $block,'customization' => $customization]] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('ts-ui::theme-switch.variations.segmented'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['size' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($size),'onlyIcons' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($onlyIcons),'block' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($block),'customization' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($customization)]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>


<?php echo e($slot ?? ""); ?>

 <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal861b2091e20708d3715f1a30ac41a9a6)): ?>
<?php $attributes = $__attributesOriginal861b2091e20708d3715f1a30ac41a9a6; ?>
<?php unset($__attributesOriginal861b2091e20708d3715f1a30ac41a9a6); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal861b2091e20708d3715f1a30ac41a9a6)): ?>
<?php $component = $__componentOriginal861b2091e20708d3715f1a30ac41a9a6; ?>
<?php unset($__componentOriginal861b2091e20708d3715f1a30ac41a9a6); ?>
<?php endif; ?><?php /**PATH D:\pwebif\dona-cake-web\storage\framework\views/6b419fa01a47f7518589cfcf8e755e68.blade.php ENDPATH**/ ?>