<?php

namespace App\Http\Controllers;

use App\Models\Pelanggan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PelangganController extends Controller
{
    /**
     * Show pelanggan profile.
     */
    public function show(Request $request): JsonResponse
    {
        $pelanggan = Pelanggan::where('user_id', $request->user()->id)->first();

        if (!$pelanggan) {
            return response()->json([
                'status' => 'error',
                'message' => 'Profil pelanggan tidak ditemukan.',
            ], 404);
        }

        $pelanggan->load('user');

        return response()->json([
            'status' => 'success',
            'data' => $pelanggan,
        ]);
    }

    /**
     * Update pelanggan profile.
     */
    public function update(Request $request): JsonResponse
    {
        $pelanggan = Pelanggan::where('user_id', $request->user()->id)->first();

        if (!$pelanggan) {
            return response()->json([
                'status' => 'error',
                'message' => 'Profil pelanggan tidak ditemukan.',
            ], 404);
        }

        $request->validate([
            'alamat' => 'nullable|string|max:500',
            'no_telepon' => 'nullable|string|max:20',
        ]);

        $pelanggan->update($request->only(['alamat', 'no_telepon']));

        return response()->json([
            'status' => 'success',
            'message' => 'Profil berhasil diperbarui.',
            'data' => $pelanggan->fresh()->load('user'),
        ]);
    }
}