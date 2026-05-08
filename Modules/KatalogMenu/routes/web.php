<?php

use Illuminate\Support\Facades\Route;
use Modules\KatalogMenu\Http\Controllers\KatalogMenuController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('katalogmenus', KatalogMenuController::class)->names('katalogmenu');
});
