import { useEffect, useState, useCallback } from "react"
import { Plus, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { ManajemenProdukService } from "@/services/manajemen-produk-service"
import { Produk } from "@/models/produk.model"
import Kategori from "@/models/kategori.model"
import type { PaginationMeta } from "@/types/pagination.types"
import ProdukFilterBar, { type ProdukFilters } from "./components/ProdukFilterBar"
import ProdukCard from "./components/ProdukCard"
import EditProdukDialog from "./components/EditProdukDialog"

type LoadState = "loading" | "success" | "error"

const DEFAULT_FILTERS: ProdukFilters = { search: "", kategori_id: null }

export default function ManajemenProdukPage() {
  const [loadState, setLoadState] = useState<LoadState>("loading")
  const [errorMessage, setErrorMessage] = useState("")
  const [produks, setProduks] = useState<Produk[]>([])
  const [kategoris, setKategoris] = useState<Kategori[]>([])
  const [pagination, setPagination] = useState<PaginationMeta | null>(null)
  const [filters, setFilters] = useState<ProdukFilters>(DEFAULT_FILTERS)
  const [editTarget, setEditTarget] = useState<Produk | null>(null)

  const loadData = useCallback(async () => {
    setLoadState("loading")

    const params = {
      ...(filters.search && { search: filters.search }),
      ...(filters.kategori_id !== null && { kategori_id: filters.kategori_id }),
    }

    // Fetch produk + kategori paralel
    const [produkRes, kategoriRes] = await Promise.all([
      ManajemenProdukService.getProduk(params),
      ManajemenProdukService.getKategori(),
    ])

    if (produkRes.isError() || !produkRes.data) {
      setErrorMessage(produkRes.message ?? "Gagal memuat data produk.")
      setLoadState("error")
      return
    }

    setProduks(produkRes.data)
    if (produkRes.pagination) setPagination(produkRes.pagination)
    if (kategoriRes.isSuccess() && kategoriRes.data) {
      setKategoris(kategoriRes.data)
    }
    setLoadState("success")
  }, [filters])

  useEffect(() => {
    const timer = setTimeout(loadData, filters.search ? 400 : 0)
    return () => clearTimeout(timer)
  }, [loadData, filters.search])

  function handleFiltersChange(newFilters: ProdukFilters) {
    setFilters(newFilters)
  }

  function handleSaved(updated: Produk) {
    setProduks((prev) => {
      const exists = prev.some((p) => p.id === updated.id)
      if (exists) {
        return prev.map((p) => (p.id === updated.id ? updated : p))
      } else {
        return [updated, ...prev]
      }
    })
  }

  /**
   * Toggle visibility = set stok ke 0 (sembunyikan) atau ke 1 (tampilkan).
   * Backend tidak punya field is_active terpisah, stok = 0 sudah berarti habis/tersembunyi
   * dari perspektif pelanggan karena canOrder() check stok.
   */
  async function handleToggleVisibility(produk: Produk) {
    const newStok = produk.isInStock() ? 0 : 1
    const res = await ManajemenProdukService.updateProduk(produk.id, {
      nama_produk: produk.nama_produk,
      harga: produk.harga,
      stok: newStok,
      deskripsi: produk.deskripsi,
      kategori_id:
        typeof produk.kategori === "object" && produk.kategori !== null
          ? (produk.kategori as any).id ?? null
          : null,
    })

    if (res.isSuccess() && res.data) {
      setProduks((prev) =>
        prev.map((p) => (p.id === produk.id ? res.data! : p))
      )
      toast.success(
        newStok === 0
          ? `"${produk.nama_produk}" disembunyikan dari katalog.`
          : `"${produk.nama_produk}" ditampilkan kembali.`
      )
    } else {
      toast.error(res.message ?? "Gagal mengubah status produk.")
    }
  }

  if (loadState === "error") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-[#D94F4F]/30 bg-[#FDF0F0] px-6 py-16 text-center">
        <AlertCircle className="h-10 w-10 text-[#D94F4F]" strokeWidth={1.75} />
        <h2 className="mt-4 text-lg font-semibold text-foreground">
          Gagal Memuat Produk
        </h2>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          {errorMessage}
        </p>
        <Button onClick={loadData} className="mt-6 gap-2">
          <RefreshCw className="h-4 w-4" strokeWidth={1.75} />
          Coba Lagi
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Manajemen Produk
            </h1>
            <p className="text-sm text-muted-foreground">
              Kelola inventaris kue dan produk butik Anda.
            </p>
          </div>
          <Button
            onClick={() =>
              setEditTarget(
                new Produk({
                  id: 0,
                  nama_produk: "",
                  harga: 0,
                  stok: 0,
                  deskripsi: "",
                  kategori: null,
                })
              )
            }
            className="gap-2 bg-[#C9956C] hover:bg-[#A8744E]"
          >
            <Plus className="h-4 w-4" strokeWidth={1.75} />
            Tambah Produk
          </Button>
        </div>

        {/* Filter bar */}
        <ProdukFilterBar
          filters={filters}
          kategoris={kategoris}
          totalProduk={pagination?.total ?? produks.length}
          onFiltersChange={handleFiltersChange}
        />

        {/* Grid atau skeleton */}
        {loadState === "loading" ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/5] rounded-2xl" />
            ))}
          </div>
        ) : produks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-sm text-muted-foreground">
              Tidak ada produk yang ditemukan.
            </p>
            <Button
              variant="ghost"
              className="mt-3 text-[#C9956C]"
              onClick={() => setFilters(DEFAULT_FILTERS)}
            >
              Reset filter
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {produks.map((produk) => (
              <ProdukCard
                key={produk.id}
                produk={produk}
                onEdit={setEditTarget}
                onToggleVisibility={handleToggleVisibility}
              />
            ))}
          </div>
        )}

        {/* Pagination info (opsional, load more menyusul) */}
        {pagination && loadState === "success" && (
          <p className="text-center text-sm text-muted-foreground">
            Menampilkan {produks.length} dari {pagination.total} produk
          </p>
        )}
      </div>

      {/* Modal Edit */}
      <EditProdukDialog
        produk={editTarget}
        open={editTarget !== null}
        kategoris={kategoris}
        onClose={() => setEditTarget(null)}
        onSaved={handleSaved}
      />
    </>
  )
}
