<?php

use App\Enums\RoleEnum;

return [
    // Level 1 - Parent dropdown
    [
        'title' => 'Katalog Management',
        'icon' => 'folder',
        'route' => '#',
        'role' => RoleEnum::Admin,
        'order' => 1,
        'children' => [
            // Level 2 - Nested example 1 (has its own children)
            [
                'title' => 'Nested example 1',
                'icon' => 'folder',
                'route' => '#',
                'role' => RoleEnum::Admin,
                'order' => 1,
                'children' => [
                    // Level 3 - Katalog Menu (nested under Nested example 1)
                    [
                        'title' => 'Katalog Menu',
                        'icon' => 'list-bullet',
                        'route' => 'katalogmenu.index',
                        'role' => RoleEnum::Admin,
                        'order' => 1,
                        'children' => []
                    ]
                ]
            ],
            // Level 2 - Create Katalog
            [
                'title' => 'Create Katalog',
                'icon' => 'plus',
                'route' => 'katalogmenu.create',
                'role' => RoleEnum::Admin,
                'order' => 2,
                'children' => []
            ],
            // Level 2 - Categories
            [
                'title' => 'Categories',
                'icon' => 'folder',
                'route' => '#',
                'role' => RoleEnum::Admin,
                'order' => 3,
                'children' => []
            ]
        ]
    ]
];
