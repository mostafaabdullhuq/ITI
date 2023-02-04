<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */



    public function getFullCommentData($comments)
    {
        $comments = $comments->load("user");
        foreach ($comments as $index => $comment) {
            $comments[$index]['user'] = $comment->user;
        }
        return $comments;
    }

    public function toArray($request)
    {
        return [

            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
            'user' => $this->user,
            'slug' => $this->slug,
            'post_image' => $this->post_image,
            'comments' => $this->getFullCommentData($this->comments),
        ];
    }
}
