<div wire:ignore.self
     x-cloak
     x-data="{
        setAs(type) {
            mode = type;

            this.$el.dispatchEvent(new CustomEvent('theme', {
                detail: {
                    darkTheme: darkTheme,
                    mode: mode
                }
            }));
        }
     }">
    <div class="<?php echo \Illuminate\Support\Arr::toCssClasses([$customization['segmented.wrapper'], $customization['segmented.wrapper-block'] => $block]); ?>" <?php echo e($attributes->only('x-on:change')); ?>>
        <button type="button"
                x-on:click="setAs('dark')"
                x-bind:class="{
                    '<?php echo e($customization['segmented.active']); ?>': mode === 'dark',
                    '<?php echo e($customization['segmented.inactive']); ?>': mode !== 'dark'
                }"
                class="<?php echo \Illuminate\Support\Arr::toCssClasses([$customization['segmented.button'], $customization['segmented-block'] => $block]); ?>">
            <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('moon'),'internal' => true,'class' => \Illuminate\Support\Arr::toCssClasses([$customization['segmented.colors.moon'], $customization['segmented.icons.sizes.' . $size]])]); ?>
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
        <button type="button"
                x-on:click="setAs('system')"
                x-bind:class="{
                    '<?php echo e($customization['segmented.active']); ?>': mode === 'system',
                    '<?php echo e($customization['segmented.inactive']); ?>': mode !== 'system'
                }"
                class="<?php echo \Illuminate\Support\Arr::toCssClasses([$customization['segmented.button'], $customization['segmented-block'] => $block]); ?>">
            <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('computer-desktop'),'internal' => true,'class' => \Illuminate\Support\Arr::toCssClasses([$customization['segmented.colors.system'], $customization['segmented.icons.sizes.' . $size]])]); ?>
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
        <button type="button"
                x-on:click="setAs('light')"
                x-bind:class="{
                    '<?php echo e($customization['segmented.active']); ?>': mode === 'light',
                    '<?php echo e($customization['segmented.inactive']); ?>': mode !== 'light'
                }"
                class="<?php echo \Illuminate\Support\Arr::toCssClasses([$customization['segmented.button'], $customization['segmented-block'] => $block]); ?>">
            <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('sun'),'internal' => true,'class' => \Illuminate\Support\Arr::toCssClasses([$customization['segmented.colors.sun'], $customization['segmented.icons.sizes.' . $size]])]); ?>
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
</div>
<?php /**PATH D:\pwebif\dona-cake-web\vendor\tallstackui\tallstackui\src/resources/views/components/theme-switch/variations/segmented.blade.php ENDPATH**/ ?>