<?php

namespace App\HTTP\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\User;

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

        return view("posts.show", ['post' => $post]);
    }

    // get create new post page
    public function create()
    {
        // get all users from database
        $users = User::all();

        return view("posts.create", ['users' => $users]);
    }


    // store new post created
    public function store(Request $request)
    {
        // get all data from form user submitted
        $postData = $request->all();

        // validate if all fields are provided from form
        if ($postData['title'] && $postData['description'] && $postData['posted_by']) {

            // create new post object, then set it's column values
            $post = new Post;
            $post->title = $postData['title'];
            $post->description = $postData['description'];
            $post->user_id = $postData['posted_by'];

            // save the post to database
            $post->save();

            // redirect to index page route
            return redirect()->route('posts.index');
        }

        // if any form input not provided in request, redirect to the same form again
        else {
            return redirect()->route('posts.create');
        }
    }


    // get edit specific post page
    public function edit($id)
    {
        // get post with given id
        $post = Post::find($id);
        return view("posts.edit", ['post' => $post]);
    }


    // update edited post data
    public function update($id, Request $newPost)
    {
        // get request data
        $newPost = request()->all();

        // if all inputs are given
        if ($newPost['title'] && $newPost['description'] && $newPost['posted_by']) {
            $post = Post::find($id);
            // redirect to index page route
            $post->title = $newPost['title'];
            $post->description = $newPost['description'];
            $post->save();
            return redirect()->route('posts.index');
        }
        // if some input is empty
        else {
            return redirect()->route('posts.edit', ['post' => $id]);
        }
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
