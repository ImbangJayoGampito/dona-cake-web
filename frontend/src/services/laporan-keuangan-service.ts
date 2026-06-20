import { StaffRoutes, ProtectedRoutes } from "@/lib/routes"
import ApiResponse from "@/lib/api/api-response"
import api from "@/lib/api/config"
import { Transaksi } from "@/models/transaksi.model"
// ✅ Pakai TransaksiStatus dari enum yang sudah ada — bukan type duplikat
import { TransaksiStatus } from "@/types/enums"

export interface FinancialSummary {
  total_pendapatan: number
  jumlah_transaksi: number
  rata_rata_transaksi: number
}

export interface RevenueChartPoint {
  periode: string
  total_pendapatan: number
  jumlah_transaksi: number
}

export type RevenuePeriode = "daily" | "weekly" | "monthly"

export interface TransaksiListParams {
  page?: number
  search?: string
  status?: string
  metode?: string
  from?: string
  to?: string
}

export class LaporanKeuanganService {
  /**
   * GET /staff/laporan/keuangan
   * Mengembalikan summary agregat (total pendapatan, total transaksi, rata-rata).
   */
  static async getSummary(): Promise<ApiResponse<FinancialSummary>> {
    try {
      const response = await api.get(StaffRoutes.FinancialReport)
      const summary = response.data?.data?.summary ?? response.data?.data ?? {}
      return new ApiResponse<FinancialSummary>(
        {
          total_pendapatan: summary.total_pendapatan ?? 0,
          jumlah_transaksi: summary.jumlah_transaksi ?? 0,
          rata_rata_transaksi: summary.rata_rata_transaksi ?? 0,
        },
        "success"
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<FinancialSummary>(undefined, "error", undefined, message)
    }
  }

  /**
   * GET /staff/laporan/keuangan/chart?periode=daily|weekly|monthly
   */
  static async getRevenueChart(
    periode: RevenuePeriode = "daily"
  ): Promise<ApiResponse<RevenueChartPoint[]>> {
    try {
      const response = await api.get(StaffRoutes.RevenueChart, {
        params: { periode },
      })
      const data = response.data?.data ?? response.data ?? []
      const mapped: RevenueChartPoint[] = (Array.isArray(data) ? data : []).map(
        (item: any) => ({
          periode: item.periode ?? "",
          total_pendapatan: Number(item.total_pendapatan ?? 0),
          jumlah_transaksi: Number(item.jumlah_transaksi ?? 0),
        })
      )
      return new ApiResponse<RevenueChartPoint[]>(mapped, "success")
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<RevenueChartPoint[]>(undefined, "error", undefined, message)
    }
  }

  /**
   * GET /api/transaksi — semua transaksi toko (karena role admin).
   * Pakai model Transaksi yang sudah ada di src/models/transaksi.model.ts.
   */
  static async getTransaksi(
    params: TransaksiListParams = {}
  ): Promise<ApiResponse<Transaksi[]>> {
    try {
      const response = await api.get(ProtectedRoutes.Transactions, { params })
      return ApiResponse.fromApiArray(
        response.data,
        (data) => new Transaksi(data)
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<Transaksi[]>(undefined, "error", undefined, message)
    }
  }

  /** Export transaksi ke CSV — client-side tanpa library tambahan */
  static exportCSV(transaksis: Transaksi[], filename?: string): void {
    const headers = [
      "Tanggal",
      "No Pesanan",
      "Pelanggan",
      "Metode Pembayaran",
      "Jumlah Bayar",
      "Status",
    ]

    const rows = transaksis.map((t) => [
      t.getTanggalFormatted(),
      t.getNoPesanan(),
      t.getNamaPelanggan(),
      t.metode_pembayaran,
      t.jumlah_bayar,
      t.status_transaksi,
    ])

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n")

    // \uFEFF = BOM supaya Excel baca karakter Indonesia dengan benar
    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute(
      "download",
      filename ?? `laporan-transaksi-${new Date().toISOString().slice(0, 10)}.csv`
    )
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  /** Export transaksi ke PDF — pakai jspdf + jspdf-autotable (dynamic import) */
  static async exportPDF(transaksis: Transaksi[], filename?: string): Promise<void> {
    const { default: jsPDF } = await import("jspdf")
    const { default: autoTable } = await import("jspdf-autotable")

    const doc = new jsPDF()
    doc.setFontSize(14)
    doc.text("Laporan Riwayat Transaksi - Dona Cake", 14, 15)
    doc.setFontSize(9)
    doc.setTextColor(100)
    doc.text(
      `Dicetak: ${new Date().toLocaleDateString("id-ID", { dateStyle: "long" })}`,
      14,
      22
    )

    autoTable(doc, {
      head: [["Tanggal", "No Pesanan", "Pelanggan", "Metode", "Jumlah Bayar", "Status"]],
      body: transaksis.map((t) => [
        t.getTanggalFormatted(),
        t.getNoPesanan(),
        t.getNamaPelanggan(),
        t.metode_pembayaran,
        t.getJumlahFormatted(),
        t.status_transaksi,
      ]),
      startY: 28,
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: { fillColor: [201, 149, 108] },
      alternateRowStyles: { fillColor: [247, 245, 243] },
    })

    doc.save(
      filename ?? `laporan-transaksi-${new Date().toISOString().slice(0, 10)}.pdf`
    )
  }
}
