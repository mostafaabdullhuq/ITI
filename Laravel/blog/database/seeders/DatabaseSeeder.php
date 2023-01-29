<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        // execute user, post and comment seeders when running artisan db:seed
        $this->call(
            [
                UserSeeder::class,
                PostSeeder::class,
                CommentSeeder::class
            ]
        );
    }
}