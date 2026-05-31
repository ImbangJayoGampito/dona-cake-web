import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const RECS = [
  {
    id: 1,
    name: "Hazelnut Praline Dream",
    desc: "Perpaduan cokelat premium dan kacang hazelnut\npanggang yang renyah.",
    price: "Rp 465.000",
    img: "https://cdn.codia.ai/figma/bHsnpLOMJNp7HztOUpXOYI/img-757537510e62c00f.png",
    cartImg:
      "https://cdn.codia.ai/figma/bHsnpLOMJNp7HztOUpXOYI/img-57be93b908265519.svg",
  },
  {
    id: 2,
    name: "Black Forest Artisan",
    desc: "Klasik yang disempurnakan dengan krim segar dan ceri maraschino pilihan.",
    price: "Rp 450.000",
    img: "https://cdn.codia.ai/figma/bHsnpLOMJNp7HztOUpXOYI/img-f4bd1d662ea8f9c7.png",
    cartImg:
      "https://cdn.codia.ai/figma/bHsnpLOMJNp7HztOUpXOYI/img-1249a812943da619.svg",
  },
]

export default function Recommendations() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-8 space-y-2 text-center md:mb-12">
          <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
            Rekomendasi untukmu
          </h2>
          <p className="text-sm text-muted-foreground md:text-base">
            Berdasarkan pesanan Velvet Noir-mu sebelumnya
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {RECS.map((rec) => (
            <Card key={rec.id} className="group overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="relative aspect-square w-full overflow-hidden bg-muted sm:aspect-auto sm:w-48 md:w-56 lg:w-64">
                    <img
                      src={rec.img}
                      alt={rec.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-4 md:p-6">
                    <h3 className="mb-2 text-lg font-semibold md:text-xl">
                      {rec.name}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {rec.desc}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-lg font-bold text-primary md:text-xl">
                        {rec.price}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-full"
                        aria-label="Add to cart"
                      >
                        <img
                          src={rec.cartImg}
                          alt=""
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
