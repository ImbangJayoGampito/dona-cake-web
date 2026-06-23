import type { CreatePesananPayload } from "@/types/pesanan.types"
import { Pesanan } from "@/models/pesanan.model"
import api from "@/lib/api/config"
import ApiResponse from "@/lib/api/api-response"
import { ProtectedRoutes } from "@/lib/routes"
import { RouteService } from "./route-service"
export class PesananService {
  static async getPesanan(): Promise<ApiResponse<Pesanan[]>> {
    try {
      const response = await api.get(ProtectedRoutes.Orders)
      return ApiResponse.fromApiArray(
        response.data,
        (data) => new Pesanan(data)
      )
    } catch (error) {
      return new ApiResponse<Pesanan[]>(
        undefined,
        "error",
        undefined,
        "Failed to get pesanan" +
          (error instanceof Error ? error.message : String(error))
      )
    }
  }
  static async cancelPesanan(pesanan: Pesanan): Promise<ApiResponse<Pesanan>> {
    try {
      const url = RouteService.replaceParams(ProtectedRoutes.CancelOrder, {
        id: pesanan.id.toString(),
      })
      const response = await api.post(url)
      return ApiResponse.fromApiSingle(
        response.data,
        (data) => new Pesanan(data)
      )
    } catch (error) {
      return new ApiResponse<Pesanan>(
        undefined,
        "error",
        undefined,
        "Failed to cancel pesanan" +
          (error instanceof Error ? error.message : String(error))
      )
    }
  }
  static async createPesanan(pesanan: Pesanan): Promise<ApiResponse<Pesanan>> {
    try {
      // Prepare payload from Pesanan instance
      const payload: CreatePesananPayload = {
        items:
          pesanan.itemPesanans?.map((item) => ({
            produk_id: item.produk_id,
            kuantitas: item.kuantitas,
            catatan: "Pesanan sudah dibuat",
          })) ?? [],
      }


      const response = await api.post(ProtectedRoutes.Orders, payload)
      return ApiResponse.fromApiSingle(
        response.data,
        (data) => new Pesanan(data)
      )
    } catch (error) {
      return new ApiResponse<Pesanan>(
        undefined,
        "error",
        undefined,
        "Failed to create pesanan" +
          (error instanceof Error ? error.message : String(error))
      )
    }
  }
}
