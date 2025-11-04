import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth'
import { authService } from '@/services/auth'
import { useNavigate } from 'react-router-dom'
import { Settings, LogOut, Home } from 'lucide-react'

export const Navigation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const isAuthenticated = authService.isAuthenticated()

  const handleLogout = async () => {
    try {
      await authService.logout()
      logout()
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (!isAuthenticated || location.pathname === '/login') {
    return null
  }

  const navItems = [
    { label: 'Chat', path: '/chat', icon: Home },
    { label: 'Resources', path: '/resources', icon: Home },
  ]

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold">AI Home</h1>
          <div className="flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded transition ${
                  location.pathname === item.path
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {user?.username}
          </span>
          <Link
            to="/config"
            className={`p-2 rounded transition ${
              location.pathname === '/config'
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title="Configuration"
          >
            <Settings className="w-5 h-5" />
          </Link>
          <button
            onClick={handleLogout}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  )
}
