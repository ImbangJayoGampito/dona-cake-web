// src/lib/state/chat-store.ts
import { create } from "zustand"
import { ChatService } from "@/services/chat-service"
import type { ChatSessionPreview } from "@/models/chat-session.model"
import type { ChatMessage } from "@/models/chat-message.model"

interface ChatStore {
  // ── State ────────────────────────────────────────────────────────────────
  sessions: ChatSessionPreview[]
  activeSessionId: string | null
  messages: ChatMessage[]
  isLoadingSessions: boolean
  isLoadingMessages: boolean
  isSendingMessage: boolean
  isEscalated: boolean
  error: string | null

  // ── Actions ───────────────────────────────────────────────────────────────
  loadSessions: () => Promise<void>
  createNewSession: () => Promise<void>
  selectSession: (sessionId: string) => Promise<void>
  sendMessage: (text: string) => Promise<void>
  sendQuickReply: (intent: string) => Promise<void>
  resetConversation: () => Promise<void>
  escalate: () => Promise<void>
  clearError: () => void
}

export const useChatStore = create<ChatStore>((set, get) => ({
  sessions: [],
  activeSessionId: null,
  messages: [],
  isLoadingSessions: false,
  isLoadingMessages: false,
  isSendingMessage: false,
  isEscalated: false,
  error: null,

  clearError: () => set({ error: null }),

  loadSessions: async () => {
    set({ isLoadingSessions: true, error: null })
    const result = await ChatService.getSessions()
    if (result.isSuccess()) {
      const sessions = result.data ?? []
      set({ sessions, isLoadingSessions: false })

      // Auto-select sesi pertama jika belum ada yang aktif
      if (sessions.length > 0 && !get().activeSessionId) {
        await get().selectSession(sessions[0].id)
      } else if (sessions.length > 0 && get().activeSessionId) {
        // Jika sudah ada sesi aktif, muat ulang pesannya
        const activeSession = sessions.find(s => s.id === get().activeSessionId)
        if (activeSession) {
          await get().selectSession(activeSession.id)
        }
      }
    } else {
      set({
        isLoadingSessions: false,
        error: result.message ?? "Gagal memuat percakapan",
      })
    }
  },

  createNewSession: async () => {
    set({ isLoadingMessages: true, error: null })
    const result = await ChatService.createSession()
    if (result.isSuccess()) {
      const newSession = result.data!
      const preview: ChatSessionPreview = {
        id: newSession.id,
        title: newSession.title,
        lastMessage: "",
        updatedAt: newSession.updatedAt,
        isActive: true,
        status: "active",
      }
      // Tandai sesi lama tidak aktif, tambahkan sesi baru di atas
      const updatedSessions = [
        preview,
        ...get().sessions.map((s) => ({ ...s, isActive: false })),
      ]
      set({ sessions: updatedSessions, activeSessionId: newSession.id })

      // Kirim pesan awal otomatis untuk memulai percakapan
      const greetingResult = await ChatService.sendMessage(newSession.id, {
        text: "Halo"
      })

      if (greetingResult.isSuccess()) {
        // Muat pesan awal sesi baru (sekarang akan ada pesan)
        await get().selectSession(newSession.id)
      } else {
        // Jika gagal kirim pesan awal, muat sesi kosong
        await get().selectSession(newSession.id)
        set({
          isLoadingMessages: false,
          error: greetingResult.message ?? "Gagal memulai percakapan",
        })
      }
    } else {
      set({
        isLoadingMessages: false,
        error: result.message ?? "Gagal membuat percakapan baru",
      })
    }
  },

  selectSession: async (sessionId: string) => {
    set({
      activeSessionId: sessionId,
      isLoadingMessages: true,
      isEscalated: false,
      error: null,
      // Update isActive di sessions
      sessions: get().sessions.map((s) => ({
        ...s,
        isActive: s.id === sessionId,
      })),
    })
    const result = await ChatService.getMessages(sessionId)
    if (result.isSuccess()) {
      set({ messages: result.data ?? [], isLoadingMessages: false })
    } else {
      set({
        isLoadingMessages: false,
        error: result.message ?? "Gagal memuat pesan",
      })
    }
  },

   sendMessage: async (text: string) => {
     const sessionId = get().activeSessionId
     if (!sessionId || !text.trim()) return

     set({ isSendingMessage: true, error: null })
     const result = await ChatService.sendMessage(sessionId, { text })

     if (result.isSuccess()) {
       const { userMessage, aiMessage } = result.data!

       // Check if the AI message contains product IDs that need to be fetched
       let finalAiMessage = aiMessage
       if (aiMessage.productCard && aiMessage.productCard.id) {
         try {
           // Fetch product details and update the message
           finalAiMessage = await ChatService.fetchAndUpdateProductDetails(aiMessage)
         } catch (err) {
           console.error("Failed to fetch product details, showing message without product card:", err)
           // If product fetch fails, still show the message but without the product card
           const fallbackMessage = { ...aiMessage }
           fallbackMessage.productCard = undefined
           finalAiMessage = fallbackMessage
         }
       }

       set((state) => ({
         messages: [...state.messages, userMessage, finalAiMessage],
         isSendingMessage: false,
         // Update preview sesi di sidebar
         sessions: state.sessions.map((s) =>
           s.id === sessionId
             ? {
                 ...s,
                 lastMessage: text,
                 updatedAt: new Date().toISOString(),
               }
             : s
         ),
         // Tandai eskalasi jika tipe pesan adalah escalation_offer
         isEscalated:
           finalAiMessage.type === "escalation_offer" ? true : state.isEscalated,
       }))
     } else {
       set({
         isSendingMessage: false,
         error: result.message ?? "Gagal mengirim pesan",
       })
     }
   },

   sendQuickReply: async (intent: string) => {
     const sessionId = get().activeSessionId
     if (!sessionId) return

     set({ isSendingMessage: true, error: null })
     const result = await ChatService.sendMessage(sessionId, {
       text: intent,
       intent,
     })

     if (result.isSuccess()) {
       const { userMessage, aiMessage } = result.data!
       set((state) => ({
         messages: [...state.messages, userMessage, aiMessage],
         isSendingMessage: false,
         isEscalated:
           aiMessage.type === "escalation_offer" ? true : state.isEscalated,
       }))
     } else {
       set({
         isSendingMessage: false,
         error: result.message ?? "Gagal mengirim",
       })
     }
   },

  resetConversation: async () => {
    const sessionId = get().activeSessionId
    if (!sessionId) return

    const result = await ChatService.resetConversation(sessionId)
    if (result.isSuccess()) {
      // Muat ulang pesan (greeting baru dari server)
      await get().selectSession(sessionId)
      set({ isEscalated: false })
    } else {
      set({ error: result.message ?? "Gagal mereset percakapan" })
    }
  },

  escalate: async () => {
    const sessionId = get().activeSessionId
    if (!sessionId) return

    const result = await ChatService.escalateSession(sessionId, {
      alasan: "Percakapan membutuhkan bantuan manusia",
      komentar: "Pengguna meminta untuk dihubungkan dengan CS"
    })
    if (result.isSuccess()) {
      set((state) => ({
        isEscalated: true,
        sessions: state.sessions.map((s) =>
          s.id === sessionId ? { ...s, status: "escalated" } : s
        ),
      }))
    } else {
      set({ error: result.message ?? "Gagal eskalasi ke CS" })
    }
  },
}))