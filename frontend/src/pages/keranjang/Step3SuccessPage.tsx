import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Search,
  MapPin,
  MessageCircle,
  CheckCircle2,
  Mail,
  ArrowRight,
} from "lucide-react"
import { ProdukService } from "@/services/produk-service"
import { Pesanan } from "@/models/pesanan.model"
import {
  PesananStatus,
  getPesananColor,
  type PesananStatus as PesananStatusType,
} from "@/types/enums"
import WhatsAppButton from "@/components/whatsapp_button"
interface SuccessPageProps {
  onHome: () => void
  onTrack: () => void
  pesanan: Pesanan
}

// ─── Page 3: Pesanan Berhasil ─────────────────────────────────────────────────

export default function Step3SuccessPage({
  onHome,
  onTrack,
  pesanan,
}: SuccessPageProps) {
  const orderMap: Record<string, string> = {
    ID_PESANAN: pesanan.id.toString(),
    TOTAL: pesanan.total_harga.toString(),
    STATUS: pesanan.status_pesanan as string,
  }
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-lg shadow-sm">
          <CardContent className="flex flex-col items-center space-y-6 pt-10 pb-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 size={30} className="text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                Pesanan Kamu Sedang Diproses
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Terima kasih! Pesananmu sedang kami proses. Silahkan bayar
                terlebih dahulu.
              </p>
            </div>
            <div className="grid w-full grid-cols-2 gap-4 rounded-xl border border-border bg-muted/30 p-5 text-left">
              {Object.entries(orderMap).map(([k, v]) => (
                <div key={k}>
                  <p className="text-[10px] font-semibold tracking-widest text-muted-foreground">
                    {k}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-foreground">
                    {v}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex w-full items-center gap-2 rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-xs text-muted-foreground">
              <Mail size={13} /> Konfirmasi pesanan telah dikirim ke{" "}
              <span className="ml-1 font-semibold">email@kamu.com</span>
            </div>
            <div className="flex w-full gap-3">
              <Button onClick={onTrack} className="flex-1">
                Lacak Pesananku <ArrowRight size={14} className="ml-1" />
              </Button>
              <Button
                onClick={onHome}
                variant="outline"
                className="flex-1 border-border text-foreground"
              >
                Kembali ke Beranda
              </Button>
              <WhatsAppButton
                id_pesanan={pesanan.id}
                type_of_message="Pesanan"
                beginningMessage="Saya mau meminta konfirmasi pembayaran pada produk ini."
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
