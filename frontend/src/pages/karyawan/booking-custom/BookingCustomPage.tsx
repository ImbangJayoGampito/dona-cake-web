import { useEffect, useState, useCallback } from "react"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import BookingKdsBoard from "./components/BookingKdsBoard"
import TolakBookingDialog from "./components/TolakBookingDialog"
import { KaryawanBookingService } from "@/services/karyawan-booking-service"
import type { Booking } from "@/types/karyawan.types"

export default function BookingCustomPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const [tolakDialogId, setTolakDialogId] = useState<number | null>(null)

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await KaryawanBookingService.getBookings()
      if (res.isSuccess()) {
        setBookings(res.data ?? [])
      } else {
        setError(res.message ?? "Gagal memuat booking.")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  const handleKonfirmasi = async (id: number) => {
    setUpdatingId(id)
    try {
      const res = await KaryawanBookingService.verifyBooking(id, {
        status: "disetujui",
      })
      if (res.isSuccess() && res.data) {
        const updated = res.data
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? updated : b))
        )
      }
    } finally {
      setUpdatingId(null)
    }
  }

  const handleSelesai = async (id: number) => {
    setUpdatingId(id)
    try {
      const res = await KaryawanBookingService.verifyBooking(id, {
        status: "selesai",
      })
      if (res.isSuccess() && res.data) {
        const updated = res.data
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? updated : b))
        )
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
      if (res.isSuccess() && res.data) {
        const updated = res.data
        setBookings((prev) =>
          prev.map((b) => (b.id === tolakDialogId ? updated : b))
        )
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

      <div className="flex flex-1 flex-col gap-4">
        {loading && (
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="min-h-[400px] rounded-xl" />
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

        {!loading && !error && (
          <BookingKdsBoard
            bookings={bookings}
            onKonfirmasi={handleKonfirmasi}
            onTolak={(id) => setTolakDialogId(id)}
            onSelesai={handleSelesai}
            updatingId={updatingId}
          />
        )}
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
