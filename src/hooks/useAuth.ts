import { useCallback } from 'react'
import { useAuthStore } from '../store/authStore'
import authService, { LoginCredentials, RegistrationData } from '../services/auth/authService'

export const useAuth = () => {
  const { user, token, isAuthenticated, isLoading, error, login, logout, setError, clearError } =
    useAuthStore()

  const handleLogin = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        clearError()
        const response = await authService.login(credentials)
        login(response.user, response.token)
        return response
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Login failed'
        setError(message)
        throw err
      }
    },
    [login, setError, clearError]
  )

  const handleRegister = useCallback(
    async (data: RegistrationData) => {
      try {
        clearError()
        const response = await authService.register(data)
        login(response.user, response.token)
        return response
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Registration failed'
        setError(message)
        throw err
      }
    },
    [login, setError, clearError]
  )

  const handleLogout = useCallback(async () => {
    try {
      await authService.logout()
      logout()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Logout failed'
      setError(message)
      throw err
    }
  }, [logout, setError])

  const handleResetPassword = useCallback(
    async (email: string) => {
      try {
        clearError()
        return await authService.resetPassword(email)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Password reset failed'
        setError(message)
        throw err
      }
    },
    [setError, clearError]
  )

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    resetPassword: handleResetPassword,
    clearError,
  }
}
