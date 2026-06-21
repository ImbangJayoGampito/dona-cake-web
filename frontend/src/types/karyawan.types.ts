// =============================================================================
// KARYAWAN MODULE — TypeScript Types
// Sesuai dengan model Laravel: Pesanan.php, Booking.php
// =============================================================================

// ---- Pesanan (Orders) -------------------------------------------------------

/** Status valid dari Pesanan.php constants */
export type StatusPesanan =
  | "menunggu_pembayaran"
  | "menunggu_konfirmasi_pembayaran"
  | "dibayar"
  | "diproses"
  | "selesai"
  | "dibatalkan"
  | "pembayaran_dibatalkan"

/** Status yang relevan untuk KDS karyawan */
export type StatusKDS = "dibayar" | "diproses" | "selesai"

export interface ItemPesanan {
  id: number
  pesanan_id: number
  produk_id: number
  kuantitas: number
  subtotal: number
  produk?: {
    id: number
    nama_produk: string
    harga: number
    stok: number
    slug?: string
    deskripsi?: string
  }
}

export interface Pesanan {
  id: number
  pelanggan_id: number
  pelanggan: {
    id: number
    nama: string
  }
  tgl_pesanan: string
  total_harga: number
  status_pesanan: StatusPesanan
  item_pesanans?: ItemPesanan[]
  created_at: string
  updated_at: string
}

// ---- Booking (Custom Orders) ------------------------------------------------

/** Status valid dari BookingStatus enum */
export type StatusVerifikasi =
  | "menunggu_verifikasi"
  | "disetujui"
  | "ditolak"
  | "dibatalkan"
  | "selesai"

export interface Booking {
  id: number
  pelanggan_id: number
  pelanggan: {
    id: number
    nama: string
  }
  transaksi_id: number | null
  kategori_id: number | null
  desain_custom_url: string | null
  deskripsi_custom: string | null
  jenis_frosting: string
  rasa_kue: string
  tema_dekorasi: string | null
  ukuran: string | null
  tgl_ambil: string | null
  harga_final: number | null
  status_verifikasi: StatusVerifikasi
  catatan: string | null
  created_at: string
  updated_at: string
}

// ---- Ulasan (Reviews) -------------------------------------------------------

export interface Ulasan {
  id: number
  pelanggan_id: number
  produk_id: number
  pelanggan: {
    id: number
    nama: string
  }
  produk: {
    id: number
    nama_produk: string
    gambar_utama?: string | null
  }
  rating: number
  komentar: string
  balasan: string | null
  nama_admin_balas: string | null
  waktu_balasan: string | null
  is_visible: boolean
  created_at: string
  updated_at: string
}

export interface UlasanStats {
  rating_rata_rata: number
  total_ulasan: number
  ulasan_baru: number
}

export type FilterUlasan = "semua" | "belum_dibalas" | "bintang_rendah"

// ---- Staff Dashboard Stats --------------------------------------------------

export interface StaffDashboardStats {
  pesanan_hari_ini: number
  sedang_diproses: number
  siap_diambil: number
  pending: number
}

// ---- Kehadiran --------------------------------------------------------------

export type StatusKehadiran = "aktif" | "istirahat"

// -----------------------------------------------------------------------------
