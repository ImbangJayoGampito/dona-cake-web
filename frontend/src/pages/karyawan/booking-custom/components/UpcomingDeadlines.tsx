import { cn } from "@/lib/utils"
import type { Booking } from "@/types/karyawan.types"

interface Props {
  bookings: Booking[]
}

function isUrgent(tglAmbil: string | null): boolean {
  if (!tglAmbil) return false
  const diff = new Date(tglAmbil).getTime() - Date.now()
  return diff > 0 && diff <= 24 * 60 * 60 * 1000 // ≤ 1 hari
}

function isTomorrow(tglAmbil: string | null): boolean {
  if (!tglAmbil) return false
  const d = new Date(tglAmbil)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return (
    d.getDate() === tomorrow.getDate() &&
    d.getMonth() === tomorrow.getMonth() &&
    d.getFullYear() === tomorrow.getFullYear()
  )
}

function formatDeadlineDate(tgl: string | null): string {
  if (!tgl) return "-"
  if (isTomorrow(tgl)) return "Tomorrow"
  return new Date(tgl).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })
}

export default function UpcomingDeadlines({ bookings }: Props) {
  const sorted = [...bookings]
    .filter((b) => b.tgl_ambil && new Date(b.tgl_ambil) > new Date())
    .sort(
      (a, b) =>
        new Date(a.tgl_ambil!).getTime() - new Date(b.tgl_ambil!).getTime()
    )
    .slice(0, 5)

  return (
    <div className="w-56 shrink-0">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        Upcoming Deadlines
      </p>
      <div className="flex flex-col gap-2">
        {sorted.length === 0 && (
          <p className="text-xs text-muted-foreground">Tidak ada deadline mendatang.</p>
        )}
        {sorted.map((b) => {
          const urgent = isUrgent(b.tgl_ambil)
          const dateLabel = formatDeadlineDate(b.tgl_ambil)
          const bookingId = `#BK-${String(b.id).padStart(4, "0")}`

          return (
            <div
              key={b.id}
              className={cn(
                "rounded-lg border p-3",
                urgent
                  ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20"
                  : "border-border bg-card"
              )}
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "text-xs font-semibold",
                    urgent ? "text-red-600" : "text-foreground"
                  )}
                >
                  {dateLabel}
                </span>
                {urgent && (
                  <span className="rounded-full bg-red-100 px-1.5 py-0.5 text-[9px] font-bold uppercase text-red-600 dark:bg-red-900/50">
                    URGENT
                  </span>
                )}
              </div>
              <p
                className={cn(
                  "mt-0.5 text-xs font-medium",
                  urgent ? "text-red-700 dark:text-red-400" : "text-muted-foreground"
                )}
              >
                {bookingId}
              </p>
              <p className="text-xs text-muted-foreground">
                {b.pelanggan?.nama ?? "Pelanggan"}
              </p>
              <p
                className={cn(
                  "mt-0.5 text-[11px]",
                  urgent ? "text-red-500" : "text-muted-foreground"
                )}
              >
                {b.jenis_frosting}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
