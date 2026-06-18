import { Cell, Pie, PieChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { OrderStatusBreakdown } from "@/models/dashboard-summary.model"

interface OrderStatusDonutProps {
  data: OrderStatusBreakdown[]
  total: number
}

const COLOR_MAP: Record<string, string> = {
  warning: "#B45309",
  destructive: "#D94F4F",
  success: "#2E7D52",
  primary: "#C9956C",
  muted: "#E0DDD9",
}

export default function OrderStatusDonut({ data, total }: OrderStatusDonutProps) {
  const chartConfig = Object.fromEntries(
    data.map((item) => [item.status, { label: item.status, color: COLOR_MAP[item.colorToken] }])
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Status Pesanan Hari Ini
        </CardTitle>
        {/* Penanda jujur: data ini diturunkan kasar dari summary, bukan endpoint
            breakdown asli — lihat TODO di dashboard-service.ts. Sengaja tidak
            disembunyikan supaya admin tidak salah baca ini sebagai data presisi. */}
        <p className="text-xs text-muted-foreground">
          *Estimasi berdasarkan data ringkasan, belum breakdown penuh
        </p>
      </CardHeader>
      <CardContent>
        {total === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            Belum ada pesanan hari ini.
          </p>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <ChartContainer config={chartConfig} className="aspect-square h-[180px] w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={data}
                  dataKey="count"
                  nameKey="status"
                  innerRadius={50}
                  outerRadius={75}
                  strokeWidth={2}
                >
                  {data.map((entry) => (
                    <Cell key={entry.status} fill={COLOR_MAP[entry.colorToken]} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>

            <div className="grid w-full grid-cols-1 gap-2">
              {data.map((entry) => (
                <div
                  key={entry.status}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: COLOR_MAP[entry.colorToken] }}
                    />
                    <span className="text-muted-foreground">{entry.status}</span>
                  </div>
                  <span className="font-medium text-foreground">{entry.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
