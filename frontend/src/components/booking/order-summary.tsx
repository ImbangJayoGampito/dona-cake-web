import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Info, Calendar, Clock } from "lucide-react"
import type { BookingForm } from "@/types/booking.types"
import BookingConfig from "@/config/booking"
import { ProdukService } from "@/services/produk-service"
import { getDateFromDatetime, getTimeFromDatetime } from "@/lib/time_management"
export default function OrderSummary({
  order,
  step,
}: {
  order: BookingForm
  step: number
}) {
  const base = BookingConfig.BASE_PRICE
  const flavor = BookingConfig.calculateFlavorPrice(order.rasa_kue ?? [])
  const frosting = BookingConfig.calculateFrostingPrice(
    order.jenis_frosting ?? ""
  )
  const pkg = BookingConfig.calculatePackagingPrice(order.packaging ?? "")
  const total = base + flavor + frosting + pkg
  const dp = total / 2

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base text-foreground">
          {step >= 2 ? "Cake Summary" : "Ringkasan Pesanan"}
        </CardTitle>
        {step >= 2 && (
          <p className="text-[10px] font-semibold tracking-widest text-muted-foreground">
            CUSTOM CREATION
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {step >= 2 ? (
          <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-lg bg-muted">
            <Badge className="absolute top-2 left-2 bg-primary px-1.5 py-0.5 text-[9px] text-primary-foreground">
              LIVE PREVIEW
            </Badge>
            <div className="text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                <span className="text-4xl">🎂</span>
              </div>
            </div>
          </div>
        ) : null}

        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between text-foreground">
            <span className="text-muted-foreground">Ukuran:</span>
            <span className="font-medium">{order.ukuran || "-"}</span>
          </div>
          <div className="flex justify-between text-foreground">
            <span className="text-muted-foreground">Dekorasi:</span>
            <span className="font-medium">{order.tema_dekorasi || "-"}</span>
          </div>
          <div className="flex justify-between text-foreground">
            <span className="text-muted-foreground">Rasa:</span>
            <span className="font-medium">
              {BookingConfig.formatFlavorLabels(order.rasa_kue)}
            </span>
          </div>
          {pkg > 0 && (
            <div className="flex justify-between text-foreground">
              <span className="text-muted-foreground">Kemasan:</span>
              <span className="font-medium">{pkg || "-"}</span>
            </div>
          )}
        </div>

        <Separator className="bg-border" />

        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2 text-primary">
            <Calendar size={13} />
            <span className="font-medium">
              Tanggal:{" "}
              {getDateFromDatetime(order.tgl_ambil)?.toLocaleDateString() ||
                "-"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <Clock size={13} />
            <span className="font-medium">
              Waktu: {getTimeFromDatetime(order.tgl_ambil) || "-"}
            </span>
          </div>
        </div>

        <Separator className="bg-border" />

        <div className="flex justify-between font-semibold">
          <span className="text-foreground">
            {step >= 3 ? "TOTAL ESTIMASI" : "Estimasi Total"}
          </span>
          <span className="text-base text-primary">
            Rp {ProdukService.formatPrice(total)}
          </span>
        </div>

        {step === 1 && (
          <div className="flex gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5 text-xs text-primary">
            <Info size={13} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">DP 50% yang dibayar sekarang:</p>
              <p className="mt-0.5 text-sm font-bold">
                Rp {ProdukService.formatPrice(dp)}
              </p>
            </div>
          </div>
        )}

        <p className="text-center text-[10px] text-muted-foreground">
          Butuh bantuan dengan pesananmu?{" "}
          <span className="cursor-pointer text-primary underline hover:text-primary/80">
            Tanya Admin
          </span>
        </p>
      </CardContent>
    </Card>
  )
}
