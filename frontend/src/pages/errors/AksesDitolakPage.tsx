import { Link } from "react-router-dom"
import { ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * Full page error state — "Akses Ditolak". Dipakai saat ProtectedRoute
 * mendeteksi user sudah login tapi role-nya tidak sesuai syarat halaman.
 *
 * Mengikuti pola full page error yang sudah disepakati di tahap desain:
 * ilustrasi/icon center, title, body singkat, dua tombol aksi.
 */
export default function AksesDitolakPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
        <ShieldAlert className="h-9 w-9 text-primary" strokeWidth={1.75} />
      </div>

      <h1 className="text-2xl font-semibold text-foreground">Akses Ditolak</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Kamu tidak memiliki izin untuk mengakses halaman ini. Pastikan kamu
        sudah masuk dengan akun yang benar.
      </p>

      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link to="/auth/login">Masuk ke Akun</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/">Kembali ke Beranda</Link>
        </Button>
      </div>
    </div>
  )
}
