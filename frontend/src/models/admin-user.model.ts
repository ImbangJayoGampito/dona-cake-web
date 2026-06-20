import { RoleEnum, type RoleEnum as RoleEnumType } from "@/types/enums"

/**
 * Data profil pelanggan yang disertakan dalam response /admin/users.
 * Null jika user adalah admin atau karyawan (bukan pelanggan biasa).
 */
export class PelangganProfile {
  id: number
  user_id: number
  alamat: string | null
  no_telepon: string | null
  created_at: string
  updated_at: string

  constructor(data: Partial<PelangganProfile> = {}) {
    this.id = data.id ?? 0
    this.user_id = data.user_id ?? 0
    this.alamat = data.alamat ?? null
    this.no_telepon = data.no_telepon ?? null
    this.created_at = data.created_at ?? ""
    this.updated_at = data.updated_at ?? ""
  }
}

/**
 * Model user untuk kebutuhan panel admin. Berbeda dengan User model di
 * src/models/user.model.ts yang dipakai untuk sesi login.
 * Menyertakan field `pelanggan` (relasi nested) yang hanya ada di
 * response endpoint admin, bukan di /auth/me.
 *
 * Karena tidak ada field status di backend, kolom Status dihapus dari
 * tabel, dan hanya email_verified_at yang dipakai sebagai indikator.
 */
export class AdminUser {
  id: number
  username: string
  name: string
  email: string
  role: RoleEnumType
  email_verified_at: string | null
  created_at: string
  updated_at: string
  pelanggan: PelangganProfile | null

  constructor(data: Partial<AdminUser> = {}) {
    this.id = data.id ?? 0
    this.username = data.username ?? ""
    this.name = data.name ?? ""
    this.email = data.email ?? ""
    this.role = data.role ?? RoleEnum.User
    this.email_verified_at = data.email_verified_at ?? null
    this.created_at = data.created_at ?? ""
    this.updated_at = data.updated_at ?? ""
    this.pelanggan =
      data.pelanggan ? new PelangganProfile(data.pelanggan) : null
  }

  getDisplayName(): string {
    return this.name || this.username || this.email
  }

  getInitials(): string {
    const parts = this.getDisplayName().trim().split(/\s+/)
    return parts
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? "")
      .join("")
  }

  isVerified(): boolean {
    return this.email_verified_at !== null
  }

  isAdmin(): boolean { return this.role === RoleEnum.Admin }
  isKaryawan(): boolean { return this.role === RoleEnum.Karyawan }
  isPelanggan(): boolean { return this.role === RoleEnum.User }

  getVerifikasiLabel(): string {
    return this.isVerified() ? "Terverifikasi" : "Belum Verifikasi"
  }

  getTotalOrder(): number {
    // Field total_order tidak ada di response — returned 0 sebagai fallback.
    // TODO: konfirmasi ke backend apakah akan ditambahkan ke response.
    return 0
  }
}
