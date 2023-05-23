<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function postUser(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->input();

            $user           = new User();
            $user->name     = $data['username'];
            $user->email    = $data['email'];
            $user->password = bcrypt($data['password']);
            $user->save();

            return response()->json([
                'status'  => true,
                'message' => 'User registration is successfull',
                201
            ]);
        }
    }

    public function loginUser(Request $request)
    {
        $request->validate([
            'email'    => 'required|string',
            'password' => 'required|string'
        ]);
        $user = User::firstWhere("email", $request->email);

        if (!$user || Hash::check($request->password, $user->password)) {
            return response()->json([
                "message" => "Bad credintial"
            ], Response::HTTP_NOT_FOUND);
        }

        $token = $user->createToken("sanctum_token")->plainTextToken;

        $data = [
            'user' => $user,
            'token' => $token
        ];

        return response()->json([
            'message' => 'Succesfully logged in',
            'data'   => $data
        ], Response::HTTP_OK);
    }

    public function logoutUser()
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            'message' => 'Succesfully logout'
        ], Response::HTTP_OK);
    }
}
