import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ShoppingCart,
  User,
  ChevronLeft,
  ChevronRight,
  Info,
  Upload,
  Calendar,
  Clock,
  Package,
  CreditCard,
  Building2,
  Wallet,
  CheckCircle2,
} from "lucide-react"
import { useEffect } from "react"
import type { BookingForm } from "@/types/booking.types"
import OrderSummary from "@/components/booking/order-summary"
import BookingConfig from "@/config/booking"
const TEXT_COLORS = ["#fff", "#2d2016", "#c8a84b", "#e87ca0", "#2d6e3e"]

interface Step1Interface {
  order: BookingForm
  setOrder: React.Dispatch<React.SetStateAction<BookingForm>>
  steps: number
  nextStep: (steps: number) => void
  onBack: (steps: number) => void
}

export default function Step2Reference(props: Step1Interface) {
  const { order, setOrder, steps, nextStep, onBack } = props
  const [packaging, setPackaging] = useState(BookingConfig.PACKAGINGS[0].id)
  const [textColor, setTextColor] = useState("#2d2016")
  const [customText, setCustomText] = useState("")
  const [notes, setNotes] = useState("")

  const handleNext = () => {
    setOrder({
      ...order,
      packaging: packaging,
      deskripsi_custom: customText,
      catatan: notes,
    })
    nextStep(steps + 1)
  }

  const handleBack = () => {
    onBack(steps - 1)
  }

  return (
    <div className="grid items-start gap-6 md:grid-cols-[1fr_280px]">
      <Card className="border-border shadow-sm">
        <CardContent className="space-y-6 pt-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Referensi Desain & Catatan Khusus
            </h1>
            <p className="text-sm text-muted-foreground">
              Tambahkan referensi desain dan instruksi khusus untuk kue Anda
            </p>
          </div>

          {/* Upload */}
          <div>
            <Label className="mb-2 block text-xs font-semibold tracking-widest text-muted-foreground">
              UPLOAD FOTO REFERENSI
            </Label>
            <div className="flex h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/20 bg-primary/5 transition-colors hover:bg-primary/10">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Upload size={18} className="text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">
                Klik atau drag foto ke sini
              </p>
              <p className="text-xs text-muted-foreground">
                Mendukung JPG, PNG (Maks. 5MB)
              </p>
            </div>
          </div>

          {/* Text & Color */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-2 block text-xs font-semibold tracking-widest text-muted-foreground">
                TULISAN PADA KUE
              </Label>
              <Input
                placeholder="Contoh: Happy Birthday Sarah"
                className="border-border text-foreground"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-2 block text-xs font-semibold tracking-widest text-muted-foreground">
                WARNA TULISAN
              </Label>
              <div className="mt-1 flex gap-2">
                {TEXT_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setTextColor(c)}
                    style={{ backgroundColor: c }}
                    className={`h-8 w-8 rounded-full border-2 transition-all ${
                      textColor === c
                        ? "scale-110 border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label className="mb-2 block text-xs font-semibold tracking-widest text-muted-foreground">
              CATATAN KHUSUS (ALERGI, MODIFIKASI, DLL)
            </Label>
            <Textarea
              placeholder="Tuliskan instruksi tambahan di sini ..."
              className="min-h-[100px] resize-none border-border text-foreground"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Packaging */}
          <div>
            <Label className="mb-3 block text-xs font-semibold tracking-widest text-muted-foreground">
              PILIHAN KEMASAN
            </Label>
            <div className="grid grid-cols-3 gap-3">
              {BookingConfig.PACKAGINGS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPackaging(p.id)}
                  className={`rounded-xl border-2 p-3 text-left transition-all ${
                    packaging === p.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground/50"
                  }`}
                >
                  <div className="mb-1 flex items-start justify-between">
                    <Package size={16} className="text-muted-foreground" />
                    <div
                      className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                        packaging === p.id
                          ? "border-primary"
                          : "border-muted-foreground"
                      }`}
                    >
                      {packaging === p.id && (
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-foreground">
                    {p.name}
                  </p>
                  <p className="mt-0.5 text-[10px] leading-tight text-muted-foreground">
                    {p.description}
                  </p>
                  <p
                    className={`mt-2 text-xs font-semibold ${
                      BookingConfig.calculatePackagingPrice(p.id) === 0
                        ? "text-green-600 dark:text-green-500"
                        : "text-foreground"
                    }`}
                  >
                    {BookingConfig.calculatePackagingPrice(p.id) === 0
                      ? "Gratis"
                      : BookingConfig.calculatePackagingPrice(p.id)}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <OrderSummary
        order={order}
        step={steps}
      />

      <div className="flex items-center justify-between pt-2 md:col-span-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="text-foreground hover:bg-muted"
        >
          <ChevronLeft size={16} className="mr-1" /> Kembali
        </Button>
        <Button
          onClick={handleNext}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Lanjut: Pilih Tanggal <ChevronRight size={16} className="ml-1" />
        </Button>
      </div>
    </div>
  )
}
