import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { Star } from "lucide-react"

const PRODUCTS = [
  {
    id: 1,
    name: "Velvet Noir Ganache",
    rating: 4.9,
    reviewCount: 120,
    price: 450000,
    badge: "TERLARIS",
    img: "https://cdn.codia.ai/figma/bHsnpLOMJNp7HztOUpXOYI/img-6420eb98901e4d28.png",
  },
  {
    id: 2,
    name: "Strawberry Chiffon",
    rating: 4.8,
    reviewCount: 85,
    price: 385000,
    badge: "TERLARIS",
    img: "https://cdn.codia.ai/figma/bHsnpLOMJNp7HztOUpXOYI/img-7857c9faf482d8c5.png",
  },
  {
    id: 3,
    name: "Citrus Blueberry Bliss",
    rating: 4.9,
    reviewCount: 54,
    price: 420000,
    badge: null,
    img: "https://cdn.codia.ai/figma/bHsnpLOMJNp7HztOUpXOYI/img-d2732bb330aafdcf.png",
  },
  {
    id: 4,
    name: "Salted Macadamia",
    rating: 4.7,
    reviewCount: 92,
    price: 480000,
    badge: null,
    img: "https://cdn.codia.ai/figma/bHsnpLOMJNp7HztOUpXOYI/img-27f87a9c559d1064.png",
  },
]

// Star Rating Component using shadcn style
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < fullStars
              ? "fill-primary text-primary"
              : i === fullStars && hasHalfStar
                ? "fill-primary/50 text-primary"
                : "fill-muted text-muted-foreground"
          }`}
        />
      ))}
    </div>
  )
}

// Format price to Indonesian Rupiah
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export default function FeaturedProducts() {
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
          {PRODUCTS.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl"
            >
              <CardContent className="p-0">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {product.badge && (
                    <span className="text-destructive-foreground absolute top-3 left-3 z-10 rounded bg-destructive px-2 py-1 text-xs font-semibold">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-3 p-4">
                  <Link to={`/product/${product.id}`} className="block">
                    <h3 className="line-clamp-1 text-base font-semibold transition-colors hover:text-primary">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <StarRating rating={product.rating} />
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviewCount}+)
                    </span>
                  </div>

                  {/* Price & Cart Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">
                      {formatPrice(product.price)}
                    </span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-9 w-9 rounded-full transition-all hover:bg-primary hover:text-primary-foreground"
                      aria-label="Add to cart"
                    >
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
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 18v3"
                        />
                      </svg>
                    </Button>
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
