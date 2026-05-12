<?php

use Illuminate\Support\Facades\Route;
use Modules\Ulasan\Http\Controllers\UlasanController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('ulasans', UlasanController::class)->names('ulasan');
});
