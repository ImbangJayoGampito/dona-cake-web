<?php if (isset($component)) { $__componentOriginal9ac128a9029c0e4701924bd2d73d7f54 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal9ac128a9029c0e4701924bd2d73d7f54 = $attributes; } ?>
<?php $component = App\View\Components\AppLayout::resolve([] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('app-layout'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\App\View\Components\AppLayout::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

    <?php if (isset($component)) { $__componentOriginal5c806641b94f036edd70b23c3aa0efb3 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal5c806641b94f036edd70b23c3aa0efb3 = $attributes; } ?>
<?php $component = TallStackUi\Components\Card\Component::resolve(['header' => 'Welcome to the TallStackUI Starter Kit'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Card\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

        <div class="space-y-2">
            <p>
                👋🏻 This is the TallStackUI starter kit for Laravel 12. With this TallStackUI starter kit you will be
                able to enjoy a ready-to-use application to initialize your next Laravel 12 project with TallStackUI.
            </p>
            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(auth()->user()->hasRole(\App\Enums\RoleEnum::Admin->value)): ?>
                <p>This is exclusive to admin, hello admin!</p>
            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
            <div class="mt-4 space-y-2">
                <i>
                    "What this starter kit includes out of the box?"
                </i>
                <ul class="ml-2 mt-2 list-inside list-decimal font-semibold">
                    <li>Laravel v12</li>
                    <li>Livewire v3</li>
                    <li>TallStackUI v2</li>
                    <li>TailwindCSS v4</li>
                </ul>
                <p>And also:</p>
                <ul class="ml-2 mt-2 list-inside list-decimal font-semibold">
                    <li><a href="https://github.com/barryvdh/laravel-debugbar" target="_blank">DebugBar</a></li>
                    <li><a href="https://github.com/larastan/larastan" target="_blank">LaraStan</a></li>
                    <li><a href="https://pestphp.com/" target="_blank">Pest</a></li>
                    <li><a href="https://laravel.com/docs/pint" target="_blank">Pint</a></li>
                </ul>
            </div>
            <?php
$__split = function ($name, $params = []) {
    return [$name, $params];
};
[$__name, $__params] = $__split('katalogmenu::mfc.katalog.view', []);

$__keyOuter = $__key ?? null;

$__key = null;
$__componentSlots = [];

$__key ??= \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::generateKey('lw-3417507175-0', $__key);

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
         <?php $__env->slot('footer', null, []); ?> 
            <span class="text-xs">
                ⚠️ <?php if (isset($component)) { $__componentOriginal811f4ea8093901dbbc2a78b6594eca45 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal811f4ea8093901dbbc2a78b6594eca45 = $attributes; } ?>
<?php $component = TallStackUi\Components\Link\Component::resolve(['href' => 'https://tallstackui.com/docs/v2/starter-kit','bold' => true,'blank' => true,'sm' => true] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('link'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Link\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>
Make sure to read the docs
                    about the starter kit! <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal811f4ea8093901dbbc2a78b6594eca45)): ?>
<?php $attributes = $__attributesOriginal811f4ea8093901dbbc2a78b6594eca45; ?>
<?php unset($__attributesOriginal811f4ea8093901dbbc2a78b6594eca45); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal811f4ea8093901dbbc2a78b6594eca45)): ?>
<?php $component = $__componentOriginal811f4ea8093901dbbc2a78b6594eca45; ?>
<?php unset($__componentOriginal811f4ea8093901dbbc2a78b6594eca45); ?>
<?php endif; ?>
            </span>
         <?php $__env->endSlot(); ?>
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

    <?php if (isset($component)) { $__componentOriginal5c806641b94f036edd70b23c3aa0efb3 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal5c806641b94f036edd70b23c3aa0efb3 = $attributes; } ?>
<?php $component = TallStackUi\Components\Card\Component::resolve(['header' => 'Ulasan Reviews'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Card\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

        <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <h3 class="text-lg font-semibold">Submit a review</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400">Share feedback for a product you bought and help the team improve the catalog.</p>
                <?php if (isset($component)) { $__componentOriginal81da9b0d04b05fd8a605d2829e8f6a5e = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal81da9b0d04b05fd8a605d2829e8f6a5e = $attributes; } ?>
<?php $component = TallStackUi\Components\Button\Normal\Component::resolve(['href' => route('ulasan.form')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('button'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Button\Normal\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['primary' => true]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>
Write Review <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal81da9b0d04b05fd8a605d2829e8f6a5e)): ?>
<?php $attributes = $__attributesOriginal81da9b0d04b05fd8a605d2829e8f6a5e; ?>
<?php unset($__attributesOriginal81da9b0d04b05fd8a605d2829e8f6a5e); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal81da9b0d04b05fd8a605d2829e8f6a5e)): ?>
<?php $component = $__componentOriginal81da9b0d04b05fd8a605d2829e8f6a5e; ?>
<?php unset($__componentOriginal81da9b0d04b05fd8a605d2829e8f6a5e); ?>
<?php endif; ?>
            </div>

            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(auth()->user()->hasRole(\App\Enums\RoleEnum::Admin->value)): ?>
                <div class="space-y-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <h3 class="text-lg font-semibold">Manage reviews</h3>
                    <p class="text-sm text-slate-500 dark:text-slate-400">Review and moderate customer feedback across products.</p>
                    <?php if (isset($component)) { $__componentOriginal81da9b0d04b05fd8a605d2829e8f6a5e = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal81da9b0d04b05fd8a605d2829e8f6a5e = $attributes; } ?>
<?php $component = TallStackUi\Components\Button\Normal\Component::resolve(['href' => route('ulasan.admin')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('button'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Button\Normal\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>
Open Review Management <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal81da9b0d04b05fd8a605d2829e8f6a5e)): ?>
<?php $attributes = $__attributesOriginal81da9b0d04b05fd8a605d2829e8f6a5e; ?>
<?php unset($__attributesOriginal81da9b0d04b05fd8a605d2829e8f6a5e); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal81da9b0d04b05fd8a605d2829e8f6a5e)): ?>
<?php $component = $__componentOriginal81da9b0d04b05fd8a605d2829e8f6a5e; ?>
<?php unset($__componentOriginal81da9b0d04b05fd8a605d2829e8f6a5e); ?>
<?php endif; ?>
                </div>
            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
        </div>
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
 <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal9ac128a9029c0e4701924bd2d73d7f54)): ?>
<?php $attributes = $__attributesOriginal9ac128a9029c0e4701924bd2d73d7f54; ?>
<?php unset($__attributesOriginal9ac128a9029c0e4701924bd2d73d7f54); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal9ac128a9029c0e4701924bd2d73d7f54)): ?>
<?php $component = $__componentOriginal9ac128a9029c0e4701924bd2d73d7f54; ?>
<?php unset($__componentOriginal9ac128a9029c0e4701924bd2d73d7f54); ?>
<?php endif; ?>
<?php /**PATH D:\pwebif\dona-cake-web\resources\views/dashboard.blade.php ENDPATH**/ ?>