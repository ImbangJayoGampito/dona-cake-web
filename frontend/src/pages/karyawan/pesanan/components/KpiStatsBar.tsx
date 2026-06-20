import { ShoppingBag, Utensils, CheckCircle, ClipboardList } from "lucide-react"
import type { StaffDashboardStats } from "@/types/karyawan.types"

interface Props {
  stats: StaffDashboardStats
}

const CARDS = [
  {
    key: "pesanan_hari_ini" as const,
    label: "Pesanan Hari Ini",
    icon: ShoppingBag,
    iconColor: "text-primary",
  },
  {
    key: "sedang_diproses" as const,
    label: "Diproses",
    icon: Utensils,
    iconColor: "text-amber-500",
  },
  {
    key: "siap_diambil" as const,
    label: "Siap Untuk Diambil",
    icon: CheckCircle,
    iconColor: "text-emerald-500",
  },
  {
    key: "pending" as const,
    label: "Pending",
    icon: ClipboardList,
    iconColor: "text-muted-foreground",
  },
]

export default function KpiStatsBar({ stats }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {CARDS.map(({ key, label, icon: Icon, iconColor }) => (
        <div
          key={key}
          className="flex items-center justify-between rounded-xl border border-border bg-card p-5"
        >
          <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-1 text-3xl font-bold text-foreground">
              {stats[key]}
            </p>
          </div>
          <Icon
            className={`h-8 w-8 ${iconColor} opacity-70`}
            strokeWidth={1.5}
          />
        </div>
      ))}
    </div>
  )
}
