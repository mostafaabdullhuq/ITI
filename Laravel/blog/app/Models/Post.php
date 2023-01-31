<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Cviebrock\EloquentSluggable\Sluggable;
use Spatie\Tags\HasTags;

class Post extends Model
{
    use HasFactory;
    use SoftDeletes;
    use Sluggable;
    use HasTags;

    protected $fillable = [
        'title',
        'description',
        'user_id',
        'slug',
        'post_image',
        'tags'
    ];


    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'title'
            ]
        ];
    }


    // make relation between post and user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // make relation between post and comments
    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}