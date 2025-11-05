import { ApiResponse, HttpStatus, ApiException } from '../../types/api'
import storage from '../storage/encryptedStorage'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1'

export const apiClient = {
  async request<T>(
    method: string,
    endpoint: string,
    data?: unknown,
    headers?: Record<string, string>
  ): Promise<T> {
    const url = `${BASE_URL}${endpoint}`
    const token = storage.getToken()

    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    }

    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`
    }

    try {
      const response = await fetch(url, {
        method,
        headers: defaultHeaders,
        body: data ? JSON.stringify(data) : undefined,
      })

      const result: ApiResponse<T> = await response.json()

      if (!response.ok) {
        const error = result.error || {
          code: 'UNKNOWN_ERROR',
          message: 'An unknown error occurred',
        }
        throw new ApiException(response.status, error.code, error.message, error.details)
      }

      return result.data as T
    } catch (error) {
      if (error instanceof ApiException) {
        throw error
      }

      const message = error instanceof Error ? error.message : 'Network error'
      throw new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, 'NETWORK_ERROR', message)
    }
  },

  get<T>(endpoint: string): Promise<T> {
    return this.request<T>('GET', endpoint)
  },

  post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>('POST', endpoint, data)
  },

  put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>('PUT', endpoint, data)
  },

  patch<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>('PATCH', endpoint, data)
  },

  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>('DELETE', endpoint)
  },
}

export default apiClient
