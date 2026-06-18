import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import Kategori from "@/models/kategori.model"
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
  ShoppingCart,
  User,
  Search,
  LayoutGrid,
  List,
  Star,
  ShoppingBag,
  Globe,
  Share2,
  X,
  Phone,
} from "lucide-react"
import { KategoriService } from "@/services/kategori-service"
import { ProdukService } from "@/services/produk-service"
import type { Produk } from "@/models/produk.model"
interface HeroSearchProps {
  query: string
  setQuery: (query: string) => void
}
function HeroSearch({ query, setQuery }: HeroSearchProps) {
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
          placeholder="Cari nama kue..."
          className="flex-1 border-0 px-0 text-sm shadow-none focus-visible:ring-0"
        />
        <Button
          size="sm"
          className="h-8 bg-primary px-4 text-xs text-primary-foreground hover:bg-primary/90"
        >
          Cari
        </Button>
      </div>
    </div>
  )
}
interface FilterSidebarProps {
  selectedCats: Kategori[]
  toggleCat: (cat: Kategori) => void
  onlyStock: boolean
  setOnlyStock: (onlyStock: boolean) => void




  onApply: () => void
  onReset: () => void
}
function FilterSidebar({
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
          <span className="text-base font-semibold text-foreground">
            Filter
          </span>
          <button
            onClick={onReset}
            className="text-xs font-medium text-destructive hover:text-destructive/80"
          >
            Reset Semua
          </button>
        </div>

        <Separator />

        {/* Kategori */}
        <div>
          <p className="mb-3 text-[10px] font-semibold tracking-widest text-muted-foreground">
            KATEGORI
          </p>
          <div className="space-y-2.5">
            {selectedCats.map((c) => (
              <div key={c.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={c.nama_kategori.toString()}
                    checked={selectedCats.includes(c)}
                    onCheckedChange={() => toggleCat(c)}
                  />
                  <Label
                    htmlFor={c.nama_kategori.toString()}
                    className="cursor-pointer text-sm text-foreground"
                  >
                    {c.nama_kategori}
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Ketersediaan */}
        <div>
          <p className="mb-3 text-[10px] font-semibold tracking-widest text-muted-foreground">
            KETERSEDIAAN
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm text-foreground">
                Hanya Stok Tersedia
              </Label>
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

// ─── Product Card ─────────────────────────────────────────────────────────────
interface ProductCardProps {
  product: Produk
  view: "list" | "grid"
}
function ProductCard({ product, view }: ProductCardProps) {
  if (view === "list") {
    return (
      <Card className="shadow-sm transition-shadow hover:shadow-md">
        <CardContent className="flex items-center gap-4 p-4">
          <div
            className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-xl text-4xl`}
          >
            🎂
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-2"></div>
            <p className="truncate text-sm font-semibold text-foreground">
              {product.nama_produk}
            </p>
            <div className="mt-0.5 flex items-center gap-1">
              <Star size={11} className="fill-yellow-500 text-yellow-500" />
              <span className="text-xs font-medium text-foreground">
                {product.rating_rata_rata}
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
              <Button size="sm" className="gap-1">
                <ShoppingBag size={13} /> Tambah
              </Button>
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
      {/* Image area */}
      <div className={`relative flex h-44 items-center justify-center`}>
        <span className="text-7xl">🎂</span>

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
            {product.rating_rata_rata}
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
          <Button
            size="sm"
            variant="secondary"
            className="w-full gap-1.5 text-xs font-medium"
          >
            <ShoppingBag size={13} /> Tambah ke Keranjang
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            className="w-full gap-1.5 text-xs"
          >
            <Phone size={13} /> Hubungi Admin
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DonaCakeKatalog() {
  const [query, setQuery] = useState("")
  const [view, setView] = useState("grid")
  const [sort, setSort] = useState("terpopuler")
  const [selectedCats, setSelectedCats] = useState<Kategori[]>([])
  const [kategori, setKategori] = useState<Kategori[]>([])
  const [onlyStock, setOnlyStock] = useState(false)
  const [promo, setPromo] = useState(false)
  const [produk, setProduk] = useState<Produk[]>([])

  useEffect(() => {
    const fetchKategori = async () => {
      const result = await KategoriService.getAllKategori()
      setKategori(result.data ?? [])
    }
    fetchKategori()
  }, [])
  const [activeTags, setActiveTags] = useState([])
  const [page, setPage] = useState(1)

  const toggleCat = (cat: Kategori) => {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const handleReset = () => {
    setSelectedCats([])
    setOnlyStock(false)
    setPromo(false)

    setActiveTags([])
  }

  const filteredProducts = produk.filter((p) => {
    if (query && !p.nama_produk.toLowerCase().includes(query.toLowerCase()))
      return false
    if (onlyStock && !p.isInStock()) return false
    return true
  })

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <HeroSearch query={query} setQuery={setQuery} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        {/*
          Mobile:  single column, filter (order-1) sits above products (order-2)
          Desktop: two-column grid, filter left / products right via md:order reset
        */}
        <div className="flex flex-col items-start gap-6 md:grid md:grid-cols-[220px_1fr]">
          {/* Sidebar — order-1 on mobile keeps it above products */}
          <div className="order-1 md:sticky md:top-20 md:order-none">
            <FilterSidebar
              selectedCats={selectedCats}
              toggleCat={toggleCat}
              onlyStock={onlyStock}
              setOnlyStock={setOnlyStock}


              onApply={() => {}}
              onReset={handleReset}
            />
          </div>

          {/* Product area — order-2 on mobile sits below filter */}
          <div className="order-2 space-y-4 md:order-none">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  Menampilkan{" "}
                  <span className="font-semibold">
                    {filteredProducts.length * 4}
                  </span>{" "}
                  dari <span className="font-semibold">240</span> produk
                </p>

              </div>

              <div className="flex items-center gap-2">
                <Select value={sort} onValueChange={setSort}>
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
                <div className="flex overflow-hidden rounded-md border">
                  <button
                    onClick={() => setView("grid")}
                    className={`p-1.5 transition-colors ${view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}
                  >
                    <LayoutGrid size={15} />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`p-1.5 transition-colors ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}
                  >
                    <List size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Grid / List */}
            {view === "grid" ? (
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} view="grid" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} view="list" />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="pt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setPage((p) => Math.max(1, p - 1))
                      }}
                      className="text-foreground hover:text-foreground"
                    />
                  </PaginationItem>
                  {[1, 2, 3].map((n) => (
                    <PaginationItem key={n}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setPage(n)
                        }}
                        isActive={page === n}
                        className={
                          page === n
                            ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                            : "text-foreground"
                        }
                      >
                        {n}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationEllipsis className="text-muted-foreground" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setPage(10)
                      }}
                      className="text-foreground"
                    >
                      10
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setPage((p) => Math.min(10, p + 1))
                      }}
                      className="text-foreground hover:text-foreground"
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}
