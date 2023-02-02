<?php

namespace App\HTTP\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Jobs\PruneOldPostsJob;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    // get all posts
    public function index()
    {


        // get all posts from database posts table
        $posts = Post::withTrashed()->paginate(8);
        return view("posts.index", ['posts' => $posts]);
    }

    // get single post
    public function show($id)
    {
        // get the post with the same id from the database
        $post = Post::find($id);
        // dd($post->created_at);
        $users = User::all();
        return view("posts.show", ['post' => $post, 'users' => $users]);
    }

    // get create new post page
    public function create()
    {
        // get all users from database
        $users = User::all();

        return view("posts.create", ['users' => $users]);
    }


    // store new post created
    public function store(StorePostRequest $request)
    {
        // get all data from form user submitted
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
                'user_id' => Auth::id(),
                'post_image' => $path
            ]
        );
        // redirect to the post page
        return redirect()->route('posts.show', ['post' => $post->id]);
    }


    // get edit specific post page
    public function edit($id)
    {
        // get post with given id
        $post = Post::find($id);
        return view("posts.edit", ['post' => $post]);
    }


    // update edited post data
    public function update($id, UpdatePostRequest $request)
    {
        // get request data
        $newPost = $request->all();

        // if all inputs are given
        $post = Post::find($id);
        // redirect to index page route

        if ($request->exists('post_image')) {
            // upload image to storage
            $path = Storage::putFile('public', $request->file('post_image'));

            if ($post->post_image) {
                // delete old image
                Storage::delete($post->post_image);
            }
        } else {
            $path = null;
        }
        $post->slug = null;
        $post->title = $newPost['title'];
        $post->description = $newPost['description'];
        $post->post_image = $path;
        $post->save();
        return redirect()->route('posts.show', ['post' => $post->id]);
    }


    // delete specifc post
    public function destroy($id)
    {
        // delete the post
        Post::find($id)->delete();

        // redirect to index page route
        return redirect()->route('posts.index');
    }

    // restore specifc post
    public function restore($id)
    {
        // restore the post
        Post::withTrashed()->find($id)->restore();

        // redirect to index page route
        return redirect()->route('posts.index');
    }
}
