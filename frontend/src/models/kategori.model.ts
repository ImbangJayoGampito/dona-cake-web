export default class Kategori {
  id: number
  nama_kategori: string
  slug: string
  deskripsi: string | null
  is_active: boolean
  created_at?: string
  updated_at?: string
  public constructor(data: Partial<Kategori> = {}) {
    this.id = data.id ?? 0
    this.nama_kategori = data.nama_kategori ?? ""
    this.slug = data.slug ?? ""
    this.deskripsi = data.deskripsi ?? null
    this.is_active = data.is_active ?? false
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
}