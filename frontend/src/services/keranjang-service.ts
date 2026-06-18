import Kategori from "@/models/kategori.model"
import { PublicRoutes, ProtectedRoutes } from "@/lib/routes"
import ApiResponse from "@/lib/api/api-response"
import api from "@/lib/api/config"
import { RouteService } from "./route-service"
import { Keranjang } from "@/models/keranjang.model"
import type { StoreKeranjangRequest } from "@/types/keranjang.types"
export class KeranjangService {
  static async getKeranjang(): Promise<ApiResponse<Keranjang[]>> {
    try {
      const response = await api.get(ProtectedRoutes.Cart)
      return ApiResponse.fromApiArray<Keranjang>(
        response,
        (item) => new Keranjang(item)
      )
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      return new ApiResponse<Keranjang[]>(
        [],
        "error",
        undefined,
        msg,
        undefined
      )
    }
  }
  static async createKeranjang(
    keranjangItem: StoreKeranjangRequest
  ): Promise<ApiResponse<Keranjang>> {
    try {
      const response = await api.post(ProtectedRoutes.Cart, keranjangItem)
      return ApiResponse.fromApiSingle<Keranjang>(
        response,
        (item) => new Keranjang(item)
      )
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      return new ApiResponse<Keranjang>(
        undefined,
        "error",
        undefined,
        msg,
        undefined
      )
    }
  }
}
