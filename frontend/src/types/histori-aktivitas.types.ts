import { AktivitasJenis } from '@/types/enums'

// Single activity request interface
export interface StoreHistoriAktivitasRequest {
  jenis_aktivitas: AktivitasJenis
  produk_terkait: number
}

// Batch activity request interface
export interface StoreHistoriAktivitasBatchRequest {
  aktivitas: Array<{
    jenis_aktivitas: AktivitasJenis
    produk_terkait: number
  }>
}

// Individual activity item in batch
export interface HistoriAktivitasItem {
  jenis_aktivitas: AktivitasJenis
  produk_terkait: number
}