import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface DeleteUserDialogProps {
  /** Jumlah user yang akan dihapus (1 = hapus single, >1 = bulk) */
  count: number
  /** Nama user untuk single delete, kosong untuk bulk */
  userName?: string
  open: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
}

/**
 * Modal konfirmasi hapus user — WAJIB tampil sebelum hard delete.
 * Cascade delete ke data pelanggan terjadi otomatis di backend,
 * jadi peringatan ini harus jelas.
 */
export default function DeleteUserDialog({
  count,
  userName,
  open,
  onClose,
  onConfirm,
}: DeleteUserDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleConfirm() {
    setIsDeleting(true)
    await onConfirm()
    setIsDeleting(false)
    onClose()
  }

  const title = count === 1 ? "Hapus Pengguna?" : `Hapus ${count} Pengguna?`
  const description =
    count === 1
      ? `Akun "${userName ?? "pengguna ini"}" akan dihapus secara permanen beserta seluruh data pelanggan yang terhubung.`
      : `${count} akun yang dipilih akan dihapus secara permanen beserta seluruh data pelanggan yang terhubung.`

  return (
    <Dialog open={open} onOpenChange={(v) => !v && !isDeleting && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#D94F4F]">{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="flex items-start gap-3 rounded-xl bg-[#FDF0F0] px-4 py-3">
            <AlertTriangle
              className="mt-0.5 h-5 w-5 shrink-0 text-[#D94F4F]"
              strokeWidth={1.75}
            />
            <div className="space-y-1 text-sm text-[#A32D2D]">
              <p className="font-medium">{description}</p>
              <p>Tindakan ini tidak dapat diurungkan.</p>
            </div>
          </div>

          <ul className="space-y-1 text-sm text-muted-foreground pl-4 list-disc">
            <li>Data profil pelanggan ikut terhapus permanen</li>
            <li>Riwayat pesanan mungkin terpengaruh</li>
            <li>Tidak ada cara untuk memulihkan data ini</li>
          </ul>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="ghost" onClick={onClose} disabled={isDeleting}>
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Menghapus..." : "Ya, Hapus Permanen"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
