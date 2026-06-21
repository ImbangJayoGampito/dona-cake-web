import { Pencil, EyeOff, Eye, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Produk } from "@/models/produk.model"

interface ProdukCardProps {
  produk: Produk
  onEdit: (produk: Produk) => void
  onToggleVisibility: (produk: Produk) => void
}

export default function ProdukCard({
  produk,
  onEdit,
  onToggleVisibility,
}: ProdukCardProps) {
  const isHabis = !produk.isInStock()
  const isHampirHabis = produk.stok > 0 && produk.stok < 10

  const badgeLabel = isHabis ? "HABIS" : "AKTIF"
  const badgeClass = isHabis
    ? "bg-destructive text-white"
    : "bg-primary text-white"

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-white dark:bg-card shadow-sm transition-shadow hover:shadow-md">
      {/* Foto produk */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={produk.getGambarUtamaUrl()}
          alt={produk.nama_produk}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).src = "/placeholder.png"
          }}
        />
        {/* Badge status */}
        <span
          className={cn(
            "absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide",
            badgeClass
          )}
        >
          {badgeLabel}
        </span>
      </div>

      {/* Konten kartu */}
      <div className="p-4">
        {/* Nama + rating */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
            {produk.nama_produk}
          </h3>
          <div className="flex shrink-0 items-center gap-0.5 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-[#F59E0B] text-yellow-500" />
            {Number(produk.rating_rata_rata).toFixed(1)}
          </div>
        </div>

        {/* Kategori */}
        {produk.kategori && (
          <p className="mt-0.5 text-[11px] uppercase tracking-widest text-muted-foreground">
            {typeof produk.kategori === "string"
              ? produk.kategori
              : (produk.kategori as any)?.nama_kategori ?? ""}
          </p>
        )}

        {/* Harga */}
        <p
          className={cn(
            "mt-2 text-base font-bold",
            isHabis ? "text-muted-foreground" : "text-primary"
          )}
        >
          {produk.getFormattedPrice()}
        </p>

        {/* Stok */}
        <p
          className={cn(
            "mt-0.5 text-xs",
            isHabis
              ? "text-destructive"
              : isHampirHabis
              ? "text-orange-700 font-medium"
              : "text-muted-foreground"
          )}
        >
          {isHabis
            ? "Stok: 0 pcs"
            : isHampirHabis
            ? `Stok Menipis: ${produk.stok} pcs`
            : `Stok: ${produk.stok} pcs`}
        </p>

        {/* Aksi */}
        <div className="mt-3 flex items-center justify-end gap-2 border-t border-border pt-3">
          <button
            onClick={() => onEdit(produk)}
            title="Edit produk"
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
          >
            <Pencil className="h-4 w-4" strokeWidth={1.75} />
          </button>
          <button
            onClick={() => onToggleVisibility(produk)}
            title={isHabis ? "Tandai tersedia" : "Sembunyikan produk"}
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
          >
            {isHabis ? (
              <Eye className="h-4 w-4" strokeWidth={1.75} />
            ) : (
              <EyeOff className="h-4 w-4" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
