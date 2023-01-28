<?php

namespace App\HTTP\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;


class PostController extends Controller
{
    // initialize posts data and users data



    private static $users = [
        [
            'id' => 1,
            'name' => 'Ahmed Samy',
            'email' => 'ahmedsamy@gmail.com'
        ],
        [
            'id' => 2,
            'name' => 'Mahmoud Ahmed',
            'email' => 'mahmoudahmed@gmail.com'
        ],
        [
            'id' => 3,
            'name' => 'Ibrahim Ahmed',
            'email' => 'ibrahimahmed@gmail.com'
        ],
        [
            'id' => 4,
            'name' => 'Mody Ali',
            'email' => 'modyali@gmail.com'
        ],
        [
            'id' => 5,
            'name' => 'Mohamed Hassan',
            'email' => 'mohamedhassan@gmail.com'
        ],
        [
            'id' => 6,
            'name' => 'Ahmed Ali',
            'email' => 'ahmedali@gmail.com'
        ],
    ];
    private static $usersPosts = [];

    public function __construct()
    {
        self::$usersPosts = [
            [
                'id' => 1,
                'title' => 'So, you’d like to animate the display property',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum ultricies justo sed facilisis. Nunc consectetur lacus non lacinia elementum. Vestibulum vitae libero sapien. Donec pellentesque augue arcu, vel aliquet quam sagittis non. Vestibulum volutpat ante ut luctus vestibulum. Nullam quis egestas mi. Quisque imperdiet id est vel vulputate. Nam condimentum, felis in euismod ultrices, lorem lacus lobortis neque, ut blandit massa ante scelerisque ante. Proin accumsan sem justo, sit amet maximus libero imperdiet placerat.',
                'posted_by' => self::$users[random_int(0, count(self::$users) - 1)]['name'],
                'created_at' => '2022-01-28 10:05'
            ],
            [
                'id' => 2,
                'title' => 'Does WWW still belong in URLs?',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum ultricies justo sed facilisis. Nunc consectetur lacus non lacinia elementum. Vestibulum vitae libero sapien. Donec pellentesque augue arcu, vel aliquet quam sagittis non. Vestibulum volutpat ante ut luctus vestibulum. Nullam quis egestas mi. Quisque imperdiet id est vel vulputate. Nam condimentum, felis in euismod ultrices, lorem lacus lobortis neque, ut blandit massa ante scelerisque ante. Proin accumsan sem justo, sit amet maximus libero imperdiet placerat.',
                'posted_by' => self::$users[random_int(0, count(self::$users) - 1)]['name'],
                'created_at' => '2021-07-20 08:20'
            ],
            [
                'id' => 3,
                'title' => 'CSS Infinite and Circular Rotating Image Slider',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum ultricies justo sed facilisis. Nunc consectetur lacus non lacinia elementum. Vestibulum vitae libero sapien. Donec pellentesque augue arcu, vel aliquet quam sagittis non. Vestibulum volutpat ante ut luctus vestibulum. Nullam quis egestas mi. Quisque imperdiet id est vel vulputate. Nam condimentum, felis in euismod ultrices, lorem lacus lobortis neque, ut blandit massa ante scelerisque ante. Proin accumsan sem justo, sit amet maximus libero imperdiet placerat.',
                'posted_by' => self::$users[random_int(0, count(self::$users) - 1)]['name'],
                'created_at' => '2022-05-10 06:36'
            ],
            [
                'id' => 4,
                'title' => 'A Few Times Container Size Queries Would Have Helped Me Out',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum ultricies justo sed facilisis. Nunc consectetur lacus non lacinia elementum. Vestibulum vitae libero sapien. Donec pellentesque augue arcu, vel aliquet quam sagittis non. Vestibulum volutpat ante ut luctus vestibulum. Nullam quis egestas mi. Quisque imperdiet id est vel vulputate. Nam condimentum, felis in euismod ultrices, lorem lacus lobortis neque, ut blandit massa ante scelerisque ante. Proin accumsan sem justo, sit amet maximus libero imperdiet placerat.',
                'posted_by' => self::$users[random_int(0, count(self::$users) - 1)]['name'],
                'created_at' => '2022-11-25 12:05'
            ],
            [
                'id' => 5,
                'title' => 'Digging Deeper Into Container Style Queries',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum ultricies justo sed facilisis. Nunc consectetur lacus non lacinia elementum. Vestibulum vitae libero sapien. Donec pellentesque augue arcu, vel aliquet quam sagittis non. Vestibulum volutpat ante ut luctus vestibulum. Nullam quis egestas mi. Quisque imperdiet id est vel vulputate. Nam condimentum, felis in euismod ultrices, lorem lacus lobortis neque, ut blandit massa ante scelerisque ante. Proin accumsan sem justo, sit amet maximus libero imperdiet placerat.',
                'posted_by' => self::$users[random_int(0, count(self::$users) - 1)]['name'],
                'created_at' => '2022-12-10 07:05'
            ],
            [
                'id' => 6,
                'title' => 'Newer Things to Know About Good Ol’ HTML Lists',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum ultricies justo sed facilisis. Nunc consectetur lacus non lacinia elementum. Vestibulum vitae libero sapien. Donec pellentesque augue arcu, vel aliquet quam sagittis non. Vestibulum volutpat ante ut luctus vestibulum. Nullam quis egestas mi. Quisque imperdiet id est vel vulputate. Nam condimentum, felis in euismod ultrices, lorem lacus lobortis neque, ut blandit massa ante scelerisque ante. Proin accumsan sem justo, sit amet maximus libero imperdiet placerat.',
                'posted_by' => self::$users[random_int(0, count(self::$users) - 1)]['name'],
                'created_at' => '2022-01-16 03:05'
            ]
        ];
    }

    // get all posts
    public function index()
    {
        return view("posts.index", ['posts' => self::$usersPosts]);
    }


    // get single post
    public function show($id)
    {
        // get the post with the same id from the posts array
        $post = array_filter(self::$usersPosts, function ($post) use ($id) {
            return $post['id'] == $id;
        });
        $post = array_pop($post);

        // get the user who posted this post
        $user = array_filter(self::$users, function ($user) use ($post) {
            return $user['name'] === $post['posted_by'];
        });

        // format the date to nice looking date
        $date = Carbon::create($post['created_at'])->settings(
            [
                'toStringFormat' => 'jS \o\f F, Y g:i:s a'
            ]
        );

        $post['created_at'] = $date;
        $user = array_pop($user);
        return view("posts.show", ['post' => $post, 'user' => $user]);
    }

    // get create new post page
    public function create()
    {
        return view("posts.create", ['users' => self::$users]);
    }

    // store new post created
    public function store(Request $request)
    {
        // get all data from form user submitted
        $post = $request->all();

        // remove token key from array
        unset($post['_token']);

        // add post id and post create date to post data
        $post['id'] = count(self::$usersPosts) + 1;
        $post['created_at'] = date("Y-m-d h:i");

        // validate if all fields are provided from form
        if ($post['title'] && $post['description'] && $post['posted_by']) {
            // add the post to posts array then redirect to index page
            array_push(self::$usersPosts, $post);
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
        // get the post with the same id from the posts array
        $post = array_filter(self::$usersPosts, function ($post) use ($id) {
            return $post['id'] == $id;
        });
        return view("posts.edit", ['post' => array_pop($post), 'users' => self::$users]);
    }

    // update edited post data
    public function update($newPost)
    {
        // update the post in posts array then redirect to index page
        self::$usersPosts = array_map(function ($post) use ($newPost) {
            if ($post['id'] === $newPost['id']) {
                return $newPost;
            }
            return $post;
        }, self::$usersPosts);
        return redirect('posts.index');;
    }

    // delete specifc post
    public function destroy($id)
    {
        // make a new array of all items in array except the item to be destroyed
        self::$usersPosts = array_filter(self::$usersPosts, function ($post) use ($id) {
            return $post['id'] != $id;
        });
        return redirect()->route('posts.index');
    }
}