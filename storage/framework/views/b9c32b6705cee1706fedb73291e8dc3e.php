<?php
    $customization = $classes();
?>

<?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(!$livewire && $property): ?>
    <input hidden name="<?php echo e($property); ?>">
<?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>

<div x-data="tallstackui_formDate(
     <?php echo $entangle; ?>,
     <?php echo \Illuminate\Support\Js::from($range)->toHtml() ?>,
     <?php echo \Illuminate\Support\Js::from($multiple)->toHtml() ?>,
     <?php echo \Illuminate\Support\Js::from($format)->toHtml() ?>,
     {...<?php echo \Illuminate\Support\Js::from($dates())->toHtml() ?>},
     <?php echo \Illuminate\Support\Js::from($disable->toArray())->toHtml() ?>,
     <?php echo \Illuminate\Support\Js::from($livewire)->toHtml() ?>,
     <?php echo \Illuminate\Support\Js::from($property)->toHtml() ?>,
     <?php echo \Illuminate\Support\Js::from($value)->toHtml() ?>,
     <?php echo \Illuminate\Support\Js::from($monthYearOnly)->toHtml() ?>,
     <?php echo \Illuminate\Support\Js::from(trans('ts-ui::messages.date.calendar'))->toHtml() ?>,
     <?php echo \Illuminate\Support\Js::from($attributes->only(['disabled', 'readonly'])->getAttributes())->toHtml() ?>,
     <?php echo \Illuminate\Support\Js::from($change)->toHtml() ?>,
     <?php echo \Illuminate\Support\Js::from($start)->toHtml() ?>,
     <?php echo \Illuminate\Support\Js::from($only)->toHtml() ?>,
     <?php echo \Illuminate\Support\Js::from($weekdays)->toHtml() ?>,
     <?php echo \Illuminate\Support\Js::from($weekends)->toHtml() ?>)"
     x-cloak x-on:click.outside="show = false">
    <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('input')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['scope' => 'form.date.input','attributes' => $attributes->except(['name', 'value'])->whereDoesntStartWith('wire:model'),'label' => $label,'hint' => $hint,'invalidate' => $invalidate,'alternative' => $attributes->get('name'),'floatable' => true,'x-ref' => 'input','x-on:click' => '(disables[\'disabled\'] ?? false) || (disables[\'readonly\'] ?? false) ? false : show = !show','x-on:keydown' => '$event.preventDefault()','dusk' => 'tallstackui_date_input','class' => 'cursor-pointer '.e($customization['input.caret']).'']); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

         <?php $__env->slot('suffix', null, ['class' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($customization['slot.icon-spacing'])]); ?> 
            <div class="<?php echo e($customization['icon.wrapper']); ?>">
                <button type="button" class="cursor-pointer" x-on:click="clear()" x-show="quantity > 0"
                        <?php echo e($attributes->only(['disabled', 'readonly', 'x-on:clear'])); ?> dusk="tallstackui_date_clear">
                    <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('x-mark'),'internal' => true,'class' => \Illuminate\Support\Arr::toCssClasses([$customization['icon.size'], $customization['icon.clear']])]); ?>
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
                <button type="button" class="cursor-pointer"
                        x-on:click="(disables['disabled'] ?? false) || (disables['readonly'] ?? false) ? false : show = !show"
                        <?php echo e($attributes->only(['disabled', 'readonly'])); ?> dusk="tallstackui_date_open_close">
                    <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('calendar'),'internal' => true,'class' => ''.e($customization['icon.size']).'']); ?>
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
         <?php $__env->endSlot(); ?>
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
    <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('floating')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['scope' => 'form.date.floating','floating' => $customization['floating.default'],'class' => $customization['floating.class'],'x-bind:class' => '{ \''.e($customization['floating.expanded']).'\' : picker.year || picker.month }']); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

        <div class="<?php echo e($customization['box.picker.button']); ?>">
            <span>
                <button type="button" x-text="calendar.months[month]" x-on:click="picker.month = true"
                        class="<?php echo e($customization['label.month']); ?>"></button>
                <button type="button" x-text="year" x-on:click="picker.year = true; range.year.start = (year - 11)"
                        class="<?php echo e($customization['label.year']); ?>"></button>
            </span>
            <template x-if="picker.month">
                <div class="<?php echo e($customization['box.picker.wrapper.first']); ?>" x-cloak>
                    <div class="<?php echo e($customization['box.picker.wrapper.second']); ?>">
                        <div class="<?php echo e($customization['box.picker.wrapper.third']); ?>">
                            <button type="button" class="<?php echo e($customization['box.picker.label']); ?>"
                                    x-on:click="if (monthYearOnly) {return false}; picker.month = false">
                                <span x-text="calendar.months[month]"
                                      class="<?php echo e($customization['label.month']); ?>"></span>
                            </button>
                            <button type="button" class="<?php echo e($customization['slot.icon-spacing-right']); ?> cursor-pointer" x-on:click="now()" x-show="!monthYearOnly">
                                <?php echo e(trans('ts-ui::messages.date.helpers.today')); ?>

                            </button>
                        </div>
                        <template x-for="(months, index) in calendar.months" :key="index">
                            <button class="<?php echo e($customization['box.picker.range']); ?>"
                                    type="button"
                                    x-bind:class="{ '<?php echo e($customization['button.today']); ?>': month === index }"
                                    x-on:click="selectMonth($event, index)"
                                    x-text="months.substring(0, 3)">
                            </button>
                        </template>
                    </div>
                </div>
            </template>
            <template x-if="picker.year">
                <div class="<?php echo e($customization['box.picker.wrapper.first']); ?>" x-cloak>
                    <div class="<?php echo e($customization['box.picker.wrapper.second']); ?>">
                        <div class="<?php echo e($customization['box.picker.wrapper.third']); ?>">
                            <div class="<?php echo e($customization['box.picker.label']); ?>">
                                <span x-text="range.year.first" class="<?php echo e($customization['label.month']); ?>"></span>
                                <span class="<?php echo e($customization['box.picker.separator']); ?>">-</span>
                                <span x-text="range.year.last" class="<?php echo e($customization['label.month']); ?>"></span>
                            </div>
                            <button type="button" class="cursor-pointer" x-on:click="now()" x-show="!monthYearOnly">
                                <?php echo e(trans('ts-ui::messages.date.helpers.today')); ?>

                            </button>
                            <div>
                                <button type="button"
                                        dusk="tallstackui_date_previous_year"
                                        class="<?php echo e($customization['button.navigate']); ?>"
                                        x-on:pointerdown="if (!interval) { previousYear($event); interval = setInterval(() => previousYear($event), 200); }"
                                        x-on:pointerup="if (interval) { clearInterval(interval); interval = null; }"
                                        x-on:pointerleave="if (interval) { clearInterval(interval); interval = null; }"
                                        x-on:pointercancel="if (interval) { clearInterval(interval); interval = null; }">
                                    <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('chevron-left'),'internal' => true,'class' => ''.e($customization['icon.navigate']).'']); ?>
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
                                        dusk="tallstackui_date_next_year"
                                        class="<?php echo e($customization['button.navigate']); ?>"
                                        x-on:pointerdown="if (!interval) { nextYear($event); interval = setInterval(() => nextYear($event), 200); }"
                                        x-on:pointerup="if (interval) { clearInterval(interval); interval = null; }"
                                        x-on:pointerleave="if (interval) { clearInterval(interval); interval = null; }"
                                        x-on:pointercancel="if (interval) { clearInterval(interval); interval = null; }">
                                    <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('chevron-right'),'internal' => true,'class' => ''.e($customization['icon.navigate']).'']); ?>
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
                        <template x-for="(range, index) in yearRange()" :key="index">
                            <button type="button" class="<?php echo e($customization['box.picker.range']); ?>"
                                    x-bind:class="{ '<?php echo e($customization['button.today']); ?>': range.year === year }"
                                    x-bind:disabled="range.disabled"
                                    x-on:click="selectYear($event, range.year)"
                                    x-text="range.year">
                            </button>
                        </template>
                    </div>
                </div>
            </template>
            <div>
                <button type="button"
                        dusk="tallstackui_date_previous_month"
                        class="<?php echo e($customization['button.navigate']); ?>"
                        x-on:pointerdown="if (!interval) { previousMonth(); interval = setInterval(() => previousMonth(), 200); }"
                        x-on:pointerup="if (interval) { clearInterval(interval); interval = null; }"
                        x-on:pointerleave="if (interval) { clearInterval(interval); interval = null; }"
                        x-on:pointercancel="if (interval) { clearInterval(interval); interval = null; }">
                    <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('chevron-left'),'internal' => true,'class' => ''.e($customization['icon.navigate']).'']); ?>
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
                        class="<?php echo e($customization['button.navigate']); ?>"
                        dusk="tallstackui_date_next_month"
                        x-on:pointerdown="if (!interval) { nextMonth(); interval = setInterval(() => nextMonth(), 200); }"
                        x-on:pointerup="if (interval) { clearInterval(interval); interval = null; }"
                        x-on:pointerleave="if (interval) { clearInterval(interval); interval = null; }"
                        x-on:pointercancel="if (interval) { clearInterval(interval); interval = null; }">
                    <?php if (isset($component)) { $__componentOriginal511d4862ff04963c3c16115c05a86a9d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal511d4862ff04963c3c16115c05a86a9d = $attributes; } ?>
<?php $component = Illuminate\View\DynamicComponent::resolve(['component' => TallStackUi::prefix('icon')] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('dynamic-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\DynamicComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['icon' => TallStackUi::icon('chevron-right'),'internal' => true,'class' => ''.e($customization['icon.navigate']).'']); ?>
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
         <?php $__env->slot('footer', null, []); ?> 
            <div class="<?php echo e($customization['wrapper.days-header']); ?>" x-show="!monthYearOnly">
                <template x-for="(day, index) in calendar.week" :key="index">
                    <div class="<?php echo e($customization['label.days-cell']); ?>">
                        <div x-text="day.slice(0, 3)" class="<?php echo e($customization['label.days']); ?>"></div>
                    </div>
                </template>
            </div>
            <div class="<?php echo e($customization['wrapper.days-grid']); ?>" x-show="!monthYearOnly">
                <template x-for="(blank, index) in blanks" :key="index">
                    <div class="<?php echo e($customization['button.blank']); ?>"></div>
                </template>
                <template x-for="(day, index) in days" :key="index">
                    <div class="<?php echo e($customization['button.day-wrapper']); ?>"
                         x-bind:class="{
                            '<?php echo e($customization['range.start']); ?>': day.isStart,
                            '<?php echo e($customization['range.end']); ?>': day.isEnd,
                            '<?php echo e($customization['range.between']); ?>': day.isBetween,
                         }">
                        <button type="button"
                                x-text="day.day"
                                <?php echo e($attributes->only('x-on:select')); ?>

                                x-on:click="select($event, day.day);"
                                x-bind:disabled="day.disabled"
                                x-bind:class="{
                                    '<?php echo e($customization['button.today']); ?>': day.isToday,
                                    '<?php echo e($customization['button.select']); ?>': !day.isToday && !day.isSelected,
                                    '<?php echo e($customization['button.selected']); ?>': day.isSelected
                                }" class="<?php echo e($customization['button.day']); ?>" x-show="!picker.year && !picker.month">
                        </button>
                    </div>
                </template>
            </div>
            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($helpers): ?>
                <div class="<?php echo e($customization['wrapper.helpers']); ?>">
                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::openLoop(); ?><?php endif; ?><?php $__currentLoopData = ['yesterday', 'today', 'tomorrow']; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $helper): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::startLoopIteration(); ?><?php endif; ?>
                        <button type="button"
                                dusk="tallstackui_date_helper_<?php echo e($helper); ?>"
                                x-on:click="helper($event, <?php echo \Illuminate\Support\Js::from($helper)->toHtml() ?>)"
                                class="<?php echo e($customization['button.helpers']); ?>">
                            <?php echo e(trans('ts-ui::messages.date.helpers.' . $helper)); ?>

                        </button>
                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::endLoop(); ?><?php endif; ?><?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::closeLoop(); ?><?php endif; ?>
                </div>
            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
         <?php $__env->endSlot(); ?>
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
<?php /**PATH D:\pwebif\dona-cake-web\vendor\tallstackui\tallstackui\src/resources/views/components/form/date.blade.php ENDPATH**/ ?>