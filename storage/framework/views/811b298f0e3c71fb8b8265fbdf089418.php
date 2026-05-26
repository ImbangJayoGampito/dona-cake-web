<?php extract((new \Illuminate\Support\Collection($attributes->getAttributes()))->mapWithKeys(function ($value, $key) { return [Illuminate\Support\Str::camel(str_replace([':', '.'], ' ', $key)) => $value]; })->all(), EXTR_SKIP); ?>
<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag;

$__newAttributes = [];
$__propNames = \Illuminate\View\ComponentAttributeBag::extractPropNames((['hint']));

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

foreach (array_filter((['hint']), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
}

$__defined_vars = get_defined_vars();

foreach ($attributes->all() as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
}

unset($__defined_vars, $__key, $__value); ?>
<?php if (isset($component)) { $__componentOriginal9e788b87e44e36c307deb622632ccb20 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal9e788b87e44e36c307deb622632ccb20 = $attributes; } ?>
<?php $component = TallStackUi\Components\Form\Hint\Component::resolve(['hint' => $hint] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('hint'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Form\Hint\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['attributes' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($attributes)]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>


<?php echo e($slot ?? ""); ?>

 <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal9e788b87e44e36c307deb622632ccb20)): ?>
<?php $attributes = $__attributesOriginal9e788b87e44e36c307deb622632ccb20; ?>
<?php unset($__attributesOriginal9e788b87e44e36c307deb622632ccb20); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal9e788b87e44e36c307deb622632ccb20)): ?>
<?php $component = $__componentOriginal9e788b87e44e36c307deb622632ccb20; ?>
<?php unset($__componentOriginal9e788b87e44e36c307deb622632ccb20); ?>
<?php endif; ?><?php /**PATH D:\pwebif\dona-cake-web\storage\framework\views/2c0ec1a4e8d8ae183485398bb9e926c5.blade.php ENDPATH**/ ?>