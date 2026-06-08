export interface BookingForm {
  id: number
  pelanggan_id: number
  kategori_id?: number | null
  ukuran: string
  jenis_frosting: string
  rasa_kue: string[]
  packaging: string
  tema_dekorasi?: string | null
  desain_custom_url?: string | null
  deskripsi_custom?: string | null
  tgl_ambil: string // ISO datetime string
  harga_final?: number | null
  catatan?: string | null
  created_at?: string
  updated_at?: string
}

export interface BookingPriceAdditional {
  id: string
  name: string
  description?: string
  priceFunction: (price: number) => number
}
