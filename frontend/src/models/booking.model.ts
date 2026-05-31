// models/booking.model.ts
import { BookingStatus, type BookingStatus as BookingStatusType } from '@/types/enums'
import { Pelanggan } from './pelanggan.model'
import { Transaksi } from './transaksi.model'

export class Booking {
  id: number
  pelanggan_id: number
  transaksi_id: number | null
  desain_custom_url: string | null
  ukuran: string | null
  tgl_ambil: Date | null
  harga_final: number | null
  status_verifikasi: BookingStatusType
  catatan?: string
  created_at: Date
  updated_at: Date

  // Relations
  pelanggan?: Pelanggan
  transaksi?: Transaksi

  constructor(data: Partial<Booking>) {
    this.id = data.id ?? 0
    this.pelanggan_id = data.pelanggan_id ?? 0
    this.transaksi_id = data.transaksi_id ?? null
    this.desain_custom_url = data.desain_custom_url ?? null
    this.ukuran = data.ukuran ?? null
    this.tgl_ambil = data.tgl_ambil ? new Date(data.tgl_ambil) : null
    this.harga_final = data.harga_final ?? null
    this.status_verifikasi = data.status_verifikasi ?? BookingStatus.MENUNGGU_VERIFIKASI
    this.catatan = data.catatan ?? ''
    this.created_at = data.created_at ? new Date(data.created_at) : new Date()
    this.updated_at = data.updated_at ? new Date(data.updated_at) : new Date()

    if (data.pelanggan) {
      this.pelanggan = new Pelanggan(data.pelanggan)
    }
    if (data.transaksi) {
      this.transaksi = new Transaksi(data.transaksi)
    }
  }

  getFormattedPrice(): string {
    if (!this.harga_final) return 'Belum ditentukan'
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(this.harga_final)
  }

  getStatusBadgeColor(): string {
    const statusColors: Record<BookingStatusType, string> = {
      [BookingStatus.MENUNGGU_VERIFIKASI]: 'yellow',
      [BookingStatus.DISETUJUI]: 'green',
      [BookingStatus.DITOLAK]: 'red',
      [BookingStatus.DIBATALKAN]: 'gray',
      [BookingStatus.SELESAI]: 'blue',
    }
    return statusColors[this.status_verifikasi] || 'gray'
  }

  getStatusLabel(): string {
    const labels: Record<BookingStatusType, string> = {
      [BookingStatus.MENUNGGU_VERIFIKASI]: 'Menunggu Verifikasi',
      [BookingStatus.DISETUJUI]: 'Disetujui',
      [BookingStatus.DITOLAK]: 'Ditolak',
      [BookingStatus.DIBATALKAN]: 'Dibatalkan',
      [BookingStatus.SELESAI]: 'Selesai',
    }
    return labels[this.status_verifikasi] || this.status_verifikasi
  }

  canCancel(): boolean {
    return ([
    BookingStatus.MENUNGGU_VERIFIKASI,
    BookingStatus.DISETUJUI,
  ] as BookingStatusType[]).includes(this.status_verifikasi)
  }
}