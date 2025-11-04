import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Spacer } from '@heroui/react'
import { loginSchema, type LoginFormData } from '@/utils/validation'
import { authService } from '@/services/auth'
import { useAuthStore } from '@/stores/auth'
import { AlertCircle } from 'lucide-react'

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
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <Input
        type="text"
        label="Username"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        isDisabled={isLoading}
        required
        size="lg"
        variant="bordered"
        className="w-full"
      />
      <Input
        type="password"
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        isDisabled={isLoading}
        required
        size="lg"
        variant="bordered"
        className="w-full"
      />
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
        </div>
      )}
      <Spacer y={2} />
      <Button
        type="submit"
        color="primary"
        size="lg"
        fullWidth
        isLoading={isLoading}
        isDisabled={isLoading || !username || !password}
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  )
}
