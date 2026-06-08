// config/booking.ts
import type { BookingPriceAdditional } from "@/types/booking.types"

export default class BookingConfig {
  static BASE_PRICE = 50000

  // SIZES as BookingPriceAdditional
  static SIZES: BookingPriceAdditional[] = [
    {
      id: "20cm",
      name: "20 cm",
      description: "Ukuran kecil, cocok untuk 4-6 orang",
      priceFunction: (price: number) => price + 0,
    },
    {
      id: "24cm",
      name: "24 cm",
      description: "Ukuran sedang, cocok untuk 8-10 orang",
      priceFunction: (price: number) => price + 25000,
    },
    {
      id: "28cm",
      name: "28 cm",
      description: "Ukuran besar, cocok untuk 12-16 orang",
      priceFunction: (price: number) => price + 50000,
    },
    {
      id: "mini",
      name: "Mini",
      priceFunction: (price: number) => price - 10000,
      description: "Ukuran mini, cocok untuk 2-3 orang",
    },
    {
      id: "cupcake",
      name: "Cupcake",
      priceFunction: (price: number) => price - 15000,
      description: "Cupcake per pcs, cocok untuk individu",
    },
  ]

  // FLAVORS as BookingPriceAdditional
  static FLAVORS: BookingPriceAdditional[] = [
    {
      id: "coklat",
      name: "Coklat",
      priceFunction: (price: number) => price + 0,
      description: "Rasa coklat klasik yang lembut",
    },
    {
      id: "vanila",
      name: "Vanila",
      priceFunction: (price: number) => price + 0,
      description: "Rasa vanila yang harum",
    },
    {
      id: "red-velvet",
      name: "Red Velvet",
      priceFunction: (price: number) => price + 15000,
      description: "Red velvet dengan cream cheese",
    },
    {
      id: "pandan",
      name: "Pandan",
      priceFunction: (price: number) => price + 0,
      description: "Rasa pandan alami",
    },
    {
      id: "matcha",
      name: "Matcha",
      priceFunction: (price: number) => price + 20000,
      description: "Matcha Jepang premium",
    },
    {
      id: "lemon",
      name: "Lemon",
      priceFunction: (price: number) => price + 10000,
      description: "Segar dengan rasa lemon",
    },
    {
      id: "strawberry",
      name: "Strawberry",
      priceFunction: (price: number) => price + 12000,
      description: "Rasa strawberry segar",
    },
    {
      id: "blueberry",
      name: "Blueberry",
      priceFunction: (price: number) => price + 15000,
      description: "Rasa blueberry dengan potongan buah",
    },
  ]

  // FROSTINGS as BookingPriceAdditional
  static FROSTINGS: BookingPriceAdditional[] = [
    {
      id: "buttercream",
      name: "Buttercream",
      priceFunction: (price: number) => price + 0,
      description: "Buttercream lembut dan manis",
    },
    {
      id: "whipped-cream",
      name: "Whipped Cream",
      priceFunction: (price: number) => price + 0,
      description: "Whipped cream ringan tidak terlalu manis",
    },
    {
      id: "fondant",
      name: "Fondant",
      priceFunction: (price: number) => price + 30000,
      description: "Fondant halus untuk dekorasi detail",
    },
    {
      id: "ganache",
      name: "Ganache",
      priceFunction: (price: number) => price + 25000,
      description: "Ganache coklat premium",
    },
    {
      id: "cream-cheese",
      name: "Cream Cheese",
      priceFunction: (price: number) => price + 20000,
      description: "Cream cheese frosting asam manis",
    },
  ]

  // PACKAGINGS as BookingPriceAdditional
  static PACKAGINGS: BookingPriceAdditional[] = [
    {
      id: "standar",
      name: "Standar",
      priceFunction: (price: number) => price + 0,
      description: "Kotak karton putih tebal dengan pita satin",
    },
    {
      id: "gift",
      name: "Gift Box",
      priceFunction: (price: number) => price + 25000,
      description: "Kotak bermotif dengan kartu ucapan kustom",
    },
    {
      id: "premium",
      name: "Premium Box",
      priceFunction: (price: number) => price + 75000,
      description: "Acrylic box elegan dengan hiasan bunga kering",
    },
    {
      id: "eco-friendly",
      name: "Eco Friendly",
      priceFunction: (price: number) => price + 15000,
      description: "Box ramah lingkungan dari bahan daur ulang",
    },
  ]

  static TIME_SLOTS = ["08:00", "10:00", "13:00", "15:00"]

  static TEXT_COLORS = ["#fff", "#2d2016", "#c8a84b", "#e87ca0", "#2d6e3e"]

  static CALENDAR_DAYS = [
    [null, null, null, null, 1, 2, 3],
    [4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17],
    [18],
  ]

  // Helper methods
  static getSizeById(id: string): BookingPriceAdditional | undefined {
    return this.SIZES.find((s) => s.id === id)
  }

  static getFlavorById(id: string): BookingPriceAdditional | undefined {
    return this.FLAVORS.find((f) => f.id === id)
  }

  static getFrostingById(id: string): BookingPriceAdditional | undefined {
    return this.FROSTINGS.find((f) => f.id === id)
  }

  static getPackagingById(id: string): BookingPriceAdditional | undefined {
    return this.PACKAGINGS.find((p) => p.id === id)
  }

  // Price calculation methods
  static calculateSizePrice(sizeId: string): number {
    const size = this.getSizeById(sizeId)
    return (
      (size?.priceFunction(this.BASE_PRICE) || this.BASE_PRICE) -
      this.BASE_PRICE
    )
  }

  static calculateFlavorPrice(flavorIds: string[]): number {
    return flavorIds.reduce((total, id) => {
      const flavor = this.getFlavorById(id)
      return total + (flavor?.priceFunction(this.BASE_PRICE) || this.BASE_PRICE)
    }, 0)
  }

  static calculateFrostingPrice(frostingId: string): number {
    const frosting = this.getFrostingById(frostingId)
    return (
      (frosting?.priceFunction(this.BASE_PRICE) || this.BASE_PRICE) -
      this.BASE_PRICE
    )
  }

  static calculatePackagingPrice(packagingId: string): number {
    const packaging = this.getPackagingById(packagingId)
    return (
      (packaging?.priceFunction(this.BASE_PRICE) || this.BASE_PRICE) -
      this.BASE_PRICE
    )
  }

  static calculateTotalPrice(config: {
    size?: string
    flavors?: string[]
    frosting?: string
    theme?: string
    packaging?: string
  }): number {
    let total = this.BASE_PRICE

    if (config.size) {
      total += this.calculateSizePrice(config.size)
    }

    if (config.flavors) {
      total += this.calculateFlavorPrice(config.flavors)
    }

    if (config.frosting) {
      total += this.calculateFrostingPrice(config.frosting)
    }

    if (config.theme) {
      total += this.calculateThemePrice(config.theme)
    }

    if (config.packaging) {
      total += this.calculatePackagingPrice(config.packaging)
    }

    return total
  }

  static getPriceBreakdown(config: {
    size?: string
    flavors?: string[]
    frosting?: string
    theme?: string
    packaging?: string
  }): {
    base: number
    size: { id: string; name: string; price: number; priceLabel: string }
    flavors: { id: string; name: string; price: number; priceLabel: string }[]
    frosting: { id: string; name: string; price: number; priceLabel: string }
    theme: { id: string; name: string; price: number; priceLabel: string }
    packaging: { id: string; name: string; price: number; priceLabel: string }
    total: number
  } {
    const size = config.size ? this.getSizeById(config.size) : undefined
    const frosting = config.frosting
      ? this.getFrostingById(config.frosting)
      : undefined
    const theme = config.theme ? this.getThemeById(config.theme) : undefined
    const packaging = config.packaging
      ? this.getPackagingById(config.packaging)
      : undefined

    const flavorPrices =
      config.flavors?.map((id) => {
        const flavor = this.getFlavorById(id)
        return {
          id,
          name: flavor?.name || id,
          price: flavor?.price || 0,
          priceLabel: flavor?.priceLabel || "Standar",
        }
      }) || []

    const total = this.calculateTotalPrice(config)

    return {
      base: this.BASE_PRICE,
      size: {
        id: size?.id || "",
        name: size?.name || "Tidak dipilih",
        price: size?.price || 0,
        priceLabel: size?.priceLabel || "Standar",
      },
      flavors: flavorPrices,
      frosting: {
        id: frosting?.id || "",
        name: frosting?.name || "Tidak dipilih",
        price: frosting?.price || 0,
        priceLabel: frosting?.priceLabel || "Standar",
      },
      theme: {
        id: theme?.id || "",
        name: theme?.name || "Tidak dipilih",
        price: theme?.price || 0,
        priceLabel: theme?.priceLabel || "Standar",
      },
      packaging: {
        id: packaging?.id || "",
        name: packaging?.name || "Tidak dipilih",
        price: packaging?.price || 0,
        priceLabel: packaging?.priceLabel || "Standar",
      },
      total,
    }
  }
}
