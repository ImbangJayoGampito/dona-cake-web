// ulasan.types.ts
// Types related to Ulasan (Product Reviews)

/** Payload for creating a new review — matches backend UlasanRequest validation */
export interface CreateUlasanPayload {
  produk_id: number
  rating: number
  komentar: string | null
}

/** Payload for updating an existing review — matches backend UlasanRequest rules (rating, komentar only) */
export interface UpdateUlasanPayload {
  rating: number
  komentar: string | null
}
