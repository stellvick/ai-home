// Mock data
const mockItems = [
  { id: '1', titulo: 'Item 1', descricao: 'Description 1', avaliado: false },
  { id: '2', titulo: 'Item 2', descricao: 'Description 2', avaliado: true },
]

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
  const page = params.page || 1
  const pageSize = params.pageSize || 20
  const search = params.search?.toLowerCase() || ''

  const filtered = mockItems.filter(item =>
    item.titulo.toLowerCase().includes(search) || item.descricao.toLowerCase().includes(search)
  )

  const start = (page - 1) * pageSize
  const end = start + pageSize
  const items = filtered.slice(start, end)

  return {
    page,
    pageSize,
    total: filtered.length,
    items,
  }
}

export const getItem = async (id: string): Promise<Item> => {
  const item = mockItems.find(i => i.id === id)
  if (!item) throw new Error('Item not found')
  return item
}