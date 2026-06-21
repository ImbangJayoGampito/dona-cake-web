// types/enums.ts

// ============== Role Enum ==============
export const RoleEnum = {
  Admin: "admin",
  Karyawan: "karyawan",
  User: "user",
} as const

export type RoleEnum = (typeof RoleEnum)[keyof typeof RoleEnum]

// ============== Pesanan Status ==============
export const PesananStatus = {
  MENUNGGU_PEMBAYARAN: 'menunggu_pembayaran',
  MENUNGGU_KONFIRMASI_PEMBAYARAN: 'menunggu_konfirmasi_pembayaran',
  DIBAYAR: 'dibayar',
  DIPROSES: 'diproses',
  SELESAI: 'selesai',
  DIBATALKAN: 'dibatalkan',
  PEMBAYARAN_DIBATALKAN: 'pembayaran_dibatalkan',
} as const
export const PESANAN_STATUS_LIST = Object.values(PesananStatus)
export type PesananStatus = (typeof PesananStatus)[keyof typeof PesananStatus]
export function getPesananColor(status: PesananStatus): string {
  switch (status) {
    case PesananStatus.MENUNGGU_PEMBAYARAN:
      return "yellow"
    case PesananStatus.DIBAYAR:
      return "blue"
    case PesananStatus.DIPROSES:
      return "purple"
    case PesananStatus.SELESAI:
      return "green"
    case PesananStatus.DIBATALKAN:
      return "red"
    case PesananStatus.PEMBAYARAN_DIBATALKAN:
      return "orange"
    default:
      return "gray"
  }
}
export function getPesananLabel(status: PesananStatus): string {
  switch (status) {
    case PesananStatus.MENUNGGU_PEMBAYARAN:
      return "Menunggu Pembayaran"
    case PesananStatus.DIBAYAR:
      return "Dibayar"
    case PesananStatus.DIPROSES:
      return "Diproses"
    case PesananStatus.SELESAI:
      return "Selesai"
    case PesananStatus.DIBATALKAN:
      return "Dibatalkan"
    case PesananStatus.PEMBAYARAN_DIBATALKAN:
      return "Pembayaran Dibatalkan"
    default:
      return "Unknown"
  }
}

// ============== Transaksi Status ==============
export const TransaksiStatus = {
  MENUNGGU: "menunggu",
  DIBAYAR: "dibayar",
  GAGAL: "gagal",
  DIKEMBALIKAN: "dikembalikan",
} as const

export type TransaksiStatus =
  (typeof TransaksiStatus)[keyof typeof TransaksiStatus]

// ============== Booking Status ==============
export const BookingStatus = {
  MENUNGGU_VERIFIKASI: "menunggu_verifikasi",
  DISETUJUI: "disetujui",
  DITOLAK: "ditolak",
  DIBATALKAN: "dibatalkan",
  SELESAI: "selesai",
} as const

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus]

// ============== Notifikasi Tipe ==============
export const NotifikasiTipe = {
  ORDER: "order",
  BOOKING: "booking",
  PAYMENT: "payment",
  SYSTEM: "system",
} as const

export type NotifikasiTipe =
  (typeof NotifikasiTipe)[keyof typeof NotifikasiTipe]

// ============== Aktivitas Jenis ==============
export const AktivitasJenis = {
  LOGIN: "login",
  ORDER: "order",
  BOOKING: "booking",
  REVIEW: "review",
  VIEW_PRODUCT: "view_product",
  SEARCH: "search",
} as const

export type AktivitasJenis =
  (typeof AktivitasJenis)[keyof typeof AktivitasJenis]
