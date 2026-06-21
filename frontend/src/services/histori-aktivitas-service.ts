import { ProtectedRoutes } from "@/lib/routes"
import ApiResponse from "@/lib/api/api-response"
import api from "@/lib/api/config"
import { Produk } from "@/models/produk.model"
import { AktivitasJenis, type AktivitasJenis as AktivitasJenisType } from "@/types/enums"
import type { StoreHistoriAktivitasRequest, StoreHistoriAktivitasBatchRequest } from "@/types/histori-aktivitas.types"

export default class HistoriAktivitasService {
  /**
   * Create a single activity record
   * @param produk The product related to the activity
   * @param jenisAktivitas The type of activity
   * @returns Promise with ApiResponse containing the created activity
   */
  static async createSingle(
    produk: Produk,
    jenisAktivitas: AktivitasJenisType
  ): Promise<ApiResponse<any>> {
    try {
      const request: StoreHistoriAktivitasRequest = {
        jenis_aktivitas: jenisAktivitas,
        produk_terkait: produk.id
      }

      const response = await api.post<ApiResponse<any>>(
        ProtectedRoutes.Aktivitas,
        request
      )
      return ApiResponse.fromApiSingle(response.data)
    } catch (error) {
      return new ApiResponse(
        undefined,
        "error",
        undefined,
        error instanceof Error ? error.message : String(error)
      )
    }
  }

  /**
   * Create multiple activity records
   * @param produk The product related to the activities
   * @param jenisAktivitas The type of activity
   * @returns Promise with ApiResponse containing the created activities
   */
  static async createMultiples(
    produk: Produk,
    jenisAktivitas: AktivitasJenisType
  ): Promise<ApiResponse<any>> {
    try {
      const request: StoreHistoriAktivitasBatchRequest = {
        aktivitas: [{
          jenis_aktivitas: jenisAktivitas,
          produk_terkait: produk.id
        }]
      }

      const response = await api.post<ApiResponse<any>>(
        ProtectedRoutes.AktivitasBatch,
        request
      )
      return ApiResponse.fromApiSingle(response.data)
    } catch (error) {
      return new ApiResponse(
        undefined,
        "error",
        undefined,
        error instanceof Error ? error.message : String(error)
      )
    }
  }

  /**
   * Create multiple activity records for different products and activity types
   * @param activities Array of activity objects with produk and jenisAktivitas
   * @returns Promise with ApiResponse containing the created activities
   */
  static async createBatchActivities(
    activities: Array<{ produk: Produk, jenisAktivitas: AktivitasJenisType }>
  ): Promise<ApiResponse<any>> {
    try {
      const request: StoreHistoriAktivitasBatchRequest = {
        aktivitas: activities.map(activity => ({
          jenis_aktivitas: activity.jenisAktivitas,
          produk_terkait: activity.produk.id
        }))
      }

      const response = await api.post<ApiResponse<any>>(
        ProtectedRoutes.AktivitasBatch,
        request
      )
      return ApiResponse.fromApiSingle(response.data)
    } catch (error) {
      return new ApiResponse(
        undefined,
        "error",
        undefined,
        error instanceof Error ? error.message : String(error)
      )
    }
  }
}