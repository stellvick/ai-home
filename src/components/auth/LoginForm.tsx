import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@heroui/react'
import { Input } from '@/components/base/Input'
import { loginSchema, type LoginFormData } from '@/utils/validation'
import { authService } from '@/services/auth'
import { useAuthStore } from '@/stores/auth'

export const LoginForm = () => {
  const navigate = useNavigate()
  const setUser = useAuthStore((state) => state.setUser)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Validate form data
      const formData: LoginFormData = { username, password }
      await loginSchema.validate(formData)

      // Attempt login
      const response = await authService.login(username, password)
      setUser(response.user)

      // Redirect to main app
      navigate('/chat')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Username"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        isDisabled={isLoading}
        required
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        isDisabled={isLoading}
        required
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button
        type="submit"
        className="w-full"
        isLoading={isLoading}
        isDisabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  )
}
