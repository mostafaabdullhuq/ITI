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

    .container {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    }

    .post,
    .post-creator {
    font-size: 20px;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    padding: 30px 30px 15px 30px;
    width: 100%;
    max-width: 1000px;
    min-width: 400px;
    display: flex;
    flex-direction: column;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    -o-border-radius: 3px;
    }

    .post .title {
    font-size: 33px;
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
    font-size: 17px;
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

    .post .last_update::before {
    content: "";
    position: absolute;
    top: -15px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #e5e5e5;

    }

    .post .post-info .author-name {
    text-decoration: underline;
    cursor: pointer;
    }

    .post .post-info .author-name:hover {
    color: rgb(75, 75, 75);
    }

    .post .controls .view-post {
    background-color: #455bd4;
    }

    .post .controls .edit-post {
    background-color: #50b754;
    }

    .post .controls .delete-post {
    background-color: #ee3b2e;
    }

    .post .controls .view-post:hover {
    background-color: #313f91;
    }

    .post .controls .edit-post:hover {
    background-color: #419643;
    }

    .post .controls .delete-post:hover {
    background-color: #c4342a;
    }
@endsection

@section('content')
    {{-- posts --}}
    <div class="post">
        @if ($post)
            <h4 class="title mb-1">{{ $post['title'] }}</h4>
            <p class="post-info mb-3 ms-1">
                <span class="author-name">{{ $post->user->name }} ({{ $post->user->email }})</span>
                &nbsp;at &nbsp;<span class="created-at">{{ $post->created_at->format('jS \o\f F, Y g:i:s a') }}</span>
            </p>
            <p class="description">{{ $post['description'] }}</p>
            <p class="last_update mt-3 ms-1">
                Last update on: <span class="updated-at">{{ $post->updated_at->format('jS \o\f F, Y g:i:s a') }}</span>
            </p>
            {{-- add comments section --}}
        @else
            <h4 class="mb-1">Post not found or has been deleted.</h4>
        @endif
    </div>
    @if ($post)
        {{-- comments --}}
        <div class="accordion accordion-flush post" id="accordionFlushExample">
            @foreach ($post->comments as $comment)
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-heading-{{ $comment->id }}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#flush-collapse-{{ $comment->id }}" aria-expanded="false"
                            aria-controls="flush-collapse-{{ $comment->id }}">
                            <p class="comment-info">
                                <span class="author-name">{{ $comment->user->name }} ({{ $comment->user->email }})</span>
                                &nbsp;at &nbsp;<span
                                    class="created-at">{{ $comment->created_at->format('jS \o\f F, Y g:i:s a') }}</span>
                            </p>
                        </button>
                    </h2>
                    <div id="flush-collapse-{{ $comment->id }}" class="accordion-collapse collapse"
                        aria-labelledby="flush-heading-{{ $comment->id }}" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">{{ $comment->comment }}</div>
                        <div class="controls">
                            {{-- <a href="{{ route('comments.show', $comment->id) }}" class="view-comment">View</a>
                        <a href="{{ route('comments.edit', $comment->id) }}" class="edit-comment">Edit</a>
                        <form action="{{ route('comments.destroy', $comment->id) }}" method="POST">
                            @csrf
                            @method('DELETE')
                            <input type="submit" value="Delete" class="delete-comment">
                        </form> --}}
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
        {{-- add comment --}}
        <div class="new-comment post">
            <form>
                <textarea name="comment"></textarea>
                <button class="btn btn-primary mt-3 py-3">Add Comment</button>
            </form>

        </div>
    @endif
@endsection
