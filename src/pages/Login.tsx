import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody, CardHeader, Divider } from '@heroui/react'
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="flex flex-col items-center justify-center pt-6 px-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                AI Home
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your AI resources and conversations
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="gap-4 p-6">
            <LoginForm />
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              <p>Demo credentials: Use any username and password</p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Login
