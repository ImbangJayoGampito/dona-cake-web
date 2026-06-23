import { useEffect, useState } from "react"
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
import { ProdukService } from "@/services/produk-service"
import { KeranjangService } from "@/services/keranjang-service"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

interface CartPageProps {
  onNext: (keranjang: Keranjang[]) => void
}

type KeranjangInteract = {
  keranjang: Keranjang
  checked: boolean
  kuantitas: number // Using kuantitas to match the model
}

export default function Step1PurchaseCart({ onNext }: CartPageProps) {
  const [keranjang, setKeranjang] = useState<KeranjangInteract[]>([])
  const [promoApplied, setPromoApplied] = useState(true)
  const [isLoading, setLoading] = useState(false)
  const [selectAll, setSelectAll] = useState(false)

  // Add this skeleton component for cart items
  const CartItemSkeleton = () => (
    <Card>
                <CardContent className="space-y-2 p-4">
                  <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-4 rounded-sm" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
            <Skeleton className="h-7 w-7 rounded-full" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-7 w-7 rounded-full" />
                    </div>
          <Skeleton className="h-4 w-20" />
                  </div>
                </CardContent>
              </Card>
  );

  // Add this skeleton component for the summary card
  const SummarySkeleton = () => (
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
        <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent className="space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
                </div>
              <Separator />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
  );

  useEffect(() => {
    setLoading(true);
    KeranjangService.getKeranjang().then((response) => {
      const itemsArray = response.data?.items || []

      setKeranjang(
        itemsArray.map((i) => ({
          keranjang: i instanceof Keranjang ? i : new Keranjang(i),
          checked: false,
          kuantitas: i.kuantitas,
        }))
      )
    }).finally(() => setLoading(false));
  }, [])

  const updateState = (id: number, newQty?: number) => {
    const current = keranjang
    const allChecked = current.length > 0 && current.every((i) => i.checked)
    setSelectAll(allChecked)
    const selected = current.find((i) => i.keranjang.id == id)
    if (!selected) return
    const payload = { ...selected.keranjang, kuantitas: newQty ?? selected.kuantitas }
    KeranjangService.updateKeranjang(id, payload).catch((e) => console.error(e))
  }
  const toggleCheck = (id: number) => {
    setKeranjang((prev) => {
      const current = prev.map((i) =>
        i.keranjang.id === id ? { ...i, checked: !i.checked } : i
      )
      // update selectAll locally; no API call needed on toggle
      const allChecked = current.length > 0 && current.every((i) => i.checked)
      setSelectAll(allChecked)
      return current
    })
  }

  const toggleAll = () => {
    const next = !selectAll
    setSelectAll(next)
    setKeranjang((prev) => {
      const updated = prev.map((i) => ({ ...i, checked: next }))

      return updated
    })
  }

  const updateQty = (id: number, delta: number) => {
    setKeranjang((prev) => {
      const updated = prev.map((i) => {
        if (i.keranjang.id === id) {
          const newKuantitas = Math.max(1, i.kuantitas + delta)
          // sync both the interact value and the underlying model
          return {
            ...i,
            kuantitas: newKuantitas,
            keranjang: new Keranjang({ ...i.keranjang, kuantitas: newKuantitas }),
          }
        }
        return i
      })

      // optimistically call API with the updated payload for this item
      const sel = updated.find((i) => i.keranjang.id === id)
      if (sel) {
        KeranjangService.updateKeranjang(id, sel.keranjang).catch((e) =>
          console.error("Failed updating cart:", e)
        )
      }

      return updated
    })
  }

  // ✅ Get checked items only
  const getCheckedItems = () => {
    const filtered = keranjang.filter((i) => i.checked)
    return filtered.map((i) => i.keranjang)
  }

  // ✅ Calculate subtotal from checked items
  const subtotal = keranjang
    .filter((i) => i.checked)
    .reduce((sum, i) => sum + (i.keranjang.produk?.harga ?? 0) * i.kuantitas, 0)

  const discount = 0
  const total = subtotal - discount

  const handleNext = () => {
    const selectedItems = getCheckedItems()

    if (selectedItems.length === 0) {
      // Optionally show toast or alert
      return
    }
    onNext(selectedItems)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <h1 className="mb-1 text-2xl font-semibold text-foreground">
          Keranjang Belanja
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          {isLoading ? (
            <Skeleton className="h-4 w-16 inline-block" />
          ) : (
            `${keranjang.length} item`
          )}
        </p>

        <div className="grid items-start gap-6 md:grid-cols-[1fr_300px]">
          <div className="space-y-3">
            {/* Select all - show skeleton when loading */}
            {isLoading ? (
              <Card>
                <CardContent className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-sm" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-4 w-24" />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Checkbox checked={selectAll} onCheckedChange={toggleAll} />
                    <Label className="cursor-pointer text-sm text-foreground">
                      Pilih Semua ({keranjang.filter((i) => i.checked).length})
                    </Label>
                  </div>
                  <button className="text-xs font-medium text-destructive hover:text-destructive/80">
                    Hapus yang Dipilih
                  </button>
                </CardContent>
              </Card>
            )}

            {/* Items - show skeletons when loading */}
            {isLoading ? (
              <>
                <CartItemSkeleton />
                <CartItemSkeleton />
                <CartItemSkeleton />
              </>
            ) : keranjang.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                  <ShoppingCart className="mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="text-muted-foreground">Keranjang Anda kosong</p>
                </CardContent>
              </Card>
            ) : (
              keranjang.map((item) => (
                <Card key={item.keranjang.id}>
                  <CardContent className="space-y-2 p-4">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={item.checked}
                        onCheckedChange={() => toggleCheck(item.keranjang.id)}
                        className="shrink-0"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground">
                          {item.keranjang.produk?.nama_produk ??
                            "Produk " + item.keranjang.id}
                        </p>

                      <p className="mt-0.5 text-sm font-bold text-primary">
                          {ProdukService.formatPrice(
                            item.keranjang.produk?.harga ?? 0
                          )}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          onClick={() => updateQty(item.keranjang.id, -1)}
                          disabled={item.kuantitas <= 1}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted disabled:opacity-50"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-4 text-center text-sm font-medium">
                          {item.kuantitas}
                        </span>
                        <button
                          onClick={() => updateQty(item.keranjang.id, 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <p className="w-20 text-right text-sm font-semibold text-foreground">
                        {ProdukService.formatPrice(
                          (item.keranjang.produk?.harga ?? 0) * item.kuantitas
                        )}
                      </p>
                    </div>

                    {item.keranjang.produk && item.keranjang.produk.stok < 3 && (
                      <div className="ml-9 flex items-center gap-1.5 rounded-md bg-amber-50 px-3 py-1.5 text-xs text-amber-600">
                        <AlertTriangle size={11} /> Stok tersisa hanya{" "}
                        {item.keranjang.produk.stok}
                      </div>
                    )}
                    {item.keranjang.produk &&
                      !item.keranjang.produk.isInStock() && (
                        <div className="ml-9 flex items-center gap-1.5 rounded-md bg-destructive/10 px-3 py-1.5 text-xs text-destructive">
                          <AlertTriangle size={11} /> Stok Habis
                        </div>
                      )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Summary - show skeleton when loading */}
          {isLoading ? (
            <SummarySkeleton />
          ) : (
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
                    <span>{ProdukService.formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Diskon</span>
                    <span className="text-destructive">
                      -{ProdukService.formatPrice(discount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Biaya Layanan</span>
                    <span>Rp 0</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-semibold text-foreground">
                  <span>Total</span>
                  <span className="text-primary">
                    {ProdukService.formatPrice(total)}
                  </span>
                </div>

                <Button
                  onClick={handleNext}
                  className="w-full font-medium"
                  disabled={getCheckedItems().length === 0}
                >
                  Lanjut ke Pembayaran <ArrowRight size={15} className="ml-1" />
                </Button>
                {getCheckedItems().length === 0 && (
                  <p className="text-center text-xs text-muted-foreground">
                    Pilih minimal 1 item untuk melanjutkan
                  </p>
                )}
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
          )}
        </div>
      </main>
    </div>
  )
}

