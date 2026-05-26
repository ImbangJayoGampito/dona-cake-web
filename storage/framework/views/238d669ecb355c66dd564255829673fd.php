<?php extract((new \Illuminate\Support\Collection($attributes->getAttributes()))->mapWithKeys(function ($value, $key) { return [Illuminate\Support\Str::camel(str_replace([':', '.'], ' ', $key)) => $value]; })->all(), EXTR_SKIP); ?>

<?php if (isset($component)) { $__componentOriginal11e36ce4229aeeee6ac5f4324cd8b513 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal11e36ce4229aeeee6ac5f4324cd8b513 = $attributes; } ?>
<?php $component = TallStackUi\Components\Floating\Component::resolve([] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('floating'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Floating\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['attributes' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($attributes)]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

 <?php $__env->slot('footer', null, []); ?> <?php echo e($footer); ?> <?php $__env->endSlot(); ?>
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
<?php endif; ?><?php /**PATH D:\pwebif\dona-cake-web\storage\framework\views/efdc79a31feba50f6d3c19d45f3cbd81.blade.php ENDPATH**/ ?>