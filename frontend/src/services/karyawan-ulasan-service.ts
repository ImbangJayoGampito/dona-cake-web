// =============================================================================
// KARYAWAN — Ulasan Service (Reviews)
// Endpoint: /ulasan (GET, POST reply)
// Sesuai api.php routes
// =============================================================================

import { PublicRoutes } from "@/lib/routes"
import ApiResponse from "@/lib/api/api-response"
import api from "@/lib/api/config"
import { RouteService } from "@/services/route-service"
import type { Ulasan, UlasanStats, FilterUlasan } from "@/types/karyawan.types"

// Endpoint balas ulasan — tidak ada di routes.tsx, didefinisikan lokal
const ULASAN_BALAS_ENDPOINT = "/ulasan/{id}/balas"

export interface BalasUlasanPayload {
  balasan: string
}

export class KaryawanUlasanService {
  /**
   * GET /ulasan — list ulasan dengan filter.
   * Menggunakan PublicRoutes.Ulasan karena endpoint GET /ulasan tidak butuh auth.
   * Filter: semua | belum_dibalas | bintang_rendah (rating ≤ 2)
   */
  static async getUlasan(
    filter: FilterUlasan = "semua",
    page = 1,
    search?: string
  ): Promise<ApiResponse<Ulasan[]>> {
    try {
      const params: Record<string, string | number> = { page }
      if (filter !== "semua") params.filter = filter
      if (search) params.search = search

      const response = await api.get(PublicRoutes.Ulasan, { params })
      return ApiResponse.fromApiArray(response.data, (data) => data as Ulasan)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<Ulasan[]>(undefined, "error", undefined, message)
    }
  }

  /**
   * GET /ulasan/stats — statistik ulasan untuk 3 KPI card.
   * Catatan: endpoint ini mungkin belum ada di backend. Jika 404,
   * gunakan data aggregate dari GET /ulasan response.
   */
  static async getUlasanStats(): Promise<ApiResponse<UlasanStats>> {
    try {
      const response = await api.get("/ulasan/stats")
      return ApiResponse.fromApiSingle(
        response.data,
        (data) => data as UlasanStats
      )
    } catch {
      // Fallback: derive stats dari list ulasan
      try {
        const listRes = await api.get(PublicRoutes.Ulasan, {
          params: { per_page: 9999 },
        })
        const items: Ulasan[] = (listRes.data?.data ?? []) as Ulasan[]
        const stats: UlasanStats = {
          rating_rata_rata:
            items.length > 0
              ? parseFloat(
                  (
                    items.reduce((sum, u) => sum + u.rating, 0) / items.length
                  ).toFixed(1)
                )
              : 0,
          total_ulasan: items.length,
          ulasan_baru: items.filter((u) => !u.balasan).length,
        }
        return new ApiResponse<UlasanStats>(stats, "success")
      } catch (fallbackError) {
        const message =
          fallbackError instanceof Error
            ? fallbackError.message
            : String(fallbackError)
        return new ApiResponse<UlasanStats>(undefined, "error", undefined, message)
      }
    }
  }

  /**
   * POST /ulasan/{id}/balas — kirim balasan ulasan.
   * Endpoint ini belum ada di api.php — perlu ditambahkan di backend.
   * Method: POST, Auth: role:admin,karyawan
   */
  static async balasUlasan(
    id: number,
    payload: BalasUlasanPayload
  ): Promise<ApiResponse<Ulasan>> {
    try {
      const url = RouteService.replaceParams(ULASAN_BALAS_ENDPOINT, {
        id: id.toString(),
      })
      const response = await api.post(url, payload)
      return ApiResponse.fromApiSingle(
        response.data,
        (data) => data as Ulasan
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<Ulasan>(undefined, "error", undefined, message)
    }
  }
}
