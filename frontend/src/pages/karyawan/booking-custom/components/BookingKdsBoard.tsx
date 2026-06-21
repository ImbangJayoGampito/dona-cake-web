import type { Booking } from "@/types/karyawan.types"
import BookingCustomCard from "./BookingCustomCard"

interface Props {
  bookings: Booking[]
  onKonfirmasi: (id: number) => void
  onTolak: (id: number) => void
  onSelesai: (id: number) => void
  updatingId: number | null
}

export default function BookingKdsBoard({
  bookings,
  onKonfirmasi,
  onTolak,
  onSelesai,
  updatingId,
}: Props) {
  const pending = bookings.filter((b) => b.status_verifikasi === "menunggu_verifikasi")
  const proses = bookings.filter((b) => b.status_verifikasi === "disetujui")
  const selesai = bookings.filter((b) => b.status_verifikasi === "selesai")

  const columns = [
    {
      label: "PENDING KONFIRMASI",
      count: pending.length,
      items: pending,
      type: "pending" as const,
    },
    {
      label: "SEDANG DIPROSES",
      count: proses.length,
      items: proses,
      type: "proses" as const,
    },
    {
      label: "SELESAI",
      count: selesai.length,
      items: selesai,
      type: "selesai" as const,
    },
  ]

  return (
    <div className="grid flex-1 grid-cols-3 gap-4">
      {columns.map(({ label, count, items, type }) => (
        <div
          key={type}
          className="flex flex-col rounded-xl border border-border bg-muted/40 p-4"
        >
          {/* Column header */}
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {label}
            </span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-bold text-muted-foreground">
              {count}
            </span>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-3">
            {items.length === 0 && (
              <p className="py-8 text-center text-xs text-muted-foreground">
                Tidak ada booking
              </p>
            )}
            {items.map((b) => (
              <BookingCustomCard
                key={b.id}
                booking={b}
                onKonfirmasi={onKonfirmasi}
                onTolak={onTolak}
                onSelesai={onSelesai}
                isUpdating={updatingId === b.id}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
