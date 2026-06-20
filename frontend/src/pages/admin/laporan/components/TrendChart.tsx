import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { RevenueChartPoint, RevenuePeriode } from "@/services/laporan-keuangan-service"

interface TrendChartProps {
  data: RevenueChartPoint[]
  periode: RevenuePeriode
  onPeriodeChange: (periode: RevenuePeriode) => void
  isLoading?: boolean
}

const chartConfig: ChartConfig = {
  total_pendapatan: {
    label: "Pendapatan",
    color: "hsl(var(--primary))",
  },
}

const PERIODE_OPTIONS: { value: RevenuePeriode; label: string }[] = [
  { value: "daily", label: "Harian" },
  { value: "weekly", label: "Mingguan" },
  { value: "monthly", label: "Bulanan" },
]

function formatPeriodeLabel(periode: string, mode: RevenuePeriode): string {
  const date = new Date(periode)
  if (isNaN(date.getTime())) return periode
  if (mode === "monthly") {
    return date.toLocaleDateString("id-ID", { month: "short", year: "2-digit" })
  }
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" })
}

export default function TrendChart({
  data,
  periode,
  onPeriodeChange,
  isLoading,
}: TrendChartProps) {
  const chartData = data.map((point) => ({
    ...point,
    label: formatPeriodeLabel(point.periode, periode),
  }))

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Tren Pendapatan</CardTitle>
          <p className="text-xs text-muted-foreground">
            Visualisasi pendapatan berdasarkan periode terpilih
          </p>
        </div>

        {/* Toggle Harian / Mingguan / Bulanan */}
        <div className="flex items-center gap-1 rounded-lg border border-border bg-muted p-1">
          {PERIODE_OPTIONS.map((opt) => (
            <Button
              key={opt.value}
              variant="ghost"
              size="sm"
              onClick={() => onPeriodeChange(opt.value)}
              className={cn(
                "h-7 rounded-md px-3 text-xs font-medium transition-colors",
                periode === opt.value
                  ? "bg-primary text-white hover:bg-primary/80"
                  : "text-muted-foreground hover:bg-white hover:text-foreground"
              )}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="flex h-[260px] items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-[260px] items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Belum ada data untuk periode ini.
            </p>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[260px] w-full"
          >
            <AreaChart data={chartData} margin={{ left: 0, right: 0, top: 4 }}>
              <defs>
                <linearGradient id="fillPendapatan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 11 }}
                tickFormatter={(v) =>
                  v >= 1_000_000
                    ? `${(v / 1_000_000).toFixed(0)}jt`
                    : v >= 1_000
                    ? `${(v / 1_000).toFixed(0)}rb`
                    : String(v)
                }
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) =>
                      new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(Number(value))
                    }
                  />
                }
              />
              <Area
                dataKey="total_pendapatan"
                type="monotone"
                fill="url(#fillPendapatan)"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "hsl(var(--primary))" }}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
