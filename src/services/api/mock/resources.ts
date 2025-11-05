// Mock data
const mockResources = [
  { id: '1', titulo: 'Resource 1', descricao: 'Description 1', avaliado: false },
  { id: '2', titulo: 'Resource 2', descricao: 'Description 2', avaliado: true },
]

export interface Resource {
  id: string
  titulo: string
  descricao: string
  avaliado: boolean
}

export interface PaginatedResources {
  page: number
  pageSize: number
  total: number
  items: Resource[]
}

export const getResources = async (params: { page?: number; pageSize?: number; search?: string; avaliado?: boolean } = {}): Promise<PaginatedResources> => {
  const page = params.page || 1
  const pageSize = params.pageSize || 20
  const search = params.search?.toLowerCase() || ''
  const avaliado = params.avaliado

  let filtered = mockResources.filter(item =>
    item.titulo.toLowerCase().includes(search) || item.descricao.toLowerCase().includes(search)
  )

  if (avaliado !== undefined) {
    filtered = filtered.filter(item => item.avaliado === avaliado)
  }

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

export const evaluateResource = async (id: string, data: { nota: number; comentario?: string }): Promise<void> => {
  // Mock evaluation
  console.log('Evaluating resource', id, data)
}