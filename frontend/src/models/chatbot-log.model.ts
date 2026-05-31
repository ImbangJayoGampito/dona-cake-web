// models/chatbot-log.model.ts

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp?: Date
}

export class ChatbotLog {
  id: number
  user_id: number
  histori_percakapan: string
  status_flag: string
  created_at: Date
  updated_at: Date

  constructor(data: Partial<ChatbotLog> = {}) {
    this.id = data.id ?? 0
    this.user_id = data.user_id ?? 0
    this.histori_percakapan = data.histori_percakapan ?? '[]'
    this.status_flag = data.status_flag ?? 'active'
    this.created_at = data.created_at ? new Date(data.created_at) : new Date()
    this.updated_at = data.updated_at ? new Date(data.updated_at) : new Date()
  }

  getConversationHistory(): ChatMessage[] {
    try {
      const history = JSON.parse(this.histori_percakapan) as ChatMessage[];
      return history.map((msg: ChatMessage) => ({
        ...msg,
        timestamp: msg.timestamp ? new Date(msg.timestamp) : undefined
      }))
    } catch {
      return []
    }
  }

  setConversationHistory(history: ChatMessage[]): void {
    this.histori_percakapan = JSON.stringify(history)
  }

  addMessage(role: ChatMessage['role'], content: string): void {
    const history = this.getConversationHistory()
    history.push({
      role,
      content,
      timestamp: new Date()
    })
    this.setConversationHistory(history)
  }

  clearHistory(): void {
    this.setConversationHistory([])
  }

  isActive(): boolean {
    return this.status_flag === 'active'
  }

  isEnded(): boolean {
    return this.status_flag === 'ended'
  }

  endConversation(): void {
    this.status_flag = 'ended'
  }

  reset(): void {
    this.clearHistory()
    this.status_flag = 'active'
  }

  getMessageCount(): number {
    return this.getConversationHistory().length
  }

  getLastMessage(): ChatMessage | null {
    const history = this.getConversationHistory()
    return history.length > 0 ? history[history.length - 1] : null
  }
}