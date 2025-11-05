import { create } from 'zustand'
import { authStorage } from '../services/auth/storage'

interface AuthState {
  token: string | null
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: authStorage.getToken(),
  isAuthenticated: !!authStorage.getToken(),
  login: (token: string) => {
    authStorage.setToken(token)
    set({ token, isAuthenticated: true })
  },
  logout: () => {
    authStorage.removeToken()
    set({ token: null, isAuthenticated: false })
  },
}))