<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\ApiAuthController;
Route::get("/test", function(){
    return response()->json([
            'status' => 'success',
            'message' => 'meow'
        ]);
})->name("");
// Public routes (no authentication required)
Route::prefix('auth')->group(function () {
    Route::post('/login', [ApiAuthController::class, 'login']);
    Route::post('/register', [ApiAuthController::class, 'register']);
});

// Protected routes (authentication required)
Route::middleware('auth:sanctum')->prefix('auth')->group(function () {
    Route::post('/logout', [ApiAuthController::class, 'logout']);
    Route::post('/logout-all', [ApiAuthController::class, 'logoutAll']);
    Route::get('/me', [ApiAuthController::class, 'me']);
    Route::post('/change-password', [ApiAuthController::class, 'changePassword']);
    Route::put('/profile', [ApiAuthController::class, 'updateProfile']);
});