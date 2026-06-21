import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Mail, ArrowRight, MessageCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ProtectedRoutes } from "@/lib/routes"
import { Booking } from "@/models/booking.model"
import WhatsAppButton from "@/components/whatsapp_button"
import { CurrencyService } from "@/services/currency-service"

interface Step5Interface {
  booking: Booking
  onHome: () => void
}

export default function Step5Success(props: Step5Interface) {
  const { booking, onHome } = props
  const navigate = useNavigate()
  return (
    <div className="flex justify-center py-8">
      <Card className="w-full max-w-lg border-border shadow-sm">
        <CardContent className="flex flex-col items-center space-y-6 pt-10 pb-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle2
              size={30}
              className="text-green-600 dark:text-green-500"
            />
          </div>

           <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Booking Berhasil! 🎉
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Terima kasih! Pesananmu sedang kami proses.
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-4 rounded-xl bg-muted/50 p-5 text-left">
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-muted-foreground">
                ID PESANAN
              </p>
              <p className="mt-0.5 text-sm font-semibold text-foreground">
                #DC-{booking.id.toString().padStart(4, '0')}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-muted-foreground">
                METODE PEMBAYARAN
              </p>
              <p className="mt-0.5 text-sm font-semibold text-foreground">
                Transfer Bank
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-muted-foreground">
                TOTAL PEMBAYARAN
              </p>
             <p className="mt-0.5 text-sm font-semibold text-foreground">
               {CurrencyService.formatPrice(booking.harga_final || 0 )}
             </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-muted-foreground">
                WAKTU PENGAMBILAN
              </p>
              <p className="mt-0.5 text-sm font-semibold text-foreground">
                {booking.tgl_ambil?.toLocaleDateString('id-ID', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                }) || 'Belum ditentukan'}
              </p>
            </div>
          </div>

          {/* Progress - Only show up to Diterima */}
          <div className="w-full">
            <div className="relative flex items-center justify-between">
              <div className="absolute top-3 right-0 left-0 z-0 h-0.5 bg-border" />
              <div className="absolute top-3 left-0 z-0 h-0.5 w-1/5 bg-primary" />
              {["Diterima"].map(
                (s, i) => (
                  <div
                    key={s}
                    className="relative z-10 flex flex-col items-center gap-1"
                  >
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full ${
                        i <= 0 ? "bg-primary" : "bg-border"
                      }`}
                    >
                      {i <= 0 ? (
                        <CheckCircle2
                          size={14}
                          className="text-primary-foreground"
                        />
                      ) : (
                        <div className="h-2 w-2 rounded-full bg-muted-foreground/50" />
                      )}
                    </div>
                    <span className="text-[9px] text-muted-foreground">
                      {s}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>


          <div className="flex w-full gap-3">
            <WhatsAppButton
              id_pesanan={booking.id}
              type_of_message="booking"
              beginningMessage={`Halo, saya ingin mengkonfirmasi booking dengan ID: ${booking.id}`}
            />
          </div>
          <div className="flex w-full gap-3">
            <Button
              onClick={() => navigate(ProtectedRoutes.Pantau)}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Lacak Sekarang <ArrowRight size={14} className="ml-1" />
            </Button>
            <Button
              onClick={onHome}
              variant="outline"
              className="flex-1 border-border text-foreground hover:bg-muted"
            >
              Kembali ke Beranda
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
