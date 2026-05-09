<?php

use Illuminate\Support\Facades\Route;
use Modules\AsistenVirtual\Http\Controllers\AsistenVirtualController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('asistenvirtuals', AsistenVirtualController::class)->names('asistenvirtual');
});
