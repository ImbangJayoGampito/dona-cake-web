<?php
// Modules/Booking/routes/web.php
use Modules\Booking\Livewire\BookingForm;
use Modules\Booking\Livewire\BookingAdmin;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::get('/booking', function () {
        return view('booking::livewire.booking-form.booking-form');
    })->name('booking.form');

    Route::get('/admin/booking', function () {
        return view('booking::livewire.booking-admin.booking-admin');
    })->middleware('role:admin')->name('booking.admin');
});
