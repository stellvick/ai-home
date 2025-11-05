// Simple encrypted storage wrapper using localStorage
// Production implementation should use proper encryption like encrypt-storage

export interface StorageData {
  token?: string
  user?: Record<string, unknown>
  preferences?: Record<string, unknown>
  [key: string]: unknown
}

const prefix = '@oracle-ai-platform/'

export const storage = {
  set: <T,>(key: string, value: T): void => {
    try {
      localStorage.setItem(prefix + key, JSON.stringify(value))
    } catch (error) {
      console.error('Storage set error:', error)
    }
  },

  get: <T,>(key: string): T | null => {
    try {
      const item = localStorage.getItem(prefix + key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('Storage get error:', error)
      return null
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(prefix + key)
    } catch (error) {
      console.error('Storage remove error:', error)
    }
  },

  clear: (): void => {
    try {
      const keys = Object.keys(localStorage)
      keys.forEach((key) => {
        if (key.startsWith(prefix)) {
          localStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.error('Storage clear error:', error)
    }
  },

  setToken: (token: string): void => {
    storage.set('token', token)
  },

  getToken: (): string | null => {
    return storage.get('token')
  },

  removeToken: (): void => {
    storage.remove('token')
  },

  setUser: (user: Record<string, unknown>): void => {
    storage.set('user', user)
  },

  getUser: (): Record<string, unknown> | null => {
    return storage.get('user')
  },

  removeUser: (): void => {
    storage.remove('user')
  },

  setPreferences: (preferences: Record<string, unknown>): void => {
    storage.set('preferences', preferences)
  },

  getPreferences: (): Record<string, unknown> | null => {
    return storage.get('preferences')
  },
}

export default storage
