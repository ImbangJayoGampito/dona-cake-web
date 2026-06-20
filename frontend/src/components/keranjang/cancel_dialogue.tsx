import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle } from "lucide-react"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { SelectItem } from "@/components/ui/select"
import { SelectContent } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
interface CancelDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}
export default function CancelDialog({
  open,
  onClose,
  onConfirm,
}: CancelDialogProps) {
  const [reason, setReason] = useState("")
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-2xl">
        <div className="flex flex-col items-center space-y-4 pt-2 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <AlertTriangle size={24} className="text-primary" />
          </div>
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-xl font-semibold text-foreground">
              Batalkan Pesanan?
            </DialogTitle>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Yakin ingin membatalkan pesanan? Tindakan ini tidak dapat
              diurungkan.
            </p>
          </DialogHeader>
          <div className="w-full space-y-2 text-left">
            <Label className="text-sm font-medium text-foreground">
              Alasan Pembatalan
            </Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger className="w-full text-sm text-muted-foreground">
                <SelectValue placeholder="Pilih alasan..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salah-pesan">
                  Salah memesan produk
                </SelectItem>
                <SelectItem value="berubah-pikiran">Berubah pikiran</SelectItem>
                <SelectItem value="harga">
                  Menemukan harga lebih baik
                </SelectItem>
                <SelectItem value="lainnya">Alasan lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-full gap-3 pt-1">
            <Button
              onClick={onClose}
              className="flex-1 border-border font-medium text-foreground"
            >
              Tidak, Kembali
            </Button>
            <Button
              onClick={onConfirm}
              className="text-destructive-foreground flex-1 bg-destructive font-medium hover:bg-destructive/90"
            >
              Ya, Batalkan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
