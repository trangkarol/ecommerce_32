<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'address',
        'gender',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function social()
    {
        return $this->hasOne(Social::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function rates()
    {
        return $this->hasMany(Rate::class);
    }

    public function comments()
    {
        return $this->hasMany(Commet::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
