import { Button } from "@/components/ui/button" // adjust path to your shadcn button

export default function CustomCakeBanner() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://cdn.codia.ai/figma/bHsnpLOMJNp7HztOUpXOYI/img-c846c0f41c404b11.png')",
        }}
      >
        {/* Optional overlay for better text contrast (remove if not needed) */}
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 max-w-3xl px-6 py-12 md:px-12 md:py-16 lg:py-20">
          <p className="mb-3 text-sm font-semibold tracking-wide text-white/90 uppercase md:text-base">
            Wujudkan Cake Impian Anda
          </p>
          <p className="mb-6 max-w-2xl text-lg leading-relaxed text-white md:mb-8 md:text-xl lg:text-2xl">
            Tim pastry chef kami siap membantu merancang desain unik untuk momen
            paling bersejarah dalam hidup Anda. Dari konsep hingga meja pesta.
          </p>
          <Button
            variant="default"
            size="lg"
            className="gap-2 rounded-full shadow-lg transition-all hover:shadow-xl"
          >
            Konsultasi Desain
            <img
              src="https://cdn.codia.ai/figma/bHsnpLOMJNp7HztOUpXOYI/img-50598584cc8159b8.svg"
              alt=""
              className="h-4 w-4"
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>
    </section>
  )
}
