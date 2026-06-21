import { AdminRoutes } from "@/lib/routes"
import ApiResponse from "@/lib/api/api-response"
import api from "@/lib/api/config"
import { RouteService } from "@/services/route-service"
import { AdminUser } from "@/models/admin-user.model"

export interface UserListParams {
  page?: number
  search?: string
  role?: string
}

export type UpdateRolePayload = {
  role: string
}

export class ManajemenPenggunaService {
  /**
   * GET /admin/users
   * Mendukung query params: page, search, role (filter).
   * Response berisi array user + pagination meta.
   */
  static async getUsers(
    params: UserListParams = {}
  ): Promise<ApiResponse<AdminUser[]>> {
    try {
      const response = await api.get(AdminRoutes.Users, { params })
      return ApiResponse.fromApiArray(
        response.data,
        (data) => new AdminUser(data)
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<AdminUser[]>(undefined, "error", undefined, message)
    }
  }

  /**
   * POST /admin/users
   * Membuat user baru (admin only).
   */
  static async createUser(
    payload: any
  ): Promise<ApiResponse<AdminUser>> {
    try {
      const response = await api.post(AdminRoutes.CreateUser, payload)
      return ApiResponse.fromApiSingle(
        response.data,
        (data: any) => new AdminUser(data.user || data)
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<AdminUser>(undefined, "error", undefined, message)
    }
  }

  /**
   * PATCH /admin/users/{user}/role
   * Mengubah role user: "admin" | "karyawan" | "user".
   */
  static async updateRole(
    userId: number,
    payload: UpdateRolePayload
  ): Promise<ApiResponse<AdminUser>> {
    try {
      const url = RouteService.replaceParams(AdminRoutes.UpdateUserRole, {
        user: userId.toString(),
      })
      const response = await api.put(url, payload)
      return ApiResponse.fromApiSingle(
        response.data,
        (data: any) => new AdminUser(data.user || data)
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<AdminUser>(undefined, "error", undefined, message)
    }
  }

  /**
   * DELETE /admin/users/{user}
   * HARD DELETE permanen — user dan data pelanggan terhubung ikut terhapus
   * via cascade. Modal konfirmasi wajib ditampilkan sebelum memanggil ini.
   */
  static async deleteUser(userId: number): Promise<ApiResponse<void>> {
    try {
      const url = RouteService.replaceParams(AdminRoutes.DeleteUser, {
        user: userId.toString(),
      })
      const response = await api.delete(url)
      return ApiResponse.fromApiSingle(response.data)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<void>(undefined, "error", undefined, message)
    }
  }

  /**
   * Bulk DELETE: hapus beberapa user sekaligus (sequential, bukan batch
   * endpoint karena backend tidak punya endpoint batch delete).
   * Mengembalikan { deleted: id[], failed: id[] } untuk feedback UI.
   */
  static async deleteUsers(
    userIds: number[]
  ): Promise<{ deleted: number[]; failed: number[] }> {
    const deleted: number[] = []
    const failed: number[] = []

    await Promise.all(
      userIds.map(async (id) => {
        const result = await ManajemenPenggunaService.deleteUser(id)
        if (result.isSuccess()) {
          deleted.push(id)
        } else {
          failed.push(id)
        }
      })
    )

    return { deleted, failed }
  }
}
