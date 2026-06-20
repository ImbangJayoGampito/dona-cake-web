import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import type { FilterUlasan } from "@/types/karyawan.types"

interface Props {
  activeFilter: FilterUlasan
  onFilterChange: (f: FilterUlasan) => void
  search: string
  onSearchChange: (s: string) => void
}

const FILTERS: { value: FilterUlasan; label: string }[] = [
  { value: "semua", label: "Semua" },
  { value: "belum_dibalas", label: "Belum Dibalas" },
  { value: "bintang_rendah", label: "Bintang 1-2" },
]

export default function UlasanFilterBar({
  activeFilter,
  onFilterChange,
  search,
  onSearchChange,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex gap-1 rounded-lg border border-border bg-card p-1">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => onFilterChange(value)}
            className={cn(
              "rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
              activeFilter === value
                ? "bg-primary text-white"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
        <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
        <input
          type="text"
          placeholder="Cari ulasan atau produk..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-48 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </div>
    </div>
  )
}
