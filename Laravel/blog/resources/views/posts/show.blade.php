@extends('layouts.app')

@section('title')
    {{ $post['title'] }}
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
    padding: 30px 30px 10px 30px;
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

    .post .post-info {
    position: relative;
    color: rgb(68, 68, 68);
    font-style: italic
    }

    .post .post-info span {
    color: rgb(115, 115, 115);

    }

    .post .post-info::before {
    content: "";
    position: absolute;
    top: -15px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #e5e5e5;

    }

    .post .post-info .author {
    text-decoration: underline;
    cursor: pointer;
    }

    .post .post-info .author:hover {
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
    <div class="post">
        <h4 class="title mb-3">{{ $post['title'] }}</h4>
        <p class="description">{{ $post['description'] }}</p>
        <p class="post-info mt-3">Created By <span class="author">{{ $user['name'] }}</span> ({{ $user['email'] }})
            at
            {{ $post['created_at'] }}</p>
    </div>
@endsection
