<?php
    use App\Services\SidebarService;
?>
<!DOCTYPE html>
<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>" x-data="tallstackui_darkTheme()">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">

    <title><?php echo e(config('app.name', 'Laravel')); ?></title>

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <script type="module" src="/tallstackui/script/tallstackui-clipboard-DN6tjWy_.js"></script><script type="module" src="/tallstackui/script/tallstackui-date-D3DTrXOD.js"></script><script type="module" src="/tallstackui/script/tallstackui-select-HgxwK_NP.js"></script><script type="module" src="/tallstackui/script/tallstackui-tooltip-DbRqA7Za.js"></script><link href="/tallstackui/style/tallstackui-tooltip-Lcq2UOUK.css" rel="stylesheet" type="text/css"><script type="module" src="/tallstackui/script/tallstackui-Bg0i6IM7.js"></script><link rel="modulepreload" href="/tallstackui/script/chunk-DJhY7h8f.js"><link rel="modulepreload" href="/tallstackui/script/helpers-CqbgxKUD.js">
    <?php echo \Livewire\Mechanisms\FrontendAssets\FrontendAssets::styles(); ?>

    <?php echo app('Illuminate\Foundation\Vite')(['resources/css/app.css', 'resources/js/app.js']); ?>
</head>

<body class="font-sans antialiased" x-cloak x-data="{ name: <?php echo \Illuminate\Support\Js::from(auth()->user()->name)->toHtml() ?> }" x-on:name-updated.window="name = $event.detail.name"
    x-bind:class="{ 'dark bg-gray-800': darkTheme, 'bg-gray-100': !darkTheme }">
    <?php if (isset($component)) { $__componentOriginal9da78d59f0b9d16bb789d5ae1106f1ab = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal9da78d59f0b9d16bb789d5ae1106f1ab = $attributes; } ?>
<?php $component = TallStackUi\Components\Layout\Main\Component::resolve([] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('layout'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Layout\Main\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

         <?php $__env->slot('top', null, []); ?> 
            <?php if (isset($component)) { $__componentOriginalc503deb10f949eed763a4ffa0fb4df64 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginalc503deb10f949eed763a4ffa0fb4df64 = $attributes; } ?>
<?php $component = TallStackUi\Components\Dialog\Component::resolve([] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dialog'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Dialog\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginalc503deb10f949eed763a4ffa0fb4df64)): ?>
<?php $attributes = $__attributesOriginalc503deb10f949eed763a4ffa0fb4df64; ?>
<?php unset($__attributesOriginalc503deb10f949eed763a4ffa0fb4df64); ?>
<?php endif; ?>
<?php if (isset($__componentOriginalc503deb10f949eed763a4ffa0fb4df64)): ?>
<?php $component = $__componentOriginalc503deb10f949eed763a4ffa0fb4df64; ?>
<?php unset($__componentOriginalc503deb10f949eed763a4ffa0fb4df64); ?>
<?php endif; ?>
            <?php if (isset($component)) { $__componentOriginalff4489b59987c88d9cce825beea6f61e = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginalff4489b59987c88d9cce825beea6f61e = $attributes; } ?>
<?php $component = TallStackUi\Components\Toast\Component::resolve([] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('toast'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Toast\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginalff4489b59987c88d9cce825beea6f61e)): ?>
<?php $attributes = $__attributesOriginalff4489b59987c88d9cce825beea6f61e; ?>
<?php unset($__attributesOriginalff4489b59987c88d9cce825beea6f61e); ?>
<?php endif; ?>
<?php if (isset($__componentOriginalff4489b59987c88d9cce825beea6f61e)): ?>
<?php $component = $__componentOriginalff4489b59987c88d9cce825beea6f61e; ?>
<?php unset($__componentOriginalff4489b59987c88d9cce825beea6f61e); ?>
<?php endif; ?>
         <?php $__env->endSlot(); ?>
         <?php $__env->slot('header', null, []); ?> 
            <?php if (isset($component)) { $__componentOriginal9b740c8aa2134f3fa72b65fed05386e4 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal9b740c8aa2134f3fa72b65fed05386e4 = $attributes; } ?>
<?php $component = TallStackUi\Components\Layout\Header\Component::resolve([] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('layout.header'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Layout\Header\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

                 <?php $__env->slot('right', null, []); ?> 
                    <?php if (isset($component)) { $__componentOriginal6112eece8b022883fa25d4eeb7f6ceda = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal6112eece8b022883fa25d4eeb7f6ceda = $attributes; } ?>
<?php $component = TallStackUi\Components\Dropdown\Main\Component::resolve([] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dropdown'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Dropdown\Main\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

                         <?php $__env->slot('action', null, []); ?> 
                            <div>
                                <button class="cursor-pointer" x-on:click="show = !show">
                                    <span class="text-base font-semibold text-primary-500" x-text="name"></span>
                                </button>
                            </div>
                         <?php $__env->endSlot(); ?>
                         <?php $__env->slot('header', null, []); ?> 
                            <?php if (isset($component)) { $__componentOriginal2063a5cd3f9562eccf6e651999ab2c5c = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal2063a5cd3f9562eccf6e651999ab2c5c = $attributes; } ?>
<?php $component = TallStackUi\Components\ThemeSwitch\Component::resolve(['block' => true] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('theme-switch'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\ThemeSwitch\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal2063a5cd3f9562eccf6e651999ab2c5c)): ?>
<?php $attributes = $__attributesOriginal2063a5cd3f9562eccf6e651999ab2c5c; ?>
<?php unset($__attributesOriginal2063a5cd3f9562eccf6e651999ab2c5c); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal2063a5cd3f9562eccf6e651999ab2c5c)): ?>
<?php $component = $__componentOriginal2063a5cd3f9562eccf6e651999ab2c5c; ?>
<?php unset($__componentOriginal2063a5cd3f9562eccf6e651999ab2c5c); ?>
<?php endif; ?>
                         <?php $__env->endSlot(); ?>
                        <form method="POST" action="<?php echo e(route('logout')); ?>">
                            <?php echo csrf_field(); ?>
                            <?php if (isset($component)) { $__componentOriginal983f357c210876dd0649b9da722c3f09 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal983f357c210876dd0649b9da722c3f09 = $attributes; } ?>
<?php $component = TallStackUi\Components\Dropdown\Items\Component::resolve(['text' => __('Profile'),'href' => route('user.profile')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dropdown.items'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Dropdown\Items\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal983f357c210876dd0649b9da722c3f09)): ?>
<?php $attributes = $__attributesOriginal983f357c210876dd0649b9da722c3f09; ?>
<?php unset($__attributesOriginal983f357c210876dd0649b9da722c3f09); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal983f357c210876dd0649b9da722c3f09)): ?>
<?php $component = $__componentOriginal983f357c210876dd0649b9da722c3f09; ?>
<?php unset($__componentOriginal983f357c210876dd0649b9da722c3f09); ?>
<?php endif; ?>
                            <?php if (isset($component)) { $__componentOriginal983f357c210876dd0649b9da722c3f09 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal983f357c210876dd0649b9da722c3f09 = $attributes; } ?>
<?php $component = TallStackUi\Components\Dropdown\Items\Component::resolve(['text' => __('Logout'),'separator' => true] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dropdown.items'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Dropdown\Items\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['onclick' => 'event.preventDefault(); this.closest(\'form\').submit();']); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal983f357c210876dd0649b9da722c3f09)): ?>
<?php $attributes = $__attributesOriginal983f357c210876dd0649b9da722c3f09; ?>
<?php unset($__attributesOriginal983f357c210876dd0649b9da722c3f09); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal983f357c210876dd0649b9da722c3f09)): ?>
<?php $component = $__componentOriginal983f357c210876dd0649b9da722c3f09; ?>
<?php unset($__componentOriginal983f357c210876dd0649b9da722c3f09); ?>
<?php endif; ?>
                        </form>
                     <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal6112eece8b022883fa25d4eeb7f6ceda)): ?>
<?php $attributes = $__attributesOriginal6112eece8b022883fa25d4eeb7f6ceda; ?>
<?php unset($__attributesOriginal6112eece8b022883fa25d4eeb7f6ceda); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal6112eece8b022883fa25d4eeb7f6ceda)): ?>
<?php $component = $__componentOriginal6112eece8b022883fa25d4eeb7f6ceda; ?>
<?php unset($__componentOriginal6112eece8b022883fa25d4eeb7f6ceda); ?>
<?php endif; ?>
                 <?php $__env->endSlot(); ?>
             <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal9b740c8aa2134f3fa72b65fed05386e4)): ?>
<?php $attributes = $__attributesOriginal9b740c8aa2134f3fa72b65fed05386e4; ?>
<?php unset($__attributesOriginal9b740c8aa2134f3fa72b65fed05386e4); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal9b740c8aa2134f3fa72b65fed05386e4)): ?>
<?php $component = $__componentOriginal9b740c8aa2134f3fa72b65fed05386e4; ?>
<?php unset($__componentOriginal9b740c8aa2134f3fa72b65fed05386e4); ?>
<?php endif; ?>
         <?php $__env->endSlot(); ?>
         <?php $__env->slot('menu', null, []); ?> 
            <?php if (isset($component)) { $__componentOriginal910bea80fab99634814726f23d0a816b = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal910bea80fab99634814726f23d0a816b = $attributes; } ?>
<?php $component = TallStackUi\Components\Layout\SideBar\Main\Component::resolve(['smart' => true,'collapsible' => true] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('side-bar'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Layout\SideBar\Main\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

                 <?php $__env->slot('brand', null, []); ?> 
                    <div class="my-4 flex items-center justify-center">
                        <img src="<?php echo e(asset('/assets/images/tsui.png')); ?>" width="40" height="40" />
                    </div>
                 <?php $__env->endSlot(); ?>
                 <?php $__env->slot('brandCollapsed', null, []); ?> 
                    <div class="my-4 flex items-center justify-center">
                        <img src="<?php echo e(asset('/assets/images/tsui.png')); ?>" width="20" height="20" />
                    </div>
                 <?php $__env->endSlot(); ?>
                <?php

                ?>
                <?php if (isset($component)) { $__componentOriginal976ff8cbea1bc0676e92232fe6ebb414 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal976ff8cbea1bc0676e92232fe6ebb414 = $attributes; } ?>
<?php $component = TallStackUi\Components\Layout\SideBar\Item\Component::resolve(['text' => 'Dashboard','icon' => 'home','route' => route('dashboard')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
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
<?php endif; ?>
                <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(auth()->user()): ?>

                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::openLoop(); ?><?php endif; ?><?php $__currentLoopData = $sidebarItems; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $item): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::startLoopIteration(); ?><?php endif; ?>
                        <?php
                            $output = $item->AccordionRepresentation('', auth()->user());

                        ?>
                        <?php echo \Illuminate\Support\Facades\Blade::render($output); ?>

                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::endLoop(); ?><?php endif; ?><?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::closeLoop(); ?><?php endif; ?>
                <?php else: ?>
                <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                <?php

                ?>

                <?php if (isset($component)) { $__componentOriginal976ff8cbea1bc0676e92232fe6ebb414 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal976ff8cbea1bc0676e92232fe6ebb414 = $attributes; } ?>
<?php $component = TallStackUi\Components\Layout\SideBar\Item\Component::resolve(['text' => 'Users','icon' => 'users','route' => route('users.index')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
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
<?php endif; ?>
                <?php if (isset($component)) { $__componentOriginal976ff8cbea1bc0676e92232fe6ebb414 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal976ff8cbea1bc0676e92232fe6ebb414 = $attributes; } ?>
<?php $component = TallStackUi\Components\Layout\SideBar\Item\Component::resolve(['text' => 'Welcome Page','icon' => 'arrow-uturn-left','route' => route('welcome')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
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
<?php endif; ?>
             <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal910bea80fab99634814726f23d0a816b)): ?>
<?php $attributes = $__attributesOriginal910bea80fab99634814726f23d0a816b; ?>
<?php unset($__attributesOriginal910bea80fab99634814726f23d0a816b); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal910bea80fab99634814726f23d0a816b)): ?>
<?php $component = $__componentOriginal910bea80fab99634814726f23d0a816b; ?>
<?php unset($__componentOriginal910bea80fab99634814726f23d0a816b); ?>
<?php endif; ?>
         <?php $__env->endSlot(); ?>
        <?php echo e($slot); ?>

     <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal9da78d59f0b9d16bb789d5ae1106f1ab)): ?>
<?php $attributes = $__attributesOriginal9da78d59f0b9d16bb789d5ae1106f1ab; ?>
<?php unset($__attributesOriginal9da78d59f0b9d16bb789d5ae1106f1ab); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal9da78d59f0b9d16bb789d5ae1106f1ab)): ?>
<?php $component = $__componentOriginal9da78d59f0b9d16bb789d5ae1106f1ab; ?>
<?php unset($__componentOriginal9da78d59f0b9d16bb789d5ae1106f1ab); ?>
<?php endif; ?>
    <?php echo \Livewire\Mechanisms\FrontendAssets\FrontendAssets::scripts(); ?>

</body>

</html>
<?php /**PATH D:\pwebif\dona-cake-web\resources\views/layouts/app.blade.php ENDPATH**/ ?>