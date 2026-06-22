import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import type { Pesanan, StatusKDS } from "@/types/karyawan.types"

interface Props {
  pesanan: Pesanan
  onUpdateStatus: (id: number, newStatus: StatusKDS) => void
  isUpdating: boolean
}

/** Format elapsed time dari created_at pesanan */
function useElapsed(createdAt: string) {
  const [elapsed, setElapsed] = useState("")
  const [isLate, setIsLate] = useState(false)

  useEffect(() => {
    function tick() {
      const diff = Math.floor(
        (Date.now() - new Date(createdAt).getTime()) / 1000
      )
      const m = Math.floor(diff / 60)
      const s = diff % 60
      setElapsed(`${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`)
      setIsLate(m >= 15)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [createdAt])

  return { elapsed, isLate }
}

// Kolom "PESANAN BARU" (status: dibayar)
function CardBaru({ pesanan, onUpdateStatus, isUpdating }: Props) {
  const { elapsed, isLate } = useElapsed(pesanan.created_at)
  const firstItem = pesanan.item_pesanans?.[0]

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-2 flex items-start justify-between">
        <span className="text-sm font-semibold text-primary">
          #DC-{String(pesanan.id).padStart(4, "0")}
        </span>
        <span className={cn("text-sm font-mono font-medium", isLate ? "text-red-500" : "text-amber-500")}>
          {elapsed}
        </span>
      </div>
      <p className="font-semibold text-foreground">
        {firstItem?.produk?.nama_produk ?? "Pesanan"}
      </p>
      {pesanan.item_pesanans && pesanan.item_pesanans.length > 1 && (
        <p className="text-xs text-muted-foreground">
          +{pesanan.item_pesanans.length - 1} item lainnya
        </p>
      )}
      <div className="mt-3 flex items-center justify-between">
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
          Takeaway
        </span>
        <button
          type="button"
          disabled={isUpdating}
          onClick={() => onUpdateStatus(pesanan.id, "diproses")}
          className="rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          Proses
        </button>
      </div>
    </div>
  )
}

// Kolom "SEDANG DIPROSES" (status: diproses)
function CardDiproses({ pesanan, onUpdateStatus, isUpdating }: Props) {
  const { elapsed } = useElapsed(pesanan.created_at)
  const firstItem = pesanan.item_pesanans?.[0]

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-2 flex items-start justify-between">
        <span className="text-sm font-semibold text-primary">
          #DC-{String(pesanan.id).padStart(4, "0")}
        </span>
        <span className="text-sm font-mono font-medium text-amber-500">
          {elapsed}
        </span>
      </div>
      <p className="font-semibold text-foreground">
        {firstItem?.produk?.nama_produk ?? "Pesanan"}
      </p>
      <p className="text-xs text-muted-foreground">Status: Sedang Diproses</p>
      {/* Progress bar visual */}
      <div className="my-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full w-2/3 rounded-full bg-amber-500" />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {pesanan.pelanggan?.nama ?? "Karyawan"}
        </span>
        <button
          type="button"
          disabled={isUpdating}
          onClick={() => onUpdateStatus(pesanan.id, "selesai")}
          className="rounded-lg bg-muted px-4 py-1.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted/80 disabled:opacity-50"
        >
          Selesai
        </button>
      </div>
    </div>
  )
}

// Kolom "SIAP" (status: selesai)
function CardSiap({
  pesanan,
  onDismiss,
}: {
  pesanan: Pesanan
  onDismiss: (id: number) => void
}) {
  const firstItem = pesanan.item_pesanans?.[0]

  return (
    <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/30">
      <div className="mb-2 flex items-start justify-between">
        <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
          #DC-{String(pesanan.id).padStart(4, "0")}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-emerald-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </div>
      <p className="font-semibold text-foreground">
        {firstItem?.produk?.nama_produk ?? "Pesanan"}
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          className="flex-1 rounded-lg bg-emerald-600 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Panggil
        </button>
        <button
          type="button"
          onClick={() => onDismiss(pesanan.id)}
          className="flex-1 rounded-lg border border-emerald-300 dark:border-emerald-800 bg-transparent py-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-300 transition-colors hover:bg-emerald-100 dark:hover:bg-emerald-950/50"
        >
          Sembunyikan
        </button>
      </div>
    </div>
  )
}

export { CardBaru, CardDiproses, CardSiap }
