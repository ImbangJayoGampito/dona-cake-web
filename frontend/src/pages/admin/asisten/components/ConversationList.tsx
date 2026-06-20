import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  type ChatbotLogListItem,
  type StatusFlag,
  MonitorAsistenService,
} from "@/services/monitor-asisten-service"

interface ConversationListProps {
  items: ChatbotLogListItem[]
  activeId: number | null
  onSelect: (item: ChatbotLogListItem) => void
}

/**
 * Badge status: "eskalasi" tidak ada di backend — diganti "dilaporkan".
 * Nilai asli backend: aktif | dilaporkan | selesai.
 */
const STATUS_BADGE: Record<StatusFlag, { label: string; className: string }> = {
  aktif: {
    label: "Aktif",
    className: "bg-secondary text-primary hover:bg-secondary",
  },
  dilaporkan: {
    label: "Dilaporkan",
    className: "bg-destructive/10 text-destructive hover:bg-destructive/10",
  },
  selesai: {
    label: "Selesai",
    className: "bg-green-100 text-green-700 hover:bg-green-100",
  },
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("")
}

export default function ConversationList({
  items,
  activeId,
  onSelect,
}: ConversationListProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-sm text-muted-foreground">
          Belum ada percakapan yang tercatat.
        </p>
      </div>
    )
  }

  return (
    <ul className="divide-y divide-border">
      {items.map((item) => {
        const isActive = item.id === activeId
        const statusCfg = STATUS_BADGE[item.status_flag] ?? STATUS_BADGE.aktif
        const preview = MonitorAsistenService.getLastMessagePreview(item)
        const relativeTime = MonitorAsistenService.getRelativeTime(item.updated_at)
        const msgCount = item.histori_percakapan?.length ?? 0

        return (
          <li key={item.id}>
            <button
              onClick={() => onSelect(item)}
              className={cn(
                "flex w-full items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-muted",
                isActive && "border-l-[3px] border-primary bg-[#FDFAF8]"
              )}
            >
              {/* Avatar */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-primary">
                {getInitials(item.user?.name ?? "?")}
              </div>

              {/* Konten */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {item.user?.name ?? "Pengguna"}
                  </p>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {relativeTime}
                  </span>
                </div>

                <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                  {preview}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <Badge
                    className={cn("border-0 text-[11px] font-medium", statusCfg.className)}
                  >
                    {statusCfg.label}
                  </Badge>
                  <span className="text-[11px] text-muted-foreground">
                    {msgCount} pesan
                  </span>
                </div>
              </div>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
