<?php
    $customization = $classes();
?>

<label <?php if($id): ?> for="<?php echo e($id); ?>" <?php endif; ?> class="<?php echo \Illuminate\Support\Arr::toCssClasses([$customization['text'], $customization['error'] => $error && !$invalidate]); ?>" <?php echo e($attributes); ?>>
    <?php echo $word; ?>

    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($asterisk): ?>
        <span class="<?php echo e($customization['asterisk']); ?>">*</span>
    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
</label>
<?php /**PATH D:\pwebif\dona-cake-web\vendor\tallstackui\tallstackui\src/resources/views/components/form/label.blade.php ENDPATH**/ ?>