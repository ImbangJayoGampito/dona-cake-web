// =============================================================================
// Profile Page — halaman profil pelanggan
// Route: /auth/me  (sesuai App.tsx: ProtectedRoutes.Me)
// Layout: AppHeader (tanpa footer, sesuai App.tsx route wrapping)
// =============================================================================

import { useEffect, useState } from "react"
import { User, Bell, ShieldCheck, Star, History, LogOut } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuthStore } from "@/lib/state/logged-user"
import { UserService } from "@/services/user-service"
import { ProfilService } from "@/services/profil-service"
import type { PelangganProfileData } from "@/services/profil-service"
import { useNavigate } from "react-router-dom"
import { PublicRoutes, ProtectedRoutes } from "@/lib/routes"
import api from "@/lib/api/config"

// Panel components
import PanelInformasiPribadi from "./components/PanelInformasiPribadi"
import PanelNotifikasi from "./components/PanelNotifikasi"
import PanelKeamananPassword from "./components/PanelKeamananPassword"
import PanelUlasanSaya from "./components/PanelUlasanSaya"
import PanelRiwayatPesanan from "./components/PanelRiwayatPesanan"

type NavId = "info" | "notif" | "security" | "reviews" | "orders"

const NAV_ITEMS: { icon: typeof User; label: string; id: NavId }[] = [
  { icon: User, label: "Informasi Pribadi", id: "info" },
  { icon: Bell, label: "Notifikasi", id: "notif" },
  { icon: ShieldCheck, label: "Keamanan & Password", id: "security" },
  { icon: Star, label: "Ulasan Saya", id: "reviews" },
  { icon: History, label: "Riwayat Pesanan", id: "orders" },
]

function getInitial(name: string): string {
  return name.trim()[0]?.toUpperCase() ?? "?"
}

function formatRupiah(val: number): string {
  if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}jt`
  if (val >= 1_000) return `${(val / 1_000).toFixed(0)}rb`
  return String(val)
}

export default function Profile() {
  const navigate = useNavigate()
  const authUser = useAuthStore((s) => s.user)

  const [activeNav, setActiveNav] = useState<NavId>("info")
  const [profil, setProfil] = useState<PelangganProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Stats (dari API jika tersedia, fallback ke 0)
  const [stats, setStats] = useState({ pesanan: 0, belanja: 0, ulasan: 0 })

  useEffect(() => {
    async function load() {
      setLoading(true)
      setErrorMsg(null)
      const res = await ProfilService.getProfil()
      if (res.isSuccess() && res.data) {
        setProfil(res.data)
        
        // Fetch orders and reviews to compute stats
        try {
          const [ordersRes, reviewsRes] = await Promise.all([
            api.get(ProtectedRoutes.Orders),
            api.get(PublicRoutes.Ulasan, {
              params: { pelanggan_id: res.data.pelanggan.id },
            }),
          ])
          
          const orders = (ordersRes.data?.data ?? ordersRes.data ?? []) as any[]
          const reviews = (reviewsRes.data?.data ?? reviewsRes.data ?? []) as any[]
          
          const totalBelanja = orders
            .filter((o) => ["selesai", "dibayar", "diproses"].includes(o.status_pesanan))
            .reduce((sum, o) => sum + Number(o.total_harga || 0), 0)
            
          setStats({
            pesanan: orders.length,
            belanja: totalBelanja,
            ulasan: reviews.length,
          })
        } catch (err) {
          console.error("Error loading profile stats:", err)
        }
      } else {
        setErrorMsg(res.message || "Gagal memuat profil.")
      }
      setLoading(false)
    }
    load()
  }, [])

  const handleLogout = async () => {
    await UserService.logout()
    navigate(PublicRoutes.Login)
  }

  // Nama & inisial dari data terkini (profil API atau fallback ke Zustand)
  const displayName =
    profil?.user.getDisplayName() ?? authUser?.getDisplayName() ?? "Pengguna"
  const displayEmail =
    profil?.user.email ?? authUser?.email ?? ""

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
      <div className="flex flex-col gap-6 md:flex-row">
        {/* ---- Sidebar ---- */}
        <div className="w-full shrink-0 md:w-72">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              {/* Avatar + nama */}
              <div className="mb-6 flex flex-col items-center text-center">
                {loading ? (
                  <>
                    <Skeleton className="mb-3 h-16 w-16 rounded-xl" />
                    <Skeleton className="mb-1 h-4 w-32" />
                    <Skeleton className="mb-3 h-3 w-40" />
                    <Skeleton className="h-5 w-24 rounded-full" />
                  </>
                ) : (
                  <>
                    <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-2xl font-semibold text-primary-foreground">
                      {getInitial(displayName)}
                    </div>
                    <p className="mb-0.5 text-base font-semibold text-foreground">
                      {displayName}
                    </p>
                    <p className="mb-3 text-xs text-muted-foreground">
                      {displayEmail}
                    </p>
                    <Badge variant="secondary" className="rounded-full text-[10px]">
                      PELANGGAN SETIA
                    </Badge>
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="mb-5 grid grid-cols-3 rounded-lg bg-muted py-4 text-center">
                {[
                  { val: stats.pesanan, label: "PESANAN" },
                  { val: formatRupiah(stats.belanja), label: "BELANJA" },
                  { val: stats.ulasan, label: "ULASAN" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-base font-semibold text-foreground">
                      {s.val}
                    </p>
                    <p className="text-[10px] tracking-wide text-muted-foreground">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              <Separator className="mb-4" />

              {/* Navigasi */}
              <div className="flex flex-col gap-0.5">
                {NAV_ITEMS.map(({ icon: Icon, label, id }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveNav(id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      activeNav === id
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon size={15} />
                    {label}
                  </button>
                ))}

                <div className="mt-2">
                  <Separator className="mb-2" />
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <LogOut size={15} />
                    Keluar
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ---- Panel utama ---- */}
        <div className="flex-1">
          <Card>
            <CardContent className="p-6 md:p-8">
              {loading && activeNav === "info" ? (
                <div className="space-y-4">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-4 w-80" />
                  <Separator className="my-6" />
                  <div className="grid grid-cols-2 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={i} className="h-14 rounded-lg" />
                    ))}
                  </div>
                </div>
              ) : errorMsg ? (
                <div className="py-12 text-center">
                  <p className="text-sm font-semibold text-destructive">{errorMsg}</p>
                  <Button
                    onClick={() => window.location.reload()}
                    className="mt-4"
                    variant="outline"
                    size="sm"
                  >
                    Muat Ulang Halaman
                  </Button>
                </div>
              ) : (
                <>
                  {activeNav === "info" && profil && (
                    <PanelInformasiPribadi
                      profil={profil}
                      onUpdate={(updated) => setProfil(updated)}
                    />
                  )}
                  {activeNav === "notif" && <PanelNotifikasi />}
                  {activeNav === "security" && <PanelKeamananPassword />}
                  {activeNav === "reviews" && profil && (
                    <PanelUlasanSaya pelangganId={profil.pelanggan.id} />
                  )}
                  {activeNav === "orders" && <PanelRiwayatPesanan />}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
