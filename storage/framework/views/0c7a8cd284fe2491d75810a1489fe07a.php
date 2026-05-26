<?php
    $customization = $classes();
?>

<div x-cloak
     x-data="tallstackui_dialog(<?php echo \Illuminate\Support\Js::from(session()->pull('ts-ui:dialog'))->toHtml() ?>, <?php echo \Illuminate\Support\Js::from(trans('ts-ui::messages.dialog.button'))->toHtml() ?>, <?php echo \Illuminate\Support\Js::from($configurations['overflow'] ?? false)->toHtml() ?>)"
     x-on:ts-ui:dialog.window="add($event.detail)"
     class="<?php echo \Illuminate\Support\Arr::toCssClasses(['relative', $configurations['z-index']]); ?>"
     aria-labelledby="modal-title"
     role="dialog"
     aria-modal="true"
     x-show="show">
    <div x-show="show"
         <?php if(!$ts_ui__flash): ?>
             x-transition:enter="ease-out duration-300"
         x-transition:enter-start="opacity-0"
         x-transition:enter-end="opacity-100"
         x-transition:leave="ease-in duration-200"
         x-transition:leave-start="opacity-100"
         x-transition:leave-end="opacity-0"
         <?php endif; ?>
         class="<?php echo e($customization['background']); ?>"></div>
    <div class="<?php echo \Illuminate\Support\Arr::toCssClasses([$customization['wrapper.first'], $customization['wrapper.first-blur'] => $configurations['blur']]); ?>">
        <div class="<?php echo e($customization['wrapper.second']); ?>">
            <div x-show="show"
                 <?php if(!$ts_ui__flash): ?>
                     x-transition:enter="ease-out duration-300"
                 x-transition:enter-start="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                 x-transition:enter-end="opacity-100 translate-y-0 sm:scale-100"
                 x-transition:leave="ease-in duration-200"
                 x-transition:leave-start="opacity-100 translate-y-0 sm:scale-100"
                 x-transition:leave-end="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                 <?php endif; ?>
                 class="<?php echo e($customization['wrapper.third']); ?>"
                 <?php if($ts_ui__colorful): ?>
                     x-bind:class="({
                         'success': <?php echo \Illuminate\Support\Js::from($colors['background']['success'])->toHtml() ?>,
                         'error': <?php echo \Illuminate\Support\Js::from($colors['background']['error'])->toHtml() ?>,
                         'info': <?php echo \Illuminate\Support\Js::from($colors['background']['info'])->toHtml() ?>,
                         'warning': <?php echo \Illuminate\Support\Js::from($colors['background']['warning'])->toHtml() ?>,
                         'question': <?php echo \Illuminate\Support\Js::from($colors['background']['question'])->toHtml() ?>,
                     })[dialog.type]"
                 <?php endif; ?>
                 <?php if(!$configurations['persistent']): ?> x-on:click.outside="top_ui && remove(true)" <?php endif; ?>>
                <div class="<?php echo e($customization['buttons.close.wrapper']); ?>">
                    <button x-on:click="remove()">
                        <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('x-mark'),'dusk' => 'tallstackui_dialog_close','internal' => true,'class' => ''.e($ts_ui__colorful ? $customization['colorful.close'] : $customization['buttons.close.icon']).'']); ?>
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
                <div>
                    <div class="<?php echo e($customization['icon.wrapper']); ?>"
                         x-bind:class="{
                            <?php if($ts_ui__colorful): ?>
                                '<?php echo e($customization['colorful.icon-wrapper']); ?>': true,
                            <?php else: ?>
                                '<?php echo e($colors['icon']['background']['success']); ?>': dialog.type === 'success',
                                '<?php echo e($colors['icon']['background']['error']); ?>': dialog.type === 'error',
                                '<?php echo e($colors['icon']['background']['info']); ?>': dialog.type === 'info',
                                '<?php echo e($colors['icon']['background']['warning']); ?>': dialog.type === 'warning',
                                '<?php echo e($colors['icon']['background']['question']); ?>': dialog.type === 'question',
                            <?php endif; ?>
                        }">
                        <div x-show="dialog.type === 'success'">
                            <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('check-circle'),'outline' => true,'internal' => true,'class' => \Illuminate\Support\Arr::toCssClasses([$customization['icon.size'], $ts_ui__colorful ? $customization['colorful.icon'] : $colors['icon']['icon']['success']])]); ?>
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
                        <div x-show="dialog.type === 'error'">
                            <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('x-circle'),'outline' => true,'internal' => true,'class' => \Illuminate\Support\Arr::toCssClasses([$customization['icon.size'], $ts_ui__colorful ? $customization['colorful.icon'] : $colors['icon']['icon']['error']])]); ?>
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
                        <div x-show="dialog.type === 'info'">
                            <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('information-circle'),'outline' => true,'internal' => true,'class' => \Illuminate\Support\Arr::toCssClasses([$customization['icon.size'], $ts_ui__colorful ? $customization['colorful.icon'] : $colors['icon']['icon']['info']])]); ?>
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
                        <div x-show="dialog.type === 'warning'">
                            <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('exclamation-circle'),'outline' => true,'internal' => true,'class' => \Illuminate\Support\Arr::toCssClasses([$customization['icon.size'], $ts_ui__colorful ? $customization['colorful.icon'] : $colors['icon']['icon']['warning']])]); ?>
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
                        <div x-show="dialog.type === 'question'">
                            <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('question-mark-circle'),'outline' => true,'internal' => true,'class' => \Illuminate\Support\Arr::toCssClasses([$customization['icon.size'], $ts_ui__colorful ? $customization['colorful.icon'] : $colors['icon']['icon']['question']])]); ?>
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
                    </div>
                    <div class="<?php echo e($customization['text.wrapper']); ?>">
                        <h3 class="<?php echo \Illuminate\Support\Arr::toCssClasses([$ts_ui__colorful ? $customization['colorful.title'] : $customization['text.title']]); ?>" x-html="dialog.title"></h3>
                        <div class="<?php echo e($customization['text.description.wrapper']); ?>">
                            <p class="<?php echo \Illuminate\Support\Arr::toCssClasses([$ts_ui__colorful ? $customization['colorful.description'] : $customization['text.description.text']]); ?>" x-html="dialog.description"></p>
                        </div>
                    </div>
                </div>
                <div class="<?php echo e($customization['buttons.wrapper']); ?>">
                    <div x-show="dialog.options?.cancel">
                        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($ts_ui__colorful): ?>
                            <button class="<?php echo \Illuminate\Support\Arr::toCssClasses([$customization['buttons.confirm'], $colors['colorful']['cancel'], $customization['colorful.cancel']]); ?>"
                                    x-on:click="reject(dialog, $el)"
                                    x-text="dialog.options?.cancel?.text"
                                    dusk="tallstackui_dialog_rejection"></button>
                        <?php else: ?>
                            <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('button')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['scope' => 'dialog.button','color' => $colors['cancel'],'class' => $customization['buttons.cancel.base'],'x-on:click' => 'reject(dialog, $el)','x-text' => 'dialog.options?.cancel?.text','dusk' => 'tallstackui_dialog_rejection']); ?>
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
                    </div>
                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($ts_ui__colorful): ?>
                        <button class="<?php echo e($customization['buttons.confirm']); ?>" x-bind:class="{
                                '<?php echo e($customization['buttons.confirm-grid.with-cancel']); ?>' : dialog.options?.cancel,
                                '<?php echo e($customization['buttons.confirm-grid.without-cancel']); ?>' : !dialog.options?.cancel,
                                '<?php echo e($customization['colorful.confirm']); ?>': true,
                            }" dusk="tallstackui_dialog_confirmation"
                                x-on:click="accept(dialog, $el)"
                                x-show="dialog.options?.confirm"
                                x-text="dialog.options?.confirm?.text ?? text.ok"></button>
                    <?php else: ?>
                        <button class="<?php echo e($customization['buttons.confirm']); ?>" x-bind:class="{
                                '<?php echo e($customization['buttons.confirm-grid.with-cancel']); ?>' : dialog.options?.cancel,
                                '<?php echo e($customization['buttons.confirm-grid.without-cancel']); ?>' : !dialog.options?.cancel,
                                '<?php echo e($colors['confirm']['success']); ?>': dialog.type === 'success',
                                '<?php echo e($colors['confirm']['error']); ?>': dialog.type === 'error',
                                '<?php echo e($colors['confirm']['info']); ?>': dialog.type === 'info',
                                '<?php echo e($colors['confirm']['warning']); ?>': dialog.type === 'warning',
                                '<?php echo e($colors['confirm']['question']); ?>': dialog.type === 'question'
                            }" dusk="tallstackui_dialog_confirmation"
                                x-on:click="accept(dialog, $el)"
                                x-show="dialog.options?.confirm"
                                x-text="dialog.options?.confirm?.text ?? text.ok"></button>
                    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</div>
<?php /**PATH D:\pwebif\dona-cake-web\vendor\tallstackui\tallstackui\src/resources/views/components/dialog/main.blade.php ENDPATH**/ ?>