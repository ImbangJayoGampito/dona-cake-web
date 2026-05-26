<?php extract((new \Illuminate\Support\Collection($attributes->getAttributes()))->mapWithKeys(function ($value, $key) { return [Illuminate\Support\Str::camel(str_replace([':', '.'], ' ', $key)) => $value]; })->all(), EXTR_SKIP); ?>
<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag;

$__newAttributes = [];
$__propNames = \Illuminate\View\ComponentAttributeBag::extractPropNames((['color']));

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

foreach (array_filter((['color']), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
}

$__defined_vars = get_defined_vars();

foreach ($attributes->all() as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
}

unset($__defined_vars, $__key, $__value); ?>
<?php if (isset($component)) { $__componentOriginal81da9b0d04b05fd8a605d2829e8f6a5e = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal81da9b0d04b05fd8a605d2829e8f6a5e = $attributes; } ?>
<?php $component = TallStackUi\Components\Button\Normal\Component::resolve(['color' => $color] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('button'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Button\Normal\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['attributes' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($attributes)]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>


<?php echo e($slot ?? ""); ?>

 <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal81da9b0d04b05fd8a605d2829e8f6a5e)): ?>
<?php $attributes = $__attributesOriginal81da9b0d04b05fd8a605d2829e8f6a5e; ?>
<?php unset($__attributesOriginal81da9b0d04b05fd8a605d2829e8f6a5e); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal81da9b0d04b05fd8a605d2829e8f6a5e)): ?>
<?php $component = $__componentOriginal81da9b0d04b05fd8a605d2829e8f6a5e; ?>
<?php unset($__componentOriginal81da9b0d04b05fd8a605d2829e8f6a5e); ?>
<?php endif; ?><?php /**PATH D:\pwebif\dona-cake-web\storage\framework\views/e2f096d36adfa9b944ec53db76058f81.blade.php ENDPATH**/ ?>