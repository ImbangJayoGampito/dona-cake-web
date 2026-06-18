import { AdminRoutes, StaffRoutes } from "@/lib/routes"
import ApiResponse from "@/lib/api/api-response"
import api from "@/lib/api/config"
import DashboardSummary, {
  RevenueChartPoint,
  OrderStatusBreakdown,
} from "@/models/dashboard-summary.model"

export type RevenuePeriode = "daily" | "weekly" | "monthly"

export class DashboardService {
  /**
   * GET /admin/dashboard
   * KPI utama: total user, pelanggan, produk, pesanan, pesanan baru, booking menunggu.
   */
  static async getSummary(): Promise<ApiResponse<DashboardSummary>> {
    try {
      const response = await api.get(AdminRoutes.AdminDashboard)
      return ApiResponse.fromApiSingle(
        response.data,
        (data) => new DashboardSummary(data)
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<DashboardSummary>(undefined, "error", undefined, message)
    }
  }

  /**
   * GET /staff/laporan/keuangan/chart?periode=daily
   * Dipakai untuk chart "Pendapatan 7 Hari Terakhir" di Dashboard Overview.
   * Endpoint ini sebenarnya milik modul Laporan Keuangan, dipakai ulang di sini
   * karena belum ada endpoint khusus overview — kalau backend menyediakan nanti
   * (mis. /admin/dashboard/chart), cukup ganti baris route di bawah ini saja.
   */
  static async getRevenueChart(
    periode: RevenuePeriode = "daily"
  ): Promise<ApiResponse<RevenueChartPoint[]>> {
    try {
      const response = await api.get(StaffRoutes.RevenueChart, {
        params: { periode },
      })
      return ApiResponse.fromApiArray(
        response.data,
        (data) =>
          new RevenueChartPoint({
            periode: data.periode,
            totalPendapatan: data.total_pendapatan,
            jumlahTransaksi: data.jumlah_transaksi,
          })
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<RevenueChartPoint[]>(undefined, "error", undefined, message)
    }
  }

  /**
   * TODO: BELUM ADA endpoint backend yang dikonfirmasi untuk breakdown status
   * pesanan (donut chart "Status Pesanan Hari Ini" di desain Stitch).
   *
   * Pendekatan sementara: derive secara kasar dari DashboardSummary yang sudah
   * ada (pesananBaru, bookingMenunggu, totalPesanan). Ini BUKAN breakdown akurat
   * karena summary tidak punya field "selesai"/"diproses"/"dikirim"/"dibatalkan"
   * secara terpisah — hanya dipakai supaya donut chart tidak kosong total
   * sementara menunggu backend. Ganti fungsi ini dengan fetch endpoint asli
   * begitu tersedia, dan hapus seluruh isi function ini.
   */
  static deriveOrderStatusBreakdown(
    summary: DashboardSummary
  ): OrderStatusBreakdown[] {
    const diketahui = summary.pesananBaru + summary.bookingMenunggu
    const sisaBelumDiketahui = Math.max(summary.totalPesanan - diketahui, 0)

    return [
      new OrderStatusBreakdown({
        status: "Menunggu",
        count: summary.pesananBaru,
        colorToken: "warning",
      }),
      new OrderStatusBreakdown({
        status: "Booking Pending",
        count: summary.bookingMenunggu,
        colorToken: "destructive",
      }),
      new OrderStatusBreakdown({
        status: "Lainnya (belum terklasifikasi)",
        count: sisaBelumDiketahui,
        colorToken: "muted",
      }),
    ]
  }
}
