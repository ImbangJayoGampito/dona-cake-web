import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Keranjang } from "@/models/keranjang.model"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ShoppingCart,
  User,
  Globe,
  Share2,
  Minus,
  Plus,
  Trash2,
  AlertTriangle,
  Shield,
  CheckCircle2,
  Mail,
  ArrowRight,
  Search,
  MoreVertical,
  Paperclip,
  Smile,
  Send,
  MapPin,
  MessageCircle,
  ChevronRight,
} from "lucide-react"
import { ProdukService } from "@/services/produk-service"
import { Pesanan } from "@/models/pesanan.model"
import { BookingStatus } from "@/types/enums"

interface PaymentPageProps {
  onNext: () => void
  onBack: () => void
  pesanan: Pesanan
}

export default function PaymentPage({
  onNext,
  onBack,
  pesanan,
}: PaymentPageProps) {
  // WhatsApp link – replace with your own number and message


  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <div className="grid items-start gap-6 md:grid-cols-[1fr_300px]">
          {/* Left: Payment method */}
          <Card className="shadow-sm">
            <CardContent className="space-y-6 pt-6">
              <h2 className="text-lg font-semibold text-foreground">
                Metode Pembayaran
              </h2>

              {/* WhatsApp payment card */}
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8"
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Bayar Melalui WhatsApp
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Kirim pesan WhatsApp untuk konfirmasi pembayaran Anda.
                </p>
                <div className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-xs text-foreground/70">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-[10px] font-bold text-primary">
                      i
                    </span>
                  </div>
                  Kamu akan membayar{" "}
                  <span className="mx-1 font-semibold text-primary">
                    {ProdukService.formatPrice(pesanan.total_harga / 1000)}k
                  </span>{" "}
                  melalui WhatsApp
                </div>
              </div>

              <Button
                onClick={onBack}
                variant="outline"
                className="gap-2 border-primary/20 text-primary hover:bg-primary/10"
              >
                Kembali <ArrowRight size={14} />
              </Button>
            </CardContent>
          </Card>

          {/* Right: Summary (unchanged) */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-foreground">
                Ringkasan Pesanan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pesanan.itemPesanans &&
                pesanan.itemPesanans.map((p) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-foreground">
                        {p.produk?.nama_produk}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Qty: {p.kuantitas}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-foreground">
                      {ProdukService.formatPrice((p.produk?.harga ?? 0) / 1000)}
                      k
                    </span>
                  </div>
                ))}
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{ProdukService.formatPrice(pesanan.total_harga)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Diskon Promo</span>
                  <span className="text-destructive">-Rp 0</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Biaya Layanan</span>
                  <span>Rp 0</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-bold text-foreground">
                <span>Total</span>
                <span className="text-primary">
                  {ProdukService.formatPrice(pesanan.total_harga)}
                </span>
              </div>

              {/* WhatsApp payment button */}

                <Button
                  onClick={onNext}
                  className="w-full bg-green-600 font-medium hover:bg-green-700"
                >
                  Bayar via WhatsApp <ArrowRight size={15} className="ml-1" />
                </Button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
                <Shield size={11} /> Pembayaran Aman & Terenkripsi
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
