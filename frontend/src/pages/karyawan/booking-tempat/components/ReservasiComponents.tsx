// =============================================================================
// Booking Tempat — Placeholder Components
// Backend & desain belum tersedia
// =============================================================================

import { cn } from "@/lib/utils"
import type { StatusReservasi, Reservasi } from "@/services/karyawan-reservasi-service"

// ---- Tab Bar ----------------------------------------------------------------

interface TabBarProps {
  activeTab: StatusReservasi
  onTabChange: (s: StatusReservasi) => void
}

const TABS: { value: StatusReservasi; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "dikonfirmasi", label: "Dikonfirmasi" },
  { value: "selesai", label: "Selesai" },
  { value: "ditolak", label: "Ditolak" },
]

export function ReservasiTabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="flex gap-0 border-b border-border">
      {TABS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => onTabChange(value)}
          className={cn(
            "px-4 py-3 text-sm font-medium transition-colors",
            activeTab === value
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

// ---- Reservasi Card ---------------------------------------------------------

interface CardProps {
  reservasi: Reservasi
}

function formatSesi(tgl: string): string {
  return new Date(tgl).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function ReservasiCard({ reservasi }: CardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">
            #RV-{String(reservasi.id).padStart(4, "0")}
          </p>
          <p className="text-base font-semibold text-foreground">
            {reservasi.nama_tamu}
          </p>
          <p className="text-xs text-muted-foreground">
            {reservasi.jumlah_orang} orang
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          {formatSesi(reservasi.tanggal_sesi)}
        </p>
      </div>

      {reservasi.occasion && (
        <p className="mt-2 text-xs text-muted-foreground">
          Occasion: {reservasi.occasion}
        </p>
      )}
      {reservasi.permintaan_khusus && (
        <p className="mt-1 text-xs text-muted-foreground">
          Catatan: {reservasi.permintaan_khusus}
        </p>
      )}

      {reservasi.status === "pending" && (
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            disabled
            className="rounded-lg border border-destructive px-4 py-1.5 text-sm font-semibold text-destructive opacity-50"
          >
            Tolak
          </button>
          <button
            type="button"
            disabled
            className="rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-white opacity-50"
          >
            Konfirmasi
          </button>
        </div>
      )}
    </div>
  )
}
