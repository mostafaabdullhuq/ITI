<?php

use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\PostController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// -------------Posts Routes--------------

// list all posts
Route::get('/posts', [PostController::class, 'index'])->name('posts.index');

// create new post
Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
Route::post('/posts', [PostController::class, 'store'])->name('posts.store');

// get specific post
Route::get('/posts/{post}', [PostController::class, 'show'])->name('posts.show');

// edit specific post
Route::get('/posts/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
Route::put('/posts/{post}', [PostController::class, 'update'])->name('posts.update');

// delete specific post
Route::delete('/posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');

// restore specific post
Route::patch('/posts/{post}', [PostController::class, 'restore'])->name('posts.restore');



// -------------Comments Routes--------------



Route::post('/posts/{post}/comments', [CommentController::class, 'store'])->name('comments.store');

// get specific comment for specific post
Route::get('/comments/{comment}', [CommentController::class, 'show'])->name('comments.show');

// edit specific comment for specific post
Route::get('/comments/{comment}/edit', [CommentController::class, 'edit'])->name('comments.edit');
Route::put('/comments/{comment}', [CommentController::class, 'update'])->name('comments.update');

// delete specific comment
Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');

// restore specific comment
Route::patch('/comments/{comment}', [CommentController::class, 'restore'])->name('comments.restore');