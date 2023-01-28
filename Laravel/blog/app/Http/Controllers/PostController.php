<?php

namespace App\HTTP\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;


class PostController extends Controller
{
    private $usersPosts;
    private $users;
    public function __construct()
    {
        $this->users = [
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


        // fake posts data
        $this->usersPosts = [
            [
                'id' => 1,
                'title' => 'So, you’d like to animate the display property',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum ultricies justo sed facilisis. Nunc consectetur lacus non lacinia elementum. Vestibulum vitae libero sapien. Donec pellentesque augue arcu, vel aliquet quam sagittis non. Vestibulum volutpat ante ut luctus vestibulum. Nullam quis egestas mi. Quisque imperdiet id est vel vulputate. Nam condimentum, felis in euismod ultrices, lorem lacus lobortis neque, ut blandit massa ante scelerisque ante. Proin accumsan sem justo, sit amet maximus libero imperdiet placerat.
',
                'posted_by' => $this->users[random_int(0, count($this->users) - 1)]['name'],
                'created_at' => '2022-01-28 10:05'
            ],
            [
                'id' => 2,
                'title' => 'Does WWW still belong in URLs?',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum ultricies justo sed facilisis. Nunc consectetur lacus non lacinia elementum. Vestibulum vitae libero sapien. Donec pellentesque augue arcu, vel aliquet quam sagittis non. Vestibulum volutpat ante ut luctus vestibulum. Nullam quis egestas mi. Quisque imperdiet id est vel vulputate. Nam condimentum, felis in euismod ultrices, lorem lacus lobortis neque, ut blandit massa ante scelerisque ante. Proin accumsan sem justo, sit amet maximus libero imperdiet placerat.
',
                'posted_by' => $this->users[random_int(0, count($this->users) - 1)]['name'],
                'created_at' => '2021-07-20 08:20'
            ],
            [
                'id' => 3,
                'title' => 'CSS Infinite and Circular Rotating Image Slider',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum ultricies justo sed facilisis. Nunc consectetur lacus non lacinia elementum. Vestibulum vitae libero sapien. Donec pellentesque augue arcu, vel aliquet quam sagittis non. Vestibulum volutpat ante ut luctus vestibulum. Nullam quis egestas mi. Quisque imperdiet id est vel vulputate. Nam condimentum, felis in euismod ultrices, lorem lacus lobortis neque, ut blandit massa ante scelerisque ante. Proin accumsan sem justo, sit amet maximus libero imperdiet placerat.
',
                'posted_by' => $this->users[random_int(0, count($this->users) - 1)]['name'],
                'created_at' => '2022-05-10 06:36'
            ],
            [
                'id' => 4,
                'title' => 'A Few Times Container Size Queries Would Have Helped Me Out',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum ultricies justo sed facilisis. Nunc consectetur lacus non lacinia elementum. Vestibulum vitae libero sapien. Donec pellentesque augue arcu, vel aliquet quam sagittis non. Vestibulum volutpat ante ut luctus vestibulum. Nullam quis egestas mi. Quisque imperdiet id est vel vulputate. Nam condimentum, felis in euismod ultrices, lorem lacus lobortis neque, ut blandit massa ante scelerisque ante. Proin accumsan sem justo, sit amet maximus libero imperdiet placerat.
',
                'posted_by' => $this->users[random_int(0, count($this->users) - 1)]['name'],
                'created_at' => '2022-11-25 12:05'
            ],
            [
                'id' => 5,
                'title' => 'Digging Deeper Into Container Style Queries',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum ultricies justo sed facilisis. Nunc consectetur lacus non lacinia elementum. Vestibulum vitae libero sapien. Donec pellentesque augue arcu, vel aliquet quam sagittis non. Vestibulum volutpat ante ut luctus vestibulum. Nullam quis egestas mi. Quisque imperdiet id est vel vulputate. Nam condimentum, felis in euismod ultrices, lorem lacus lobortis neque, ut blandit massa ante scelerisque ante. Proin accumsan sem justo, sit amet maximus libero imperdiet placerat.
',
                'posted_by' => $this->users[random_int(0, count($this->users) - 1)]['name'],
                'created_at' => '2022-12-10 07:05'
            ],
            [
                'id' => 6,
                'title' => 'Newer Things to Know About Good Ol’ HTML Lists',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum ultricies justo sed facilisis. Nunc consectetur lacus non lacinia elementum. Vestibulum vitae libero sapien. Donec pellentesque augue arcu, vel aliquet quam sagittis non. Vestibulum volutpat ante ut luctus vestibulum. Nullam quis egestas mi. Quisque imperdiet id est vel vulputate. Nam condimentum, felis in euismod ultrices, lorem lacus lobortis neque, ut blandit massa ante scelerisque ante. Proin accumsan sem justo, sit amet maximus libero imperdiet placerat.
',
                'posted_by' => $this->users[random_int(0, count($this->users) - 1)]['name'],
                'created_at' => '2022-01-16 03:05'
            ]
        ];
    }


    public function index()
    {
        return view("posts.index", ['posts' => $this->usersPosts]);
    }



    public function show($id)
    {

        // get the post with the same id from the posts array
        $post = array_filter($this->usersPosts, function ($post) use ($id) {
            return $post['id'] == $id;
        });
        $post = array_pop($post);
        $user = array_filter($this->users, function ($user) use ($post) {
            return $user['name'] === $post['posted_by'];
        });
        $date = Carbon::create($post['created_at'])->settings(
            [
                'toStringFormat' => 'jS \o\f F, Y g:i:s a'
            ]
        );
        $post['created_at'] = $date;
        $user = array_pop($user);
        return view("posts.show", ['post' => $post, 'user' => $user]);
    }


    public function create()
    {
        return view("posts.create", ['users' => $this->users]);
    }

    public function store(Request $request)
    {
        // get all data from form
        $post = $request->all();

        // remove token key from array
        unset($post['_token']);

        // add post id and post create date to post data
        $post['id'] = count($this->usersPosts) + 1;
        $post['created_at'] = date("Y-m-d h:i");
        // validate if all fields are provided from form
        if ($post['title'] && $post['description'] && $post['posted_by']) {
            // add the post to posts array then redirect to index page
            array_push($this->usersPosts, $post);
            return redirect()->route('posts.index');
        } else {
            return redirect()->route('posts.create');
        }
    }

    public function edit($id)
    {
        // get the post with the same id from the posts array
        $post = array_filter($this->usersPosts, function ($post) use ($id) {
            return $post['id'] == $id;
        });
        return view("posts.edit", ['post' => array_pop($post), 'users' => $this->users]);
    }

    public function update($newPost)
    {
        // update the post in posts array then redirect to index page
        $this->usersPosts = array_map(function ($post) use ($newPost) {
            if ($post['id'] === $newPost['id']) {
                return $newPost;
            }
            return $post;
        }, $this->usersPosts);
        return redirect('posts.index');;
    }

    public function destroy($id)
    {
        // make a new array of all items in array except the item to be destroyed
        $this->usersPosts = array_filter($this->usersPosts, function ($post) use ($id) {
            return $post['id'] != $id;
        });
        return redirect()->route('posts.index');
    }
}