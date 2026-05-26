<?php extract((new \Illuminate\Support\Collection($attributes->getAttributes()))->mapWithKeys(function ($value, $key) { return [Illuminate\Support\Str::camel(str_replace([':', '.'], ' ', $key)) => $value]; })->all(), EXTR_SKIP); ?>
<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag;

$__newAttributes = [];
$__propNames = \Illuminate\View\ComponentAttributeBag::extractPropNames((['hint','invalidate']));

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

foreach (array_filter((['hint','invalidate']), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
}

$__defined_vars = get_defined_vars();

foreach ($attributes->all() as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
}

unset($__defined_vars, $__key, $__value); ?>
<?php if (isset($component)) { $__componentOriginalabdf488413a83ea5e92826264ebb0195 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginalabdf488413a83ea5e92826264ebb0195 = $attributes; } ?>
<?php $component = TallStackUi\Components\Form\Input\Component::resolve(['hint' => $hint,'invalidate' => $invalidate] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('input'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Form\Input\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['attributes' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($attributes)]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

 <?php $__env->slot('suffix', null, ['class' => 'ml-1 mr-2']); ?> <?php echo e($suffix); ?> <?php $__env->endSlot(); ?>
 <?php $__env->slot('label', null, []); ?> <?php echo e($label); ?> <?php $__env->endSlot(); ?>
<?php echo e($slot ?? ""); ?>

 <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginalabdf488413a83ea5e92826264ebb0195)): ?>
<?php $attributes = $__attributesOriginalabdf488413a83ea5e92826264ebb0195; ?>
<?php unset($__attributesOriginalabdf488413a83ea5e92826264ebb0195); ?>
<?php endif; ?>
<?php if (isset($__componentOriginalabdf488413a83ea5e92826264ebb0195)): ?>
<?php $component = $__componentOriginalabdf488413a83ea5e92826264ebb0195; ?>
<?php unset($__componentOriginalabdf488413a83ea5e92826264ebb0195); ?>
<?php endif; ?><?php /**PATH D:\pwebif\dona-cake-web\storage\framework\views/00d8edccde51d40e8326fb0d2e18a411.blade.php ENDPATH**/ ?>