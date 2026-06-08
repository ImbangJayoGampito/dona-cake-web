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
  Book,
} from "lucide-react"
import { useEffect } from "react"
import OrderSummary from "@/components/booking/order-summary"
import Kategori from "@/models/kategori.model"
import { KategoriService } from "@/services/kategori-service"
interface Step1Interface {
  order: BookingForm
  setOrder: React.Dispatch<React.SetStateAction<BookingForm>>
  steps: number
  nextStep: (order: number) => void
}

import BookingConfig from "@/config/booking"
import type { BookingForm } from "@/types/booking.types"

export default function Step1Configure(props: Step1Interface) {
  const [size, setSize] = useState(BookingConfig.SIZES[0].id)
  const [flavors, setFlavors] = useState([BookingConfig.FLAVORS[0].id])
  const [frosting, setFrosting] = useState(BookingConfig.FROSTINGS[0].id)
  const [selectedKategori, setSelectedKategori] = useState<Kategori | null>(
    null
  )
  const { order, setOrder, steps, nextStep } = props
  const [kategori, setKategori] = useState<Kategori[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchKategori = async () => {
      setLoading(true)
      const result = await KategoriService.getAllKategori()
      setKategori(result.data ?? [])
      setLoading(false)
      setSelectedKategori(result.data?.[0] ?? null)
    }
    fetchKategori()
  }, [])

  const toggleFlavor = (f: string) => {
    setFlavors((prev) =>
      prev.includes(f)
        ? prev.filter((x) => x !== f)
        : prev.length < 2
          ? [...prev, f]
          : prev
    )
    setOrderTemp()
  }
  const changeSize = (s: string) => {
    setSize(s)
    setOrderTemp()
  }
  const changeFrosting = (f: string) => {
    setFrosting(f)
    setOrderTemp()
  }
  const setOrderTemp = () => {
    const initialState: BookingForm = {
      pelanggan_id: order.pelanggan_id,
      id: order.id,
      tgl_ambil: order.tgl_ambil,
      ukuran: size,
      rasa_kue: flavors,
      jenis_frosting: frosting,
      kategori_id: selectedKategori?.id ?? null,
      tema_dekorasi: order.tema_dekorasi,
      desain_custom_url: order.desain_custom_url,
      deskripsi_custom: order.deskripsi_custom,
      harga_final: order.harga_final,
      catatan: order.catatan,
      packaging: order.packaging,
    }
    setOrder(initialState)
  }
  const onNext = () => {
    setOrderTemp()
    nextStep(steps + 1)
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
                  key={s.id}
                  onClick={() => changeSize(s.id)}
                  className={`rounded-full border px-4 py-2 text-sm transition-all ${
                    size === s.id
                      ? "border-primary bg-primary/10 font-medium text-primary"
                      : "border-border text-foreground hover:border-muted-foreground"
                  }`}
                >
                  {s.name}
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
                  key={f.id}
                  onClick={() => toggleFlavor(f.id)}
                  className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
                    flavors.includes(f.id)
                      ? "border-primary bg-primary font-medium text-primary-foreground"
                      : "border-border text-foreground hover:border-muted-foreground"
                  }`}
                >
                  {f.name}
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
                  key={f.id}
                  onClick={() => changeFrosting(f.id)}
                  className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
                    frosting === f.id
                      ? "border-primary bg-primary/10 font-medium text-primary"
                      : "border-border text-foreground hover:border-muted-foreground"
                  }`}
                >
                  {f.name}
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
              {kategori.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedKategori(t)}
                  className={`relative overflow-hidden rounded-xl border-2 transition-all ${
                    selectedKategori?.id === t.id
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <div className={`flex h-20 w-full items-end pb-2 pl-2`}>
                    {selectedKategori?.id === t.id && (
                      <div className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                        <CheckCircle2
                          size={12}
                          className="text-primary-foreground"
                        />
                      </div>
                    )}
                    <span className="text-[10px] font-medium text-white drop-shadow">
                      {t.nama_kategori}
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

        <OrderSummary order={order} step={steps} />
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
