import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useNavigate } from "react-router-dom"
import ShoppingCartButton from "@/components/produk/shopping-cart-button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Heart, ShoppingCart, Star, ChevronRight, Upload } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { AppHeader } from "@/components/layout/header"
import AppFooter from "@/components/layout/footer"
import { BreadCrumb } from "@/components/breadcrumb"
import { ProdukService } from "@/services/produk-service"
import { StarRating } from "@/components/produk/star_rating"
import { toast } from "sonner"
import { Produk } from "@/models/produk.model"
import {ProtectedRoutes} from "@/lib/routes"
import { UlasanService } from "@/services/ulasan-service"
import { Ulasan } from "@/models/ulasan.model"
import type { CreateUlasanPayload } from "@/types/ulasan.types"
import { ProductCard } from "@/components/produk/produk-card"
import { Gambar } from "@/models/gambar.model"
import ProtectedRoute from "@/components/layout/ProtectedRoute"
import { useAuthStore } from "@/lib/state/logged-user"
export default function ProductDetailPage() {
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(0)
  const [ulasans, setUlasans] = useState<Ulasan[]>([])
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState("reviews")
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [product, setProduct] = useState<Produk | undefined>(undefined)
  const [discountPercentage, setDiscountPercentage] = useState(0)
  const [similarProducts, setSimilarProducts] = useState<Produk[]>([])

  const id = useParams()
  useEffect(() => {
    if (id.id) {
      ProdukService.getProductById(parseInt(id.id)).then((product) => {
        setProduct(product.data)
      })
      UlasanService.getAllUlasanOnProdukId(parseInt(id.id)).then((ulasans) => {
        setUlasans(ulasans.data || [])
      })
      // we use recommendations instead because it hasn't been implemented yet
      ProdukService.getRecommendations().then((products) => {
        setSimilarProducts(products.data || [])
      })
    } else {
      setProduct(undefined)
      setUlasans([])
      // it's shitty for some reason
    }
  }, [id])

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta))
  }

  const handleStarClick = (rating: number) => {
    setReviewRating(rating)
  }
  const sendUlasan = async () => {
    /// Ulasan star rating can not be less than 1
    if (reviewRating < 1) {
      toast.error("Rating tidak valid")
      return
    }

    // Check if product doesn't exist and notify user
    if (!product) {
      toast.error("Produk tidak ditemukan")
      return
    }

    const payload: CreateUlasanPayload = {
      produk_id: product.id,
      rating: reviewRating,
      komentar: reviewText,
    }

    try {
      const response = await UlasanService.createUlasan(payload)
      if (response.isSuccess()) {
        toast.success("Ulasan berhasil dikirim")
        setReviewText("")
        setReviewRating(0)
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat mengirim ulasan dengan alasan: " + error
      )
    }
  }
  // Skeleton loading state
  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left: Gallery Skeleton */}
            <div className="space-y-4">
              <Skeleton className="aspect-[4/3] w-full rounded-lg" />
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-20 rounded-md" />
                ))}
              </div>
            </div>
            {/* Right: Info Skeleton */}
            <div className="space-y-5">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-9 w-3/4" />
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-8 w-36" />
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex gap-4 border-b pb-3">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-28" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <BreadCrumb
        items={[
          { displayName: "Home", path: "/" },
          { displayName: "Products", path: "/products" },
        ]}
        currentPage={product.nama_produk}
      />
      {/* Product Section */}
      <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left: Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border bg-muted">
              <img
                src={
                  product.gambars?.[selectedImage]?.gambar_url ??
                  new Gambar().gambar_url
                }
                alt={product.nama_produk}
                className="h-full w-full object-cover"
              />

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
              {product.gambars?.map((img, idx) => (
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
                    src={img.gambar_url}
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
                🎂 {product.kategori}
              </div>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                {product.nama_produk}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <StarRating rating={product.rating_rata_rata} />
              <span className="font-semibold">{product.rating_rata_rata}</span>
              <span className="text-muted-foreground">
                ({product.getUlasanCounts()} ulasan)
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">
                {ProdukService.formatPrice(
                  product.harga - (product.harga * discountPercentage) / 100
                )}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {ProdukService.formatPrice(product.harga)}
              </span>
              <span className="rounded-md bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">
                Hemat {discountPercentage}%
              </span>
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
{user && (
  <div className="flex gap-3">
    <ShoppingCartButton produk={product} />
    <Button
      onClick={() => navigate(ProtectedRoutes.Cart)}
      variant="outline"
      className="flex-1"
    >
      Keranjang Anda
    </Button>
  </div>
)}

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
              Ulasan ({product.getUlasanCounts()})
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
            <p>{product.deskripsi}</p>
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            <div className="grid gap-8 md:grid-cols-[1fr_360px]">
              {/* Left: Rating Summary & Reviews */}
              <div>
                {/* Rating Summary */}
                <div className="mb-6 flex items-center gap-4">
                  <div className="text-5xl font-bold">
                    {product.rating_rata_rata}
                  </div>
                  <div>
                    <StarRating rating={product.rating_rata_rata} />
                    <div className="mt-1 text-sm text-muted-foreground">
                      Berdasarkan {ulasans.length} ulasan
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
                  {ulasans.map((review) => (
                    <div
                      key={review.id}
                      className="border-b pb-5 last:border-0"
                    >
                      <div className="mb-1 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-xs">
                              {review.pelanggan?.user?.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {review.pelanggan?.user?.name}
                            </div>
                            <StarRating rating={review.rating} />
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {review.created_at.toDateString()}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground italic">
                        "{review.komentar}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Write Review Card */}
              {user && <Card className="sticky top-20">
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
                  <Button onClick={sendUlasan} className="w-full">
                    Kirim Ulasan
                  </Button>
                </CardContent>
              </Card>}
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
    </div>
  )
}
