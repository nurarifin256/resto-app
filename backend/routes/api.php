<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('post-user', 'App\Http\Controllers\AuthController@postUser');
Route::post('login-user', 'App\Http\Controllers\AuthController@loginUser');
Route::middleware('auth:sanctum')->post('logout-user', 'App\Http\Controllers\AuthController@logoutUser');

// Route::middleware('auth:sanctum')->resource('category', CategoryController::class);
Route::resource('category', CategoryController::class);

Route::get('images/auth/{images}', function ($image) {
    $path = storage_path('app/public/images/auth/' . $image);

    if (!File::exists($path)) {
        abort(404);
    }

    $file = File::get($path);
    $type = File::mimeType($path);

    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);

    return $response;
});
