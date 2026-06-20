// types/enums.ts

// ============== Role Enum ==============
export const RoleEnum = {
  Admin: 'admin',
  Karyawan: 'karyawan',
  User: 'user',
} as const

export type RoleEnum = typeof RoleEnum[keyof typeof RoleEnum]

// ============== Pesanan Status ==============
export const PesananStatus = {
  MENUNGGU_PEMBAYARAN: 'menunggu_pembayaran',
  DIBAYAR: 'dibayar',
  DIPROSES: 'diproses',
  SELESAI: 'selesai',
  DIBATALKAN: 'dibatalkan',
  PEMBAYARAN_DIBATALKAN: 'pembayaran_dibatalkan',
} as const

export type PesananStatus = typeof PesananStatus[keyof typeof PesananStatus]

// ============== Transaksi Status ==============
export const TransaksiStatus = {
  MENUNGGU: 'menunggu',
  DIBAYAR: 'dibayar',
  GAGAL: 'gagal',
  DIKEMBALIKAN: 'dikembalikan',
} as const

export type TransaksiStatus = typeof TransaksiStatus[keyof typeof TransaksiStatus]

// ============== Booking Status ==============
export const BookingStatus = {
  MENUNGGU_VERIFIKASI: 'menunggu_verifikasi',
  DISETUJUI: 'disetujui',
  DITOLAK: 'ditolak',
  DIBATALKAN: 'dibatalkan',
  SELESAI: 'selesai',
} as const

export type BookingStatus = typeof BookingStatus[keyof typeof BookingStatus]

// ============== Notifikasi Tipe ==============
export const NotifikasiTipe = {
  ORDER: 'order',
  BOOKING: 'booking',
  PAYMENT: 'payment',
  SYSTEM: 'system',
} as const

export type NotifikasiTipe = typeof NotifikasiTipe[keyof typeof NotifikasiTipe]

// ============== Aktivitas Jenis ==============
export const AktivitasJenis = {
  LOGIN: 'login',
  ORDER: 'order',
  BOOKING: 'booking',
  REVIEW: 'review',
  VIEW_PRODUCT: 'view_product',
  SEARCH: 'search',
} as const

export type AktivitasJenis = typeof AktivitasJenis[keyof typeof AktivitasJenis]