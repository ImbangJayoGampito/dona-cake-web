import { AdminRoutes } from "@/lib/routes"
import ApiResponse from "@/lib/api/api-response"
import api from "@/lib/api/config"
import { RouteService } from "@/services/route-service"

/**
 * Tipe status percakapan di backend.
 * Catatan: "eskalasi" TIDAK ADA di backend — desain Stitch menampilkan ini
 * tapi tidak ada di database/controller. Badge "Eskalasi" diganti "Dilaporkan".
 */
export type StatusFlag = "aktif" | "dilaporkan" | "selesai"

/** Role pesan: hanya "user" dan "assistant" yang ada di backend saat ini. */
export type MessageRole = "user" | "assistant" | "system"

export interface ChatMessage {
  role: MessageRole
  content: string
  timestamp: string
}

export interface ChatbotLogUser {
  id: number
  name: string
  username: string
  email: string
  role: string
}

/**
 * Item dalam list GET /chatbot/admin/conversations.
 * Field: histori_percakapan (array JSON), status_flag (string).
 */
export interface ChatbotLogListItem {
  id: number
  user_id: number
  histori_percakapan: ChatMessage[]
  status_flag: StatusFlag
  created_at: string
  updated_at: string
  user: ChatbotLogUser
}

/**
 * Detail dari GET /chatbot/admin/conversations/{chatbotLog}.
 * Backend memetakan ulang: histori_percakapan → history, status_flag → status.
 */
export interface ChatbotLogDetail {
  id: number
  user: ChatbotLogUser
  history: ChatMessage[]
  status: StatusFlag
  created_at: string
  updated_at: string
}

export class MonitorAsistenService {
  /**
   * GET /chatbot/admin/conversations
   * List semua percakapan (semua user) — hanya bisa diakses admin.
   */
  static async getConversations(): Promise<ApiResponse<ChatbotLogListItem[]>> {
    try {
      const response = await api.get(AdminRoutes.AdminChatConversations)
      return ApiResponse.fromApiArray(response.data, (data) => data as ChatbotLogListItem)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<ChatbotLogListItem[]>(undefined, "error", undefined, message)
    }
  }

  /**
   * GET /chatbot/admin/conversations/{chatbotLog}
   * Detail satu percakapan termasuk seluruh histori pesan.
   */
  static async getConversationDetail(
    id: number
  ): Promise<ApiResponse<ChatbotLogDetail>> {
    try {
      const url = RouteService.replaceParams(
        AdminRoutes.AdminChatConversationDetail,
        { chatbotLog: id.toString() }
      )
      const response = await api.get(url)
      return ApiResponse.fromApiSingle(
        response.data,
        (data) => data as ChatbotLogDetail
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new ApiResponse<ChatbotLogDetail>(undefined, "error", undefined, message)
    }
  }

  /** Helper: ambil preview teks dari pesan terakhir percakapan. */
  static getLastMessagePreview(item: ChatbotLogListItem): string {
    const messages = item.histori_percakapan
    if (!messages || messages.length === 0) return "Tidak ada pesan"
    const last = messages[messages.length - 1]
    const preview = last.content.slice(0, 80)
    return preview.length < last.content.length ? `${preview}...` : preview
  }

  /** Helper: format timestamp relatif (mis. "5 menit yang lalu"). */
  static getRelativeTime(dateStr: string): string {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return "-"
    const diffMs = Date.now() - date.getTime()
    const diffMin = Math.floor(diffMs / 60_000)
    if (diffMin < 1) return "Baru saja"
    if (diffMin < 60) return `${diffMin} menit yang lalu`
    const diffHour = Math.floor(diffMin / 60)
    if (diffHour < 24) return `${diffHour} jam yang lalu`
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" })
  }

  /** Helper: format waktu pesan dalam transcript (HH:MM). */
  static formatMessageTime(timestamp: string): string {
    const date = new Date(timestamp)
    if (isNaN(date.getTime())) return ""
    return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
  }
}
