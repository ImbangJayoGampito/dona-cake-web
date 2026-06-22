// src/types/chatbot-chat.types.ts

/**
 * Types for Chatbot API interactions based on backend requirements
 */

// =============================================================================
// Request Payload Types (what we send to backend)
// =============================================================================

/**
 * Payload for sending a message to chatbot
 * Backend requires: prompt (string, required, max: 2000)
 */
export interface SendChatMessagePayload {
    prompt: string;
}

/**
 * Payload for reporting a conversation
 * Backend requires: alasan (string, required, max: 500)
 * Optional: komentar (string, max: 2000)
 */
export interface ReportConversationPayload {
    alasan: string;
    komentar?: string;
}

// =============================================================================
// Response Data Types (what we receive from backend)
// =============================================================================

/**
 * Chat message structure
 */
export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

/**
 * Conversation preview for lists
 */
export interface ConversationPreview {
    id: string;
    title?: string;
    lastMessage?: string;
    updatedAt: string;
    isActive?: boolean;
    status: string;
}

/**
 * Full conversation detail
 */
export interface ConversationDetail {
    id: string;
    history: ChatMessage[];
    status: string;
    created_at: string;
    updated_at: string;
}

/**
 * Send message response
 */
export interface SendMessageResponse {
    response: string;
    conversation_id: string;
}

// =============================================================================
// Frontend-specific Types (for UI state management)
// =============================================================================

/**
 * Frontend message payload that gets transformed to backend format
 * This is what components use before transformation
 */
export interface FrontendMessagePayload {
    text?: string;
    intent?: string;
}