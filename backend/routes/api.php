<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DeviceController;

Route::get('/devices', [DeviceController::class, 'index']);


Route::post('/devices', [DeviceController::class, 'store']);