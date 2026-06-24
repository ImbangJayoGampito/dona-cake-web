import { MoreVertical, RotateCcw, PhoneCall, ArrowLeft, Menu } from "lucide-react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ChatHeaderProps {
  isEscalated: boolean
  onReset: () => void
  onEscalate: () => void
  showSidebar: boolean
  onToggleSidebar: () => void
}

export default function ChatHeader({
  isEscalated,
  onReset,
  onEscalate,
  showSidebar,
  onToggleSidebar,
}: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-border bg-background px-5 py-3">
      {/* AI identity */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="mr-1 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground flex items-center justify-center"
          title={showSidebar ? "Sembunyikan daftar percakapan" : "Tampilkan daftar percakapan"}
        >
          <span className="block md:hidden">
            <ArrowLeft size={20} />
          </span>
          <span className="hidden md:block">
            <Menu size={20} />
          </span>
        </button>
        <div className="relative">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8B5E3C]/10 text-base">
            🤖
          </div>
          <div className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-green-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Dona AI</p>
          <p className="text-[10px] font-medium text-green-500">
            {isEscalated ? "Terhubung dengan CS" : "Online"}
          </p>
        </div>
      </div>

      {/* Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <MoreVertical size={18} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onReset} className="gap-2 text-sm">
            <RotateCcw size={14} />
            Reset percakapan
          </DropdownMenuItem>
          {!isEscalated && (
            <DropdownMenuItem
              onClick={onEscalate}
              className="gap-2 text-sm text-amber-600"
            >
              <PhoneCall size={14} />
              Hubungi CS
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
