import { useEffect, useState } from "react"
import { Bell, Sun, Moon } from "lucide-react"
import { useAuthStore } from "@/lib/state/logged-user"
import { useTheme } from "@/components/theme-provider"

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("") || "?"
}

function formatClock(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function KaryawanHeader() {
  const user = useAuthStore((state) => state.user)
  const { theme, setTheme } = useTheme()
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
  const displayName = user?.getDisplayName() ?? "Karyawan"

  return (
    <header className="dark flex h-16 items-center justify-between border-b border-border bg-popover/90 px-8">
      {/* Jam & tanggal — tengah-kiri sesuai desain */}
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-semibold text-white">
          {formatClock(now)}
        </span>
        <span className="text-xs text-white/50">{formatDate(now)}</span>
      </div>

      {/* Kanan: notifikasi + profil */}
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

        <div className="flex items-center gap-3 border-l border-white/10 pl-5">
          <div className="text-right leading-tight">
            <p className="text-sm font-medium text-white">{displayName}</p>
            <p className="text-xs text-white/50">Karyawan</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
            {getInitials(displayName)}
          </div>
        </div>
      </div>
    </header>
  )
}
