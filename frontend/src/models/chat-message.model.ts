// src/models/chat-message.model.ts

export type MessageFrom = "user" | "ai" | "cs"
export type MessageType =
  | "text"
  | "text_with_chips"
  | "text_with_product_card"
  | "escalation_offer"

export interface ProductPreview {
  id?: string
  name: string
  description: string
  price?: number
  badge?: string
  slug?: string
  imageUrl?: string
  emoji?: string
}

export interface ChatMessage {
  id: string
  sessionId: string
  from: MessageFrom
  type: MessageType
  text: string
  chips?: string[]
  productCard?: ProductPreview
  timestamp: string
}

export class ChatMessageModel implements ChatMessage {
  id: string
  sessionId: string
  from: MessageFrom
  type: MessageType
  text: string
  chips?: string[]
  productCard?: ProductPreview
  timestamp: string

  constructor(data: Partial<ChatMessage>) {
    this.id = data.id ?? `msg_${Date.now()}`
    this.sessionId = data.sessionId ?? ""
    this.from = data.from ?? "ai"
    this.type = data.type ?? "text"
    this.text = data.text ?? ""
    this.chips = data.chips
    this.productCard = data.productCard
    this.timestamp = data.timestamp ?? new Date().toISOString()
  }
}
