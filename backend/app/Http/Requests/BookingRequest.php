<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'ukuran' => 'required|string|max:100',
            'tgl_ambil' => 'required|date|after_or_equal:today',
            'desain_custom_url' => 'nullable|string|max:2048',
            'deskripsi_custom' => 'nullable|string|max:2000',
            'catatan' => 'nullable|string|max:500',
        ];
    }

    public function messages(): array
    {
        return [
            'ukuran.required' => 'Ukuran kue wajib diisi.',
            'tgl_ambil.required' => 'Tanggal ambil wajib diisi.',
            'tgl_ambil.after_or_equal' => 'Tanggal ambil harus hari ini atau setelahnya.',
        ];
    }
}