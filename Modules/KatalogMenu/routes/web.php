<?php

use Illuminate\Support\Facades\Route;
use Modules\KatalogMenu\Http\Controllers\KatalogMenuController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('katalogmenus', KatalogMenuController::class)->names('katalogmenu');
});
Route::get('/debug-modules', function () {
    dd([
        'katalogmenu_sidebar' => config('katalogmenu::sidebar'),
        'katalogmenu_all_config' => config('katalogmenu'),
        'file_exists' => file_exists(module_path('KatalogMenu', 'Config/sidebar.php')),
        'file_contents' => file_exists(module_path('KatalogMenu', 'Config/sidebar.php'))
            ? include(module_path('KatalogMenu', 'Config/sidebar.php'))
            : 'FILE NOT FOUND',
    ]);
});
