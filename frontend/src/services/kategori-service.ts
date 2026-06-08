import Kategori from "@/models/kategori.model"
import { PublicRoutes, ProtectedRoutes } from "@/lib/routes"
import ApiResponse from "@/lib/api/api-response"
import api from "@/lib/api/config"
import { RouteService } from "./route-service"

export class KategoriService {
  public static async getAllKategori(): Promise<ApiResponse<Kategori[]>> {
    try {
      const response = await api.get(PublicRoutes.Kategori)
      const data = response.data
      return ApiResponse.fromApiArray(data, (item) => new Kategori(item))
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<Kategori[]>([], "error", undefined, message)
    }
  }
}
