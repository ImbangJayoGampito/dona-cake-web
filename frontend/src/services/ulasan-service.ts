import { Produk } from "@/models/produk.model"
import { PublicRoutes, ProtectedRoutes } from "@/lib/routes"
import ApiResponse from "@/lib/api/api-response"
import api from "@/lib/api/config"
import { RouteService } from "./route-service"
import { Ulasan } from "@/models/ulasan.model"
export class UlasanService {
  static async getAllUlasanOnProdukId(
    id: number
  ): Promise<ApiResponse<Ulasan[]>> {
    try {
      const url = `${PublicRoutes.Ulasan}?produk_id=${id}`
      const response = await api.get(url)
      return ApiResponse.fromApiArray<Ulasan>(response.data)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<Ulasan[]>([], "error", undefined, message)
    }
  }
  static async createUlasan(ulasan: Ulasan): Promise<ApiResponse<null>> {
    const url = ProtectedRoutes.CreateUlasan
    try {
      const response = await api.post(url, ulasan)
      return ApiResponse.fromApiSingle<null>(response.data)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse(null, "error", undefined, message)
    }
  }
  static async updateUlasan(ulasan: Ulasan): Promise<ApiResponse<null>> {
    const url = RouteService.replaceParams(ProtectedRoutes.UpdateUlasan, {
      id: ulasan.id.toString(),
    })
    try {
      const response = await api.put(url, ulasan)
      return ApiResponse.fromApiSingle<null>(response.data)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse(null, "error", undefined, message)
    }
  }
  static async deleteUlasan(id: number): Promise<ApiResponse<null>> {
    const url = RouteService.replaceParams(ProtectedRoutes.DeleteUlasan, {
      id: id.toString(),
    })
    try {
      const response = await api.delete(url)
      return ApiResponse.fromApiSingle<null>(response.data)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse(null, "error", undefined, message)
    }
  }
}
