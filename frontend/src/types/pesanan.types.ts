import { PesananStatus } from "@/types/enums"

// ─── Item Pesanan ───
export interface ItemPesanan {
  produk_id: number // positive integer (exists in produks table)
  kuantitas: number // integer >= 1
  catatan?: string // max 500 chars, optional
}

// ─── Create Pesanan ───
export interface CreatePesananPayload {
  items: ItemPesanan[] // at least 1 item
}

// ─── Update Pesanan ───
export interface UpdatePesananPayload {
  status_pesanan?: PesananStatus // optional, must be one of the enum values
  total_harga?: number // >= 0, optional
}

// ─── Union type for both create & update ───
export type PesananPayload = CreatePesananPayload | UpdatePesananPayload

// ─── Response Types ───
export interface PesananResponse {
  id: number
  user_id: number
  status_pesanan: PesananStatus
  total_harga: number
  created_at: string
  updated_at: string
  items: {
    id: number
    pesanan_id: number
    produk_id: number
    kuantitas: number
    catatan: string | null
    produk: {
      id: number
      nama_produk: string
      harga: number
      // Add other product fields as needed
    }
  }[]
}

// ─── Error Response ───
export interface PesananErrorResponse {
  message: string
  errors?: {
    items?: string[]
    'items.*.produk_id'?: string[]
    'items.*.kuantitas'?: string[]
    status_pesanan?: string[]
    total_harga?: string[]
  }
}
