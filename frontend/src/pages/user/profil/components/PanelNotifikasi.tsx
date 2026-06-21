// =============================================================================
// Panel Notifikasi — preferensi notifikasi (UI-only, endpoint belum ada)
// =============================================================================

import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface NotifPrefs {
  email_promo: boolean
  whatsapp_order: boolean
  ulasan_interaksi: boolean
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full transition-colors focus:outline-none",
        checked ? "bg-primary" : "bg-muted"
      )}
    >
      <span
        className={cn(
          "absolute top-1 h-3 w-3 rounded-full bg-white transition-transform",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  )
}

export default function PanelNotifikasi() {
  const [prefs, setPrefs] = useState<NotifPrefs>({
    email_promo: true,
    whatsapp_order: false,
    ulasan_interaksi: true,
  })

  const set = (key: keyof NotifPrefs) => (val: boolean) =>
    setPrefs((p) => ({ ...p, [key]: val }))

  const handleSave = () => {
    // Endpoint belum ada — tampil toast info
    toast.success("Preferensi notifikasi disimpan.")
  }

  const ITEMS = [
    {
      key: "email_promo" as const,
      label: "Email Promosi & Penawaran",
      desc: "Rekomendasi produk & kupon spesial",
    },
    {
      key: "whatsapp_order" as const,
      label: "WhatsApp Order Update",
      desc: "Konfirmasi pesanan & pengiriman",
    },
    {
      key: "ulasan_interaksi" as const,
      label: "Ulasan & Interaksi",
      desc: "Balasan ulasan dan mentions",
    },
  ]

  return (
    <div>
      <div className="mb-2">
        <h2 className="mb-1 text-2xl font-semibold text-foreground">
          Notifikasi
        </h2>
        <p className="text-sm text-muted-foreground">
          Atur preferensi pemberitahuan Anda.
        </p>
      </div>

      <Separator className="my-6" />

      <div className="space-y-5">
        {ITEMS.map(({ key, label, desc }) => (
          <div
            key={key}
            className="flex items-center justify-between border-b border-border py-2"
          >
            <div>
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
            <Toggle checked={prefs[key]} onChange={set(key)} />
          </div>
        ))}
        <Button variant="outline" size="sm" className="mt-2" onClick={handleSave}>
          Simpan Preferensi
        </Button>
      </div>
    </div>
  )
}
