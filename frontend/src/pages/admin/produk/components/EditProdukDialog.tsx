import { useState, useEffect, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { X, Upload, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Produk } from "@/models/produk.model"
import { Gambar } from "@/models/gambar.model"
import Kategori from "@/models/kategori.model"
import { ManajemenProdukService } from "@/services/manajemen-produk-service"
import { cn } from "@/lib/utils"

interface EditProdukDialogProps {
  produk: Produk | null
  open: boolean
  kategoris: Kategori[]
  onClose: () => void
  onSaved: (updated: Produk) => void
}

interface FormState {
  nama_produk: string
  harga: string
  stok: string
  deskripsi: string
  kategori_id: string
  is_active: boolean
}

const EMPTY_FORM: FormState = {
  nama_produk: "",
  harga: "",
  stok: "",
  deskripsi: "",
  kategori_id: "",
  is_active: true,
}

export default function EditProdukDialog({
  produk,
  open,
  kategoris,
  onClose,
  onSaved,
}: EditProdukDialogProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [gambars, setGambars] = useState<Gambar[]>([])
  const [isLoadingDetail, setIsLoadingDetail] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isCreateMode = !produk || produk.id === 0

  // Load detail produk (termasuk semua gambars) saat dialog dibuka
  useEffect(() => {
    if (!open || !produk) return

    if (produk.id === 0) {
      setForm(EMPTY_FORM)
      setGambars([])
      return
    }

    setForm({
      nama_produk: produk.nama_produk,
      harga: produk.harga === 0 ? "" : produk.harga.toString(),
      stok: produk.stok === 0 ? "" : produk.stok.toString(),
      deskripsi: produk.deskripsi ?? "",
      kategori_id:
        typeof produk.kategori === "object" && produk.kategori !== null
          ? (produk.kategori as any).id?.toString() ?? ""
          : "",
      is_active: produk.isInStock(),
    })

    async function loadDetail() {
      if (!produk || produk.id === 0) return
      setIsLoadingDetail(true)
      const res = await ManajemenProdukService.getProdukDetail(produk.id)
      if (res.isSuccess() && res.data) {
        setGambars(res.data.gambars ?? [])
      }
      setIsLoadingDetail(false)
    }
    loadDetail()
  }, [open, produk])

  function handleFieldChange<K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  // Upload gambar baru
  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !produk) return

    // Validasi ukuran (2MB) dan tipe
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 2MB.")
      return
    }
    if (!["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.type)) {
      toast.error("Format file harus JPG, PNG, atau WebP.")
      return
    }

    setUploadingIdx(gambars.length) // indikator loading slot baru
    const res = await ManajemenProdukService.uploadGambar({
      file,
      gambarable_type: "App\\Models\\Produk",
      gambarable_id: produk.id,
    })

    if (res.isSuccess() && res.data) {
      setGambars((prev) => [...prev, res.data!])
      toast.success("Foto berhasil diunggah.")
    } else {
      toast.error(res.message ?? "Gagal mengunggah foto.")
    }

    setUploadingIdx(null)
    // Reset input supaya file yang sama bisa dipilih ulang
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  // Hapus gambar
  async function handleDeleteGambar(gambar: Gambar) {
    const res = await ManajemenProdukService.deleteGambar(gambar.id)
    if (res.isSuccess()) {
      setGambars((prev) => prev.filter((g) => g.id !== gambar.id))
      toast.success("Foto berhasil dihapus.")
    } else {
      toast.error(res.message ?? "Gagal menghapus foto.")
    }
  }

  async function handleSubmit() {
    if (!produk) return

    const harga = parseFloat(form.harga)
    const stok = parseInt(form.stok, 10)

    if (!form.nama_produk.trim()) {
      toast.error("Nama produk tidak boleh kosong.")
      return
    }
    if (isNaN(harga) || harga < 0) {
      toast.error("Harga tidak valid.")
      return
    }
    if (isNaN(stok) || stok < 0) {
      toast.error("Stok tidak valid.")
      return
    }

    setIsSubmitting(true)
    const payload = {
      nama_produk: form.nama_produk.trim(),
      harga,
      stok,
      deskripsi: form.deskripsi.trim() || undefined,
      kategori_id: form.kategori_id ? parseInt(form.kategori_id, 10) : null,
    }

    const res = isCreateMode
      ? await ManajemenProdukService.createProduk(payload)
      : await ManajemenProdukService.updateProduk(produk.id, payload)

    if (res.isSuccess() && res.data) {
      toast.success(isCreateMode ? "Produk berhasil ditambahkan." : "Produk berhasil diperbarui.")
      onSaved(res.data)
      onClose()
    } else {
      toast.error(res.message ?? "Gagal menyimpan perubahan.")
    }

    setIsSubmitting(false)
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && !isSubmitting && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isCreateMode
              ? "Tambah Produk Baru"
              : `Edit Produk — ${produk?.nama_produk ?? ""}`}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-6 py-2 md:grid-cols-2">
          {/* ── KIRI: Foto produk ── */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Foto Produk
            </p>

            {isCreateMode ? (
              <div className="flex h-40 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted p-4 text-center">
                <p className="text-xs font-medium text-foreground mb-1">
                  Upload Foto Dinonaktifkan
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Foto produk dapat ditambahkan setelah produk berhasil dibuat.
                </p>
              </div>
            ) : isLoadingDetail ? (
              <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border bg-muted">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {gambars.map((g) => (
                  <div
                    key={g.id}
                    className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted"
                  >
                    <img
                      src={g.getFullUrl()}
                      alt={g.getAltText()}
                      className="h-full w-full object-cover"
                    />
                    <button
                      onClick={() => handleDeleteGambar(g)}
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-white opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <X className="h-3 w-3" strokeWidth={2.5} />
                    </button>
                  </div>
                ))}

                {/* Slot upload baru (maks 5 foto) */}
                {gambars.length < 5 && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingIdx !== null}
                    className={cn(
                      "flex aspect-square flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted transition-colors hover:border-primary hover:bg-secondary",
                      uploadingIdx !== null && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {uploadingIdx !== null ? (
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    ) : (
                      <Upload className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                )}
              </div>
            )}

            {!isCreateMode && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/webp"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <p className="text-[11px] text-muted-foreground">
                  Format .jpg .png .webp (Maks 2MB). Maks 5 foto.
                </p>
              </>
            )}
          </div>

          {/* ── KANAN: Form fields ── */}
          <div className="space-y-4">
            {/* Nama Produk */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Nama Produk
              </label>
              <Input
                value={form.nama_produk}
                onChange={(e) => handleFieldChange("nama_produk", e.target.value)}
                placeholder="Nama produk"
              />
            </div>

            {/* Kategori + Harga */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  Kategori
                </label>
                <Select
                  value={form.kategori_id}
                  onValueChange={(v) => handleFieldChange("kategori_id", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {kategoris.map((kat) => (
                      <SelectItem key={kat.id} value={kat.id.toString()}>
                        {kat.nama_kategori}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  Harga (Rp)
                </label>
                <Input
                  type="number"
                  min={0}
                  value={form.harga}
                  onChange={(e) => handleFieldChange("harga", e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>

            {/* Stok */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Stok
              </label>
              <Input
                type="number"
                min={0}
                value={form.stok}
                onChange={(e) => handleFieldChange("stok", e.target.value)}
                placeholder="0"
              />
            </div>

            {/* Deskripsi */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Deskripsi
              </label>
              <Textarea
                value={form.deskripsi}
                onChange={(e) => handleFieldChange("deskripsi", e.target.value)}
                placeholder="Deskripsi produk..."
                className="min-h-[90px] resize-none"
              />
            </div>

            {/* Status Penjualan */}
            <div className="flex items-center justify-between rounded-xl border border-border bg-muted px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Status Penjualan
                </p>
                <p className="text-xs text-muted-foreground">
                  Tampilkan produk di katalog pelanggan
                </p>
              </div>
              <Switch
                checked={form.is_active}
                onCheckedChange={(v) => handleFieldChange("is_active", v)}
              />
            </div>

            {/* Catatan: tidak ada varian karena backend tidak mendukungnya */}
          </div>
        </div>

        <DialogFooter className="gap-2 border-t border-border pt-4">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Batal
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/80"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              "Simpan Perubahan"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
