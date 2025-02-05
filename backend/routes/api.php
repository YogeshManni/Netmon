<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DeviceController;

Route::get('/devices', [DeviceController::class, 'getDevices']);


Route::post('/devices', [DeviceController::class, 'store']);