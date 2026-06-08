export interface Booking {
  id: number
  pelanggan_id: number
  transaksi_id?: number | null
  kategori_id?: number | null
  ukuran: string
  jenis_frosting: string
  rasa_kue: string
  tema_dekorasi?: string | null
  desain_custom_url?: string | null
  deskripsi_custom?: string | null
  tgl_ambil: string // ISO datetime string
  harga_final?: number | null
  catatan?: string | null
  created_at?: string
  updated_at?: string
}
