// types/transaksi.types.ts

import { TransaksiStatus } from './enums'
import { Gambar } from '@/models/gambar.model'

// Payment Method Types
export type PaymentMethod = 'transfer_bank' | 'e_wallet' | 'cash_on_delivery' | 'credit_card'

// Payment Request Types
export interface PayOrderRequest {
  metode_pembayaran: PaymentMethod
  file: File
}

export interface PayBookingRequest {
  metode_pembayaran: PaymentMethod
  jumlah_bayar: number
  file: File
}

// Payment Response Types
export interface PaymentResponse {
  status: 'success' | 'error'
  message: string
  data: {
    transaksi: {
      id: number
      user_id: number
      jumlah_bayar: number
      metode_pembayaran: string
      status_transaksi: TransaksiStatus
      tgl_transaksi: string
      gambars: Gambar[]
    }
    pesanan?: any
    booking?: any
  }
}

// Transaction Confirmation Types
export interface ConfirmPaymentRequest {
  action: 'confirm' | 'reject'
  catatan?: string
}

// Transaction List Types
export interface TransactionListRequest {
  search?: string
  status?: TransaksiStatus
  metode?: string
  tanggal_mulai?: string
  tanggal_selesai?: string
  per_page?: number
  page?: number
}

// Staff Pending Transactions Response
export interface PendingTransactionsResponse {
  status: 'success' | 'error'
  data: Array<{
    id: number
    user_id: number
    jumlah_bayar: number
    metode_pembayaran: string
    status_transaksi: TransaksiStatus
    tgl_transaksi: string
    gambars: Gambar[]
    pesanans?: Array<{
      id: number
      pelanggan: {
        user: {
          name: string
        }
      }
    }>
    bookings?: Array<{
      id: number
      pelanggan: {
        user: {
          name: string
        }
      }
    }>
  }>
  pagination: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}