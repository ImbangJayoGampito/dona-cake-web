// =============================================================================
// PROFIL SERVICE
// Endpoint: GET/PUT /pelanggan/profile, POST /auth/change-password
// =============================================================================

import { ProtectedRoutes } from "@/lib/routes"
import ApiResponse from "@/lib/api/api-response"
import api from "@/lib/api/config"
import { Pelanggan } from "@/models/pelanggan.model"
import { User } from "@/models/user.model"
import { useAuthStore } from "@/lib/state/logged-user"

export interface PelangganProfileData {
  user: User
  pelanggan: Pelanggan
}

export interface UpdateProfilPayload {
  name?: string
  email?: string
  username?: string
  no_telepon?: string | null
  alamat?: string | null
}

export interface ChangePasswordPayload {
  current_password: string
  new_password: string
  new_password_confirmation: string
}

export class ProfilService {
  /**
   * GET /pelanggan/profile
   */
  static async getProfil(): Promise<ApiResponse<PelangganProfileData>> {
    try {
      const response = await api.get(ProtectedRoutes.PelangganProfile)
      const raw = response.data?.data ?? response.data
      const user = new User(raw.user ?? raw)
      const pelanggan = new Pelanggan({ ...raw, user })
      return new ApiResponse<PelangganProfileData>({ user, pelanggan }, "success")
    } catch (error: any) {
      const message = error.response?.data?.message || "Gagal memuat profil."
      return new ApiResponse<PelangganProfileData>(undefined, "error", undefined, message)
    }
  }

  /**
   * PUT /pelanggan/profile + PUT /auth/profile (paralel)
   */
  static async updateProfil(
    payload: UpdateProfilPayload
  ): Promise<ApiResponse<PelangganProfileData>> {
    try {
      const userPayload: Record<string, any> = {}
      const pelangganPayload: Record<string, any> = {}

      if (payload.name !== undefined) userPayload.name = payload.name
      if (payload.email !== undefined) userPayload.email = payload.email
      if (payload.username !== undefined) userPayload.username = payload.username
      if (payload.no_telepon !== undefined) pelangganPayload.no_telepon = payload.no_telepon
      if (payload.alamat !== undefined) pelangganPayload.alamat = payload.alamat

      await Promise.all([
        Object.keys(userPayload).length > 0
          ? api.put(ProtectedRoutes.UpdateProfile, userPayload)
          : Promise.resolve(null),
        Object.keys(pelangganPayload).length > 0
          ? api.put(ProtectedRoutes.UpdatePelangganProfile, pelangganPayload)
          : Promise.resolve(null),
      ])

      const fresh = await ProfilService.getProfil()
      if (fresh.isSuccess() && fresh.data) {
        useAuthStore.getState().setUser(fresh.data.user)
      }
      return fresh
    } catch (error: any) {
      const message = error.response?.data?.message || "Gagal menyimpan perubahan."
      return new ApiResponse<PelangganProfileData>(undefined, "error", undefined, message)
    }
  }

  /**
   * POST /auth/change-password
   */
  static async changePassword(
    payload: ChangePasswordPayload
  ): Promise<ApiResponse<void>> {
    try {
      const response = await api.post(ProtectedRoutes.ChangePassword, payload)
      return ApiResponse.fromApiSingle<void>(response.data)
    } catch (error: any) {
      const message = error.response?.data?.message || "Gagal mengganti password."
      return new ApiResponse<void>(undefined, "error", undefined, message)
    }
  }
}
