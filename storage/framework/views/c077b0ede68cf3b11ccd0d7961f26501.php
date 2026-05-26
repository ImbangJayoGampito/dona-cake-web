<div>
    <?php if (isset($component)) { $__componentOriginal6d3008ac8fb7f6c8416036a9201a1d4d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal6d3008ac8fb7f6c8416036a9201a1d4d = $attributes; } ?>
<?php $component = TallStackUi\Components\Modal\Component::resolve(['title' => __('Update User: #:id', ['id' => $user?->id]),'wire' => true] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('modal'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Modal\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

        <form id="user-update-<?php echo e($user?->id); ?>" wire:submit="save" class="space-y-4">
            <div>
                <?php if (isset($component)) { $__componentOriginalabdf488413a83ea5e92826264ebb0195 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginalabdf488413a83ea5e92826264ebb0195 = $attributes; } ?>
<?php $component = TallStackUi\Components\Form\Input\Component::resolve(['label' => ''.e(__('Name')).' *'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('input'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Form\Input\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['wire:model' => 'user.name','required' => true]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginalabdf488413a83ea5e92826264ebb0195)): ?>
<?php $attributes = $__attributesOriginalabdf488413a83ea5e92826264ebb0195; ?>
<?php unset($__attributesOriginalabdf488413a83ea5e92826264ebb0195); ?>
<?php endif; ?>
<?php if (isset($__componentOriginalabdf488413a83ea5e92826264ebb0195)): ?>
<?php $component = $__componentOriginalabdf488413a83ea5e92826264ebb0195; ?>
<?php unset($__componentOriginalabdf488413a83ea5e92826264ebb0195); ?>
<?php endif; ?>
            </div>

            <div>
                <?php if (isset($component)) { $__componentOriginalabdf488413a83ea5e92826264ebb0195 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginalabdf488413a83ea5e92826264ebb0195 = $attributes; } ?>
<?php $component = TallStackUi\Components\Form\Input\Component::resolve(['label' => ''.e(__('Email')).' *'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('input'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Form\Input\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['wire:model' => 'user.email','required' => true]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginalabdf488413a83ea5e92826264ebb0195)): ?>
<?php $attributes = $__attributesOriginalabdf488413a83ea5e92826264ebb0195; ?>
<?php unset($__attributesOriginalabdf488413a83ea5e92826264ebb0195); ?>
<?php endif; ?>
<?php if (isset($__componentOriginalabdf488413a83ea5e92826264ebb0195)): ?>
<?php $component = $__componentOriginalabdf488413a83ea5e92826264ebb0195; ?>
<?php unset($__componentOriginalabdf488413a83ea5e92826264ebb0195); ?>
<?php endif; ?>
            </div>

            <div>
                <?php if (isset($component)) { $__componentOriginal61d70003a9562516724ff2c7bad53bb4 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal61d70003a9562516724ff2c7bad53bb4 = $attributes; } ?>
<?php $component = TallStackUi\Components\Form\Password\Component::resolve(['label' => __('Password'),'hint' => 'The password will only be updated if you set the value of this field','rules' => true,'generator' => true] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('password'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Form\Password\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['wire:model' => 'password','x-on:generate' => '$wire.set(\'password_confirmation\', $event.detail.password)']); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal61d70003a9562516724ff2c7bad53bb4)): ?>
<?php $attributes = $__attributesOriginal61d70003a9562516724ff2c7bad53bb4; ?>
<?php unset($__attributesOriginal61d70003a9562516724ff2c7bad53bb4); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal61d70003a9562516724ff2c7bad53bb4)): ?>
<?php $component = $__componentOriginal61d70003a9562516724ff2c7bad53bb4; ?>
<?php unset($__componentOriginal61d70003a9562516724ff2c7bad53bb4); ?>
<?php endif; ?>
            </div>

            <div>
                <?php if (isset($component)) { $__componentOriginal61d70003a9562516724ff2c7bad53bb4 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal61d70003a9562516724ff2c7bad53bb4 = $attributes; } ?>
<?php $component = TallStackUi\Components\Form\Password\Component::resolve(['label' => __('Password'),'rules' => true] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('password'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Form\Password\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['wire:model' => 'password_confirmation']); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal61d70003a9562516724ff2c7bad53bb4)): ?>
<?php $attributes = $__attributesOriginal61d70003a9562516724ff2c7bad53bb4; ?>
<?php unset($__attributesOriginal61d70003a9562516724ff2c7bad53bb4); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal61d70003a9562516724ff2c7bad53bb4)): ?>
<?php $component = $__componentOriginal61d70003a9562516724ff2c7bad53bb4; ?>
<?php unset($__componentOriginal61d70003a9562516724ff2c7bad53bb4); ?>
<?php endif; ?>
            </div>
        </form>
         <?php $__env->slot('footer', null, []); ?> 
            <?php if (isset($component)) { $__componentOriginal81da9b0d04b05fd8a605d2829e8f6a5e = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal81da9b0d04b05fd8a605d2829e8f6a5e = $attributes; } ?>
<?php $component = TallStackUi\Components\Button\Normal\Component::resolve(['loading' => 'save'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('button'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Button\Normal\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['type' => 'submit','form' => 'user-update-'.e($user?->id).'']); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

                <?php echo app('translator')->get('Save'); ?>
             <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal81da9b0d04b05fd8a605d2829e8f6a5e)): ?>
<?php $attributes = $__attributesOriginal81da9b0d04b05fd8a605d2829e8f6a5e; ?>
<?php unset($__attributesOriginal81da9b0d04b05fd8a605d2829e8f6a5e); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal81da9b0d04b05fd8a605d2829e8f6a5e)): ?>
<?php $component = $__componentOriginal81da9b0d04b05fd8a605d2829e8f6a5e; ?>
<?php unset($__componentOriginal81da9b0d04b05fd8a605d2829e8f6a5e); ?>
<?php endif; ?>
         <?php $__env->endSlot(); ?>
     <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal6d3008ac8fb7f6c8416036a9201a1d4d)): ?>
<?php $attributes = $__attributesOriginal6d3008ac8fb7f6c8416036a9201a1d4d; ?>
<?php unset($__attributesOriginal6d3008ac8fb7f6c8416036a9201a1d4d); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal6d3008ac8fb7f6c8416036a9201a1d4d)): ?>
<?php $component = $__componentOriginal6d3008ac8fb7f6c8416036a9201a1d4d; ?>
<?php unset($__componentOriginal6d3008ac8fb7f6c8416036a9201a1d4d); ?>
<?php endif; ?>
</div>
<?php /**PATH D:\pwebif\dona-cake-web\resources\views/livewire/users/update.blade.php ENDPATH**/ ?>