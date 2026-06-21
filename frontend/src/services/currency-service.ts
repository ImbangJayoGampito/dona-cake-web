export class CurrencyService {
  /**
   * Format price as Indonesian Rupiah currency
   * @param price - Price in IDR
   * @returns Formatted price string (e.g., "Rp 1.000")
   */
  static formatPrice(price: number): string {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }
}