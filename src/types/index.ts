// Base types for the entire application

export interface User {
  id: string
  username: string
  jwt: string
}

export interface Resource {
  id: string
  name: string
  api_url: string
  created_at?: string
  updated_at?: string
}

export interface Chat {
  id: string
  name: string
  created_at?: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface Conversation {
  id: string
  chat_id: string
  title?: string
  messages: Message[]
  created_at: Date
  updated_at: Date
}

export interface Evaluation {
  id: string
  resource_id: string
  conversation_id: string
  response_id: string
  title?: string
  description?: string
  evaluated: boolean
  created_at: Date
  updated_at: Date
}

export interface Response {
  id: string
  conversation_id: string
  content: string
  timestamp: Date
}

export interface AuthResponse {
  jwt: string
  user: User
}

export interface ApiError {
  error: string
  code?: string
  status?: number
}
