import { useEffect, useState, useCallback } from "react"
import { AlertCircle, RefreshCw, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import {
  LaporanKeuanganService,
  type FinancialSummary,
  type RevenueChartPoint,
  type RevenuePeriode,
} from "@/services/laporan-keuangan-service"
import { Transaksi } from "@/models/transaksi.model"
import type { PaginationMeta } from "@/types/pagination.types"
import SummaryCards from "./components/SummaryCards"
import TrendChart from "./components/TrendChart"
import TransaksiTable from "./components/TransaksiTable"

type LoadState = "loading" | "success" | "error"

export default function LaporanKeuanganPage() {
  // Summary & chart state
  const [summaryState, setSummaryState] = useState<LoadState>("loading")
  const [summaryError, setSummaryError] = useState("")
  const [summary, setSummary] = useState<FinancialSummary | null>(null)
  const [chartData, setChartData] = useState<RevenueChartPoint[]>([])
  const [chartPeriode, setChartPeriode] = useState<RevenuePeriode>("daily")
  const [isChartLoading, setIsChartLoading] = useState(false)

  // Transaksi table state
  const [transaksiState, setTransaksiState] = useState<LoadState>("loading")
  const [transaksis, setTransaksis] = useState<Transaksi[]>([])
  const [pagination, setPagination] = useState<PaginationMeta | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState("")
  const [isExportingPDF, setIsExportingPDF] = useState(false)

  // Load summary + chart awal paralel
  async function loadSummaryAndChart() {
    setSummaryState("loading")
    const [summaryRes, chartRes] = await Promise.all([
      LaporanKeuanganService.getSummary(),
      LaporanKeuanganService.getRevenueChart(chartPeriode),
    ])

    if (summaryRes.isError() || !summaryRes.data) {
      setSummaryError(summaryRes.message ?? "Gagal memuat ringkasan keuangan.")
      setSummaryState("error")
      return
    }

    setSummary(summaryRes.data)
    setChartData(chartRes.data ?? [])
    setSummaryState("success")
  }

  // Load ulang chart saja saat periode berubah
  const loadChart = useCallback(async (periode: RevenuePeriode) => {
    setIsChartLoading(true)
    const res = await LaporanKeuanganService.getRevenueChart(periode)
    setChartData(res.data ?? [])
    setIsChartLoading(false)
  }, [])

  function handlePeriodeChange(periode: RevenuePeriode) {
    setChartPeriode(periode)
    loadChart(periode)
  }

  // Load transaksi (dengan debounce untuk search)
  const loadTransaksi = useCallback(async () => {
    setTransaksiState("loading")
    const res = await LaporanKeuanganService.getTransaksi({
      page: currentPage,
      ...(search && { search }),
    })

    if (res.isError() || !res.data) {
      setTransaksiState("error")
      return
    }

    setTransaksis(res.data)
    if (res.pagination) setPagination(res.pagination)
    setTransaksiState("success")
  }, [currentPage, search])

  useEffect(() => {
    loadSummaryAndChart()
  }, [])

  useEffect(() => {
    const timer = setTimeout(loadTransaksi, search ? 400 : 0)
    return () => clearTimeout(timer)
  }, [loadTransaksi, search])

  // Export handlers
  function handleExportCSV() {
    if (transaksis.length === 0) {
      toast.error("Tidak ada data untuk diekspor.")
      return
    }
    LaporanKeuanganService.exportCSV(transaksis)
    toast.success("File CSV berhasil diunduh.")
  }

  async function handleExportPDF() {
    if (transaksis.length === 0) {
      toast.error("Tidak ada data untuk diekspor.")
      return
    }
    setIsExportingPDF(true)
    try {
      await LaporanKeuanganService.exportPDF(transaksis)
      toast.success("File PDF berhasil diunduh.")
    } catch {
      toast.error("Gagal membuat file PDF. Coba lagi.")
    }
    setIsExportingPDF(false)
  }

  if (summaryState === "error") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-[#D94F4F]/30 bg-[#FDF0F0] px-6 py-16 text-center">
        <AlertCircle className="h-10 w-10 text-[#D94F4F]" strokeWidth={1.75} />
        <h2 className="mt-4 text-lg font-semibold text-foreground">
          Gagal Memuat Laporan
        </h2>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          {summaryError}
        </p>
        <Button onClick={loadSummaryAndChart} className="mt-6 gap-2">
          <RefreshCw className="h-4 w-4" strokeWidth={1.75} />
          Coba Lagi
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Laporan & Analitik
          </h1>
          <p className="text-sm text-muted-foreground">
            Ringkasan keuangan dan riwayat transaksi toko.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" strokeWidth={1.75} />
          {new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>

      {/* Summary cards */}
      {summaryState === "loading" || !summary ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
      ) : (
        <SummaryCards summary={summary} />
      )}

      {/* Trend chart */}
      {summaryState === "loading" ? (
        <Skeleton className="h-80 rounded-xl" />
      ) : (
        <TrendChart
          data={chartData}
          periode={chartPeriode}
          onPeriodeChange={handlePeriodeChange}
          isLoading={isChartLoading}
        />
      )}

      {/* Tabel transaksi */}
      {transaksiState === "loading" && transaksis.length === 0 ? (
        <Skeleton className="h-64 rounded-xl" />
      ) : (
        <TransaksiTable
          transaksis={transaksis}
          pagination={pagination}
          search={search}
          onSearchChange={(val) => {
            setSearch(val)
            setCurrentPage(1)
          }}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onExportCSV={handleExportCSV}
          onExportPDF={handleExportPDF}
          isExportingPDF={isExportingPDF}
        />
      )}
    </div>
  )
}
