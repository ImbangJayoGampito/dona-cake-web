<?php
    $customization = $classes();
?>

<template x-teleport="body">
<div x-cloak
     <?php if($id): ?> id="<?php echo e($id); ?>" <?php endif; ?>
     class="<?php echo \Illuminate\Support\Arr::toCssClasses(['relative', $configurations['zIndex']]); ?>"
     aria-labelledby="modal-title"
     role="dialog"
     aria-modal="true"
     <?php if($wire): ?>
         x-data="tallstackui_modal(<?php if ((object) ($entangle) instanceof \Livewire\WireDirective) : ?>window.Livewire.find('<?php echo e($__livewire->getId()); ?>').entangle('<?php echo e($entangle->value()); ?>')<?php echo e($entangle->hasModifier('live') ? '.live' : ''); ?><?php else : ?>window.Livewire.find('<?php echo e($__livewire->getId()); ?>').entangle('<?php echo e($entangle); ?>')<?php endif; ?>, <?php echo \Illuminate\Support\Js::from($configurations['overflow'] ?? false)->toHtml() ?>)"
     <?php else: ?>
         x-data="tallstackui_modal(false, <?php echo \Illuminate\Support\Js::from($configurations['overflow'] ?? false)->toHtml() ?>)"
     <?php endif; ?>
     x-show="show"
     <?php if(!$configurations['persistent']): ?> x-on:keydown.escape.window="top_ui && (show = false)" <?php endif; ?>
     x-on:modal:<?php echo e($open); ?>.window="show = true;"
     x-on:modal:<?php echo e($close); ?>.window="show = false;"
        <?php echo e($attributes->whereStartsWith('x-on:')); ?>>
    <div x-show="show"
         <?php if(!$ts_ui__flash): ?>
             x-transition:enter="ease-out duration-300"
         x-transition:enter-start="opacity-0"
         x-transition:enter-end="opacity-100"
         x-transition:leave="ease-in duration-200"
         x-transition:leave-start="opacity-100"
         x-transition:leave-end="opacity-0"
            <?php endif; ?>
            class="<?php echo \Illuminate\Support\Arr::toCssClasses([$customization['wrapper.first'], ($configurations['blur'] ? $customization['blur.'.($configurations['blur'] === true ? 'sm' : $configurations['blur'])] : '') => (bool) $configurations['blur']]); ?>"></div>
    <div class="<?php echo e($customization['wrapper.second']); ?>">
        <div class="<?php echo \Illuminate\Support\Arr::toCssClasses([
                $customization['wrapper.third'],
                $configurations['size'],
                $customization['positions.top'] => !$configurations['center'],
                $customization['positions.center'] => $configurations['center'],
                $customization['wrapper.third-centered-padding'] => $configurations['center'],
            ]); ?>">
            <div x-show="show"
                 <?php if(!$configurations['persistent']): ?> x-on:mousedown.away="top_ui && (show = false)" <?php endif; ?>
                 <?php if(!$ts_ui__flash): ?>
                     x-transition:enter="ease-out duration-300"
                 x-transition:enter-start="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                 x-transition:enter-end="opacity-100 translate-y-0 sm:scale-100"
                 x-transition:leave="ease-in duration-200"
                 x-transition:leave-start="opacity-100 translate-y-0 sm:scale-100"
                 x-transition:leave-end="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    <?php endif; ?>
                    class="<?php echo \Illuminate\Support\Arr::toCssClasses([$customization['wrapper.fourth'], $configurations['size'], $customization['wrapper.scrollable'] => $configurations['scrollable'], $customization['wrapper.fourth-centered-rounded'] => $configurations['center']]); ?>">
                <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($title): ?>
                    <div class="<?php echo e($customization['title.wrapper']); ?>">
                        <h3 class="<?php echo e($customization['title.text']); ?>"><?php echo e($title); ?></h3>
                        <button type="button" x-on:click="show = false" dusk="tallstackui_modal_close">
                            <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('x-mark'),'internal' => true,'class' => ''.e($customization['title.close']).'']); ?>
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
                <div class="<?php echo \Illuminate\Support\Arr::toCssClasses([
                        $customization['body'],
                        $customization['body.scrollable'] => $configurations['scrollable'],
                        $customization['scrollbar.thin'] => $configurations['scrollable'] && $configurations['scrollbar'] === 'thin',
                        $customization['scrollbar.thick'] => $configurations['scrollable'] && $configurations['scrollbar'] === 'thick',
                    ]); ?>">
                    <?php echo e($slot); ?>

                </div>
                <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($footer): ?>
                    <div class="<?php echo \Illuminate\Support\Arr::toCssClasses([$customization['footer'], $customization['footer.scrollable'] => $configurations['scrollable']]); ?>">
                        <?php echo e($footer); ?>

                    </div>
                <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
            </div>
        </div>
    </div>
</div>
</template>
<?php /**PATH D:\pwebif\dona-cake-web\vendor\tallstackui\tallstackui\src/resources/views/components/modal/main.blade.php ENDPATH**/ ?>