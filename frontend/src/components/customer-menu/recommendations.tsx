import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProdukService } from "@/services/produk-service"

import { useEffect, useState } from "react"
import { Produk } from "@/models/produk.model"
import { CurrencyService} from "@/services/currency-service"
import { toast } from "sonner"
import { ShoppingCart } from "lucide-react"
export default function Recommendations() {
  const [recommendedProducts, setRecommendedProducts] = useState<Produk[]>([])
  useEffect(() => {
    ProdukService.getRecommendations().then((response) => {
      if (response.isSuccess()) {
        setRecommendedProducts(response.data ?? [])
        setRecommendedProducts(response.data?.slice(0, 2) ?? [])
      }
    })
  }, [])
  const handleAddToCart = (product: Produk) => {
    ProdukService.addToCart(product, 1).then((response) => {
      if (response.isSuccess()) {
        toast.success("Produk berhasil ditambahkan ke keranjang")
      } else {
        toast.error("Gagal menambahkan produk ke keranjang")
      }
    })
  }
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-8 space-y-2 text-center md:mb-12">
          <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
            Rekomendasi untukmu
          </h2>
          <p className="text-sm text-muted-foreground md:text-base">
            Berdasarkan pesanan Velvet Noir-mu sebelumnya
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {recommendedProducts.map((rec) => (
            <Card key={rec.id} className="group overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="relative aspect-square w-full overflow-hidden bg-muted sm:aspect-auto sm:w-48 md:w-56 lg:w-64">
                    <img
                      src={rec.getGambarUtamaUrl()}
                      alt={rec.nama_produk}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-4 md:p-6">
                    <h3 className="mb-2 text-lg font-semibold md:text-xl">
                      {rec.nama_produk}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {rec.deskripsi}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-lg font-bold text-primary md:text-xl">
                        {CurrencyService.formatPrice(rec.harga)}
                      </span>
                      <Button onClick={() => handleAddToCart(rec)}>
                        <ShoppingCart />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
