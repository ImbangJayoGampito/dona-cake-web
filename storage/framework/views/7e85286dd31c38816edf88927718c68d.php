<?php extract((new \Illuminate\Support\Collection($attributes->getAttributes()))->mapWithKeys(function ($value, $key) { return [Illuminate\Support\Str::camel(str_replace([':', '.'], ' ', $key)) => $value]; })->all(), EXTR_SKIP); ?>
<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag;

$__newAttributes = [];
$__propNames = \Illuminate\View\ComponentAttributeBag::extractPropNames((['class','outline']));

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

foreach (array_filter((['class','outline']), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
}

$__defined_vars = get_defined_vars();

foreach ($attributes->all() as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
}

unset($__defined_vars, $__key, $__value); ?>
<?php if (isset($component)) { $__componentOriginal481f68b3f57f90e6cc22442f0486619c = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal481f68b3f57f90e6cc22442f0486619c = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'ts-ui::components.icon.heroicons.outline.x-circle','data' => ['class' => $class,'outline' => $outline]] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('ts-ui::icon.heroicons.outline.x-circle'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['class' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($class),'outline' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($outline)]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>


<?php echo e($slot ?? ""); ?>

 <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal481f68b3f57f90e6cc22442f0486619c)): ?>
<?php $attributes = $__attributesOriginal481f68b3f57f90e6cc22442f0486619c; ?>
<?php unset($__attributesOriginal481f68b3f57f90e6cc22442f0486619c); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal481f68b3f57f90e6cc22442f0486619c)): ?>
<?php $component = $__componentOriginal481f68b3f57f90e6cc22442f0486619c; ?>
<?php unset($__componentOriginal481f68b3f57f90e6cc22442f0486619c); ?>
<?php endif; ?><?php /**PATH D:\pwebif\dona-cake-web\storage\framework\views/7e72ecc240cbc1394c70bf135778eb82.blade.php ENDPATH**/ ?>