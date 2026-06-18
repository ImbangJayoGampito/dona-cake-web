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

export default function DashboardOverview() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [chartData, setChartData] = useState<RevenueChartPoint[]>([])
  const [donutData, setDonutData] = useState<OrderStatusBreakdown[]>([])

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true)
      setError(null)
      try {
        const summaryRes = await DashboardService.getSummary()
        const chartRes = await DashboardService.getRevenueChart("daily")

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
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan server.")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  // Dummy data untuk pesanan terbaru & aktivitas (karena belum ada endpoint riil)
  const dummyOrders: RecentOrderRow[] = [
    {
      id: "1",
      noPesanan: "#ORD-001",
      namaPelanggan: "Budi Santoso",
      lokasi: "Kec. Sukolilo, Surabaya",
      total: 150000,
      status: "Menunggu",
    },
    {
      id: "2",
      noPesanan: "#ORD-002",
      namaPelanggan: "Dewi Lestari",
      lokasi: "Kec. Tegalsari, Surabaya",
      total: 350000,
      status: "Diproses",
    },
    {
      id: "3",
      noPesanan: "#ORD-003",
      namaPelanggan: "Andi Wijaya",
      lokasi: "Kec. Gubeng, Surabaya",
      total: 250000,
      status: "Selesai",
    },
  ]

  const dummyActivities: ActivityItem[] = [
    {
      id: "1",
      title: "Pesanan Baru Masuk",
      description: "Budi Santoso memesan Black Forest Premium sebesar Rp 150.000",
      timestamp: "5 menit yang lalu",
      variant: "info",
    },
    {
      id: "2",
      title: "Pembayaran Diterima",
      description: "Transaksi #TRX-9482 senilai Rp 350.000 telah berhasil diverifikasi",
      timestamp: "20 menit yang lalu",
      variant: "default",
    },
    {
      id: "3",
      title: "Stok Menipis",
      description: "Stok bahan baku Tepung Terigu Segitiga Biru tersisa kurang dari 5kg",
      timestamp: "1 jam yang lalu",
      variant: "warning",
    },
  ]

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
        <RecentOrdersTable orders={dummyOrders} />
        <ActivityFeed items={dummyActivities} />
      </div>
    </div>
  )
}
