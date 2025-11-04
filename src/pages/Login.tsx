import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '@/components/auth/LoginForm'
import { authService } from '@/services/auth'

const Login = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect if already authenticated
    if (authService.isAuthenticated()) {
      navigate('/chat', { replace: true })
    }
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-2">AI Home</h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
            Sign in to your account
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default Login
