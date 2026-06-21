import { useEffect, useState, useCallback } from "react"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import BookingTabBar from "./components/BookingTabBar"
import BookingCustomCard from "./components/BookingCustomCard"
import UpcomingDeadlines from "./components/UpcomingDeadlines"
import TolakBookingDialog from "./components/TolakBookingDialog"
import { KaryawanBookingService } from "@/services/karyawan-booking-service"
import type { Booking, StatusVerifikasi } from "@/types/karyawan.types"

export default function BookingCustomPage() {
  const [activeTab, setActiveTab] = useState<StatusVerifikasi>("menunggu_verifikasi")
  const [bookings, setBookings] = useState<Booking[]>([])
  const [deadlines, setDeadlines] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const [tolakDialogId, setTolakDialogId] = useState<number | null>(null)

  const fetchBookings = useCallback(async (status: StatusVerifikasi) => {
    setLoading(true)
    setError(null)
    try {
      const [bookingsRes, deadlinesRes] = await Promise.all([
        KaryawanBookingService.getBookings(status),
        KaryawanBookingService.getUpcomingDeadlines(),
      ])
      if (bookingsRes.isSuccess()) setBookings(bookingsRes.data ?? [])
      else setError(bookingsRes.message ?? "Gagal memuat booking.")
      if (deadlinesRes.isSuccess()) setDeadlines(deadlinesRes.data ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBookings(activeTab)
  }, [activeTab, fetchBookings])

  const handleTabChange = (status: StatusVerifikasi) => {
    setActiveTab(status)
    setBookings([])
  }

  const handleKonfirmasi = async (id: number) => {
    setUpdatingId(id)
    try {
      const res = await KaryawanBookingService.verifyBooking(id, {
        status: "disetujui",
      })
      if (res.isSuccess()) {
        // Hapus dari list pending
        setBookings((prev) => prev.filter((b) => b.id !== id))
      }
    } finally {
      setUpdatingId(null)
    }
  }

  const handleTolakConfirm = async (alasan: string) => {
    if (!tolakDialogId) return
    setUpdatingId(tolakDialogId)
    try {
      const res = await KaryawanBookingService.verifyBooking(tolakDialogId, {
        status: "ditolak",
        catatan: alasan,
      })
      if (res.isSuccess()) {
        setBookings((prev) => prev.filter((b) => b.id !== tolakDialogId))
        setTolakDialogId(null)
      }
    } finally {
      setUpdatingId(null)
    }
  }

  const tolakBooking = bookings.find((b) => b.id === tolakDialogId)

  return (
    <div className="flex h-full flex-col gap-6">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        Booking Custom
      </h1>

      <div className="flex gap-6">
        {/* Main content */}
        <div className="flex flex-1 flex-col gap-4">
          <BookingTabBar
            activeTab={activeTab}
            onTabChange={handleTabChange}
            counts={{
              menunggu_verifikasi: activeTab === "menunggu_verifikasi" ? bookings.length : undefined,
            }}
          />

          {loading && (
            <div className="flex flex-col gap-4">
              {[...Array(2)].map((_, i) => (
                <Skeleton key={i} className="h-52 rounded-xl" />
              ))}
            </div>
          )}

          {!loading && error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Gagal Memuat</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!loading && !error && bookings.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <p className="text-sm">Tidak ada booking untuk tab ini.</p>
            </div>
          )}

          {!loading &&
            !error &&
            bookings.map((booking) => (
              <BookingCustomCard
                key={booking.id}
                booking={booking}
                onKonfirmasi={handleKonfirmasi}
                onTolak={(id) => setTolakDialogId(id)}
                isUpdating={updatingId === booking.id}
              />
            ))}
        </div>

        {/* Panel kanan: Upcoming Deadlines */}
        <UpcomingDeadlines bookings={deadlines} />
      </div>

      {/* Modal Tolak */}
      <TolakBookingDialog
        open={tolakDialogId !== null}
        bookingId={
          tolakBooking
            ? `#BK-${String(tolakBooking.id).padStart(4, "0")}`
            : ""
        }
        onClose={() => setTolakDialogId(null)}
        onConfirm={handleTolakConfirm}
        isLoading={updatingId === tolakDialogId}
      />
    </div>
  )
}
