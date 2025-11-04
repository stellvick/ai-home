import { ProtectedRoute } from '@/lib/auth-middleware'
import { ThemeSwitcher } from '@/components/config/ThemeSwitcher'
import { useAuthStore } from '@/stores/auth'
import { authService } from '@/services/auth'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, Divider } from '@heroui/react'
import { User, Moon, LogOut } from 'lucide-react'

const Config = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = async () => {
    try {
      await authService.logout()
      logout()
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account and application preferences
          </p>
        </div>

        <div className="max-w-2xl space-y-6">
          {/* User Profile Card */}
          <Card>
            <CardHeader className="flex gap-3">
              <User className="w-6 h-6 text-blue-600" />
              <div className="flex flex-col">
                <p className="text-lg font-semibold">User Profile</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your account information
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="gap-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700 dark:text-gray-300">Username</span>
                <span className="font-mono text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded">
                  {user?.username || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700 dark:text-gray-300">User ID</span>
                <span className="font-mono text-sm text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded break-all">
                  {user?.id || 'N/A'}
                </span>
              </div>
            </CardBody>
          </Card>

          {/* Theme Settings Card */}
          <Card>
            <CardHeader className="flex gap-3">
              <Moon className="w-6 h-6 text-amber-600" />
              <div className="flex flex-col">
                <p className="text-lg font-semibold">Theme Settings</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Customize your visual experience
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="gap-4">
              <ThemeSwitcher />
            </CardBody>
          </Card>

          {/* Account Actions Card */}
          <Card>
            <CardHeader className="flex gap-3">
              <LogOut className="w-6 h-6 text-red-600" />
              <div className="flex flex-col">
                <p className="text-lg font-semibold">Account</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sign out of your account
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="gap-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                When you log out, you'll need to sign in again to access your account.
              </p>
              <div className="pt-2">
                <Button color="danger" variant="flat" onClick={handleLogout} fullWidth>
                  Sign Out
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Config
