import type { StatusKDS } from "@/types/karyawan.types"
import { PesananStatus } from "@/types/enums"
import { Pesanan } from "@/models/pesanan.model"
import { CardBaru, CardDiproses, CardSiap, CardBelumDibayar } from "./PesananCard"

interface Props {
  pesanan: Pesanan[]
  onUpdateStatus: (id: number, newStatus: StatusKDS) => void
  updatingId: number | null
  onDismiss: (id: number) => void
}

export default function KdsBoard({ pesanan, onUpdateStatus, updatingId, onDismiss }: Props) {
  const menungguPembayaran = pesanan.filter((p) => p.status_pesanan === PesananStatus.MENUNGGU_PEMBAYARAN)
  const menungguKonfirmasi = pesanan.filter((p) => p.status_pesanan === PesananStatus.MENUNGGU_KONFIRMASI_PEMBAYARAN)
  const baru = pesanan.filter((p) => p.status_pesanan === PesananStatus.DIBAYAR)
  const diproses = pesanan.filter((p) => p.status_pesanan === PesananStatus.DIPROSES)
  const siap = pesanan.filter((p) => p.status_pesanan === PesananStatus.SELESAI)

  const columns = [
    { label: "MENUNGGU PEMBAYARAN", count: menungguPembayaran.length, items: menungguPembayaran, type: "menunggu_pembayaran" as const },
    { label: "MENUNGGU KONFIRMASI", count: menungguKonfirmasi.length, items: menungguKonfirmasi, type: "menunggu_konfirmasi" as const },
    { label: "PESANAN BARU", count: baru.length, items: baru, type: "baru" as const },
    { label: "SEDANG DIPROSES", count: diproses.length, items: diproses, type: "diproses" as const },
    { label: "SIAP", count: siap.length, items: siap, type: "siap" as const },
  ]

  return (
      <div className="grid flex-1 grid-cols-5 gap-4">
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
            {type === "menunggu_pembayaran" &&
              items.map((p) => (
                <CardBelumDibayar
                  key={p.id}
                  pesanan={p}
                  onVerify={() => onUpdateStatus(p.id, "menunggu_konfirmasi_pembayaran" as StatusKDS)}
                  isVerifying={updatingId === p.id}
                />
              ))}
            {type === "menunggu_konfirmasi" &&
              items.map((p) => (
                <CardBelumDibayar
                  key={p.id}
                  pesanan={p}
                  onVerify={() => onUpdateStatus(p.id, "dibayar" as StatusKDS)}
                  isVerifying={updatingId === p.id}
                />
              ))}
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
              items.map((p) => (
                <CardSiap
                  key={p.id}
                  pesanan={p}
                  onDismiss={onDismiss}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
