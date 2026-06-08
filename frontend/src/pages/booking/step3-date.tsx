export default function Step3Date({ order, onBack, onNext }) {
  const [selected, setSelected] = useState(7)
  const [time, setTime] = useState("08:00 – 10:00")

  return (
    <div className="grid items-start gap-6 md:grid-cols-[1fr_280px]">
      <Card className="border-stone-200 shadow-sm">
        <CardContent className="space-y-5 pt-6">
          <div>
            <h1 className="mb-1 text-2xl font-semibold text-stone-900">
              Pilih Tanggal Pengambilan
            </h1>
            <p className="text-sm text-stone-500">
              Tentukan kapan kreasi spesial Anda akan dinikmati.
            </p>
          </div>

          <Alert className="border-amber-200 bg-amber-50">
            <Info size={14} className="mt-0.5 text-amber-700" />
            <AlertDescription className="text-xs text-amber-800">
              Pemesanan custom cake memerlukan minimal 3 hari kerja persiapan
              untuk memastikan detail sempurna.
            </AlertDescription>
          </Alert>

          {/* Calendar */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-stone-800">Mei 2025</h3>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <ChevronLeft size={14} />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <ChevronRight size={14} />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"].map((d) => (
                <div
                  key={d}
                  className="py-1 text-[10px] font-semibold text-stone-400"
                >
                  {d}
                </div>
              ))}
              {CALENDAR_DAYS.map((week, wi) =>
                week.map((day, di) => (
                  <div key={`${wi}-${di}`}>
                    {day ? (
                      <button
                        onClick={() => setSelected(day)}
                        className={`aspect-square w-full rounded-lg text-sm transition-all ${
                          selected === day
                            ? "bg-amber-800 font-semibold text-white"
                            : day <= 3
                              ? "cursor-not-allowed text-stone-300"
                              : "text-stone-700 hover:bg-amber-50"
                        }`}
                      >
                        {day}
                      </button>
                    ) : (
                      <div />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Time */}
          <div>
            <Label className="mb-3 block text-sm font-semibold text-stone-800">
              Pilih Waktu Penjemputan
            </Label>
            <div className="flex flex-wrap gap-2">
              {TIME_SLOTS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  className={`rounded-full border px-4 py-2 text-sm transition-all ${
                    time === t
                      ? "border-amber-800 bg-amber-800 font-medium text-white"
                      : "border-stone-200 text-stone-600 hover:border-stone-400"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Method */}
          <div>
            <Label className="mb-3 block text-sm font-semibold text-stone-800">
              Metode Penyerahan
            </Label>
            <div className="flex items-center justify-between rounded-xl border-2 border-amber-700 bg-amber-50/30 px-4 py-3">
              <div className="flex items-center gap-3">
                <Building2 size={16} className="text-stone-600" />
                <div>
                  <p className="text-sm font-semibold text-stone-800">
                    Pengambilan di Toko
                  </p>
                  <p className="text-xs text-stone-500">
                    Gratis Biaya Pengantaran
                  </p>
                </div>
              </div>
              <CheckCircle2 size={18} className="text-amber-700" />
            </div>
          </div>
        </CardContent>
      </Card>

      <OrderSummary order={{ ...order, step: 3 }} showDate />

      <div className="flex items-center justify-between pt-2 md:col-span-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-stone-600"
        >
          <ChevronLeft size={16} className="mr-1" /> Kembali
        </Button>
        <Button
          onClick={onNext}
          className="bg-amber-800 px-6 text-white hover:bg-amber-900"
        >
          Lanjut: Pembayaran <ChevronRight size={16} className="ml-1" />
        </Button>
      </div>
    </div>
  )
}
