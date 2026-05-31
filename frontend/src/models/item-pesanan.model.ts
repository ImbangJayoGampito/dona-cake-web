// models/item-pesanan.model.ts
import { Produk } from './produk.model'
import { Pesanan } from './pesanan.model'

export class ItemPesanan {
  id: number
  pesanan_id: number
  produk_id: number
  kuantitas: number
  subtotal: number
  created_at: Date
  updated_at: Date

  // Relations
  produk?: Produk
  pesanan?: Pesanan

  constructor(data: Partial<ItemPesanan> = {}) {
    this.id = data.id ?? 0
    this.pesanan_id = data.pesanan_id ?? 0
    this.produk_id = data.produk_id ?? 0
    this.kuantitas = data.kuantitas ?? 1
    this.subtotal = data.subtotal ?? 0
    this.created_at = data.created_at ? new Date(data.created_at) : new Date()
    this.updated_at = data.updated_at ? new Date(data.updated_at) : new Date()

    if (data.produk) {
      this.produk = data.produk instanceof Produk ? data.produk : new Produk(data.produk)
    }
  }

  getFormattedSubtotal(): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(this.subtotal)
  }

  getUnitPrice(): number {
    if (!this.produk) return 0
    return this.produk.harga
  }

  getFormattedUnitPrice(): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(this.getUnitPrice())
  }

  getProductName(): string {
    return this.produk?.nama_produk || 'Produk tidak dikenal'
  }
}