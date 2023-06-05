<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /** 
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::select('id', 'name', 'image')->orderBy('name', 'asc')->get();

        return response()->json([
            'categories' => $categories
        ], RESPONSE::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        if ($request->isMethod('post')) {
            $data = $request->input();

            $rules = [
                "name" => "required",
            ];

            $customMessages = [
                "name.required" => "Name is required",
            ];

            $validator = Validator::make($data, $rules, $customMessages);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            $image = $request->file('image')->store('images/category', 'public');

            $category             = new Category();
            $category->name       = $data['name'];
            $category->image      = $image;
            $category->created_by = $data['created_by'];
            $category->save();

            return response()->json([
                'message' => 'Successfull add category'
            ], Response::HTTP_OK);
        }
        return response()->json([
            'message' => 'Failed'
        ], Response::HTTP_BAD_REQUEST);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        if ($request->isMethod('delete')) {
            $category             = Category::find($id);
            $category->deleted_by = $request->input('deleted_by');
            $category->save();
            $category->delete();

            return response()->json([
                'message' => "Successfull delete category"
            ], RESPONSE::HTTP_OK);
        }
    }
}
