<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\HTTP\Controllers\Api\PostController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('posts', [PostController::class, 'index'])->name("posts.api.index")->middleware('auth:sanctum');

Route::get('posts/{post}', [PostController::class, 'show'])->name("posts.api.show")->middleware('auth:sanctum');

Route::post('posts', [PostController::class, 'store'])->name("posts.api.store")->middleware('auth:sanctum');



Route::post('/tokens/create', function (Request $request) {

    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
        'device_name' => 'required'
    ]);
    $emailAddress = $request->email;
    $password = $request->password;

    if (!Auth::attempt(['email' => $emailAddress, 'password' => $password])) {
        return [
            'status' => 'failed',
            "message" => "Invalid Credentials",
            'user' => null,
            'token' => null
        ];
    }

    $user = User::where('email', $emailAddress)->first();
    $token = $user->createToken($request->device_name);

    return [
        'status' => 'success',
        "message" => "",
        'user' => $user,
        'token' => $token?->plainTextToken
    ];
});