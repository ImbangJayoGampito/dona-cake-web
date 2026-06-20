<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProdukRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'nama_produk' => 'required|string|max:255',
            'harga' => 'required|numeric|min:0',
            'stok' => 'required|integer|min:0',
            'kategori_id' => 'nullable|integer|exists:kategoris,id',
            'deskripsi' => 'nullable|string',
            'rating_rata_rata' => 'nullable|numeric|min:0|max:5',
        ];

        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            $rules = [
                'nama_produk' => 'sometimes|string|max:255',
                'harga' => 'sometimes|numeric|min:0',
                'stok' => 'sometimes|integer|min:0',
                'kategori_id' => 'nullable|integer|exists:kategoris,id',
                'deskripsi' => 'nullable|string',
                'rating_rata_rata' => 'nullable|numeric|min:0|max:5',
            ];
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'nama_produk.required' => 'Nama produk wajib diisi.',
            'harga.required' => 'Harga produk wajib diisi.',
            'harga.numeric' => 'Harga harus berupa angka.',
            'harga.min' => 'Harga tidak boleh negatif.',
            'stok.required' => 'Stok produk wajib diisi.',
            'stok.integer' => 'Stok harus berupa bilangan bulat.',
            'stok.min' => 'Stok tidak boleh negatif.',
        ];
    }
}