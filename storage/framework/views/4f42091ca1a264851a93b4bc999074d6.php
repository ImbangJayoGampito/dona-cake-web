<!DOCTYPE html>
<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">

        <title><?php echo e(config('app.name', 'Laravel')); ?></title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <script type="module" src="/tallstackui/script/tallstackui-clipboard-DN6tjWy_.js"></script><script type="module" src="/tallstackui/script/tallstackui-date-D3DTrXOD.js"></script><script type="module" src="/tallstackui/script/tallstackui-select-HgxwK_NP.js"></script><script type="module" src="/tallstackui/script/tallstackui-tooltip-DbRqA7Za.js"></script><link href="/tallstackui/style/tallstackui-tooltip-Lcq2UOUK.css" rel="stylesheet" type="text/css"><script type="module" src="/tallstackui/script/tallstackui-Bg0i6IM7.js"></script><link rel="modulepreload" href="/tallstackui/script/chunk-DJhY7h8f.js"><link rel="modulepreload" href="/tallstackui/script/helpers-CqbgxKUD.js">
        <?php echo \Livewire\Mechanisms\FrontendAssets\FrontendAssets::styles(); ?>

        <?php echo app('Illuminate\Foundation\Vite')(['resources/css/app.css', 'resources/js/app.js']); ?>
    </head>
    <body class="font-sans text-gray-900 antialiased">

        <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <?php echo e($slot); ?>

            </div>
        </div>

        <?php echo \Livewire\Mechanisms\FrontendAssets\FrontendAssets::scripts(); ?>

    </body>
</html>
<?php /**PATH D:\pwebif\dona-cake-web\resources\views/layouts/guest.blade.php ENDPATH**/ ?>