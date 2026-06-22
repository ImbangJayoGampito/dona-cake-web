import { cn } from "@/lib/utils"
import type { Booking } from "@/types/karyawan.types"
import { Calendar, CheckCircle2, AlertTriangle, User } from "lucide-react"
import GambarService from "@/services/gambar-service"
import { useState, useEffect } from "react"

interface Props {
  booking: Booking
  onKonfirmasi: (id: number) => void
  onTolak: (id: number) => void
  onSelesai?: (id: number) => void
  isUpdating: boolean
}

function formatTglAmbil(tgl: string | null): string {
  if (!tgl) return "-"
  const d = new Date(tgl)
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  }) + " • " + d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB"
}

function isUrgent(tglAmbil: string | null): boolean {
  if (!tglAmbil) return false
  const diff = new Date(tglAmbil).getTime() - Date.now()
  return diff > 0 && diff <= 24 * 60 * 60 * 1000 // ≤ 24 jam (1 hari)
}

/** Helper to build absolute URL for images */
function getImageUrl(path: string | null) {
  if (!path) return null;
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  // If you have a Vite proxy, use window.location.origin
  // Otherwise use your API base URL from environment
  const base = import.meta.env.VITE_API_URL || window.location.origin;
  // Ensure path starts with / if it doesn't already
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
function parseTags(deskripsi: string | null): string[] {
  if (!deskripsi) return []
  try {
    const parsed = JSON.parse(deskripsi)
    if (Array.isArray(parsed)) return parsed as string[]
  } catch {
    // ignore
  }
  return deskripsi.split(",").map((s) => s.trim()).filter(Boolean)
}

export default function BookingCustomCard({
  booking,
  onKonfirmasi,
  onTolak,
  onSelesai,
  isUpdating,
}: Props) {
  const tags = parseTags(booking.deskripsi_custom)
  const bookingIdStr = `#BK-${String(booking.id).padStart(4, "0")}`
  const urgent = isUrgent(booking.tgl_ambil)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Reset image state when booking changes
  useEffect(() => {
    setImageLoaded(false)
    setImageError(false)
  }, [booking.desain_custom_url])

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md",
        urgent
          ? "border-red-200 dark:border-red-900/50"
          : "border-border"
      )}
    >
      {/* Design Reference Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {booking.desain_custom_url ? (
          <>
            {!imageLoaded && !imageError && (
              <div className="flex h-full w-full items-center justify-center bg-muted/60">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent"></div>
              </div>
            )}
            <img
              src={getImageUrl(booking.desain_custom_url) || ''}
              alt="Referensi desain custom"
              className={cn(
                "h-full w-full object-cover transition-transform hover:scale-105",
                (imageLoaded || imageError) ? "block" : "hidden"
              )}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
              }}
            />
            {imageError && (
              <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-muted/80 text-xs text-muted-foreground">
                Gambar tidak tersedia
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/60 text-xs text-muted-foreground">
            No design image uploaded
          </div>
        )}

        {/* Status Badge overlay */}
        {urgent && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            <AlertTriangle className="h-3 w-3" />
            Urgent H-1
          </span>
        )}
      </div>

      {/* Card Details */}
      <div className="flex flex-1 flex-col p-4">
        {/* Header: Code & Customer Name */}
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold text-primary">
              {bookingIdStr}
            </span>
            <h3 className="mt-0.5 flex items-center gap-1.5 font-semibold text-foreground">
              <User className="h-3.5 w-3.5 text-muted-foreground" />
              {booking.pelanggan?.nama ?? "Pelanggan"}
            </h3>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="mt-4 grid grid-cols-2 gap-x-2 gap-y-3 rounded-lg bg-muted/30 p-2.5 text-xs">
          <div>
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Ukuran
            </span>
            <p className="font-semibold text-foreground">{booking.ukuran ?? "-"}</p>
          </div>
          <div>
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Rasa Kue
            </span>
            <p className="font-semibold text-foreground">{booking.rasa_kue ?? "-"}</p>
          </div>
          <div>
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Frosting
            </span>
            <p className="font-semibold text-foreground">{booking.jenis_frosting ?? "-"}</p>
          </div>
          <div>
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Tema
            </span>
            <p className="font-semibold text-foreground truncate">{booking.tema_dekorasi ?? "-"}</p>
          </div>
        </div>

        {/* Custom description tags */}
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Catatan / Special Notes */}
        {booking.catatan && (
          <div className="mt-3 rounded border border-border bg-card p-2 text-xs">
            <span className="font-medium text-muted-foreground block text-[10px] uppercase">Catatan:</span>
            <p className="text-muted-foreground mt-0.5 line-clamp-2">{booking.catatan}</p>
          </div>
        )}

        {/* Final Price & Pickup Time */}
        <div className="mt-4 border-t border-border pt-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Harga Final:</span>
            <span className="font-bold text-foreground">
              {booking.harga_final
                ? `Rp ${Number(booking.harga_final).toLocaleString("id-ID")}`
                : "Belum ditentukan"}
            </span>
          </div>
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{formatTglAmbil(booking.tgl_ambil)}</span>
          </div>
        </div>

        {/* Actions according to column/status */}
        <div className="mt-auto pt-4">
          {booking.status_verifikasi === "menunggu_verifikasi" && (
            <div className="flex gap-2">
              <button
                type="button"
                disabled={isUpdating}
                onClick={() => onTolak(booking.id)}
                className="flex-1 rounded-lg border border-destructive py-1.5 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/5 disabled:opacity-50"
              >
                Tolak
              </button>
              <button
                type="button"
                disabled={isUpdating}
                onClick={() => onKonfirmasi(booking.id)}
                className="flex-1 rounded-lg bg-primary py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                Setujui
              </button>
            </div>
          )}

          {booking.status_verifikasi === "disetujui" && onSelesai && (
            <button
              type="button"
              disabled={isUpdating}
              onClick={() => onSelesai(booking.id)}
              className="w-full rounded-lg bg-emerald-600 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Selesai Diproses
            </button>
          )}

          {booking.status_verifikasi === "selesai" && (
            <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              Booking Selesai
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
