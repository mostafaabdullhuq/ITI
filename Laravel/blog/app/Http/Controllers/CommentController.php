<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommentRequest;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Http\Request;






class CommentController extends Controller
{
    // get single comment
    public function show($id)
    {
        // get the comment with the same id from the database
        $comment = Comment::find($id);

        return view("comments.show", ['comment' => $comment]);
    }


    // store new post created
    public function store($postID, StoreCommentRequest $request)
    {
        // get all data from form user submitted
        $commentData = $request->all();
        // validate if all fields are provided from form

        // get post with given id
        $post = Post::find($postID);

        // add comment to post
        $post->comments()->create(
            [
                'comment' => $commentData['comment'],
                'user_id' => $commentData['commented_by'],
            ]
        );

        // redirect to index page route
        return redirect()->route('posts.show', ['post' => $postID]);
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

            // set the new value
            $comment->comment = $newComment['comment'];

            // save the comment to database
            $comment->save();
            return redirect()->route('posts.show', ['post' => $comment->commentable]);
        }

        // if some input is empty
        else {
            return redirect()->route('comments.edit', ['comment' => $comment]);
        }
    }


    // delete specifc comment
    public function destroy($id)
    {
        // find the comment then delete it
        $comment = Comment::find($id);
        $comment->delete();
        return redirect()->route('posts.show', ['post' => $comment->commentable]);
    }
}