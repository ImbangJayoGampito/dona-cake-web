import { useEffect, useRef } from "react"
import { Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  type ChatMessage,
  type MessageRole,
  MonitorAsistenService,
} from "@/services/monitor-asisten-service"

interface ChatTranscriptProps {
  messages: ChatMessage[]
  isLoading?: boolean
}

const ROLE_CONFIG: Record<
  MessageRole,
  { label: string; isRight: boolean; bubbleClass: string; iconBg: string }
> = {
  user: {
    label: "User",
    isRight: true,
    bubbleClass: "bg-primary text-white rounded-[16px_4px_16px_16px]",
    iconBg: "bg-secondary",
  },
  assistant: {
    label: "AI Assistant",
    isRight: false,
    bubbleClass: "bg-white border border-border rounded-[4px_16px_16px_16px]",
    iconBg: "bg-secondary",
  },
  system: {
    label: "System",
    isRight: false,
    bubbleClass: "bg-muted border border-border rounded-[4px_16px_16px_16px] italic",
    iconBg: "bg-[#EFECE9]",
  },
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const cfg = ROLE_CONFIG[message.role] ?? ROLE_CONFIG.assistant
  const time = MonitorAsistenService.formatMessageTime(message.timestamp)

  return (
    <div
      className={cn(
        "flex items-start gap-2.5",
        cfg.isRight && "flex-row-reverse"
      )}
    >
      {/* Avatar icon */}
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          cfg.iconBg
        )}
      >
        {message.role === "user" ? (
          <User className="h-4 w-4 text-primary" strokeWidth={1.75} />
        ) : (
          <Bot className="h-4 w-4 text-primary" strokeWidth={1.75} />
        )}
      </div>

      {/* Bubble + metadata */}
      <div className={cn("max-w-[72%]", cfg.isRight && "items-end flex flex-col")}>
        {/* Role label */}
        <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {cfg.label}
        </p>

        {/* Bubble */}
        <div className={cn("px-4 py-2.5 text-sm leading-relaxed", cfg.bubbleClass)}>
          {message.content}
        </div>

        {/* Timestamp */}
        {time && (
          <p className="mt-1 text-[11px] text-muted-foreground">{time}</p>
        )}
      </div>
    </div>
  )
}

export default function ChatTranscript({
  messages,
  isLoading,
}: ChatTranscriptProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll ke pesan terbaru saat messages berubah
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Tidak ada pesan dalam percakapan ini.
        </p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto bg-[#FAFAF9] px-5 py-4">
      <div className="space-y-5">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
