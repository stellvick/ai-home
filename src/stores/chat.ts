import { create } from 'zustand'
import type { Chat, Conversation } from '@/types'

interface ChatStore {
  chats: Chat[]
  selectedChat: Chat | null
  conversations: Conversation[]
  selectedConversation: Conversation | null
  setChats: (chats: Chat[]) => void
  setSelectedChat: (chat: Chat | null) => void
  setConversations: (conversations: Conversation[]) => void
  setSelectedConversation: (conversation: Conversation | null) => void
  addConversation: (conversation: Conversation) => void
  removeConversation: (id: string) => void
  updateConversation: (id: string, updates: Partial<Conversation>) => void
}

export const useChatStore = create<ChatStore>((set) => ({
  chats: [],
  selectedChat: null,
  conversations: [],
  selectedConversation: null,
  setChats: (chats) => set({ chats }),
  setSelectedChat: (chat) => set({ selectedChat: chat }),
  setConversations: (conversations) => set({ conversations }),
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),
  addConversation: (conversation) =>
    set((state) => ({
      conversations: [...state.conversations, conversation],
    })),
  removeConversation: (id) =>
    set((state) => ({
      conversations: state.conversations.filter((c) => c.id !== id),
      selectedConversation:
        state.selectedConversation?.id === id ? null : state.selectedConversation,
    })),
  updateConversation: (id, updates) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
      selectedConversation:
        state.selectedConversation?.id === id
          ? { ...state.selectedConversation, ...updates }
          : state.selectedConversation,
    })),
}))
