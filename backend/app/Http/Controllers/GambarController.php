<?php

namespace App\Http\Controllers;

use App\Models\Gambar;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GambarController extends Controller
{
    /**
     * Upload an image.
     */
    public function upload(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'gambarable_type' => 'nullable|string',
            'gambarable_id' => 'nullable|integer',
        ]);

        $file = $request->file('file');
        $path = $file->store('images/' . now()->format('Y/m'), 'public');

        $gambar = Gambar::create([
            'gambar_url' => Storage::url($path),
            'path' => $path,
            'gambarable_type' => $request->gambarable_type,
            'gambarable_id' => $request->gambarable_id,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Gambar berhasil diunggah.',
            'data' => $gambar,
        ], 201);
    }

    /**
     * Delete an image.
     */
    public function destroy(Gambar $gambar): JsonResponse
    {
        // Delete file from storage
        if ($gambar->path && Storage::disk('public')->exists($gambar->path)) {
            Storage::disk('public')->delete($gambar->path);
        }

        $gambar->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Gambar berhasil dihapus.',
        ]);
    }
}