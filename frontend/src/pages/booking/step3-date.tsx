import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar } from "@/components/ui/calendar"
import {
  ChevronLeft,
  ChevronRight,
  Info,
  Building2,
  CheckCircle2,
  Clock,
} from "lucide-react"
import OrderSummary from "@/components/booking/order-summary"
import type { BookingForm } from "@/types/booking.types"
import BookingConfig from "@/config/booking"
import { id } from "date-fns/locale"
import {
  getTimeFromDatetime,
  combineDateAndTime,
  getDateFromDatetime,
} from "@/lib/time_management"

interface Step3Interface {
  order: BookingForm
  setOrder: React.Dispatch<React.SetStateAction<BookingForm>>
  steps: number
  onBack: () => void
  onNext: () => void
}

export default function Step3Date({
  order,
  setOrder,
  steps,
  onBack,
  onNext,
}: Step3Interface) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    order.tgl_ambil ? getDateFromDatetime(order.tgl_ambil) : new Date()
  )
  const [timeSlot, setTimeSlot] = useState(
    getTimeFromDatetime(order.tgl_ambil) || BookingConfig.TIME_SLOTS[0]
  )

  // Disable past dates and dates less than 3 days from now
  const disabledDays = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const minDate = new Date()
    minDate.setDate(today.getDate() + 3)
    minDate.setHours(0, 0, 0, 0)

    return date < minDate
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    if (date) {
      setOrder({
        ...order,
        tgl_ambil: combineDateAndTime(date, timeSlot),
      })
    }
  }

  const handleTimeSlotSelect = (slot: string) => {
    setTimeSlot(slot)
    setOrder({
      ...order,
      tgl_ambil: combineDateAndTime(selectedDate || new Date(), slot),
    })
  }

  const handleNext = () => {
    onNext()
  }

  const handleBack = () => {
    onBack()
  }

  return (
    <div className="grid items-start gap-6 md:grid-cols-[1fr_280px]">
      <Card className="border-border shadow-sm">
        <CardContent className="space-y-5 pt-6">
          <div>
            <h1 className="mb-1 text-2xl font-semibold text-foreground">
              Pilih Tanggal Pengambilan
            </h1>
            <p className="text-sm text-muted-foreground">
              Tentukan kapan kreasi spesial Anda akan dinikmati.
            </p>
          </div>

          <Alert className="border-primary/20 bg-primary/5">
            <Info size={14} className="mt-0.5 text-primary" />
            <AlertDescription className="text-xs text-foreground">
              Pemesanan custom cake memerlukan minimal 3 hari kerja persiapan
              untuk memastikan detail sempurna.
            </AlertDescription>
          </Alert>

          {/* Calendar using shadcn Calendar */}
          <div>
            <Label className="mb-3 block text-sm font-semibold text-foreground">
              Pilih Tanggal
            </Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={disabledDays}
              locale={id}
              className="rounded-md border-border"
              classNames={{
                months:
                  "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",

                caption_label: "text-sm font-medium text-foreground",
                nav: "space-x-1 flex items-center",
                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-foreground",
              }}
            />
          </div>

          {/* Time Slots */}
          <div>
            <Label className="mb-3 block text-sm font-semibold text-foreground">
              Pilih Waktu Penjemputan
            </Label>
            <div className="flex flex-wrap gap-2">
              {BookingConfig.TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  onClick={() => handleTimeSlotSelect(slot)}
                  className={`rounded-full border px-4 py-2 text-sm transition-all ${
                    timeSlot === slot
                      ? "border-primary bg-primary font-medium text-primary-foreground"
                      : "border-border text-foreground hover:border-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  <Clock size={12} className="mr-1 inline" />
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Delivery Method */}
          <div>
            <Label className="mb-3 block text-sm font-semibold text-foreground">
              Metode Penyerahan
            </Label>
            <div className="flex items-center justify-between rounded-xl border-2 border-primary bg-primary/5 px-4 py-3">
              <div className="flex items-center gap-3">
                <Building2 size={16} className="text-foreground" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Pengambilan di Toko
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Gratis Biaya Pengantaran
                  </p>
                </div>
              </div>
              <CheckCircle2 size={18} className="text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <OrderSummary
        order={{
          ...order,
        }}
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
          Lanjut: Pembayaran <ChevronRight size={16} className="ml-1" />
        </Button>
      </div>
    </div>
  )
}
