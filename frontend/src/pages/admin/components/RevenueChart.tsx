import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { RevenueChartPoint } from "@/models/dashboard-summary.model"

interface RevenueChartProps {
  data: RevenueChartPoint[]
}

const chartConfig: ChartConfig = {
  totalPendapatan: {
    label: "Pendapatan",
    color: "#C9956C",
  },
}

function formatTanggalSingkat(periode: string): string {
  // periode format "YYYY-MM-DD" (sesuai contoh response daily)
  const date = new Date(periode)
  if (Number.isNaN(date.getTime())) return periode
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" })
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const chartData = data.map((point) => ({
    ...point,
    label: formatTanggalSingkat(point.periode),
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Pendapatan 7 Hari Terakhir
        </CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            Belum ada data pendapatan untuk periode ini.
          </p>
        ) : (
          <ChartContainer config={chartConfig} className="aspect-auto h-[220px] w-full">
            <AreaChart data={chartData} margin={{ left: 0, right: 0 }}>
              <defs>
                <linearGradient id="fillPendapatan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C9956C" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#C9956C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#EFECE9" />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
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
                dataKey="totalPendapatan"
                type="monotone"
                fill="url(#fillPendapatan)"
                stroke="#C9956C"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
