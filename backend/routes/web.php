<?php

use Illuminate\Support\Facades\Route;

// Web routes - leave API auth routes in routes/api.php so they're prefixed with /api
Route::get('/', function () {
    return response('OK');
});
