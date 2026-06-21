import { cn } from "@/lib/utils"
import type { StatusVerifikasi } from "@/types/karyawan.types"

interface Tab {
  status: StatusVerifikasi
  label: string
  count?: number
}

interface Props {
  activeTab: StatusVerifikasi
  onTabChange: (status: StatusVerifikasi) => void
  counts?: Partial<Record<StatusVerifikasi, number>>
}

const TABS: Tab[] = [
  { status: "menunggu_verifikasi", label: "Pending Konfirmasi" },
  { status: "disetujui", label: "Dikonfirmasi" },
  { status: "selesai", label: "Selesai" },
  { status: "ditolak", label: "Ditolak" },
]

export default function BookingTabBar({ activeTab, onTabChange, counts = {} }: Props) {
  return (
    <div className="flex gap-0 border-b border-border">
      {TABS.map(({ status, label }) => {
        const count = counts[status]
        const isActive = activeTab === status
        return (
          <button
            key={status}
            type="button"
            onClick={() => onTabChange(status)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition-colors",
              isActive
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {label}
            {count !== undefined && (
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-xs font-bold",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
