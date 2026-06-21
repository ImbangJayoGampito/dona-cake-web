import { useEffect, useState } from "react"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import KpiCardGrid from "./components/KpiCardGrid"
import RevenueChart from "./components/RevenueChart"
import OrderStatusDonut from "./components/OrderStatusDonut"
import RecentOrdersTable, { type RecentOrderRow } from "./components/RecentOrdersTable"
import ActivityFeed, { type ActivityItem } from "./components/ActivityFeed"
import { DashboardService } from "@/services/dashboard-service"
import type DashboardSummary from "@/models/dashboard-summary.model"
import type {
  RevenueChartPoint,
  OrderStatusBreakdown,
} from "@/models/dashboard-summary.model"
import api from "@/lib/api/config"
import { ProtectedRoutes } from "@/lib/routes"

export default function DashboardOverview() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [chartData, setChartData] = useState<RevenueChartPoint[]>([])
  const [donutData, setDonutData] = useState<OrderStatusBreakdown[]>([])
  const [recentOrders, setRecentOrders] = useState<RecentOrderRow[]>([])
  const [recentActivities, setRecentActivities] = useState<ActivityItem[]>([])

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true)
      setError(null)
      try {
        const [summaryRes, chartRes, ordersRes, notifRes] = await Promise.all([
          DashboardService.getSummary(),
          DashboardService.getRevenueChart("daily"),
          api.get(ProtectedRoutes.Orders, { params: { per_page: 5 } }).catch(() => null),
          api.get(ProtectedRoutes.Notifications, { params: { per_page: 5 } }).catch(() => null)
        ])

        if (summaryRes.isSuccess() && summaryRes.data) {
          setSummary(summaryRes.data)
          // Derive order status breakdown for donut chart
          const breakdown = DashboardService.deriveOrderStatusBreakdown(
            summaryRes.data
          )
          setDonutData(breakdown)
        } else {
          setError(summaryRes.message || "Gagal memuat ringkasan dashboard.")
        }

        if (chartRes.isSuccess() && chartRes.data) {
          setChartData(chartRes.data)
        }

        // Map real orders
        if (ordersRes && (ordersRes.data?.data || ordersRes.data)) {
          const rawOrders = (ordersRes.data?.data ?? ordersRes.data ?? []) as any[]
          const mappedOrders = rawOrders.map((o) => {
            let uiStatus = "Menunggu"
            if (["selesai"].includes(o.status_pesanan)) uiStatus = "Selesai"
            else if (["dibayar", "diproses"].includes(o.status_pesanan)) uiStatus = "Diproses"
            else if (["dibatalkan", "pembayaran_dibatalkan"].includes(o.status_pesanan)) uiStatus = "Dibatalkan"
            
            return {
              id: String(o.id),
              noPesanan: `#ORD-${String(o.id).padStart(4, "0")}`,
              namaPelanggan: o.pelanggan?.user?.name ?? "Pelanggan",
              lokasi: o.pelanggan?.alamat ?? undefined,
              total: Number(o.total_harga || 0),
              status: uiStatus,
            }
          })
          setRecentOrders(mappedOrders)
        }

        // Map real activities (notifications for staff/admin)
        if (notifRes && (notifRes.data?.data || notifRes.data)) {
          const rawNotifs = (notifRes.data?.data ?? notifRes.data ?? []) as any[]
          const mappedActivities = rawNotifs.map((n) => {
            let variant: "default" | "warning" | "danger" | "info" = "default"
            if (n.tipe === "system") variant = "info"
            else if (n.tipe === "booking") variant = "warning"
            else if (n.tipe === "payment") variant = "default"
            
            const createdAt = new Date(n.created_at)
            const diff = new Date().getTime() - createdAt.getTime()
            const minutes = Math.floor(diff / 60000)
            const hours = Math.floor(minutes / 60)
            const days = Math.floor(hours / 24)
            
            let relativeTime = "Baru saja"
            if (minutes >= 1 && minutes < 60) relativeTime = `${minutes} menit lalu`
            else if (hours >= 1 && hours < 24) relativeTime = `${hours} jam lalu`
            else if (days >= 1) relativeTime = `${days} hari lalu`

            return {
              id: String(n.id),
              title: n.judul || "Pemberitahuan",
              description: n.pesan || "",
              timestamp: relativeTime,
              variant: variant,
            }
          })
          setRecentActivities(mappedActivities)
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan server.")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-9 w-28" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Skeleton className="h-[300px] w-full rounded-xl lg:col-span-2" />
          <Skeleton className="h-[300px] w-full rounded-xl" />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Skeleton className="h-[350px] w-full rounded-xl" />
          <Skeleton className="h-[350px] w-full rounded-xl" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Kesalahan Pemuatan Data</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Dashboard Overview
        </h1>
      </div>

      {summary && <KpiCardGrid summary={summary} />}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart data={chartData} />
        </div>
        <div>
          <OrderStatusDonut
            data={donutData}
            total={summary ? summary.totalPesanan : 0}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentOrdersTable orders={recentOrders} />
        <ActivityFeed items={recentActivities} />
      </div>
    </div>
  )
}
