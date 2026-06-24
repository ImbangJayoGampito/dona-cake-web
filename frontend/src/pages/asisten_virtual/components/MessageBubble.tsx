// src/pages/asisten/components/MessageBubble.tsx
import type { ChatMessage } from "@/models/chat-message.model"
import QuickReplies from "./QuickReplies"
import ProductCard from "./ProductCard"
import { cn } from "@/lib/utils"

interface MessageBubbleProps {
  message: ChatMessage
  isLatest: boolean
  isSending: boolean
  onQuickReply: (chip: string) => void
}

// Render teks dengan bold (**text**)
function renderText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return <span key={i}>{part}</span>
  })
}

export default function MessageBubble({
  message,
  isLatest,
  isSending,
  onQuickReply,
}: MessageBubbleProps) {
  const isUser = message.from === "user"

  return (
    <div
      className={cn(
        "flex gap-3",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar AI */}
      {!isUser && (
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8B5E3C]/10 text-sm">
          🤖
        </div>
      )}

      {/* Konten bubble */}
      <div
        className={cn(
          "max-w-[75%] space-y-2 sm:max-w-md lg:max-w-lg",
          isUser && "flex flex-col items-end"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "rounded-tr-sm bg-[#8B5E3C] text-white"
              : "rounded-tl-sm border border-border bg-background text-foreground shadow-sm"
          )}
        >
          {renderText(message.text)}
        </div>

        {/* Quick reply chips — hanya tampil di pesan AI terbaru */}
        {!isUser && message.chips && message.chips.length > 0 && isLatest && (
          <QuickReplies
            chips={message.chips}
            onSelect={onQuickReply}
            disabled={isSending}
          />
        )}

        {/* Product card */}
        {!isUser && message.productCard && (
          <ProductCard product={message.productCard} />
        )}

        {/* Timestamp */}
        <span
          className={cn(
            "block text-[10px] text-muted-foreground",
            isUser ? "text-right" : "text-left"
          )}
        >
          {new Date(message.timestamp).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  )
}
