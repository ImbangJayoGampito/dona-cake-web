// models/keranjang.model.ts
import { User } from './user.model'
import { Produk } from './produk.model'

export class Keranjang {
  id: number
  user_id: number
  produk_id: number
  kuantitas: number
  catatan: string | null
  created_at: Date
  updated_at: Date

  // Relations
  user?: User
  produk?: Produk

  constructor(data: Partial<Keranjang> = {}) {
    this.id = data.id ?? 0
    this.user_id = data.user_id ?? 0
    this.produk_id = data.produk_id ?? 0
    this.kuantitas = data.kuantitas ?? 1
    this.catatan = data.catatan ?? null
    this.created_at = data.created_at ? new Date(data.created_at) : new Date()
    this.updated_at = data.updated_at ? new Date(data.updated_at) : new Date()

    if (data.user) {
      this.user = data.user instanceof User ? data.user : new User(data.user)
    }
    if (data.produk) {
      this.produk = data.produk instanceof Produk ? data.produk : new Produk(data.produk)
    }
  }

  getSubtotal(): number {
    if (!this.produk) return 0
    return this.produk.harga * this.kuantitas
  }

  getFormattedSubtotal(): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(this.getSubtotal())
  }

  increaseQuantity(amount: number = 1): void {
    this.kuantitas += amount
  }

  decreaseQuantity(amount: number = 1): void {
    if (this.kuantitas - amount >= 1) {
      this.kuantitas -= amount
    }
  }

  updateQuantity(quantity: number): void {
    if (quantity >= 1) {
      this.kuantitas = quantity
    }
  }

  getProductName(): string {
    return this.produk?.nama_produk || 'Produk tidak dikenal'
  }

  getProductPrice(): number {
    return this.produk?.harga || 0
  }
}