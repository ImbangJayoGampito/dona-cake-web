import { Keranjang } from "@/models/keranjang.model"
export interface StoreKeranjangRequest {
  produk_id: number
  kuantitas: number
  catatan?: string
}

export interface KeranjangResponse {
  items: Keranjang[]
  total_harga: number
  jumlah_item: number
}

