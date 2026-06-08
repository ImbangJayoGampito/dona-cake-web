export default function Step2Reference({ order, onBack, onNext }) {
  const [packaging, setPackaging] = useState("standar")
  const [textColor, setTextColor] = useState("#2d2016")

  return (
    <div className="grid items-start gap-6 md:grid-cols-[1fr_280px]">
      <Card className="border-stone-200 shadow-sm">
        <CardContent className="space-y-6 pt-6">
          <h1 className="text-2xl font-semibold text-stone-900">
            Referensi Desain & Catatan Khusus
          </h1>

          {/* Upload */}
          <div>
            <Label className="mb-2 block text-xs font-semibold tracking-widest text-stone-500">
              UPLOAD FOTO REFERENSI
            </Label>
            <div className="flex h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-amber-200 bg-amber-50/30 transition-colors hover:bg-amber-50">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                <Upload size={18} className="text-amber-700" />
              </div>
              <p className="text-sm font-medium text-stone-700">
                Klik atau drag foto ke sini
              </p>
              <p className="text-xs text-stone-400">
                Mendukung JPG, PNG (Maks. 5MB)
              </p>
            </div>
          </div>

          {/* Text & Color */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-2 block text-xs font-semibold tracking-widest text-stone-500">
                TULISAN PADA KUE
              </Label>
              <Input
                placeholder="Contoh: Happy Birthday Sarah"
                className="border-stone-200 text-sm"
              />
            </div>
            <div>
              <Label className="mb-2 block text-xs font-semibold tracking-widest text-stone-500">
                WARNA TULISAN
              </Label>
              <div className="mt-1 flex gap-2">
                {TEXT_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setTextColor(c)}
                    style={{ backgroundColor: c }}
                    className={`h-8 w-8 rounded-full border-2 transition-all ${textColor === c ? "scale-110 border-amber-700" : "border-stone-200"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label className="mb-2 block text-xs font-semibold tracking-widest text-stone-500">
              CATATAN KHUSUS (ALERGI, MODIFIKASI, DLL)
            </Label>
            <Textarea
              placeholder="Tuliskan instruksi tambahan di sini ..."
              className="min-h-[100px] resize-none border-stone-200 text-sm"
            />
          </div>

          {/* Packaging */}
          <div>
            <Label className="mb-3 block text-xs font-semibold tracking-widest text-stone-500">
              PILIHAN KEMASAN
            </Label>
            <div className="grid grid-cols-3 gap-3">
              {PACKAGINGS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPackaging(p.id)}
                  className={`rounded-xl border-2 p-3 text-left transition-all ${
                    packaging === p.id
                      ? "border-amber-700 bg-amber-50/40"
                      : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <div className="mb-1 flex items-start justify-between">
                    <Package size={16} className="text-stone-500" />
                    <div
                      className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${packaging === p.id ? "border-amber-700" : "border-stone-300"}`}
                    >
                      {packaging === p.id && (
                        <div className="h-2 w-2 rounded-full bg-amber-700" />
                      )}
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-stone-800">
                    {p.label}
                  </p>
                  <p className="mt-0.5 text-[10px] leading-tight text-stone-500">
                    {p.desc}
                  </p>
                  <p
                    className={`mt-2 text-xs font-semibold ${p.price === 0 ? "text-green-600" : "text-stone-700"}`}
                  >
                    {p.priceLabel}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <OrderSummary order={{ ...order, step: 2, packaging }} />

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
          Lanjut: Pilih Tanggal <ChevronRight size={16} className="ml-1" />
        </Button>
      </div>
    </div>
  )
}
