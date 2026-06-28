import { PublicRoutes, ProtectedRoutes } from "@/lib/routes"
import ApiResponse from "@/lib/api/api-response"
import api from "@/lib/api/config"
import { RouteService } from "./route-service"
import { Ulasan } from "@/models/ulasan.model"
import type { CreateUlasanPayload, UpdateUlasanPayload } from "@/types/ulasan.types"
export class UlasanService {
  static async getAllUlasanOnProdukId(
    id: number
  ): Promise<ApiResponse<Ulasan[]>> {
    try {
      const url = `${PublicRoutes.Ulasan}?produk_id=${id}`
      const response = await api.get(url)
      return ApiResponse.fromApiArray<Ulasan>(response.data)
    } catch (error: any) {
      const message = error.response?.data?.message || (error instanceof Error ? error.message : String(error))
      return new ApiResponse<Ulasan[]>([], "error", undefined, message)
    }
  }
  static async createUlasan(payload: CreateUlasanPayload): Promise<ApiResponse<Ulasan>> {
    const url = ProtectedRoutes.CreateUlasan
    try {
      const response = await api.post(url, payload)
      return ApiResponse.fromApiSingle<Ulasan>(response.data)
    } catch (error: any) {
      const message = error.response?.data?.message || (error instanceof Error ? error.message : String(error))
      return new ApiResponse<Ulasan>(new Ulasan(), "error", undefined, message)
    }
  }
  static async updateUlasan(id: number, payload: UpdateUlasanPayload): Promise<ApiResponse<Ulasan>> {
    const url = RouteService.replaceParams(ProtectedRoutes.UpdateUlasan, {
      id: id.toString(),
    })
    try {
      const response = await api.put(url, payload)
      return ApiResponse.fromApiSingle<Ulasan>(response.data)
    } catch (error: any) {
      const message = error.response?.data?.message || (error instanceof Error ? error.message : String(error))
      return new ApiResponse<Ulasan>(new Ulasan(), "error", undefined, message)
    }
  }
  static async deleteUlasan(id: number): Promise<ApiResponse<null>> {
    const url = RouteService.replaceParams(ProtectedRoutes.DeleteUlasan, {
      id: id.toString(),
    })
    try {
      const response = await api.delete(url)
      return ApiResponse.fromApiSingle<null>(response.data)
    } catch (error: any) {
      const message = error.response?.data?.message || (error instanceof Error ? error.message : String(error))
      return new ApiResponse(null, "error", undefined, message)
    }
  }
}
