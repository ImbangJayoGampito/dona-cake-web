import { Search, Bell, HelpCircle, Sun, Moon } from "lucide-react"
import { useAuthStore } from "@/lib/state/logged-user"
import { RoleEnum } from "@/types/enums"
import { useTheme } from "@/components/theme-provider"

const ROLE_LABEL: Record<string, string> = {
  [RoleEnum.Admin]: "Super Admin",
  [RoleEnum.Karyawan]: "Karyawan",
  [RoleEnum.User]: "Pelanggan",
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  const initials = parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "")
  return initials.join("") || "?"
}

export default function AdminHeader() {
  const user = useAuthStore((state) => state.user)
  const { theme, setTheme } = useTheme()

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  // ProtectedRoute menjamin user tidak null saat header ini dirender, tapi
  // tetap dijaga di sini supaya komponen tidak crash kalau dipakai di tempat lain.
  const displayName = user?.getDisplayName() ?? "Pengguna"
  const roleLabel = user ? ROLE_LABEL[user.role] ?? user.role : ""

  return (
    <header className="dark flex h-16 items-center justify-between border-b border-border bg-popover/90 px-8">
      <div className="flex w-full max-w-md items-center gap-2 rounded-lg bg-white/10 px-3 py-2">
        <Search className="h-4 w-4 text-white/50" strokeWidth={1.75} />
        <input
          type="text"
          placeholder="Cari nama, email, atau ID..."
          className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label="Ubah Tema"
          className="text-white/70 transition-colors hover:text-white"
        >
          {isDark ? (
            <Sun className="h-5 w-5" strokeWidth={1.75} />
          ) : (
            <Moon className="h-5 w-5" strokeWidth={1.75} />
          )}
        </button>
        <button
          type="button"
          aria-label="Notifikasi"
          className="text-white/70 transition-colors hover:text-white"
        >
          <Bell className="h-5 w-5" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          aria-label="Bantuan"
          className="text-white/70 transition-colors hover:text-white"
        >
          <HelpCircle className="h-5 w-5" strokeWidth={1.75} />
        </button>

        <div className="flex items-center gap-3 border-l border-white/10 pl-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
            {getInitials(displayName)}
          </div>
          <div className="leading-tight">
            <p className="text-sm font-medium text-white">{displayName}</p>
            <p className="text-xs text-white/50">{roleLabel}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
