// Chat types
export type OracleAvatar = 'lunar-sage' | 'shadow-seer' | 'crystal-guardian' | 'mystic-oracle'
export type SessionStatus = 'active' | 'idle' | 'archived' | 'error'
export type MessageType = 'user' | 'assistant' | 'system'

export interface ChatSession {
  id: string
  userId: string
  title: string
  avatar: OracleAvatar
  messages: ChatMessage[]
  context: ConversationContext
  settings: SessionSettings
  status: SessionStatus
  createdAt: Date
  lastActiveAt: Date
  isArchived: boolean
}

export interface ChatMessage {
  id: string
  sessionId: string
  type: MessageType
  content: string
  timestamp: Date
  metadata?: MessageMetadata
}

export interface MessageMetadata {
  tokens?: number
  processingTime?: number
  modelUsed?: string
  confidence?: number
}

export interface ConversationContext {
  personality: string
  tone: string
  systemPrompt: string
  contextWindow: ChatMessage[]
  customInstructions?: string
}

export interface SessionSettings {
  maxMessages: number
  autoTitle: boolean
  saveHistory: boolean
  temperature: number
}

export interface SendMessageRequest {
  sessionId: string
  content: string
}

export interface SendMessageResponse {
  messageId: string
  content: string
  timestamp: Date
  metadata?: MessageMetadata
}

export interface CreateSessionRequest {
  title?: string
  avatar: OracleAvatar
  personality?: string
  tone?: string
}

export interface OraclePersonality {
  id: OracleAvatar
  name: string
  description: string
  systemPrompt: string
  defaultTone: string
  emoji: string
}
