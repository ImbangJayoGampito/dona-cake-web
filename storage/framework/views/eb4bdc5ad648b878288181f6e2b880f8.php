<div>
    <?php if (isset($component)) { $__componentOriginal5c806641b94f036edd70b23c3aa0efb3 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal5c806641b94f036edd70b23c3aa0efb3 = $attributes; } ?>
<?php $component = TallStackUi\Components\Card\Component::resolve([] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Card\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

        <?php if (isset($component)) { $__componentOriginal1c43fc0869207559466b11339ebb076c = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal1c43fc0869207559466b11339ebb076c = $attributes; } ?>
<?php $component = TallStackUi\Components\Alert\Component::resolve(['color' => 'amber','icon' => 'light-bulb'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('alert'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Alert\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

            <?php echo app('translator')->get('Remember to take a look at the source code to understand how the components in this area were built and are being used.'); ?>
         <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal1c43fc0869207559466b11339ebb076c)): ?>
<?php $attributes = $__attributesOriginal1c43fc0869207559466b11339ebb076c; ?>
<?php unset($__attributesOriginal1c43fc0869207559466b11339ebb076c); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal1c43fc0869207559466b11339ebb076c)): ?>
<?php $component = $__componentOriginal1c43fc0869207559466b11339ebb076c; ?>
<?php unset($__componentOriginal1c43fc0869207559466b11339ebb076c); ?>
<?php endif; ?>

        <div class="mb-2 mt-4">
            <?php
$__split = function ($name, $params = []) {
    return [$name, $params];
};
[$__name, $__params] = $__split('users.create', ['@created' => '$refresh']);

$__keyOuter = $__key ?? null;

$__key = null;
$__componentSlots = [];

$__key ??= \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::generateKey('lw-1865796692-0', $__key);

$__html = app('livewire')->mount($__name, $__params, $__key, $__componentSlots);

echo $__html;

unset($__html);
unset($__key);
$__key = $__keyOuter;
unset($__keyOuter);
unset($__name);
unset($__params);
unset($__componentSlots);
unset($__split);
?>
        </div>

        <?php if (isset($component)) { $__componentOriginal662d8241a531b225018506f379c995e2 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal662d8241a531b225018506f379c995e2 = $attributes; } ?>
<?php $component = TallStackUi\Components\Table\Component::resolve(['headers' => $headers,'sort' => $sort,'rows' => $this->rows,'paginate' => true,'simplePagination' => true,'filter' => true,'loading' => true,'quantity' => [2, 5, 15, 25]] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('table'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Table\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

            <?php $loop = null; $__env->slot('column_created_at', function($row) use ($__env) { $loop = (object) $__env->getLoopStack()[0] ?>
            <?php echo e($row->created_at->diffForHumans()); ?>

            <?php }); ?>

            <?php $loop = null; $__env->slot('column_action', function($row) use ($__env) { $loop = (object) $__env->getLoopStack()[0] ?>
            <div class="flex gap-1">
                <?php if (isset($component)) { $__componentOriginal776f3b63e85d985f88ebee05433a8279 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal776f3b63e85d985f88ebee05433a8279 = $attributes; } ?>
<?php $component = TallStackUi\Components\Button\Circle\Component::resolve(['icon' => 'pencil'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('button.circle'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Button\Circle\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['wire:click' => '$dispatch(\'load::user\', { \'user\' : \''.e($row->id).'\'})']); ?>
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
                <?php
$__split = function ($name, $params = []) {
    return [$name, $params];
};
[$__name, $__params] = $__split('users.delete', ['user' => $row,'@deleted' => '$refresh']);

$__keyOuter = $__key ?? null;

$__key = uniqid('', true);
$__componentSlots = [];

$__key ??= \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::generateKey('lw-1865796692-1', $__key);

$__html = app('livewire')->mount($__name, $__params, $__key, $__componentSlots);

echo $__html;

unset($__html);
unset($__key);
$__key = $__keyOuter;
unset($__keyOuter);
unset($__name);
unset($__params);
unset($__componentSlots);
unset($__split);
?>
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
     <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal5c806641b94f036edd70b23c3aa0efb3)): ?>
<?php $attributes = $__attributesOriginal5c806641b94f036edd70b23c3aa0efb3; ?>
<?php unset($__attributesOriginal5c806641b94f036edd70b23c3aa0efb3); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal5c806641b94f036edd70b23c3aa0efb3)): ?>
<?php $component = $__componentOriginal5c806641b94f036edd70b23c3aa0efb3; ?>
<?php unset($__componentOriginal5c806641b94f036edd70b23c3aa0efb3); ?>
<?php endif; ?>

    <?php
$__split = function ($name, $params = []) {
    return [$name, $params];
};
[$__name, $__params] = $__split('users.update', ['@updated' => '$refresh']);

$__keyOuter = $__key ?? null;

$__key = null;
$__componentSlots = [];

$__key ??= \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::generateKey('lw-1865796692-2', $__key);

$__html = app('livewire')->mount($__name, $__params, $__key, $__componentSlots);

echo $__html;

unset($__html);
unset($__key);
$__key = $__keyOuter;
unset($__keyOuter);
unset($__name);
unset($__params);
unset($__componentSlots);
unset($__split);
?>
</div>
<?php /**PATH D:\pwebif\dona-cake-web\resources\views/livewire/users/index.blade.php ENDPATH**/ ?>