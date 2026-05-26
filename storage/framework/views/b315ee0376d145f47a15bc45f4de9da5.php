<?php
    $customization = $classes();
?>

<?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(!$livewire && $property): ?>
    <input hidden name="<?php echo e($property); ?>">
<?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>

<div x-data="tallstackui_select(
        <?php echo $entangle; ?>,
        <?php echo \Illuminate\Support\Js::from($request)->toHtml() ?>,
        <?php echo \Illuminate\Support\Js::from($selectable)->toHtml() ?>,
        <?php echo \Illuminate\Support\Js::from($multiple)->toHtml() ?>,
        <?php echo \Illuminate\Support\Js::from($placeholder)->toHtml() ?>,
        <?php echo \Illuminate\Support\Js::from($searchable)->toHtml() ?>,
        <?php echo \Illuminate\Support\Js::from($common)->toHtml() ?>,
        <?php echo \Illuminate\Support\Js::from($required)->toHtml() ?>,
        <?php echo \Illuminate\Support\Js::from($livewire)->toHtml() ?>,
        <?php echo \Illuminate\Support\Js::from($property)->toHtml() ?>,
        <?php echo \Illuminate\Support\Js::from($value)->toHtml() ?>,
        <?php echo \Illuminate\Support\Js::from($limit)->toHtml() ?>,
        <?php echo \Illuminate\Support\Js::from($change)->toHtml() ?>,
        <?php echo \Illuminate\Support\Js::from($configurations['unfiltered'])->toHtml() ?>,
        <?php echo \Illuminate\Support\Js::from($lazy)->toHtml() ?>,
        <?php echo \Illuminate\Support\Js::from($configurations['recycle'])->toHtml() ?>)"
     <?php if($attributes->whereStartsWith('x-model')): ?>
         x-modelable="model"
     <?php echo e($attributes->whereStartsWith('x-model')); ?>

     <?php endif; ?>
     x-cloak
     translate="no"
     x-on:keydown="navigate($event)"
     <?php if($open): ?> x-on:select:<?php echo e($open); ?>.window="$nextTick(() => show = true)" <?php endif; ?>
     <?php if($close): ?> x-on:select:<?php echo e($close); ?>.window="show = false" <?php endif; ?>
     wire:ignore.self>
    <div hidden x-ref="options"><?php echo e(TallStackUi::blade()->json($options)); ?></div>
    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($request['params'] ?? null): ?>
        <div hidden x-ref="params"><?php echo e(TallStackUi::blade()->json($request['params'])); ?></div>
    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($label && !$side): ?>
        <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('label')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['scope' => 'form.select-styled.label','label' => $label,'error' => $error]); ?>
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
    <div class="relative" x-on:click.outside="show = false">
        <button type="button"
                x-ref="button"
                <?php if($disabled): echo 'disabled'; endif; ?>
                class="<?php echo \Illuminate\Support\Arr::toCssClasses([
                    $customization['input.wrapper.base'],
                    $customization['input.wrapper.color'] => !$error,
                    $customization['input.wrapper.error'] => $error,
                    $customization['input.wrapper.round.left'] => $side === 'left',
                    $customization['input.wrapper.round.right'] => $side === 'right',
                    $customization['input.wrapper.borderless'] => $side,
                ]); ?>"
                <?php if(!$disabled): ?> x-on:click="show = !show" <?php endif; ?>
                <?php echo e($attributes->only(['x-on:select', 'x-on:remove'])); ?>

                aria-haspopup="listbox"
                :aria-expanded="show"
                dusk="tallstackui_select_open_close">
            <div class="<?php echo e($customization['input.content.wrapper.first']); ?>">
                <div class="<?php echo e($customization['input.content.wrapper.second']); ?>">
                    <div x-show="multiple && quantity > 0">
                        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($side): ?>
                            <span class="<?php echo e($customization['items.single']); ?>" x-text="<?php echo \Illuminate\Support\Js::from(data_get($placeholders, 'selected'))->toHtml() ?>.replace(':count', quantity)"></span>
                        <?php else: ?>
                            <span x-text="quantity"></span>
                        <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                    </div>
                    <div x-show="empty || !multiple">
                        <div class="<?php echo e($customization['items.placeholder.wrapper']); ?>">
                            <img x-bind:src="image" class="<?php echo e($customization['items.image']); ?>" x-show="image" />
                            <span class="<?php echo \Illuminate\Support\Arr::toCssClasses([$customization['items.placeholder.error'] => $error && ! $side]); ?>"
                                  x-bind:class="{
                                    '<?php echo e($customization['items.placeholder.text']); ?>': empty,
                                    '<?php echo e($customization['items.single']); ?>': !empty
                                }" x-text="placeholder"></span>
                        </div>
                    </div>
                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(!$side): ?>
                        <div wire:ignore class="<?php echo e($customization['items.wrapper']); ?>" x-show="multiple && quantity > 0">
                            <template x-for="(select, index) in selects" :key="index">
                                <a class="cursor-pointer">
                                    <div class="<?php echo e($customization['items.multiple.item']); ?>">
                                        <div class="<?php echo e($customization['items.multiple.label.wrapper']); ?>">
                                            <template x-if="select.image">
                                                <img x-bind:src="select.image"
                                                     class="<?php echo e($customization['items.multiple.image']); ?>" />
                                            </template>
                                            <span class="<?php echo e($customization['items.multiple.label']); ?>"
                                                  x-text="select[selectable.label] ?? select"></span>
                                        </div>
                                        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(!$disabled): ?>
                                            <div class="<?php echo e($customization['items.multiple.icon']); ?>">
                                                <button type="button" class="cursor-pointer"
                                                        x-on:click="$event.stopPropagation(); clear(select)">
                                                    <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('x-mark'),'internal' => true,'class' => ''.e($customization['items.multiple.icon']).'']); ?>
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
                                    </div>
                                </a>
                            </template>
                        </div>
                    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                </div>
            </div>
            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(!$disabled): ?>
                <div class="<?php echo e($customization['buttons.wrapper']); ?>" wire:ignore>
                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(!$required): ?>
                        <template x-if="!empty">
                            <button dusk="tallstackui_select_clear"
                                    id="select-clear"
                                    type="button"
                                    class="cursor-pointer"
                                    x-on:click="$event.stopPropagation(); clear();">
                                <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('x-mark'),'internal' => true,'class' => \Illuminate\Support\Arr::toCssClasses([$customization['buttons.size'], $customization['buttons.base'] => !$error, $customization['buttons.error'] => $error])]); ?>
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
                        </template>
                    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                    <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('chevron-up-down'),'internal' => true,'class' => \Illuminate\Support\Arr::toCssClasses([$customization['buttons.size'], $customization['buttons.base'] => !$error, $customization['buttons.error'] => $error])]); ?>
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
        </button>
        <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('floating')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['scope' => 'form.select-styled.floating','floating' => $customization['floating.default'],'class' => \Illuminate\Support\Arr::toCssClasses([$customization['floating.class'], $customization['floating.side'] => $side]),'position' => $side === 'left' ? 'bottom-start' : 'bottom-end','x-anchor' => '$refs.button','x-on:keydown' => 'navigate($event)']); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

            <template x-if="searchable">
                <div class="<?php echo e($customization['box.searchable.wrapper']); ?>">
                    <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('input')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['scope' => 'form.select-styled.input','placeholder' => data_get($placeholders, 'search'),'x-model.debounce.500ms' => 'search','x-ref' => 'search','dusk' => 'tallstackui_select_search_input','invalidate' => true]); ?>
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
                    <button type="button"
                            class="<?php echo e($customization['box.button.class']); ?>"
                            x-on:click="search = ''; $refs.search.focus();"
                            x-show="search?.length > 0">
                        <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('x-mark'),'internal' => true,'class' => ''.e($customization['box.button.icon']).'']); ?>
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
            </template>
            <ul class="<?php echo e($customization['box.list.wrapper']); ?>" dusk="tallstackui_select_options" role="listbox"
                x-ref="list">
                <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($request): ?>
                    <div x-show="loading" class="<?php echo e($customization['box.list.loading.wrapper']); ?>">
                        <?php if (isset($component)) { $__componentOriginal13d4e3718d78eeb1609c41c06fe26693 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal13d4e3718d78eeb1609c41c06fe26693 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'ts-ui::components.icon.generic.loading','data' => ['class' => ''.e($customization['box.list.loading.class']).'']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('ts-ui::icon.generic.loading'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['class' => ''.e($customization['box.list.loading.class']).'']); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal13d4e3718d78eeb1609c41c06fe26693)): ?>
<?php $attributes = $__attributesOriginal13d4e3718d78eeb1609c41c06fe26693; ?>
<?php unset($__attributesOriginal13d4e3718d78eeb1609c41c06fe26693); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal13d4e3718d78eeb1609c41c06fe26693)): ?>
<?php $component = $__componentOriginal13d4e3718d78eeb1609c41c06fe26693; ?>
<?php unset($__componentOriginal13d4e3718d78eeb1609c41c06fe26693); ?>
<?php endif; ?>
                    </div>
                <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($grouped): ?>
                    <template x-for="(option, index) in available" :key="option.__tsui_key ?? index">
                        <li>
                            <div class="<?php echo e($customization['box.list.grouped.wrapper']); ?>">
                                <div class="<?php echo e($customization['box.list.grouped.options']); ?>">
                                    <div class="<?php echo e($customization['box.list.grouped.base']); ?>">
                                        <img class="<?php echo e($customization['box.list.grouped.image']); ?>"
                                             x-bind:src="option.image" x-show="option.image">
                                        <div class="<?php echo e($customization['box.list.grouped.description.wrapper']); ?>">
                                            <span x-text="option[selectable.label] ?? option"></span>
                                            <span class="<?php echo e($customization['box.list.grouped.description.text']); ?>"
                                                  x-show="option.description" x-text="option.description"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <template x-for="(item, index) in option.value" :key="index">
                                <li x-on:click="select(item)"
                                    x-on:keypress.enter="select(item)"
                                    x-bind:class="{'<?php echo e($customization['box.list.item.selected']); ?>': selected(item), '<?php echo e($customization['box.list.item.disabled']); ?>': item.disabled === true}"
                                    role="option"
                                    class="<?php echo e($customization['box.list.item.wrapper']); ?>">
                                    <div class="<?php echo e($customization['box.list.item.grouped']); ?>">
                                        <div class="<?php echo e($customization['box.list.item.base']); ?>">
                                            <img class="<?php echo e($customization['box.list.item.image']); ?>"
                                                 x-bind:src="item[selectable.image]"
                                                 x-show="item[selectable.description]">
                                            <div class="<?php echo e($customization['box.list.item.description.wrapper']); ?>">
                                                <span x-text="item[selectable.label] ?? item"></span>
                                                <span class="<?php echo e($customization['box.list.item.description.text']); ?>"
                                                      x-show="item[selectable.description]"
                                                      x-text="item[selectable.description]"></span>
                                            </div>
                                        </div>
                                        <div class="<?php echo e($customization['box.list.item.check']); ?>">
                                            <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('check'),'x-show' => 'selected(item)','internal' => true,'class' => ''.e($customization['box.list.item.check']).'']); ?>
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
                                </li>
                            </template>
                        </li>
                    </template>
                <?php else: ?>
                    <template x-for="(option, index) in available" :key="option.__tsui_key ?? index">
                        <li x-bind:title="option[selectable.label] ?? option" x-on:click.stop="select(option)"
                            x-on:keypress.enter="select(option)"
                            x-bind:class="{'<?php echo e($customization['box.list.item.selected']); ?>': !common ? selected(option) : selects.includes(option), '<?php echo e($customization['box.list.item.disabled']); ?>': option.disabled === true}"
                            role="option"
                            class="<?php echo e($customization['box.list.item.wrapper']); ?>">
                            <div class="<?php echo e($customization['box.list.item.options']); ?>">
                                <div class="<?php echo e($customization['box.list.item.base']); ?>">
                                    <img class="<?php echo e($customization['box.list.item.image']); ?>"
                                         x-bind:src="option[selectable.image]" x-show="option[selectable.image]">
                                    <div class="<?php echo e($customization['box.list.item.description.wrapper']); ?>">
                                        <span x-text="option[selectable.label] ?? option"></span>
                                        <span class="<?php echo e($customization['box.list.item.description.text']); ?>"
                                              x-show="option[selectable.description]"
                                              x-text="option[selectable.description]"></span>
                                    </div>
                                </div>
                                <div class="<?php echo e($customization['box.list.item.check']); ?>">
                                    <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('check'),'x-show' => '!common ? selected(option) : selects.includes(option)','internal' => true,'class' => ''.e($customization['box.list.item.check']).'']); ?>
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
                        </li>
                    </template>
                <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                <li x-show="<?php echo \Illuminate\Support\Js::from($common)->toHtml() ?> === true && available.length >= 10" x-intersect:once="load()"></li>
                <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(!$after): ?>
                    <template x-if="!loading && available.length === 0">
                        <li class="<?php echo e($customization['box.list.empty-wrapper']); ?>">
                            <span class="<?php echo e($customization['box.list.empty']); ?>">
                                <?php echo e(data_get($placeholders, 'empty')); ?>

                            </span>
                        </li>
                    </template>
                <?php else: ?>
                    <div x-show="!loading && available.length === 0">
                        <?php echo $after; ?>

                    </div>
                <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
            </ul>
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
    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($hint && !$error && !$side): ?>
        <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('hint')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['scope' => 'form.select-styled.hint','hint' => $hint]); ?>
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
    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($validate && !$side): ?>
        <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('error')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['scope' => 'form.select-styled.error','property' => $property]); ?>
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
<?php /**PATH D:\pwebif\dona-cake-web\vendor\tallstackui\tallstackui\src/resources/views/components/form/select/styled.blade.php ENDPATH**/ ?>