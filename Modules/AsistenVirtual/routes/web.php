<?php

use Illuminate\Support\Facades\Route;
use Modules\AsistenVirtual\Http\Controllers\AsistenVirtualController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('asistenvirtuals', AsistenVirtualController::class)->names('asistenvirtual');
});
