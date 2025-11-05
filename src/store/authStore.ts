import { create } from 'zustand'
import { User } from '../types/auth'
import storage from '../services/storage/encryptedStorage'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (user: User, token: string) => void
  logout: () => void
  setError: (error: string | null) => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>((set) => {
  // Initialize from storage
  const storedUser = storage.getUser() as User | null
  const storedToken = storage.getToken()

  return {
    user: storedUser,
    token: storedToken || null,
    isAuthenticated: !!(storedUser && storedToken),
    isLoading: false,
    error: null,

    login: (user: User, token: string) => {
      storage.setUser(user as unknown as Record<string, unknown>)
      storage.setToken(token)
      set({
        user,
        token,
        isAuthenticated: true,
        error: null,
      })
    },

    logout: () => {
      storage.removeUser()
      storage.removeToken()
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        error: null,
      })
    },

    setError: (error: string | null) =>
      set({
        error,
      }),

    clearError: () =>
      set({
        error: null,
      }),
  }
})
