import { useEffect, useState, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import Kategori from "@/models/kategori.model"
import ShoppingCartButton from "@/components/produk/shopping-cart-button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Search,
  LayoutGrid,
  List,
  Star,
  ShoppingBag,
  Phone,
  X,
} from "lucide-react"
import GambarService from "@/services/gambar-service"
import { KategoriService } from "@/services/kategori-service"
import { ProdukService } from "@/services/produk-service"
import HistoriAktivitasService from "@/services/histori-aktivitas-service"
import { AktivitasJenis } from "@/types/enums"
import type { Produk } from "@/models/produk.model"
import type { ProdukFilters } from "@/types/produk.types"

// ─── HeroSearch ──────────────────────────────────────────────────────────────
interface HeroSearchProps {
  query: string
  setQuery: (query: string) => void
  onSearch: () => void
}

function HeroSearch({ query, setQuery, onSearch }: HeroSearchProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onSearch()
  }

  return (
    <div
      className="relative py-10 text-center"
      style={{
        background:
          "linear-gradient(135deg, #3b1f0e 0%, #7c4a1e 50%, #c8a06a 100%)",
      }}
    >
      <h1 className="mb-6 text-3xl font-semibold tracking-wide text-white">
        Katalog Kue Dona Cake
      </h1>
      <div className="mx-auto flex max-w-md items-center gap-2 overflow-hidden rounded-lg bg-background px-3 shadow-md">
        <Search size={16} className="shrink-0 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Cari nama kue..."
          className="flex-1 border-0 px-0 text-sm shadow-none focus-visible:ring-0"
        />
        <Button
          size="sm"
          className="h-8 bg-primary px-4 text-xs text-primary-foreground hover:bg-primary/90"
          onClick={onSearch}
        >
          Cari
        </Button>
      </div>
    </div>
  )
}

// ─── FilterSidebar ───────────────────────────────────────────────────────────
interface FilterSidebarProps {
  categories: Kategori[]
  selectedCats: string[]
  toggleCat: (categoryName: string) => void
  onlyStock: boolean
  setOnlyStock: (onlyStock: boolean) => void
  onApply: () => void
  onReset: () => void
}

function FilterSidebar({
  categories,
  selectedCats,
  toggleCat,
  onlyStock,
  setOnlyStock,
  onApply,
  onReset,
}: FilterSidebarProps) {
  return (
    <Card className="w-full shadow-sm">
      <CardContent className="space-y-5 pt-5">
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-foreground">Filter</span>
          <button
            onClick={onReset}
            className="text-xs font-medium text-destructive hover:text-destructive/80"
          >
            Reset Semua
          </button>
        </div>

        <Separator />

        <div>
          <p className="mb-3 text-[10px] font-semibold tracking-widest text-muted-foreground">
            KATEGORI
          </p>
          <div className="space-y-2.5">
            {categories.map((cat) => (
              <div key={cat.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={cat.nama_kategori.toString()}
                    checked={selectedCats.includes(cat.nama_kategori)}
                    onCheckedChange={() => toggleCat(cat.nama_kategori)}
                  />
                  <Label
                    htmlFor={cat.nama_kategori.toString()}
                    className="cursor-pointer text-sm text-foreground"
                  >
                    {cat.nama_kategori}
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <p className="mb-3 text-[10px] font-semibold tracking-widest text-muted-foreground">
            KETERSEDIAAN
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm text-foreground">Hanya Stok Tersedia</Label>
              <Switch
                checked={onlyStock}
                onCheckedChange={setOnlyStock}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          </div>
        </div>

        <Separator />

        <Button onClick={onApply} className="w-full">
          Terapkan Filter
        </Button>
      </CardContent>
    </Card>
  )
}

// ─── Product Card ────────────────────────────────────────────────────────────
interface ProductCardProps {
  product: Produk
  view: "list" | "grid"
}

function ProductCard({ product, view }: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null)
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    const gambarUtamaId = product.gambarUtama?.id

    if (gambarUtamaId && gambarUtamaId > 0) {
      GambarService.getPublicFile(gambarUtamaId)
        .then((blob) => {
          if (!cancelled) {
            setImgSrc(URL.createObjectURL(blob))
            setImgLoaded(true)
          }
        })
        .catch(() => {
          // Fallback: image failed to load
          if (!cancelled) {
            setImgLoaded(false)
          }
        })
    }

    return () => {
      cancelled = true
    }
  }, [product.gambarUtama?.id])

  const showImage = imgSrc !== null && imgLoaded

  if (view === "list") {
    return (
      <Card className="shadow-sm transition-shadow hover:shadow-md">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted">
            {showImage ? (
              <img
                src={imgSrc!}
                alt={product.nama_produk}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-4xl">🎂</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">
              {product.nama_produk}
            </p>
            <div className="mt-0.5 flex items-center gap-1">
              <Star size={11} className="fill-yellow-500 text-yellow-500" />
              <span className="text-xs font-medium text-foreground">
                {product.rating_rata_rata || 0}
              </span>
              <span className="text-xs text-muted-foreground">
                ({product.ulasans?.length ?? 0})
              </span>
            </div>
            <div className="mt-1">
              <span className="text-base font-bold text-primary">
                {ProdukService.formatPrice(product.harga)}
              </span>
            </div>
          </div>
          <div className="shrink-0">
            {product.isInStock() ? (
              <div className="flex items-center justify-center">
                <ShoppingCartButton produk={product} />
              </div>
            ) : (
              <Button size="sm" variant="outline" className="gap-1 text-xs">
                <Phone size={13} /> Hubungi Admin
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-muted">
        {showImage ? (
          <img
            src={imgSrc!}
            alt={product.nama_produk}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-7xl">🎂</span>
        )}
        {!product.isInStock() && (
          <div className="absolute inset-0 flex items-center justify-center rounded-t-lg bg-black/40">
            <span className="rounded bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
              STOK HABIS
            </span>
          </div>
        )}
      </div>

      <CardContent className="space-y-2 p-3">
        <p className="line-clamp-2 text-sm leading-tight font-semibold text-foreground">
          {product.nama_produk}
        </p>
        <div className="flex items-center gap-1">
          <Star size={12} className="fill-yellow-500 text-yellow-500" />
          <span className="text-xs font-medium text-foreground">
            {product.rating_rata_rata || 0}
          </span>
          <span className="text-xs text-muted-foreground">
            ({product.ulasans?.length ?? 0})
          </span>
        </div>
        <div>
          <p className="text-base font-bold text-primary">
            {ProdukService.formatPrice(product.harga)}
          </p>
        </div>

        {product.isInStock() ? (
          <ShoppingCartButton produk={product} />
        ) : (
          <Button size="sm" variant="outline" className="w-full gap-1.5 text-xs">
            <Phone size={13} /> Hubungi Admin
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

// ─── Skeleton Components ─────────────────────────────────────────────────────
const ProductCardSkeleton = ({ view }: { view: "grid" | "list" }) => {
  if (view === "list") {
    return (
      <Card className="shadow-sm">
        <CardContent className="flex items-center gap-4 p-4">
          <Skeleton className="h-20 w-20 shrink-0 rounded-xl" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
          <Skeleton className="h-8 w-20" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden shadow-sm">
      <Skeleton className="h-44 w-full" />
      <CardContent className="space-y-2 p-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-8 w-full" />
      </CardContent>
    </Card>
  )
}

const FilterSidebarSkeleton = () => (
  <Card className="w-full shadow-sm">
    <CardContent className="space-y-5 pt-5">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Separator />
      <div>
        <Skeleton className="mb-3 h-4 w-20" />
        <div className="space-y-2.5">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
        </div>
      </div>
      <Separator />
      <div>
        <Skeleton className="mb-3 h-4 w-28" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-5 w-10" />
        </div>
      </div>
      <Separator />
      <Skeleton className="h-9 w-full" />
    </CardContent>
  </Card>
)

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function DonaCakeKatalog() {
  // ─── State ────────────────────────────────────────────────────────────────
  const [products, setProducts] = useState<Produk[]>([])
  const [categories, setCategories] = useState<Kategori[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalProducts, setTotalProducts] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCats, setSelectedCats] = useState<string[]>([])
  const [onlyStock, setOnlyStock] = useState(false)
  const [sort, setSort] = useState("terpopuler")

  const [view, setView] = useState<"grid" | "list">("grid")
  const [recommendations, setRecommendations] = useState<Produk[]>([])
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false)

  // ─── Sort Helpers ──────────────────────────────────────────────────────────
  const getSortConfig = (sortValue: string) => {
    const map: Record<
      string,
      { sort_by: ProdukFilters["sort_by"]; sort_order: "asc" | "desc" }
    > = {
      terpopuler: { sort_by: "created_at", sort_order: "desc" },
      termurah: { sort_by: "harga", sort_order: "asc" },
      termahal: { sort_by: "harga", sort_order: "desc" },
      terbaru: { sort_by: "created_at", sort_order: "desc" },
      rating: { sort_by: "rating_rata_rata", sort_order: "desc" },
    }
    return map[sortValue] || map.terpopuler
  }

  // ─── Fetch Categories ──────────────────────────────────────────────────────
  useEffect(() => {
    const fetchCategories = async () => {
      const result = await KategoriService.getAllKategori()
      setCategories(result.data ?? [])
    }
    fetchCategories()
  }, [])

  // ─── Fetch Products ──────────────────────────────────────────────────────
  const fetchProducts = useCallback(async () => {
    setIsLoading(true)
    try {
      const sortConfig = getSortConfig(sort)

      const filterParams: ProdukFilters = {
        page: currentPage,
        per_page: 20,
        search: searchQuery || undefined,
        sort_by: sortConfig.sort_by,
        sort_order: sortConfig.sort_order,
      }

      if (selectedCats.length > 0) {
        filterParams.kategori = selectedCats[0]
      }

      const result = await ProdukService.searchProducts(filterParams)

      if (result.status === "success" && result.data) {
        let productsData = result.data

        if (onlyStock) {
          productsData = productsData.filter((p: Produk) => p.stok > 0)
        }

        setProducts(productsData)
        setTotalProducts(result.pagination?.total || 0)
        setLastPage(result.pagination?.last_page || 1)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, searchQuery, selectedCats, sort, onlyStock])

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const toggleCat = (categoryName: string) => {
    setSelectedCats((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    )
  }

  const handleSearch = () => {
    setCurrentPage(1)
  }

  const handleApplyFilters = () => {
    setCurrentPage(1)
  }

  const handleResetFilters = () => {
    setSearchQuery("")
    setSelectedCats([])
    setOnlyStock(false)
    setSort("terpopuler")
    setCurrentPage(1)
  }

  const handleSortChange = (value: string) => {
    setSort(value)
    setCurrentPage(1)
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  // ─── Auto‑fetch ────────────────────────────────────────────────────────────
  useEffect(() => {
    fetchProducts()
  }, [currentPage, searchQuery, selectedCats, sort, onlyStock, fetchProducts])

  // ─── Fetch Recommendations ──────────────────────────────────────────────────
  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoadingRecommendations(true)
      try {
        const result = await ProdukService.getRecommendations()
        if (result.status === "success" && result.data) {
          setRecommendations(result.data)
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error)
      } finally {
        setIsLoadingRecommendations(false)
      }
    }

    fetchRecommendations()
  }, [])

  // ─── Log product views to Histori Aktivitas after cards are rendered ──────
  useEffect(() => {
    if (!isLoading && products.length > 0) {
      const activities = products.map((p) => ({
        produk: p,
        jenisAktivitas: AktivitasJenis.VIEW_PRODUCT,
      }))
      HistoriAktivitasService.createBatchActivities(activities).catch(() => {
        // Silent fail – activity logging should not disrupt the user experience
      })
    }
  }, [products, isLoading])

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <HeroSearch
        query={searchQuery}
        setQuery={setSearchQuery}
        onSearch={handleSearch}
      />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <div className="flex flex-col items-start gap-6 md:grid md:grid-cols-[220px_1fr]">
          {/* Sidebar */}
          <div className="order-1 md:sticky md:top-20 md:order-none">
            {isLoading ? (
              <FilterSidebarSkeleton />
            ) : (
              <FilterSidebar
                categories={categories}
                selectedCats={selectedCats}
                toggleCat={toggleCat}
                onlyStock={onlyStock}
                setOnlyStock={setOnlyStock}
                onApply={handleApplyFilters}
                onReset={handleResetFilters}
              />
            )}
          </div>

          {/* Product area */}
          <div className="order-2 space-y-4 md:order-none">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                {isLoading ? (
                  <>
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-32" />
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-foreground">
                      Menampilkan{" "}
                      <span className="font-semibold">{products.length}</span>{" "}
                      dari <span className="font-semibold">{totalProducts}</span>{" "}
                      produk
                    </p>
                    {(selectedCats.length > 0 || onlyStock || searchQuery) && (
                      <div className="flex flex-wrap gap-1">
                        {searchQuery && (
                          <Badge variant="secondary" className="text-xs">
                            "{searchQuery}"
                            <button
                              onClick={() => setSearchQuery("")}
                              className="ml-1 hover:text-destructive"
                            >
                              <X size={12} />
                            </button>
                          </Badge>
                        )}
                        {selectedCats.map((cat) => (
                          <Badge key={cat} variant="secondary" className="text-xs">
                            {cat}
                            <button
                              onClick={() => toggleCat(cat)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X size={12} />
                            </button>
                          </Badge>
                        ))}
                        {onlyStock && (
                          <Badge variant="secondary" className="text-xs">
                            Stok Tersedia
                            <button
                              onClick={() => setOnlyStock(false)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X size={12} />
                            </button>
                          </Badge>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                {isLoading ? (
                  <Skeleton className="h-8 w-36" />
                ) : (
                  <Select value={sort} onValueChange={handleSortChange}>
                    <SelectTrigger className="h-8 w-36 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="terpopuler">Terpopuler</SelectItem>
                      <SelectItem value="termurah">Termurah</SelectItem>
                      <SelectItem value="termahal">Termahal</SelectItem>
                      <SelectItem value="terbaru">Terbaru</SelectItem>
                      <SelectItem value="rating">Rating Tertinggi</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                <div className="flex overflow-hidden rounded-md border">
                  <button
                    onClick={() => setView("grid")}
                    className={`p-1.5 transition-colors ${
                      view === "grid"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    <LayoutGrid size={15} />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`p-1.5 transition-colors ${
                      view === "list"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    <List size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Recommendations Section */}
            {!isLoadingRecommendations && recommendations.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">Rekomendasi untuk Anda</h2>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  {recommendations.slice(0, 4).map((product) => (
                    <ProductCard key={`rec-${product.id}`} product={product} view="grid" />
                  ))}
                </div>
              </div>
            )}

            {/* Product grid / list with skeletons */}
            {isLoading ? (
              view === "grid" ? (
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  {Array(8)
                    .fill(0)
                    .map((_, i) => (
                      <ProductCardSkeleton key={i} view="grid" />
                    ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <ProductCardSkeleton key={i} view="list" />
                    ))}
                </div>
              )
            ) : (
              <>
                {view === "grid" ? (
                  <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {products.map((p) => (
                      <ProductCard key={p.id} product={p} view="grid" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {products.map((p) => (
                      <ProductCard key={p.id} product={p} view="list" />
                    ))}
                  </div>
                )}
                {products.length === 0 && !isLoading && (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">
                      Tidak ada produk yang ditemukan
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Pagination */}
            {totalProducts > 0 && (
              <div className="pt-4">
                {isLoading ? (
                  <div className="flex justify-center gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                ) : (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            if (currentPage > 1) handlePageChange(currentPage - 1)
                          }}
                          className={
                            currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                          }
                        />
                      </PaginationItem>

                      {Array.from(
                        { length: Math.min(3, lastPage) },
                        (_, i) => i + 1
                      ).map((n) => (
                        <PaginationItem key={n}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              handlePageChange(n)
                            }}
                            isActive={currentPage === n}
                          >
                            {n}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      {lastPage > 3 && (
                        <>
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault()
                                handlePageChange(lastPage)
                              }}
                            >
                              {lastPage}
                            </PaginationLink>
                          </PaginationItem>
                        </>
                      )}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            if (currentPage < lastPage) {
                              handlePageChange(currentPage + 1)
                            }
                          }}
                          className={
                            currentPage >= lastPage
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}