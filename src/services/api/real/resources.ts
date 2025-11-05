import { http } from '../../http'

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
  const query = new URLSearchParams()
  if (params.page) query.set('page', params.page.toString())
  if (params.pageSize) query.set('pageSize', params.pageSize.toString())
  if (params.search) query.set('search', params.search)
  if (params.avaliado !== undefined) query.set('avaliado', params.avaliado.toString())

  return http(`/resources?${query}`)
}

export const evaluateResource = async (id: string, data: { nota: number; comentario?: string }): Promise<void> => {
  return http(`/resources/${id}/evaluate`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}