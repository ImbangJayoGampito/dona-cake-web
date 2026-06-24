// src/pages/asisten/components/MessageList.tsx
import { useEffect, useRef } from "react"
import type { ChatMessage } from "@/models/chat-message.model"
import MessageBubble from "./MessageBubble"

interface MessageListProps {
  messages: ChatMessage[]
  isLoading: boolean
  isSending: boolean
  onQuickReply: (chip: string) => void
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8B5E3C]/10 text-sm">
        🤖
      </div>
      <div className="rounded-2xl rounded-tl-sm border border-border bg-background px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function MessageList({
  messages,
  isLoading,
  isSending,
  onQuickReply,
}: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll ke bawah setiap ada pesan baru atau saat mengetik
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scrollToBottom = () => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      })
    }

    // Jalankan segera
    scrollToBottom()

    // Jalankan setelah sedikit penundaan untuk memastikan rendering selesai (misal chip quick replies)
    const timeoutId = setTimeout(scrollToBottom, 100)

    return () => clearTimeout(timeoutId)
  }, [messages, isSending])

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="space-y-1 text-center">
          <div className="text-2xl">💬</div>
          <p className="text-xs text-muted-foreground">Memuat percakapan...</p>
        </div>
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="space-y-2 text-center">
          <div className="text-3xl">🎂</div>
          <p className="text-sm font-medium text-foreground">
            Mulai percakapan dengan Dona
          </p>
          <p className="text-xs text-muted-foreground">
            Tanyakan apa saja tentang produk & layanan kami
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 space-y-4 overflow-y-auto px-5 py-4"
    >
      {messages.map((msg, idx) => (
        <MessageBubble
          key={msg.id}
          message={msg}
          isLatest={idx === messages.length - 1}
          isSending={isSending}
          onQuickReply={onQuickReply}
        />
      ))}

      {/* Typing indicator saat AI sedang balas */}
      {isSending && <TypingIndicator />}
    </div>
  )
}
