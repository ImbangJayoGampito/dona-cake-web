<?php if (isset($component)) { $__componentOriginal69dc84650370d1d4dc1b42d016d7226b = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal69dc84650370d1d4dc1b42d016d7226b = $attributes; } ?>
<?php $component = App\View\Components\GuestLayout::resolve([] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('guest-layout'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\App\View\Components\GuestLayout::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

    <div class="my-6 flex items-center justify-center">
        <img src="<?php echo e(asset('/assets/images/tsui.png')); ?>" />
    </div>

    <form method="POST" action="<?php echo e(route('login')); ?>">
        <?php echo csrf_field(); ?>

        <div class="space-y-4">
            <?php if (isset($component)) { $__componentOriginalabdf488413a83ea5e92826264ebb0195 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginalabdf488413a83ea5e92826264ebb0195 = $attributes; } ?>
<?php $component = TallStackUi\Components\Form\Input\Component::resolve(['label' => 'Username atau Email *'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('input'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Form\Input\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['type' => 'text','name' => 'login_data','value' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute(old('login_data', 'test@example.com')),'required' => true,'autofocus' => true,'autocomplete' => 'username']); ?>
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

            <?php if (isset($component)) { $__componentOriginal61d70003a9562516724ff2c7bad53bb4 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal61d70003a9562516724ff2c7bad53bb4 = $attributes; } ?>
<?php $component = TallStackUi\Components\Form\Password\Component::resolve(['label' => 'Password *'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('password'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Form\Password\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['type' => 'password','name' => 'password','required' => true,'autocomplete' => 'current-password']); ?>
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

        <div class="block mt-4">
            <?php if (isset($component)) { $__componentOriginal6a16dc62c871e0895e93d1343829a81b = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal6a16dc62c871e0895e93d1343829a81b = $attributes; } ?>
<?php $component = TallStackUi\Components\Form\Checkbox\Component::resolve(['label' => 'Remember me'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('checkbox'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Form\Checkbox\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['id' => 'remember_me','type' => 'checkbox','name' => 'remember']); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal6a16dc62c871e0895e93d1343829a81b)): ?>
<?php $attributes = $__attributesOriginal6a16dc62c871e0895e93d1343829a81b; ?>
<?php unset($__attributesOriginal6a16dc62c871e0895e93d1343829a81b); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal6a16dc62c871e0895e93d1343829a81b)): ?>
<?php $component = $__componentOriginal6a16dc62c871e0895e93d1343829a81b; ?>
<?php unset($__componentOriginal6a16dc62c871e0895e93d1343829a81b); ?>
<?php endif; ?>
        </div>

        <div class="flex items-center justify-end mt-4">
            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(Route::has('register')): ?>
                <a class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md"
                    href="<?php echo e(route('register')); ?>">
                    <?php echo e(__('Sign up')); ?>

                </a>
            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>

            <?php if (isset($component)) { $__componentOriginal81da9b0d04b05fd8a605d2829e8f6a5e = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal81da9b0d04b05fd8a605d2829e8f6a5e = $attributes; } ?>
<?php $component = TallStackUi\Components\Button\Normal\Component::resolve([] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('button'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Button\Normal\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['type' => 'submit','class' => 'ms-3']); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

                <?php echo e(__('Log in')); ?>

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
        </div>
    </form>
 <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal69dc84650370d1d4dc1b42d016d7226b)): ?>
<?php $attributes = $__attributesOriginal69dc84650370d1d4dc1b42d016d7226b; ?>
<?php unset($__attributesOriginal69dc84650370d1d4dc1b42d016d7226b); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal69dc84650370d1d4dc1b42d016d7226b)): ?>
<?php $component = $__componentOriginal69dc84650370d1d4dc1b42d016d7226b; ?>
<?php unset($__componentOriginal69dc84650370d1d4dc1b42d016d7226b); ?>
<?php endif; ?>
<?php /**PATH D:\pwebif\dona-cake-web\resources\views/auth/login.blade.php ENDPATH**/ ?>