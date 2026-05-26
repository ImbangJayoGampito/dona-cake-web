<?php extract((new \Illuminate\Support\Collection($attributes->getAttributes()))->mapWithKeys(function ($value, $key) { return [Illuminate\Support\Str::camel(str_replace([':', '.'], ' ', $key)) => $value]; })->all(), EXTR_SKIP); ?>
<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag;

$__newAttributes = [];
$__propNames = \Illuminate\View\ComponentAttributeBag::extractPropNames((['position']));

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

foreach (array_filter((['position']), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
}

$__defined_vars = get_defined_vars();

foreach ($attributes->all() as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
}

unset($__defined_vars, $__key, $__value); ?>
<?php if (isset($component)) { $__componentOriginal11e36ce4229aeeee6ac5f4324cd8b513 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal11e36ce4229aeeee6ac5f4324cd8b513 = $attributes; } ?>
<?php $component = TallStackUi\Components\Floating\Component::resolve(['position' => $position] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('floating'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Floating\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['attributes' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($attributes)]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>


<?php echo e($slot ?? ""); ?>

 <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal11e36ce4229aeeee6ac5f4324cd8b513)): ?>
<?php $attributes = $__attributesOriginal11e36ce4229aeeee6ac5f4324cd8b513; ?>
<?php unset($__attributesOriginal11e36ce4229aeeee6ac5f4324cd8b513); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal11e36ce4229aeeee6ac5f4324cd8b513)): ?>
<?php $component = $__componentOriginal11e36ce4229aeeee6ac5f4324cd8b513; ?>
<?php unset($__componentOriginal11e36ce4229aeeee6ac5f4324cd8b513); ?>
<?php endif; ?><?php /**PATH D:\pwebif\dona-cake-web\storage\framework\views/7bfaef8d773f9a5ac7cbc1e1d7b8944e.blade.php ENDPATH**/ ?>