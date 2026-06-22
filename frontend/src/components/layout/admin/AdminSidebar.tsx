import { NavLink } from "react-router-dom"
import {
  LayoutGrid,
  Landmark,
  Users,
  BookOpen,
  Settings,
  MessageSquare,
} from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { to: "/admin/dashboard", label: "Overview", icon: LayoutGrid },
  { to: "/admin/laporan", label: "Laporan & Analitik", icon: Landmark },
  { to: "/admin/pengguna", label: "Pengguna", icon: Users },
  { to: "/admin/produk", label: "Daftar Produk", icon: BookOpen },
  { to: "/admin/asisten", label: "Monitor Asisten", icon: MessageSquare },
  { to: "/admin/sistem", label: "Sistem", icon: Settings },
] as const

export default function AdminSidebar() {
  return (
    <aside className="dark flex h-full w-64 flex-col bg-popover/90 px-4 py-6">
      <div className="mb-8 flex flex-col items-center gap-2 px-2">
        <div className="h-14 w-14 rounded-full bg-primary" />
        <div className="text-center">
          <p className="text-base font-semibold text-white">Dona Cake</p>
          <p className="text-xs text-white/50">Management Dashboard</p>
        </div>
      </div>

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
    </aside>
  )
}
