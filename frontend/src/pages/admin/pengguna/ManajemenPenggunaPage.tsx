import { useEffect, useState, useCallback } from "react"
import { UserPlus, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { ManajemenPenggunaService } from "@/services/manajemen-pengguna-service"
import { AdminUser } from "@/models/admin-user.model"
import type { PaginationMeta } from "@/types/pagination.types"
import UserFilterBar, { type UserFilters } from "./components/UserFilterBar"
import UserTable from "./components/UserTable"
import BulkActionBar from "./components/BulkActionBar"
import EditRoleDialog from "./components/EditRoleDialog"
import DeleteUserDialog from "./components/DeleteUserDialog"

type LoadState = "loading" | "success" | "error"

const DEFAULT_FILTERS: UserFilters = { search: "", role: "all" }

export default function ManajemenPenggunaPage() {
  const [loadState, setLoadState] = useState<LoadState>("loading")
  const [errorMessage, setErrorMessage] = useState("")
  const [users, setUsers] = useState<AdminUser[]>([])
  const [pagination, setPagination] = useState<PaginationMeta | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<UserFilters>(DEFAULT_FILTERS)

  // Selection state
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  // Dialog state
  const [editTarget, setEditTarget] = useState<AdminUser | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<{
    ids: number[]
    name?: string
  } | null>(null)

  const loadUsers = useCallback(async () => {
    setLoadState("loading")
    setSelectedIds([])

    const params = {
      page: currentPage,
      ...(filters.search && { search: filters.search }),
      ...(filters.role !== "all" && { role: filters.role }),
    }

    const res = await ManajemenPenggunaService.getUsers(params)

    if (res.isError() || !res.data) {
      setErrorMessage(
        res.message ?? "Gagal memuat data pengguna. Coba lagi."
      )
      setLoadState("error")
      return
    }

    setUsers(res.data)
    if (res.pagination) setPagination(res.pagination)
    setLoadState("success")
  }, [currentPage, filters])

  useEffect(() => {
    // Debounce search supaya tidak fetch tiap keystroke
    const timer = setTimeout(loadUsers, filters.search ? 400 : 0)
    return () => clearTimeout(timer)
  }, [loadUsers, filters.search])

  // Ketika filter non-search berubah, reset ke page 1
  function handleFiltersChange(newFilters: UserFilters) {
    setFilters(newFilters)
    if (newFilters.role !== filters.role) setCurrentPage(1)
  }

  // Selection handlers
  function handleToggleSelect(id: number) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  function handleToggleSelectAll(ids: number[]) {
    setSelectedIds(ids)
  }

  // Edit role
  async function handleEditRoleConfirm(userId: number, newRole: string) {
    const res = await ManajemenPenggunaService.updateRole(userId, { role: newRole })
    if (res.isSuccess()) {
      toast.success("Peran pengguna berhasil diperbarui.")
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? new AdminUser({ ...u, role: newRole as AdminUser["role"] }) : u
        )
      )
    } else {
      toast.error(res.message ?? "Gagal memperbarui peran. Coba lagi.")
    }
  }

  // Delete single
  function handleDeleteSingle(user: AdminUser) {
    setDeleteTarget({ ids: [user.id], name: user.getDisplayName() })
  }

  // Delete bulk
  function handleDeleteBulk() {
    if (selectedIds.length === 0) return
    setDeleteTarget({ ids: selectedIds })
  }

  async function handleDeleteConfirm() {
    if (!deleteTarget) return

    if (deleteTarget.ids.length === 1) {
      const res = await ManajemenPenggunaService.deleteUser(deleteTarget.ids[0])
      if (res.isSuccess()) {
        toast.success("Pengguna berhasil dihapus.")
        setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.ids[0]))
        setSelectedIds((prev) => prev.filter((id) => id !== deleteTarget.ids[0]))
      } else {
        toast.error(res.message ?? "Gagal menghapus pengguna.")
      }
    } else {
      const { deleted, failed } = await ManajemenPenggunaService.deleteUsers(
        deleteTarget.ids
      )
      if (deleted.length > 0) {
        toast.success(`${deleted.length} pengguna berhasil dihapus.`)
        setUsers((prev) => prev.filter((u) => !deleted.includes(u.id)))
        setSelectedIds([])
      }
      if (failed.length > 0) {
        toast.error(`${failed.length} pengguna gagal dihapus.`)
      }
    }
  }

  // Kirim Email (placeholder — tidak ada endpoint di backend saat ini)
  function handleSendEmail() {
    toast.info(
      `Fitur kirim email ke ${selectedIds.length} pengguna belum tersedia.`
    )
  }

  if (loadState === "error") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-destructive/30 bg-destructive/10 px-6 py-16 text-center">
        <AlertCircle className="h-10 w-10 text-destructive" strokeWidth={1.75} />
        <h2 className="mt-4 text-lg font-semibold text-foreground">
          Gagal Memuat Data Pengguna
        </h2>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          {errorMessage}
        </p>
        <Button onClick={loadUsers} className="mt-6 gap-2">
          <RefreshCw className="h-4 w-4" strokeWidth={1.75} />
          Coba Lagi
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Manajemen Pengguna
            </h1>
            <p className="text-sm text-muted-foreground">
              Kelola hak akses dan informasi detail pelanggan serta staf Anda.
            </p>
          </div>
          <Button className="gap-2 bg-primary hover:bg-primary/80">
            <UserPlus className="h-4 w-4" strokeWidth={1.75} />
            Tambah Pengguna
          </Button>
        </div>

        {/* Filter bar */}
        <UserFilterBar
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />

        {/* Tabel atau skeleton */}
        {loadState === "loading" ? (
          <div className="space-y-3">
            <Skeleton className="h-12 w-full rounded-xl" />
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <UserTable
            users={users}
            pagination={pagination}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
            onToggleSelectAll={handleToggleSelectAll}
            onViewUser={(user) => {
              // TODO: buka drawer/modal detail user — implementasi menyusul
              toast.info(`Detail ${user.getDisplayName()} — segera hadir.`)
            }}
            onEditRole={setEditTarget}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>

      {/* Bulk action bar */}
      <BulkActionBar
        selectedCount={selectedIds.length}
        onSendEmail={handleSendEmail}
        onDelete={handleDeleteBulk}
        onClear={() => setSelectedIds([])}
      />

      {/* Modal Edit Role */}
      <EditRoleDialog
        user={editTarget}
        open={editTarget !== null}
        onClose={() => setEditTarget(null)}
        onConfirm={handleEditRoleConfirm}
      />

      {/* Modal Hapus (single dari baris tabel) */}
      <DeleteUserDialog
        count={deleteTarget?.ids.length ?? 0}
        userName={deleteTarget?.name}
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  )
}
