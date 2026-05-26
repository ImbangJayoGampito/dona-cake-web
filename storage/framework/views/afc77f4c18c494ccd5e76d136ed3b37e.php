<?php
    $customization = $classes();
?>

<template x-teleport="body">
<div x-show="<?php echo e($attributes->get('x-show', 'show')); ?>"
     x-cloak
     x-on:click.stop
     x-on:mousedown.stop
     x-on:click.outside="<?php echo e($attributes->get('x-show', 'show')); ?> = false"
     x-on:keydown.escape.window="<?php echo e($attributes->get('x-show', 'show')); ?> = false"
     x-intersect:leave="<?php echo e($attributes->get('x-show', 'show')); ?> = false"
<?php echo e($anchor()); ?>="<?php echo e($attributes->get('x-anchor', '$refs.anchor')); ?> || $el"
<?php echo e($attributes->whereStartsWith('x-on')); ?>

<?php if(!$ts_ui__flash): ?>
    <?php if(count($attributes->whereStartsWith('x-transition')->getAttributes()) === 0 || $transition?->isEmpty()): ?>
        x-transition:enter="transition duration-100 ease-out"
        x-transition:enter-start="opacity-0 -translate-y-2"
        x-transition:enter-end="opacity-100 translate-y-0"
        x-transition:leave="transition ease-in duration-75"
        x-transition:leave-start="opacity-100 translate-y-0"
        x-transition:leave-end="opacity-0 -translate-y-2"
    <?php elseif($transition?->isNotEmpty()): ?>
        <?php echo e($transition); ?>

    <?php else: ?>
        <?php echo $attributes->except(['x-show', 'x-anchor', 'class']); ?>

    <?php endif; ?>
<?php endif; ?>
x-init="window.tallstackui_floating($el, $watch, $nextTick, () => { try { return <?php echo e($attributes->get('x-anchor', '$refs.anchor')); ?> } catch (error) { return null } }, '<?php echo e($attributes->get('x-show', 'show')); ?>', () => <?php echo e($attributes->get('x-show', 'show')); ?>, (value) => <?php echo e($attributes->get('x-show', 'show')); ?> = value)"
<?php echo e($attributes->except(['floating', 'x-anchor'])->merge(['class' => $attributes->get('floating', $customization['wrapper']), 'data-floating' => true])); ?>>
<?php echo e($slot); ?>

<?php echo e($footer); ?>

</div>
</template>
<?php /**PATH D:\pwebif\dona-cake-web\vendor\tallstackui\tallstackui\src/resources/views/components/floating/main.blade.php ENDPATH**/ ?>