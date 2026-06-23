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

/** Safely convert any value to a string for rendering, preventing "Objects not valid as React child" errors */
function safeString(value: unknown, fallback: string = ""): string {
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  // Handle objects and arrays
  if (typeof value === 'object' && value !== null) return JSON.stringify(value)
  // Return fallback for objects, arrays, null, undefined to avoid React error #31
  return fallback
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
            alt={safeString(product.name, "Produk")}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>{safeString(product.emoji, "🎂")}</span>
        )}
        {product.badge && (
          <span className="absolute top-2 right-2 rounded-full bg-[#8B5E3C] px-2 py-0.5 text-[9px] font-semibold text-white">
            {safeString(product.badge)}
          </span>
        )}
      </div>

      <CardContent className="space-y-2 p-3">
        <p className="text-sm font-bold text-foreground">{safeString(product.name, "Produk")}</p>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {safeString(product.description, "Produk lezat dari Dona Cake")}
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
