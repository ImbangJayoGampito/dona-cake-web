import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"

import { Produk } from "@/models/produk.model"
import { ShoppingCart } from "lucide-react"
import { ProductService } from "@/services/produk-service"
import { useState, useEffect } from "react"
import { StarRating } from "../produk/star_rating"
import { toast } from "sonner"
import { ProductCard } from "../produk/produk-card"
export default function FeaturedProducts() {
  const [popularProducts, setPopularProducts] = useState<Produk[]>([])

  useEffect(() => {
    ProductService.getPopularProducts().then((res) => {
      setPopularProducts(res.data ?? [])
      // We'll slice the array by 4
      setPopularProducts(res.data?.slice(0, 4) ?? [])
    })
  }, [])

  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center md:mb-12">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
              Koleksi Terpopuler
            </h2>
            <div className="mx-auto mt-2 h-0.5 w-20 bg-primary sm:mx-0" />
          </div>
          <Button variant="link" className="gap-1 text-primary" asChild>
            <Link to="/products">
              Lihat Semua
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
        </div>
      </div>
    </section>
  )
}
