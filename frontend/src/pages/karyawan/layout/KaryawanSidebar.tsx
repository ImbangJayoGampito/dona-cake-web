import { NavLink } from "react-router-dom"
import { useState } from "react"
import {
  ShoppingBag,
  CalendarCheck,
  Star,
  BookMarked,
} from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { to: "/karyawan/pesanan", label: "Antrian Pesanan", icon: ShoppingBag },
  { to: "/karyawan/booking-custom", label: "Booking Custom", icon: CalendarCheck },
  { to: "/karyawan/ulasan", label: "Ulasan Produk", icon: Star },
  { to: "/karyawan/booking-tempat", label: "Booking Tempat", icon: BookMarked },
] as const

export default function KaryawanSidebar() {
  const [statusKehadiran, setStatusKehadiran] = useState<"aktif" | "istirahat">(
    "aktif"
  )

  return (
    <aside className="dark flex h-full w-64 flex-col bg-popover/90 px-4 py-6">
      {/* Logo */}
      <div className="mb-8 px-2">
        <p className="text-base font-semibold text-white">Dona Cake</p>
      </div>

      {/* Navigasi */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/20 text-primary"
                  : "text-white/65 hover:bg-white/5 hover:text-white/90"
              )
            }
          >
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* STATUS KEHADIRAN toggle */}
      <div className="mt-4 rounded-xl bg-white/5 p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">
          Status Kehadiran
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setStatusKehadiran("aktif")}
            className={cn(
              "flex-1 rounded-lg py-1.5 text-xs font-semibold transition-colors",
              statusKehadiran === "aktif"
                ? "bg-primary text-white"
                : "bg-white/10 text-white/50 hover:bg-white/15"
            )}
          >
            Aktif
          </button>
          <button
            type="button"
            onClick={() => setStatusKehadiran("istirahat")}
            className={cn(
              "flex-1 rounded-lg py-1.5 text-xs font-semibold transition-colors",
              statusKehadiran === "istirahat"
                ? "bg-white/20 text-white"
                : "bg-white/10 text-white/50 hover:bg-white/15"
            )}
          >
            Istirahat
          </button>
        </div>
      </div>
    </aside>
  )
}
