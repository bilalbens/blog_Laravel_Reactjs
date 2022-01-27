<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Validator;
use Image;

class PostController extends Controller
{

    //index all posts
    public function index()
    {
        //

        $posts=Post::all();
        return response()->json(
          [
              'status'=>200,
              'posts'=>$posts,
          ]
        );

    }


    //one post
    public function onePost($id){
        $post = Post::find($id);
        if($post){
            return response()->json(
                [
                    'status'=>200,
                    'post'=>$post,
                ]
            );

        }else{
            return response()->json(
                [
                    'status'=>404,
                    'message'=>"No Post Found",
                ]
            );

        }

    }


    // //posts by category
    // public function limitPost($id){
    //     $post = Post::limit($id)->get();
    //     if($post){
    //         return response()->json(
    //             [
    //                 'status'=>200,
    //                 'post'=>$post,
    //             ]
    //         );

    //     }else{
    //         return response()->json(
    //             [
    //                 'status'=>404,
    //                 'message'=>"No Post Found",
    //             ]
    //         );

    //     }

    // }

    //posts with skip and limit 
    // ->offset(0)->limit(10)->get();

    // public function postsLimit($limit){
    //     $post = Post::find($limit);
    //     return $post;

    // }

    public function PostsByLim($skip,$limit){
        
        $posts = Post::skip($skip)->take($limit)->get();
        if($posts){
            return response()->json(
                [
                    'status'=>200,
                    'posts'=>$posts,
                ]
            );

        }else{
            return response()->json(
                [
                    'status'=>404,
                    'message'=>"No Posts Found",
                ]
            );

        }

    }








    ////////////////////////

    //store post
    public function store(Request $request){

        $validator = Validator::make($request->all(),
            [
                'title'=>'required|max:200',
                'content'=>'required',
                'category'=>'required',
                'postImage'=>'required|image',
            ]
        );

        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ]);

        }
        else{
            $post = new Post;
            $post->title=$request->input('title');
            $post->description=$request->input('description');
            $post->content=$request->input('content');
            $post->category=$request->input('category');
            


            if($request->hasFile('postImage')){

                $file=$request->file('postImage');
                $extension=$file->getClientOriginalExtension();
                $filename = time() . '.'.$extension;
                $file->move('uploads/imgs/',$filename);
                $post->postImage="uploads/imgs/".$filename;
                
            }
                
            $post->save();
    
            return response()->json([
                'status'=>200,
                'message'=>'Post Added Successfully',
            ]);
        }
        
    }
}
