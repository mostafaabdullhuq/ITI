@extends('layouts.app')




@section('title')
    Comments
@endsection

@section('style')
    * {
    font-family: "Roboto", sans-serif;
    }

    @media screen and (max-width: 1400px) {

    .comment,
    .new-comment {
    width: calc((100% - 20px) / 2) !important;
    }
    }

    @media screen and (max-width: 991px) {

    .comment,
    .new-comment {
    width: 100% !important;
    }
    }

    body {
    background-color: #f5f5f5;
    }

    .container {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: flex-start;
    }

    .pagination-container nav {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    }

    .pagination-container nav ul li a,
    .pagination-container nav ul li span{
    font-size: 20px !important;
    }


    .comment,
    .new-comment {
    background-color: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    padding: 30px;
    width: calc((100% - 40px) / 3);
    min-width: 400px;
    display: flex;
    flex-direction: column;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    -o-border-radius: 3px;
    }

    .new-comment {
    justify-content: center;
    align-items: center;
    }

    .new-comment a {
    font-weight: bold;
    font-size: 100px;
    text-decoration: none;
    cursor: pointer;
    color: #494949;
    transition: transform 0.3s;
    -webkit-transition: transform 0.3s;
    -moz-transition: transform 0.3s;
    -ms-transition: transform 0.3s;
    -o-transition: transform 0.3s;
    user-select: none;
    }

    .new-comment a:hover {
    color: rgb(115, 115, 115);
    transform: scale(1.1);
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -o-transform: scale(1.1);
    }

    .comment .title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    }

    .comment .comment-info {
    color: rgb(115, 115, 115);
    }

    .comment .comment-info .author {
    text-decoration: underline;
    cursor: pointer;
    }

    .comment .comment-info .author:hover {
    color: rgb(75, 75, 75)
    }

    .comment .description {
    min-height: 96px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    -webkit-box-orient: vertical;
    }

    .comment .controls {
    display: flex;
    gap: 10px;
    margin-top: 10px;
    }

    .comment .controls input,
    .comment .controls a {
    border: none;
    border-radius: 3px;
    padding: 10px 25px;
    background-color: crimson;
    color: white;
    text-decoration: none;
    transition: background-color 0.3s;
    -webkit-transition: background-color 0.3s;
    -moz-transition: background-color 0.3s;
    -ms-transition: background-color 0.3s;
    -o-transition: background-color 0.3s;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    -o-border-radius: 3px;
    }

    .comment .controls .view-comment {
    background-color: #455bd4;
    }

    .comment .controls .edit-comment,
    .delete-prompt .content button.cancel,
    .comment.deleted .restore-comment {
    background-color: #50b754;
    }

    .comment .controls .delete-comment,
    .delete-prompt .content button.confirm {
    background-color: #ee3b2e;
    }

    .comment .controls .view-comment:hover {
    background-color: #313f91;
    }

    .comment .controls .edit-comment:hover,
    .delete-prompt .content button.cancel:hover,
    .comment.deleted .restore-comment:hover {
    background-color: #419643;
    }

    .comment .controls .delete-post:hover,
    .delete-prompt .content button.confirm:hover {
    background-color: #c4342a;
    }


    .comment.deleted {
    background-color: #f8f8f8;
    }

    .comment.deleted .title,
    .comment.deleted .description,
    .comment.deleted .comment-info {
    opacity: 0.7
    }

    .comment.deleted .restore-comment {
    width: 100%;
    }

    .delete-prompt {
    font-size: 20px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 999;
    }

    .delete-prompt.active {
    display: flex;
    }

    .delete-prompt .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #fff;
    padding: 50px 30px;
    border-radius: 3px;
    border: 1px solid #e5e5e5;
    }

    .delete-prompt .content p {
    font-weight: bold;
    }

    .delete-prompt .content button {
    border: none;
    padding: 10px 30px;
    color: white;
    border-radius: 3px;
    }

    .delete-prompt .content button.cancel {
    margin-left: 10px;
    }
@endsection

{{-- //////////////////todo////////////////////////// --}}
@section('content')
    <div class="new-comment">
        <a href="{{ route('comments.create', $post->id) }}">+</a>
    </div>
    {{-- {{ dd($posts->onEachSide(1)->links()) }} --}}
    @foreach ($post->comments as $comment)
        <div class="comment">
            <p class="comment-info">
                <span class="author">{{ $comment->user->name }}</span> at
                <span class="date">{{ $comment->created_at->format('y-m-d') }}</span>
            </p>
            <p class="description">{{ $comment->comment }}</p>
            <div class="controls">
                <a href="{{ route('comments.show', $comment->id) }}" class="view-comment">View</a>
                <a href="{{ route('comments.edit', $comment->id) }}" class="edit-comment">Edit</a>
                <form class="delete-comment-form" action="{{ route('comments.destroy', $comment->id) }}" method="POST">
                    @csrf
                    {{-- html form has only comment and get, so we want to add delete --}}
                    @if ($comment->trashed())
                        @method('PATCH')
                    @else
                        @method('DELETE')
                    @endif
                    <input type="submit" value="{{ $comment->trashed() ? 'Restore Comment' : 'Delete' }}"
                        class="{{ $comment->trashed() ? 'restore-comment' : 'delete-comment' }}">
                </form>
            </div>
        </div>
    @endforeach
    <div class="delete-prompt">
        <div class="content">
            <p>Are you sure you want to delete this Comment?</p>
            <div class="prompt-controls mt-3">
                <button class="confirm">Confirm</button>
                <button class="cancel">Cancel</button>
            </div>
        </div>
    </div>
    <script defer>
        // get delete modal
        const modal = document.querySelector('.delete-prompt');
        const deleteForms = document.querySelectorAll('.delete-comment-form');
        // add event listener to all delete comment form submit
        deleteForms.forEach(form => {
            form.addEventListener('submit', function(e) {

                // prevent default submit behavior
                e.preventDefault();

                // show the modal
                modal.classList.add('active');
                // if clicked outside the modal, or in cancel button hide the modal
                [modal, document.querySelector('.delete-prompt .cancel')].forEach(element => {
                    element.addEventListener('click', function() {
                        modal.classList.remove('active');
                    });
                });

                // if confirm delete clicked, submit the form
                document.querySelector('.delete-prompt .confirm').addEventListener('click', function() {
                    e.target.submit();
                });
            })
        })
    </script>
@endsection
