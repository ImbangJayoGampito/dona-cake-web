// =============================================================================
// KARYAWAN — Reservasi / Booking Tempat Service (PLACEHOLDER)
// Backend & endpoint belum tersedia — file ini hanya scaffold
// =============================================================================

import ApiResponse from "@/lib/api/api-response"

// Endpoint belum ada — definisi sementara
const BOOKING_TEMPAT_BASE = "/booking-tempat"

export type StatusReservasi = "pending" | "dikonfirmasi" | "selesai" | "ditolak"

export interface Reservasi {
  id: number
  nama_tamu: string
  jumlah_orang: number
  tanggal_sesi: string
  occasion?: string
  permintaan_khusus?: string
  status: StatusReservasi
  created_at: string
}

export class KaryawanReservasiService {
  /** PLACEHOLDER — endpoint belum ada di backend */
  static async getReservasi(
    _status?: StatusReservasi
  ): Promise<ApiResponse<Reservasi[]>> {
    // Return empty success sampai backend siap
    return new ApiResponse<Reservasi[]>([], "success")
  }

  /** PLACEHOLDER */
  static async konfirmasiReservasi(_id: number): Promise<ApiResponse<void>> {
    return new ApiResponse<void>(undefined, "error", undefined, "Endpoint belum tersedia")
  }

  /** PLACEHOLDER */
  static async tolakReservasi(_id: number): Promise<ApiResponse<void>> {
    return new ApiResponse<void>(undefined, "error", undefined, "Endpoint belum tersedia")
  }
}
