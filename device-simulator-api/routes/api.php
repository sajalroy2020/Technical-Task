<?php

use App\Http\Controllers\Api\DeviceController;
use App\Http\Controllers\Api\PresetController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    // Devices route list
    Route::prefix('devices')->group(function () {
        Route::get('/', [DeviceController::class, 'index']);
    });

    // Presets route list
    Route::prefix('presets')->group(function () {
        Route::get('/', [PresetController::class, 'index']);
        Route::post('/', [PresetController::class, 'store']);
        Route::post('/{preset}', [PresetController::class, 'update']);
    });

});
