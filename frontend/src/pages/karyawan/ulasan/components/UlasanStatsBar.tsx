import { Star, TrendingUp, Bell } from "lucide-react"
import { cn } from "@/lib/utils"
import type { UlasanStats } from "@/types/karyawan.types"

interface Props {
  stats: UlasanStats
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted"
          )}
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}

export default function UlasanStatsBar({ stats }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Rating rata-rata */}
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Rating Rata-rata
        </p>
        <p className="mt-2 text-3xl font-bold text-foreground">
          {stats.rating_rata_rata.toFixed(1)}
        </p>
        <StarRating rating={stats.rating_rata_rata} />
        <p className="mt-1 text-xs text-muted-foreground">Kepuasan Tinggi</p>
      </div>

      {/* Total ulasan */}
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Total Ulasan
        </p>
        <p className="mt-2 text-3xl font-bold text-foreground">
          {stats.total_ulasan}
        </p>
        <div className="mt-1 flex items-center gap-1">
          <TrendingUp className="h-3 w-3 text-emerald-500" strokeWidth={2} />
          <p className="text-xs text-emerald-600">+10% dari bulan lalu</p>
        </div>
      </div>

      {/* Ulasan baru */}
      <div className="rounded-xl bg-primary p-5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70">
          Ulasan Baru
        </p>
        <p className="mt-2 text-3xl font-bold text-white">
          {stats.ulasan_baru}
        </p>
        <p className="mt-1 text-xs text-white/80">Membutuhkan respon segera</p>
      </div>
    </div>
  )
}
