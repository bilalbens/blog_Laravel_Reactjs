<?php

namespace App\Http\Controllers;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;

use Illuminate\Http\Request;

class CategoryController extends Controller
{
    
    //index
    public function index()
    {
        //
          $categories=Category::all();
          return response()->json(
            [
                'status'=>200,
                'categories'=>$categories,
            ]
          );

    }

  

    //store 
    public function store(Request $request){

        $validator = Validator::make($request->all(),[
            "name"=>'required',
        ]);

        if($validator->fails()){
            return response()->json([
                "status"=> 400,
                "errors"=>$validator->messages(),
            ]);
        }

        $category = new Category;
        $category->name = $request->input("name");
        $category->description = $request->input("description");
        
        $category->save();   
        return response()->json([
            "status"=>200,
            'messgae'=>"Category added successfully",
        ]);


    }

}
