// src/services/chat-service.ts
import api from "@/lib/api/config"
import ApiResponse from "@/lib/api/api-response"
import { ProtectedRoutes, AdminRoutes } from "@/lib/routes"
import { RouteService } from "./route-service"
import { ChatSession } from "@/models/chat-session.model"
import type { ChatSessionPreview } from "@/models/chat-session.model"
import type { ChatMessage } from "@/models/chat-message.model"
import { ChatMessageModel } from "@/models/chat-message.model"
import { ProdukService } from "./produk-service"
import { Produk } from "@/models/produk.model"
import type {
  FrontendMessagePayload,
  SendChatMessagePayload,
  ReportConversationPayload
} from "@/types/chatbot-chat.types"

// ─── Types ───────────────────────────────────────────────────────────────────

// Use the imported types instead of local definitions

export interface ConversationFilter {
  userId?: string
  keyword?: string
  status?: "active" | "ended" | "escalated"
  startDate?: string
  endDate?: string
  page?: number
  per_page?: number
}

export interface SendMessageResponse {
  userMessage: ChatMessage
  aiMessage: ChatMessage
}

// ─── Mock helpers (hapus saat backend siap) ──────────────────────────────────

const MOCK_SESSIONS: ChatSessionPreview[] = [
  {
    id: "sess_1",
    title: "Recommendation",
    lastMessage: "Rainbow Delight Cake...",
    updatedAt: new Date().toISOString(),
    isActive: true,
    status: "active",
  },
  {
    id: "sess_2",
    title: "Order #4521",
    lastMessage: "Status of my strawberry tart...",
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: "active",
  },
  {
    id: "sess_3",
    title: "Anniversary Cake",
    lastMessage: "Do you have tiered cakes?",
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: "ended",
  },
]

const MOCK_INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "msg_1",
    sessionId: "sess_1",
    from: "ai",
    type: "text_with_chips",
    text: "Halo! Saya Dona, asisten virtual Dona Cake. Senang sekali bisa membantu Anda hari ini. Ada yang bisa saya bantu untuk merayakan momen spesial Anda?",
    chips: ["Lihat Menu", "Status Pesanan", "Custom Cake"],
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: "msg_2",
    sessionId: "sess_1",
    from: "user",
    type: "text",
    text: "Saya sedang mencari kue ulang tahun yang cantik dan unik untuk akhir pekan ini.",
    timestamp: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
  },
  {
    id: "msg_3",
    sessionId: "sess_1",
    from: "ai",
    type: "text_with_product_card",
    text: "Berdasarkan preferensi Anda untuk sesuatu yang unik, saya sangat merekomendasikan **Rainbow Delight Cake** kami yang legendaris.",
    productCard: {
      id: "prod_001",
      name: "Rainbow Delight Cake",
      description:
        "Perpaduan 4 lapisan spons lembut dengan krim vanilla madu dan dekorasi emas 24k yang memukau.",
      price: 250000,
      badge: "Best Seller",
      slug: "rainbow-delight-cake",
      emoji: "🎂",
    },
    timestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
  },
]

// ─── USE_MOCK toggle ──────────────────────────────────────────────────────────
// Ubah ke false ketika backend sudah siap
const USE_MOCK = false

// ─── Service ─────────────────────────────────────────────────────────────────

export class ChatService {
  // ── Sesi ──────────────────────────────────────────────────────────────────

  static async getSessions(): Promise<ApiResponse<ChatSessionPreview[]>> {
    if (USE_MOCK) {
      return new ApiResponse<ChatSessionPreview[]>(
        MOCK_SESSIONS,
        "success",
        undefined,
        "Berhasil"
      )
    }
    try {
      const response = await api.get(ProtectedRoutes.ChatConversations)
      return new ApiResponse<ChatSessionPreview[]>(
        response.data.data ?? [],
        "success",
        undefined,
        response.data.message
      )
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      return new ApiResponse<ChatSessionPreview[]>([], "error", undefined, msg)
    }
  }

  static async createSession(): Promise<ApiResponse<ChatSession>> {
    if (USE_MOCK) {
      const newSession = new ChatSession({
        id: `sess_${Date.now()}`,
        title: "Percakapan Baru",
        status: "active",
      })
      return new ApiResponse<ChatSession>(newSession, "success", undefined, "Sesi dibuat")
    }
    try {
      const response = await api.post(ProtectedRoutes.StartConversation)
      return new ApiResponse<ChatSession>(
        new ChatSession(response.data.data),
        "success",
        undefined,
        response.data.message
      )
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      return new ApiResponse<ChatSession>(undefined, "error", undefined, msg)
    }
  }

  // ── Pesan ─────────────────────────────────────────────────────────────────

  static async getMessages(
    sessionId: string
  ): Promise<ApiResponse<ChatMessage[]>> {
    if (USE_MOCK) {
      const msgs =
        sessionId === "sess_1"
          ? MOCK_INITIAL_MESSAGES
          : [
              {
                id: "msg_init",
                sessionId,
                from: "ai" as const,
                type: "text_with_chips" as const,
                text: "Halo! Saya Dona, asisten virtual Dona Cake. Ada yang bisa saya bantu?",
                chips: ["Lihat Menu", "Status Pesanan", "Custom Cake"],
                timestamp: new Date().toISOString(),
              },
            ]
      return new ApiResponse<ChatMessage[]>(msgs, "success")
    }
    try {
      const url = RouteService.replaceParams(ProtectedRoutes.ConversationDetail, {
        id: sessionId,
      })
      const response = await api.get(url)

      // Transform backend history format to frontend message format
      const raw: ChatMessage[] = (response.data.data?.history ?? []).map(
        (h: any) => {
          // Parse JSON content if it's a string
          let content = h.content
          if (typeof content === 'string') {
            try {
              const parsed = JSON.parse(content)
              content = parsed.jawaban || content
            } catch (e) {
              // If not JSON, use as-is
            }
          }

          return new ChatMessageModel({
            id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            sessionId,
            from: h.role === 'user' ? 'user' : 'ai',
            type: 'text',
            text: content,
            timestamp: h.timestamp,
          })
        }
      )
      return new ApiResponse<ChatMessage[]>(raw, "success")
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      return new ApiResponse<ChatMessage[]>([], "error", undefined, msg)
    }
  }

  static async sendMessage(
    sessionId: string,
    payload: FrontendMessagePayload
  ): Promise<ApiResponse<SendMessageResponse>> {
    if (USE_MOCK) {
      const userMsg = new ChatMessageModel({
        id: `msg_u_${Date.now()}`,
        sessionId,
        from: "user",
        type: "text",
        text: payload.text ?? payload.intent ?? "",
        timestamp: new Date().toISOString(),
      })

      // Simulasikan beberapa jenis respons AI
      const text = (payload.text ?? payload.intent ?? "").toLowerCase()
      let aiMsg: ChatMessage

      if (text.includes("menu") || text.includes("lihat menu")) {
        aiMsg = new ChatMessageModel({
          id: `msg_a_${Date.now() + 1}`,
          sessionId,
          from: "ai",
          type: "text_with_product_card",
          text: "Tentu! Berikut salah satu produk unggulan kami yang mungkin Anda suka:",
          productCard: {
            id: "prod_002",
            name: "Strawberry Dream Cake",
            description: "Kue lapis stroberi segar dengan krim keju lembut.",
            price: 195000,
            badge: "Favorit",
            slug: "strawberry-dream-cake",
            emoji: "🍓",
          },
          timestamp: new Date().toISOString(),
        })
      } else if (text.includes("pesanan") || text.includes("status pesanan")) {
        aiMsg = new ChatMessageModel({
          id: `msg_a_${Date.now() + 1}`,
          sessionId,
          from: "ai",
          type: "text",
          text: "Untuk mengecek status pesanan Anda, silakan masukkan nomor pesanan atau saya bisa membantu Anda menuju halaman riwayat pesanan.",
          chips: ["Cek Pesanan Saya", "Hubungi CS"],
          timestamp: new Date().toISOString(),
        })
      } else if (text.includes("custom") || text.includes("custom cake")) {
        aiMsg = new ChatMessageModel({
          id: `msg_a_${Date.now() + 1}`,
          sessionId,
          from: "ai",
          type: "text",
          text: "Kami melayani custom cake untuk berbagai acara! Tim kami siap membantu mewujudkan kue impian Anda. Silakan kunjungi halaman Custom Cake kami atau hubungi CS kami.",
          chips: ["Lihat Custom Cake", "Hubungi CS"],
          timestamp: new Date().toISOString(),
        })
      } else if (
        text.includes("cs") ||
        text.includes("hubungi") ||
        text.includes("admin")
      ) {
        aiMsg = new ChatMessageModel({
          id: `msg_a_${Date.now() + 1}`,
          sessionId,
          from: "ai",
          type: "escalation_offer",
          text: "Sepertinya pertanyaan Anda membutuhkan bantuan lebih lanjut dari tim kami. Apakah Anda ingin saya menghubungkan Anda dengan Customer Service kami?",
          chips: ["Ya, Hubungkan Saya", "Tidak, Terima Kasih"],
          timestamp: new Date().toISOString(),
        })
      } else {
        aiMsg = new ChatMessageModel({
          id: `msg_a_${Date.now() + 1}`,
          sessionId,
          from: "ai",
          type: "text",
          text: "Terima kasih atas pertanyaan Anda! Saya akan membantu sepenuh hati. Ada hal lain yang ingin Anda tanyakan tentang produk atau layanan kami?",
          chips: ["Lihat Menu", "Custom Cake", "Hubungi CS"],
          timestamp: new Date().toISOString(),
        })
      }

      return new ApiResponse<SendMessageResponse>(
        { userMessage: userMsg, aiMessage: aiMsg },
        "success"
      )
    }

    try {
      const url = RouteService.replaceParams(ProtectedRoutes.SendMessage, {
        id: sessionId,
      })
      // Transform frontend payload to backend-required format
      const backendPayload: SendChatMessagePayload = {
        prompt: payload.text ?? payload.intent ?? ""
      }
      const response = await api.post(url, backendPayload)

       // Transform backend response to frontend expected format
       const userMessage = new ChatMessageModel({
         id: `msg_${Date.now()}`,
         sessionId,
         from: "user" as const,
         type: "text" as const,
         text: payload.text ?? payload.intent ?? "",
         timestamp: new Date().toISOString(),
       })

       // Parse the backend response which may contain product IDs
       let aiMessage: ChatMessageModel
       const backendResponse = response.data.data.response

       // Check if response contains JSON with jawaban and id_produk
       if (typeof backendResponse === 'string') {
         try {
           const parsedResponse = JSON.parse(backendResponse)
           if (parsedResponse.jawaban && parsedResponse.id_produk) {
             // This is the new format with product recommendations
             aiMessage = new ChatMessageModel({
               id: `msg_${Date.now() + 1}`,
               sessionId,
               from: "ai" as const,
               type: "text_with_product_card" as const,
               text: parsedResponse.jawaban,
               timestamp: new Date().toISOString(),
               // We'll fetch product details separately and add them to the message
               productCard: {
                 id: parsedResponse.id_produk.join(','), // Store as comma-separated string
                 name: "Loading products...",
                 description: "Fetching product details...",
                 emoji: "🎂",
               }
             })
           } else {
             // Fallback to text-only message
             aiMessage = new ChatMessageModel({
               id: `msg_${Date.now() + 1}`,
               sessionId,
               from: "ai" as const,
               type: "text" as const,
               text: parsedResponse.jawaban || backendResponse,
               timestamp: new Date().toISOString(),
             })
           }
         } catch (e) {
           // If not JSON, use as-is
           aiMessage = new ChatMessageModel({
             id: `msg_${Date.now() + 1}`,
             sessionId,
             from: "ai" as const,
             type: "text" as const,
             text: backendResponse,
             timestamp: new Date().toISOString(),
           })
         }
       } else {
         // Direct text response
         aiMessage = new ChatMessageModel({
           id: `msg_${Date.now() + 1}`,
           sessionId,
           from: "ai" as const,
           type: "text" as const,
           text: backendResponse,
           timestamp: new Date().toISOString(),
         })
       }

      return new ApiResponse<SendMessageResponse>(
        { userMessage, aiMessage },
        "success",
        response.data.message
      )
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      return new ApiResponse<SendMessageResponse>(
        undefined,
        "error",
        undefined,
        msg
      )
    }
  }

  // ── Aksi sesi ─────────────────────────────────────────────────────────────

  static async resetConversation(
    sessionId: string
  ): Promise<ApiResponse<void>> {
    if (USE_MOCK) {
      return new ApiResponse<void>(undefined, "success", undefined, "Percakapan direset")
    }
    try {
      const url = RouteService.replaceParams(
        ProtectedRoutes.ResetConversation,
        { id: sessionId }
      )
      const response = await api.post(url)
      return new ApiResponse<void>(
        undefined,
        "success",
        undefined,
        response.data.message
      )
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      return new ApiResponse<void>(undefined, "error", undefined, msg)
    }
  }

  static async escalateSession(
    sessionId: string,
    payload: ReportConversationPayload
  ): Promise<ApiResponse<void>> {
    if (USE_MOCK) {
      return new ApiResponse<void>(
        undefined,
        "success",
        undefined,
        "Sesi dieskalasi ke CS"
      )
    }
    try {
      const url = RouteService.replaceParams(
        ProtectedRoutes.ReportConversation,
        { id: sessionId }
      )
      const response = await api.post(url, payload)
      return new ApiResponse<void>(
        undefined,
        "success",
        undefined,
        response.data.message
      )
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      return new ApiResponse<void>(undefined, "error", undefined, msg)
    }
  }

  static async endSession(sessionId: string): Promise<ApiResponse<void>> {
    if (USE_MOCK) {
      return new ApiResponse(
        undefined,
        "success",
        undefined,
        "Percakapan diakhiri"
      )
    }
    try {
      const url = RouteService.replaceParams(ProtectedRoutes.EndConversation, {
        id: sessionId,
      })
      const response = await api.post(url)
      return new ApiResponse<void>(
        undefined,
        "success",
        undefined,
        response.data.message
      )
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      return new ApiResponse<void>(undefined, "error", undefined, msg)
    }
  }

  /**
   * Fetch product details for a message that contains product IDs
   * and update the message with the product information
   */
  static async fetchAndUpdateProductDetails(message: ChatMessage): Promise<ChatMessage> {
    if (!message.productCard || !message.productCard.id) {
      return message
    }

    // Parse the product IDs (they're stored as comma-separated string)
    const productIds = message.productCard.id.split(',').map(id => id.trim())

    // Add timeout to prevent infinite loading
    const timeoutPromise = new Promise<ChatMessage>((resolve) => {
      setTimeout(() => {
        console.warn("Product fetch timed out, removing product card")
        const updatedMessage = new ChatMessageModel({ ...message })
        updatedMessage.productCard = undefined
        resolve(updatedMessage)
      }, 10000) // 10 second timeout
    })

    try {
      // Race between the actual fetch and the timeout
      const result = await Promise.race([
        (async () => {
      // Fetch product details for each ID with better error handling
      const products = await Promise.all(
        productIds.map(async (id) => {
          try {
            console.log(`Fetching product with ID: ${id}`)
            return await ProdukService.getProductById(parseInt(id))
          } catch (error) {
            console.error(`Failed to fetch product ID ${id}:`, error)
            // Return a failed response so we can filter it out
            return new ApiResponse<Produk>(undefined, "error", undefined, `Failed to fetch product ${id}`)
          }
        })
      )

          // Filter successful responses
          const successfulProducts = products
            .filter((response: ApiResponse<Produk>) => response.isSuccess())
            .map((response: ApiResponse<Produk>) => response.data)

          if (successfulProducts.length === 0) {
            // No products found, remove the product card
            const updatedMessage = new ChatMessageModel({ ...message })
            updatedMessage.productCard = undefined
            return updatedMessage
          }

          // For now, just use the first product found
          // In a real implementation, you might want to show multiple products
          const firstProduct = successfulProducts[0]

          if (!firstProduct) {
            // No product found, remove the product card
            const updatedMessage = new ChatMessageModel({ ...message })
            updatedMessage.productCard = undefined
            return updatedMessage
          }

          // Update the message with the product details
          const kategoriName = firstProduct.kategori 
            ? (typeof firstProduct.kategori === 'string' 
                ? firstProduct.kategori 
                : (firstProduct.kategori as any).nama_kategori ?? "Rekomendasi")
            : "Rekomendasi"

          const updatedMessage = new ChatMessageModel({
            ...message,
            productCard: {
              id: firstProduct.id.toString(),
              name: firstProduct.nama_produk,
              description: firstProduct.deskripsi || "Produk lezat dari Dona Cake",
              price: firstProduct.harga,
              badge: kategoriName,
              slug: "", // Produk model doesn't have slug property
              imageUrl: firstProduct.gambars && firstProduct.gambars.length > 0 ? firstProduct.gambars[0].gambar_url : undefined,
              emoji: "🎂",
            }
          })

          return updatedMessage
        })(),
        timeoutPromise
      ])

      return result

    } catch (error) {
      console.error("Failed to fetch product details:", error)
      // Remove product card on error to prevent infinite loading
      const updatedMessage = new ChatMessageModel({ ...message })
      updatedMessage.productCard = undefined
      return updatedMessage
    }
  }

  // ── Admin ─────────────────────────────────────────────────────────────────

  static async adminGetSessions(
    filter?: ConversationFilter
  ): Promise<ApiResponse<ChatSessionPreview[]>> {
    if (USE_MOCK) {
      return new ApiResponse<ChatSessionPreview[]>(
        MOCK_SESSIONS,
        "success"
      )
    }
    try {
      const params = new URLSearchParams()
      if (filter?.keyword) params.append("keyword", filter.keyword)
      if (filter?.status) params.append("status", filter.status)
      if (filter?.userId) params.append("user_id", filter.userId)
      if (filter?.startDate) params.append("start_date", filter.startDate)
      if (filter?.endDate) params.append("end_date", filter.endDate)
      if (filter?.page) params.append("page", filter.page.toString())

      const response = await api.get(AdminRoutes.AdminChatConversations, {
        params,
      })
      return new ApiResponse<ChatSessionPreview[]>(
        response.data.data ?? [],
        "success"
      )
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      return new ApiResponse<ChatSessionPreview[]>([], "error", undefined, msg)
    }
  }

  static async adminGetSessionDetail(
    sessionId: string
  ): Promise<ApiResponse<{ session: ChatSession; messages: ChatMessage[] }>> {
    if (USE_MOCK) {
      let sessionTitle = "Recommendation"
      let mockMsgs: ChatMessage[] = MOCK_INITIAL_MESSAGES

      if (sessionId === "sess_2") {
        sessionTitle = "Order #4521"
        mockMsgs = [
          {
            id: "msg_2_1",
            sessionId,
            from: "user",
            type: "text",
            text: "Halo, saya ingin menanyakan status pesanan saya.",
            timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
          },
          {
            id: "msg_2_2",
            sessionId,
            from: "ai",
            type: "text",
            text: "Halo! Tentu, silakan masukkan nomor pesanan Anda.",
            timestamp: new Date(Date.now() - 9 * 60 * 1000).toISOString(),
          },
          {
            id: "msg_2_3",
            sessionId,
            from: "user",
            type: "text",
            text: "Nomor pesanan saya #4521.",
            timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
          },
          {
            id: "msg_2_4",
            sessionId,
            from: "ai",
            type: "text",
            text: "Terima kasih! Pesanan **#4521 (Strawberry Tart)** Anda saat ini berstatus **DIPROSES** dan dijadwalkan selesai hari ini.",
            chips: ["Lacak Detail", "Hubungi CS"],
            timestamp: new Date(Date.now() - 7 * 60 * 1000).toISOString(),
          },
        ]
      } else if (sessionId === "sess_3") {
        sessionTitle = "Anniversary Cake"
        mockMsgs = [
          {
            id: "msg_3_1",
            sessionId,
            from: "user",
            type: "text",
            text: "Apakah Dona Cake menyediakan cake anniversary bertingkat?",
            timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
          },
          {
            id: "msg_3_2",
            sessionId,
            from: "ai",
            type: "text",
            text: "Ya, kami menyediakan custom anniversary cake bertingkat! Anda bisa memesannya melalui menu **Custom Cake**.",
            chips: ["Pesan Custom Cake", "Tanya Rasa"],
            timestamp: new Date(Date.now() - 59 * 60 * 1000).toISOString(),
          },
        ]
      } else if (sessionId !== "sess_1") {
        sessionTitle = "Percakapan Baru"
        mockMsgs = [
          {
            id: "msg_new_1",
            sessionId,
            from: "ai",
            type: "text_with_chips",
            text: "Halo! Saya Dona, asisten virtual Dona Cake. Ada yang bisa saya bantu?",
            chips: ["Lihat Menu", "Status Pesanan", "Custom Cake"],
            timestamp: new Date().toISOString(),
          },
        ]
      }

      const session = new ChatSession({
        id: sessionId,
        title: sessionTitle,
        status: "active",
      })

      return new ApiResponse(
        { session, messages: mockMsgs },
        "success"
      )
    }
    try {
      const url = RouteService.replaceParams(
        AdminRoutes.AdminChatConversationDetail,
        { chatbotLog: sessionId }
      )
      const response = await api.get(url)
      return new ApiResponse(response.data.data, "success")
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      return new ApiResponse<{ session: ChatSession; messages: ChatMessage[] }>(undefined, "error", undefined, msg)
    }
  }
}
