<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Category extends Authenticatable
{
    use HasFactory, SoftDeletes, HasApiTokens;

    protected $table   = "categories";
    protected $guarded = "id";
    protected $dates   = ['deleted_at'];
}
