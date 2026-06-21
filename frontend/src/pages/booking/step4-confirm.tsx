import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ChevronLeft,
  Edit,
  Info,
  CreditCard,
  Building2,
  Wallet,
  ArrowRight,
  MessageCircle,
} from "lucide-react"
import OrderSummary from "@/components/booking/order-summary"
import BookingConfig from "@/config/booking"
import type { BookingForm } from "@/types/booking.types"
import { getTimeFromDatetime, getDateFromDatetime } from "@/lib/time_management"

interface Step4Interface {
  order: BookingForm
  setOrder: React.Dispatch<React.SetStateAction<BookingForm>>
  steps: number
  onBack: () => void
  onNext: () => void
}

export default function Step4Confirm({
  order,
  setOrder,
  steps,
  onBack,
  onNext,
}: Step4Interface) {
  const [payMode, setPayMode] = useState("dp")
  const [payMethod, setPayMethod] = useState("kartu")
  const [agreed, setAgreed] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvc, setCvc] = useState("")
  const [whatsappNumber, setWhatsAppNumber] = useState("")

  // Calculate DP amount (50% of total)
  const totalAmount = order.harga_final || 350000
  const dpAmount = totalAmount / 2
  const paymentAmount = payMode === "dp" ? dpAmount : totalAmount

  const handleNext = () => {
    setOrder({
      ...order,
      whatsapp_number: `62${whatsappNumber}`,
    })
    onNext()
  }

  return (
    <div className="grid items-start gap-6 md:grid-cols-[1fr_280px]">
      <Card className="border-border shadow-sm">
        <CardContent className="space-y-6 pt-6">
          <div>
            <h1 className="mb-1 text-2xl font-semibold text-foreground">
              Konfirmasi & Bayar
            </h1>
            <p className="text-sm text-muted-foreground">
              Silahkan periksa kembali detail pesanan Anda sebelum melakukan
              pembayaran
            </p>
          </div>

          {/* Booking Summary */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold text-foreground">
                Ringkasan Booking
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto px-0 py-0 text-xs text-primary hover:text-primary/80"
              >
                <Edit size={12} className="mr-1" /> Edit Detail
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 rounded-xl bg-muted/50 p-4 text-sm">
              <div>
                <p className="text-[10px] font-semibold tracking-widest text-muted-foreground">
                  NAMA PEMESAN
                </p>
                <p className="mt-0.5 font-medium text-foreground">
                  Amanda Wijaya
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-widest text-muted-foreground">
                  TANGGAL PENGAMBILAN
                </p>
                <p className="mt-0.5 font-medium text-foreground">
                  {order.tgl_ambil
                    ? getDateFromDatetime(order.tgl_ambil)?.toLocaleDateString()
                    : "Belum dipilih"}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-widest text-muted-foreground">
                  KONFIGURASI KUE
                </p>
                <p className="mt-0.5 font-medium text-foreground">
                  {order.ukuran},{" "}
                  {BookingConfig.formatFlavorLabels(order.rasa_kue)}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-widest text-muted-foreground">
                  WAKTU PENGAMBILAN
                </p>
                <p className="mt-0.5 font-medium text-foreground">
                  {getTimeFromDatetime(order.tgl_ambil) || "Belum dipilih"}
                </p>
              </div>
            </div>
          </div>

          {/* DP Policy */}
          <Alert className="border-primary/20 bg-primary/5">
            <Info size={14} className="mt-0.5 text-primary" />
            <AlertDescription className="text-xs text-foreground">
              <span className="font-semibold">Kebijakan Down Payment (DP)</span>
              <br />
              Pembayaran uang muka sebesar 50% untuk mengamankan slot pesanan
              Anda. Pelunasan dilakukan saat pengambilan.
            </AlertDescription>
          </Alert>

          {/* Payment Mode */}
          <div>
            <Label className="mb-3 block text-sm font-semibold text-foreground">
              Metode Pembayaran
            </Label>
            <div className="mb-4 grid grid-cols-2 gap-2">
              {[
                {
                  id: "dp",
                  label: `DP (50%) - Rp ${dpAmount.toLocaleString()}`,
                },
                {
                  id: "lunas",
                  label: `Lunas - Rp ${totalAmount.toLocaleString()}`,
                },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPayMode(m.id)}
                  className={`rounded-lg border py-2.5 text-sm font-medium transition-all ${
                    payMode === m.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:border-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="mb-4 grid grid-cols-3 gap-2">
              {[
                { id: "kartu", label: "Kartu", icon: <CreditCard size={14} /> },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPayMethod(m.id)}
                  className={`flex items-center justify-center gap-1.5 rounded-lg border py-2.5 text-sm font-medium transition-all ${
                    payMethod === m.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:border-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  {m.icon} {m.label}
                </button>
              ))}
            </div>

            {payMethod === "kartu" && (
              <div className="space-y-3">
                <div>
                  <Label className="mb-1 block text-xs text-muted-foreground">
                    Nomor Kartu
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="XXXX XXXX XXXX XXXX"
                      className="border-border pr-10 text-foreground"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                    <CreditCard
                      size={16}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="mb-1 block text-xs text-muted-foreground">
                      Masa Berlaku
                    </Label>
                    <Input
                      placeholder="MM/YY"
                      className="border-border text-foreground"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="mb-1 block text-xs text-muted-foreground">
                      CVC
                    </Label>
                    <Input
                      placeholder="123"
                      className="border-border text-foreground"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      type="password"
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* WhatsApp Number Input */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">
              Nomor WhatsApp untuk Konfirmasi
            </Label>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-12 items-center justify-center rounded-lg border border-border bg-muted text-sm font-semibold">
                +62
              </div>
              <Input
                placeholder="81234567890"
                className="flex-1 border-border text-foreground"
                value={whatsappNumber}
                onChange={(e) => setWhatsAppNumber(e.target.value)}
                type="tel"
                inputMode="tel"
                pattern="[0-9]*"
                maxLength={12}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Nomor WhatsApp akan digunakan untuk konfirmasi pesanan dan pembayaran
            </p>
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
              className="mt-0.5 border-border"
            />
            <Label
              htmlFor="terms"
              className="cursor-pointer text-xs leading-relaxed text-muted-foreground"
            >
              Saya menyetujui{" "}
              <span className="text-primary underline hover:text-primary/80">
                Syarat & Ketentuan
              </span>{" "}
              serta kebijakan pembatalan Dona Cake.
            </Label>
          </div>
        </CardContent>
      </Card>

      <OrderSummary order={{ ...order }} step={steps} />

      <div className="md:col-span-2">
          <Button
            onClick={handleNext}
            disabled={!agreed || !whatsappNumber || whatsappNumber.length < 10}
            className="w-full bg-primary py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Konfirmasi & Bayar {payMode === "dp" ? "DP" : "Lunas"} Rp{" "}
            {paymentAmount.toLocaleString()}
            <ArrowRight size={18} className="ml-2" />
          </Button>
        <div className="mt-4 flex justify-start">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-foreground hover:bg-muted"
          >
            <ChevronLeft size={16} className="mr-1" /> Kembali
          </Button>
        </div>
      </div>
    </div>
  )
}
