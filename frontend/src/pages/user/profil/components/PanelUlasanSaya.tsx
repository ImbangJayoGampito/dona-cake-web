// =============================================================================
// Panel Ulasan Saya — ulasan yang ditulis pelanggan ini
// GET /ulasan?pelanggan_id=... (endpoint publik, filter by pelanggan)
// =============================================================================

import { useEffect, useState } from "react"
import { Star } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import api from "@/lib/api/config"
import { PublicRoutes } from "@/lib/routes"
import { cn } from "@/lib/utils"

interface Props {
  pelangganId: number
}

interface UlasanItem {
  id: number
  produk: { nama_produk: string }
  rating: number
  komentar: string
  created_at: string
}

function formatTanggal(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={cn(
            i <= rating ? "fill-primary text-primary" : "text-muted-foreground"
          )}
        />
      ))}
    </div>
  )
}

export default function PanelUlasanSaya({ pelangganId }: Props) {
  const [ulasan, setUlasan] = useState<UlasanItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      try {
        const res = await api.get(PublicRoutes.Ulasan, {
          params: { pelanggan_id: pelangganId },
        })
        const items: UlasanItem[] = (res.data?.data ?? res.data ?? []) as UlasanItem[]
        setUlasan(items)
      } catch {
        setUlasan([])
      } finally {
        setLoading(false)
      }
    }
    if (pelangganId) fetch()
  }, [pelangganId])

  return (
    <div>
      <div className="mb-2">
        <h2 className="mb-1 text-2xl font-semibold text-foreground">
          Ulasan Saya
        </h2>
        <p className="text-sm text-muted-foreground">
          Lihat semua ulasan yang telah Anda berikan untuk produk Dona Cake.
        </p>
      </div>

      <Separator className="my-6" />

      {loading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-lg" />
          ))}
        </div>
      )}

      {!loading && ulasan.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Anda belum memberikan ulasan.
        </p>
      )}

      {!loading && ulasan.length > 0 && (
        <div className="space-y-4">
          {ulasan.map((rev) => (
            <div
              key={rev.id}
              className="rounded-lg border-l-4 border-primary bg-muted/40 p-4"
            >
              <div className="flex flex-wrap items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {rev.produk?.nama_produk ?? "Produk"}
                  </p>
                  <div className="mt-1">
                    <StarDisplay rating={rev.rating} />
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatTanggal(rev.created_at)}
                </span>
              </div>
              <p className="mt-2 text-sm text-foreground/80">{rev.komentar}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
