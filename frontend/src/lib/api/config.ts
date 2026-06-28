import axios, { AxiosError } from "axios"
import type { InternalAxiosRequestConfig, AxiosInstance } from "axios"
import { TokenStorage } from "@/lib/local-storage/token"
import { PublicRoutes } from "@/lib/routes"
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  withCredentials: true,
})
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = TokenStorage.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      TokenStorage.removeToken()
      // redirect to login
      if (typeof window !== "undefined") {
        window.location.href = PublicRoutes.Login
      }
    }

    // Extract friendly error message from backend if available
    const responseData = error.response?.data as any
    if (responseData && typeof responseData === "object" && responseData.message) {
      error.message = responseData.message
    }

    return Promise.reject(error)
  }
)

export default api
