import { Wallet, ShoppingBasket, Users, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import DashboardSummary from "@/models/dashboard-summary.model"

interface KpiCardGridProps {
  summary: DashboardSummary
}

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value)
}

export default function KpiCardGrid({ summary }: KpiCardGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Pendapatan — field belum dikonfirmasi backend, fallback "—" */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F5EAE0]">
              <Wallet className="h-[18px] w-[18px] text-[#C9956C]" strokeWidth={1.75} />
            </div>
            {summary.trendPendapatanPct !== null && (
              <span
                className={cn(
                  "text-xs font-medium",
                  summary.trendPendapatanPct >= 0 ? "text-[#2E7D52]" : "text-[#D94F4F]"
                )}
              >
                {summary.trendPendapatanPct >= 0 ? "↑" : "↓"}{" "}
                {Math.abs(summary.trendPendapatanPct)}%
              </span>
            )}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Total Pendapatan</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">
            {summary.totalPendapatanHariIni !== null
              ? formatRupiah(summary.totalPendapatanHariIni)
              : "—"}
          </p>
        </CardContent>
      </Card>

      {/* Total Pesanan */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F5EAE0]">
              <ShoppingBasket className="h-[18px] w-[18px] text-[#C9956C]" strokeWidth={1.75} />
            </div>
            <span className="text-xs text-muted-foreground">Hari ini</span>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Total Pesanan</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">
            {summary.totalPesanan}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {summary.pesananBaru} baru
          </p>
        </CardContent>
      </Card>

      {/* Pengguna Aktif */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F5EAE0]">
              <Users className="h-[18px] w-[18px] text-[#C9956C]" strokeWidth={1.75} />
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Pengguna Aktif</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">
            {summary.totalUsers}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {summary.totalPelanggan} pelanggan
          </p>
        </CardContent>
      </Card>

      {/* Booking Custom Pending — highlight urgent kalau ada yang menunggu */}
      <Card
        className={cn(
          summary.bookingMenunggu > 0 && "border-[#B45309]/40 bg-[#FEF3E2]"
        )}
      >
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FEF3E2]">
              <AlertTriangle className="h-[18px] w-[18px] text-[#B45309]" strokeWidth={1.75} />
            </div>
            {summary.bookingMenunggu > 0 && (
              <span className="text-xs font-semibold uppercase tracking-wide text-[#B45309]">
                Urgent
              </span>
            )}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Booking Custom Pending
          </p>
          <p
            className={cn(
              "mt-1 text-2xl font-semibold",
              summary.bookingMenunggu > 0 ? "text-[#B45309]" : "text-foreground"
            )}
          >
            {summary.bookingMenunggu}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
