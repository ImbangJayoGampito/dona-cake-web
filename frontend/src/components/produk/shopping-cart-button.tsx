import { KeranjangService } from "@/services/keranjang-service"
import { Button } from "../ui/button"
import { ShoppingCart } from "lucide-react"
import { Produk } from "@/models/produk.model"
import { toast } from "sonner"
import type { StoreKeranjangRequest } from "@/types/keranjang.types"
interface ShoppingCartButtonProps {
  produk: Produk
}
export function ShoppingCartButton({ produk }: ShoppingCartButtonProps) {
  const createCart = async () => {
    const request: StoreKeranjangRequest = {
      produk_id: produk.id,
      kuantitas: 1,
      catatan: "Produk ditambahkan ke keranjang",
    }
    await KeranjangService.createKeranjang(request).then((response) => {
      if (response.isSuccess()) {
        toast.success("Produk ditambahkan ke keranjang")
      } else {
        toast.error(
          "Gagal menambahkan produk ke keranjang, silahkan coba nanti"
        )
      }
    })
  }
  return (
    <Button onClick={createCart}>
      <ShoppingCart />
    </Button>
  )
}
