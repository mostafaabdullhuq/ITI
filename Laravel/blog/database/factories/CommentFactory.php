<?php

namespace Database\Factories;


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
        return [
            // comment factory
            'comment' => $this->faker->text(200),
            'commentable_type' => 'App\Models\Post',
            'commentable_id' => $this->faker->numberBetween(1, 500),
            'user_id' => $this->faker->numberBetween(1, 20),
        ];
    }
}