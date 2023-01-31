@extends('layouts.app')




@section('title')
    Posts
@endsection

@section('style')
    * {
    font-family: "Roboto", sans-serif;
    }

    @media screen and (max-width: 1400px) {

    .post,
    .new-post {
    width: calc((100% - 20px) / 2) !important;
    }
    }

    @media screen and (max-width: 991px) {

    .post,
    .new-post {
    width: 100% !important;
    }
    }

    body {
    background-color: #f5f5f5;
    }

    .container.my-container {
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


    .post,
    .new-post {
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

    .new-post {
    justify-content: center;
    align-items: center;
    }

    .new-post a {
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

    .new-post a:hover {
    color: rgb(115, 115, 115);
    transform: scale(1.1);
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -o-transform: scale(1.1);
    }

    .post .title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    }

    .post .post-info {
    color: rgb(115, 115, 115);
    }

    .post .post-info .author {
    text-decoration: underline;
    cursor: pointer;
    }

    .post .post-info .author:hover {
    color: rgb(75, 75, 75)
    }

    .post .description {
    min-height: 96px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    -webkit-box-orient: vertical;
    }

    .post .controls {
    display: flex;
    gap: 10px;
    margin-top: 10px;
    }

    .post .controls input,
    .post .controls a {
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

    .post .controls .view-post {
    background-color: #455bd4;
    }

    .post .controls .edit-post,
    .delete-prompt .content button.cancel,
    .post.deleted .restore-post {
    background-color: #50b754;
    }

    .post .controls .delete-post,
    .delete-prompt .content button.confirm {
    background-color: #ee3b2e;
    }

    .post .controls .view-post:hover {
    background-color: #313f91;
    }

    .post .controls .edit-post:hover,
    .delete-prompt .content button.cancel:hover,
    .post.deleted .restore-post:hover {
    background-color: #419643;
    }

    .post .controls .delete-post:hover,
    .delete-prompt .content button.confirm:hover {
    background-color: #c4342a;
    }


    .post.deleted {
    background-color: #f8f8f8;
    }

    .post.deleted .title,
    .post.deleted .description,
    .post.deleted .post-info {
    opacity: 0.7
    }

    .post.deleted .restore-post {
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

@section('content')
    <div class="new-post">
        <a href="{{ route('posts.create') }}">+</a>
    </div>
    {{-- {{ dd($posts->onEachSide(1)->links()) }} --}}
    @foreach ($posts as $post)
        <div class="post {{ $post->trashed() ? 'deleted' : '' }}">
            <h4 class="title"title="{{ $post->title }}">{{ $post->title }}</h4>
            <p class="post-info">
                <span class="author">{{ $post->user->name }}</span> at
                <span class="date">{{ $post->created_at->format('y-m-d') }}</span><br>
                <span class="slug">{{ $post->slug }}</span>
            </p>
            <p class="description">{{ $post->description }}</p>
            <div class="controls">
                @if (!$post->trashed())
                    <a href="{{ route('posts.show', $post->id) }}" class="view-post">View</a>
                    <a href="{{ route('posts.edit', $post->id) }}" class="edit-post">Edit</a>
                @endif
                <form class="{{ $post->trashed() ? '' : 'delete-post-form' }}"
                    action="{{ route('posts.destroy', $post->id) }}" method="POST">
                    @csrf
                    {{-- html form has only post and get, so we want to add delete --}}
                    {{-- @if ($post->trashed() ? 'Restore' : 'Delete') --}}
                    @if ($post->trashed())
                        @method('PATCH')
                    @else
                        @method('DELETE')
                    @endif
                    <input type="submit" value="{{ $post->trashed() ? 'Restore Post' : 'Delete' }}"
                        class="{{ $post->trashed() ? 'restore-post' : 'delete-post' }}">
                </form>
            </div>
        </div>
    @endforeach
    <div class="delete-prompt">
        <div class="content">
            <p>Are you sure you want to delete this post?</p>
            <div class="prompt-controls mt-3">
                <button class="confirm">Confirm</button>
                <button class="cancel">Cancel</button>
            </div>
        </div>
    </div>
    <div class="mt-5 col-12 d-flex align-items-center pagination-container">
        {!! $posts->onEachSide(1)->links() !!}
    </div>
    <script defer>
        // get delete modal
        const modal = document.querySelector('.delete-prompt');
        const deleteForms = document.querySelectorAll('.delete-post-form');
        // add event listener to all delete post form submit
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
