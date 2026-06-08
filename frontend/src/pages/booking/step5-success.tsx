export default function Step5Success({ onHome }) {
  return (
    <div className="flex justify-center py-8">
      <Card className="w-full max-w-lg border-stone-200 shadow-sm">
        <CardContent className="flex flex-col items-center space-y-6 pt-10 pb-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 size={30} className="text-green-600" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-stone-900">
              Booking Berhasil! 🎉
            </h1>
            <p className="mt-1 text-sm text-stone-500">
              Terima kasih! Pesananmu sedang kami proses.
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-4 rounded-xl bg-stone-50 p-5 text-left">
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-stone-400">
                ID PESANAN
              </p>
              <p className="mt-0.5 text-sm font-semibold text-stone-800">
                #DC-20250528-0042
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-stone-400">
                METODE PEMBAYARAN
              </p>
              <p className="mt-0.5 text-sm font-semibold text-stone-800">
                Kartu Kredit
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-stone-400">
                TOTAL PEMBAYARAN
              </p>
              <p className="mt-0.5 text-sm font-semibold text-stone-800">
                Rp 410.000
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-stone-400">
                WAKTU PENGAMBILAN
              </p>
              <p className="mt-0.5 text-sm font-semibold text-stone-800">
                07 Mei 2025
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="w-full">
            <div className="relative flex items-center justify-between">
              <div className="absolute top-3 right-0 left-0 z-0 h-0.5 bg-stone-200" />
              <div className="absolute top-3 left-0 z-0 h-0.5 w-2/5 bg-amber-600" />
              {["Diterima", "Pembayaran", "Diproses", "Siap", "Selesai"].map(
                (s, i) => (
                  <div
                    key={s}
                    className="relative z-10 flex flex-col items-center gap-1"
                  >
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full ${
                        i <= 2 ? "bg-amber-600" : "bg-stone-200"
                      }`}
                    >
                      {i <= 2 ? (
                        <CheckCircle2 size={14} className="text-white" />
                      ) : (
                        <div className="h-2 w-2 rounded-full bg-stone-400" />
                      )}
                    </div>
                    <span className="text-[9px] text-stone-500">{s}</span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="flex w-full items-center gap-2 rounded-lg bg-stone-50 px-4 py-2.5 text-xs text-stone-500">
            <Mail size={13} />
            <span>
              Konfirmasi pesanan telah dikirim ke{" "}
              <span className="font-semibold">email@kamu.com</span>
            </span>
          </div>

          <div className="flex w-full gap-3">
            <Button className="flex-1 bg-amber-700 text-white hover:bg-amber-800">
              Lacak Pesananku <ArrowRight size={14} className="ml-1" />
            </Button>
            <Button
              onClick={onHome}
              variant="outline"
              className="flex-1 border-stone-300 text-stone-700"
            >
              Kembali ke Beranda
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
