// models/produk.model.ts
import { Gambar } from "./gambar.model"
import { Ulasan } from "./ulasan.model"

export class Produk {
  id: number
  nama_produk: string
  harga: number
  stok: number
  kategori: string | null
  deskripsi?: string
  rating_rata_rata: number
  created_at: Date
  updated_at: Date

  // Relations
  ulasans?: Ulasan[]
  gambars?: Gambar[]
  gambarUtama?: Gambar | null
  getUlasanCounts(): number {
    return this.ulasans ? this.ulasans.length : 0
  }
  constructor(data: Partial<Produk> = {}) {
    this.id = data.id ?? 0
    this.nama_produk = data.nama_produk ?? ""
    this.harga = data.harga ?? 0
    this.stok = data.stok ?? 0
    this.kategori = data.kategori ?? null
    this.deskripsi = data.deskripsi ?? ""
    this.rating_rata_rata = data.rating_rata_rata ?? 0
    this.created_at = data.created_at ? new Date(data.created_at) : new Date()
    this.updated_at = data.updated_at ? new Date(data.updated_at) : new Date()

    if (data.ulasans) {
      this.ulasans = data.ulasans.map((u) =>
        u instanceof Ulasan ? u : new Ulasan(u)
      )
    }
    if (data.gambars) {
      this.gambars = data.gambars.map((g) =>
        g instanceof Gambar ? g : new Gambar(g)
      )
    }
    // Check for existence or get from first element of gambar array
    if (data.gambarUtama) {
      this.gambarUtama =
        data.gambarUtama instanceof Gambar
          ? data.gambarUtama
          : new Gambar(data.gambarUtama)
    } else if (this.gambars && this.gambars.length > 0) {
      this.gambarUtama = this.gambars[0]
    }
  }

  getGambarUtamaUrl(): string {
    // Or create a fallback image from placeholderURL
    return this.gambarUtama?.gambar_url ?? new Gambar().gambar_url
  }
  getFormattedPrice(): string {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(this.harga)
  }

  getRatingStars(): number {
    return Math.round(this.rating_rata_rata)
  }

  getRatingPercentage(): number {
    return (this.rating_rata_rata / 5) * 100
  }

  isInStock(): boolean {
    return this.stok > 0
  }

  getStockStatus(): string {
    if (this.stok <= 0) return "Habis"
    if (this.stok < 10) return "Hampir Habis"
    return "Tersedia"
  }

  getStockStatusColor(): string {
    if (this.stok <= 0) return "red"
    if (this.stok < 10) return "orange"
    return "green"
  }

  getPrimaryImageUrl(): string | null {
    if (this.gambarUtama?.gambar_url) {
      return this.gambarUtama.gambar_url
    }
    if (this.gambars && this.gambars.length > 0) {
      return this.gambars[0].gambar_url
    }
    return null
  }

  getAllImageUrls(): string[] {
    if (this.gambars && this.gambars.length > 0) {
      return this.gambars.map((g) => g.gambar_url)
    }
    return []
  }

  getTotalReviews(): number {
    return this.ulasans?.length ?? 0
  }

  getAverageRating(): number {
    return this.rating_rata_rata
  }

  canOrder(quantity: number = 1): boolean {
    return this.isInStock() && this.stok >= quantity
  }
}
