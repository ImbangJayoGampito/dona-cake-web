import { PublicRoutes, ProductManagementRoutes } from "@/lib/routes"
import ApiResponse from "@/lib/api/api-response"
import api from "@/lib/api/config"
import { RouteService } from "@/services/route-service"
import { Produk } from "@/models/produk.model"
import Kategori from "@/models/kategori.model"
import { Gambar } from "@/models/gambar.model"
import { ProtectedRoutes } from "@/lib/routes"

export interface ProdukListParams {
  page?: number
  search?: string
  kategori_id?: number
}

export interface UpdateProdukPayload {
  nama_produk: string
  harga: number
  stok: number
  deskripsi?: string
  kategori_id: number | null
}

export interface UploadGambarPayload {
  file: File
  gambarable_type?: string
  gambarable_id?: number
}

export class ManajemenProdukService {
  /**
   * GET /produk — list produk dengan pagination + relasi gambar_utama & kategori.
   * Memakai endpoint publik (tidak butuh auth khusus admin) karena
   * ProductManagementRoutes hanya berisi write operations (POST/PATCH/DELETE).
   */
  static async getProduk(
    params: ProdukListParams = {}
  ): Promise<ApiResponse<Produk[]>> {
    try {
      const response = await api.get(PublicRoutes.Products, { params })
      return ApiResponse.fromApiArray(
        response.data,
        (data) => new Produk(data)
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<Produk[]>(undefined, "error", undefined, message)
    }
  }

  /**
   * GET /produk/{id} — detail produk termasuk semua gambars (bukan cuma gambarUtama).
   * Dipanggil saat modal edit dibuka supaya semua foto produk tersedia.
   */
  static async getProdukDetail(id: number): Promise<ApiResponse<Produk>> {
    try {
      const url = RouteService.replaceParams(PublicRoutes.ProductDetail, {
        id: id.toString(),
      })
      const response = await api.get(url)
      return ApiResponse.fromApiSingle(
        response.data,
        (data) => new Produk(data)
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<Produk>(undefined, "error", undefined, message)
    }
  }
  /**
   * POST /produk — membuat produk baru.
   */
  static async createProduk(
    payload: UpdateProdukPayload
  ): Promise<ApiResponse<Produk>> {
    try {
      const response = await api.post(ProductManagementRoutes.CreateProduct, payload)
      return ApiResponse.fromApiSingle(
        response.data,
        (data) => new Produk(data)
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<Produk>(undefined, "error", undefined, message)
    }
  }

  /**
   * PUT /produk/{produk} — update nama, harga, stok, deskripsi, kategori_id.
   * Gambar dikelola terpisah via endpoint /gambar/upload dan /gambar/{id}.
   */
  static async updateProduk(
    id: number,
    payload: UpdateProdukPayload
  ): Promise<ApiResponse<Produk>> {
    try {
      const url = RouteService.replaceParams(ProductManagementRoutes.UpdateProduct, {
        produk: id.toString(),
      })
      const response = await api.put(url, payload)
      return ApiResponse.fromApiSingle(
        response.data,
        (data) => new Produk(data)
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<Produk>(undefined, "error", undefined, message)
    }
  }

  /**
   * DELETE /produk/{produk} — hapus produk (dan gambar terkait via cascade backend).
   */
  static async deleteProduk(id: number): Promise<ApiResponse<void>> {
    try {
      const url = RouteService.replaceParams(ProductManagementRoutes.DeleteProduct, {
        produk: id.toString(),
      })
      const response = await api.delete(url)
      return ApiResponse.fromApiSingle(response.data)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<void>(undefined, "error", undefined, message)
    }
  }

  /**
   * POST /gambar/upload — upload gambar baru dan hubungkan ke produk.
   * Alur: upload dulu, dapat gambar_url dari response, gambar otomatis
   * terhubung ke produk via gambarable_type + gambarable_id.
   */
  static async uploadGambar(
    payload: UploadGambarPayload
  ): Promise<ApiResponse<Gambar>> {
    try {
      const formData = new FormData()
      formData.append("file", payload.file)
      if (payload.gambarable_type) {
        formData.append("gambarable_type", payload.gambarable_type)
      }
      if (payload.gambarable_id !== undefined) {
        formData.append("gambarable_id", payload.gambarable_id.toString())
      }
      const response = await api.post(ProtectedRoutes.UploadGambar, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return ApiResponse.fromApiSingle(
        response.data,
        (data) => new Gambar(data)
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<Gambar>(undefined, "error", undefined, message)
    }
  }

  /**
   * DELETE /gambar/{gambar} — hapus gambar (fisik + record DB).
   * Dipanggil saat user klik hapus foto di modal edit.
   */
  static async deleteGambar(gambarId: number): Promise<ApiResponse<void>> {
    try {
      const url = RouteService.replaceParams(ProtectedRoutes.DeleteGambar, {
        gambar: gambarId.toString(),
      })
      const response = await api.delete(url)
      return ApiResponse.fromApiSingle(response.data)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<void>(undefined, "error", undefined, message)
    }
  }

  /**
   * GET /kategori — list semua kategori untuk dropdown di modal edit.
   * Memakai PublicRoutes.Kategori karena endpoint ini tidak butuh auth.
   */
  static async getKategori(): Promise<ApiResponse<Kategori[]>> {
    try {
      const response = await api.get(PublicRoutes.Kategori)
      return ApiResponse.fromApiArray(
        response.data,
        (data) => new Kategori(data)
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<Kategori[]>(undefined, "error", undefined, message)
    }
  }
}
