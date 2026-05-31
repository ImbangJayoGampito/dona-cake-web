import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Heart, ShoppingCart, Star, ChevronRight, Upload } from "lucide-react"
import { Link } from "react-router-dom"
import { AppHeader } from "@/components/layout/header"
import AppFooter from "@/components/layout/footer"
import { BreadCrumb } from "@/components/breadcrumb"
// --- Product Data ---
const product = {
  id: 1,
  name: "Rainbow Delight Cake",
  category: "Kue Ulang Tahun",
  rating: 4.8,
  reviewCount: 120,
  price: 285000,
  originalPrice: 350000,
  discount: 18,
  badge: "Terlaris",
  images: [
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
    "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=600&q=80",
    "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&q=80",
    "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80",
  ],
  sizes: ["Loyang 20cm", "Loyang 24cm", "Loyang 28cm"],
  flavors: ["Coklat", "Vanilla", "Red Velvet"],
  description:
    "Rainbow Delight Cake adalah mahakarya kue berlapis penuh warna yang akan membuat momen ulang tahun semakin istimewa. Dibuat dengan teknik layer cake premium menggunakan bahan-bahan berkualitas tinggi, setiap potongan mengungkapkan keindahan pelangi yang memukau. Tekstur lembut dan rasa vanilla yang khas menjadikan kue ini favorit semua kalangan usia.",
  ingredients:
    "Mengandung: Tepung terigu, telur, mentega, gula, susu, pewarna makanan food-grade. Alergen: Gluten, produk susu, telur. Tidak mengandung kacang. Cocok untuk vegetarian.",
}

const similarProducts = [
  {
    id: 2,
    collection: "CLASSIC COLLECTION",
    name: "Velvet Rose Cake",
    price: 320000,
    image:
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300&q=70",
  },
  {
    id: 3,
    collection: "PREMIUM OCCASIONS",
    name: "Golden Truffle Cake",
    price: 450000,
    image:
      "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=300&q=70",
  },
  {
    id: 4,
    collection: "FRESH & FRUIT",
    name: "Berry Bliss Cheesecake",
    price: 275000,
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&q=70",
  },
  {
    id: 5,
    collection: "ARTISAN TEA SERIES",
    name: "Earl Grey Lavender",
    price: 310000,
    image:
      "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=300&q=70",
  },
]

const reviews = [
  {
    id: 1,
    name: "Amanda Saputri",
    rating: 5,
    date: "2 hari yang lalu",
    text: "Kuenya cantik banget buat ulang tahun keponakan. Rasanya pas, nggak terlalu manis yang bikin eneg. Teksturnya lembut banget!",
    hasPhoto: true,
  },
  {
    id: 2,
    name: "Budi Pratama",
    rating: 5,
    date: "1 minggu yang lalu",
    text: "Pengiriman aman banget, kurirnya sopan. Kuenya utuh sampe rumah. Mantap lah pokoknya.",
    hasPhoto: false,
  },
  {
    id: 3,
    name: "Rina Novitasari",
    rating: 4,
    date: "2 minggu yang lalu",
    text: "Kuenya enak banget! Tampilannya juga cantik sesuai foto. Highly recommended buat hadiah ulang tahun.",
    hasPhoto: false,
  },
]

// Helper
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price)
}

// StarRating component
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 !== 0
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < fullStars
              ? "fill-primary text-primary"
              : i === fullStars && hasHalf
                ? "fill-primary/50 text-primary"
                : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  )
}

// ProductCard component for similar products
const ProductCard = ({ product }: { product: (typeof similarProducts)[0] }) => (
  <Card className="overflow-hidden transition-all hover:shadow-md">
    <div className="relative aspect-square overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
      >
        <Heart className="h-4 w-4" />
      </Button>
    </div>
    <CardContent className="p-4">
      <div className="mb-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {product.collection}
      </div>
      <h3 className="mb-1 line-clamp-1 font-semibold">{product.name}</h3>
      <div className="font-bold">{formatPrice(product.price)}</div>
    </CardContent>
  </Card>
)

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.sizes[1])
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors[1])
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState("reviews")
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewText, setReviewText] = useState("")

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta))
  }

  const handleStarClick = (rating: number) => {
    setReviewRating(rating)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation - simplified for example */}
      <AppHeader />

      {/* Breadcrumb */}
      <BreadCrumb
        items={[
          { displayName: "Home", path: "/" },
          { displayName: "Products", path: "/products" },
        ]}
        currentPage="Laptop X1"
      />
      {/* Product Section */}
      <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left: Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border bg-muted">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 rounded bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground">
                  {product.badge}
                </span>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart
                  className={`h-5 w-5 ${isWishlisted ? "fill-destructive text-destructive" : ""}`}
                />
              </Button>
            </div>
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                    selectedImage === idx
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img
                    src={img}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-5">
            <div>
              <div className="mb-2 inline-flex items-center rounded-md bg-muted px-2.5 py-0.5 text-xs font-medium">
                🎂 {product.category}
              </div>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} />
              <span className="font-semibold">{product.rating}</span>
              <span className="text-muted-foreground">
                ({product.reviewCount} ulasan)
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="rounded-md bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">
                Hemat {product.discount}%
              </span>
            </div>

            {/* Size Selection */}
            <div>
              <Label className="text-sm font-semibold">Ukuran Loyang</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Flavor Selection */}
            <div>
              <Label className="text-sm font-semibold">Pilihan Rasa</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.flavors.map((flavor) => (
                  <Button
                    key={flavor}
                    variant={selectedFlavor === flavor ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFlavor(flavor)}
                  >
                    {flavor}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <Label className="text-sm font-semibold">Jumlah</Label>
              <div className="mt-2 flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-r-none"
                  onClick={() => handleQuantityChange(-1)}
                >
                  -
                </Button>
                <div className="flex h-9 w-12 items-center justify-center border-y text-center">
                  {quantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-l-none"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button className="flex-1 gap-2">
                <ShoppingCart className="h-4 w-4" />
                Tambah ke Keranjang
              </Button>
              <Button variant="outline" className="flex-1">
                Pesan Sekarang
              </Button>
            </div>

            {/* Accordions */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="quality">
                <AccordionTrigger>🛡️ Terjamin Kualitasnya</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Setiap kue dibuat dengan bahan premium pilihan dan dijamin
                  segar. Kami menggunakan bahan-bahan alami tanpa pengawet
                  buatan. Kepuasan pelanggan adalah prioritas utama kami.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="ingredients">
                <AccordionTrigger>📋 Bahan &amp; Alergen</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {product.ingredients}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Tabs Section */}
      <div className="container mx-auto px-4 md:px-6">
        <Tabs
          defaultValue="reviews"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-6 h-auto w-full justify-start gap-0 rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-foreground"
            >
              Deskripsi
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-foreground"
            >
              Ulasan ({product.reviewCount})
            </TabsTrigger>
            <TabsTrigger
              value="similar"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-foreground"
            >
              Produk Serupa
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="description"
            className="mt-4 max-w-2xl text-muted-foreground"
          >
            <p>{product.description}</p>
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            <div className="grid gap-8 md:grid-cols-[1fr_360px]">
              {/* Left: Rating Summary & Reviews */}
              <div>
                {/* Rating Summary */}
                <div className="mb-6 flex items-center gap-4">
                  <div className="text-5xl font-bold">{product.rating}</div>
                  <div>
                    <StarRating rating={product.rating} />
                    <div className="mt-1 text-sm text-muted-foreground">
                      Berdasarkan {product.reviewCount} ulasan
                    </div>
                  </div>
                </div>

                {/* Rating Bars (simplified) */}
                <div className="mb-8 space-y-1">
                  {[5, 4, 3, 2, 1].map((star) => {
                    let percentage = 0
                    if (star === 5) percentage = 85
                    else if (star === 4) percentage = 10
                    else if (star === 3) percentage = 3
                    else if (star === 2) percentage = 1
                    else percentage = 1
                    return (
                      <div
                        key={star}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span className="w-3">{star}</span>
                        <div className="h-1.5 flex-1 rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="w-8 text-muted-foreground">
                          {percentage}%
                        </span>
                      </div>
                    )
                  })}
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b pb-5 last:border-0"
                    >
                      <div className="mb-1 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-xs">
                              {review.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{review.name}</div>
                            <StarRating rating={review.rating} />
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {review.date}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground italic">
                        "{review.text}"
                      </p>
                      {review.hasPhoto && (
                        <div className="mt-3 flex h-14 w-14 items-center justify-center rounded-md bg-muted">
                          <span className="text-2xl">🎂</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Write Review Card */}
              <Card className="sticky top-20">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold">Tulis Ulasanmu</h3>
                  <div className="mb-4">
                    <Label className="mb-1 block text-xs text-muted-foreground">
                      Penilaianmu
                    </Label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          className="text-2xl focus:outline-none"
                          onClick={() => handleStarClick(star)}
                        >
                          <Star
                            className={`h-6 w-6 ${
                              star <= reviewRating
                                ? "fill-primary text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <Label
                      htmlFor="review"
                      className="mb-1 block text-xs text-muted-foreground"
                    >
                      Ulasan Anda
                    </Label>
                    <Textarea
                      id="review"
                      placeholder="Ceritakan pengalaman manismu..."
                      className="min-h-[90px]"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <Label className="mb-1 block text-xs text-muted-foreground">
                      Lampirkan Foto
                    </Label>
                    <div className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors hover:bg-muted/50">
                      <Upload className="mb-1 h-8 w-8 text-muted-foreground" />
                      <div className="text-xs text-muted-foreground">
                        Klik untuk upload atau tarik foto di sini
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">Kirim Ulasan</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="similar" className="mt-4">
            <p className="mb-6 text-muted-foreground">
              Temukan pilihan kue lainnya yang mungkin Anda sukai.
            </p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {similarProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Separator className="my-8" />

      {/* Similar Products Section (separate from tab) */}
      <div className="container mx-auto px-4 pb-8 md:px-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Produk Serupa</h2>
          <Button variant="link" className="gap-1">
            Lihat Semua <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <p className="mb-6 text-muted-foreground">
          Mungkin Anda juga akan menyukai pilihan kami lainnya.
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {similarProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
      <AppFooter />
    </div>
  )
}
