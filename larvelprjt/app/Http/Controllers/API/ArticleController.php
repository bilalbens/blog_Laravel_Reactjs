<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Article;

class ArticleController extends Controller
{
    public function store(Request $request){
        $article = new  Article;
        $article->title = $request->input('title');
        $article->description = $request->input('description');
        $article->content = $request->input('content');
        $article->image = $request->input('image');
        $article->save();

        return  response()->json([
            'status'=>200,
            'message'=> "Article Addedd Successfully",
        ]);

    }
}
