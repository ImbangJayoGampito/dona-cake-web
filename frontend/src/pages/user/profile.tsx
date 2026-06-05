import { useState } from "react"
import {
  User,
  Bell,
  ShieldCheck,
  Star,
  History,
  LogOut,
  ShoppingCart,
  Pencil,
  Globe,
  Share2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const navItems = [
  { icon: User, label: "Informasi Pribadi", id: "info" },
  { icon: Bell, label: "Notifikasi", id: "notif" },
  { icon: ShieldCheck, label: "Keamanan & Password", id: "security" },
  { icon: Star, label: "Ulasan Saya", id: "reviews" },
  { icon: History, label: "Riwayat Pesanan", id: "orders" },
]

const profileFields = [
  { label: "NAMA LENGKAP", value: "Aditya Pratama" },
  { label: "NOMOR TELEPON", value: "+62 812 3456 7890" },
  { label: "EMAIL", value: "aditya.pratama@email.com" },
  { label: "TANGGAL LAHIR", value: "12 Mei 1994" },
  { label: "JENIS KELAMIN", value: "Laki-laki" },
  { label: "BERGABUNG SEJAK", value: "20 November 2022" },
]

// Dummy data for other panels
const dummyReviews = [
  {
    id: 1,
    product: "Black Forest Signature",
    rating: 5,
    comment:
      "Enak sekali, moist dan tidak terlalu manis. Pengiriman tepat waktu!",
    date: "12 Mar 2024",
  },
  {
    id: 2,
    product: "Red Velvet Cake",
    rating: 4,
    comment: "Rasanya creamy, cakenya lembut. Harga worth it.",
    date: "28 Feb 2024",
  },
  {
    id: 3,
    product: "Custom Cake - Anniversary",
    rating: 5,
    comment: "Desain sesuai request, rasa premium. Terima kasih Dona Cake!",
    date: "05 Jan 2024",
  },
]

const dummyOrders = [
  {
    id: "ORD-1001",
    date: "15 Mei 2024",
    total: "Rp 385.000",
    status: "Selesai",
    items: 2,
  },
  {
    id: "ORD-0992",
    date: "02 April 2024",
    total: "Rp 210.000",
    status: "Selesai",
    items: 1,
  },
  {
    id: "ORD-0978",
    date: "19 Maret 2024",
    total: "Rp 560.000",
    status: "Dikirim",
    items: 3,
  },
  {
    id: "ORD-0945",
    date: "14 Februari 2024",
    total: "Rp 450.000",
    status: "Selesai",
    items: 2,
  },
]

export default function DonaCakeProfile() {
  const [activeNav, setActiveNav] = useState("info")

  // Dynamic panel title & description
  const getPanelMeta = () => {
    switch (activeNav) {
      case "info":
        return {
          title: "Informasi Pribadi",
          description:
            "Kelola informasi profil Anda untuk pengalaman belanja yang lebih personal.",
        }
      case "notif":
        return {
          title: "Notifikasi",
          description: "Atur preferensi pemberitahuan Anda.",
        }
      case "security":
        return {
          title: "Keamanan & Password",
          description:
            "Perbarui kata sandi untuk menjaga akun Anda tetap aman.",
        }
      case "reviews":
        return {
          title: "Ulasan Saya",
          description:
            "Lihat semua ulasan yang telah Anda berikan untuk produk Dona Cake.",
        }
      case "orders":
        return {
          title: "Riwayat Pesanan",
          description: "Lihat dan lacak semua pesanan Anda.",
        }
      default:
        return { title: "", description: "" }
    }
  }

  const { title, description } = getPanelMeta()

  const renderPanelContent = () => {
    switch (activeNav) {
      case "info":
        return (
          <div className="grid grid-cols-1 gap-x-10 gap-y-0 md:grid-cols-2">
            {profileFields.map((field, idx) => (
              <div key={idx} className="border-b border-border py-4">
                <p className="mb-1.5 text-[10px] font-semibold tracking-widest text-muted-foreground">
                  {field.label}
                </p>
                <p className="text-sm text-foreground">{field.value}</p>
              </div>
            ))}
          </div>
        )
      case "notif":
        return (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-border py-2">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Email Promosi & Penawaran
                </p>
                <p className="text-xs text-muted-foreground">
                  Rekomendasi produk & kupon spesial
                </p>
              </div>
              <div className="relative inline-block h-5 w-10 rounded-full bg-primary transition-colors">
                <span className="absolute top-1 left-1 h-3 w-3 rounded-full bg-white"></span>
              </div>
            </div>
            <div className="flex items-center justify-between border-b border-border py-2">
              <div>
                <p className="text-sm font-medium text-foreground">
                  WhatsApp Order Update
                </p>
                <p className="text-xs text-muted-foreground">
                  Konfirmasi pesanan & pengiriman
                </p>
              </div>
              <div className="relative inline-block h-5 w-10 rounded-full bg-muted transition-colors">
                <span className="absolute top-1 left-1 h-3 w-3 rounded-full bg-white"></span>
              </div>
            </div>
            <div className="flex items-center justify-between border-b border-border py-2">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Ulasan & Interaksi
                </p>
                <p className="text-xs text-muted-foreground">
                  Balasan ulasan dan mentions
                </p>
              </div>
              <div className="relative inline-block h-5 w-10 rounded-full bg-primary transition-colors">
                <span className="absolute top-1 left-1 h-3 w-3 rounded-full bg-white"></span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-2">
              Simpan Preferensi
            </Button>
          </div>
        )
      case "security":
        return (
          <div className="max-w-md space-y-5">
            <div>
              <label className="text-xs font-semibold tracking-wide text-muted-foreground">
                Kata Sandi Saat Ini
              </label>
              <Input
                type="password"
                className="mt-1"
                placeholder="Masukkan password lama"
              />
            </div>
            <div>
              <label className="text-xs font-semibold tracking-wide text-muted-foreground">
                Kata Sandi Baru
              </label>
              <Input
                type="password"
                className="mt-1"
                placeholder="Minimal 8 karakter"
              />
            </div>
            <div>
              <label className="text-xs font-semibold tracking-wide text-muted-foreground">
                Konfirmasi Kata Sandi
              </label>
              <Input
                type="password"
                className="mt-1"
                placeholder="Ulangi password baru"
              />
            </div>
            <Button variant="default">Perbarui Password</Button>
          </div>
        )
      case "reviews":
        return (
          <div className="space-y-5">
            {dummyReviews.map((rev) => (
              <div
                key={rev.id}
                className="rounded-lg border-l-4 border-primary bg-muted/40 p-4"
              >
                <div className="flex flex-wrap items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {rev.product}
                    </p>
                    <div className="mt-1 flex gap-0.5">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < rev.rating
                                ? "fill-primary text-primary"
                                : "text-muted-foreground"
                            }
                          />
                        ))}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {rev.date}
                  </span>
                </div>
                <p className="mt-2 text-sm text-foreground/80">{rev.comment}</p>
              </div>
            ))}
            <Button variant="outline" size="sm">
              + Tulis Ulasan
            </Button>
          </div>
        )
      case "orders":
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr className="text-left">
                  <th className="pb-2 font-medium text-muted-foreground">
                    ID Pesanan
                  </th>
                  <th className="pb-2 font-medium text-muted-foreground">
                    Tanggal
                  </th>
                  <th className="pb-2 font-medium text-muted-foreground">
                    Total
                  </th>
                  <th className="pb-2 font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="pb-2 font-medium text-muted-foreground">
                    Item
                  </th>
                </tr>
              </thead>
              <tbody>
                {dummyOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border/50">
                    <td className="py-3 font-medium">{order.id}</td>
                    <td className="py-3 text-muted-foreground">{order.date}</td>
                    <td className="py-3">{order.total}</td>
                    <td className="py-3">
                      <Badge variant="secondary" className="capitalize">
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {order.items} produk
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-10 border-b border-border bg-card">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Dona Cake
          </span>
          <div className="hidden items-center gap-8 md:flex">
            {["Beranda", "Katalog", "Custom Cake", "Tentang Kami"].map(
              (item) => (
                <span
                  key={item}
                  className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item}
                </span>
              )
            )}
          </div>
          <div className="flex items-center gap-4">
            <ShoppingCart
              size={18}
              className="cursor-pointer text-muted-foreground hover:text-foreground"
            />
            <div className="h-5 w-px bg-border" />
            <div className="flex cursor-pointer items-center gap-2">
              <span className="text-sm text-muted-foreground">Halo, Sarah</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                S
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Sidebar */}
          <div className="w-full shrink-0 md:w-72">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                {/* Avatar */}
                <div className="mb-6 flex flex-col items-center text-center">
                  <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-2xl font-semibold text-primary-foreground">
                    A
                  </div>
                  <p className="mb-0.5 text-base font-semibold text-foreground">
                    Aditya Pratama
                  </p>
                  <p className="mb-3 text-xs text-muted-foreground">
                    aditya.pratama@email.com
                  </p>
                  <Badge variant="secondary" className="rounded-full">
                    PELANGGAN SETIA
                  </Badge>
                </div>

                {/* Stats */}
                <div className="mb-5 grid grid-cols-3 rounded-lg bg-muted py-4 text-center">
                  {[
                    { val: "24", label: "PESANAN" },
                    { val: "3.2jt", label: "BELANJA" },
                    { val: "12", label: "ULASAN" },
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

                {/* Nav Items */}
                <div className="flex flex-col gap-0.5">
                  {navItems.map(({ icon: Icon, label, id }) => (
                    <button
                      key={id}
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
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-destructive transition-colors hover:bg-destructive/10">
                      <LogOut size={15} />
                      Keluar
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Panel */}
          <div className="flex-1">
            <Card>
              <CardContent className="p-6 md:p-8">
                <div className="mb-2 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="mb-1 text-2xl font-semibold text-foreground">
                      {title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>
                  {activeNav === "info" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5 text-xs"
                    >
                      <Pencil size={12} />
                      EDIT
                    </Button>
                  )}
                </div>

                <Separator className="my-6" />
                {renderPanelContent()}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>


    </div>
  )
}
