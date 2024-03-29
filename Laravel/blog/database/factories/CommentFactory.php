<?php

namespace Database\Factories;

use App\Models\Post;

use Illuminate\Database\Eloquent\Factories\Factory;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition()
    {


        $faker = fake('en-US');

        return [
            // comment factory
            'comment' => $faker->realTextBetween(50, 200),
            'commentable_type' => Post::class,
            'commentable_id' => $faker->numberBetween(1, 500),
            'user_id' => $faker->numberBetween(1, 20),
        ];
    }
}
