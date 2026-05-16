<?php

use App\Enums\RoleEnum;

return [
    [
        'title' => 'Booking',
        'icon' => 'calendar',
        'route' => '#',
        'role' => RoleEnum::User,
        'order' => 5,
        'children' => [
            [
                'title' => 'Form Booking',
                'icon' => 'pencil-square',
                'route' => 'booking.form',
                'role' => RoleEnum::User,
                'order' => 1,
                'children' => []
            ],
            [
                'title' => 'Manage Booking',
                'icon' => 'shield-check',
                'route' => 'booking.admin',
                'role' => RoleEnum::Admin,
                'order' => 2,
                'children' => []
            ],
        ]
    ]
];
