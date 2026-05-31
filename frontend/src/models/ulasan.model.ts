// models/ulasan.model.ts
import { Pelanggan } from './pelanggan.model'
import { Produk } from './produk.model'

export class Ulasan {
  id: number
  pelanggan_id: number
  produk_id: number
  rating: number
  komentar: string | null
  is_visible: boolean
  created_at: Date
  updated_at: Date

  // Relations
  pelanggan?: Pelanggan
  produk?: Produk

  constructor(data: Partial<Ulasan> = {}) {
    this.id = data.id ?? 0
    this.pelanggan_id = data.pelanggan_id ?? 0
    this.produk_id = data.produk_id ?? 0
    this.rating = data.rating ?? 0
    this.komentar = data.komentar ?? null
    this.is_visible = data.is_visible ?? true
    this.created_at = data.created_at ? new Date(data.created_at) : new Date()
    this.updated_at = data.updated_at ? new Date(data.updated_at) : new Date()

    if (data.pelanggan) {
      this.pelanggan = data.pelanggan instanceof Pelanggan ? data.pelanggan : new Pelanggan(data.pelanggan)
    }
    if (data.produk) {
      this.produk = data.produk instanceof Produk ? data.produk : new Produk(data.produk)
    }
  }

  getRatingStars(): boolean[] {
    return Array(5).fill(false).map((_, i) => i < this.rating)
  }

  getFormattedDate(): string {
    return this.created_at.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  getRelativeTime(): string {
    const now = new Date()
    const diff = now.getTime() - this.created_at.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (minutes < 1) return 'Baru saja'
    if (minutes < 60) return `${minutes} menit lalu`
    if (hours < 24) return `${hours} jam lalu`
    if (days < 7) return `${days} hari lalu`
    return this.getFormattedDate()
  }

  getShortComment(maxLength: number = 100): string {
    if (!this.komentar) return ''
    if (this.komentar.length <= maxLength) return this.komentar
    return this.komentar.substring(0, maxLength) + '...'
  }
}
