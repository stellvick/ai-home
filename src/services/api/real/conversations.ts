import { http } from '../../http'

export interface Conversation {
  id: string
  chatId: string
  titulo: string
}

export interface PaginatedConversations {
  page: number
  pageSize: number
  total: number
  items: Conversation[]
}

export const getConversations = async (chatId: string, params: { page?: number; pageSize?: number } = {}): Promise<PaginatedConversations> => {
  const query = new URLSearchParams()
  if (params.page) query.set('page', params.page.toString())
  if (params.pageSize) query.set('pageSize', params.pageSize.toString())

  return http(`/chats/${chatId}/conversations?${query}`)
}

export const createConversation = async (chatId: string, data: { titulo: string }): Promise<Conversation> => {
  return http(`/chats/${chatId}/conversations`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export const renameConversation = async (id: string, data: { titulo: string }): Promise<Conversation> => {
  return http(`/conversations/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export const deleteConversation = async (id: string): Promise<void> => {
  return http(`/conversations/${id}`, {
    method: 'DELETE',
  })
}