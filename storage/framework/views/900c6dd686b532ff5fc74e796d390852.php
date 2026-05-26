<div>
    <?php if (isset($component)) { $__componentOriginal776f3b63e85d985f88ebee05433a8279 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal776f3b63e85d985f88ebee05433a8279 = $attributes; } ?>
<?php $component = TallStackUi\Components\Button\Circle\Component::resolve(['icon' => 'trash','color' => 'red'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('button.circle'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Button\Circle\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['wire:click' => 'confirm']); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal776f3b63e85d985f88ebee05433a8279)): ?>
<?php $attributes = $__attributesOriginal776f3b63e85d985f88ebee05433a8279; ?>
<?php unset($__attributesOriginal776f3b63e85d985f88ebee05433a8279); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal776f3b63e85d985f88ebee05433a8279)): ?>
<?php $component = $__componentOriginal776f3b63e85d985f88ebee05433a8279; ?>
<?php unset($__componentOriginal776f3b63e85d985f88ebee05433a8279); ?>
<?php endif; ?>
</div><?php /**PATH D:\pwebif\dona-cake-web\storage\framework\views/916b9b0a60fd021e2ab1622df2ea4c41.blade.php ENDPATH**/ ?>