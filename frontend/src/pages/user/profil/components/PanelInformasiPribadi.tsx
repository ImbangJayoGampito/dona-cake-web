// =============================================================================
// Panel Informasi Pribadi — view mode + inline edit mode
// =============================================================================

import { useState } from "react"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { ProfilService } from "@/services/profil-service"
import type { PelangganProfileData, UpdateProfilPayload } from "@/services/profil-service"

interface Props {
  profil: PelangganProfileData
  onUpdate: (updated: PelangganProfileData) => void
}

interface EditForm {
  name: string
  email: string
  no_telepon: string
  alamat: string
}

function formatBergabung(date: Date): string {
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default function PanelInformasiPribadi({ profil, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [form, setForm] = useState<EditForm>({
    name: profil.user.name,
    email: profil.user.email,
    no_telepon: profil.pelanggan.no_telepon ?? "",
    alamat: profil.pelanggan.alamat ?? "",
  })

  const handleEdit = () => {
    // Reset form ke data terkini saat buka edit
    setForm({
      name: profil.user.name,
      email: profil.user.email,
      no_telepon: profil.pelanggan.no_telepon ?? "",
      alamat: profil.pelanggan.alamat ?? "",
    })
    setIsEditing(true)
  }

  const handleCancel = () => setIsEditing(false)

  const handleSave = async () => {
    setIsSaving(true)
    const payload: UpdateProfilPayload = {
      name: form.name,
      email: form.email,
      no_telepon: form.no_telepon || null,
      alamat: form.alamat || null,
    }
    const res = await ProfilService.updateProfil(payload)
    setIsSaving(false)

    if (res.isSuccess() && res.data) {
      onUpdate(res.data)
      setIsEditing(false)
      toast.success("Profil berhasil diperbarui")
    } else {
      toast.error(res.message ?? "Gagal menyimpan perubahan.")
    }
  }

  // ---- View mode fields ----
  const viewFields = [
    { label: "NAMA LENGKAP", value: profil.user.name || "-" },
    { label: "NOMOR TELEPON", value: profil.pelanggan.getPhoneNumber() },
    { label: "EMAIL", value: profil.user.email || "-" },
    { label: "ALAMAT LENGKAP", value: profil.pelanggan.alamat || "-" },
    { label: "BERGABUNG SEJAK", value: formatBergabung(profil.user.created_at) },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-2 flex items-start justify-between">
        <div>
          <h2 className="mb-1 text-2xl font-semibold text-foreground">
            Informasi Pribadi
          </h2>
          <p className="text-sm text-muted-foreground">
            Kelola informasi profil Anda untuk pengalaman belanja yang lebih personal.
          </p>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs"
            onClick={handleEdit}
          >
            <Pencil size={12} />
            EDIT
          </Button>
        )}
      </div>

      <Separator className="my-6" />

      {/* View mode */}
      {!isEditing && (
        <div className="grid grid-cols-1 gap-x-10 gap-y-0 md:grid-cols-2">
          {viewFields.map((field) => (
            <div key={field.label} className="border-b border-border py-4">
              <p className="mb-1.5 text-[10px] font-semibold tracking-widest text-muted-foreground">
                {field.label}
              </p>
              <p className="text-sm text-foreground">{field.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Edit mode */}
      {isEditing && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="text-[10px] font-semibold tracking-widest text-muted-foreground">
                NAMA LENGKAP
              </label>
              <Input
                className="mt-1.5"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Nama lengkap"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold tracking-widest text-muted-foreground">
                NOMOR TELEPON
              </label>
              <Input
                className="mt-1.5"
                value={form.no_telepon}
                onChange={(e) => setForm((f) => ({ ...f, no_telepon: e.target.value }))}
                placeholder="+62 ..."
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold tracking-widest text-muted-foreground">
                EMAIL
              </label>
              <Input
                className="mt-1.5"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="email@contoh.com"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-[10px] font-semibold tracking-widest text-muted-foreground">
                ALAMAT LENGKAP
              </label>
              <textarea
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                rows={3}
                value={form.alamat}
                onChange={(e) => setForm((f) => ({ ...f, alamat: e.target.value }))}
                placeholder="Alamat lengkap"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
            <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
              Batal
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
