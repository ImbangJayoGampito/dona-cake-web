import Step1Configure from "./step1-configure"
import Step2Reference from "./step2-reference"
import Step3Date from "./step3-date"
import Step4Confirm from "./step4-confirm"
import Step5Success from "./step5-success"
import Stepper from "@/components/booking/stepper"
import { useState } from "react"
import type { BookingForm } from "@/types/booking.types"
import { Booking } from "@/models/booking.model"
import BookingConfig from "@/config/booking"
import BookingService from "@/services/booking-service"
import { toast } from "sonner"
import { useAuthStore } from "@/lib/state/logged-user"

export default function BookingLayout() {
  const user = useAuthStore((state) => state.user)
  const [step, setStep] = useState(1)

  const [order, setOrder] = useState<BookingForm>({
    id: user?.id || -1,
    pelanggan_id: 0,
    ukuran: BookingConfig.SIZES[0].id,
    jenis_frosting: BookingConfig.FROSTINGS[0].id,
    rasa_kue: [BookingConfig.FLAVORS[0].id],
    packaging: "standar",
    tgl_ambil: new Date().toISOString(),
    kategori_id: null,
    tema_dekorasi: null,
    desain_custom_url: null,
    desain_custom_file: null,
    deskripsi_custom: null,
    harga_final: null,
    catatan: null,
    whatsapp_number: null,
  })
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null)

  const bookNow = async () => {
    try {
      const response = await BookingService.createBooking(order)
      console.log(response)
      if (response.isSuccess() && response.data) {
        toast.success("Pesanan berhasil dibuat")
        setCreatedBooking(response.data)
        next()
      } else {
        const errorMessages = response.errors
          ? Object.values(response.errors).flat().join(', ')
          : 'Unknown error occurred'
        toast.error(`Gagal membuat pesanan: ${errorMessages}`)
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat membuat pesanan")
      console.error("Booking error:", error)
    }
  }

  const next = () => setStep(step + 1)
  const back = () => setStep(step - 1)

  return (
    <div>
      <main>
        <main className="flex-1">
          <div className="mx-auto max-w-5xl px-4 pb-10">
            {step < 5 && (
              <Stepper
                current={step}
                steps={[
                  "Konfigurasi",
                  "Referensi",
                  "Tanggal",
                  "Konfirmasi",
                  "Berhasil",
                ]}
              />
            )}

            {step === 1 && (
              <Step1Configure
                order={order}
                setOrder={setOrder}
                steps={step}
                nextStep={next}
              />
            )}
            {step === 2 && (
              <Step2Reference
                order={order}
                setOrder={setOrder}
                onBack={back}
                nextStep={next}
                steps={step}
              />
            )}
            {step === 3 && (
              <Step3Date
                order={order}
                setOrder={setOrder}
                onBack={back}
                steps={step}
                onNext={next}
              />
            )}
            {step === 4 && (
              <Step4Confirm
                order={order}
                setOrder={setOrder}
                onBack={back}
                steps={step}
                onNext={bookNow}
              />
            )}
            {step === 5 && createdBooking && <Step5Success booking={createdBooking} onHome={() => setStep(1)} />}
          </div>
        </main>
      </main>
    </div>
  )
}