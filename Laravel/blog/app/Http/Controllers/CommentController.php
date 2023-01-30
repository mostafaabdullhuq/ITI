<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Request;






class CommentController extends Controller
{
    // get all comments
    public function index($post)
    {
        // get all comments from database comments table
        $post = Post::find($post);
        return view("comments.index", ['post' => $post]);
    }

    // get single post
    public function show($id)
    {
        // get the post with the same id from the database
        $comment = Comment::find($id);
        // get the parent post of comment
        return view("comments.show", ['comment' => $comment]);
    }

    // get create new post page
    public function create($id)
    {
        $post = Post::find($id);
        // get all users from database
        $users = User::all();
        return view("comments.create", ['users' => $users, 'post' => $post]);
    }

    // store new post created
    public function store($postID, Request $request)
    {
        // get all data from form user submitted
        $commentData = $request->all();

        // validate if all fields are provided from form
        if ($commentData['comment'] && $commentData['commented_by']) {

            // create new comment object, then set it's column values
            $comment = new Comment;
            $comment->comment = $commentData['comment'];
            $comment->user_id = $commentData['commented_by'];
            $comment->commentable_id = $postID;
            $comment->commentable_type = 'App\Models\Post';
            // save the comment to database
            $comment->save();
            // redirect to index page route
            return redirect()->route('comments.index', ['post' => $postID]);
        }

        // if any form input not provided in request, redirect to the same form again
        else {
            $post = Post::find($postID);
            // get all users from database
            $users = User::all();
            return redirect()->route('comments.create', ['users' => $users, 'post' => $post]);
        }
    }


    // get edit specific post page
    public function edit($id)
    {
        // get post with given id
        $comment = Comment::find($id);
        return view("comments.edit", ['comment' => $comment]);
    }


    // update edited comment data
    public function update($id, Request $newComment)
    {
        // get request data
        $newComment = request()->all();
        $comment = Comment::find($id);
        // if all inputs are given
        if ($newComment['comment']) {
            $comment->comment = $newComment['comment'];
            // save the comment to database
            $comment->save();
            return redirect()->route('comments.index', ['post' => $comment->commentable_id]);
        }
        // if some input is empty
        else {
            return redirect()->route('comments.edit', ['comment' => $comment]);
        }
    }


    // delete specifc comment
    public function destroy($id)
    {
        // delete the comment
        $comment = Comment::find($id)->delete();
        // redirect to index page route
        return redirect()->route('comments.index', ['post', $comment->commentable_id]);
    }

    // restore specifc post
    public function restore($id)
    {
        // restore the post
        Comment::withTrashed()->find($id)->restore();
        $comment = Comment::find($id);
        // redirect to index page route
        return redirect()->route('comments.index', ['post', $comment->commentable_id]);
    }
}