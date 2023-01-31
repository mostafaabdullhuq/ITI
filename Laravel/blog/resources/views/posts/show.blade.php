@extends('layouts.app')

@section('title')
    @if ($post)
        {{ $post['title'] }}
    @else
        Post not found
    @endif
@endsection

@section('style')
    * {
    font-family: "Roboto", sans-serif;
    }

    body {
    background-color: #f5f5f5;
    }

    :root {
    --post-background: attr(data-img-src)
    }

    .container.my-container {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: flex-start;
    flex-direction: column;
    {{-- align-items: center; --}}
    max-width: 1200px;
    }

    .post,
    .post-creator {
    font-size: 20px;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    padding: 30px 30px 15px 30px;
    width: 100%;
    min-width: 400px;
    display: flex;
    flex-direction: column;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    -o-border-radius: 3px;
    }

    .title {
    margin-bottom: 0;
    }

    .post .description {
    color: rgb(79 79 79);
    }

    .post .post-info::after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background-color: #e5e5e5;
    margin-top: 10px;
    }

    .post .post-info,
    .post .last_update,
    .comment-info {
    font-size: 18px;
    margin: 5px 0px;
    }
    .comment-info {
    font-size: 1.2em
    }
    .controls {
    display: flex;
    gap: 10px;
    margin-top: 10px;
    }

    .controls input,
    .controls a {
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

    .post .post-info,
    .post .last_update,
    .comment-info {
    position: relative;
    color: rgb(68, 68, 68);
    font-style: italic
    }

    .post .post-info span,
    .post .last_update span,
    .comment-info span {
    color: rgb(115, 115, 115);
    }



    .post .post-info .author-name {
    text-decoration: underline;
    cursor: pointer;
    }

    .post .post-info .author-name:hover {
    color: rgb(75, 75, 75);
    }

    .controls .view-comment {
    background-color: #455bd4;
    }

    .controls .edit-comment {
    background-color: #50b754;
    }

    .controls .delete-comment {
    background-color: #ee3b2e;
    }

    .controls .view-comment:hover {
    background-color: #313f91;
    }

    .controls .edit-comment:hover {
    background-color: #419643;
    }

    .controls .delete-comment:hover {
    background-color: #c4342a;
    }

    .new-comment form{
    display: flex;
    flex-direction: column
    }
    .new-comment form textarea {
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    font-size: 20px;
    padding: 20px;
    outline: none;
    height: 200px;
    resize: none;
    }

    .new-comment form button {
    border: none;
    border-radius: 3px;
    padding: 15px 25px;
    background-color: rgb(68, 68, 68);
    color: white;

    }
    .new-comment form button:hover {
    background-color: rgb(75, 75, 75);
    }

    .new-comment .user-select {
    border: 1px solid #e5e5e5;
    padding: 15px;
    border-radius: 3px;
    outline: none;
    }
    .errornotification {
    display: flex;
    padding: 10px 20px !important;
    background-color: #CD0404 !important;
    color: white ;
    margin-top: 20px;
    border-radius: 3px;

    }

    .post-details {
    margin-left: 5px;
    }
    .sec-end::after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background-color: #e5e5e5;
    margin-top: 5px;
    }

    .post-details .publisher {
    position: relative;
    cursor: pointer;
    text-decoration: underline;
    }


    .post-details .publisher:hover::after {
    content: attr(data-email);
    position: absolute;
    top: 20px;
    left: -50%;
    padding: 10px 20px;
    background-color: black;
    color: white;
    border-radius: 3px;
    }

    .post-image {
    width: 100%;
    height: 500px;
    background-size: cover;
    background:
    url('https://images.unsplash.com/photo-1675141194800-ae6f2f729ed9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')
    no-repeat center;
    border-radius: 3px;
    }
@endsection

@section('content')



    <h1 class="title">{{ $post->title }}</h1>
    <div class="post-details sec-end">
        <span class="publisher fw-bold" data-email="{{ $post->user->email }}">{{ $post->user->name }}</span>
        on <span>{{ $post->created_at->format('jS \o\f F, Y g:i:s a') }}</span>
    </div>
    <div class="post-image"></div>

    {{-- post content --}}
    <div class="post">
        @if ($post)
            {{-- <h4 class="title mb-1">{{ $post['title'] }}</h4>
            <p class="post-info mb-3 ms-1">
                <span class="author-name">{{ $post->user->name }} ({{ $post->user->email }})</span>
                &nbsp;at &nbsp;<span class="created-at">{{ $post->created_at->format('jS \o\f F, Y g:i:s a') }}</span>
            </p> --}}
            <p class="description sec-end">{{ $post['description'] }}</p>
            <p class="last_update mt-0 ms-1">
                Last update on: <span
                    class="updated-at">{{ $post->updated_at->format('jS \o\f F, Y g:i:s a') }}</span><br><span
                    class="post-slug">{{ $post->slug }}</span>
            </p>
            {{-- add comments section --}}
        @else
            <h4 class="mb-1">Post not found or has been deleted.</h4>
        @endif
    </div>
    {{-- <div class="sec-end"></div> --}}
    @if ($post)
        {{-- comments --}}
        <div class="accordion accordion-flush " id="accordionFlushExample">
            {{-- check if there's comments on this post --}}
            @if (!$post->comments->isEmpty())
                {{-- loop through comments --}}
                @foreach ($post->comments->sortBy('updated_at') as $comment)
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-heading-{{ $comment->id }}">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapse-{{ $comment->id }}" aria-expanded="false"
                                aria-controls="flush-collapse-{{ $comment->id }}">
                                <p class="comment-info">
                                    <span class="author-name">{{ $comment->user->name }}
                                        ({{ $comment->user->email }})
                                    </span>
                                    &nbsp;at &nbsp;<span
                                        class="created-at">{{ $comment->updated_at->format('jS \o\f F, Y g:i:s a') }}</span>
                                </p>

                            </button>
                        </h2>
                        <div id="flush-collapse-{{ $comment->id }}" class="accordion-collapse collapse py-2"
                            aria-labelledby="flush-heading-{{ $comment->id }}" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">{{ $comment->comment }}</div>
                            <div class="controls mb-3 d-flex justify-content-center align-items-center">
                                <a href="{{ route('comments.show', $comment->id) }}" class="view-comment ">Full Info</a>
                                <a href="{{ route('comments.edit', $comment->id) }}" class="edit-comment ">Edit</a>
                                <form action="{{ route('comments.destroy', $comment->id) }}" class="" method="POST">
                                    @csrf
                                    @method('DELETE')
                                    <input type="submit" value="Delete" class="delete-comment">
                                </form>
                            </div>
                        </div>
                    </div>
                @endforeach
                {{-- <div class="sec-end"></div> --}}

                {{-- if there's no comments of the post --}}
            @endif
        </div>
        {{-- add comment --}}
        <div class="new-comment">
            <form method="POST" action="{{ route('comments.store', $post->id) }}">
                @csrf
                <textarea name="comment" placeholder="Write an answer...">
@if ($errors->any())
{{ old('comment') }}
@endif
</textarea>
                @error('comment')
                    <div class="errornotification">
                        {{ $message }}
                    </div>
                @enderror

                {{-- <select name="commented_by" class="user-select mt-3">
                    @foreach ($users as $user)
                        <option value="{{ $user->id }}">{{ $user->name }}</option>
                    @endforeach
                </select>
                @error('commented_by')
                    <div class="errornotification">
                        {{ $message }}
                    </div>
                @enderror --}}
                <button class="mt-3 mb-2">Add Comment</button>
            </form>
        </div>
    @endif
@endsection
