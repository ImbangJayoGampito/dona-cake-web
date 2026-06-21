/**
 * Model untuk response GET /admin/dashboard.
 *
 * Field di bagian "DIKONFIRMASI" sesuai contoh response backend.
 * Field di bagian "BELUM DIKONFIRMASI" ada di desain Stitch (KPI Total Pendapatan,
 * tren persentase) tapi tidak ada di contoh response yang diberikan backend.
 * Default-nya null, bukan 0, supaya UI bisa membedakan "datanya nol" vs
 * "backend belum kirim field ini" — lihat penggunaannya di KpiCardGrid.
 *
 * TODO: setelah backend mengonfirmasi field ini ada (atau memang tidak ada dan
 * harus dihitung di frontend dari data lain), hapus komentar ini dan ganti
 * tipe ke `number` (tanpa null) jika sudah pasti selalu ada.
 */
export default class DashboardSummary {
  // --- DIKONFIRMASI (sesuai contoh response backend) ---
  totalUsers: number
  totalPelanggan: number
  totalProduk: number
  totalPesanan: number
  pesananBaru: number
  bookingMenunggu: number
  statusBreakdown: Record<string, number>

  // --- BELUM DIKONFIRMASI (ada di desain, belum ada di contoh response) ---
  totalPendapatanHariIni: number | null
  trendPendapatanPct: number | null

  public constructor(data: Record<string, any> = {}) {
    this.totalUsers = data.totalUsers ?? data.total_users ?? 0
    this.totalPelanggan = data.totalPelanggan ?? data.total_pelanggan ?? 0
    this.totalProduk = data.totalProduk ?? data.total_produk ?? 0
    this.totalPesanan = data.totalPesanan ?? data.total_pesanan ?? 0
    this.pesananBaru = data.pesananBaru ?? data.pesanan_baru ?? 0
    this.bookingMenunggu = data.bookingMenunggu ?? data.booking_menunggu ?? 0
    this.statusBreakdown = data.statusBreakdown ?? data.status_breakdown ?? {}

    this.totalPendapatanHariIni = data.totalPendapatanHariIni ?? data.total_pendapatan_hari_ini ?? null
    this.trendPendapatanPct = data.trendPendapatanPct ?? data.trend_pendapatan_pct ?? null
  }
}

/**
 * Satu titik data pada chart pendapatan (GET /staff/laporan/keuangan/chart).
 * Pola field di sini ikut snake_case asli backend (periode, total_pendapatan,
 * jumlah_transaksi) karena dipetakan apa adanya tanpa relabeling — beri nama
 * field camelCase di constructor agar konsisten dengan konvensi TS di project.
 */
export class RevenueChartPoint {
  periode: string // format "YYYY-MM-DD" untuk periode=daily
  totalPendapatan: number
  jumlahTransaksi: number

  public constructor(data: Partial<RevenueChartPoint> = {}) {
    this.periode = data.periode ?? ""
    this.totalPendapatan = data.totalPendapatan ?? 0
    this.jumlahTransaksi = data.jumlahTransaksi ?? 0
  }
}

/**
 * Breakdown status pesanan untuk donut chart "Status Pesanan Hari Ini".
 *
 * TODO: BELUM ADA endpoint yang dikonfirmasi untuk data ini. Sementara dihitung
 * di frontend dari field yang ada (pesananBaru, bookingMenunggu, dst) sebagai
 * pendekatan sangat kasar — lihat `deriveOrderStatusBreakdown` di dashboard-service.ts.
 * Begitu backend punya endpoint pasti, ganti pendekatan ini dengan fetch langsung.
 */
export class OrderStatusBreakdown {
  status: string
  count: number
  colorToken: string // dipetakan ke warna brand, lihat OrderStatusDonut.tsx

  public constructor(data: Partial<OrderStatusBreakdown> = {}) {
    this.status = data.status ?? ""
    this.count = data.count ?? 0
    this.colorToken = data.colorToken ?? "muted"
  }
}
