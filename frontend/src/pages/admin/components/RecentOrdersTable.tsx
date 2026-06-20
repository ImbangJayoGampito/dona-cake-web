import { Eye } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"

/**
 * TODO: belum ada endpoint terkonfirmasi untuk "Pesanan Terbaru" (lihat
 * implementation_plan.md bagian 3). Komponen ini dibuat generik supaya siap
 * pakai begitu endpointnya tersedia — cukup isi `orders` dari hasil fetch,
 * tanpa perlu mengubah komponen ini lagi.
 */
export interface RecentOrderRow {
  id: string
  noPesanan: string
  namaPelanggan: string
  lokasi?: string
  total: number
  status: string
}

interface RecentOrdersTableProps {
  orders: RecentOrderRow[]
}

const STATUS_BADGE: Record<string, string> = {
  Selesai: "bg-green-100 text-green-700",
  Diproses: "bg-secondary text-primary",
  Dikirim: "bg-blue-100 text-blue-700",
  Menunggu: "bg-orange-100 text-orange-700",
  Dibatalkan: "bg-destructive/10 text-destructive",
}

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value)
}

export default function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Pesanan Terbaru</CardTitle>
        <Link
          to="/admin/pesanan"
          className="text-sm font-medium text-primary hover:underline"
        >
          Lihat Semua
        </Link>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Belum ada data pesanan terbaru yang bisa ditampilkan.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Pelanggan</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-primary">
                    {order.noPesanan}
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-foreground">
                      {order.namaPelanggan}
                    </p>
                    {order.lokasi && (
                      <p className="text-xs text-muted-foreground">
                        {order.lokasi}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>{formatRupiah(order.total)}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        STATUS_BADGE[order.status] ?? "bg-muted text-muted-foreground"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      to={`/admin/pesanan/${order.id}`}
                      aria-label={`Lihat detail pesanan ${order.noPesanan}`}
                      className="inline-flex text-muted-foreground hover:text-foreground"
                    >
                      <Eye className="h-4 w-4" strokeWidth={1.75} />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
