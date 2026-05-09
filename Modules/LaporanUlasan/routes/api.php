<?php

use Illuminate\Support\Facades\Route;
use Modules\LaporanUlasan\Http\Controllers\LaporanUlasanController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('laporanulasans', LaporanUlasanController::class)->names('laporanulasan');
});
