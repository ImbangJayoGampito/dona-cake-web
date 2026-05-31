// models/transaksi.model.ts
import { TransaksiStatus, type TransaksiStatus as TransaksiStatusType } from '@/types/enums'
import { Pesanan } from './pesanan.model'
import { Booking } from './booking.model'

export class Transaksi {
  id: number
  user_id?: number
  jumlah_bayar: number
  metode_pembayaran: string
  status_transaksi: TransaksiStatusType
  id_transaksi_gateway: string | null
  tgl_transaksi: Date
  created_at: Date
  updated_at: Date

  // Relations
  pesanans?: Pesanan[]
  bookings?: Booking[]

  constructor(data: Partial<Transaksi>) {
    this.id = data.id ?? 0
    this.user_id = data.user_id
    this.jumlah_bayar = data.jumlah_bayar ?? 0
    this.metode_pembayaran = data.metode_pembayaran ?? ''
    this.status_transaksi = data.status_transaksi ?? TransaksiStatus.MENUNGGU
    this.id_transaksi_gateway = data.id_transaksi_gateway ?? null
    this.tgl_transaksi = data.tgl_transaksi ? new Date(data.tgl_transaksi) : new Date()
    this.created_at = data.created_at ? new Date(data.created_at) : new Date()
    this.updated_at = data.updated_at ? new Date(data.updated_at) : new Date()

    if (data.pesanans) {
      this.pesanans = data.pesanans.map(p => new Pesanan(p))
    }
    if (data.bookings) {
      this.bookings = data.bookings.map(b => new Booking(b))
    }
  }

  getFormattedAmount(): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(this.jumlah_bayar)
  }

  getStatusBadgeColor(): string {
    const statusColors: Record<TransaksiStatusType, string> = {
      [TransaksiStatus.MENUNGGU]: 'yellow',
      [TransaksiStatus.DIBAYAR]: 'green',
      [TransaksiStatus.GAGAL]: 'red',
      [TransaksiStatus.DIKEMBALIKAN]: 'orange',
    }
    return statusColors[this.status_transaksi] || 'gray'
  }

  isSuccessful(): boolean {
    return this.status_transaksi === TransaksiStatus.DIBAYAR
  }
}