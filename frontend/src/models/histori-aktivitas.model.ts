// models/histori-aktivitas.model.ts
import { AktivitasJenis, type AktivitasJenis as AktivitasJenisType } from '@/types/enums'
import { Produk } from './produk.model'
import { type StoreHistoriAktivitasBatchRequest, type StoreHistoriAktivitasRequest } from '@/types/histori-aktivitas.types'

export class HistoriAktivitas {
  id: number
  pelanggan_id: number
  jenis_aktivitas: AktivitasJenisType
  waktu_akses: Date
  created_at: Date
  updated_at: Date

  constructor(data: Partial<HistoriAktivitas> = {}) {
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

  getRelativeTime(): string {
    const now = new Date()
    const diff = now.getTime() - this.waktu_akses.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (minutes < 1) return 'Baru saja'
    if (minutes < 60) return `${minutes} menit lalu`
    if (hours < 24) return `${hours} jam lalu`
    if (days < 7) return `${days} hari lalu`
    return this.getFormattedTime()
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

  getActivityIcon(): string {
    const icons: Record<AktivitasJenisType, string> = {
      [AktivitasJenis.LOGIN]: '🔐',
      [AktivitasJenis.ORDER]: '🛒',
      [AktivitasJenis.BOOKING]: '📅',
      [AktivitasJenis.REVIEW]: '⭐',
      [AktivitasJenis.VIEW_PRODUCT]: '👁️',
      [AktivitasJenis.SEARCH]: '🔍',
    }
    return icons[this.jenis_aktivitas] || '📋'
  }

  /**
   * Create a single activity request for tracking product activity
   * @param produk The product associated with the activity
   * @param jenisAktivitas The type of activity being tracked
   * @returns StoreHistoriAktivitasRequest object ready for API submission
   */
  static createSingle(produk: Produk, jenisAktivitas: AktivitasJenisType): StoreHistoriAktivitasRequest {
    return {
      jenis_aktivitas: jenisAktivitas,
      produk_terkait: produk.id
    }
  }

  /**
   * Create multiple activity requests for tracking product activities in batch
   * @param produkArray Array of products associated with the activities
   * @param jenisAktivitas The type of activity being tracked (same for all products)
   * @returns StoreHistoriAktivitasBatchRequest object ready for API submission
   */
  static createMultiples(produkArray: Produk[], jenisAktivitas: AktivitasJenisType): StoreHistoriAktivitasBatchRequest {
    return {
      aktivitas: produkArray.map(produk => ({
        jenis_aktivitas: jenisAktivitas,
        produk_terkait: produk.id
      }))
    }
  }
}
