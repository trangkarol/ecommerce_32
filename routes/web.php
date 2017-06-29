<?php

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

Route::group(['domain' => 'api.ecommerce.com'], function () {
    // auth
    Route::group(['prefix' => 'auth', 'namespace' => 'Auth'], function () {

        Route::post('signup', 'AuthController@signup');
        Route::post('login', 'AuthController@login');
        
        Route::group(['middleware' => 'jwt.auth'], function() {
            Route::get('me', 'AuthController@getAuthenticatedUser');
            Route::get('profile', 'ProfileController@getProfile');
            Route::post('me', 'ProfileController@update');
        });

        // socials
        Route::post('facebook', 'SocialController@facebook');
        Route::post('google', 'SocialController@google');
        Route::post('twitter', 'SocialController@twitter');

    });
});

Route::get('/', function () {
    return view('index');
});
