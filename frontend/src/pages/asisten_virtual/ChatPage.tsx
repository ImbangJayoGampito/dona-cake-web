// src/pages/asisten/ChatPage.tsx
import { useEffect, useState } from "react"
import { useChatStore } from "@/lib/state/chat-store"
import ChatSidebar from "./components/ChatSidebar"
import ChatHeader from "./components/ChatHeader"
import MessageList from "./components/MessageList"
import ChatInput from "./components/ChatInput"
import EscalationBanner from "./components/EscalationBanner"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function ChatPage() {
  const {
    sessions,
    activeSessionId,
    messages,
    isLoadingSessions,
    isLoadingMessages,
    isSendingMessage,
    isEscalated,
    error,
    loadSessions,
    createNewSession,
    selectSession,
    sendMessage,
    sendQuickReply,
    resetConversation,
    escalate,
    clearError,
  } = useChatStore()

  const [showEscalationBanner, setShowEscalationBanner] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)

  // Muat sesi saat halaman pertama kali dibuka
  useEffect(() => {
    loadSessions()
  }, [loadSessions])

  // Sembunyikan sidebar di mobile ketika ada sesi aktif baru
  useEffect(() => {
    if (activeSessionId && window.innerWidth < 768) {
      setShowSidebar(false)
    }
  }, [activeSessionId])

  // Tampilkan error sebagai toast
  useEffect(() => {
    if (error) {
      toast.error(error)
      clearError()
    }
  }, [error, clearError])

  // Tampilkan banner eskalasi saat AI menawarkan
  useEffect(() => {
    if (isEscalated) {
      setShowEscalationBanner(true)
    }
  }, [isEscalated])

  const handleReset = async () => {
    await resetConversation()
    setShowEscalationBanner(false)
    toast.success("Percakapan berhasil direset")
  }

  const handleEscalate = async () => {
    await escalate()
    setShowEscalationBanner(false)
    toast.success("Anda akan segera dihubungkan dengan CS kami")
  }

  const handleSelectSession = async (id: string) => {
    await selectSession(id)
    if (window.innerWidth < 768) {
      setShowSidebar(false)
    }
  }

  const handleNewChat = async () => {
    await createNewSession()
    if (window.innerWidth < 768) {
      setShowSidebar(false)
    }
  }

  const handleToggleSidebar = () => {
    setShowSidebar((prev) => !prev)
  }

  return (
    <div className="flex h-[calc(100dvh-64px)] w-full flex-col bg-background overflow-hidden">
      <div
        className={cn(
          "flex flex-1 min-h-0 transition-transform duration-300 ease-in-out md:w-full md:translate-x-0",
          showSidebar ? "w-[200vw] translate-x-0" : "w-[200vw] -translate-x-1/2"
        )}
      >
        {/* Sidebar Wrapper */}
        <div
          className={cn(
            "border-r border-border shrink-0 flex flex-col transition-all duration-300 ease-in-out overflow-hidden",
            showSidebar
              ? "w-[100vw] md:w-80 opacity-100"
              : "w-[100vw] md:w-0 md:opacity-0 md:border-r-0"
          )}
        >
          <ChatSidebar
            sessions={sessions}
            activeSessionId={activeSessionId}
            isLoading={isLoadingSessions}
            onNewChat={handleNewChat}
            onSelectSession={handleSelectSession}
          />
        </div>

        {/* Area chat utama */}
        <div className="flex min-w-0 min-h-0 w-[100vw] md:w-auto flex-1 flex-col">
          {/* Header */}
          <ChatHeader
            isEscalated={isEscalated}
            onReset={handleReset}
            onEscalate={handleEscalate}
            showSidebar={showSidebar}
            onToggleSidebar={handleToggleSidebar}
          />

          {/* Daftar pesan */}
          <MessageList
            messages={messages}
            isLoading={isLoadingMessages}
            isSending={isSendingMessage}
            onQuickReply={sendQuickReply}
          />

          {/* Banner eskalasi */}
          {showEscalationBanner && !isEscalated && (
            <EscalationBanner
              onEscalate={handleEscalate}
              onDismiss={() => setShowEscalationBanner(false)}
            />
          )}

          {/* Input */}
          <ChatInput
            onSend={sendMessage}
            disabled={isSendingMessage}
          />
        </div>
      </div>
    </div>
  )
}
