import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { RoleEnum } from "@/types/enums"
import { ManajemenPenggunaService } from "@/services/manajemen-pengguna-service"
import { AdminUser } from "@/models/admin-user.model"

interface AddUserDialogProps {
  open: boolean
  onClose: () => void
  onUserAdded: (newUser: AdminUser) => void
}

interface FormState {
  username: string
  name: string
  email: string
  password?: string
  password_confirmation?: string
  role: string
}

const EMPTY_FORM: FormState = {
  username: "",
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  role: RoleEnum.User,
}

const ROLE_OPTIONS = [
  { value: RoleEnum.Admin, label: "Admin" },
  { value: RoleEnum.Karyawan, label: "Karyawan" },
  { value: RoleEnum.User, label: "Pelanggan" },
]

export default function AddUserDialog({
  open,
  onClose,
  onUserAdded,
}: AddUserDialogProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleFieldChange<K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!form.username.trim()) {
      toast.error("Username tidak boleh kosong.")
      return
    }
    if (!form.name.trim()) {
      toast.error("Nama lengkap tidak boleh kosong.")
      return
    }
    if (!form.email.trim()) {
      toast.error("Email tidak boleh kosong.")
      return
    }
    if (!form.password) {
      toast.error("Password tidak boleh kosong.")
      return
    }
    if (form.password !== form.password_confirmation) {
      toast.error("Konfirmasi password tidak cocok.")
      return
    }

    setIsSubmitting(true)
    const payload = {
      username: form.username.trim(),
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      password_confirmation: form.password_confirmation,
      role: form.role,
    }

    const res = await ManajemenPenggunaService.createUser(payload)

    if (res.isSuccess() && res.data) {
      toast.success("Pengguna baru berhasil ditambahkan.")
      onUserAdded(res.data)
      setForm(EMPTY_FORM)
      onClose()
    } else {
      toast.error(res.message ?? "Gagal menambahkan pengguna.")
    }
    setIsSubmitting(false)
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && !isSubmitting && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Tambah Pengguna Baru</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Username */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Username
            </label>
            <Input
              value={form.username}
              onChange={(e) => handleFieldChange("username", e.target.value)}
              placeholder="Masukkan username"
              required
            />
          </div>

          {/* Nama Lengkap */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Nama Lengkap
            </label>
            <Input
              value={form.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              placeholder="Nama Lengkap"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Email
            </label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              placeholder="nama@contoh.com"
              required
            />
          </div>

          {/* Role */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Peran (Role)
            </label>
            <Select
              value={form.role}
              onValueChange={(v) => handleFieldChange("role", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih peran" />
              </SelectTrigger>
              <SelectContent>
                {ROLE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Password */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Password
              </label>
              <Input
                type="password"
                value={form.password}
                onChange={(e) => handleFieldChange("password", e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Ulangi Password
              </label>
              <Input
                type="password"
                value={form.password_confirmation}
                onChange={(e) =>
                  handleFieldChange("password_confirmation", e.target.value)
                }
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <DialogFooter className="gap-2 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/80 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Tambah Pengguna"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
