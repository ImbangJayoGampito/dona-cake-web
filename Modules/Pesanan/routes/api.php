<?php

use Illuminate\Support\Facades\Route;
use Modules\Pesanan\Http\Controllers\PesananController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('pesanans', PesananController::class)->names('pesanan');
});
