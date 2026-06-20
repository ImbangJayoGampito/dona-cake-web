import { useEffect, useState, useCallback, useRef } from "react"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import UlasanStatsBar from "./components/UlasanStatsBar"
import UlasanFilterBar from "./components/UlasanFilterBar"
import UlasanCard from "./components/UlasanCard"
import UlasanPagination from "./components/UlasanPagination"
import { KaryawanUlasanService } from "@/services/karyawan-ulasan-service"
import type { Ulasan, UlasanStats, FilterUlasan } from "@/types/karyawan.types"

export default function UlasanProdukPage() {
  const [ulasan, setUlasan] = useState<Ulasan[]>([])
  const [stats, setStats] = useState<UlasanStats | null>(null)
  const [filter, setFilter] = useState<FilterUlasan>("semua")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fetchUlasan = useCallback(
    async (f: FilterUlasan, p: number, s: string) => {
      setLoading(true)
      setError(null)
      try {
        const res = await KaryawanUlasanService.getUlasan(f, p, s || undefined)
        if (res.isSuccess()) {
          setUlasan(res.data ?? [])
          // Ambil pagination dari meta jika ada
          const meta = (res as any).meta
          setTotalPages(meta?.last_page ?? 1)
        } else {
          setError(res.message ?? "Gagal memuat ulasan.")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan.")
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const fetchStats = useCallback(async () => {
    const res = await KaryawanUlasanService.getUlasanStats()
    if (res.isSuccess() && res.data) setStats(res.data)
  }, [])

  // Load stats sekali saat mount
  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  // Load ulasan saat filter/page berubah
  useEffect(() => {
    fetchUlasan(filter, page, search)
  }, [filter, page, fetchUlasan])

  // Debounce search
  const handleSearchChange = (val: string) => {
    setSearch(val)
    if (searchTimeout.current) clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(() => {
      setPage(1)
      fetchUlasan(filter, 1, val)
    }, 400)
  }

  const handleFilterChange = (f: FilterUlasan) => {
    setFilter(f)
    setPage(1)
    setUlasan([])
  }

  const handleKirimBalasan = async (id: number, balasan: string) => {
    const res = await KaryawanUlasanService.balasUlasan(id, { balasan })
    if (res.isSuccess() && res.data) {
      // Update ulasan di state lokal
      setUlasan((prev) =>
        prev.map((u) => (u.id === id ? { ...u, ...res.data } : u))
      )
      // Refresh stats
      fetchStats()
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        Ulasan Produk
      </h1>

      {/* Stats */}
      {stats && <UlasanStatsBar stats={stats} />}
      {!stats && (
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
      )}

      {/* Filter */}
      <UlasanFilterBar
        activeFilter={filter}
        onFilterChange={handleFilterChange}
        search={search}
        onSearchChange={handleSearchChange}
      />

      {/* Error */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Gagal Memuat</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex flex-col gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-xl" />
          ))}
        </div>
      )}

      {/* List ulasan */}
      {!loading && !error && (
        <>
          {ulasan.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <p className="text-sm">Tidak ada ulasan ditemukan.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {ulasan.map((u) => (
                <UlasanCard
                  key={u.id}
                  ulasan={u}
                  onKirimBalasan={handleKirimBalasan}
                />
              ))}
            </div>
          )}

          <UlasanPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  )
}
