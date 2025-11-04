import type { Chat, Conversation } from '@/types'

export interface ChatWithConversations extends Chat {
  conversations?: Conversation[]
}

export interface ChatFilter {
  search?: string
  limit?: number
  offset?: number
}
