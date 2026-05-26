<?php extract((new \Illuminate\Support\Collection($attributes->getAttributes()))->mapWithKeys(function ($value, $key) { return [Illuminate\Support\Str::camel(str_replace([':', '.'], ' ', $key)) => $value]; })->all(), EXTR_SKIP); ?>
<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag;

$__newAttributes = [];
$__propNames = \Illuminate\View\ComponentAttributeBag::extractPropNames((['label','options','required','invalidate']));

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

foreach (array_filter((['label','options','required','invalidate']), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
}

$__defined_vars = get_defined_vars();

foreach ($attributes->all() as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
}

unset($__defined_vars, $__key, $__value); ?>
<?php if (isset($component)) { $__componentOriginalff45c026dbfb876100c3b4fb5528ccfe = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginalff45c026dbfb876100c3b4fb5528ccfe = $attributes; } ?>
<?php $component = TallStackUi\Components\Form\Select\Styled\Component::resolve(['label' => $label,'options' => $options,'required' => $required,'invalidate' => $invalidate] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('select.styled'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Form\Select\Styled\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['attributes' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($attributes)]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>


<?php echo e($slot ?? ""); ?>

 <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginalff45c026dbfb876100c3b4fb5528ccfe)): ?>
<?php $attributes = $__attributesOriginalff45c026dbfb876100c3b4fb5528ccfe; ?>
<?php unset($__attributesOriginalff45c026dbfb876100c3b4fb5528ccfe); ?>
<?php endif; ?>
<?php if (isset($__componentOriginalff45c026dbfb876100c3b4fb5528ccfe)): ?>
<?php $component = $__componentOriginalff45c026dbfb876100c3b4fb5528ccfe; ?>
<?php unset($__componentOriginalff45c026dbfb876100c3b4fb5528ccfe); ?>
<?php endif; ?><?php /**PATH D:\pwebif\dona-cake-web\storage\framework\views/edfe5da908c5bd76673bc5b56ba6d6bc.blade.php ENDPATH**/ ?>