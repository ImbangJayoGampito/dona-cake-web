import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Keranjang } from "@/models/keranjang.model"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ShoppingCart,
  User,
  Globe,
  Share2,
  Minus,
  Plus,
  Trash2,
  AlertTriangle,
  Shield,
  CheckCircle2,
  Mail,
  ArrowRight,
  Search,
  MoreVertical,
  Paperclip,
  Smile,
  Send,
  MapPin,
  MessageCircle,
  ChevronRight,
} from "lucide-react"

interface CartPageProps {
  onNext: () => void
}

function CartPage({ onNext }: CartPageProps) {
  const [items, setItems] = useState<Keranjang | undefined>(undefined)
  const [promo, setPromo] = useState("DONA10")
  const [promoApplied, setPromoApplied] = useState(true)
  const [selectAll, setSelectAll] = useState(true)

  const toggleCheck = (id) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i))
    )
  const toggleAll = () => {
    const next = !selectAll
    setSelectAll(next)
    if (items) {
      setItems((prev) => prev.map((i) => ({ ...i, checked: next })))
    }
  }
  const updateQty = (id, delta) =>
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i
      )
    )

  const checked = items.filter((i) => i.checked)
  const subtotal = checked.reduce((s, i) => s + i.price * i.qty, 0)
  const discount = promoApplied ? 50000 : 0
  const total = subtotal - discount

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <h1 className="mb-1 text-2xl font-semibold text-foreground">
          Keranjang Belanja
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          {items.length} item
        </p>

        <div className="grid items-start gap-6 md:grid-cols-[1fr_300px]">
          <div className="space-y-3">
            {/* Select all */}
            <Card>
              <CardContent className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <Checkbox checked={selectAll} onCheckedChange={toggleAll} />
                  <Label className="cursor-pointer text-sm text-foreground">
                    Pilih Semua
                  </Label>
                </div>
                <button className="text-xs font-medium text-destructive hover:text-destructive/80">
                  Hapus yang Dipilih
                </button>
              </CardContent>
            </Card>

            {/* Items */}
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="space-y-2 p-4">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={() => toggleCheck(item.id)}
                      className="shrink-0"
                    />
                    <div
                      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-lg text-3xl ${item.bg}`}
                    >
                      {item.emoji}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.variant}
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-primary">
                        {fmt(item.price)}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-4 text-center text-sm font-medium">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <p className="w-20 text-right text-sm font-semibold text-foreground">
                      {item.qty > 0 ? fmt(item.price * item.qty) : "Rp 0"}
                    </p>
                  </div>
                  {item.lowStock && (
                    <div className="ml-9 flex items-center gap-1.5 rounded-md bg-amber-50 px-3 py-1.5 text-xs text-amber-600">
                      <AlertTriangle size={11} /> Stok tersisa hanya 2
                    </div>
                  )}
                  {item.outOfStock && (
                    <div className="ml-9 flex items-center gap-1.5 rounded-md bg-destructive/10 px-3 py-1.5 text-xs text-destructive">
                      <AlertTriangle size={11} /> Stok Habis
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-foreground">
                Ringkasan Pesanan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Diskon</span>
                  <span className="text-destructive">-{fmt(discount)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Biaya Layanan</span>
                  <span>Rp 0</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-semibold text-foreground">
                <span>Total</span>
                <span className="text-primary">{fmt(total)}</span>
              </div>

              {/* Promo */}
              <div>
                <Label className="mb-1.5 block text-xs text-muted-foreground">
                  Kode Promo
                </Label>
                <div className="flex gap-2">
                  <div
                    className={`flex flex-1 items-center gap-2 rounded-lg border px-3 ${promoApplied ? "border-green-400 bg-green-50" : "border-input"}`}
                  >
                    <Input
                      value={promo}
                      onChange={(e) => setPromo(e.target.value)}
                      className="h-8 border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
                    />
                    {promoApplied && (
                      <CheckCircle2
                        size={14}
                        className="shrink-0 text-green-500"
                      />
                    )}
                  </div>
                  <Button
                    size="sm"
                    onClick={() => setPromoApplied(true)}
                    className="h-9 px-3"
                  >
                    Pakai
                  </Button>
                </div>
                {promoApplied && (
                  <p className="mt-1 text-[11px] text-green-600">
                    Hemat Rp 50.000 dengan promo DONA10!
                  </p>
                )}
              </div>

              <Button onClick={onNext} className="w-full font-medium">
                Lanjut ke Pembayaran <ArrowRight size={15} className="ml-1" />
              </Button>
              <div className="grid grid-cols-2 gap-2 pt-1 text-center text-[10px] text-muted-foreground">
                <div className="flex flex-col items-center gap-1">
                  <Shield size={14} />
                  <span>Pembayaran Aman</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <CheckCircle2 size={14} />
                  <span>Terjamin</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

// ─── Page 2: Pembayaran ───────────────────────────────────────────────────────

export default function PaymentPage({ onNext, onBack }) {
  const [payTab, setPayTab] = useState("kartu")

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <h1 className="mb-1 text-2xl font-semibold text-foreground">
          Keranjang Belanja
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">3 item</p>

        {/* Stepper */}
        <div className="mb-8 flex items-center gap-3">
          {[
            { n: 1, label: "Informasi", done: true },
            { n: 2, label: "Pembayaran", active: true },
            { n: 3, label: "Konfirmasi" },
          ].map((s, i) => (
            <div key={s.n} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-semibold ${s.done ? "border-primary bg-primary text-primary-foreground" : s.active ? "border-primary bg-background text-primary" : "border-border bg-background text-muted-foreground"}`}
                >
                  {s.done ? <CheckCircle2 size={14} /> : s.n}
                </div>
                <span
                  className={`text-sm ${s.done || s.active ? "font-medium text-foreground" : "text-muted-foreground"}`}
                >
                  {s.label}
                </span>
              </div>
              {i < 2 && <div className="h-px w-12 bg-border" />}
            </div>
          ))}
        </div>

        <div className="grid items-start gap-6 md:grid-cols-[1fr_300px]">
          <Card className="shadow-sm">
            <CardContent className="space-y-5 pt-6">
              <h2 className="text-lg font-semibold text-foreground">
                Metode Pembayaran
              </h2>
              <Tabs value={payTab} onValueChange={setPayTab}>
                <TabsList className="w-full rounded-lg bg-muted p-1">
                  <TabsTrigger
                    value="kartu"
                    className="flex-1 text-xs data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm"
                  >
                    Kartu Kredit/Debit
                  </TabsTrigger>
                  <TabsTrigger
                    value="transfer"
                    className="flex-1 text-xs data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm"
                  >
                    Transfer Bank
                  </TabsTrigger>
                  <TabsTrigger
                    value="ewallet"
                    className="flex-1 text-xs data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm"
                  >
                    E-Wallet
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="kartu" className="mt-4 space-y-4">
                  <div className="flex items-center justify-between rounded-lg border border-primary/10 bg-primary/5 px-4 py-2.5">
                    <div className="flex items-center gap-2 text-xs font-medium text-primary">
                      <Shield size={13} /> Pembayaran aman via Stripe
                    </div>
                    <div className="flex gap-1">
                      <div className="flex h-5 w-8 items-center justify-center rounded bg-blue-600 text-[8px] font-bold text-white">
                        VISA
                      </div>
                      <div className="flex h-5 w-8 items-center justify-center rounded bg-red-500 text-[8px] font-bold text-white">
                        MC
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="mb-2 block text-xs font-semibold tracking-widest text-muted-foreground">
                      DETAIL KARTU
                    </Label>
                    <div className="relative">
                      <Input
                        placeholder="1234 5678 1234 5678"
                        className="pl-9"
                      />
                      <div className="absolute top-1/2 left-3 h-3 w-4 -translate-y-1/2 rounded-sm bg-muted-foreground/40 opacity-50" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="mb-2 block text-xs font-semibold tracking-widest text-muted-foreground">
                        MASA BERLAKU
                      </Label>
                      <Input placeholder="MM / YY" />
                    </div>
                    <div>
                      <Label className="mb-2 block text-xs font-semibold tracking-widest text-muted-foreground">
                        CVC
                      </Label>
                      <Input placeholder="123" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-4 py-3 text-xs text-foreground/70">
                    <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-[10px] font-bold text-primary">
                        i
                      </span>
                    </div>
                    Kamu akan membayar{" "}
                    <span className="mx-1 font-semibold text-primary">
                      Rp 825.000
                    </span>{" "}
                    menggunakan Kartu Kredit
                  </div>
                </TabsContent>
                <TabsContent value="transfer" className="mt-4">
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    Pilih bank tujuan transfer di sini.
                  </p>
                </TabsContent>
                <TabsContent value="ewallet" className="mt-4">
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    Pilih e-wallet Anda di sini.
                  </p>
                </TabsContent>
              </Tabs>

              <Button
                onClick={onBack}
                variant="outline"
                className="gap-2 border-primary/20 text-primary hover:bg-primary/10"
              >
                Kembali <ArrowRight size={14} />
              </Button>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-foreground">
                Ringkasan Pesanan
              </CardTitle>
              <p className="text-[10px] font-semibold tracking-widest text-muted-foreground">
                ORDER #12345
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Dark Chocolate Noir", price: 450000, emoji: "🍫" },
                { name: "Strawberry Rose Cream", price: 405000, emoji: "🍓" },
              ].map((p) => (
                <div key={p.name} className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted text-2xl">
                    {p.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-foreground">
                      {p.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">Qty: 1</p>
                  </div>
                  <span className="text-xs font-semibold text-foreground">
                    {fmt(p.price / 1000)}k
                  </span>
                </div>
              ))}
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>Rp 855.000</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Diskon Promo</span>
                  <span className="text-destructive">-Rp 50.000</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Biaya Layanan</span>
                  <span>Rp 5.000</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-bold text-foreground">
                <span>Total</span>
                <span className="text-primary">Rp 825.000</span>
              </div>
              <Button onClick={onNext} className="w-full font-medium">
                Konfirmasi & Bayar <ArrowRight size={15} className="ml-1" />
              </Button>
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
                <Shield size={11} /> Pembayaran Aman & Terenkripsi
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

// ─── Page 3: Pesanan Berhasil ─────────────────────────────────────────────────

function SuccessPage({ onHome, onTrack }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-lg shadow-sm">
          <CardContent className="flex flex-col items-center space-y-6 pt-10 pb-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 size={30} className="text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                Pesanan Berhasil! 🎉
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Terima kasih! Pesananmu sedang kami proses.
              </p>
            </div>
            <div className="grid w-full grid-cols-2 gap-4 rounded-xl border border-border bg-muted/30 p-5 text-left">
              {[
                ["ID PESANAN", "#DC-20250528-0042"],
                ["METODE PEMBAYARAN", "Kartu Kredit"],
                ["TOTAL PEMBAYARAN", "Rp 825.000"],
                ["ESTIMASI SELESAI", "30 Mei 2025"],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-[10px] font-semibold tracking-widest text-muted-foreground">
                    {k}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-foreground">
                    {v}
                  </p>
                </div>
              ))}
            </div>
            <div className="w-full">
              <OrderProgressBar current={2} />
            </div>
            <div className="flex w-full items-center gap-2 rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-xs text-muted-foreground">
              <Mail size={13} /> Konfirmasi pesanan telah dikirim ke{" "}
              <span className="ml-1 font-semibold">email@kamu.com</span>
            </div>
            <div className="flex w-full gap-3">
              <Button onClick={onTrack} className="flex-1">
                Lacak Pesananku <ArrowRight size={14} className="ml-1" />
              </Button>
              <Button
                onClick={onHome}
                variant="outline"
                className="flex-1 border-border text-foreground"
              >
                Kembali ke Beranda
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

// ─── Page 4: Pesanan Saya ─────────────────────────────────────────────────────

const ORDERS = [
  {
    id: "ORD-7729110",
    date: "24 Okt 2024",
    product: "Custom Tiered Wedding Cake - Soft...",
    price: 1450000,
    status: "Diproses",
    statusColor: "text-primary bg-primary/10",
    emoji: "🎂",
  },
  {
    id: "ORD-7728550",
    date: "12 Okt 2024",
    product: "Signature Cupcake Box - 12pcs",
    price: 320000,
    status: "Dikirim",
    statusColor: "text-blue-600 bg-blue-50",
    emoji: "🧁",
  },
  {
    id: "ORD-7728102",
    date: "05 Okt 2024",
    product: "Belgian Chocolate Truffle Cake",
    price: 480000,
    status: "Selesai",
    statusColor: "text-muted-foreground bg-muted",
    emoji: "🍫",
  },
]

function OrdersPage({ onCancel }) {
  const [tab, setTab] = useState("semua")
  const [selected, setSelected] = useState(ORDERS[0])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Pesanan Saya
            </h1>
            <p className="text-sm text-muted-foreground">
              Pantau status pengiriman dan riwayat pesanan Anda.
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search
              size={14}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Cari nomor pesanan..."
              className="pl-9 text-sm"
            />
          </div>
        </div>

        <div className="grid items-start gap-4 md:grid-cols-[320px_1fr]">
          {/* Left: tab + list */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {["Semua", "Aktif", "Selesai", "Dibatalkan"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t.toLowerCase())}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${tab === t.toLowerCase() ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary/50"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            {ORDERS.map((o) => (
              <Card
                key={o.id}
                onClick={() => setSelected(o)}
                className={`cursor-pointer border transition-all hover:shadow-md ${selected.id === o.id ? "border-primary/40 shadow-md" : "border-border"}`}
              >
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-muted text-3xl">
                    {o.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">
                        {o.date}
                      </span>
                      <Badge
                        className={`px-1.5 py-0.5 text-[9px] font-semibold ${o.statusColor}`}
                      >
                        {o.status}
                      </Badge>
                    </div>
                    <p className="text-xs font-semibold text-muted-foreground">
                      {o.id}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-foreground">
                      {o.product}
                    </p>
                    <p className="mt-1 text-sm font-bold text-primary">
                      {fmt(o.price)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right: detail */}
          {selected && (
            <Card className="shadow-sm">
              <CardContent className="space-y-5 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="mb-1 text-[10px] font-semibold tracking-widest text-muted-foreground">
                      Nomor Pesanan
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      {selected.id}
                    </p>
                  </div>
                  <Badge className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
                    ● SEDANG DIPROSES
                  </Badge>
                </div>

                <OrderProgressBar current={2} />

                <div className="grid grid-cols-2 gap-4 rounded-xl bg-muted/30 p-4">
                  <div>
                    <p className="mb-1 text-[10px] font-semibold tracking-widest text-muted-foreground">
                      Tanggal Pesan
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      24 Okt, 14:20
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-semibold tracking-widest text-muted-foreground">
                      Estimasi Tiba
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      26 Okt, 10:00
                    </p>
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-[10px] font-semibold tracking-widest text-muted-foreground">
                    DAFTAR PRODUK
                  </p>
                  <div className="flex items-center gap-4 rounded-xl bg-muted/30 p-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted text-3xl">
                      {selected.emoji}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">
                        Custom Tiered Wedding Cake
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Varian: Vanila Bloom | Ukuran: 15cm + 20cm + 25cm
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Jumlah: 1 unit
                      </p>
                    </div>
                    <span className="text-sm font-bold text-foreground">
                      {fmt(selected.price)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 gap-2 text-sm">
                    <MessageCircle size={15} /> Hubungi via WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 gap-2 border-border text-sm text-foreground"
                    onClick={onCancel}
                  >
                    <MapPin size={15} /> Lacak Pengiriman
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

// ─── Page 5: Cancel Dialog ────────────────────────────────────────────────────

function CancelDialog({ open, onClose }) {
  const [reason, setReason] = useState("")
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-2xl">
        <div className="flex flex-col items-center space-y-4 pt-2 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <AlertTriangle size={24} className="text-primary" />
          </div>
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-xl font-semibold text-foreground">
              Batalkan Pesanan?
            </DialogTitle>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Yakin ingin membatalkan pesanan #DC-20250528-0042? Tindakan ini
              tidak dapat diurungkan.
            </p>
          </DialogHeader>
          <div className="w-full space-y-2 text-left">
            <Label className="text-sm font-medium text-foreground">
              Alasan Pembatalan
            </Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger className="w-full text-sm text-muted-foreground">
                <SelectValue placeholder="Pilih alasan..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salah-pesan">
                  Salah memesan produk
                </SelectItem>
                <SelectItem value="berubah-pikiran">Berubah pikiran</SelectItem>
                <SelectItem value="harga">
                  Menemukan harga lebih baik
                </SelectItem>
                <SelectItem value="lainnya">Alasan lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-full gap-3 pt-1">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-border font-medium text-foreground"
            >
              Tidak, Kembali
            </Button>
            <Button className="text-destructive-foreground flex-1 bg-destructive font-medium hover:bg-destructive/90">
              Ya, Batalkan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ─── Page 6: Dona AI Chat ─────────────────────────────────────────────────────
