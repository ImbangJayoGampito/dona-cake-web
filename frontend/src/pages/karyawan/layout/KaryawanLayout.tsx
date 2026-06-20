import { Outlet } from "react-router-dom"
import KaryawanSidebar from "./KaryawanSidebar"
import KaryawanHeader from "./KaryawanHeader"

/**
 * Shell layout untuk semua halaman karyawan.
 * Dipasang sebagai parent route di App.tsx, dibungkus
 * ProtectedRoute requireRole="karyawan" di level routing.
 * Mengikuti pola AdminLayout.tsx persis.
 */
export default function KaryawanLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#FAFAF9] dark:bg-background">
      <KaryawanSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <KaryawanHeader />
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
