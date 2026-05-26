<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PesananRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'items' => 'required|array|min:1',
            'items.*.produk_id' => 'required|exists:produks,id',
            'items.*.kuantitas' => 'required|integer|min:1',
            'items.*.catatan' => 'nullable|string|max:500',
        ];

        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            $rules = [
                'status_pesanan' => 'sometimes|string|in:menunggu_pembayaran,dibayar,diproses,selesai,dibatalkan,pembayaran_dibatalkan',
                'total_harga' => 'sometimes|numeric|min:0',
            ];
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'items.required' => 'Item pesanan wajib diisi.',
            'items.min' => 'Minimal 1 item pesanan.',
            'items.*.produk_id.required' => 'Produk wajib dipilih.',
            'items.*.produk_id.exists' => 'Produk tidak ditemukan.',
            'items.*.kuantitas.required' => 'Kuantitas wajib diisi.',
            'items.*.kuantitas.min' => 'Kuantitas minimal 1.',
        ];
    }
}