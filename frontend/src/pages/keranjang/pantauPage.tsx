import { useState, useMemo, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, MapPin, MessageCircle } from "lucide-react"
import { ProdukService } from "@/services/produk-service"
import { Pesanan } from "@/models/pesanan.model"
import { Booking } from "@/models/booking.model"
import {
  PesananStatus,
  getPesananColor,
  type PesananStatus as PesananStatusType,
  BookingStatus
} from "@/types/enums"
import CancelDialog from "@/components/keranjang/cancel_dialogue"
import { PesananService } from "@/services/pesanan-service"
import BookingService from "@/services/booking-service"
import GambarService from "@/services/gambar-service"
import WhatsAppButton from "@/components/whatsapp_button"
import { toast } from "sonner"
import { ProtectedRoutes } from "@/lib/routes"
import { RouteService } from "@/services/route-service"

export default function PantauPage() {
  // 1. All state declarations
  const [orders, setOrders] = useState<Pesanan[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'pesanan' | 'booking'>('pesanan')
  const [tab, setTab] = useState<string>("semua")
  const [search, setSearch] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<Pesanan | null>(null)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)
  const [viewingImage, setViewingImage] = useState<{url: string, type: string} | null>(null)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const navigate = useNavigate()

  // 2. Data fetching functions
  const fetchOrders = async () => {
    setIsLoading(true)
    const result = await PesananService.getPesanan()
    setOrders(result.data ?? [])
    setIsLoading(false)
  }

  const fetchBookings = async () => {
    setIsLoading(true)
    const result = await BookingService.getBookings()
    setBookings(result.data ?? [])
    setIsLoading(false)
  }

  // 3. Initial data load
  useEffect(() => {
    fetchOrders()
    fetchBookings()
  }, [])

  // 4. Memoized filtered lists (defined BEFORE the useEffect that uses them)
  const filteredOrders = useMemo(() => {
    let result = orders

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

    if (search.trim() !== "") {
      const q = search.toLowerCase()
      result = result.filter((order) => order.id.toString().includes(q))
    }

    return result
  }, [orders, tab, search])

  const filteredBookings = useMemo(() => {
    let result = bookings

    if (tab !== "semua") {
      const isActive = (s: BookingStatus) =>
        s === BookingStatus.MENUNGGU_VERIFIKASI ||
        s === BookingStatus.DISETUJUI
      const isSelesai = (s: BookingStatus) => s === BookingStatus.SELESAI
      const isDibatalkan = (s: BookingStatus) =>
        s === BookingStatus.DIBATALKAN ||
        s === BookingStatus.DITOLAK

      result = result.filter((booking) => {
        const status = booking.status_verifikasi
        if (tab === "aktif") return isActive(status)
        if (tab === "selesai") return isSelesai(status)
        if (tab === "dibatalkan") return isDibatalkan(status)
        return true
      })
    }

    if (search.trim() !== "") {
      const q = search.toLowerCase()
      result = result.filter((booking) => booking.id.toString().includes(q))
    }

    return result
  }, [bookings, tab, search])

  // 5. Sync selectedOrder with filteredOrders (after filteredOrders is defined)
  useEffect(() => {
    if (selectedOrder && !filteredOrders.some(o => o.id === selectedOrder.id)) {
      setSelectedOrder(filteredOrders.length > 0 ? filteredOrders[0] : null)
    }
  }, [filteredOrders, selectedOrder])

  // 6. Sync selectedBooking with filteredBookings
  useEffect(() => {
    if (selectedBooking && !filteredBookings.some(b => b.id === selectedBooking.id)) {
      setSelectedBooking(filteredBookings.length > 0 ? filteredBookings[0] : null)
    }
  }, [filteredBookings, selectedBooking])

  // 7. Clear the inactive tab's selection when switching
  useEffect(() => {
    if (activeTab === 'pesanan') {
      setSelectedBooking(null)
    } else {
      setSelectedOrder(null)
    }
    // Optionally reset the filter tab (uncomment if desired)
    // setTab('semua')
  }, [activeTab])

  // 8. Helper functions
  const getImageUrl = (path: string | null) => {
    if (!path) return null;
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    // If you have a Vite proxy, use window.location.origin
    // Otherwise use your API base URL from environment
    const base = import.meta.env.VITE_API_URL || window.location.origin;
    return `${base}${path}`;
  };

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

  const openCancelBookingDialog = (bookingId: number) => {
    setIsCancelDialogOpen(true)
    setSelectedBooking(bookings.find((b) => b.id === bookingId) ?? null)
  }

  const actuallyCancelBooking = () => {
    if (!selectedBooking) return

    setIsCancelDialogOpen(false)
    BookingService.cancelBooking(selectedBooking.id).then((response) => {
      if (response.isSuccess()) {
        fetchBookings()
        toast.success("Booking berhasil dibatalkan")
      } else {
        toast.error("Gagal membatalkan booking karena " + response.message)
      }
    })
  }

  const getWhatsAppMessage = (status: PesananStatus) => {
    switch (status) {
      case PesananStatus.MENUNGGU_PEMBAYARAN:
        return "Saya mau membayar pesanan tersebut"
      case PesananStatus.DIPROSES:
        return "saya meminta update pesanan"
      case PesananStatus.DIBATALKAN:
      case PesananStatus.SELESAI:
        return null
      default:
        return null
    }
  }

  const handleSelectOrder = (order: Pesanan) => {
    setSelectedOrder(order)
  }

  const handleSelectBooking = (booking: Booking) => {
    setSelectedBooking(booking)
  }

  // 9. Render (unchanged)
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {isCancelDialogOpen && (
        <CancelDialog
          onClose={() => setIsCancelDialogOpen(false)}
          onConfirm={() => activeTab === 'pesanan' ? actuallyCancelOrder() : actuallyCancelBooking()}
          open={isCancelDialogOpen}
        />
      )}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              {activeTab === 'pesanan' ? 'Pesanan Saya' : 'Booking Saya'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {activeTab === 'pesanan'
                ? 'Pantau status pengiriman dan riwayat pesanan Anda.'
                : 'Pantau status booking dan riwayat reservasi Anda.'}
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search
              size={14}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Cari nomor pesanan/booking..."
              className="pl-9 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setActiveTab('pesanan')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              activeTab === 'pesanan'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            Pesanan
          </button>
          <button
            onClick={() => setActiveTab('booking')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              activeTab === 'booking'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            Booking
          </button>
        </div>

        <div className="grid items-start gap-4 md:grid-cols-[320px_1fr]">
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

            {activeTab === 'pesanan' ? (
              <>
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
              </>
            ) : (
              <>
                {filteredBookings.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Tidak ada booking yang cocok.
                  </p>
                ) : (
                  filteredBookings.map((booking) => {
                    const status = booking.status_verifikasi
                    const statusLabel = booking.getStatusLabel()
                    const statusColor = booking.getStatusBadgeColor()
                    const totalPrice = booking.getFormattedPrice()

                    return (
                      <Card
                        key={booking.id}
                        onClick={() => handleSelectBooking(booking)}
                        className={`cursor-pointer border transition-all hover:shadow-md ${
                          selectedBooking?.id === booking.id
                            ? "border-primary/40 shadow-md"
                            : "border-border"
                        }`}
                      >
                        <CardContent className="flex items-center gap-3 p-4">
                          <div className="min-w-0 flex-1">
                            <div className="mb-0.5 flex items-center justify-between">
                              <span className="text-[10px] text-muted-foreground">
                                {new Date(booking.created_at).toLocaleDateString()}
                              </span>
                              <Badge
                                className={`px-1.5 py-0.5 text-[9px] font-semibold bg-${statusColor}-500 text-white`}
                              >
                                {statusLabel}
                              </Badge>
                            </div>
                            <p className="text-xs font-semibold text-muted-foreground">
                              #{booking.id}
                            </p>
                            <p className="mt-0.5 truncate text-xs text-foreground">
                              {booking.ukuran ? `Custom ${booking.ukuran}` : 'Booking Standar'}
                            </p>
                            <p className="mt-1 text-sm font-bold text-primary">
                              {totalPrice}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })
                )}
              </>
            )}
          </div>

          {activeTab === 'pesanan' ? (
            selectedOrder ? (
              <Card className="shadow-sm">
                <CardContent className="space-y-5 p-6">
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
                        {new Date(
                          new Date(selectedOrder.tgl_pesanan).getTime() +
                            2 * 24 * 60 * 60 * 1000
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

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

                  <div className="flex flex-col gap-3">
                    {getWhatsAppMessage(selectedOrder.status_pesanan) && (
                      <WhatsAppButton
                        id_pesanan={selectedOrder.id}
                        type_of_message={"Pesanan"}
                        beginningMessage={
                          getWhatsAppMessage(selectedOrder.status_pesanan) || ""
                        }
                      />
                    )}

                    {selectedOrder?.status_pesanan === PesananStatus.MENUNGGU_PEMBAYARAN  && (
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => navigate(RouteService.convertToReactRouterParam(ProtectedRoutes.PayOrder).replace('{id}', selectedOrder?.id.toString()))}
                      >
                        Bayar Pesanan
                      </Button>
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
            )
          ) : (
            selectedBooking ? (
              <Card className="shadow-sm">
                <CardContent className="space-y-5 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="mb-1 text-[10px] font-semibold tracking-widest text-muted-foreground">
                        Nomor Booking
                      </p>
                      <p className="text-xl font-bold text-foreground">
                        #{selectedBooking.id}
                      </p>
                    </div>
                    <Badge
                      className={`rounded-full bg-${selectedBooking.getStatusBadgeColor()}-500 px-3 py-1.5 text-xs font-semibold text-white`}
                    >
                      ● {selectedBooking.getStatusLabel()}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 rounded-xl bg-muted/30 p-4">
                    <div>
                      <p className="mb-1 text-[10px] font-semibold tracking-widest text-muted-foreground">
                        Tanggal Booking
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {new Date(selectedBooking.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 text-[10px] font-semibold tracking-widest text-muted-foreground">
                        Tanggal Ambil
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {selectedBooking.tgl_ambil
                          ? new Date(selectedBooking.tgl_ambil).toLocaleDateString()
                          : 'Belum ditentukan'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="mb-3 text-[10px] font-semibold tracking-widest text-muted-foreground">
                      DETAIL BOOKING
                    </p>
                    <div className="space-y-3 rounded-xl bg-muted/30 p-4">
                      {selectedBooking.ukuran && (
                        <div>
                          <p className="text-xs text-muted-foreground">Ukuran Custom</p>
                          <p className="font-semibold">{selectedBooking.ukuran}</p>
                        </div>
                      )}
                      {selectedBooking.desain_custom_url && (
                        <div>
                          <p className="text-xs text-muted-foreground">Desain Custom</p>
                          <div className="mt-2">
                            {viewingImage ? (
                              <div>
                                <img
                                  src={viewingImage.url}
                                  alt="Desain Custom"
                                  className="max-h-48 w-auto object-contain rounded-lg border"
                                  onError={() => {
                                    // Hide the image and show a toast on error
                                    setViewingImage(null);
                                    toast.error('Gagal memuat desain – file mungkin rusak atau tidak ditemukan');
                                  }}
                                />
                                <button
                                  onClick={() => setViewingImage(null)}
                                  className="mt-2 text-sm text-primary hover:underline"
                                >
                                  Sembunyikan Desain
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={async () => {
                                  setIsImageLoading(true);
                                  try {
                                    const customUrl = selectedBooking.desain_custom_url;

                                    // 1. If it's already a valid URL or data URL, show it directly
                                    if (customUrl && (customUrl.startsWith('http') || customUrl.startsWith('data:'))) {
                                      setViewingImage({ url: customUrl, type: 'image/png' });
                                      return;
                                    }

                                    // 2. Try to extract a numeric ID from the URL for GambarService
                                    let gambarId: number | null = null;

                                    if (customUrl) {
                                      // If the whole string is a number
                                      if (/^\d+$/.test(customUrl)) {
                                        gambarId = parseInt(customUrl, 10);
                                      } else {
                                        // Look for a number at the end of the path (e.g. /gambar/123 or 123.jpg)
                                        const match = customUrl.match(/\/(\d+)(?:\.\w+)?$/);
                                        if (match) {
                                          gambarId = parseInt(match[1], 10);
                                        }
                                      }
                                    }

                            // 3. If we have a valid ID, fetch the image data from the server as binary
                            if (gambarId && !isNaN(gambarId)) {
                              try {
                                const blob = await GambarService.getProtectedFile(gambarId);
                                const url = URL.createObjectURL(blob);
                                setViewingImage({ url, type: blob.type });
                                return;
                              } catch (error) {
                                console.error('Failed to fetch via GambarService, falling back to URL:', error);
                                // Fall through to URL approach
                              }
                            }

                            // 4. Final fallback: try to use the original URL as-is with proper base
                            const fullUrl = getImageUrl(customUrl);
                            if (fullUrl) {
                              setViewingImage({ url: fullUrl, type: 'image/png' });
                            } else {
                              toast.error('Tidak ada desain yang tersedia');
                            }
                                  } catch (error) {
                                    console.error('Failed to load design:', error);
                                    toast.error('Gagal memuat desain');
                                  } finally {
                                    setIsImageLoading(false);
                                  }
                                }}
                                className="font-semibold text-primary hover:underline"
                                disabled={isImageLoading}
                              >
                                {isImageLoading ? 'Memuat...' : 'Lihat Desain'}
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                      <div>
                        <p className="text-xs text-muted-foreground">Catatan</p>
                        <p className="font-semibold">{selectedBooking.catatan || '-'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between rounded-xl bg-primary/5 p-3">
                    <span className="text-sm font-semibold text-foreground">
                      Total Booking
                    </span>
                    <span className="text-sm font-bold text-primary">
                      {selectedBooking.getFormattedPrice()}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {selectedBooking?.status_verifikasi === BookingStatus.DISETUJUI && (
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => navigate(RouteService.convertToReactRouterParam(ProtectedRoutes.PayBooking).replace('{id}', selectedBooking?.id.toString()))}
                      >
                        Bayar Booking
                      </Button>
                    )}

                    <WhatsAppButton
                      id_pesanan={selectedBooking.id}
                      type_of_message="Booking"
                      beginningMessage="Saya mau konfirmasi booking"
                    />

                    {selectedBooking.canCancel() && (
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => openCancelBookingDialog(selectedBooking.id)}
                      >
                        Batalkan Booking
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-sm">
                <CardContent className="p-6 text-center text-muted-foreground">
                  Pilih booking untuk melihat detail.
                </CardContent>
              </Card>
            )
          )}
        </div>
      </main>
    </div>
  )
}