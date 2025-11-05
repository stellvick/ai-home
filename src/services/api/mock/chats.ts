// Mock data
const mockChats: { id: string; nome: string }[] = [
  { id: '1', nome: 'Chat 1' },
  { id: '2', nome: 'Chat 2' },
]

export interface Chat {
  id: string
  nome: string
}

export const getChats = async (): Promise<Chat[]> => {
  return mockChats
}

export const createChat = async (data: { nome: string }): Promise<Chat> => {
  const newChat = { id: Date.now().toString(), nome: data.nome }
  mockChats.push(newChat)
  return newChat
}

export const deleteChat = async (chatId: string): Promise<void> => {
  const index = mockChats.findIndex(c => c.id === chatId)
  if (index > -1) mockChats.splice(index, 1)
}