import type { Pesanan, StatusKDS } from "@/types/karyawan.types"
import { CardBaru, CardDiproses, CardSiap } from "./PesananCard"

interface Props {
  pesanan: Pesanan[]
  onUpdateStatus: (id: number, newStatus: StatusKDS) => void
  updatingId: number | null
}

export default function KdsBoard({ pesanan, onUpdateStatus, updatingId }: Props) {
  const baru = pesanan.filter((p) => p.status_pesanan === "dibayar")
  const diproses = pesanan.filter((p) => p.status_pesanan === "diproses")
  const siap = pesanan.filter((p) => p.status_pesanan === "selesai")

  const columns = [
    { label: "PESANAN BARU", count: baru.length, items: baru, type: "baru" as const },
    { label: "SEDANG DIPROSES", count: diproses.length, items: diproses, type: "diproses" as const },
    { label: "SIAP", count: siap.length, items: siap, type: "siap" as const },
  ]

  return (
    <div className="grid flex-1 grid-cols-3 gap-4">
      {columns.map(({ label, count, items, type }) => (
        <div key={type} className="flex flex-col rounded-xl border border-border bg-muted/40 p-4">
          {/* Column header */}
          <div className="mb-3 flex items-center gap-2">
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
                Tidak ada pesanan
              </p>
            )}
            {type === "baru" &&
              items.map((p) => (
                <CardBaru
                  key={p.id}
                  pesanan={p}
                  onUpdateStatus={onUpdateStatus}
                  isUpdating={updatingId === p.id}
                />
              ))}
            {type === "diproses" &&
              items.map((p) => (
                <CardDiproses
                  key={p.id}
                  pesanan={p}
                  onUpdateStatus={onUpdateStatus}
                  isUpdating={updatingId === p.id}
                />
              ))}
            {type === "siap" &&
              items.map((p) => <CardSiap key={p.id} pesanan={p} />)}
          </div>
        </div>
      ))}
    </div>
  )
}
