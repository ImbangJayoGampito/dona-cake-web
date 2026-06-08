export default function Step4Confirm({ order, onBack, onNext }) {
  const [payMode, setPayMode] = useState("dp")
  const [payMethod, setPayMethod] = useState("kartu")
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="grid items-start gap-6 md:grid-cols-[1fr_280px]">
      <Card className="border-stone-200 shadow-sm">
        <CardContent className="space-y-6 pt-6">
          <div>
            <h1 className="mb-1 text-2xl font-semibold text-stone-900">
              Konfirmasi & Bayar
            </h1>
            <p className="text-sm text-stone-500">
              Silahkan periksa kembali detail pesanan Anda sebelum melakukan
              pembayaran
            </p>
          </div>

          {/* Booking Summary */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold text-stone-800">
                Ringkasan Booking
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto px-0 py-0 text-xs text-amber-700"
              >
                <Edit size={12} className="mr-1" /> Edit Detail
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 rounded-xl bg-stone-50 p-4 text-sm">
              <div>
                <p className="text-[10px] font-semibold tracking-widest text-stone-400">
                  NAMA PEMESAN
                </p>
                <p className="mt-0.5 font-medium text-stone-800">
                  Amanda Wijaya
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-widest text-stone-400">
                  TANGGAL PENGAMBILAN
                </p>
                <p className="mt-0.5 font-medium text-stone-800">
                  24 Desember 2024, 14:00
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-widest text-stone-400">
                  KONFIGURASI KUE
                </p>
                <p className="mt-0.5 font-medium text-stone-800">
                  Double Tiered, Earl Grey Blossom
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-widest text-stone-400">
                  JAM PENGAMBILAN
                </p>
                <p className="mt-0.5 font-medium text-stone-800">
                  08.00 - 10.00
                </p>
              </div>
            </div>
          </div>

          {/* DP Policy */}
          <Alert className="border-amber-200 bg-amber-50">
            <Info size={14} className="mt-0.5 text-amber-700" />
            <AlertDescription className="text-xs text-amber-800">
              <span className="font-semibold">Kebijakan Down Payment (DP)</span>
              <br />
              Pembayaran uang muka sebesar 50% untuk mengamankan slot pesanan
              Anda. Pelunasan dilakukan saat pengambilan.
            </AlertDescription>
          </Alert>

          {/* Payment Mode */}
          <div>
            <Label className="mb-3 block text-sm font-semibold text-stone-800">
              Metode Pembayaran
            </Label>
            <div className="mb-4 grid grid-cols-2 gap-2">
              {[
                { id: "dp", label: "DP (50%)" },
                { id: "lunas", label: "Lunas" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPayMode(m.id)}
                  className={`rounded-lg border py-2.5 text-sm font-medium transition-all ${
                    payMode === m.id
                      ? "border-stone-900 bg-stone-900 text-white"
                      : "border-stone-200 bg-white text-stone-700 hover:border-stone-400"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="mb-4 grid grid-cols-3 gap-2">
              {[
                { id: "kartu", label: "Kartu", icon: <CreditCard size={14} /> },
                {
                  id: "transfer",
                  label: "Transfer",
                  icon: <Building2 size={14} />,
                },
                {
                  id: "ewallet",
                  label: "E-Wallet",
                  icon: <Wallet size={14} />,
                },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPayMethod(m.id)}
                  className={`flex items-center justify-center gap-1.5 rounded-lg border py-2.5 text-sm font-medium transition-all ${
                    payMethod === m.id
                      ? "border-stone-900 bg-stone-900 text-white"
                      : "border-stone-200 bg-white text-stone-700 hover:border-stone-400"
                  }`}
                >
                  {m.icon} {m.label}
                </button>
              ))}
            </div>

            {payMethod === "kartu" && (
              <div className="space-y-3">
                <div>
                  <Label className="mb-1 block text-xs text-stone-500">
                    Nomor Kartu
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="XXXX XXXX XXXX XXXX"
                      className="border-stone-200 pr-10"
                    />
                    <CreditCard
                      size={16}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-stone-400"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="mb-1 block text-xs text-stone-500">
                      Masa Berlaku
                    </Label>
                    <Input placeholder="MM/YY" className="border-stone-200" />
                  </div>
                  <div>
                    <Label className="mb-1 block text-xs text-stone-500">
                      CVC
                    </Label>
                    <Input placeholder="123" className="border-stone-200" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              checked={agreed}
              onCheckedChange={setAgreed}
              className="mt-0.5 border-stone-300"
            />
            <Label
              htmlFor="terms"
              className="cursor-pointer text-xs leading-relaxed text-stone-600"
            >
              Saya menyetujui{" "}
              <span className="text-amber-700 underline">
                Syarat & Ketentuan
              </span>{" "}
              serta kebijakan pembatalan Dona Cake.
            </Label>
          </div>
        </CardContent>
      </Card>

      <OrderSummary order={{ ...order, step: 4 }} showDate />

      <div className="md:col-span-2">
        <Button
          onClick={onNext}
          disabled={!agreed}
          className="w-full bg-amber-800 py-3 text-base font-semibold text-white hover:bg-amber-900 disabled:bg-stone-300"
        >
          Konfirmasi & Bayar DP Rp 205.000{" "}
          <ArrowRight size={18} className="ml-2" />
        </Button>
        <div className="mt-4 flex justify-start">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-stone-600"
          >
            <ChevronLeft size={16} className="mr-1" /> Kembali
          </Button>
        </div>
      </div>
    </div>
  )
}
