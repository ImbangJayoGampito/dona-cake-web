// src/pages/admin/asisten/MonitorAsistenPage.tsx
import { useEffect, useState } from "react"
import { ChatService } from "@/services/chat-service"
import type { ConversationFilter } from "@/services/chat-service"
import type { ChatSessionPreview } from "@/models/chat-session.model"
import type { ChatMessage } from "@/models/chat-message.model"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, RefreshCw, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

// ─── Sub-komponen: Filter ─────────────────────────────────────────────────────

interface FilterBarProps {
  filter: ConversationFilter
  onChange: (f: ConversationFilter) => void
  onRefresh: () => void
  isLoading: boolean
}

function FilterBar({ filter, onChange, onRefresh, isLoading }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-border bg-background px-6 py-3">
      <div className="relative flex-1 min-w-[200px]">
        <Search
          size={13}
          className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          value={filter.keyword ?? ""}
          onChange={(e) => onChange({ ...filter, keyword: e.target.value })}
          placeholder="Cari percakapan..."
          className="h-8 pl-8 text-xs"
        />
      </div>

      <Select
        value={filter.status ?? "all"}
        onValueChange={(v) =>
          onChange({
            ...filter,
            status: v === "all" ? undefined : (v as ConversationFilter["status"]),
          })
        }
      >
        <SelectTrigger className="h-8 w-36 text-xs">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Status</SelectItem>
          <SelectItem value="active">Aktif</SelectItem>
          <SelectItem value="escalated">Diteruskan ke CS</SelectItem>
          <SelectItem value="ended">Selesai</SelectItem>
        </SelectContent>
      </Select>

      <Button
        size="sm"
        variant="outline"
        onClick={onRefresh}
        disabled={isLoading}
        className="h-8 gap-1.5 text-xs"
      >
        <RefreshCw size={12} className={isLoading ? "animate-spin" : ""} />
        Refresh
      </Button>
    </div>
  )
}

// ─── Sub-komponen: Daftar percakapan ─────────────────────────────────────────

interface ConversationListProps {
  sessions: ChatSessionPreview[]
  selectedId: string | null
  onSelect: (id: string) => void
}

const statusConfig = {
  active: { label: "Aktif", className: "bg-green-100 text-green-700" },
  escalated: {
    label: "Diteruskan",
    className: "bg-amber-100 text-amber-700",
  },
  ended: { label: "Selesai", className: "bg-muted text-muted-foreground" },
}

function ConversationList({ sessions, selectedId, onSelect }: ConversationListProps) {
  if (sessions.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="text-center">
          <MessageSquare size={32} className="mx-auto mb-2 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">Belum ada percakapan</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-0.5 overflow-y-auto p-2">
      {sessions.map((s) => {
        const cfg = statusConfig[s.status]
        return (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={cn(
              "w-full rounded-lg px-3 py-3 text-left transition-colors",
              s.id === selectedId
                ? "border-l-2 border-[#8B5E3C] bg-[#8B5E3C]/10"
                : "hover:bg-muted/50"
            )}
          >
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className="truncate text-xs font-semibold text-foreground">
                {s.title}
              </span>
              <span
                className={cn(
                  "shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-medium",
                  cfg.className
                )}
              >
                {cfg.label}
              </span>
            </div>
            <p className="truncate text-[11px] text-muted-foreground">
              {s.lastMessage || "—"}
            </p>
            <p className="mt-0.5 text-[10px] text-muted-foreground/60">
              {new Date(s.updatedAt).toLocaleString("id-ID", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </button>
        )
      })}
    </div>
  )
}

// ─── Sub-komponen: Detail percakapan ─────────────────────────────────────────

interface ConversationDetailProps {
  messages: ChatMessage[]
  isLoading: boolean
}

function ConversationDetail({ messages, isLoading }: ConversationDetailProps) {
  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Memuat pesan...</p>
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <MessageSquare
            size={32}
            className="mx-auto mb-2 text-muted-foreground/50"
          />
          <p className="text-sm text-muted-foreground">
            Pilih percakapan untuk melihat detail
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
      {messages.map((msg) => {
        const isUser = msg.from === "user"
        return (
          <div
            key={msg.id}
            className={cn("flex gap-3", isUser ? "flex-row-reverse" : "")}
          >
            <div
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                isUser
                  ? "bg-blue-100 text-blue-700"
                  : "bg-[#8B5E3C]/10 text-[#8B5E3C]"
              )}
            >
              {isUser ? "U" : "AI"}
            </div>
            <div
              className={cn(
                "max-w-sm space-y-1",
                isUser && "flex flex-col items-end"
              )}
            >
              <div
                className={cn(
                  "rounded-2xl px-3 py-2 text-sm",
                  isUser
                    ? "rounded-tr-sm bg-[#8B5E3C] text-white"
                    : "rounded-tl-sm border border-border bg-background text-foreground shadow-sm"
                )}
              >
                {msg.text}
              </div>
              {msg.chips && (
                <div className="flex flex-wrap gap-1">
                  {msg.chips.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              )}
              <span className="block text-[10px] text-muted-foreground">
                {new Date(msg.timestamp).toLocaleString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Halaman utama ────────────────────────────────────────────────────────────

export default function MonitorAsistenPage() {
  const [sessions, setSessions] = useState<ChatSessionPreview[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoadingSessions, setIsLoadingSessions] = useState(false)
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)
  const [filter, setFilter] = useState<ConversationFilter>({})

  const fetchSessions = async () => {
    setIsLoadingSessions(true)
    const result = await ChatService.adminGetSessions(filter)
    if (result.isSuccess()) {
      setSessions(result.data ?? [])
    } else {
      toast.error(result.message ?? "Gagal memuat percakapan")
    }
    setIsLoadingSessions(false)
  }

  const fetchMessages = async (sessionId: string) => {
    setIsLoadingMessages(true)
    const result = await ChatService.adminGetSessionDetail(sessionId)
    if (result.isSuccess()) {
      setMessages(result.data?.messages ?? [])
    } else {
      toast.error(result.message ?? "Gagal memuat pesan")
    }
    setIsLoadingMessages(false)
  }

  useEffect(() => {
    fetchSessions()
  }, [filter])

  const handleSelect = (id: string) => {
    setSelectedId(id)
    fetchMessages(id)
  }

  // Filter client-side untuk keyword (sudah di-handle di server jika backend siap)
  const filteredSessions = sessions.filter((s) => {
    if (!filter.keyword) return true
    const kw = filter.keyword.toLowerCase()
    return (
      s.title.toLowerCase().includes(kw) ||
      s.lastMessage.toLowerCase().includes(kw)
    )
  })

  return (
    <div className="flex h-screen flex-col">
      {/* Page title */}
      <div className="border-b border-border bg-background px-6 py-4">
        <h1 className="text-lg font-semibold text-foreground">
          Monitor Asisten Virtual
        </h1>
        <p className="text-xs text-muted-foreground">
          Pantau dan kelola percakapan pelanggan dengan Dona AI
        </p>
      </div>

      {/* Filter bar */}
      <FilterBar
        filter={filter}
        onChange={setFilter}
        onRefresh={fetchSessions}
        isLoading={isLoadingSessions}
      />

      {/* Content: daftar + detail */}
      <div className="flex flex-1 overflow-hidden">
        {/* Daftar percakapan */}
        <div className="w-72 shrink-0 overflow-y-auto border-r border-border">
          {isLoadingSessions ? (
            <div className="space-y-2 p-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-16 animate-pulse rounded-lg bg-muted"
                />
              ))}
            </div>
          ) : (
            <ConversationList
              sessions={filteredSessions}
              selectedId={selectedId}
              onSelect={handleSelect}
            />
          )}
        </div>

        {/* Detail percakapan */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <ConversationDetail
            messages={messages}
            isLoading={isLoadingMessages}
          />
        </div>
      </div>
    </div>
  )
}
