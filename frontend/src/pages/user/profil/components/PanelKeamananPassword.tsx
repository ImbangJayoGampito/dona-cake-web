// =============================================================================
// Panel Keamanan & Password
// POST /auth/change-password — validasi inline + toast sukses + clear form
// =============================================================================

import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { ProfilService } from "@/services/profil-service"
import { UserService } from "@/services/user-service"
import { useNavigate } from "react-router-dom"
import { PublicRoutes } from "@/lib/routes"

interface FormState {
  current_password: string
  password: string
  password_confirmation: string
}

interface Errors {
  current_password?: string
  password?: string
  password_confirmation?: string
}

export default function PanelKeamananPassword() {
  const navigate = useNavigate()
  const [form, setForm] = useState<FormState>({
    current_password: "",
    password: "",
    password_confirmation: "",
  })
  const [errors, setErrors] = useState<Errors>({})
  const [isSaving, setIsSaving] = useState(false)

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    // Clear error on change
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validate = (): boolean => {
    const newErrors: Errors = {}
    if (!form.current_password) newErrors.current_password = "Password lama wajib diisi."
    if (!form.password) newErrors.password = "Password baru wajib diisi."
    else if (form.password.length < 8) newErrors.password = "Password minimal 8 karakter."
    if (!form.password_confirmation)
      newErrors.password_confirmation = "Konfirmasi password wajib diisi."
    else if (form.password !== form.password_confirmation)
      newErrors.password_confirmation = "Password baru tidak cocok."
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setIsSaving(true)

    const res = await ProfilService.changePassword({
      current_password: form.current_password,
      new_password: form.password,
      new_password_confirmation: form.password_confirmation,
    })

    setIsSaving(false)

    if (res.isSuccess()) {
      toast.success("Password berhasil diperbarui. Silakan login kembali.")
      setForm({ current_password: "", password: "", password_confirmation: "" })
      // Re-login sesuai sequence diagram
      setTimeout(async () => {
        await UserService.logout()
        navigate(PublicRoutes.Login)
      }, 1500)
    } else {
      // Error dari backend (misal: password lama salah) → tampil inline
      const msg = res.message ?? ""
      if (msg.toLowerCase().includes("password lama") || msg.toLowerCase().includes("current")) {
        setErrors({ current_password: msg })
      } else {
        toast.error(msg || "Gagal mengganti password.")
      }
    }
  }

  return (
    <div>
      <div className="mb-2">
        <h2 className="mb-1 text-2xl font-semibold text-foreground">
          Keamanan & Password
        </h2>
        <p className="text-sm text-muted-foreground">
          Perbarui kata sandi untuk menjaga akun Anda tetap aman.
        </p>
      </div>

      <Separator className="my-6" />

      <div className="max-w-md space-y-5">
        {/* Password lama */}
        <div>
          <label className="text-xs font-semibold tracking-wide text-muted-foreground">
            Kata Sandi Saat Ini
          </label>
          <Input
            type="password"
            className={`mt-1 ${errors.current_password ? "border-destructive focus-visible:ring-destructive" : ""}`}
            placeholder="Masukkan password lama"
            value={form.current_password}
            onChange={set("current_password")}
          />
          {errors.current_password && (
            <p className="mt-1 text-xs text-destructive">{errors.current_password}</p>
          )}
        </div>

        {/* Password baru */}
        <div>
          <label className="text-xs font-semibold tracking-wide text-muted-foreground">
            Kata Sandi Baru
          </label>
          <Input
            type="password"
            className={`mt-1 ${errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
            placeholder="Minimal 8 karakter"
            value={form.password}
            onChange={set("password")}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-destructive">{errors.password}</p>
          )}
        </div>

        {/* Konfirmasi */}
        <div>
          <label className="text-xs font-semibold tracking-wide text-muted-foreground">
            Konfirmasi Kata Sandi
          </label>
          <Input
            type="password"
            className={`mt-1 ${errors.password_confirmation ? "border-destructive focus-visible:ring-destructive" : ""}`}
            placeholder="Ulangi password baru"
            value={form.password_confirmation}
            onChange={set("password_confirmation")}
          />
          {errors.password_confirmation && (
            <p className="mt-1 text-xs text-destructive">
              {errors.password_confirmation}
            </p>
          )}
        </div>

        <Button onClick={handleSubmit} disabled={isSaving}>
          {isSaving ? "Memperbarui..." : "Perbarui Password"}
        </Button>
      </div>
    </div>
  )
}
