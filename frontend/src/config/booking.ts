export default class BookingConfig {
  static BASE_PRICE = 50000
  static SIZES = ["20cm", "24cm", "28cm", "Mini", "Cupcake"]
  static FLAVORS = [
    "Coklat",
    "Vanila",
    "Red Velvet",
    "Pandan",
    "Matcha",
    "Lemon",
  ]
  static FROSTINGS = ["Buttercream", "Whipped Cream", "Fondant", "Ganache"]
  static CATEGORIES = [
    { id: "floral", label: "Floral", color: "bg-rose-500" },
    { id: "birthday", label: "Birthday", color: "bg-blue-500" },
    { id: "wedding", label: "Wedding", color: "bg- -500" },
    { id: "minimalist", label: "Minimalist", color: "bg-slate-500" },
  ]
  static ME_SLOTS = [
    "08:00 – 10:00",
    "10:00 – 12:00",
    "13:00 – 15:00",
    "15:00 – 17:00",
  ]
  static PACKAGINGS = [
    {
      id: "standar",
      label: "Standar",
      desc: "Kotak karton putih tebal dengan pita satin.",
      price: 0,
      priceLabel: "Free",
    },
    {
      id: "gift",
      label: "Gift Box",
      desc: "Kotak bermotif dengan kartu ucapan kustom.",
      price: 25000,
      priceLabel: "+Rp 25.000",
    },
    {
      id: "premium",
      label: "Premium Box",
      desc: "Acrylic box elegan dengan hiasan bunga kering.",
      price: 75000,
      priceLabel: "+Rp 75.000",
    },
  ]
  static TEXT_COLORS = ["#fff", "#2d2016", "#c8a84b", "#e87ca0", "#2d6e3e"]
  static CALENDAR_DAYS = [
    [null, null, null, null, 1, 2, 3],
    [4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17],
    [18],
  ]
}
