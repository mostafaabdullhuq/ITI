<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCommentRequest extends FormRequest
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
            // comment is required, minimum 3 characters maximum 250 character
            'comment' => 'required|min:3|max:250',
            // user must be exist and required
            'commented_by' => 'required|exists:users,id'
        ];
    }
}