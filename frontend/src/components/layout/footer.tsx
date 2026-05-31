import { Globe, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AppFooter() {
  return (
    <footer className="mt-auto w-full border-t bg-card">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <span className="text-xl font-bold">Dona Cake</span>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Seni patisserie premium yang dikurasi khusus untuk melengkapi
              momen berharga dalam hidup Anda.
            </p>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <Globe size={18} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <Share2 size={18} />
              </Button>
            </div>
          </div>

          {/* Produk Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Produk</h4>
            <ul className="space-y-2">
              {["Cake Flavors", "Wedding Cakes", "Birthday Specials"].map(
                (item) => (
                  <li key={item}>
                    <Button
                      variant="link"
                      className="h-auto p-0 text-muted-foreground hover:text-foreground"
                    >
                      {item}
                    </Button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Perusahaan Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Perusahaan</h4>
            <ul className="space-y-2">
              {["Our Story", "Contact Us", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  >
                    {item}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Berlangganan Newsletter</h4>
            <p className="text-sm text-muted-foreground">
              Dapatkan update koleksi terbaru dan promo eksklusif.
            </p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Email anda" className="flex-1" />
              <Button variant="default">Daftar</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-4 md:px-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2026 Dona Cake. Crafted with Quiet Luxury.
          </p>
        </div>
      </div>
    </footer>
  )
}


