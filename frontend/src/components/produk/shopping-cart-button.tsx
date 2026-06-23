import { KeranjangService } from "@/services/keranjang-service"
import { Button } from "../ui/button"
import { ShoppingCart } from "lucide-react"
import { Produk } from "@/models/produk.model"
import { toast } from "sonner"
import type { StoreKeranjangRequest } from "@/types/keranjang.types"
import HistoriAktivitasService from "@/services/histori-aktivitas-service"
import { AktivitasJenis } from "@/types/enums"
import { useAuthStore } from "@/lib/state/logged-user"
interface ShoppingCartButtonProps {
  produk: Produk
}
export default function ShoppingCartButton({ produk }: ShoppingCartButtonProps) {
  const user = useAuthStore((state) => state.user)
  if (!user)
  {
    return <></>
  }
  const createCart = async () => {
    const request: StoreKeranjangRequest = {
      produk_id: produk.id,
      kuantitas: 1,
      catatan: "Produk ditambahkan ke keranjang",
    }
    await KeranjangService.createKeranjang(request).then(async (response) => {
      if (response.isSuccess()) {
        toast.success("Produk ditambahkan ke keranjang")
        // Track add_to_cart activity silently
        try {
          await HistoriAktivitasService.createSingle(produk, AktivitasJenis.ADD_TO_CART)
        } catch (error) {
          // Silent error handling - don't show error to user
          console.error("Failed to track add_to_cart activity:", error)
        }
      } else {
        toast.error(
          "Gagal menambahkan produk ke keranjang, silahkan coba nanti"
        )
      }
    })
  }
  return (
    <Button  className="justify-items-center" onClick={createCart}>
      <ShoppingCart />
      Tambah
    </Button>
  )
}
