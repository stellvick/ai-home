// Types derived from OpenAPI contracts

export interface Paginated<T> {
  page: number
  pageSize: number
  total: number
  items: T[]
}

export interface Recurso {
  id: string
  titulo: string
  descricao: string
  avaliado: boolean
}

export interface AvaliacaoInput {
  nota: number
  comentario?: string
}

export interface Chat {
  id: string
  nome: string
}

export interface Conversa {
  id: string
  chatId: string
  titulo: string
}

export interface LoginInput {
  email: string
  senha: string
}

export interface LoginResponse {
  token: string
}