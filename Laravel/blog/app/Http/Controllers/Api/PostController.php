<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StorePostRequest;
use App\Models\Post;
use App\Http\Resources\Api\PostResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;




class PostController extends Controller
{
    public function index()
    {

        $posts = Post::withTrashed()->paginate(8);
        $posts = $posts->load("user", "comments");
        return PostResource::collection($posts);
    }

    public function show($id)
    {

        $post = Post::find($id);

        return new PostResource($post);
    }

    public function store(StorePostRequest $request)
    {

        $postData = $request->all();
        if ($request->exists('post_image')) {

            // upload image to storage
            $path = Storage::putFile('public', $request->file('post_image'));
        } else {
            $path = null;
        }

        // create new post in database
        $post = Post::create(
            [
                'title' => $postData['title'],
                'description' => $postData['description'],
                'user_id' => Auth::user()->id,
                'post_image' => $path
            ]
        );

        return new PostResource($post);
    }
}