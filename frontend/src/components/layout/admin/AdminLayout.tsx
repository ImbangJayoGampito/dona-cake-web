import { Outlet } from "react-router-dom"
import AdminSidebar from "./AdminSidebar"
import AdminHeader from "./AdminHeader"

/**
 * Shell layout untuk semua halaman admin. Dipasang sebagai parent route di
 * App.tsx, dibungkus ProtectedRoute requireRole="admin" di level routing —
 * BUKAN di sini, supaya AdminLayout tetap reusable kalau suatu saat ada
 * kebutuhan halaman admin yang aksesnya beda (jarang, tapi memisahkan
 * concern proteksi dari concern tata letak itu lebih aman ke depannya).
 */
export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#FAFAF9] dark:bg-background">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
