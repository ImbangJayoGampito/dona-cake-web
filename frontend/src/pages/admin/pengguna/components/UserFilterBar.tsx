import { Search, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RoleEnum } from "@/types/enums"

export interface UserFilters {
  search: string
  role: string
}

interface UserFilterBarProps {
  filters: UserFilters
  onFiltersChange: (filters: UserFilters) => void
  onExport?: () => void
}

export default function UserFilterBar({
  filters,
  onFiltersChange,
  onExport,
}: UserFilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[220px]">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Nama atau Email..."
          value={filters.search}
          onChange={(e) =>
            onFiltersChange({ ...filters, search: e.target.value })
          }
          className="pl-9"
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Role:</span>
        <Select
          value={filters.role}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, role: value })
          }
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Semua Peran" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Peran</SelectItem>
            <SelectItem value={RoleEnum.Admin}>Admin</SelectItem>
            <SelectItem value={RoleEnum.Karyawan}>Karyawan</SelectItem>
            <SelectItem value={RoleEnum.User}>Pelanggan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {onExport && (
        <Button variant="outline" size="icon" onClick={onExport} title="Export data pengguna">
          <Download className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
