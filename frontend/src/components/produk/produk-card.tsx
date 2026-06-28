import { Produk } from "@/models/produk.model"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import { ProdukService } from "@/services/produk-service" // adjust import path
import { Link } from "react-router-dom"
import { StarRating } from "./star_rating"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import type { StoreKeranjangRequest } from "@/types/keranjang.types"
import { KeranjangService } from "@/services/keranjang-service"
interface ProductCardProps {
  product: Produk
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate()
  const handleAddToCart = (product: Produk) => {
    const request: StoreKeranjangRequest = {
      produk_id: product.id,
      kuantitas: 1,
    }
    KeranjangService.createKeranjang(request).then((response) => {
      if (response.isSuccess()) {
        toast.success("Produk berhasil ditambahkan ke keranjang")
      } else {
        toast.error(`Gagal menambahkan produk ke keranjang karena ${response.message}`)
      }
    })
  }
  const goToDetail = (produk: Produk) => {
    navigate(`/produk/${produk.id}`)
  }
  return (
    <Card
      key={product.id}
      className="group overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl"
    >
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.getGambarUtamaUrl()}
            alt={product.nama_produk}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-3 p-4">
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="line-clamp-1 text-base font-semibold transition-colors hover:text-primary">
              {product.nama_produk}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <StarRating rating={product.rating_rata_rata} />
            <span className="text-sm text-muted-foreground">
              {product.rating_rata_rata} ({product.ulasans?.length ?? 0})
            </span>
          </div>

          {/* Price & Cart Button */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">
              {ProdukService.formatPrice(product.harga)}
            </span>
            <Button onClick={() => goToDetail(product)}>
              <Eye />
            </Button>
            <Button onClick={() => handleAddToCart(product)}>
              <ShoppingCart />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
