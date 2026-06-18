import { Produk } from "@/models/produk.model"
import { PublicRoutes, ProtectedRoutes } from "@/lib/routes"
import ApiResponse from "@/lib/api/api-response"
import api from "@/lib/api/config"
import { RouteService } from "./route-service"

export class ProdukService {
  // Helper
  static formatPrice(price: number): string {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }
  static async addToCart(
    product: Produk,
    quantity: number
  ): Promise<ApiResponse<void>> {
    try {
      const url = RouteService.replaceParams(ProtectedRoutes.CartItem, {
        id: product.id.toString(),
      })
      const response = await api.post(url, {
        produk_id: product.id,
        kuantitas: quantity,
      })
      return ApiResponse.fromApiSingle(response.data)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<void>(undefined, "error", undefined, message)
    }
  }

  static async getProductById(id: number): Promise<ApiResponse<Produk>> {
    try {
      const url = RouteService.replaceParams(PublicRoutes.ProductDetail, {
        id: id.toString(),
      })
      const response = await api.get(url)
      // ✅ Map raw data to Produk instance
      return ApiResponse.fromApiSingle(
        response.data,
        (data) => new Produk(data)
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<Produk>(undefined, "error", undefined, message)
    }
  }

  static async getProducts(): Promise<ApiResponse<Produk[]>> {
    try {
      const url = PublicRoutes.Products
      const response = await api.get(url)
      // ✅ Map each item to Produk instance
      return ApiResponse.fromApiArray(response.data, (data) => new Produk(data))
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<Produk[]>(undefined, "error", undefined, message)
    }
  }

  static async getRecommendations(): Promise<ApiResponse<Produk[]>> {
    try {
      const url = ProtectedRoutes.Recommendations
      const response = await api.get(url)
      return ApiResponse.fromApiArray(response.data, (data) => new Produk(data))
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<Produk[]>(undefined, "error", undefined, message)
    }
  }

  static async getPopularProducts(): Promise<ApiResponse<Produk[]>> {
    try {
      const url = ProtectedRoutes.PopularProducts
      const response = await api.get(url)
      return ApiResponse.fromApiArray(response.data, (data) => new Produk(data))
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<Produk[]>(undefined, "error", undefined, message)
    }
  }
}
