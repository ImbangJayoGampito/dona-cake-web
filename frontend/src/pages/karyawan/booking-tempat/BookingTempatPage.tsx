import { useState } from "react"
import { Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  ReservasiTabBar,
  ReservasiCard,
} from "./components/ReservasiComponents"
import type { StatusReservasi } from "@/services/karyawan-reservasi-service"

export default function BookingTempatPage() {
  const [activeTab, setActiveTab] = useState<StatusReservasi>("pending")

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        Booking Tempat
      </h1>

      {/* Banner informasi */}
      <Alert className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/20">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-700 dark:text-blue-400">
          Fitur Dalam Pengembangan
        </AlertTitle>
        <AlertDescription className="text-blue-600 dark:text-blue-500">
          Fitur Booking Tempat sedang dalam pengembangan. Backend dan endpoint
          belum tersedia. Halaman ini akan aktif setelah backend selesai.
        </AlertDescription>
      </Alert>

      {/* UI placeholder — disabled */}
      <div className="flex flex-col gap-4 opacity-40 pointer-events-none select-none">
        <ReservasiTabBar activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex flex-col gap-4">
          {/* Dummy cards */}
          {[
            {
              id: 1,
              nama_tamu: "Andi Pratama",
              jumlah_orang: 20,
              tanggal_sesi: new Date(Date.now() + 86400000).toISOString(),
              occasion: "Ulang Tahun",
              permintaan_khusus: "Dekorasi balon pink",
              status: "pending" as const,
              created_at: new Date().toISOString(),
            },
            {
              id: 2,
              nama_tamu: "Siti Rahayu",
              jumlah_orang: 8,
              tanggal_sesi: new Date(Date.now() + 172800000).toISOString(),
              status: "pending" as const,
              created_at: new Date().toISOString(),
            },
          ].map((r) => (
            <ReservasiCard key={r.id} reservasi={r} />
          ))}
        </div>
      </div>
    </div>
  )
}
