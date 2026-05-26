<?php extract((new \Illuminate\Support\Collection($attributes->getAttributes()))->mapWithKeys(function ($value, $key) { return [Illuminate\Support\Str::camel(str_replace([':', '.'], ' ', $key)) => $value]; })->all(), EXTR_SKIP); ?>
<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag;

$__newAttributes = [];
$__propNames = \Illuminate\View\ComponentAttributeBag::extractPropNames((['id','property','error','label','position','alignment','invalidate']));

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

foreach (array_filter((['id','property','error','label','position','alignment','invalidate']), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
}

$__defined_vars = get_defined_vars();

foreach ($attributes->all() as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
}

unset($__defined_vars, $__key, $__value); ?>
<?php if (isset($component)) { $__componentOriginal7d4777293a60c4eb055f666d0a2bf61f = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal7d4777293a60c4eb055f666d0a2bf61f = $attributes; } ?>
<?php $component = TallStackUi\Components\Wrapper\Radio\Component::resolve(['id' => $id,'property' => $property,'error' => $error,'label' => $label,'position' => $position,'alignment' => $alignment,'invalidate' => $invalidate] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('wrapper.radio'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Wrapper\Radio\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['attributes' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($attributes)]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>


<?php echo e($slot ?? ""); ?>

 <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal7d4777293a60c4eb055f666d0a2bf61f)): ?>
<?php $attributes = $__attributesOriginal7d4777293a60c4eb055f666d0a2bf61f; ?>
<?php unset($__attributesOriginal7d4777293a60c4eb055f666d0a2bf61f); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal7d4777293a60c4eb055f666d0a2bf61f)): ?>
<?php $component = $__componentOriginal7d4777293a60c4eb055f666d0a2bf61f; ?>
<?php unset($__componentOriginal7d4777293a60c4eb055f666d0a2bf61f); ?>
<?php endif; ?><?php /**PATH D:\pwebif\dona-cake-web\storage\framework\views/050474450b1f3a6d10bfac979d55b0b1.blade.php ENDPATH**/ ?>