<?php

use Illuminate\Support\Facades\Route;
use Modules\Pesanan\Http\Controllers\PesananController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('pesanans', PesananController::class)->names('pesanan');
});
