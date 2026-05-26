
<div>
    <?php if (isset($component)) { $__componentOriginal5c806641b94f036edd70b23c3aa0efb3 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal5c806641b94f036edd70b23c3aa0efb3 = $attributes; } ?>
<?php $component = TallStackUi\Components\Card\Component::resolve([] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Card\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

         <?php $__env->slot('header', null, []); ?> Form Booking Kue Custom <?php $__env->endSlot(); ?>

        <?php if (isset($component)) { $__componentOriginalabdf488413a83ea5e92826264ebb0195 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginalabdf488413a83ea5e92826264ebb0195 = $attributes; } ?>
<?php $component = TallStackUi\Components\Form\Input\Component::resolve(['label' => 'Ukuran Kue'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('input'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Form\Input\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['wire:model' => 'ukuran','placeholder' => 'contoh: 20cm, 2 tier...']); ?>
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

        <?php if (isset($component)) { $__componentOriginalea7428da704b16895ec71b832d4586d5 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginalea7428da704b16895ec71b832d4586d5 = $attributes; } ?>
<?php $component = TallStackUi\Components\Form\Upload\Component::resolve(['label' => 'Upload Desain (opsional)'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('upload'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Form\Upload\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['wire:model' => 'desain_custom','accept' => 'image/*']); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginalea7428da704b16895ec71b832d4586d5)): ?>
<?php $attributes = $__attributesOriginalea7428da704b16895ec71b832d4586d5; ?>
<?php unset($__attributesOriginalea7428da704b16895ec71b832d4586d5); ?>
<?php endif; ?>
<?php if (isset($__componentOriginalea7428da704b16895ec71b832d4586d5)): ?>
<?php $component = $__componentOriginalea7428da704b16895ec71b832d4586d5; ?>
<?php unset($__componentOriginalea7428da704b16895ec71b832d4586d5); ?>
<?php endif; ?>

        <?php if (isset($component)) { $__componentOriginalac0bc0a398117a2b5736e15e659b2b9f = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginalac0bc0a398117a2b5736e15e659b2b9f = $attributes; } ?>
<?php $component = TallStackUi\Components\Form\Date\Component::resolve(['label' => 'Tanggal Ambil'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('date'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Form\Date\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['wire:model' => 'tgl_ambil']); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginalac0bc0a398117a2b5736e15e659b2b9f)): ?>
<?php $attributes = $__attributesOriginalac0bc0a398117a2b5736e15e659b2b9f; ?>
<?php unset($__attributesOriginalac0bc0a398117a2b5736e15e659b2b9f); ?>
<?php endif; ?>
<?php if (isset($__componentOriginalac0bc0a398117a2b5736e15e659b2b9f)): ?>
<?php $component = $__componentOriginalac0bc0a398117a2b5736e15e659b2b9f; ?>
<?php unset($__componentOriginalac0bc0a398117a2b5736e15e659b2b9f); ?>
<?php endif; ?>

         <?php $__env->slot('footer', null, []); ?> 
            <?php if (isset($component)) { $__componentOriginal81da9b0d04b05fd8a605d2829e8f6a5e = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal81da9b0d04b05fd8a605d2829e8f6a5e = $attributes; } ?>
<?php $component = TallStackUi\Components\Button\Normal\Component::resolve([] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('button'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Button\Normal\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['wire:click' => 'submit']); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>
Ajukan Booking <?php echo $__env->renderComponent(); ?>
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
<?php if (isset($__attributesOriginal5c806641b94f036edd70b23c3aa0efb3)): ?>
<?php $attributes = $__attributesOriginal5c806641b94f036edd70b23c3aa0efb3; ?>
<?php unset($__attributesOriginal5c806641b94f036edd70b23c3aa0efb3); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal5c806641b94f036edd70b23c3aa0efb3)): ?>
<?php $component = $__componentOriginal5c806641b94f036edd70b23c3aa0efb3; ?>
<?php unset($__componentOriginal5c806641b94f036edd70b23c3aa0efb3); ?>
<?php endif; ?>
</div>
<?php /**PATH D:\pwebif\dona-cake-web\Modules/Booking\resources/views/livewire/pages/booking-form.blade.php ENDPATH**/ ?>