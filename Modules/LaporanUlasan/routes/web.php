<?php

use Illuminate\Support\Facades\Route;
use Modules\LaporanUlasan\Http\Controllers\LaporanUlasanController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('laporanulasans', LaporanUlasanController::class)->names('laporanulasan');
});
