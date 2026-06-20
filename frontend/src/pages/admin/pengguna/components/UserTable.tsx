import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Eye, Pencil } from "lucide-react"
import { cn } from "@/lib/utils"
import { AdminUser } from "@/models/admin-user.model"
import { RoleEnum } from "@/types/enums"
import type { PaginationMeta } from "@/types/pagination.types"

interface UserTableProps {
  users: AdminUser[]
  pagination: PaginationMeta | null
  selectedIds: number[]
  onToggleSelect: (id: number) => void
  onToggleSelectAll: (allIds: number[]) => void
  onViewUser: (user: AdminUser) => void
  onEditRole: (user: AdminUser) => void
  currentPage: number
  onPageChange: (page: number) => void
}

const ROLE_BADGE: Record<string, string> = {
  [RoleEnum.Admin]: "bg-[#FDF0F0] text-[#D94F4F] hover:bg-[#FDF0F0]",
  [RoleEnum.Karyawan]: "bg-[#F5EAE0] text-[#C9956C] hover:bg-[#F5EAE0]",
  [RoleEnum.User]: "bg-[#F7F5F3] text-[#6B6560] hover:bg-[#F7F5F3]",
}

const ROLE_LABEL: Record<string, string> = {
  [RoleEnum.Admin]: "Admin",
  [RoleEnum.Karyawan]: "Karyawan",
  [RoleEnum.User]: "Pelanggan",
}

function formatTanggal(dateStr: string): string {
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return "-"
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export default function UserTable({
  users,
  pagination,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onViewUser,
  onEditRole,
  currentPage,
  onPageChange,
}: UserTableProps) {
  const allIds = users.map((u) => u.id)
  const allSelected = allIds.length > 0 && allIds.every((id) => selectedIds.includes(id))
  const someSelected = allIds.some((id) => selectedIds.includes(id)) && !allSelected

  return (
    <div className="rounded-xl border border-border bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F7F5F3]">
            <TableHead className="w-10 px-4">
              <Checkbox
                checked={allSelected}
                onCheckedChange={() =>
                  allSelected
                    ? onToggleSelectAll([])
                    : onToggleSelectAll(allIds)
                }
                aria-label="Pilih semua"
                data-state={someSelected ? "indeterminate" : undefined}
              />
            </TableHead>
            <TableHead>Pengguna</TableHead>
            <TableHead>Peran</TableHead>
            <TableHead>Verifikasi Email</TableHead>
            <TableHead>Tgl Terdaftar</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="py-16 text-center text-sm text-muted-foreground">
                Tidak ada pengguna yang ditemukan.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => {
              const isSelected = selectedIds.includes(user.id)
              return (
                <TableRow
                  key={user.id}
                  className={cn(isSelected && "bg-[#FDFAF8]")}
                >
                  <TableCell className="px-4">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => onToggleSelect(user.id)}
                      aria-label={`Pilih ${user.getDisplayName()}`}
                    />
                  </TableCell>

                  {/* Avatar + Nama + Email */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F5EAE0] text-sm font-semibold text-[#C9956C]">
                        {user.getInitials()}
                      </div>
                      <div className="leading-tight">
                        <p className="text-sm font-medium text-foreground">
                          {user.getDisplayName()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Peran */}
                  <TableCell>
                    <Badge
                      className={cn(
                        "border-0 font-medium",
                        ROLE_BADGE[user.role] ?? "bg-muted text-muted-foreground"
                      )}
                    >
                      {ROLE_LABEL[user.role] ?? user.role}
                    </Badge>
                  </TableCell>

                  {/* Verifikasi (pengganti Status yang tidak ada di backend) */}
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full",
                          user.isVerified() ? "bg-[#2E7D52]" : "bg-[#B0ACA8]"
                        )}
                      />
                      <span className="text-sm text-muted-foreground">
                        {user.getVerifikasiLabel()}
                      </span>
                    </div>
                  </TableCell>

                  {/* Tgl Terdaftar */}
                  <TableCell className="text-sm text-muted-foreground">
                    {formatTanggal(user.created_at)}
                  </TableCell>

                  {/* Aksi */}
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onViewUser(user)}
                        className="rounded p-1 text-muted-foreground hover:text-foreground transition-colors"
                        title="Lihat detail"
                      >
                        <Eye className="h-4 w-4" strokeWidth={1.75} />
                      </button>
                      <button
                        onClick={() => onEditRole(user)}
                        className="rounded p-1 text-muted-foreground hover:text-foreground transition-colors"
                        title="Edit peran"
                      >
                        <Pencil className="h-4 w-4" strokeWidth={1.75} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>

      {/* Footer: count + pagination */}
      {pagination && (
        <div className="flex items-center justify-between border-t border-border px-5 py-3">
          <p className="text-sm text-muted-foreground">
            Menampilkan{" "}
            {(pagination.current_page - 1) * pagination.per_page + 1}–
            {Math.min(
              pagination.current_page * pagination.per_page,
              pagination.total
            )}{" "}
            dari {pagination.total} pengguna
          </p>
          <div className="flex items-center gap-1">
            <button
              disabled={currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-sm disabled:opacity-40 hover:bg-[#F7F5F3] transition-colors"
            >
              ‹
            </button>
            {Array.from(
              { length: Math.min(pagination.last_page, 5) },
              (_, i) => i + 1
            ).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md text-sm border transition-colors",
                  page === currentPage
                    ? "bg-[#C9956C] text-white border-[#C9956C]"
                    : "border-border hover:bg-[#F7F5F3]"
                )}
              >
                {page}
              </button>
            ))}
            <button
              disabled={currentPage >= pagination.last_page}
              onClick={() => onPageChange(currentPage + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-sm disabled:opacity-40 hover:bg-[#F7F5F3] transition-colors"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
