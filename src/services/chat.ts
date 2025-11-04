import axios from 'axios'
import type { Chat, Conversation } from '@/types'
import { mockChats, mockConversations } from '@/services/mock/data'
import { storage } from '@/utils/storage'

const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'https://n8n.stellvick.fun/webhook'

// Use mock data for now
const USE_MOCK = true

const getHeaders = () => ({
  Authorization: `Bearer ${storage.getJWT() || ''}`,
})

export const chatService = {
  async getChats(): Promise<Chat[]> {
    try {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return mockChats
      }

      const response = await axios.get<Chat[]>(`${API_BASE_URL}/chats`, {
        headers: getHeaders(),
      })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to fetch chats')
      }
      throw error
    }
  },

  async getConversations(chatId: string): Promise<Conversation[]> {
    try {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return mockConversations.filter((c) => c.chat_id === chatId)
      }

      const response = await axios.get<Conversation[]>(
        `${API_BASE_URL}/chats/${chatId}/conversations`,
        {
          headers: getHeaders(),
        }
      )
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to fetch conversations')
      }
      throw error
    }
  },

  async getConversation(conversationId: string): Promise<Conversation> {
    try {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 200))
        const conv = mockConversations.find((c) => c.id === conversationId)
        if (!conv) throw new Error('Conversation not found')
        return conv
      }

      const response = await axios.get<Conversation>(
        `${API_BASE_URL}/conversations/${conversationId}`,
        {
          headers: getHeaders(),
        }
      )
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to fetch conversation')
      }
      throw error
    }
  },

  async createConversation(chatId: string, title?: string): Promise<Conversation> {
    try {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        const newConv: Conversation = {
          id: `conv-${Date.now()}`,
          chat_id: chatId,
          title,
          messages: [],
          created_at: new Date(),
          updated_at: new Date(),
        }
        mockConversations.push(newConv)
        return newConv
      }

      const response = await axios.post<Conversation>(
        `${API_BASE_URL}/chats/${chatId}/conversations`,
        { title },
        {
          headers: getHeaders(),
        }
      )
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to create conversation')
      }
      throw error
    }
  },

  async updateConversation(conversationId: string, title: string): Promise<Conversation> {
    try {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        const index = mockConversations.findIndex((c) => c.id === conversationId)
        if (index === -1) throw new Error('Conversation not found')
        const updated = { ...mockConversations[index], title, updated_at: new Date() }
        mockConversations[index] = updated
        return updated
      }

      const response = await axios.put<Conversation>(
        `${API_BASE_URL}/conversations/${conversationId}`,
        { title },
        {
          headers: getHeaders(),
        }
      )
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to update conversation')
      }
      throw error
    }
  },

  async deleteConversation(conversationId: string): Promise<void> {
    try {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        const index = mockConversations.findIndex((c) => c.id === conversationId)
        if (index !== -1) mockConversations.splice(index, 1)
        return
      }

      await axios.delete(`${API_BASE_URL}/conversations/${conversationId}`, {
        headers: getHeaders(),
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to delete conversation')
      }
      throw error
    }
  },
}
