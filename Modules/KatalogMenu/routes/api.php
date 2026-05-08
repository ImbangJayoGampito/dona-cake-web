<?php

use Illuminate\Support\Facades\Route;
use Modules\KatalogMenu\Http\Controllers\KatalogMenuController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('katalogmenus', KatalogMenuController::class)->names('katalogmenu');
});
