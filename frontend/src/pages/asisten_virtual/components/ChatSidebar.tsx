// src/pages/asisten/components/ChatSidebar.tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import type { ChatSessionPreview } from "@/models/chat-session.model"
import { cn } from "@/lib/utils"

interface ChatSidebarProps {
  sessions: ChatSessionPreview[]
  activeSessionId: string | null
  isLoading: boolean
  onNewChat: () => void
  onSelectSession: (id: string) => void
}

function formatTime(iso: string): string {
  const date = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 2) return "JUST NOW"
  if (diffMins < 60) return `${diffMins}M AGO`
  if (diffHours < 24) return `${diffHours}H AGO`
  if (diffDays === 1) return "YESTERDAY"
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" })
}

export default function ChatSidebar({
  sessions,
  activeSessionId,
  isLoading,
  onNewChat,
  onSelectSession,
}: ChatSidebarProps) {
  const [search, setSearch] = useState("")

  const filtered = sessions.filter(
    (s) =>
      (s.title?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (s.lastMessage?.toLowerCase() || "").includes(search.toLowerCase())
  )

  return (
    <div className="flex w-64 shrink-0 flex-col border-r border-border bg-background">
      {/* Top actions */}
      <div className="space-y-3 p-4">
        <Button
          onClick={onNewChat}
          className="w-full gap-2 bg-[#8B5E3C] text-sm text-white hover:bg-[#7a5234]"
        >
          <Plus size={15} />
          New Chat
        </Button>
        <div className="relative">
          <Search
            size={13}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search chats..."
            className="h-8 pl-8 text-xs"
          />
        </div>
      </div>

      {/* Session list */}
      <div className="flex-1 space-y-0.5 overflow-y-auto px-2 pb-4">
        {isLoading ? (
          <div className="space-y-2 px-2 pt-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="px-3 pt-4 text-center text-xs text-muted-foreground">
            {search ? "Tidak ada hasil" : "Belum ada percakapan"}
          </p>
        ) : (
          filtered.map((s) => {
            const isActive = s.id === activeSessionId
            return (
              <button
                key={s.id}
                onClick={() => onSelectSession(s.id)}
                className={cn(
                  "w-full rounded-lg px-3 py-3 text-left transition-colors",
                  isActive
                    ? "border-l-2 border-[#8B5E3C] bg-[#8B5E3C]/10"
                    : "hover:bg-muted/50"
                )}
              >
                <div className="mb-0.5 flex items-center justify-between">
                  <span
                    className={cn(
                      "truncate text-xs font-semibold",
                      isActive ? "text-[#8B5E3C]" : "text-foreground"
                    )}
                  >
                    {s.title}
                  </span>
                  <span className="ml-1 shrink-0 text-[9px] text-muted-foreground">
                    {formatTime(s.updatedAt)}
                  </span>
                </div>
                <p className="truncate text-[11px] text-muted-foreground">
                  {s.lastMessage || "Percakapan baru"}
                </p>
                {s.status === "escalated" && (
                  <span className="mt-1 inline-block rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] text-amber-700">
                    Diteruskan ke CS
                  </span>
                )}
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}
