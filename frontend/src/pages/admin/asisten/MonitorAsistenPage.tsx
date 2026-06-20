import { useEffect, useState } from "react"
import { Search, AlertCircle, RefreshCw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import {
  MonitorAsistenService,
  type ChatbotLogListItem,
  type ChatbotLogDetail,
} from "@/services/monitor-asisten-service"
import ConversationList from "./components/ConversationList"
import ConversationDetail from "./components/ConversationDetail"

type LoadState = "loading" | "success" | "error"

export default function MonitorAsistenPage() {
  const [listState, setListState] = useState<LoadState>("loading")
  const [listError, setListError] = useState("")
  const [conversations, setConversations] = useState<ChatbotLogListItem[]>([])
  const [search, setSearch] = useState("")

  const [activeItem, setActiveItem] = useState<ChatbotLogListItem | null>(null)
  const [detail, setDetail] = useState<ChatbotLogDetail | null>(null)
  const [isDetailLoading, setIsDetailLoading] = useState(false)

  async function loadConversations() {
    setListState("loading")
    const res = await MonitorAsistenService.getConversations()
    if (res.isError() || !res.data) {
      setListError(res.message ?? "Gagal memuat daftar percakapan.")
      setListState("error")
      return
    }
    setConversations(res.data)
    setListState("success")
  }

  useEffect(() => {
    loadConversations()
  }, [])

  async function handleSelectConversation(item: ChatbotLogListItem) {
    setActiveItem(item)
    setDetail(null)
    setIsDetailLoading(true)

    const res = await MonitorAsistenService.getConversationDetail(item.id)
    if (res.isSuccess() && res.data) {
      setDetail(res.data)
    } else {
      toast.error(res.message ?? "Gagal memuat detail percakapan.")
    }
    setIsDetailLoading(false)
  }

  /**
   * Tandai selesai — tidak ada endpoint khusus di backend saat ini.
   * TODO: sambungkan ke endpoint PATCH/PUT begitu tersedia di backend.
   * Untuk sekarang: update UI secara optimistis saja (local state).
   */
  function handleMarkSelesai(id: number) {
    setDetail((prev) => (prev ? { ...prev, status: "selesai" } : prev))
    setConversations((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status_flag: "selesai" } : c
      )
    )
    toast.success("Percakapan ditandai selesai. (Perubahan lokal saja — endpoint backend belum tersedia.)")
  }

  // Filter search lokal (bukan server-side karena backend tidak support query param search saat ini)
  const filteredConversations = search.trim()
    ? conversations.filter(
        (c) =>
          c.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
          c.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
          MonitorAsistenService.getLastMessagePreview(c)
            .toLowerCase()
            .includes(search.toLowerCase())
      )
    : conversations

  // Stats
  const totalChats = conversations.length
  const totalDilaporkan = conversations.filter(
    (c) => c.status_flag === "dilaporkan"
  ).length

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-border bg-white px-6 py-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Monitor Asisten Virtual
          </h1>
          <p className="text-sm text-muted-foreground">
            Pantau interaksi AI dan berikan bantuan saat diperlukan.
          </p>
        </div>

        {/* Stats summary */}
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-border bg-white px-4 py-2 text-center">
            <p className="text-xs text-muted-foreground">Total Chats</p>
            <p className="text-xl font-semibold text-foreground">{totalChats}</p>
          </div>
          {totalDilaporkan > 0 && (
            <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-2 text-center">
              <p className="text-xs text-destructive">Dilaporkan</p>
              <p className="text-xl font-semibold text-destructive">
                {totalDilaporkan}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Body — dua panel */}
      <div className="flex flex-1 overflow-hidden">
        {/* Panel kiri: daftar percakapan */}
        <div className="flex w-72 shrink-0 flex-col border-r border-border bg-white">
          {/* Search */}
          <div className="border-b border-border px-3 py-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Daftar Percakapan
              </p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama atau pesan..."
                className="h-8 pl-8 text-xs"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {listState === "loading" ? (
              <div className="space-y-0 divide-y divide-border">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-3 px-4 py-4">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-3.5 w-3/4" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : listState === "error" ? (
              <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                <AlertCircle className="h-8 w-8 text-destructive" strokeWidth={1.75} />
                <p className="mt-2 text-xs text-muted-foreground">{listError}</p>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={loadConversations}
                  className="mt-3 gap-1.5 text-xs"
                >
                  <RefreshCw className="h-3 w-3" strokeWidth={1.75} />
                  Coba Lagi
                </Button>
              </div>
            ) : (
              <ConversationList
                items={filteredConversations}
                activeId={activeItem?.id ?? null}
                onSelect={handleSelectConversation}
              />
            )}
          </div>
        </div>

        {/* Panel kanan: detail percakapan */}
        <div className="flex flex-1 flex-col overflow-hidden bg-white">
          <ConversationDetail
            detail={detail}
            isLoading={isDetailLoading}
            onMarkSelesai={handleMarkSelesai}
          />
        </div>
      </div>
    </div>
  )
}
