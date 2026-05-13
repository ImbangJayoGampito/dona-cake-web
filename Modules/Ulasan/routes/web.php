<?php

use Illuminate\Support\Facades\Route;
use Modules\Ulasan\Http\Controllers\UlasanController;

use Modules\Ulasan\Livewire\UlasanForm;
use Modules\Ulasan\Livewire\UlasanAdmin;

Route::middleware(['auth'])->group(function () {
    Route::get('/ulasan', function () {
        return view('livewire.ulasan-form.ulasan-form');
    })->name('ulasan.form');
    Route::get('/admin/ulasan', function () {
        return view('livewire.ulasan-admin.ulasan-admin');
    })->name('ulasan.admin');
});
