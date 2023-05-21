<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class PeopleModel extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $guarded = ['id'];
    protected $table   = 'peoples';
}
