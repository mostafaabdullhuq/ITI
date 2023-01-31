<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => fake()->sentence(6, true),
            'description' => fake()->realTextBetween(300, 600),
            'user_id' => fake()->numberBetween(1, 20),
            'slug' => fake()->slug(4, true),
            'post_image' => null
        ];
    }
}