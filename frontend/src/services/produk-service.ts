import { Produk } from "@/models/produk.model"
import { PublicRoutes, ProtectedRoutes } from "@/lib/routes"
import ApiResponse from "@/lib/api/api-response"
import api from "@/lib/api/config"
import { RouteService } from "./route-service"
import { CurrencyService } from "./currency-service"
import type { ProdukFilters } from "@/types/produk.types"

export class ProdukService {
  static buildParams(filters: ProdukFilters): string {
    // Create URLSearchParams and add only non-empty filters
    const searchParams = new URLSearchParams()

    // Add filters only if they have values
    if (filters.search?.trim()) {
      searchParams.append("search", filters.search.trim())
    }

    if (filters.kategori?.trim()) {
      searchParams.append("kategori", filters.kategori.trim())
    }

    if (filters.harga_min !== undefined && filters.harga_min > 0) {
      searchParams.append("harga_min", filters.harga_min.toString())
    }

    if (filters.harga_max !== undefined && filters.harga_max > 0) {
      searchParams.append("harga_max", filters.harga_max.toString())
    }

    if (filters.sort_by) {
      searchParams.append("sort_by", filters.sort_by)
    }

    if (filters.sort_order) {
      searchParams.append("sort_order", filters.sort_order)
    }

    if (filters.per_page) {
      searchParams.append("per_page", filters.per_page.toString())
    }

    if (filters.page) {
      searchParams.append("page", filters.page.toString())
    }

    // Build final URL with query string
    const queryString = searchParams.toString()
    return queryString
  }
  static async searchProducts(
    filters: ProdukFilters
  ): Promise<ApiResponse<Produk[]>> {
    try {
      const params = ProdukService.buildParams(filters) // string
      const response = await api.get(PublicRoutes.Products, {
        params: new URLSearchParams(params), // or pass the filters object directly to axios
      })
      return ApiResponse.fromApiArray(response.data, (item) => new Produk(item))
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      return new ApiResponse<Produk[]>([], "error", undefined, msg)
    }
  }
  static formatPrice(price: number): string {
    return CurrencyService.formatPrice(price)
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
