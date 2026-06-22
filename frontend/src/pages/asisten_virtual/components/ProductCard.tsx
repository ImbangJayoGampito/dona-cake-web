// src/pages/asisten/components/ProductCard.tsx
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { ProductPreview } from "@/models/chat-message.model"
import { useNavigate } from "react-router-dom"

interface ProductCardProps {
  product: ProductPreview
}

function formatPrice(price?: number): string {
  if (!price) return ""
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price)
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate()

  const handleDetail = () => {
    if (product.slug) {
      navigate(`/produk/${product.id ?? product.slug}`)
    }
  }

  return (
    <Card className="mt-2 w-full max-w-[260px] overflow-hidden shadow-sm">
      {/* Gambar / preview */}
      <div className="relative flex h-32 items-center justify-center bg-gradient-to-br from-[#8B5E3C]/20 to-muted text-5xl">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>{product.emoji ?? "🎂"}</span>
        )}
        {product.badge && (
          <span className="absolute top-2 right-2 rounded-full bg-[#8B5E3C] px-2 py-0.5 text-[9px] font-semibold text-white">
            {product.badge}
          </span>
        )}
      </div>

      <CardContent className="space-y-2 p-3">
        <p className="text-sm font-bold text-foreground">{product.name}</p>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        {product.price && (
          <p className="text-xs font-semibold text-[#8B5E3C]">
            {formatPrice(product.price)}
          </p>
        )}
        <Button
          size="sm"
          onClick={handleDetail}
          className="w-full bg-[#8B5E3C] text-xs text-white hover:bg-[#7a5234]"
        >
          Lihat Detail
        </Button>
      </CardContent>
    </Card>
  )
}
