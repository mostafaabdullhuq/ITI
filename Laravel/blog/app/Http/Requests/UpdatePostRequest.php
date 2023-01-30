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
            'title' => 'required|min:3|max:600|unique:posts,id,except,' . $this->id,
            // description are required, minimum 10 characters
            'description' => 'required|min:10',
            // posted_by are required, must be an existing user id
            'posted_by' => 'required|exists:users,id'
        ];
    }
}