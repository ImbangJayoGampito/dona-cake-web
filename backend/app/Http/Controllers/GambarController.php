<?php

namespace App\Http\Controllers;

use App\Models\Gambar;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

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

    /**
     * Serve an image publicly. No authentication required.
     * Route: GET /api/image/public/{gambar}
     */
    public function getPublicFile(Gambar $gambar): BinaryFileResponse|JsonResponse
    {
        return $this->serveFile($gambar);
    }

    /**
     * Serve an image to authenticated users only.
     * Route: GET /api/image/protected/{gambar}  (auth:sanctum)
     */
    public function getProtectedFile(Gambar $gambar): BinaryFileResponse|JsonResponse
    {
        return $this->serveFile($gambar);
    }

    /**
     * Shared logic for resolving and streaming a Gambar's file from disk.
     */
    private function serveFile(Gambar $gambar): BinaryFileResponse|JsonResponse
    {
        if (!$gambar->path || !Storage::disk('public')->exists($gambar->path)) {
            return response()->json([
                'status' => 'error',
                'message' => 'File tidak ditemukan.',
            ], 404);
        }

        $filePath = Storage::disk('public')->path($gambar->path);

        return response()->file($filePath, [
            'Content-Type' => $this->getMimeTypeFromExtension(
                pathinfo($gambar->path, PATHINFO_EXTENSION)
            ),
            'Content-Disposition' => 'inline; filename="' . basename($gambar->path) . '"',
        ]);
    }

    /**
     * Get MIME type from file extension.
     */
    private function getMimeTypeFromExtension(string $extension): string
    {
        $mimeTypes = [
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'png' => 'image/png',
            'webp' => 'image/webp',
            'gif' => 'image/gif',
        ];

        return $mimeTypes[strtolower($extension)] ?? 'application/octet-stream';
    }

    /**
     * Serve a storage file directly by path (legacy support for desain_custom_url)
     * This method handles direct file paths that are stored in booking.desain_custom_url
     * before the Gambar model system was implemented.
     */
    public function serveStorageFile(string $path): BinaryFileResponse|JsonResponse
    {
        // Clean the path by removing any leading 'storage/' prefix
        $cleanPath = str_replace('storage/', '', $path);
        $cleanPath = ltrim($cleanPath, '/');

        // Try common storage locations
        $possiblePaths = [
            $cleanPath,
            'public/' . $cleanPath,
            'images/' . $cleanPath,
            'public/images/' . $cleanPath,
        ];

        $foundPath = null;
        foreach ($possiblePaths as $possiblePath) {
            if (Storage::disk('public')->exists($possiblePath)) {
                $foundPath = $possiblePath;
                break;
            }
        }

        if (!$foundPath) {
            return response()->json([
                'status' => 'error',
                'message' => 'File tidak ditemukan.',
            ], 404);
        }

        $filePath = Storage::disk('public')->path($foundPath);

        return response()->file($filePath, [
            'Content-Type' => $this->getMimeTypeFromExtension(
                pathinfo($foundPath, PATHINFO_EXTENSION)
            ),
            'Content-Disposition' => 'inline; filename="' . basename($foundPath) . '"',
        ]);
    }
}
