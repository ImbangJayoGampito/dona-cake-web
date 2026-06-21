export interface ProdukFilters {
  search?: string
  kategori?: string
  harga_min?: number
  harga_max?: number
  sort_by?: "nama_produk" | "harga" | "created_at" | "rating_rata_rata" | "stok"
  sort_order?: "asc" | "desc"
  per_page?: number
  page?: number
}
