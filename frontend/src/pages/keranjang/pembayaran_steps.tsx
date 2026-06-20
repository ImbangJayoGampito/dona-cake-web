import { Mail } from "lucide-react"
import Stepper from "@/components/booking/stepper"
import { useState } from "react"
import { Pesanan } from "@/models/pesanan.model"
import PaymentPage from "./pembayaran"
import { useNavigate } from "react-router-dom"
import { PublicRoutes, ProtectedRoutes } from "@/lib/routes"

import SuccessPage from "./success_page"
interface PembayaranProps {
  pesanan: Pesanan
}
export default function PembayaranSteps({ pesanan }: PembayaranProps) {
  const [steps, setSteps] = useState(0)
  const navigate = useNavigate()
  const StepForward = () => {
    setSteps(steps + 1)
  }
  const StepBackward = () => {
    setSteps(steps - 1)
  }
  return (
    <div>
      <Stepper
        steps={["Pembayaran", "Konfirmasi", "Selesai"]}
        current={steps}
      />
      <h1 className="mb-1 text-2xl font-semibold text-foreground">
        Keranjang Belanja
      </h1>
      <p className="mb-6 text-sm text-muted-foreground">
        {pesanan.itemPesanans?.length} item
      </p>
      {steps === 0 && (
        <PaymentPage
          pesanan={pesanan}
          onNext={() => {
            StepForward()
          }}
          onBack={() => {
            StepBackward()
            navigate(ProtectedRoutes.Cart)
          }}
        />
      )}
      {steps === 1 && (
        <SuccessPage
          pesanan={pesanan}
          onHome={() => {
            navigate(PublicRoutes.Home)
          }}
          onTrack={() => {
            navigate(ProtectedRoutes.Orders)
          }}
        />
      )}
    </div>
  )
}
