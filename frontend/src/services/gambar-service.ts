import ApiResponse from "@/lib/api/api-response"
import api from "@/lib/api/config"
import { ProtectedRoutes, PublicRoutes } from "@/lib/routes"
import { Gambar } from "@/models/gambar.model"

export default class GambarService {
  /**
   * Get a publicly-served image as a Blob (no auth required).
   * @param gambarId The ID of the gambar to fetch
   * @returns Promise with Blob containing the binary file data
   */
  static async getPublicFile(gambarId: number): Promise<Blob> {
    try {
      const response = await api.get(
        PublicRoutes.GetPublicGambar.replace("{gambar}", gambarId.toString()),
        {
          responseType: "blob",
        }
      );
      return response.data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to fetch public image: ${errorMessage}`);
    }
  }

  /**
   * Get a protected image as a Blob (requires authentication).
   * @param gambarId The ID of the gambar to fetch
   * @returns Promise with Blob containing the binary file data
   */
  static async getProtectedFile(gambarId: number): Promise<Blob> {
    try {
      const response = await api.get(
        ProtectedRoutes.GetProtectedGambar.replace("{gambar}", gambarId.toString()),
        {
          responseType: "blob",
        }
      );
      return response.data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to fetch protected image: ${errorMessage}`);
    }
  }


  /**
   * Upload an image
   * @param file The file to upload
   * @param gambarable_type The polymorphic type (e.g., "App\\Models\\Booking")
   * @param gambarable_id The ID of the parent model
   * @returns Promise with ApiResponse containing the created Gambar
   */
  static async uploadGambar({
    file,
    gambarable_type,
    gambarable_id,
  }: {
    file: File
    gambarable_type: string
    gambarable_id: number
  }): Promise<ApiResponse<Gambar>> {
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("gambarable_type", gambarable_type)
      formData.append("gambarable_id", gambarable_id.toString())

      const response = await api.post<ApiResponse<Gambar>>(
        ProtectedRoutes.UploadGambar,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      if (response.data.data) {
        return ApiResponse.fromApiSingle(response.data, (data) => new Gambar(data))
      } else {
        throw new Error("Failed to upload image: No data received")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      const errorGambar = new Gambar({
        id: 0,
        gambar_url: "",
        gambar_alt: null,
        gambar_title: null,
        path: "",
        gambarable_type: "",
        gambarable_id: 0,
        created_at: new Date(),
        updated_at: new Date(),
      })
      return new ApiResponse(
        errorGambar,
        "error",
        undefined,
        errorMessage
      )
    }
  }

  /**
   * Delete an image
   * @param gambarId The ID of the gambar to delete
   * @returns Promise with ApiResponse indicating success/failure
   */
  static async deleteGambar(gambarId: number): Promise<ApiResponse<void>> {
    try {
      const response = await api.delete<ApiResponse<void>>(
        ProtectedRoutes.DeleteGambar.replace('{gambar}', gambarId.toString())
      )

      return new ApiResponse(undefined, "success", undefined, response.data.message)
    } catch (error) {
      return new ApiResponse(
        undefined,
        "error",
        undefined,
        error instanceof Error ? error.message : String(error)
      )
    }
  }
}
