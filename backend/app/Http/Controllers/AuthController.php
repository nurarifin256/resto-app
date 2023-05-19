<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function postUser(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->input();

            $user           = new User();
            $user->name     = $data['username'];
            $user->email    = $data['email'];
            $user->password = bcrypt($data['email']);
            $user->save();

            return response()->json([
                'status' => true,
                'message' => 'User registration is successfull',
                201
            ]);
        }
    }
}
