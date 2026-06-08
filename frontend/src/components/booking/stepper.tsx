export default function Stepper({ current }: { current: number }) {
  const steps = [
    "Konfigurasi",
    "Referensi",
    "Tanggal",
    "Konfirmasi",
    "Berhasil",
  ]

  // Ensure current is within valid range
  const validCurrent = Math.min(Math.max(current, 1), steps.length)

  return (
    <div className="flex flex-col gap-2 py-6">
      {/* Circles and connecting lines row */}
      <div className="flex items-center justify-center">
        {steps.map((label, i) => {
          const num = i + 1
          const done = num < validCurrent
          const active = num === validCurrent

          return (
            <div key={`circle-${label}`} className="flex items-center">
              {/* Circle */}
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                  done || active
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
                aria-current={active ? "step" : undefined}
              >
                {num}
              </div>

              {/* Connecting line (except after last step) */}
              {i < steps.length - 1 && (
                <div
                  className={`mx-1 h-px w-12 transition-colors ${
                    num < validCurrent ? "bg-primary" : "bg-border"
                  }`}
                  aria-hidden="true"
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Labels row - aligned with circles */}
      <div className="flex items-center justify-center">
        {steps.map((label, i) => {
          const num = i + 1
          const active = num === validCurrent

          return (
            <div key={`label-${label}`} className="flex items-center">
              {/* Label */}
              <span
                className={`text-[10px] whitespace-nowrap transition-colors ${
                  active ? "font-medium text-primary" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>

              {/* Spacer to match line width (except after last label) */}
              {i < steps.length - 1 && (
                <div className="mx-1 w-12" aria-hidden="true" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
