<?php
    $customization = $classes();
?>

<div x-cloak
     x-data="tallstackui_toastBase(<?php echo \Illuminate\Support\Js::from(session()->pull('ts-ui:toast'))->toHtml() ?>, <?php echo \Illuminate\Support\Js::from($configurations['position'])->toHtml() ?>, <?php echo \Illuminate\Support\Js::from($ts_ui__flash)->toHtml() ?>)"
     x-on:ts-ui:toast.window="add($event)"
     class="<?php echo \Illuminate\Support\Arr::toCssClasses([
        $customization['wrapper.first'],
        $configurations['z-index']
    ]); ?>" x-bind:class="{ '<?php echo e($customization['wrapper.position.top-x']); ?>' : position.includes('top-') === true, '<?php echo e($customization['wrapper.position.bottom-x']); ?>' : position.includes('bottom-') === true }">
    <template x-for="toast in toasts" :key="toast.id">
        <div x-data="tallstackui_toastLoop(toast)"
             x-show="show"
             x-ref="toast"
             x-on:mouseenter="toast.expandable = false"
             class="<?php echo e($customization['wrapper.second']); ?>"
             x-bind="transition"
             x-bind:class="{ '<?php echo e($customization['wrapper.position.x-left']); ?>' : position === 'top-left' || position === 'bottom-left', '<?php echo e($customization['wrapper.position.x-right']); ?>' : position === 'top-right' || position === 'bottom-right' }">
            <div class="<?php echo e($customization['wrapper.third']); ?>"
                 <?php if($ts_ui__colorful): ?>
                     x-bind:class="({
                         'success': <?php echo \Illuminate\Support\Js::from($colors['background']['success'])->toHtml() ?>,
                         'error': <?php echo \Illuminate\Support\Js::from($colors['background']['error'])->toHtml() ?>,
                         'info': <?php echo \Illuminate\Support\Js::from($colors['background']['info'])->toHtml() ?>,
                         'warning': <?php echo \Illuminate\Support\Js::from($colors['background']['warning'])->toHtml() ?>,
                         'question': <?php echo \Illuminate\Support\Js::from($colors['background']['question'])->toHtml() ?>,
                     })[toast.type]"
                    <?php endif; ?>>
                <div class="<?php echo e($customization['wrapper.fourth']); ?>">
                    <div class="shrink-0">
                        <div x-show="toast.type === 'success'">
                            <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('check-circle'),'outline' => true,'internal' => true,'class' => \Illuminate\Support\Arr::toCssClasses([$customization['icon.size'], $ts_ui__colorful ? $customization['colorful.icon'] : $colors['icon']['success']])]); ?>
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
                        <div x-show="toast.type === 'error'">
                            <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('x-circle'),'outline' => true,'internal' => true,'class' => \Illuminate\Support\Arr::toCssClasses([$customization['icon.size'], $ts_ui__colorful ? $customization['colorful.icon'] : $colors['icon']['error']])]); ?>
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
                        <div x-show="toast.type === 'info'">
                            <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('information-circle'),'outline' => true,'internal' => true,'class' => \Illuminate\Support\Arr::toCssClasses([$customization['icon.size'], $ts_ui__colorful ? $customization['colorful.icon'] : $colors['icon']['info']])]); ?>
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
                        <div x-show="toast.type === 'warning'">
                            <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('exclamation-circle'),'outline' => true,'internal' => true,'class' => \Illuminate\Support\Arr::toCssClasses([$customization['icon.size'], $ts_ui__colorful ? $customization['colorful.icon'] : $colors['icon']['warning']])]); ?>
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
                        <div x-show="toast.type === 'question'">
                            <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('question-mark-circle'),'outline' => true,'internal' => true,'class' => \Illuminate\Support\Arr::toCssClasses([$customization['icon.size'], $ts_ui__colorful ? $customization['colorful.icon'] : $colors['icon']['question']])]); ?>
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
                    <div class="<?php echo e($customization['content.wrapper']); ?>">
                        <p class="<?php echo \Illuminate\Support\Arr::toCssClasses([$ts_ui__colorful ? $customization['colorful.title'] : $customization['content.text']]); ?>"
                           x-bind:class="{ '<?php echo e($customization['content.text']); ?>' : !toast.confirm, '<?php echo e($customization['content.text-confirm']); ?>' : toast.confirm }"
                           x-html="toast.title"></p>
                        <p class="<?php echo \Illuminate\Support\Arr::toCssClasses([$ts_ui__colorful ? $customization['colorful.description'] : $customization['content.description']]); ?>"
                           x-html="toast.description"
                           x-show="!toast.expandable"
                           x-bind:class="{ 'truncate': toast.expandable }"
                           x-collapse.min.20px></p>
                        <template x-if="toast.options && (toast.options.confirm?.text || toast.options.cancel?.text)">
                            <div class="<?php echo e($customization['buttons.wrapper.first']); ?>"
                                 x-bind:class="{ '<?php echo e($customization['buttons.wrapper.first-with-actions']); ?>' : toast.options.confirm && toast.options.cancel }">
                                <button dusk="tallstackui_toast_confirmation"
                                        class="<?php echo \Illuminate\Support\Arr::toCssClasses([$customization['buttons.confirm'], $ts_ui__colorful ? $customization['colorful.confirm'] : $colors['text']['confirm']]); ?>"
                                        x-on:click="accept(toast)"
                                        x-text="toast.options?.confirm?.text"></button>
                                <div x-show="toast.options.cancel">
                                    <button dusk="tallstackui_toast_rejection"
                                            class="<?php echo \Illuminate\Support\Arr::toCssClasses([$customization['buttons.cancel'], $ts_ui__colorful ? $customization['colorful.cancel'] : $colors['text']['cancel']]); ?>"
                                            x-on:click="reject(toast)"
                                            x-text="toast.options?.cancel?.text"></button>
                                </div>
                            </div>
                        </template>
                    </div>
                    <div class="<?php echo e($customization['buttons.wrapper.second']); ?>">
                        <div class="<?php echo e($customization['buttons.close.wrapper']); ?>">
                            <button x-on:click="hide(true, false)" type="button"
                                    class="<?php echo e($ts_ui__colorful ? $customization['colorful.close'] : $customization['buttons.close.class']); ?>">
                                <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('x-mark'),'dusk' => 'tallstackui_toast_close','internal' => true,'class' => ''.e($customization['buttons.close.size']).'']); ?>
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
                        <div x-show="toast.expandable && toast.description"
                             class="<?php echo e($customization['buttons.expand.wrapper']); ?>">
                            <button dusk="tallstackui_toast_expandable"
                                    x-on:click="toast.expandable = !toast.expandable"
                                    type="button"
                                    class="<?php echo e($ts_ui__colorful ? $customization['colorful.expand'] : $customization['buttons.expand.class']); ?>">
                                <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('chevron-down'),'internal' => true,'class' => ''.e($customization['buttons.expand.size']).'']); ?>
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
                </div>
                <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($configurations['progress']): ?>
                    <div x-show="!toast.persistent"
                         class="<?php echo e($ts_ui__colorful ? $customization['colorful.progress.wrapper'] : $customization['progress.wrapper']); ?>">
                        <span x-ref="progress" x-bind:style="`animation-duration:${toast.timeout * 1000}ms`"
                              class="<?php echo \Illuminate\Support\Arr::toCssClasses([$customization['progress.animation'], $ts_ui__colorful ? $customization['colorful.progress.bar'] : $customization['progress.bar']]); ?>" x-cloak></span>
                    </div>
                <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
            </div>
        </div>
    </template>
</div>
<?php /**PATH D:\pwebif\dona-cake-web\vendor\tallstackui\tallstackui\src/resources/views/components/toast/main.blade.php ENDPATH**/ ?>