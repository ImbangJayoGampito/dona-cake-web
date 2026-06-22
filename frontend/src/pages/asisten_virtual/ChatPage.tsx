// src/pages/asisten/ChatPage.tsx
import { useEffect, useState } from "react"
import { useChatStore } from "@/lib/state/chat-store"
import ChatSidebar from "./components/ChatSidebar"
import ChatHeader from "./components/ChatHeader"
import MessageList from "./components/MessageList"
import ChatInput from "./components/ChatInput"
import EscalationBanner from "./components/EscalationBanner"
import { toast } from "sonner"

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

  // Muat sesi saat halaman pertama kali dibuka
  useEffect(() => {
    loadSessions()
  }, [loadSessions])

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

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex max-h-[calc(100vh-56px)] flex-1 overflow-hidden">
        {/* Sidebar */}
        <ChatSidebar
          sessions={sessions}
          activeSessionId={activeSessionId}
          isLoading={isLoadingSessions}
          onNewChat={createNewSession}
          onSelectSession={selectSession}
        />

        {/* Area chat utama */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <ChatHeader
            isEscalated={isEscalated}
            onReset={handleReset}
            onEscalate={handleEscalate}
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
