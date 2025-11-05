import { http } from '../../http'

export interface Chat {
  id: string
  nome: string
}

export const getChats = async (): Promise<Chat[]> => {
  return http('/chats')
}

export const createChat = async (data: { nome: string }): Promise<Chat> => {
  return http('/chats', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export const deleteChat = async (chatId: string): Promise<void> => {
  return http(`/chats/${chatId}`, {
    method: 'DELETE',
  })
}