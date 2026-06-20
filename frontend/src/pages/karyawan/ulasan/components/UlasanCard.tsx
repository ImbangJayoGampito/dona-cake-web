import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import type { Ulasan } from "@/types/karyawan.types"

interface Props {
  ulasan: Ulasan
  onKirimBalasan: (id: number, balasan: string) => Promise<void>
}

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i <= rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
          )}
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}

function formatWaktu(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 3600) return `${Math.floor(diff / 60)} menit yang lalu`
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam yang lalu`
  return `${Math.floor(diff / 86400)} hari yang lalu`
}

const DRAFT_KEY = (id: number) => `ulasan-draft-${id}`

export default function UlasanCard({ ulasan, onKirimBalasan }: Props) {
  const isPrioritas = ulasan.rating <= 2
  const sudahDibalas = !!ulasan.balasan

  const [draft, setDraft] = useState(
    () => localStorage.getItem(DRAFT_KEY(ulasan.id)) ?? ""
  )
  const [isSending, setIsSending] = useState(false)

  const handleDraftChange = (val: string) => {
    setDraft(val)
    localStorage.setItem(DRAFT_KEY(ulasan.id), val)
  }

  const handleSimpanDraft = () => {
    localStorage.setItem(DRAFT_KEY(ulasan.id), draft)
  }

  const handleKirim = async () => {
    if (!draft.trim()) return
    setIsSending(true)
    try {
      await onKirimBalasan(ulasan.id, draft)
      localStorage.removeItem(DRAFT_KEY(ulasan.id))
      setDraft("")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div
      className={cn(
        "flex gap-4 rounded-xl border bg-card p-5",
        isPrioritas
          ? "border-l-4 border-l-red-500 border-border"
          : "border-border"
      )}
    >
      {/* Konten ulasan */}
      <div className="flex-1">
        <div className="flex items-start gap-2">
          {isPrioritas && (
            <span className="shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold uppercase text-red-600 dark:bg-red-950">
              PRIORITAS
            </span>
          )}
          <span className="text-sm font-semibold text-foreground">
            {ulasan.produk?.nama_produk ?? "Produk"}
          </span>
        </div>

        <div className="mt-1 flex items-center gap-2">
          <StarDisplay rating={ulasan.rating} />
          <span className="text-xs text-muted-foreground">
            Ulasan oleh {ulasan.pelanggan?.nama ?? "Pelanggan"} ·{" "}
            {formatWaktu(ulasan.created_at)}
          </span>
        </div>

        <p className="mt-2 text-sm text-foreground">"{ulasan.komentar}"</p>

        {/* Official Reply */}
        {sudahDibalas && (
          <div className="mt-3 rounded-lg border border-border bg-muted/50 p-3">
            <div className="flex items-center justify-between">
              <span className="rounded border border-border px-1.5 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">
                Official Reply
              </span>
              <span className="text-xs text-muted-foreground">
                {ulasan.waktu_balasan
                  ? formatWaktu(ulasan.waktu_balasan)
                  : "Baru saja"}
              </span>
            </div>
            <p className="mt-1 text-xs font-medium text-primary">
              {ulasan.nama_admin_balas ?? "Admin"}
            </p>
            <p className="mt-1 text-sm text-foreground">
              "{ulasan.balasan}"
            </p>
          </div>
        )}
      </div>

      {/* Foto produk (hanya pada ulasan sudah dibalas) */}
      {sudahDibalas && ulasan.produk?.gambar_utama && (
        <div className="shrink-0">
          <img
            src={ulasan.produk.gambar_utama}
            alt={ulasan.produk.nama_produk}
            className="h-16 w-16 rounded-lg object-cover"
          />
        </div>
      )}

      {/* Form balas (hanya jika belum dibalas) */}
      {!sudahDibalas && (
        <div className="w-56 shrink-0 space-y-2">
          <p className="text-xs font-semibold text-primary">Balas Ulasan</p>
          <Textarea
            placeholder={
              isPrioritas
                ? "Tulis tanggapan profesional..."
                : "Balas ulasan pelanggan..."
            }
            rows={4}
            value={draft}
            onChange={(e) => handleDraftChange(e.target.value)}
            className="resize-none text-sm"
          />
          {!isPrioritas && (
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleSimpanDraft}
            >
              Simpan Draft
            </Button>
          )}
          <Button
            size="sm"
            className="w-full bg-primary text-white hover:opacity-90"
            disabled={!draft.trim() || isSending}
            onClick={handleKirim}
          >
            {isSending ? "Mengirim..." : "Kirim Balasan"}
          </Button>
        </div>
      )}
    </div>
  )
}
