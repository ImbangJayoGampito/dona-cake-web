import type { Booking } from "@/types/karyawan.types"

interface Props {
  booking: Booking
  onKonfirmasi: (id: number) => void
  onTolak: (id: number) => void
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

/** Parse deskripsi_custom menjadi tags */
function parseTags(deskripsi: string | null): string[] {
  if (!deskripsi) return []
  // Coba parse sebagai JSON array, fallback ke split koma
  try {
    const parsed = JSON.parse(deskripsi)
    if (Array.isArray(parsed)) return parsed as string[]
  } catch {
    // bukan JSON
  }
  return deskripsi.split(",").map((s) => s.trim()).filter(Boolean)
}

export default function BookingCustomCard({
  booking,
  onKonfirmasi,
  onTolak,
  isUpdating,
}: Props) {
  const tags = parseTags(booking.deskripsi_custom)
  const bookingIdStr = `#BK-${String(booking.id).padStart(4, "0")}`

  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card p-5">
      {/* Foto referensi — tampilkan dari desain_custom_url jika ada */}
      <div className="h-44 w-40 shrink-0 overflow-hidden rounded-lg bg-muted">
        {booking.desain_custom_url ? (
          <img
            src={booking.desain_custom_url}
            alt="Referensi desain"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            No Image
          </div>
        )}
      </div>

      {/* Detail */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-sm font-semibold text-primary">
              {bookingIdStr}
            </span>
            <p className="text-base font-semibold text-foreground">
              {booking.pelanggan?.nama ?? "Pelanggan"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Pickup Date</p>
            <p className="text-sm font-semibold text-foreground">
              {formatTglAmbil(booking.tgl_ambil)}
            </p>
          </div>
        </div>

        {/* Grid detail 3 kolom */}
        <div className="mt-3 grid grid-cols-3 gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Base Size
            </p>
            <p className="text-sm text-foreground">
              {booking.ukuran ?? "-"}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Flavor
            </p>
            <p className="text-sm text-foreground">{booking.rasa_kue}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Theme
            </p>
            <p className="text-sm text-foreground">
              {booking.tema_dekorasi ?? "-"}
            </p>
          </div>
        </div>

        {/* Tags khusus */}
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Tombol aksi (hanya tampil di tab menunggu_verifikasi) */}
        {booking.status_verifikasi === "menunggu_verifikasi" && (
          <div className="mt-auto flex gap-2 pt-4">
            <button
              type="button"
              disabled={isUpdating}
              onClick={() => onTolak(booking.id)}
              className="rounded-lg border border-destructive px-5 py-1.5 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/5 disabled:opacity-50"
            >
              Tolak
            </button>
            <button
              type="button"
              disabled={isUpdating}
              onClick={() => onKonfirmasi(booking.id)}
              className="rounded-lg bg-primary px-5 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              Konfirmasi
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
