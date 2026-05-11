<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Class Namespace
    |--------------------------------------------------------------------------
    |
    */

    'namespace' => 'Livewire',

    /*
    |--------------------------------------------------------------------------
    | View Path
    |--------------------------------------------------------------------------
    |
    */

    'view' => 'resources/views/livewire',

    /*
    |--------------------------------------------------------------------------
    | View namespaces for volt
    |--------------------------------------------------------------------------
    |
    */

    'volt_view_namespaces' => ['livewire', 'pages'],

    /*
    |--------------------------------------------------------------------------
    | Custom modules setup
    |--------------------------------------------------------------------------
    |
    */

    'custom_modules' => [
        'Booking' => [
            'name_lower' => 'booking',
            'path' => base_path('Modules/Booking'),
            'module_namespace' => 'Modules\\Booking',
            'namespace' => 'Livewire',
            'view' => 'resources/views/livewire',
            'views_path' => 'resources/views',
            'volt_view_namespaces' => ['livewire', 'pages'],
        ],
    ],

];
