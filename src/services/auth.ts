import axios from 'axios'
import type { AuthResponse } from '@/types'
import { mockUser } from '@/services/mock/data'
import { storage } from '@/utils/storage'

const AUTH_URL = (import.meta as any).env?.VITE_N8N_AUTH_URL || 'https://n8n.stellvick.fun/webhook/962701ed-f87d-4ec1-b965-ae74259d0041'

// Use mock data for now
const USE_MOCK = true

export const authService = {
  async login(username: string, password: string): Promise<AuthResponse> {
    try {
      if (USE_MOCK) {
        // Simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 500))
        const response: AuthResponse = {
          jwt: mockUser.jwt,
          user: mockUser,
        }
        storage.setJWT(response.jwt)
        return response
      }

      const response = await axios.post<AuthResponse>(AUTH_URL, {
        username,
        password,
      })

      if (response.data.jwt) {
        storage.setJWT(response.data.jwt)
      }

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Login failed')
      }
      throw error
    }
  },

  async logout(): Promise<void> {
    storage.removeJWT()
  },

  getStoredJWT(): string | null {
    return storage.getJWT()
  },

  isAuthenticated(): boolean {
    return !!storage.getJWT()
  },
}
