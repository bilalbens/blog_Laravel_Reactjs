<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CategoryController;




Route::post('register', [AuthController::class, "register"]);
Route::post('login', [AuthController::class, "login"]);




//post
Route::post('addpost', [PostController::class, "store"]);
Route::get('posts', [PostController::class, "index"]);
Route::get('post/{id}', [PostController::class, "onePost"]);
Route::get('posts/{id}/{category}', [PostController::class, "PostsByCetegory"]);
Route::get('postslimit/{skip}/{limit}', [PostController::class, "PostsByLim"]);



//CATEGORY
Route::post('addcategory', [CategoryController::class, "store"]);
Route::get('categories', [CategoryController::class, "index"]);



Route::middleware(["auth:sanctum"])->group(function(){
    Route::post('logout', [AuthController::class, "logout"]);

});



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

