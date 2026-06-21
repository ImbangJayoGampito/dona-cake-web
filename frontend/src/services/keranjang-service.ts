import Kategori from "@/models/kategori.model"
import { PublicRoutes, ProtectedRoutes } from "@/lib/routes"
import ApiResponse from "@/lib/api/api-response"
import api from "@/lib/api/config"
import { RouteService } from "./route-service"
import { Keranjang } from "@/models/keranjang.model"
import type { KeranjangResponse } from "@/types/keranjang.types"
import type { StoreKeranjangRequest } from "@/types/keranjang.types"
export class KeranjangService {
  // In your service
  static async updateKeranjang(
    id: number,
    keranjangItem: Keranjang
  ): Promise<ApiResponse<KeranjangResponse>> {
    try {
      console.log("update", keranjangItem)
      const url = RouteService.replaceParams(ProtectedRoutes.CartItem, {
        id: String(id),
      })
      const response = await api.put(url, keranjangItem)

      const result = ApiResponse.fromApiSingle<KeranjangResponse>(
        response.data,
        (data) => {
          console.log("🔄 Mapping data:", data)
          return {
            items: (data.items || []).map((item: any) => new Keranjang(item)),
            total_harga: data.total_harga || 0,
            jumlah_item: data.jumlah_item || 0,
          }
        }
      )
      return result
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      return ApiResponse.fromApiSingle<KeranjangResponse>(null, undefined)
    }
  }

  static async getKeranjang(): Promise<ApiResponse<KeranjangResponse>> {
    try {
      const response = await api.get(ProtectedRoutes.Cart)

      console.log("📥 Raw response:", response)
      console.log("📥 Response data:", response.data)

      // ✅ Pass the FULL response, not response.data
      const result = ApiResponse.fromApiSingle<KeranjangResponse>(
        response.data, // ← Pass full response
        (data) => {
          console.log("🔄 Mapping data:", data)
          return {
            items: (data.items || []).map((item: any) => new Keranjang(item)),
            total_harga: data.total_harga || 0,
            jumlah_item: data.jumlah_item || 0,
          }
        }
      )

      console.log("📦 Result:", result)
      return result
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      console.error("❌ Error fetching cart:", error)

      return new ApiResponse<KeranjangResponse>(
        undefined,
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
      const resp = ApiResponse.fromApiSingle<Keranjang>(
        response.data,
        (item) => {
          return new Keranjang(item)
        }
      )
      console.log(resp)
      return resp
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      console.log(error)
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
