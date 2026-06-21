import { PesananStatus } from "@/types/enums"

// ─── Item Pesanan ───
export interface ItemPesanan {
  produk_id: number // positive integer
  kuantitas: number // integer >= 1
  catatan?: string // max 500 chars, optional
}

// ─── Create Pesanan ───
export interface CreatePesananPayload {
  items: ItemPesanan[] // at least 1 item
}

// ─── Update Pesanan ───
export interface UpdatePesananPayload {
  status_pesanan?: PesananStatus // optional
  total_harga?: number // >= 0, optional
}

// ─── Union type for both create & update ───
export type PesananPayload = CreatePesananPayload | UpdatePesananPayload
