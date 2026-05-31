import { Button } from "@/components/ui/button"

export default function MainHero() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-4 text-center md:space-y-6 lg:text-left">
            <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
              ARTISANAL PATISSERIE
            </p>
            <h1 className="text-3xl leading-tight font-bold md:text-4xl lg:text-5xl xl:text-6xl">
              Kemewahan dalam
              <br />
              Setiap Gigitan
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              Temukan koleksi cake premium yang dirancang dengan presisi
              artistik dan bahan pilihan terbaik untuk momen istimewa Anda.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Button variant="default" size="lg" className="rounded-full">
                Jelajahi Katalog
              </Button>
              <Button variant="outline" size="lg" className="rounded-full">
                Pesan Custom
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Decorative blob - using shadcn primary color */}
              <div className="absolute -inset-4 -z-10 rounded-full bg-primary/10 blur-3xl" />
              <img
                className="h-auto w-full rounded-2xl object-cover shadow-lg"
                src="https://cdn.codia.ai/figma/bHsnpLOMJNp7HztOUpXOYI/img-0875028008608dc7.png"
                alt="Premium cake display"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
