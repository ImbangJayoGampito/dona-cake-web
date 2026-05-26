<?php if (isset($component)) { $__componentOriginal976ff8cbea1bc0676e92232fe6ebb414 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal976ff8cbea1bc0676e92232fe6ebb414 = $attributes; } ?>
<?php $component = TallStackUi\Components\Layout\SideBar\Item\Component::resolve(['text' => 'Ulasan','icon' => 'star','route' => 'http://localhost:8000/ulasan'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('side-bar.item'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Layout\SideBar\Item\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal976ff8cbea1bc0676e92232fe6ebb414)): ?>
<?php $attributes = $__attributesOriginal976ff8cbea1bc0676e92232fe6ebb414; ?>
<?php unset($__attributesOriginal976ff8cbea1bc0676e92232fe6ebb414); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal976ff8cbea1bc0676e92232fe6ebb414)): ?>
<?php $component = $__componentOriginal976ff8cbea1bc0676e92232fe6ebb414; ?>
<?php unset($__componentOriginal976ff8cbea1bc0676e92232fe6ebb414); ?>
<?php endif; ?><?php /**PATH D:\pwebif\dona-cake-web\storage\framework\views/db0ce937280cc21f77e13cc6ee43604a.blade.php ENDPATH**/ ?>