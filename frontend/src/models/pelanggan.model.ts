// models/pelanggan.model.ts
import { User } from './user.model'

export class Pelanggan {
  id: number
  user_id: number
  alamat: string | null
  no_telepon: string | null
  created_at: Date
  updated_at: Date
  
  // Relations (populated when needed)
  user?: User

  constructor(data: Partial<Pelanggan> = {}) {
    this.id = data.id ?? 0
    this.user_id = data.user_id ?? 0
    this.alamat = data.alamat ?? null
    this.no_telepon = data.no_telepon ?? null
    this.created_at = data.created_at ? new Date(data.created_at) : new Date()
    this.updated_at = data.updated_at ? new Date(data.updated_at) : new Date()
    
    if (data.user) {
      this.user = data.user instanceof User ? data.user : new User(data.user)
    }
  }

  getFullAddress(): string {
    return this.alamat || 'Alamat belum diisi'
  }

  getPhoneNumber(): string {
    return this.no_telepon || 'No. telepon belum diisi'
  }

  hasAddress(): boolean {
    return !!this.alamat
  }

  hasPhone(): boolean {
    return !!this.no_telepon
  }

  isProfileComplete(): boolean {
    return this.hasAddress() && this.hasPhone()
  }
}