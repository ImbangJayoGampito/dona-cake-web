<?php

use Illuminate\Support\Facades\Route;
use Modules\Ulasan\Http\Controllers\UlasanController;

use Modules\Ulasan\Livewire\UlasanForm;
use Modules\Ulasan\Livewire\UlasanAdmin;

Route::middleware(['auth'])->group(function () {
    Route::get('/ulasan', function () {
		return view('ulasan::pages.ulasan-form');
		// Karena sudah dapat /ulasan MAKA kita dapatkan produk id dari definisi rute "ulasan/{produk_id}"


    })->name('ulasan.form');
	// INI contohnya btw
	Route::get('ulasan/{produk_id}', function($produk_id)
	{
		if (!$produk_id)
		{
			$produk_id = Produk::first()->id;

		}
		return view('ulasan::pages.ulasan-form', compact('produk_id'));
	});

	Route::get('/ulasan/buat/{product_id}', function ($product_id) {
    	return view('ulasan::pages.ulasan-form', ['product_id' => $product_id]);
	})->name('ulasan.buat')->middleware(['auth']);

    Route::get('/admin/ulasan', function () {
        return view('ulasan::pages.ulasan-admin');
    })->name('ulasan.admin');
});
