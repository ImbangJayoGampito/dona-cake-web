import Kategori from "@/models/kategori.model"
import { PublicRoutes, ProtectedRoutes } from "@/lib/routes"
import ApiResponse from "@/lib/api/api-response"
import api from "@/lib/api/config"
import { RouteService } from "./route-service"
import { Booking } from "@/models/booking.model"
import type { BookingForm } from "@/types/booking.types"
export default class BookingService {
  static async getBookings(): Promise<ApiResponse<Booking[]>> {
    try {
      const response = await api.get<ApiResponse<Booking[]>>(
        ProtectedRoutes.Bookings
      )
      return ApiResponse.fromApiArray(response.data)
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
      const response = await api.post<ApiResponse<Booking>>(
        ProtectedRoutes.Bookings,
        booking
      )
      return ApiResponse.fromApiSingle(response.data)
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
