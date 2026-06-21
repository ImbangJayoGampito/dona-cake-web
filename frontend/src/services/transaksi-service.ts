// services/transaksi-service.ts

import api from '@/lib/api/config'
import { Transaksi } from '@/models/transaksi.model'
import type {
  PayOrderRequest,
  PayBookingRequest,
  PaymentResponse,
  ConfirmPaymentRequest,
  TransactionListRequest,
  PendingTransactionsResponse
} from '@/types/transaksi.types'

/**
 * Transaksi Service - Handles all transaction/payment related API calls
 */
export class TransaksiService {
  /**
   * Get all transactions for the current user
   */
  static async getTransactions(params?: TransactionListRequest): Promise<Transaksi[]> {
    try {
      const response = await api.get('/api/transaksi', { params })
      return response.data.data.map((item: any) => new Transaksi(item))
    } catch (error) {
      console.error('Failed to fetch transactions:', error)
      throw error
    }
  }

  /**
   * Get a specific transaction by ID
   */
  static async getTransaction(id: number): Promise<Transaksi> {
    try {
      const response = await api.get(`/api/transaksi/${id}`)
      return new Transaksi(response.data.data)
    } catch (error) {
      console.error(`Failed to fetch transaction ${id}:`, error)
      throw error
    }
  }

  /**
   * Process payment for a regular order
   */
  static async payOrder(pesananId: number, request: PayOrderRequest): Promise<PaymentResponse> {
    try {
      const formData = new FormData()
      formData.append('metode_pembayaran', request.metode_pembayaran)
      formData.append('file', request.file)

      const response = await api.post(`/api/pesanan/${pesananId}/pay`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.error(`Failed to pay order ${pesananId}:`, error)
      throw error
    }
  }

  /**
   * Process payment for a booking (custom order)
   */
  static async payBooking(bookingId: number, request: PayBookingRequest): Promise<PaymentResponse> {
    try {
      const formData = new FormData()
      formData.append('metode_pembayaran', request.metode_pembayaran)
      formData.append('jumlah_bayar', request.jumlah_bayar.toString())
      formData.append('file', request.file)

      const response = await api.post(`/api/booking/${bookingId}/pay`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.error(`Failed to pay booking ${bookingId}:`, error)
      throw error
    }
  }

  /**
   * Get all pending transactions (staff only)
   */
  static async getPendingTransactions(params?: { per_page?: number; page?: number }): Promise<PendingTransactionsResponse> {
    try {
      const response = await api.get('/api/staff/transaksi/pending', { params })
      return response.data
    } catch (error) {
      console.error('Failed to fetch pending transactions:', error)
      throw error
    }
  }

  /**
   * Confirm or reject a pending payment (staff only)
   */
  static async confirmPayment(transaksiId: number, request: ConfirmPaymentRequest): Promise<any> {
    try {
      const response = await api.post(`/api/staff/transaksi/${transaksiId}/confirm`, request)
      return response.data
    } catch (error) {
      console.error(`Failed to confirm payment ${transaksiId}:`, error)
      throw error
    }
  }

  /**
   * Upload payment proof for a transaction
   */
  static async uploadPaymentProof(transaksiId: number, file: File): Promise<any> {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await api.post(`/api/gambar/upload?model_type=transaksi&model_id=${transaksiId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.error(`Failed to upload payment proof for transaction ${transaksiId}:`, error)
      throw error
    }
  }
}