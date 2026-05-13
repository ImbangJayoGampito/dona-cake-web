<?php
// Modules/Booking/routes/web.php
use Modules\Booking\Livewire\Pages\BookingForm;
use Modules\Booking\Livewire\Pages\BookingAdmin;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::get('/booking', BookingForm::class)->name('booking.form');
    Route::get('/admin/booking', BookingAdmin::class)
        ->middleware('role:admin')
        ->name('booking.admin');
});
