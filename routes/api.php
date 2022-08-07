<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


//Public Routes
Route::get('/tasks', [TaskController::class, 'index']);
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);


//Routes with authentification
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::delete('/task/delete/{id}', [TaskController::class, 'destroy']);
    Route::post('/logout', [UserController::class, 'logout']);
});
