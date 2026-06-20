// =============================================================================
// KARYAWAN — Booking Service (Custom Cake)
// Endpoint: /booking & /booking/{id}/verify
// Sesuai api.php routes dan Booking.php model
// =============================================================================

import { ProtectedRoutes, VerifyBooking } from "@/lib/routes"
import ApiResponse from "@/lib/api/api-response"
import api from "@/lib/api/config"
import { RouteService } from "@/services/route-service"
import type { Booking, StatusVerifikasi } from "@/types/karyawan.types"

export interface VerifyBookingPayload {
  status: "disetujui" | "ditolak"
  catatan?: string
}

export class KaryawanBookingService {
  /**
   * GET /booking — ambil daftar booking dengan filter status.
   * Status sesuai BookingStatus enum:
   *   menunggu_verifikasi | disetujui | ditolak | dibatalkan | selesai
   */
  static async getBookings(
    status?: StatusVerifikasi
  ): Promise<ApiResponse<Booking[]>> {
    try {
      const params: Record<string, string> = {}
      if (status) params.status = status

      const response = await api.get(ProtectedRoutes.Bookings, { params })
      return ApiResponse.fromApiArray(response.data, (data) => data as Booking)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<Booking[]>(undefined, "error", undefined, message)
    }
  }

  /**
   * GET /booking/{id} — detail booking termasuk relasi pelanggan.
   */
  static async getBookingDetail(id: number): Promise<ApiResponse<Booking>> {
    try {
      const url = RouteService.replaceParams(ProtectedRoutes.BookingDetail, {
        id: id.toString(),
      })
      const response = await api.get(url)
      return ApiResponse.fromApiSingle(
        response.data,
        (data) => data as Booking
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<Booking>(undefined, "error", undefined, message)
    }
  }

  /**
   * POST /booking/{id}/verify — konfirmasi atau tolak booking.
   * Endpoint: VerifyBooking = "/booking/{id}/verify"
   * Middleware: role:admin,karyawan (sesuai api.php)
   * Payload: { status: "disetujui"|"ditolak", catatan?: string }
   */
  static async verifyBooking(
    id: number,
    payload: VerifyBookingPayload
  ): Promise<ApiResponse<Booking>> {
    try {
      const url = RouteService.replaceParams(VerifyBooking, {
        id: id.toString(),
      })
      const response = await api.post(url, payload)
      return ApiResponse.fromApiSingle(
        response.data,
        (data) => data as Booking
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<Booking>(undefined, "error", undefined, message)
    }
  }

  /**
   * Helper: ambil booking "Upcoming Deadlines" —
   * booking berstatus disetujui, diurutkan by tgl_ambil ascending.
   */
  static async getUpcomingDeadlines(): Promise<ApiResponse<Booking[]>> {
    try {
      const response = await api.get(ProtectedRoutes.Bookings, {
        params: {
          status: "disetujui",
          sort: "tgl_ambil",
          order: "asc",
          upcoming: true,
        },
      })
      return ApiResponse.fromApiArray(response.data, (data) => data as Booking)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<Booking[]>(undefined, "error", undefined, message)
    }
  }
}
