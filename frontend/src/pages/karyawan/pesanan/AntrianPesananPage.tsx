import { useEffect, useState, useCallback } from "react"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import KpiStatsBar from "./components/KpiStatsBar"
import KdsBoard from "./components/KdsBoard"
import LiveUpdateBadge from "./components/LiveUpdateBadge"
import { KaryawanPesananService } from "@/services/karyawan-pesanan-service"
import type { Pesanan, StaffDashboardStats, StatusKDS } from "@/types/karyawan.types"

const POLLING_INTERVAL_MS = 15_000

export default function AntrianPesananPage() {
  const [pesanan, setPesanan] = useState<Pesanan[]>([])
  const [stats, setStats] = useState<StaffDashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const [isPolling, setIsPolling] = useState(false)
  const [dismissedIds, setDismissedIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem("kds_dismissed_orders")
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const fetchData = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    else setIsPolling(true)
    setError(null)

    try {
      const [pesananRes, statsRes] = await Promise.all([
        KaryawanPesananService.getPesananKDS(),
        KaryawanPesananService.getDashboardStats(),
      ])

      if (pesananRes.isSuccess() && pesananRes.data) {
        setPesanan(pesananRes.data)
      } else if (!silent) {
        setError(pesananRes.message ?? "Gagal memuat pesanan.")
      }

      if (statsRes.isSuccess() && statsRes.data) {
        setStats(statsRes.data)
      }
    } catch (err) {
      if (!silent) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan.")
      }
    } finally {
      setLoading(false)
      setIsPolling(false)
    }
  }, [])

  // Initial load
  useEffect(() => {
    fetchData(false)
  }, [fetchData])

  // Polling setiap 15 detik — ganti dengan WebSocket saat backend siap
  useEffect(() => {
    const id = setInterval(() => fetchData(true), POLLING_INTERVAL_MS)
    return () => clearInterval(id)
  }, [fetchData])

  const handleUpdateStatus = async (id: number, newStatus: StatusKDS) => {
    setUpdatingId(id)

    // Optimistic update — kartu bergerak antar kolom sebelum API confirm
    setPesanan((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status_pesanan: newStatus } : p
      )
    )

    try {
      const res = await KaryawanPesananService.updateStatusPesanan(id, newStatus)
      if (!res.isSuccess()) {
        // Rollback optimistic update jika gagal
        await fetchData(true)
      }
    } catch {
      await fetchData(true)
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDismiss = (id: number) => {
    setDismissedIds((prev) => {
      const next = [...prev, id]
      localStorage.setItem("kds_dismissed_orders", JSON.stringify(next))
      return next
    })
  }

  const visiblePesanan = pesanan.filter((p) => !dismissedIds.includes(p.id))

  if (loading) {
    return (
      <div className="flex h-full flex-col gap-6">
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <div className="grid flex-1 grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="min-h-[400px] rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Gagal Memuat Data</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="flex h-full flex-col gap-6">
      {/* KPI Cards */}
      {stats && <KpiStatsBar stats={stats} />}

      {/* KDS Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">
          Kitchen Display System
        </h2>
        <LiveUpdateBadge active={!isPolling} />
      </div>

      {/* KDS Board */}
      <KdsBoard
        pesanan={visiblePesanan}
        onUpdateStatus={handleUpdateStatus}
        updatingId={updatingId}
        onDismiss={handleDismiss}
      />
    </div>
  )
}
