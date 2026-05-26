<?php extract((new \Illuminate\Support\Collection($attributes->getAttributes()))->mapWithKeys(function ($value, $key) { return [Illuminate\Support\Str::camel(str_replace([':', '.'], ' ', $key)) => $value]; })->all(), EXTR_SKIP); ?>
<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag;

$__newAttributes = [];
$__propNames = \Illuminate\View\ComponentAttributeBag::extractPropNames((['class','xShow']));

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

foreach (array_filter((['class','xShow']), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
}

$__defined_vars = get_defined_vars();

foreach ($attributes->all() as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
}

unset($__defined_vars, $__key, $__value); ?>
<?php if (isset($component)) { $__componentOriginal616f63cea346bd335f38e46d3e633bf6 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal616f63cea346bd335f38e46d3e633bf6 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'ts-ui::components.icon.heroicons.solid.x-circle','data' => ['class' => $class,'xShow' => $xShow]] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('ts-ui::icon.heroicons.solid.x-circle'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['class' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($class),'x-show' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($xShow)]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>


<?php echo e($slot ?? ""); ?>

 <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal616f63cea346bd335f38e46d3e633bf6)): ?>
<?php $attributes = $__attributesOriginal616f63cea346bd335f38e46d3e633bf6; ?>
<?php unset($__attributesOriginal616f63cea346bd335f38e46d3e633bf6); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal616f63cea346bd335f38e46d3e633bf6)): ?>
<?php $component = $__componentOriginal616f63cea346bd335f38e46d3e633bf6; ?>
<?php unset($__componentOriginal616f63cea346bd335f38e46d3e633bf6); ?>
<?php endif; ?><?php /**PATH D:\pwebif\dona-cake-web\storage\framework\views/05d5cc0c57b00efb4df2098b0d01c706.blade.php ENDPATH**/ ?>