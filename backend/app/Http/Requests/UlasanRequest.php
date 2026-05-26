<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UlasanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'produk_id' => 'required|exists:produks,id',
            'rating' => 'required|integer|min:1|max:5',
            'komentar' => 'nullable|string|max:2000',
            'is_visible' => 'boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'produk_id.required' => 'Produk wajib dipilih.',
            'produk_id.exists' => 'Produk tidak ditemukan.',
            'rating.required' => 'Rating wajib diisi.',
            'rating.min' => 'Rating minimal 1.',
            'rating.max' => 'Rating maksimal 5.',
        ];
    }
}