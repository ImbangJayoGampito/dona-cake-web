import { ProtectedRoutes } from "@/lib/routes"
import ApiResponse from "@/lib/api/api-response"
import api from "@/lib/api/config"
import { Booking } from "@/models/booking.model"
import type { BookingForm } from "@/types/booking.types"
import GambarService from "./gambar-service"

export default class BookingService {
  static async getBookings(): Promise<ApiResponse<Booking[]>> {
    try {
      const response = await api.get<ApiResponse<Booking[]>>(
        ProtectedRoutes.Bookings
      )
      return ApiResponse.fromApiArray(response.data, (item) => new Booking(item))
    } catch (error) {
      return new ApiResponse(
        [],
        "error",
        undefined,
        error instanceof Error ? error.message : String(error)
      )
    }
  }

  static async createBooking(
    booking: BookingForm
  ): Promise<ApiResponse<Booking>> {
    try {
      // First, create the booking without the custom design URL
      const payload = {
        ukuran: booking.ukuran,
        jenis_frosting: booking.jenis_frosting,
        rasa_kue: booking.rasa_kue.join(", "),
        tgl_ambil: booking.tgl_ambil,
        desain_custom_url: null, // Will be updated after image upload
        deskripsi_custom: booking.deskripsi_custom ?? null,
        kategori_id: booking.kategori_id ?? null,
        tema_dekorasi: booking.tema_dekorasi ?? null,
        harga_final: booking.harga_final ?? null,
        catatan: booking.catatan ?? null,
      }

      const response = await api.post<ApiResponse<Booking>>(
        ProtectedRoutes.Bookings,
        payload
      )

      // The API returns data in response.data.data format
      if (!response.data.data) {
        return new ApiResponse<Booking>(
          undefined,
          "error",
          undefined,
          response.data.message ?? "Gagal membuat booking."
        )
      }

      const createdBooking = new Booking(response.data.data)

      // If there's a custom design file, upload it with the booking as the polymorphic parent
      if (booking.desain_custom_file) {
        const uploadResult = await GambarService.uploadGambar({
          file: booking.desain_custom_file,
          gambarable_type: "App\\Models\\Booking",
          gambarable_id: createdBooking.id,
        })

        if (!uploadResult.isSuccess() || !uploadResult.data) {
          return new ApiResponse<Booking>(
            undefined,
            "error",
            undefined,
            uploadResult.message ?? "Gagal mengunggah foto referensi.",
            uploadResult.errors
          )
        }

        // Update the booking with the image URL
        const updateResponse = await api.patch<ApiResponse<Booking>>(
          `${ProtectedRoutes.Bookings}/${createdBooking.id}`,
          {
            desain_custom_url: uploadResult.data.getFullUrl()
          }
        )

        // The API returns data in response.data.data format
        if (!updateResponse.data.data) {
          return new ApiResponse<Booking>(
            undefined,
            "error",
            undefined,
            updateResponse.data.message ?? "Gagal memperbarui booking dengan URL gambar."
          )
        }

        return ApiResponse.fromApiSingle(updateResponse.data, (data) => new Booking(data))
      }

      return ApiResponse.fromApiSingle(response.data, (data) => new Booking(data))
    } catch (error) {
      return new ApiResponse<Booking>(
        undefined,
        "error",
        undefined,
        error instanceof Error ? error.message : String(error)
      )
    }
  }

  /**
   * Cancel a booking
   * @param bookingId The ID of the booking to cancel
   * @returns Promise with ApiResponse indicating success/failure
   */
  static async cancelBooking(bookingId: number): Promise<ApiResponse<Booking>> {
    try {
      const url = ProtectedRoutes.CancelBooking.replace('{id}', bookingId.toString())
      const response = await api.post<ApiResponse<Booking>>(url)


        return ApiResponse.fromApiSingle(response.data, (data) => new Booking(data))

    } catch (error) {
      return new ApiResponse<Booking>(
        undefined,
        "error",
        undefined,
        error instanceof Error ? error.message : String(error)
      )
    }
  }
}