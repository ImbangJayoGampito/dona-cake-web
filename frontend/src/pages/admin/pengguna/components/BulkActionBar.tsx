import { Trash2, Mail, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BulkActionBarProps {
  selectedCount: number
  onSendEmail: () => void
  onDelete: () => void
  onClear: () => void
}

/**
 * Bulk action bar — muncul saat ada baris yang dipilih.
 * Sesuai keputusan: tombol "Blokir" dihapus karena tidak ada
 * endpoint/field status di backend. Hanya Kirim Email + Hapus.
 * Hapus = hard delete permanen, modal konfirmasi terpisah di halaman.
 */
export default function BulkActionBar({
  selectedCount,
  onSendEmail,
  onDelete,
  onClear,
}: BulkActionBarProps) {
  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
        "flex items-center gap-3 rounded-2xl bg-[#1A1A1A] px-5 py-3 shadow-2xl",
        "transition-all duration-250",
        selectedCount > 0
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <span className="border-r border-white/20 pr-4 text-sm font-medium text-white">
        {selectedCount} pengguna dipilih
      </span>

      <Button
        variant="ghost"
        size="sm"
        onClick={onSendEmail}
        className="gap-1.5 text-white/80 hover:bg-white/10 hover:text-white"
      >
        <Mail className="h-4 w-4" strokeWidth={1.75} />
        Kirim Email
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onDelete}
        className="gap-1.5 text-[#F87171] hover:bg-white/10 hover:text-[#FCA5A5]"
      >
        <Trash2 className="h-4 w-4" strokeWidth={1.75} />
        Hapus
      </Button>

      <button
        onClick={onClear}
        className="ml-1 text-white/50 hover:text-white transition-colors"
        title="Batalkan pilihan"
      >
        <X className="h-4 w-4" strokeWidth={1.75} />
      </button>
    </div>
  )
}
