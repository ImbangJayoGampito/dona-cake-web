// models/notifikasi.model.ts
import { NotifikasiTipe, type NotifikasiTipe as NotifikasiTipeType } from '@/types/enums'

export class Notifikasi {
  id: number
  user_id: number
  judul: string
  pesan: string
  tipe: NotifikasiTipeType
  is_read: boolean
  notifiable_type: string | null
  notifiable_id: number | null
  created_at: Date
  updated_at: Date

  constructor(data: Partial<Notifikasi>) {
    this.id = data.id ?? 0
    this.user_id = data.user_id ?? 0
    this.judul = data.judul ?? ''
    this.pesan = data.pesan ?? ''
    this.tipe = data.tipe ?? NotifikasiTipe.SYSTEM
    this.is_read = data.is_read ?? false
    this.notifiable_type = data.notifiable_type ?? null
    this.notifiable_id = data.notifiable_id ?? null
    this.created_at = data.created_at ? new Date(data.created_at) : new Date()
    this.updated_at = data.updated_at ? new Date(data.updated_at) : new Date()
  }

  getFormattedDate(): string {
    const now = new Date()
    const diff = now.getTime() - this.created_at.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (minutes < 1) return 'Baru saja'
    if (minutes < 60) return `${minutes} menit lalu`
    if (hours < 24) return `${hours} jam lalu`
    if (days < 7) return `${days} hari lalu`
    
    return this.created_at.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  markAsRead(): void {
    this.is_read = true
  }
}