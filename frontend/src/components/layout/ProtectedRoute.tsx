import { Navigate } from "react-router-dom"
import { useAuthStore } from "@/lib/state/logged-user"
import type { ReactElement } from "react"

type RequireRole = "admin" | "karyawan" | "user"

interface ProtectedRouteProps {
  children: ReactElement
  /**
   * Jika diisi, user yang login HARUS punya role ini, atau diarahkan ke
   * halaman 403. Jika tidak diisi, cukup syaratnya sudah login (role apapun).
   */
  requireRole?: RequireRole
}

/**
 * Catatan timing: komponen ini AMAN dipakai langsung di dalam <Routes> tanpa
 * logic restore-token tambahan, karena App.tsx sudah menjamin initAuth()
 * (restore user dari token tersimpan) selesai duluan lewat gate `isLoading`
 * sebelum <Routes> dirender sama sekali. Lihat App.tsx untuk detail alurnya.
 */
export default function ProtectedRoute({
  children,
  requireRole,
}: ProtectedRouteProps) {
  const user = useAuthStore((state) => state.user)


  // Belum login sama sekali → ke halaman login.
  if (!user) {
    return <Navigate to="/auth/login" replace />
  }

  // Sudah login, tapi role tidak cocok → ke 403, BUKAN ke login lagi.
  // Bedanya penting: "akses ditolak" beda makna dengan "belum login".
  if (requireRole) {
    const hasRequiredRole =
      (requireRole === "admin" && user.isAdmin()) ||
      (requireRole === "karyawan" && (user.isKaryawan() || user.isAdmin())) ||
      (requireRole === "user" && user.isUser())

    if (!hasRequiredRole) {
      return <Navigate to="/403" replace />
    }
  }

  return children
}
