@extends('layouts.app')

@section('title')
    Edit Comment
@endsection

@section('style')
    * {
    font-family: "Roboto", sans-serif;
    }

    body {
    background-color: #f5f5f5;
    width: 100vw;
    height: 100vh;
    }

    .container.my-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: flex-start;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    }

    .container.my-container .create-comment {
    font-size: 20px;
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    max-width: 700px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    -o-border-radius: 10px;
    }

    .container.my-container .create-comment * {
    border: none;
    outline: none;
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 5px;
    border: 1px solid #f1f1f1;
    }

    .container.my-container .create-comment textarea {
    resize: none;
    height: 200px;
    }

    .container.my-container .create-comment *::placeholder,
    .container.my-container .create-comment *::-webkit-input-placeholder,
    .container.my-container .create-comment select,
    .container.my-container .create-comment select option {
    color: rgb(47, 47, 47);
    }

    .container.my-container .create-comment button {
    background-color: #4b4b4b;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
    -webkit-transition: background-color 0.3s ease;
    -moz-transition: background-color 0.3s ease;
    -ms-transition: background-color 0.3s ease;
    -o-transition: background-color 0.3s ease;
    }

    .container.my-container .create-comment button:hover {
    background-color: #3a3a3a;
    }
@endsection

@section('content')
    <form class="create-comment" method="POST" action="{{ route('comments.update', $comment->id) }}">
        @csrf
        @method('PUT')
        <textarea name="comment" placeholder="What's on your mind?">{{ $comment->comment }}</textarea>
        {{-- <select class="creator" name="commented_by">
            <option value="{{ $comment->user->id }}" selected>{{ $comment->user->name }}</option>
        </select> --}}
        <button type="submit">Update Comment</button>
    </form>
@endsection
