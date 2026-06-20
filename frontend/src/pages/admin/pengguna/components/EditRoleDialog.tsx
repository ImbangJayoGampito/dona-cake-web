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
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { AdminUser } from "@/models/admin-user.model"
import { RoleEnum } from "@/types/enums"
import { cn } from "@/lib/utils"

interface EditRoleDialogProps {
  user: AdminUser | null
  open: boolean
  onClose: () => void
  onConfirm: (userId: number, newRole: string) => Promise<void>
}

const ROLE_OPTIONS = [
  { value: RoleEnum.Admin, label: "Admin" },
  { value: RoleEnum.Karyawan, label: "Karyawan" },
  { value: RoleEnum.User, label: "Pelanggan" },
]

export default function EditRoleDialog({
  user,
  open,
  onClose,
  onConfirm,
}: EditRoleDialogProps) {
  const [selectedRole, setSelectedRole] = useState(user?.role ?? RoleEnum.User)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Sync state saat user berubah
  if (user && selectedRole !== user.role && !isSubmitting) {
    setSelectedRole(user.role)
  }

  const isChangingToAdmin = selectedRole === RoleEnum.Admin && user?.role !== RoleEnum.Admin

  async function handleConfirm() {
    if (!user) return
    setIsSubmitting(true)
    await onConfirm(user.id, selectedRole)
    setIsSubmitting(false)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Peran Pengguna</DialogTitle>
        </DialogHeader>

        {user && (
          <div className="space-y-4 py-2">
            {/* Info user */}
            <div className="flex items-center gap-3 rounded-xl bg-muted px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-primary">
                {user.getInitials()}
              </div>
              <div className="leading-tight">
                <p className="text-sm font-medium text-foreground">
                  {user.getDisplayName()}
                </p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>

            {/* Dropdown role */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Ubah Peran ke
              </label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue />
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

            {/* Warning kalau role diubah ke Admin */}
            {isChangingToAdmin && (
              <div className="flex items-start gap-2 rounded-lg bg-orange-100 px-3 py-2.5">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-orange-700" strokeWidth={1.75} />
                <p className="text-xs text-orange-800">
                  Akses Admin memberikan kontrol penuh atas sistem, termasuk
                  manajemen pengguna dan data keuangan. Pastikan tindakan ini
                  disengaja.
                </p>
              </div>
            )}
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Batal
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isSubmitting || selectedRole === user?.role}
            className={cn(isChangingToAdmin && "bg-orange-700 hover:bg-[#7C3A09]")}
          >
            {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
