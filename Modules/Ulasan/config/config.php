<?php

use App\Enums\RoleEnum;

return [
    'name' => 'Ulasan',
    'sidebar' => [
        [
            'title' => 'Ulasan',
            'icon' => 'star',
            'route' => 'ulasan.form',
            'role' => RoleEnum::User,
            'order' => 10,
        ],
        [
            'title' => 'Review Management',
            'icon' => 'table-cells',
            'route' => 'ulasan.admin',
            'role' => RoleEnum::Admin,
            'order' => 20,
        ],
    ],
];
