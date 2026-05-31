// models/user.model.ts
import { RoleEnum, type RoleEnum as RoleEnumType } from '@/types/enums'

export class User {
  id: number
  username: string
  name: string
  email: string
  role: RoleEnumType
  email_verified_at: Date | null
  created_at: Date
  updated_at: Date

  constructor(data: Partial<User>) {
    this.id = data.id ?? 0
    this.username = data.username ?? ''
    this.name = data.name ?? ''
    this.email = data.email ?? ''
    this.role = data.role ?? RoleEnum.User
    this.email_verified_at = data.email_verified_at ? new Date(data.email_verified_at) : null
    this.created_at = data.created_at ? new Date(data.created_at) : new Date()
    this.updated_at = data.updated_at ? new Date(data.updated_at) : new Date()
  }

  isAdmin(): boolean {
    return this.role === RoleEnum.Admin
  }

  isKaryawan(): boolean {
    return this.role === RoleEnum.Karyawan
  }

  isUser(): boolean {
    return this.role === RoleEnum.User
  }

  getDisplayName(): string {
    return this.name || this.username || this.email
  }
}