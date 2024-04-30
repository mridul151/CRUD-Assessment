<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;


Route::get("users",[UsersController::class,"index"])->name("users.index");

Route::post("users",[UsersController::class,"store"])->name("users.store");

Route::put("users/{id}",[UsersController::class,"update"])->name("users.update");

Route::delete("users/{id}",[UsersController::class,"delete"])->name("users.delete");
