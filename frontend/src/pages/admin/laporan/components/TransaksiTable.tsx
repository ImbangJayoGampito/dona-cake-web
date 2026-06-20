import { Search, FileText, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Transaksi } from "@/models/transaksi.model"
// ✅ Pakai TransaksiStatus dari enum yang sudah ada
import { TransaksiStatus, type TransaksiStatus as TransaksiStatusType } from "@/types/enums"
import type { PaginationMeta } from "@/types/pagination.types"

interface TransaksiTableProps {
  transaksis: Transaksi[]
  pagination: PaginationMeta | null
  search: string
  onSearchChange: (value: string) => void
  currentPage: number
  onPageChange: (page: number) => void
  onExportCSV: () => void
  onExportPDF: () => void
  isExportingPDF?: boolean
}

// ✅ Key pakai TransaksiStatus enum values ('menunggu', 'dibayar', dll)
//    bukan string literal sendiri — ini yang sebelumnya duplikat
const STATUS_CONFIG: Record<
  TransaksiStatusType,
  { label: string; className: string }
> = {
  [TransaksiStatus.DIBAYAR]: {
    label: "Success",
    className: "bg-[#EDF7F1] text-[#2E7D52] hover:bg-[#EDF7F1]",
  },
  [TransaksiStatus.MENUNGGU]: {
    label: "Menunggu",
    className: "bg-[#FEF3E2] text-[#B45309] hover:bg-[#FEF3E2]",
  },
  [TransaksiStatus.GAGAL]: {
    label: "Gagal",
    className: "bg-[#FDF0F0] text-[#D94F4F] hover:bg-[#FDF0F0]",
  },
  [TransaksiStatus.DIKEMBALIKAN]: {
    label: "Refunded",
    className: "bg-[#F7F5F3] text-[#6B6560] hover:bg-[#F7F5F3]",
  },
}

export default function TransaksiTable({
  transaksis,
  pagination,
  search,
  onSearchChange,
  currentPage,
  onPageChange,
  onExportCSV,
  onExportPDF,
  isExportingPDF,
}: TransaksiTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white">
      {/* Header tabel: judul + search + export */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <h3 className="text-base font-medium text-foreground">
          Riwayat Transaksi
        </h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari pesanan..."
              className="h-9 w-[200px] pl-8 text-sm"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onExportCSV}
            className="gap-1.5 text-xs"
          >
            <FileText className="h-3.5 w-3.5" strokeWidth={1.75} />
            CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onExportPDF}
            disabled={isExportingPDF}
            className="gap-1.5 text-xs"
          >
            {isExportingPDF ? (
              <div className="h-3.5 w-3.5 animate-spin rounded-full border border-current border-t-transparent" />
            ) : (
              <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
            )}
            PDF
          </Button>
        </div>
      </div>

      {/* Tabel */}
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F7F5F3]">
            <TableHead className="text-xs uppercase">Tanggal</TableHead>
            <TableHead className="text-xs uppercase">No. Pesanan</TableHead>
            <TableHead className="text-xs uppercase">Pelanggan</TableHead>
            <TableHead className="text-xs uppercase">Metode</TableHead>
            <TableHead className="text-xs uppercase">Jumlah Bayar</TableHead>
            <TableHead className="text-xs uppercase">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transaksis.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-16 text-center text-sm text-muted-foreground"
              >
                Tidak ada data transaksi.
              </TableCell>
            </TableRow>
          ) : (
            transaksis.map((t) => {
              // ✅ Fallback ke MENUNGGU jika status tidak dikenal
              const statusCfg =
                STATUS_CONFIG[t.status_transaksi] ??
                STATUS_CONFIG[TransaksiStatus.MENUNGGU]

              return (
                <TableRow key={t.id}>
                  <TableCell className="text-sm text-muted-foreground">
                    {t.getTanggalFormatted()}
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-[#C9956C]">
                      {t.getNoPesanan()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F5EAE0] text-xs font-semibold text-[#C9956C]">
                        {t.getNamaPelanggan().charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {t.getNamaPelanggan()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {t.metode_pembayaran}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-foreground">
                    {t.getJumlahFormatted()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn("border-0 font-medium", statusCfg.className)}
                    >
                      {statusCfg.label}
                    </Badge>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between border-t border-border px-5 py-3">
          <p className="text-xs text-muted-foreground">
            Menampilkan{" "}
            {(pagination.current_page - 1) * pagination.per_page + 1}–
            {Math.min(
              pagination.current_page * pagination.per_page,
              pagination.total
            )}{" "}
            dari {pagination.total} transaksi
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
                  "flex h-8 w-8 items-center justify-center rounded-md border text-sm transition-colors",
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
