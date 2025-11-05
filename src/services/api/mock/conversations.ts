// Mock data
const mockConversations: { [chatId: string]: { id: string; chatId: string; titulo: string }[] } = {
  '1': [
    { id: '1', chatId: '1', titulo: 'Conversation 1' },
    { id: '2', chatId: '1', titulo: 'Conversation 2' },
  ],
  '2': [
    { id: '3', chatId: '2', titulo: 'Conversation 3' },
  ],
}

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
  const page = params.page || 1
  const pageSize = params.pageSize || 20

  const conversations = mockConversations[chatId] || []

  const start = (page - 1) * pageSize
  const end = start + pageSize
  const items = conversations.slice(start, end)

  return {
    page,
    pageSize,
    total: conversations.length,
    items,
  }
}

export const createConversation = async (chatId: string, data: { titulo: string }): Promise<Conversation> => {
  const newConv = { id: Date.now().toString(), chatId, titulo: data.titulo }
  if (!mockConversations[chatId]) mockConversations[chatId] = []
  mockConversations[chatId].push(newConv)
  return newConv
}

export const renameConversation = async (id: string, data: { titulo: string }): Promise<Conversation> => {
  for (const chatId in mockConversations) {
    const conv = mockConversations[chatId].find(c => c.id === id)
    if (conv) {
      conv.titulo = data.titulo
      return conv
    }
  }
  throw new Error('Conversation not found')
}

export const deleteConversation = async (id: string): Promise<void> => {
  for (const chatId in mockConversations) {
    const index = mockConversations[chatId].findIndex(c => c.id === id)
    if (index > -1) {
      mockConversations[chatId].splice(index, 1)
      return
    }
  }
}