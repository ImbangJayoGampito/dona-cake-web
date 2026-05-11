<?php
// Modules/Booking/routes/web.php
use Modules\Booking\Livewire\BookingForm;
use Modules\Booking\Livewire\BookingAdmin;

Route::middleware(['auth'])->group(function () {
    Route::get('/booking', BookingForm::class)->name('booking.form');
    Route::get('/admin/booking', BookingAdmin::class)
         ->middleware('role:admin')
         ->name('booking.admin');
});

// Modules/Ulasan/routes/web.php
use Modules\Ulasan\Livewire\UlasanForm;
use Modules\Ulasan\Livewire\UlasanAdmin;

Route::middleware(['auth'])->group(function () {
    Route::get('/ulasan', UlasanForm::class)->name('ulasan.form');
    Route::get('/admin/ulasan', UlasanAdmin::class)
         ->middleware('role:admin')
         ->name('ulasan.admin');
});
?>