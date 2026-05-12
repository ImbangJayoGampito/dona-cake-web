<?php

use Illuminate\Support\Facades\Route;
use Modules\Ulasan\Http\Controllers\UlasanController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('ulasans', UlasanController::class)->names('ulasan');
});
