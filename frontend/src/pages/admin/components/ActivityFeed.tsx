import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/**
 * TODO: belum ada endpoint terkonfirmasi untuk "Aktivitas Terbaru" (lihat
 * implementation_plan.md bagian 3). Sama seperti RecentOrdersTable, komponen
 * ini dibuat generik dulu — tinggal disambungkan begitu endpointnya ada.
 */
export interface ActivityItem {
  id: string
  title: string
  description: string
  timestamp: string // sudah diformat relatif, mis. "10 menit yang lalu"
  variant: "default" | "warning" | "danger" | "info"
}

interface ActivityFeedProps {
  items: ActivityItem[]
}

const DOT_COLOR: Record<ActivityItem["variant"], string> = {
  default: "bg-primary",
  warning: "bg-orange-700",
  danger: "bg-destructive",
  info: "bg-blue-700",
}

export default function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Aktivitas Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Belum ada aktivitas yang tercatat.
          </p>
        ) : (
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="border-b border-border pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                      DOT_COLOR[item.variant]
                    )}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground/70">
                      {item.timestamp}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
