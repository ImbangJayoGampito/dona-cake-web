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

interface Step1Interface {
  order: number
  nextOrder: (order: number) => void
}

import BookingConfig from "@/config/booking"

export default function Step1Configure(props: Step1Interface) {
  const [size, setSize] = useState("20cm")
  const [flavors, setFlavors] = useState(["Vanila"])
  const [frosting, setFrosting] = useState("Buttercream")
  const [theme, setTheme] = useState("floral")

  const toggleFlavor = (f: string) => {
    setFlavors((prev) =>
      prev.includes(f)
        ? prev.filter((x) => x !== f)
        : prev.length < 2
          ? [...prev, f]
          : prev
    )
  }

  const onNext = () => {
    props.nextOrder(props.order + 1)
  }

  const orderData = {
    step: 1,
    size,
    flavors,
    frosting,
    theme,
  }

  return (
    <div className="grid items-start gap-6 md:grid-cols-[1fr_280px]">
      <Card className="border-border shadow-sm">
        <CardContent className="space-y-6 pt-6">
          <div>
            <h1 className="mb-1 text-2xl font-semibold text-foreground">
              Konfigurasi Kue Impianmu
            </h1>
            <p className="text-sm text-muted-foreground">
              Personalisasikan detail dasar kue Anda untuk memulai proses
              pesanan custom.
            </p>
          </div>

          {/* Size */}
          <div>
            <Label className="mb-3 block text-sm font-semibold text-foreground">
              Ukuran Kue
            </Label>
            <div className="flex flex-wrap gap-2">
              {BookingConfig.SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`rounded-full border px-4 py-2 text-sm transition-all ${
                    size === s
                      ? "border-primary bg-primary/10 font-medium text-primary"
                      : "border-border text-foreground hover:border-muted-foreground"
                  }`}
                >
                  {s === "20cm" && (
                    <span className="mr-1 inline-block h-3 w-3 rounded-full border border-current align-middle" />
                  )}
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Flavor */}
          <div>
            <div className="mb-3 flex justify-between">
              <Label className="text-sm font-semibold text-foreground">
                Rasa Kue
              </Label>
              <span className="text-xs text-muted-foreground">
                Maksimal 2 rasa
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {BookingConfig.FLAVORS.map((f) => (
                <button
                  key={f}
                  onClick={() => toggleFlavor(f)}
                  className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
                    flavors.includes(f)
                      ? "border-primary bg-primary font-medium text-primary-foreground"
                      : "border-border text-foreground hover:border-muted-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Frosting */}
          <div>
            <Label className="mb-3 block text-sm font-semibold text-foreground">
              Jenis Frosting
            </Label>
            <div className="flex flex-wrap gap-2">
              {BookingConfig.FROSTINGS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFrosting(f)}
                  className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
                    frosting === f
                      ? "border-primary bg-primary/10 font-medium text-primary"
                      : "border-border text-foreground hover:border-muted-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div>
            <Label className="mb-3 block text-sm font-semibold text-foreground">
              Tema Dekorasi
            </Label>
            <div className="grid grid-cols-4 gap-3">
              {BookingConfig.THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`relative overflow-hidden rounded-xl border-2 transition-all ${
                    theme === t.id ? "border-primary" : "border-transparent"
                  }`}
                >
                  <div
                    className={`flex h-20 w-full items-end pb-2 pl-2 ${t.color}`}
                  >
                    {theme === t.id && (
                      <div className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                        <CheckCircle2
                          size={12}
                          className="text-primary-foreground"
                        />
                      </div>
                    )}
                    <span className="text-[10px] font-medium text-white drop-shadow">
                      {t.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {/* Preview */}
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-foreground">
              Preview Kue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-36 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border text-muted-foreground">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Package size={18} />
              </div>
              <p className="px-4 text-center text-xs">
                Pilih tema dekorasi untuk melihat visualisasi sementara di sini.
              </p>
            </div>
          </CardContent>
        </Card>

        <OrderSummary order={orderData} />
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between pt-2 md:col-span-2">
        <Button variant="ghost" size="sm" className="text-foreground">
          <ChevronLeft size={16} className="mr-1" /> Kembali ke Beranda
        </Button>
        <Button
          onClick={onNext}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Lanjut: Referensi & Catatan{" "}
          <ChevronRight size={16} className="ml-1" />
        </Button>
      </div>
    </div>
  )
}

