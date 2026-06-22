// src/models/chat-session.model.ts

export interface ChatSessionPreview {
  id: string
  title: string
  lastMessage: string
  updatedAt: string
  isActive?: boolean
  status: "active" | "ended" | "escalated"
}

export class ChatSession {
  id: string
  userId: string
  title: string
  status: "active" | "ended" | "escalated"
  createdAt: string
  updatedAt: string

  constructor(data: Partial<ChatSession>) {
    this.id = data.id ?? ""
    this.userId = data.userId ?? ""
    this.title = data.title ?? "Percakapan Baru"
    this.status = data.status ?? "active"
    this.createdAt = data.createdAt ?? new Date().toISOString()
    this.updatedAt = data.updatedAt ?? new Date().toISOString()
  }

  toPreview(lastMessage = "", isActive = false): ChatSessionPreview {
    return {
      id: this.id,
      title: this.title,
      lastMessage,
      updatedAt: this.updatedAt,
      isActive,
      status: this.status,
    }
  }
}
