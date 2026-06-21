<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\BookingStatus;
class BookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $isUpdate = $this->isMethod("PUT") || $this->isMethod("PATCH");

        return [
            // Booking Information
            "kategori_id" => "nullable|exists:kategoris,id",

            // Cake Configuration
            "ukuran" => "required|string|max:100",
            "jenis_frosting" => "required|string|max:100",
            "rasa_kue" => "required|string|max:255",
            "tema_dekorasi" => "nullable|string|max:100",

            // Custom Design
            "desain_custom_url" => "nullable|string|max:2048|url",
            "deskripsi_custom" => "nullable|string|max:2000",

            // Schedule
            "tgl_ambil" => "required|date|after_or_equal:today",

            // Pricing
            "harga_final" => "nullable|numeric|min:0|max:999999999",

            // Status (only for updates)
            "status_verifikasi" => $isUpdate
                ? "nullable|string|in:" . implode(",", BookingStatus::getAll())
                : "sometimes",

            // Notes
            "catatan" => "nullable|string|max:500",
        ];
    }

    public function messages(): array
    {
        return [
            // Pelanggan
            "pelanggan_id.required" => "Pelanggan wajib dipilih.",
            "pelanggan_id.exists" => "Pelanggan yang dipilih tidak valid.",

            // Transaksi
            "transaksi_id.exists" => "Transaksi yang dipilih tidak valid.",

            // Kategori
            "kategori_id.exists" => "Kategori yang dipilih tidak valid.",

            // Ukuran
            "ukuran.required" => "Ukuran kue wajib diisi.",
            "ukuran.max" => "Ukuran kue maksimal 100 karakter.",

            // Frosting
            "jenis_frosting.required" => "Jenis frosting wajib diisi.",
            "jenis_frosting.max" => "Jenis frosting maksimal 100 karakter.",

            // Rasa
            "rasa_kue.required" => "Rasa kue wajib diisi.",
            "rasa_kue.max" => "Rasa kue maksimal 255 karakter.",

            // Tema
            "tema_dekorasi.max" => "Tema dekorasi maksimal 100 karakter.",

            // Custom Design URL
            "desain_custom_url.max" =>
                "URL desain custom maksimal 2048 karakter.",
            "desain_custom_url.url" => "Format URL desain custom tidak valid.",

            // Custom Description
            "deskripsi_custom.max" =>
                "Deskripsi custom maksimal 2000 karakter.",

            // Tanggal Ambil
            "tgl_ambil.required" => "Tanggal ambil wajib diisi.",
            "tgl_ambil.date" => "Format tanggal ambil tidak valid.",
            "tgl_ambil.after_or_equal" =>
                "Tanggal ambil harus hari ini atau setelahnya.",

            // Harga
            "harga_final.numeric" => "Harga final harus berupa angka.",
            "harga_final.min" => "Harga final tidak boleh kurang dari 0.",
            "harga_final.max" => "Harga final terlalu besar.",

            // Status
            "status_verifikasi.in" => "Status verifikasi tidak valid.",

            // Catatan
            "catatan.max" => "Catatan maksimal 500 karakter.",
        ];
    }
}
