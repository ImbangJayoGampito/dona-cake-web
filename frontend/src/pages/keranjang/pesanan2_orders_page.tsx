import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, MapPin, MessageCircle } from "lucide-react"
import { ProdukService } from "@/services/produk-service"
import { Pesanan } from "@/models/pesanan.model"
import {
  PesananStatus,
  getPesananColor,
  type PesananStatus as PesananStatusType,
} from "@/types/enums"
import CancelDialog from "@/components/keranjang/cancel_dialogue"
import { PesananService } from "@/services/pesanan-service"
import WhatsAppButton from "@/components/whatsapp_button"
import { toast } from "sonner"
export default function OrdersPage() {
  const [orders, setOrders] = useState<Pesanan[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const fetchOrders = async () => {
    setIsLoading(true)
    const result = await PesananService.getPesanan()
    setOrders(result.data ?? [])
    setIsLoading(false)
  }
  useEffect(() => {
    fetchOrders()
  }, [])

  const [tab, setTab] = useState<string>("semua")
  const [search, setSearch] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<Pesanan | null>(
    orders.length > 0 ? orders[0] : null
  )
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)
  const openCancelDialog = (orderId: number) => {
    setIsCancelDialogOpen(true)
    setSelectedOrder(orders.find((o) => o.id === orderId) ?? null)
  }
  const actuallyCancelOrder = () => {
    if (!selectedOrder) return

    setIsCancelDialogOpen(false)
    PesananService.cancelPesanan(selectedOrder).then((response) => {
      if (response.isSuccess()) {
        fetchOrders()
        toast.success("Pesanan berhasil dibatalkan")
      } else {
        toast.error("Gagal membatalkan pesanan karena " + response.message)
      }
    })
  }

  const filteredOrders = useMemo(() => {
    let result = orders

    // Filter status
    if (tab !== "semua") {
      const isActive = (s: PesananStatusType) =>
        s === PesananStatus.MENUNGGU_PEMBAYARAN ||
        s === PesananStatus.DIBAYAR ||
        s === PesananStatus.DIPROSES
      const isSelesai = (s: PesananStatusType) => s === PesananStatus.SELESAI
      const isDibatalkan = (s: PesananStatusType) =>
        s === PesananStatus.DIBATALKAN ||
        s === PesananStatus.PEMBAYARAN_DIBATALKAN

      result = result.filter((order) => {
        const status = order.status_pesanan
        if (tab === "aktif") return isActive(status)
        if (tab === "selesai") return isSelesai(status)
        if (tab === "dibatalkan") return isDibatalkan(status)
        return true
      })
    }

    // Filter pencarian (berdasarkan ID)
    if (search.trim() !== "") {
      const q = search.toLowerCase()
      result = result.filter((order) => order.id.toString().includes(q))
    }

    return result
  }, [orders, tab, search])
  const getWhatsAppMessage = (status: PesananStatus) => {
    switch (status) {
      case PesananStatus.MENUNGGU_PEMBAYARAN:
        return "Saya mau membayar pesanan tersebut"
      case PesananStatus.DIPROSES:
        return "saya meminta update pesanan"
      case PesananStatus.DIBATALKAN:
      case PesananStatus.SELESAI:
        return null // Don't show button
      default:
        return null
    }
  }
  // Jika pesanan terpilih hilang dari hasil filter, pilih yang pertama
  if (selectedOrder && !filteredOrders.some((o) => o.id === selectedOrder.id)) {
    setSelectedOrder(filteredOrders.length > 0 ? filteredOrders[0] : null)
  }

  const handleSelectOrder = (order: Pesanan) => {
    setSelectedOrder(order)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {isCancelDialogOpen && (
        <CancelDialog
          onClose={() => setIsCancelDialogOpen(false)}
          onConfirm={() => actuallyCancelOrder()}
          open={isCancelDialogOpen}
        />
      )}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Pesanan Saya
            </h1>
            <p className="text-sm text-muted-foreground">
              Pantau status pengiriman dan riwayat pesanan Anda.
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search
              size={14}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Cari nomor pesanan..."
              className="pl-9 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid items-start gap-4 md:grid-cols-[320px_1fr]">
          {/* Left: Tab + Daftar Pesanan */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {["semua", "aktif", "selesai", "dibatalkan"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
                    tab === t
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {t === "semua"
                    ? "Semua"
                    : t === "aktif"
                      ? "Aktif"
                      : t === "selesai"
                        ? "Selesai"
                        : "Dibatalkan"}
                </button>
              ))}
            </div>

            {filteredOrders.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Tidak ada pesanan yang cocok.
              </p>
            ) : (
              filteredOrders.map((order) => {
                const status = order.status_pesanan
                const statusLabel = status
                const statusColor = getPesananColor(status)
                const totalItem = order.itemPesanans?.length || 0

                return (
                  <Card
                    key={order.id}
                    onClick={() => handleSelectOrder(order)}
                    className={`cursor-pointer border transition-all hover:shadow-md ${
                      selectedOrder?.id === order.id
                        ? "border-primary/40 shadow-md"
                        : "border-border"
                    }`}
                  >
                    <CardContent className="flex items-center gap-3 p-4">
                      <div className="min-w-0 flex-1">
                        <div className="mb-0.5 flex items-center justify-between">
                          <span className="text-[10px] text-muted-foreground">
                            {new Date(order.tgl_pesanan).toLocaleDateString()}
                          </span>
                          <Badge
                            className={`px-1.5 py-0.5 text-[9px] font-semibold bg-${statusColor}-500 text-white`}
                          >
                            {statusLabel}
                          </Badge>
                        </div>
                        <p className="text-xs font-semibold text-muted-foreground">
                          #{order.id}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-foreground">
                          {totalItem} item
                        </p>
                        <p className="mt-1 text-sm font-bold text-primary">
                          {ProdukService.formatPrice(order.total_harga)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>

          {/* Right: Detail Pesanan */}
          {selectedOrder ? (
            <Card className="shadow-sm">
              <CardContent className="space-y-5 p-6">
                {/* Header detail */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="mb-1 text-[10px] font-semibold tracking-widest text-muted-foreground">
                      Nomor Pesanan
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      #{selectedOrder.id}
                    </p>
                  </div>
                  <Badge
                    className={`rounded-full bg-${getPesananColor(
                      selectedOrder.status_pesanan
                    )}-500 px-3 py-1.5 text-xs font-semibold text-white`}
                  >
                    ● {selectedOrder.status_pesanan}
                  </Badge>
                </div>

                {/* Info tanggal & estimasi */}
                <div className="grid grid-cols-2 gap-4 rounded-xl bg-muted/30 p-4">
                  <div>
                    <p className="mb-1 text-[10px] font-semibold tracking-widest text-muted-foreground">
                      Tanggal Pesan
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {new Date(selectedOrder.tgl_pesanan).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-semibold tracking-widest text-muted-foreground">
                      Estimasi Tiba
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {/* contoh +2 hari */}
                      {new Date(
                        new Date(selectedOrder.tgl_pesanan).getTime() +
                          2 * 24 * 60 * 60 * 1000
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Daftar produk dalam pesanan */}
                <div>
                  <p className="mb-3 text-[10px] font-semibold tracking-widest text-muted-foreground">
                    DAFTAR PRODUK
                  </p>
                  <div className="space-y-2">
                    {selectedOrder.itemPesanans?.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 rounded-xl bg-muted/30 p-3"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-foreground">
                            {item.produk?.nama_produk ||
                              "Produk tidak diketahui"}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            Kuantitas: {item.kuantitas} unit
                          </p>
                        </div>
                        <span className="text-sm font-bold text-foreground">
                          {ProdukService.formatPrice(item.subtotal)}
                        </span>
                      </div>
                    ))}
                    {/* Total keseluruhan */}
                    <div className="flex justify-between rounded-xl bg-primary/5 p-3">
                      <span className="text-sm font-semibold text-foreground">
                        Total Pesanan
                      </span>
                      <span className="text-sm font-bold text-primary">
                        {ProdukService.formatPrice(selectedOrder.total_harga)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tombol aksi */}
                <div className="flex flex-col gap-3">
                  {getWhatsAppMessage(selectedOrder.status_pesanan) && (
                    <WhatsAppButton
                      pesanan={selectedOrder}
                      beginningMessage={
                        getWhatsAppMessage(selectedOrder.status_pesanan) || ""
                      }
                    />
                  )}

                  {selectedOrder?.canTransitionTo(
                    PesananStatus.PEMBAYARAN_DIBATALKAN
                  ) && (
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => openCancelDialog(selectedOrder.id)}
                    >
                      Batalkan Pesanan
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-sm">
              <CardContent className="p-6 text-center text-muted-foreground">
                Pilih pesanan untuk melihat detail.
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
