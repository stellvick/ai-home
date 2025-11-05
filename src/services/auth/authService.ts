import apiClient from '../api/apiClient'
import storage from '../storage/encryptedStorage'
import { User } from '../../types/auth'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegistrationData extends LoginCredentials {
  username: string
  confirmPassword: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken?: string
}

export class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials)
    return response
  }

  async register(data: RegistrationData): Promise<AuthResponse> {
    const { confirmPassword, ...registrationData } = data
    const response = await apiClient.post<AuthResponse>('/auth/register', registrationData)
    return response
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout', {})
    } finally {
      storage.removeUser()
      storage.removeToken()
    }
  }

  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    const response = await apiClient.post<{ token: string }>('/auth/refresh', { refreshToken })
    return response
  }

  async resetPassword(email: string): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>('/auth/reset-password', { email })
    return response
  }

  async confirmPasswordReset(token: string, newPassword: string): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>('/auth/confirm-reset', {
      token,
      newPassword,
    })
    return response
  }

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>('/auth/me')
    return response
  }

  async updateProfile(user: Partial<User>): Promise<User> {
    const response = await apiClient.put<User>('/auth/profile', user)
    return response
  }

  isAuthenticated(): boolean {
    return !!storage.getToken()
  }

  getStoredToken(): string | null {
    return storage.getToken()
  }

  getStoredUser(): User | null {
    return storage.getUser() as User | null
  }
}

export default new AuthService()
