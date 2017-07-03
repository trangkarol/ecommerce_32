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
    // admin
    Route::group([
        'prefix' => 'admin',
        'middleware' => [
            'jwt.auth', 
            'admin',
        ],
        'namespace' => 'Admin',
    ], function () {
        Route::resource('category', 'CategoryController', [
            'only' => [
                'index', 
                'store', 
                'show', 
                'update', 
                'destroy',
            ],
        ]);
        Route::resource('product', 'CategoryController', [
            'only' => [
                'index', 
                'store', 
                'show', 
                'destroy',
            ],
        ]);
        Route::post('product/{id}', 'ProductController@update');
        Route::post('import-products', 'ProductController@import');
    });
    // home
    Route::group(['namespace' => 'Home'], function() {
        Route::get('category', 'HomeController@getCategories');
        Route::get('products-new', 'HomeController@getNewProducts');
        Route::get('search', 'HomeController@getProductsSearch');
        Route::get('{name}', 'HomeController@getProductsByCategory');
    });
});

Route::get('/', function () {
    return view('index');
});
