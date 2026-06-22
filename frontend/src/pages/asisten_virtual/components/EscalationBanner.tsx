// src/pages/asisten/components/EscalationBanner.tsx
import { PhoneCall, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EscalationBannerProps {
  onEscalate: () => void
  onDismiss: () => void
}

export default function EscalationBanner({
  onEscalate,
  onDismiss,
}: EscalationBannerProps) {
  return (
    <div className="mx-4 mb-2 flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 dark:border-amber-800 dark:bg-amber-950/40">
      <div className="flex items-center gap-2">
        <PhoneCall size={14} className="shrink-0 text-amber-600" />
        <p className="text-xs text-amber-800 dark:text-amber-300">
          Butuh bantuan lebih lanjut? Tim CS kami siap membantu.
        </p>
      </div>
      <div className="ml-3 flex shrink-0 items-center gap-1.5">
        <Button
          size="sm"
          onClick={onEscalate}
          className="h-7 bg-amber-600 px-2.5 text-xs text-white hover:bg-amber-700"
        >
          Hubungi CS
        </Button>
        <button
          onClick={onDismiss}
          className="rounded p-0.5 text-amber-600 hover:bg-amber-100"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  )
}
