import { Quote, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      '"Dona Cake tidak pernah mengecewakan. Desain wedding cake kami sangat elegan dan rasanya benar-benar premium, tidak terlalu manis."',
    name: "Amanda Putri",
    rating: 5,
  },
  {
    id: 2,
    quote:
      '"Rekomendasi Velvet Noir-nya juara banget! Langsung jadi favorit keluarga setiap ada perayaan ulang tahun."',
    name: "Budi Hartono",
    rating: 5,
  },
  {
    id: 3,
    quote:
      '"Pelayanan custom cake-nya sangat detail. Diskusi desain lancar dan hasilnya melebihi ekspektasi saya. Truly quiet luxury."',
    name: "Siska Amelia",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-8 space-y-2 text-center md:mb-12">
          <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
            Apa Kata Mereka
          </h2>
          <p className="text-sm text-muted-foreground md:text-base">
            Kepuasan pelanggan adalah prioritas utama kami dalam menghadirkan
            seni dalam bentuk hidangan manis.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="flex h-full flex-col p-6 md:p-8">
                {/* Quote Icon */}
                <Quote className="mb-4 h-8 w-8 text-primary/40" />

                {/* Quote Text */}
                <p className="mb-6 flex-1 leading-relaxed text-muted-foreground">
                  {testimonial.quote}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  {/* Avatar Placeholder */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-sm font-semibold text-primary">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>

                  <div className="flex-1">
                    <span className="mb-1 block text-sm font-semibold">
                      {testimonial.name}
                    </span>
                    <div className="flex gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 fill-primary text-primary"
                        />
                      ))}
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
