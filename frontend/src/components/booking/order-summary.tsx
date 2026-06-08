import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Info, Calendar, Clock } from "lucide-react"
import BookingForm from "@/types/booking.types"
import BookingConfig from "@/config/booking"

export default function OrderSummary({
  order,
  step,
}: {
  order: BookingForm
  step: number
}) {
  const base = 250000
  const decor = 120000
  const taste = 40000
  const pkg =
    BookingConfig.PACKAGINGS.find((p) => p.id === order.packaging)?.price ?? 0
  const total = base + decor + taste + pkg
  return (
    <Card className="border-stone-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base text-stone-800">
          {step >= 2 ? "Cake Summary" : "Ringkasan Pesanan"}
        </CardTitle>
        {step >= 2 && (
          <p className="text-[10px] font-semibold tracking-widest text-stone-400">
            CUSTOM CREATION
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {step >= 2 ? (
          <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-lg bg-stone-800">
            <Badge className="absolute top-2 left-2 bg-amber-600 px-1.5 py-0.5 text-[9px] text-white">
              LIVE PREVIEW
            </Badge>
            <div className="text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-amber-50">
                <span className="text-4xl">🎂</span>
              </div>
            </div>
          </div>
        ) : null}

        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between text-stone-700">
            <span>Ukuran (Loyang 20cm)</span>
            <span>{fmt(base)}</span>
          </div>
          <div className="flex justify-between text-stone-700">
            <span>Dekorasi (Floral)</span>
            <span>{fmt(decor)}</span>
          </div>
          <div className="flex justify-between text-stone-700">
            <span>Rasa (Vanila)</span>
            <span>{fmt(taste)}</span>
          </div>
          {pkg > 0 && (
            <div className="flex justify-between text-stone-700">
              <span>Kemasan</span>
              <span>+{fmt(pkg)}</span>
            </div>
          )}
        </div>

        {showDate && (
          <>
            <Separator className="bg-stone-100" />
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2 text-amber-700">
                <Calendar size={13} />
                <span className="font-medium">Tanggal: 07 Mei 2025</span>
              </div>
              <div className="flex items-center gap-2 text-amber-700">
                <Clock size={13} />
                <span className="font-medium">Waktu: 08:00 – 10:00</span>
              </div>
            </div>
          </>
        )}

        <Separator className="bg-stone-100" />
        <div className="flex justify-between font-semibold text-stone-900">
          <span>{order.step >= 3 ? "TOTAL ESTIMASI" : "Estimasi Total"}</span>
          <span className="text-base text-amber-700">{fmt(total)}</span>
        </div>

        {order.step === 1 && (
          <div className="flex gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-800">
            <Info size={13} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">DP 50% yang dibayar sekarang:</p>
              <p className="mt-0.5 text-sm font-bold">{fmt(total / 2)}</p>
            </div>
          </div>
        )}

        <p className="text-center text-[10px] text-stone-400">
          Butuh bantuan dengan pesananmu?{" "}
          <span className="cursor-pointer text-amber-700 underline">
            Tanya Admin
          </span>
        </p>
      </CardContent>
    </Card>
  )
}
