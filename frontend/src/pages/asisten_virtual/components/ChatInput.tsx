// src/pages/asisten/components/ChatInput.tsx
import { useState, KeyboardEvent } from "react"
import { Input } from "@/components/ui/input"
import { Paperclip, Smile, Send } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSend: (text: string) => void
  disabled?: boolean
  placeholder?: string
}

export default function ChatInput({
  onSend,
  disabled = false,
  placeholder = "Tulis pesan untuk Dona...",
}: ChatInputProps) {
  const [value, setValue] = useState("")

  const handleSend = () => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue("")
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t border-border bg-background px-4 py-3">
      <div className="flex items-center gap-2">
        {/* Attachment button (placeholder — belum ada implementasi upload) */}
        <button
          disabled={disabled}
          className="shrink-0 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
          title="Lampirkan file"
        >
          <Paperclip size={18} />
        </button>

        {/* Emoji button (placeholder) */}
        <button
          disabled={disabled}
          className="shrink-0 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
          title="Emoji"
        >
          <Smile size={18} />
        </button>

        {/* Text input */}
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? "Mengirim..." : placeholder}
          disabled={disabled}
          className="flex-1 bg-muted/30 text-sm focus-visible:ring-0"
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors",
            disabled || !value.trim()
              ? "cursor-not-allowed bg-muted text-muted-foreground"
              : "bg-[#8B5E3C] text-white hover:bg-[#7a5234]"
          )}
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  )
}
