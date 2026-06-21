// =============================================================================
// Panel Riwayat Pesanan — daftar pesanan pelanggan
// GET /pesanan
// =============================================================================

import { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import api from "@/lib/api/config"
import { ProtectedRoutes } from "@/lib/routes"

interface PesananItem {
  id: number
  tgl_pesanan: string
  total_harga: number
  status_pesanan: string
  item_pesanans?: { id: number }[]
}

const STATUS_LABEL: Record<string, string> = {
  menunggu_pembayaran: "Menunggu Bayar",
  menunggu_konfirmasi_pembayaran: "Verifikasi Bayar",
  dibayar: "Dibayar",
  diproses: "Diproses",
  selesai: "Selesai",
  dibatalkan: "Dibatalkan",
  pembayaran_dibatalkan: "Batal Bayar",
}

const STATUS_VARIANT: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  selesai: "default",
  diproses: "secondary",
  dibatalkan: "destructive",
  pembayaran_dibatalkan: "destructive",
}

function formatRupiah(val: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val)
}

function formatTanggal(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default function PanelRiwayatPesanan() {
  const [pesanan, setPesanan] = useState<PesananItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      try {
        const res = await api.get(ProtectedRoutes.Orders)
        const items = (res.data?.data ?? res.data ?? []) as PesananItem[]
        setPesanan(items)
      } catch {
        setPesanan([])
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  return (
    <div>
      <div className="mb-2">
        <h2 className="mb-1 text-2xl font-semibold text-foreground">
          Riwayat Pesanan
        </h2>
        <p className="text-sm text-muted-foreground">
          Lihat dan lacak semua pesanan Anda.
        </p>
      </div>

      <Separator className="my-6" />

      {loading && (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-12 rounded-lg" />
          ))}
        </div>
      )}

      {!loading && pesanan.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Belum ada pesanan.
        </p>
      )}

      {!loading && pesanan.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr className="text-left">
                {["ID Pesanan", "Tanggal", "Total", "Status", "Item"].map(
                  (h) => (
                    <th
                      key={h}
                      className="pb-2 font-medium text-muted-foreground"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {pesanan.map((p) => (
                <tr key={p.id} className="border-b border-border/50">
                  <td className="py-3 font-medium">
                    #{String(p.id).padStart(4, "0")}
                  </td>
                  <td className="py-3 text-muted-foreground">
                    {formatTanggal(p.tgl_pesanan)}
                  </td>
                  <td className="py-3">{formatRupiah(p.total_harga)}</td>
                  <td className="py-3">
                    <Badge
                      variant={STATUS_VARIANT[p.status_pesanan] ?? "outline"}
                      className="capitalize"
                    >
                      {STATUS_LABEL[p.status_pesanan] ?? p.status_pesanan}
                    </Badge>
                  </td>
                  <td className="py-3 text-muted-foreground">
                    {p.item_pesanans?.length ?? "-"} produk
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
