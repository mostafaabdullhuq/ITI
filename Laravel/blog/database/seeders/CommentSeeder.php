<?php

namespace Database\Seeders;

use App\Models\Comment;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // function to run when use php artisan db:seed, creating 1000 comment
        Comment::factory()->count(1000)->create();
    }
}