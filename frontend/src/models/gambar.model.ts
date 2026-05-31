// models/gambar.model.ts

export class Gambar {
  id: number
  gambar_url: string
  gambar_alt: string | null
  gambar_title: string | null
  path: string
  gambarable_type: string
  gambarable_id: number
  created_at: Date
  updated_at: Date

  constructor(data: Partial<Gambar> = {}) {
    this.id = data.id ?? 0
    this.gambar_url = data.gambar_url ?? ""
    this.gambar_alt = data.gambar_alt ?? null
    this.gambar_title = data.gambar_title ?? null
    this.path = data.path ?? ""
    this.gambarable_type = data.gambarable_type ?? ""
    this.gambarable_id = data.gambarable_id ?? 0
    this.created_at = data.created_at ? new Date(data.created_at) : new Date()
    this.updated_at = data.updated_at ? new Date(data.updated_at) : new Date()
  }

  getFullUrl(): string {
    // If already has full URL
    if (this.gambar_url.startsWith("http")) {
      return this.gambar_url
    }
    // Otherwise, assume it needs base URL
    const baseUrl = import.meta.env.VITE_API_URL?.replace("/api", "") || ""
    return `${baseUrl}${this.gambar_url}`
  }

  getAltText(): string {
    return this.gambar_alt || this.gambar_title || "Gambar"
  }

  getTitle(): string {
    return this.gambar_title || this.gambar_alt || "Image"
  }
}
