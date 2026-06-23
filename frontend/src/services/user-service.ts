import { User } from "@/models/user.model"
import { PublicRoutes, ProtectedRoutes } from "@/lib/routes"
import ApiResponse from "@/lib/api/api-response"
import api from "@/lib/api/config"
import type { LoginData } from "@/types/auth.types"
import { TokenStorage } from "@/lib/local-storage/token"
import { useAuthStore } from "@/lib/state/logged-user"

export class UserService {
  constructor() { }

  // ---------- LOGIN ----------
  public static async login(
    username: string,
    password: string,
  ): Promise<ApiResponse<LoginData>> {
    try {
      const response = await api.post(PublicRoutes.Login, {
        username,
        password,
      })
      const apiResponse = ApiResponse.fromApiSingle<LoginData>(
        response.data,
        (data) => ({
          user: new User(data.user),
          token: data.token,
          token_type: data.token_type,
        })
      )

      if (apiResponse.isSuccess() && apiResponse.data) {
        const { user, token } = apiResponse.data
        // Update auth store and token storage
        useAuthStore.getState().setUser(user)
        TokenStorage.setToken(token)
      }
      return apiResponse
    } catch (error: any) {
      console.error("Error logging in", error)
      const message =
        error.response?.data?.message || "Terjadi kesalahan saat login"
      return new ApiResponse<LoginData>(undefined, "error", undefined, message)
    }
  }

  // ---------- REGISTER ----------
  public static async register(
    username: string,
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ): Promise<ApiResponse<LoginData>> {
    try {
      if (password !== password_confirmation) {
        return new ApiResponse<LoginData>(
          undefined,
          "error",
          undefined,
          "Password tidak sesuai dengan konfirmasi password"
        )
      }

      const response = await api.post(PublicRoutes.Register, {
        name,
        email,
        password,
        username,
        password_confirmation,
      })
      const apiResponse = ApiResponse.fromApiSingle<LoginData>(
        response.data,
        (data) => ({
          user: new User(data.user),
          token: data.token,
          token_type: data.token_type,
        })
      )

      if (apiResponse.isSuccess() && apiResponse.data) {
        const { user, token } = apiResponse.data
        // Auto‑login after registration (optional)
        TokenStorage.setToken(token)
        useAuthStore.getState().setUser(user)
      }
      return apiResponse
    } catch (error: any) {
      console.error("Error registering user:", error)
      const message = error.response?.data?.message || "Gagal mendaftarkan user"
      return new ApiResponse<LoginData>(undefined, "error", undefined, message)
    }
  }

  // ---------- LOGOUT (single session) ----------
  public static async logout(): Promise<void> {
    try {
      const response = await api.post(ProtectedRoutes.Logout)
      if (response.status !== 200) {
        console.error("Logout failed")
      }
      useAuthStore.getState().logout()
      TokenStorage.removeToken()
    } catch (error) {
      console.error("Error logging out", error)
      // Even if API fails, clear local state
      useAuthStore.getState().logout()
      TokenStorage.removeToken()
    }
  }

  // ---------- LOGOUT ALL SESSIONS ----------
  public static async logoutAll(): Promise<void> {
    try {
      const response = await api.post(ProtectedRoutes.LogoutAll)
      if (response.status !== 200) {
        console.error("Logout all failed")
      }
      useAuthStore.getState().logout()
      TokenStorage.removeToken()
    } catch (error) {
      console.error("Error logging out all", error)
      useAuthStore.getState().logout()
      TokenStorage.removeToken()
    }
  }

  // ---------- REFRESH TOKEN ----------
  public static async refreshAccessToken(): Promise<
    ApiResponse<{ token: string }>
  > {
    try {
      const response = await api.post(ProtectedRoutes.FromToken)
      const data = response.data
      // Assume success if status is 2xx and data contains token
      if (data.token) {
        TokenStorage.setToken(data.token)
        return new ApiResponse<{ token: string }>(
          { token: data.token },
          "success",
          undefined,
          "Token refreshed"
        )
      } else {
        return new ApiResponse<{ token: string }>(
          undefined,
          "error",
          undefined,
          data.message || "Invalid refresh response"
        )
      }
    } catch (error: any) {
      console.error("Error refreshing access token", error)
      return new ApiResponse<{ token: string }>(
        undefined,
        "error",
        undefined,
        error.response?.data?.message || "Gagal refresh token"
      )
    }
  }
  // ---------- FORGOT PASSWORD ----------
  public static async forgotPassword(
    email: string
  ): Promise<ApiResponse<void | void[]>> {
    try {
      const response = await api.post("/auth/forgot-password", { email })
      return ApiResponse.fromApiSingle<void>(response)
    } catch (error: any) {
      console.error("Error forgot password", error)
      const message =
        error.response?.data?.message || "Gagal mengirim email reset password"
      return new ApiResponse<void>(undefined, "error", undefined, message)
    }
  }

  // ---------- RESET PASSWORD ----------
  public static async resetPassword(
    email: string,
    newPassword: string
  ): Promise<ApiResponse<void>> {
    try {
      const response = await api.post(ProtectedRoutes.ChangePassword, {
        email,
        newPassword,
      })
      return ApiResponse.fromApiSingle<void>(response.data)
    } catch (error: any) {
      console.error("Error resetting password", error)
      const message = error.response?.data?.message || "Gagal reset password"
      return new ApiResponse<void>(undefined, "error", undefined, message)
    }
  }

  // ---------- UPDATE PROFILE ----------
  public static async updateProfile(
    name: string,
    email: string,
    username: string
  ): Promise<ApiResponse<User>> {
    try {
      const payload: any = { name, email, username }

      const response = await api.put(ProtectedRoutes.UpdateProfile, payload)
      const apiResponse = ApiResponse.fromApiSingle<User>(
        response.data,
        (data) => {
          const currentRole = useAuthStore.getState().user?.role
          return new User({ ...data, role: currentRole })
        }
      )
      if (apiResponse.isSuccess() && apiResponse.data) {
        useAuthStore.getState().setUser(apiResponse.data)
      }
      return apiResponse
    } catch (error: any) {
      console.error("Error updating profile", error)
      const message = error.response?.data?.message || "Gagal update profil"
      return new ApiResponse<User>(undefined, "error", undefined, message)
    }
  }

  // ---------- FROM TOKEN (get user by token) ----------
  public static async fromToken(): Promise<ApiResponse<User>> {
    try {
      const token = TokenStorage.getToken()
      if (!token)
        return new ApiResponse<User>(
          undefined,
          "error",
          undefined,
          "No token"
        )
      const response = await api.get(ProtectedRoutes.FromToken)
      const apiResponse = ApiResponse.fromApiSingle<User>(
        response.data,
        (data) => new User(data.user)
      )
      if (apiResponse.isSuccess() && apiResponse.data) {
        useAuthStore.getState().setUser(apiResponse.data)
      }
      return apiResponse
    } catch (error: any) {
      console.error("Error from token:", error)
      const message = error.response?.data?.message || "Token tidak valid"
      return new ApiResponse<User>(
        undefined,
        "error",
        undefined,
        message
      )
    }
  }
}
