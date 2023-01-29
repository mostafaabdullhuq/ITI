<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // function to run when use php artisan db:seed

        // create 500 posts
        Post::factory()->count(500)->create();
    }
}