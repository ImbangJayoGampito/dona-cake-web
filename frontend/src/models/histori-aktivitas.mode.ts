// models/histori-aktivitas.model.ts
import { AktivitasJenis, type AktivitasJenis as AktivitasJenisType } from '@/types/enums'

export class HistoriAktivitas {
  id: number
  pelanggan_id: number
  jenis_aktivitas: AktivitasJenisType
  waktu_akses: Date
  created_at: Date
  updated_at: Date

  constructor(data: Partial<HistoriAktivitas>) {
    this.id = data.id ?? 0
    this.pelanggan_id = data.pelanggan_id ?? 0
    this.jenis_aktivitas = data.jenis_aktivitas ?? AktivitasJenis.LOGIN
    this.waktu_akses = data.waktu_akses ? new Date(data.waktu_akses) : new Date()
    this.created_at = data.created_at ? new Date(data.created_at) : new Date()
    this.updated_at = data.updated_at ? new Date(data.updated_at) : new Date()
  }

  getFormattedTime(): string {
    return this.waktu_akses.toLocaleString('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

  getActivityLabel(): string {
    const labels: Record<AktivitasJenisType, string> = {
      [AktivitasJenis.LOGIN]: 'Login',
      [AktivitasJenis.ORDER]: 'Membuat Pesanan',
      [AktivitasJenis.BOOKING]: 'Membuat Booking',
      [AktivitasJenis.REVIEW]: 'Memberi Review',
      [AktivitasJenis.VIEW_PRODUCT]: 'Melihat Produk',
      [AktivitasJenis.SEARCH]: 'Mencari Produk',
    }
    return labels[this.jenis_aktivitas] || this.jenis_aktivitas
  }
}