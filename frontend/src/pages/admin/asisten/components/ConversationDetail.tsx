import { useState } from "react"
import { Download, CheckCircle, Paperclip, Smile, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import {
  type ChatbotLogDetail,
  type StatusFlag,
  MonitorAsistenService,
} from "@/services/monitor-asisten-service"
import ChatTranscript from "./ChatTranscript"

interface ConversationDetailProps {
  detail: ChatbotLogDetail | null
  isLoading: boolean
  onMarkSelesai?: (id: number) => void
}

const STATUS_BADGE: Record<StatusFlag, { label: string; className: string }> = {
  aktif: {
    label: "Aktif",
    className: "bg-[#F5EAE0] text-[#C9956C]",
  },
  dilaporkan: {
    label: "Dilaporkan",
    className: "bg-[#FDF0F0] text-[#D94F4F]",
  },
  selesai: {
    label: "Selesai",
    className: "bg-[#EDF7F1] text-[#2E7D52]",
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

/** Export transcript sebagai file .txt — client-side tanpa library */
function exportTranscript(detail: ChatbotLogDetail): void {
  const lines = [
    `Transcript Percakapan — Dona Cake`,
    `Pengguna: ${detail.user.name} (${detail.user.email})`,
    `Tanggal: ${new Date(detail.created_at).toLocaleString("id-ID")}`,
    `Status: ${detail.status}`,
    "",
    "─".repeat(50),
    "",
    ...detail.history.map((msg) => {
      const time = MonitorAsistenService.formatMessageTime(msg.timestamp)
      const role =
        msg.role === "user"
          ? "USER"
          : msg.role === "assistant"
          ? "AI ASSISTANT"
          : "SYSTEM"
      return `[${time}] ${role}:\n${msg.content}\n`
    }),
  ]

  const content = lines.join("\n")
  const blob = new Blob([content], { type: "text/plain;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `transcript-${detail.id}-${new Date().toISOString().slice(0, 10)}.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export default function ConversationDetail({
  detail,
  isLoading,
  onMarkSelesai,
}: ConversationDetailProps) {
  const [csInput, setCsInput] = useState("")

  // Default state — belum ada percakapan dipilih
  if (!detail && !isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5EAE0]">
          <Send className="h-7 w-7 text-[#C9956C]" strokeWidth={1.75} />
        </div>
        <p className="mt-4 text-sm font-medium text-foreground">
          Pilih percakapan
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Klik salah satu percakapan di kiri untuk melihat transcript
        </p>
      </div>
    )
  }

  const statusCfg = detail
    ? STATUS_BADGE[detail.status] ?? STATUS_BADGE.aktif
    : null

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Header percakapan */}
      {detail && (
        <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5EAE0] text-sm font-semibold text-[#C9956C]">
              {getInitials(detail.user.name)}
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-foreground">
                {detail.user.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {detail.user.email}
              </p>
            </div>
            {statusCfg && (
              <Badge
                className={cn("ml-1 border-0 text-xs font-medium", statusCfg.className)}
              >
                {statusCfg.label}
              </Badge>
            )}
          </div>

          {/* Aksi header */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs"
              onClick={() => {
                exportTranscript(detail)
                toast.success("Transcript berhasil diunduh.")
              }}
            >
              <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
              Export Transcript
            </Button>

            {detail.status !== "selesai" && onMarkSelesai && (
              <Button
                size="sm"
                className="gap-1.5 bg-[#C9956C] text-xs hover:bg-[#A8744E]"
                onClick={() => onMarkSelesai(detail.id)}
              >
                <CheckCircle className="h-3.5 w-3.5" strokeWidth={1.75} />
                Tandai Selesai
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Transcript area */}
      <ChatTranscript
        messages={detail?.history ?? []}
        isLoading={isLoading}
      />

      {/* Input balas sebagai CS
          TODO: Tidak ada endpoint backend untuk CS reply saat ini.
          Tombol "Kirim Balasan" menampilkan toast info sebagai placeholder.
          Implementasikan koneksi ke endpoint begitu backend menyediakannya.
          Lihat: ChatbotLogController.php — endpoint store hanya untuk user pemilik percakapan. */}
      {detail && detail.status !== "selesai" && (
        <div className="border-t border-border bg-white px-4 py-3">
          <div className="flex items-end gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-[#F7F5F3] px-3 py-2.5">
              <textarea
                value={csInput}
                onChange={(e) => setCsInput(e.target.value)}
                placeholder="Balas sebagai CS..."
                rows={1}
                className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    toast.info(
                      "Fitur balas sebagai CS belum tersedia. Endpoint backend belum diimplementasikan."
                    )
                  }
                }}
              />
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <button className="hover:text-foreground transition-colors">
                  <Paperclip className="h-4 w-4" strokeWidth={1.75} />
                </button>
                <button className="hover:text-foreground transition-colors">
                  <Smile className="h-4 w-4" strokeWidth={1.75} />
                </button>
              </div>
            </div>
            <Button
              onClick={() =>
                toast.info(
                  "Fitur balas sebagai CS belum tersedia. Endpoint backend belum diimplementasikan."
                )
              }
              className="h-10 gap-1.5 bg-[#C9956C] px-4 text-sm hover:bg-[#A8744E]"
            >
              Kirim Balasan
              <Send className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Button>
          </div>
          <p className="mt-1.5 text-[11px] text-muted-foreground">
            * Fitur balas CS belum aktif — menunggu implementasi endpoint backend
          </p>
        </div>
      )}

      {/* State: percakapan selesai */}
      {detail?.status === "selesai" && (
        <div className="border-t border-border bg-[#EDF7F1] px-5 py-3 text-center">
          <p className="text-xs font-medium text-[#2E7D52]">
            ✓ Percakapan ini sudah ditandai selesai
          </p>
        </div>
      )}
    </div>
  )
}
