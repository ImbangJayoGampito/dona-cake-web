<div>
    <h3 class="text-lg font-semibold mb-4">
        The <code class="bg-gray-100 px-1 rounded">katalogmenu::mfc.katalog.view</code>
        mfc component is loaded from the <code class="bg-gray-100 px-1 rounded">KatalogMenu</code> module.
    </h3>

    <?php if (isset($component)) { $__componentOriginal662d8241a531b225018506f379c995e2 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal662d8241a531b225018506f379c995e2 = $attributes; } ?>
<?php $component = TallStackUi\Components\Table\Component::resolve(['headers' => $headers,'rows' => $items,'striped' => true] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('table'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Table\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>


        
        <?php $loop = null; $__env->slot('column_price', function($row) use ($__env) { $loop = (object) $__env->getLoopStack()[0] ?>
            Rp <?php echo e(number_format($row['price'], 0, ',', '.')); ?>

        <?php }); ?>

        
        <?php $loop = null; $__env->slot('column_stock', function($row) use ($__env) { $loop = (object) $__env->getLoopStack()[0] ?>
            <?php if (isset($component)) { $__componentOriginal177c2bdc33e4e1fbac1c659d7bf20dfe = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal177c2bdc33e4e1fbac1c659d7bf20dfe = $attributes; } ?>
<?php $component = TallStackUi\Components\Badge\Component::resolve(['color' => $row['stock'] > 10 ? 'green' : ($row['stock'] > 5 ? 'yellow' : 'red')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('badge'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Badge\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

                <?php echo e($row['stock']); ?> unit
             <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal177c2bdc33e4e1fbac1c659d7bf20dfe)): ?>
<?php $attributes = $__attributesOriginal177c2bdc33e4e1fbac1c659d7bf20dfe; ?>
<?php unset($__attributesOriginal177c2bdc33e4e1fbac1c659d7bf20dfe); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal177c2bdc33e4e1fbac1c659d7bf20dfe)): ?>
<?php $component = $__componentOriginal177c2bdc33e4e1fbac1c659d7bf20dfe; ?>
<?php unset($__componentOriginal177c2bdc33e4e1fbac1c659d7bf20dfe); ?>
<?php endif; ?>
        <?php }); ?>

        
        <?php $loop = null; $__env->slot('column_action', function($row) use ($__env) { $loop = (object) $__env->getLoopStack()[0] ?>
            <div class="flex gap-2">
                <?php if (isset($component)) { $__componentOriginal776f3b63e85d985f88ebee05433a8279 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal776f3b63e85d985f88ebee05433a8279 = $attributes; } ?>
<?php $component = TallStackUi\Components\Button\Circle\Component::resolve(['icon' => 'eye','sm' => true] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('button.circle'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Button\Circle\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['wire:click' => 'viewItem('.e($row['id']).')']); ?>
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
                <?php if (isset($component)) { $__componentOriginal776f3b63e85d985f88ebee05433a8279 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal776f3b63e85d985f88ebee05433a8279 = $attributes; } ?>
<?php $component = TallStackUi\Components\Button\Circle\Component::resolve(['icon' => 'pencil','sm' => true] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('button.circle'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Button\Circle\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['wire:click' => 'edit('.e($row['id']).')']); ?>
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
                <?php if (isset($component)) { $__componentOriginal776f3b63e85d985f88ebee05433a8279 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal776f3b63e85d985f88ebee05433a8279 = $attributes; } ?>
<?php $component = TallStackUi\Components\Button\Circle\Component::resolve(['icon' => 'trash','sm' => true,'color' => 'red'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('button.circle'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Button\Circle\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['wire:click' => 'delete('.e($row['id']).')']); ?>
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
            </div>
        <?php }); ?>

     <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal662d8241a531b225018506f379c995e2)): ?>
<?php $attributes = $__attributesOriginal662d8241a531b225018506f379c995e2; ?>
<?php unset($__attributesOriginal662d8241a531b225018506f379c995e2); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal662d8241a531b225018506f379c995e2)): ?>
<?php $component = $__componentOriginal662d8241a531b225018506f379c995e2; ?>
<?php unset($__componentOriginal662d8241a531b225018506f379c995e2); ?>
<?php endif; ?>
</div>
<?php /**PATH D:\pwebif\dona-cake-web\Modules/KatalogMenu\resources/views/livewire/mfc/katalog/view/view.blade.php ENDPATH**/ ?>