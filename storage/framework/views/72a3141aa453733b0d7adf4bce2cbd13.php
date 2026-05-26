<?php
    $customization = $classes();
?>

<div class="<?php echo e($customization['mobile.wrapper.first']); ?>"
     x-show="tallStackUiMenuMobile">
    <div <?php if(!$ts_ui__flash): ?>
             x-transition:enter="transition-opacity ease-linear duration-300"
         x-transition:enter-start="opacity-0"
         x-transition:enter-end="opacity-100"
         x-transition:leave="transition-opacity ease-linear duration-300"
         x-transition:leave-start="opacity-100"
         x-transition:leave-end="opacity-0"
         <?php endif; ?>
         class="<?php echo e($customization['mobile.backdrop']); ?>"
         x-show="tallStackUiMenuMobile"></div>
    <div class="<?php echo e($customization['mobile.wrapper.second']); ?>">
        <div <?php if(!$ts_ui__flash): ?>
                 x-transition:enter="transition ease-in-out duration-300 transform"
             x-transition:enter-start="-translate-x-full"
             x-transition:enter-end="translate-x-0"
             x-transition:leave="transition ease-in-out duration-300 transform"
             x-transition:leave-start="translate-x-0"
             x-transition:leave-end="-translate-x-full"
             <?php endif; ?>
             class="<?php echo e($customization['mobile.wrapper.third']); ?>"
             x-show="tallStackUiMenuMobile">
            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(filled($customization['mobile.button.icon'])): ?>
                <div x-show="tallStackUiMenuMobile"
                     <?php if(!$ts_ui__flash): ?>
                         x-transition:enter="ease-in-out duration-300"
                     x-transition:enter-start="opacity-0"
                     x-transition:enter-end="opacity-100"
                     x-transition:leave="ease-in-out duration-300"
                     x-transition:leave-start="opacity-100"
                     x-transition:leave-end="opacity-0"
                     <?php endif; ?>
                     class="<?php echo e($customization['mobile.button.wrapper']); ?>">
                    <button x-on:click="tallStackUiMenuMobile = false" type="button" class="cursor-pointer">
                        <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon($customization['mobile.button.icon']),'internal' => true,'class' => ''.e($customization['mobile.button.size']).'']); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal511d4862ff04963c3c16115c05a86a9d)): ?>
<?php $attributes = $__attributesOriginal511d4862ff04963c3c16115c05a86a9d; ?>
<?php unset($__attributesOriginal511d4862ff04963c3c16115c05a86a9d); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal511d4862ff04963c3c16115c05a86a9d)): ?>
<?php $component = $__componentOriginal511d4862ff04963c3c16115c05a86a9d; ?>
<?php unset($__componentOriginal511d4862ff04963c3c16115c05a86a9d); ?>
<?php endif; ?>
                    </button>
                </div>
            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
            <div class="<?php echo e($customization['mobile.wrapper.fourth']); ?>"
                 x-on:click.outside="tallStackUiMenuMobile = false">
                <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($brand): ?>
                    <?php echo e($brand); ?>

                <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                <div class="<?php echo \Illuminate\Support\Arr::toCssClasses([
                        $customization['mobile.wrapper.items'],
                        $customization['mobile.scrollbar.thin'] => $thinScroll,
                        $customization['mobile.scrollbar.thick'] => $thickScroll,
                     ]); ?>">
                    <div class="<?php echo \Illuminate\Support\Arr::toCssClasses([$customization['mobile.wrapper.third'], $customization['mobile.wrapper.brand.margin'] => blank($brand)]); ?>">
                        <nav class="<?php echo e($customization['mobile.wrapper.fifth']); ?>">
                            <ul role="list" class="<?php echo e($customization['mobile.wrapper.sixth']); ?>">
                                <?php echo e($slot); ?>

                            </ul>
                        </nav>
                    </div>
                </div>
                <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($footer): ?>
                    <div class="<?php echo e($customization['mobile.footer']); ?>">
                        <?php echo e($footer); ?>

                    </div>
                <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
            </div>
        </div>
    </div>
</div>
<div class="<?php echo e($customization['desktop.wrapper.first.base']); ?>"
     x-bind:class="{ '<?php echo e($customization['desktop.wrapper.first.size']); ?>' : $store['tsui.side-bar'].open }"
     <?php if($collapsible): ?> x-init="$store['tsui.side-bar'].collapsible = true" <?php endif; ?>>
    <div class="<?php echo \Illuminate\Support\Arr::toCssClasses([
            $customization['desktop.wrapper.second'],
        ]); ?>" <?php if($collapsible): ?> x-bind:class="{
            '<?php echo e($customization['desktop.sizes.expanded']); ?>' : $store['tsui.side-bar'].open,
            '<?php echo e($customization['desktop.sizes.collapsed']); ?>' : !$store['tsui.side-bar'].open,
        }" <?php endif; ?> x-cloak>
        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($brand): ?>
            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($brandCollapsed && $collapsible): ?>
                <div x-show="$store['tsui.side-bar'].open" x-cloak>
                    <?php echo e($brand); ?>

                </div>
                <div x-show="!$store['tsui.side-bar'].open" x-cloak>
                    <?php echo e($brandCollapsed); ?>

                </div>
            <?php else: ?>
                <?php echo e($brand); ?>

            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
        <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
        <div class="<?php echo \Illuminate\Support\Arr::toCssClasses([
                $customization['desktop.wrapper.items'],
                $customization['desktop.scrollbar.thin'] => $thinScroll,
                $customization['desktop.scrollbar.thick'] => $thickScroll,
             ]); ?>">
            <div class="<?php echo \Illuminate\Support\Arr::toCssClasses([$customization['desktop.wrapper.third'], $customization['desktop.wrapper.brand.margin'] => blank($brand)]); ?>">
                <nav class="<?php echo e($customization['desktop.wrapper.fourth']); ?>">
                    <ul role="list" class="<?php echo e($customization['desktop.wrapper.fifth']); ?>">
                        <?php echo e($slot); ?>

                    </ul>
                </nav>
            </div>
        </div>
        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($footer): ?>
            <div class="<?php echo e($customization['desktop.footer']); ?>">
                <?php echo e($footer); ?>

            </div>
        <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
    </div>
</div>
<?php /**PATH D:\pwebif\dona-cake-web\vendor\tallstackui\tallstackui\src/resources/views/components/layout/sidebar/main.blade.php ENDPATH**/ ?>