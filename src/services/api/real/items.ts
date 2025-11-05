import { http } from '../../http'

export interface Item {
  id: string
  titulo: string
  descricao: string
  avaliado: boolean
}

export interface PaginatedItems {
  page: number
  pageSize: number
  total: number
  items: Item[]
}

export const getItems = async (params: { page?: number; pageSize?: number; search?: string } = {}): Promise<PaginatedItems> => {
  const query = new URLSearchParams()
  if (params.page) query.set('page', params.page.toString())
  if (params.pageSize) query.set('pageSize', params.pageSize.toString())
  if (params.search) query.set('search', params.search)

  return http(`/items?${query}`)
}

export const getItem = async (id: string): Promise<Item> => {
  return http(`/items/${id}`)
}