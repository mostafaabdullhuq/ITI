@extends('layouts.app')

@section('title')
    Edit Post
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

    .container {
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

    .container .create-post {
    font-size: 20px;
    background-color: white;
    padding: 50px 30px;
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

    .container .create-post * {
    border: none;
    outline: none;
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 5px;
    border: 1px solid #f1f1f1;
    }

    .container .create-post textarea {
    resize: none;
    height: 200px;
    }

    .container .create-post *::placeholder,
    .container .create-post *::-webkit-input-placeholder,
    .container .create-post select,
    .container .create-post select option {
    color: rgb(47, 47, 47);
    }

    .container .create-post button {
    background-color: #4b4b4b;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
    -webkit-transition: background-color 0.3s ease;
    -moz-transition: background-color 0.3s ease;
    -ms-transition: background-color 0.3s ease;
    -o-transition: background-color 0.3s ease;
    }

    .container .create-post button:hover {
    background-color: #3a3a3a;
    }
@endsection

@section('content')
    <form class="create-post" method="POST" action="{{ route('posts.update', $post->id) }}">
        @csrf
        @method('PUT')
        <input type="text" name="title" placeholder="Post title" value="{{ $post->title }}" autofocus />
        <textarea name="description" placeholder="What's on your mind?">{{ $post->description }}</textarea>
        <select class="creator" name="posted_by">
            <option value="{{ $post->user->id }}" selected>{{ $post->user->name }}</option>
        </select>
        <button type="submit">Update Post</button>
    </form>
@endsection
