import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Kategori from "@/models/kategori.model"

export interface ProdukFilters {
  search: string
  kategori_id: number | null
}

interface ProdukFilterBarProps {
  filters: ProdukFilters
  kategoris: Kategori[]
  totalProduk: number
  onFiltersChange: (filters: ProdukFilters) => void
}

export default function ProdukFilterBar({
  filters,
  kategoris,
  totalProduk,
  onFiltersChange,
}: ProdukFilterBarProps) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari produk..."
          value={filters.search}
          onChange={(e) =>
            onFiltersChange({ ...filters, search: e.target.value })
          }
          className="pl-9"
        />
      </div>

      {/* Kategori chip tabs — sesuai desain Stitch (Semua, Cakes, Pastries, Bread, dll) */}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFiltersChange({ ...filters, kategori_id: null })}
          className={cn(
            "rounded-full border px-4 text-sm font-medium transition-colors",
            filters.kategori_id === null
              ? "border-[#C9956C] bg-[#C9956C] text-white hover:bg-[#A8744E]"
              : "border-border bg-white text-muted-foreground hover:bg-[#F7F5F3]"
          )}
        >
          Semua ({totalProduk})
        </Button>

        {kategoris.map((kat) => (
          <Button
            key={kat.id}
            variant="ghost"
            size="sm"
            onClick={() =>
              onFiltersChange({ ...filters, kategori_id: kat.id })
            }
            className={cn(
              "rounded-full border px-4 text-sm font-medium transition-colors",
              filters.kategori_id === kat.id
                ? "border-[#C9956C] bg-[#C9956C] text-white hover:bg-[#A8744E]"
                : "border-border bg-white text-muted-foreground hover:bg-[#F7F5F3]"
            )}
          >
            {kat.nama_kategori}
          </Button>
        ))}
      </div>
    </div>
  )
}
