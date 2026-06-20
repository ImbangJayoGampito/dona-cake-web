// src/App.tsx
import { Routes, Route } from "react-router-dom"
import { Button } from "@/components/ui/button"
import AuthLayout from "./pages/auth/auth-layout"
import { useEffect } from "react"
// Example page components
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"
import { useState } from "react"
import MainHome from "./pages/main-menu/main-home"
import { useAuthStore } from "./lib/state/logged-user"
import { TokenStorage } from "./lib/local-storage/token"
import { UserService } from "./services/user-service"
import { PublicRoutes, ProtectedRoutes } from "./lib/routes"
import ProductDetailPage from "./pages/produk/produk-card"
import { RouteService } from "./services/route-service"

import { toast } from "sonner"
import Profile from "./pages/user/profile"
import { AppHeader } from "./components/layout/header"
import AppLayout from "./pages/layout"
import BookingLayout from "./pages/booking/layout"

// Admin imports
import ProtectedRoute from "./components/layout/ProtectedRoute"
import AdminLayout from "./components/layout/admin/AdminLayout"
import DashboardOverview from "./pages/admin/DashboardOverview"
import AksesDitolakPage from "./pages/errors/AksesDitolakPage"
import ManajemenPenggunaPage from "./pages/admin/pengguna/ManajemenPenggunaPage"
import ManajemenProdukPage from "./pages/admin/produk/ManajemenProdukPage"
import LaporanKeuanganPage from "./pages/admin/laporan/LaporanKeuanganPage"
import MonitorAsistenPage from "./pages/admin/asisten/MonitorAsistenPage"

// Karyawan imports
import KaryawanLayout from "./pages/karyawan/layout/KaryawanLayout"
import AntrianPesananPage from "./pages/karyawan/pesanan/AntrianPesananPage"
import BookingCustomPage from "./pages/karyawan/booking-custom/BookingCustomPage"
import UlasanProdukPage from "./pages/karyawan/ulasan/UlasanProdukPage"
import BookingTempatPage from "./pages/karyawan/booking-tempat/BookingTempatPage"

export function App() {
  const [isLoading, setIsLoading] = useState(true)
  const setUser = useAuthStore((state) => state.setUser)
  const logout = useAuthStore((state) => state.logout)

  useEffect(() => {
    const initAuth = async () => {
      const tokenBefore = TokenStorage.getToken()
      console.log("Token BEFORE API call:", tokenBefore)
      if (tokenBefore) {
        const response = await UserService.fromToken()
        console.log("API response success?", response.isSuccess())
        if (!response.isSuccess()) {
          //console.warn("Removing token due to failed validation")
          TokenStorage.removeToken()
          logout()
        }
      }
      const tokenAfter = TokenStorage.getToken()
      // console.log("Token AFTER initAuth:", tokenAfter)
      setIsLoading(false)
    }
    initAuth()
  }, [logout, setUser]) // dependencies are stable

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    )
  }
  return (
    <Routes>
      {/* CATEGORY: Public routes */}
      {/* Auth routes with layout */}
      <Route element={<AuthLayout />}>
        <Route path={PublicRoutes.Login} element={<Login />} />
        <Route path={PublicRoutes.Register} element={<Register />} />
      </Route>

      {/* Generanl routes idk man fuck React */}
      <Route element={<AppLayout />}>
        <Route path={PublicRoutes.Home} element={<MainHome />} />
        <Route path={PublicRoutes.CreateBooking} element={<BookingLayout />} />
        <Route
          path={RouteService.convertToReactRouterParam(
            PublicRoutes.ProductDetail
          )}
          element={<ProductDetailPage />}
        />
      </Route>
      {/* CATEGORY: Protected routes */}
      <Route element={<AppHeader />}>
        <Route path={ProtectedRoutes.Me} element={<Profile />} />
      </Route>

      {/* ERROR ROUTES */}
      <Route path="/403" element={<AksesDitolakPage />} />

      {/* ADMIN ROUTES */}
      <Route
        element={
          <ProtectedRoute requireRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<DashboardOverview />} />
        <Route path="/admin/pengguna" element={<ManajemenPenggunaPage />} />
        <Route path="/admin/produk" element={<ManajemenProdukPage />} />
        <Route path="/admin/laporan" element={<LaporanKeuanganPage />} />
        <Route path="/admin/asisten" element={<MonitorAsistenPage />} />
      </Route>

      {/* KARYAWAN ROUTES */}
      <Route
        element={
          <ProtectedRoute requireRole="karyawan">
            <KaryawanLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/karyawan/pesanan" element={<AntrianPesananPage />} />
        <Route path="/karyawan/booking-custom" element={<BookingCustomPage />} />
        <Route path="/karyawan/ulasan" element={<UlasanProdukPage />} />
        <Route path="/karyawan/booking-tempat" element={<BookingTempatPage />} />
      </Route>

      {/* Example using Button */}
      <Route
        path="/test-button"
        element={<Button onClick={() => alert("Clicked!")}>Click me</Button>}
      />
    </Routes>
  )
}

export default App

