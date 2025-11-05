import storage from '../storage/encryptedStorage'
import { useAuthStore } from '../../store/authStore'

export class AuthInterceptor {
  static addToken(headers: Record<string, string>): Record<string, string> {
    const token = storage.getToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    return headers
  }

  static handleUnauthorized() {
    const { logout } = useAuthStore.getState()
    logout()
    window.location.href = '/login'
  }

  static isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const expirationTime = payload.exp * 1000
      return Date.now() >= expirationTime
    } catch {
      return true
    }
  }
}

export default AuthInterceptor
