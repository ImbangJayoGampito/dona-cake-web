// models/pesanan.model.ts
import {
  PesananStatus,
  type PesananStatus as PesananStatusType,
} from "@/types/enums"
import { Pelanggan } from "./pelanggan.model"
import { Transaksi } from "./transaksi.model"
import { ItemPesanan } from "./item-pesanan.model"
import { Keranjang } from "./keranjang.model"
export class Pesanan {
  id: number
  pelanggan_id: number
  transaksi_id: number | null
  tgl_pesanan: Date
  total_harga: number
  status_pesanan: PesananStatusType
  created_at: Date
  updated_at: Date

  // Relations
  pelanggan?: Pelanggan
  transaksi?: Transaksi
  itemPesanans?: ItemPesanan[]

  constructor(data: Partial<Pesanan>) {
    this.id = data.id ?? 0
    this.pelanggan_id = data.pelanggan_id ?? 0
    this.transaksi_id = data.transaksi_id ?? null
    this.tgl_pesanan = data.tgl_pesanan
      ? new Date(data.tgl_pesanan)
      : new Date()
    this.total_harga = data.total_harga ?? 0
    this.status_pesanan =
      data.status_pesanan ?? PesananStatus.MENUNGGU_PEMBAYARAN
    this.created_at = data.created_at ? new Date(data.created_at) : new Date()
    this.updated_at = data.updated_at ? new Date(data.updated_at) : new Date()

    if (data.pelanggan) {
      this.pelanggan = new Pelanggan(data.pelanggan)
    }
    if (data.transaksi) {
      this.transaksi = new Transaksi(data.transaksi)
    }
    if (data.itemPesanans) {
      this.itemPesanans = data.itemPesanans.map((i) => new ItemPesanan(i))
    }
  }
  // Use voodoo magic to convert 2 types
  appendKeranjangToPesanan(keranjang: Keranjang | Keranjang[]): void {
    if (!this.itemPesanans) {
      this.itemPesanans = []
    }
    const items = Array.isArray(keranjang) ? keranjang : [keranjang]
    const newItems = items.map((item) => {
      const existingItem = this.itemPesanans?.find(
        (i) => i.produk_id === item.produk_id
      )
      // if you find existing item just return it, otherwise create a new one
      if (existingItem) {
        existingItem.kuantitas += item.kuantitas
        existingItem.subtotal = item.getSubtotal()
        return existingItem
      } else {
        return new ItemPesanan({
          pesanan_id: this.id,
          produk_id: item.produk_id,
          kuantitas: item.kuantitas,
          subtotal: item.getSubtotal(),
          produk: item.produk,
        })
      }
    })
    this.itemPesanans = newItems
    this.total_harga = this.itemPesanans.reduce(
      (sum, item) => sum + item.subtotal,
      0
    )
  }
  getFormattedTotal(): string {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(this.total_harga)
  }

  getStatusBadgeColor(): string {
    const statusColors: Record<PesananStatusType, string> = {
      [PesananStatus.MENUNGGU_PEMBAYARAN]: 'yellow',
      [PesananStatus.MENUNGGU_KONFIRMASI_PEMBAYARAN]: 'yellow',
      [PesananStatus.DIBAYAR]: 'blue',
      [PesananStatus.DIPROSES]: 'purple',
      [PesananStatus.SELESAI]: 'green',
      [PesananStatus.DIBATALKAN]: 'red',
      [PesananStatus.PEMBAYARAN_DIBATALKAN]: 'orange',
    }
    return statusColors[this.status_pesanan] || "gray"
  }

  getStatusLabel(): string {
    const labels: Record<PesananStatusType, string> = {
      [PesananStatus.MENUNGGU_PEMBAYARAN]: 'Menunggu Pembayaran',
      [PesananStatus.MENUNGGU_KONFIRMASI_PEMBAYARAN]: 'Menunggu Konfirmasi Pembayaran',
      [PesananStatus.DIBAYAR]: 'Dibayar',
      [PesananStatus.DIPROSES]: 'Diproses',
      [PesananStatus.SELESAI]: 'Selesai',
      [PesananStatus.DIBATALKAN]: 'Dibatalkan',
      [PesananStatus.PEMBAYARAN_DIBATALKAN]: 'Pembayaran Dibatalkan',
    }
    return labels[this.status_pesanan] || this.status_pesanan
  }

  canTransitionTo(newStatus: PesananStatusType): boolean {
    const transitions: Record<PesananStatusType, PesananStatusType[]> = {
      [PesananStatus.MENUNGGU_PEMBAYARAN]: [PesananStatus.MENUNGGU_KONFIRMASI_PEMBAYARAN, PesananStatus.DIBAYAR, PesananStatus.PEMBAYARAN_DIBATALKAN],
      [PesananStatus.MENUNGGU_KONFIRMASI_PEMBAYARAN]: [PesananStatus.DIBAYAR, PesananStatus.PEMBAYARAN_DIBATALKAN],
      [PesananStatus.DIBAYAR]: [PesananStatus.DIPROSES, PesananStatus.DIBATALKAN],
      [PesananStatus.DIPROSES]: [PesananStatus.SELESAI, PesananStatus.DIBATALKAN],
      [PesananStatus.SELESAI]: [],
      [PesananStatus.DIBATALKAN]: [],
      [PesananStatus.PEMBAYARAN_DIBATALKAN]: [
        PesananStatus.MENUNGGU_PEMBAYARAN,
      ],
    }
    return transitions[this.status_pesanan]?.includes(newStatus) ?? false
  }
}
