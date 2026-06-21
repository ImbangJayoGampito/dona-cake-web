import { Mail } from "lucide-react"
import Stepper from "@/components/booking/stepper"
import { useState } from "react"
import { Pesanan } from "@/models/pesanan.model"
import PaymentPage from "./pembayaran"
import { useNavigate } from "react-router-dom"
import { PublicRoutes, ProtectedRoutes } from "@/lib/routes"
import SuccessPage from "./success_page"
import CartPage from "./lihat_keranjang"
import { PesananService } from "@/services/pesanan-service"
import { toast } from "sonner"
export default function KeranjangSteps() {
  const [steps, setSteps] = useState(1)
  const [pesananState, setPesananState] = useState<Pesanan | undefined>(
    undefined
  )

  const navigate = useNavigate()
  const StepForward = () => {
    setSteps(steps + 1)
  }
  const StepBackward = () => {
    setSteps(steps - 1)
  }
  return (
    <div>
      <Stepper steps={["Keranjang", "Pembayaran", "Selesai"]} current={steps} />

      {steps === 1 && (
        <CartPage
          onNext={(KeranjangInteract) => {
            // Make a new pesanan
            const pesanan = new Pesanan({})
            pesanan.appendKeranjangToPesanan(KeranjangInteract)
            setPesananState(pesanan)
            StepForward()
          }}
        />
      )}
      {steps === 2 && pesananState !== undefined && (
        <PaymentPage
          pesanan={pesananState}
          onNext={() => {
            PesananService.createPesanan(pesananState).then((response) => {
              if (response.isSuccess()) {
                // update pesananStatus
                setPesananState(response.data)
                StepForward()
              } else {
                toast.error(
                  "Gagal untuk membuat penanan karena: " + response.message
                )
              }
            })
          }}
          onBack={() => {
            StepBackward()
          }}
        />
      )}
      {steps === 3 && pesananState !== undefined && (
        <SuccessPage
          pesanan={pesananState}
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
