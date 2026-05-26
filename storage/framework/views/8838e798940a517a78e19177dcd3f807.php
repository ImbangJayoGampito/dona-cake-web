<?php
    $customization = $classes();
?>

<?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('wrapper.input')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['id' => $id,'property' => $property,'error' => $error,'label' => $label,'hint' => $hint,'invalidate' => $invalidate,'floatable' => $attributes->get('floatable', false)]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($addon): ?>
        <div class="<?php echo \Illuminate\Support\Arr::toCssClasses([
            $customization['input.addon.wrapper'],
            $customization['input.color.base'] => !$error,
            $customization['input.color.background'] => !$attributes->get('disabled') && !$attributes->get('readonly'),
            $customization['input.color.disabled'] => $attributes->get('disabled') || $attributes->get('readonly'),
            $customization['input.addon.error'] => $error,
        ]); ?>">
            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($prefixed): ?>
                <div class="<?php echo \Illuminate\Support\Arr::toCssClasses([$customization['input.addon.button.base'], $customization['input.addon.button.left']]); ?>">
                    <?php echo e($prefix); ?>

                </div>
            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
    <div class="<?php echo \Illuminate\Support\Arr::toCssClasses([
            'relative flex-1' => $addon,
            $customization['input.wrapper-fix'] => $addon,
            $customization['input.wrapper'],
            $customization['input.addon.round.left'] => $prefixed,
            $customization['input.addon.round.right'] => $suffixed,
            $customization['input.color.base'] => !$error,
            $customization['input.color.background'] => !$addon && !$attributes->get('disabled') && !$attributes->get('readonly'),
            $customization['input.color.disabled'] => !$addon && ($attributes->get('disabled') || $attributes->get('readonly')),
            $customization['error'] => $error
        ]); ?>">
        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($icon): ?>
            <div class="<?php echo \Illuminate\Support\Arr::toCssClasses([$customization['icon.wrapper'], $customization['icon.paddings.' . $position]]); ?>">
                <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => $icon,'error' => $error,'internal' => true,'class' => \Illuminate\Support\Arr::toCssClasses([
                                         $customization['icon.size'],
                                         $customization['error'] => $error,
                                         $customization['icon.color'] => !$error && !$invalidate
                                     ])]); ?>
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
            </div>
        <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($clearable): ?>
            <div x-data="tallstackui_formInputClearable(<?php echo \Illuminate\Support\Js::from($ref)->toHtml() ?>)"
                 class="<?php echo \Illuminate\Support\Arr::toCssClasses([$customization['clearable.wrapper'], $customization['clearable.padding'], $customization['input.paddings.icon-clearable-extra'] => $icon && $position === 'right']); ?>" x-show="clearable">
                <button type="button" class="cursor-pointer" dusk="tallstackui_form_input_clearable">
                    <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('x-mark'),'x-on:click' => 'clear()','internal' => true,'class' => \Illuminate\Support\Arr::toCssClasses([
                                             $customization['clearable.size'],
                                             $customization['clearable.color'] => !$error && !$invalidate,
                                         ])]); ?>
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
        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(!$prefixed): ?>
            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($prefix instanceof \Illuminate\View\ComponentSlot): ?>
                <div <?php echo e($prefix->attributes->merge(['class' => $customization['input.slot']])); ?>>
                    <?php echo e($prefix); ?>

                </div>
            <?php elseif(is_string($prefix)): ?>
                <span class="<?php echo \Illuminate\Support\Arr::toCssClasses([$customization['input.slot-prefix-spacing'], $customization['input.slot'], $customization['error'] => $error]); ?>"><?php echo e($prefix); ?></span>
            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
        <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
        <input <?php if($id): ?> id="<?php echo e($id); ?>" <?php endif; ?>
        type="<?php echo e($attributes->get('type', 'text')); ?>"
               x-ref="<?php echo e($attributes->get('x-ref', $ref)); ?>"
               <?php if($stripZeros): ?> x-data="tallstackui_formInputStripZeros(<?php echo \Illuminate\Support\Js::from($ref)->toHtml() ?>)" <?php endif; ?>
               <?php if($prefix || $suffix): ?> autocomplete="<?php echo e($attributes->get('autocomplete', 'off')); ?>" <?php endif; ?>
                <?php echo e($attributes->class([
                     $customization['input.base'],
                     $customization['input.paddings.prefix'] => $prefix && !$prefixed,
                     $customization['input.paddings.suffix'] => $suffix && !$suffixed,
                     $customization['input.paddings.left'] => $icon && ($position === null || $position === 'left'),
                     $customization['input.paddings.right'] => $icon && $position === 'right' || $icon && $clearable,
                     $customization['input.paddings.clearable'] => $icon && $clearable && $position === 'right',
                 ])); ?>>
        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(!$suffixed): ?>
            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($suffix instanceof \Illuminate\View\ComponentSlot): ?>
                <div <?php echo e($suffix->attributes->merge(['class' => $customization['input.slot']])); ?>>
                    <?php echo e($suffix); ?>

                </div>
            <?php elseif(is_string($suffix)): ?>
                <span class="<?php echo \Illuminate\Support\Arr::toCssClasses([$customization['input.slot-suffix-spacing'], $customization['input.slot'], $customization['error'] => $error]); ?>"><?php echo e($suffix); ?></span>
            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
        <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
    </div>
    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($addon): ?>
            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($suffixed): ?>
                <div class="<?php echo \Illuminate\Support\Arr::toCssClasses([$customization['input.addon.button.base'], $customization['input.addon.button.right']]); ?>">
                    <?php echo e($suffix); ?>

                </div>
            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
        </div>
    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
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
<?php /**PATH D:\pwebif\dona-cake-web\vendor\tallstackui\tallstackui\src/resources/views/components/form/input.blade.php ENDPATH**/ ?>