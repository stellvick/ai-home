import { ProtectedRoute } from '@/lib/auth-middleware'
import { ThemeSwitcher } from '@/components/config/ThemeSwitcher'
import { useAuthStore } from '@/stores/auth'
import { authService } from '@/services/auth'
import { useNavigate } from 'react-router-dom'
import { Button } from '@heroui/react'

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
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Configuration</h1>

        {/* User Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">User Profile</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Username:</span> {user?.username || 'N/A'}
            </p>
            <p>
              <span className="font-medium">User ID:</span> {user?.id || 'N/A'}
            </p>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Theme Settings</h2>
          <ThemeSwitcher />
        </div>

        {/* Logout */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Account</h2>
          <Button
            color="danger"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Config
