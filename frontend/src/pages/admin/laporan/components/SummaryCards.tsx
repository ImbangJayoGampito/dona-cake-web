import { Wallet, ShoppingBag, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { FinancialSummary } from "@/services/laporan-keuangan-service"

interface SummaryCardsProps {
  summary: FinancialSummary
}

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value)
}

export default function SummaryCards({ summary }: SummaryCardsProps) {
  const cards = [
    {
      label: "Total Pendapatan",
      value: formatRupiah(summary.total_pendapatan),
      sub: "Periode terpilih",
      icon: Wallet,
      iconBg: "bg-[#F5EAE0]",
      iconColor: "text-[#C9956C]",
      valueColor: "text-foreground",
    },
    {
      label: "Total Transaksi",
      value: summary.jumlah_transaksi.toString(),
      sub: "Jumlah transaksi",
      icon: ShoppingBag,
      iconBg: "bg-[#F5EAE0]",
      iconColor: "text-[#C9956C]",
      valueColor: "text-foreground",
    },
    {
      label: "Rata-rata Transaksi",
      value: formatRupiah(summary.rata_rata_transaksi),
      sub: "Per transaksi",
      icon: TrendingUp,
      iconBg: "bg-[#F5EAE0]",
      iconColor: "text-[#C9956C]",
      valueColor: "text-foreground",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{card.label}</p>
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${card.iconBg}`}
              >
                <card.icon
                  className={`h-[18px] w-[18px] ${card.iconColor}`}
                  strokeWidth={1.75}
                />
              </div>
            </div>
            <p className={`mt-3 text-2xl font-semibold ${card.valueColor}`}>
              {card.value}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{card.sub}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
