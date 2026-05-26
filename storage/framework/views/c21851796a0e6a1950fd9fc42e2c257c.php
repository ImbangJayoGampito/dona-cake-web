<?php
    $customization = $classes();
?>

<?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($property): ?>
    <span
        class="<?php echo e($customization['text']); ?>"
        x-cloak
        x-show="typeof $wire?.$errors?.has === 'function'
            ? $wire.$errors.has('<?php echo e($property); ?>')
            : <?php echo \Illuminate\Support\Js::from($message !== null)->toHtml() ?>"
        x-text="typeof $wire?.$errors?.first === 'function'
            ? ($wire.$errors.first('<?php echo e($property); ?>') ?? '')
            : <?php echo \Illuminate\Support\Js::from($message)->toHtml() ?>"
    ><?php echo e($message); ?></span>
<?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
<?php /**PATH D:\pwebif\dona-cake-web\vendor\tallstackui\tallstackui\src/resources/views/components/form/error.blade.php ENDPATH**/ ?>