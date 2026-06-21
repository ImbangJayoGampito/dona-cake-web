import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Props {
  open: boolean
  bookingId: string
  onClose: () => void
  onConfirm: (alasan: string) => void
  isLoading: boolean
}

export default function TolakBookingDialog({
  open,
  bookingId,
  onClose,
  onConfirm,
  isLoading,
}: Props) {
  const [alasan, setAlasan] = useState("")

  const handleConfirm = () => {
    onConfirm(alasan)
    setAlasan("")
  }

  const handleClose = () => {
    setAlasan("")
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Tolak Booking {bookingId}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <p className="text-sm text-muted-foreground">
            Tindakan ini akan menolak booking dan memproses refund DP pelanggan
            secara otomatis. Masukkan alasan penolakan untuk dikirim ke
            pelanggan.
          </p>
          <Textarea
            placeholder="Contoh: Kapasitas produksi penuh pada tanggal tersebut..."
            value={alasan}
            onChange={(e) => setAlasan(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading || alasan.trim().length === 0}
          >
            {isLoading ? "Memproses..." : "Tolak Booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
