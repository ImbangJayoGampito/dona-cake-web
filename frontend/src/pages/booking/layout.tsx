import Step1Configure from "./step1-configure"
import Step2Reference from "./step2-reference"
import Step3Date from "./step3-date"
import Step4Confirm from "./step4-confirm"
import Step5Success from "./step5-success"
import Stepper from "@/components/booking/stepper"
import { useEffect, useState } from "react"
import type { BookingForm } from "@/types/booking.types"
import BookingConfig from "@/config/booking"
import BookingService from "@/services/booking-service"
import { toast } from "sonner"
export default function BookingLayout() {
  const [step, setStep] = useState(1)
  const [order, setOrder] = useState<BookingForm>({
    id: 0,
    pelanggan_id: 0,
    ukuran: BookingConfig.SIZES[0].id,
    jenis_frosting: BookingConfig.FROSTINGS[0].id,
    rasa_kue: [],
    packaging: "standar",
    tgl_ambil: new Date().toISOString(),
  })
  const bookNow = async () => {
    const response = await BookingService.createBooking(order)
    if (response.isSuccess()) {
      toast.success("Pesanan berhasil dibuat")
      next()
    } else {
      toast.error("Gagal membuat pesanan")
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
            {step === 5 && <Step5Success onHome={() => setStep(1)} />}
          </div>
        </main>
      </main>
    </div>
  )
}
