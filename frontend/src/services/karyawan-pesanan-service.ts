// =============================================================================
// KARYAWAN — Pesanan Service (KDS)
// Endpoint: /pesanan & /staff/dashboard
// Sesuai api.php routes
// =============================================================================

import { StaffRoutes, ProtectedRoutes, UpdateOrderStatus } from "@/lib/routes"
import ApiResponse from "@/lib/api/api-response"
import api from "@/lib/api/config"
import { RouteService } from "@/services/route-service"
import type { Pesanan, StaffDashboardStats, StatusKDS } from "@/types/karyawan.types"

export class KaryawanPesananService {
  /**
   * GET /pesanan — ambil semua pesanan dengan filter status untuk KDS.
   * Karyawan hanya melihat pesanan yang relevan: dibayar, diproses, selesai.
   */
  static async getPesananKDS(): Promise<ApiResponse<Pesanan[]>> {
    try {
      // Ambil pesanan yang relevan untuk KDS dalam satu request
      const response = await api.get(ProtectedRoutes.Orders, {
        params: {
          status: "dibayar,diproses,selesai",
          today: true,
        },
      })
      return ApiResponse.fromApiArray(response.data, (data) => data as Pesanan)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<Pesanan[]>(undefined, "error", undefined, message)
    }
  }

  /**
   * PUT /pesanan/{id}/status — update status pesanan.
   * Endpoint: UpdateOrderStatus = "/pesanan/{id}/status"
   * Middleware: role:admin,karyawan (sesuai api.php)
   */
  static async updateStatusPesanan(
    id: number,
    status: StatusKDS
  ): Promise<ApiResponse<Pesanan>> {
    try {
      const url = RouteService.replaceParams(UpdateOrderStatus, {
        id: id.toString(),
      })
      const response = await api.put(url, { status_pesanan: status })
      return ApiResponse.fromApiSingle(
        response.data,
        (data) => data as Pesanan
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<Pesanan>(undefined, "error", undefined, message)
    }
  }

  /**
   * GET /staff/dashboard — ambil statistik untuk 4 KPI card di atas KDS.
   * Endpoint: StaffRoutes.Dashboard = "/staff/dashboard"
   */
  static async getDashboardStats(): Promise<ApiResponse<StaffDashboardStats>> {
    try {
      const response = await api.get(StaffRoutes.Dashboard)
      // Backend mengembalikan data di dalam field 'data'
      const raw = response.data?.data ?? response.data
      const stats: StaffDashboardStats = {
        pesanan_hari_ini: raw.pesanan_hari_ini ?? raw.total_pesanan ?? 0,
        sedang_diproses: raw.sedang_diproses ?? raw.diproses ?? 0,
        siap_diambil: raw.siap_diambil ?? raw.siap ?? 0,
        pending: raw.pending ?? raw.menunggu ?? 0,
      }
      return new ApiResponse<StaffDashboardStats>(stats, "success")
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<StaffDashboardStats>(
        undefined,
        "error",
        undefined,
        message
      )
    }
  }
}
