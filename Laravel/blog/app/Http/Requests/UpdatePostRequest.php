<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            // title are required, unique over posts titles except the current post being edited, minimum 3 characters
            'title' => 'required|min:3|max:100|unique:posts,id,except,' . $this->id,
            // description are required, minimum 10 characters
            'description' => 'required|min:10',
            'post_image' => 'mimes:jpg,png',

            // posted_by are required, must be an existing user id
            // 'posted_by' => 'required|exists:users,id'
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */

    public function messages()
    {
        return [
            'title.required' => 'Post title cannot be empty.',
            'title.min' => 'Post title must be at least 3 characters',
            'title.max' => 'Post title must be less than 600 characters',
            'title.unique' => 'Post title already exists.',
            'description.required' => 'Post description cannot be empty.',
            'description.min' => 'Post description must be at least 10 characters',
            'post_image.mimes' => 'Only (png, jpg) images are allowed.',
        ];
    }
}