<?php
    $customization = $classes();
?>

<<?php echo e($tag); ?> <?php if($href): ?> href="<?php echo $href; ?>" <?php else: ?>
    role="button"
        <?php endif; ?> <?php if($unfocus): ?> data-tsui-unfocus <?php endif; ?> <?php echo e($attributes->except('type')->class([
        $customization['wrapper.class'],
        $customization['wrapper.sizes.' . $size],
        $colors['background'],
        $customization['wrapper.block'] => $block,
        $customization['wrapper.border.radius.rounded'] => !$square && !$round,
        $customization['wrapper.border.radius.circle'] => !$square && $round !== null,
    ])); ?> type="<?php echo e($attributes->get('type', $submit ? 'submit' : 'button')); ?>" <?php if($livewire && $loading): ?>
    wire:loading.attr="disabled" wire:loading.class="<?php echo e($customization['wire.loading-cursor']); ?>"
<?php endif; ?> <?php if($tooltip): ?>
    x-tooltip="<?php echo e($tooltip); ?>"
<?php endif; ?>>
<?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($livewire && $loading && $position === 'left'): ?>
    <?php if (isset($component)) { $__componentOriginal3fad25095b4cea0eb7b30287bcabda87 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal3fad25095b4cea0eb7b30287bcabda87 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'ts-ui::components.icon.generic.loading-button','data' => ['loading' => $loading,'delay' => $delay,'class' => \Illuminate\Support\Arr::toCssClasses([
                $customization['icon.spinner-animation'],
                $customization['icon.sizes.' . $size],
                $colors['icon'],
            ])]] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('ts-ui::icon.generic.loading-button'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['loading' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($loading),'delay' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($delay),'class' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute(\Illuminate\Support\Arr::toCssClasses([
                $customization['icon.spinner-animation'],
                $customization['icon.sizes.' . $size],
                $colors['icon'],
            ]))]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal3fad25095b4cea0eb7b30287bcabda87)): ?>
<?php $attributes = $__attributesOriginal3fad25095b4cea0eb7b30287bcabda87; ?>
<?php unset($__attributesOriginal3fad25095b4cea0eb7b30287bcabda87); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal3fad25095b4cea0eb7b30287bcabda87)): ?>
<?php $component = $__componentOriginal3fad25095b4cea0eb7b30287bcabda87; ?>
<?php unset($__componentOriginal3fad25095b4cea0eb7b30287bcabda87); ?>
<?php endif; ?>
<?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
<?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($left): ?>
    <?php echo $left; ?>

<?php elseif($icon && $position === 'left'): ?>
    <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['internal' => true,'icon' => $icon,'class' => \Illuminate\Support\Arr::toCssClasses([$customization['icon.sizes.' . $size], $colors['icon']])]); ?>
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
<?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
<?php echo e($text ?? $slot); ?>

<?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($right): ?>
    <?php echo $right; ?>

<?php elseif($icon && $position === 'right'): ?>
    <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['internal' => true,'icon' => $icon,'class' => \Illuminate\Support\Arr::toCssClasses([$customization['icon.sizes.' . $size], $colors['icon']])]); ?>
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
<?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
<?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($livewire && $loading && $position === 'right'): ?>
    <?php if (isset($component)) { $__componentOriginal3fad25095b4cea0eb7b30287bcabda87 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal3fad25095b4cea0eb7b30287bcabda87 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'ts-ui::components.icon.generic.loading-button','data' => ['loading' => $loading,'delay' => $delay,'class' => \Illuminate\Support\Arr::toCssClasses([
            $customization['icon.spinner-animation'],
            $customization['icon.sizes.' . $size],
            $colors['icon'],
        ])]] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('ts-ui::icon.generic.loading-button'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['loading' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($loading),'delay' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($delay),'class' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute(\Illuminate\Support\Arr::toCssClasses([
            $customization['icon.spinner-animation'],
            $customization['icon.sizes.' . $size],
            $colors['icon'],
        ]))]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal3fad25095b4cea0eb7b30287bcabda87)): ?>
<?php $attributes = $__attributesOriginal3fad25095b4cea0eb7b30287bcabda87; ?>
<?php unset($__attributesOriginal3fad25095b4cea0eb7b30287bcabda87); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal3fad25095b4cea0eb7b30287bcabda87)): ?>
<?php $component = $__componentOriginal3fad25095b4cea0eb7b30287bcabda87; ?>
<?php unset($__componentOriginal3fad25095b4cea0eb7b30287bcabda87); ?>
<?php endif; ?>
<?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
</<?php echo e($tag); ?>>
<?php /**PATH D:\pwebif\dona-cake-web\vendor\tallstackui\tallstackui\src/resources/views/components/button/button.blade.php ENDPATH**/ ?>