import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth'
import { authService } from '@/services/auth'
import { useNavigate } from 'react-router-dom'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react'
import { Settings, LogOut, MessageSquare, Package } from 'lucide-react'

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

  const isActive = (path: string) => location.pathname === path

  return (
    <Navbar shouldHideOnScroll isBordered className="bg-white dark:bg-gray-800">
      <NavbarBrand>
        <Link to="/chat" className="font-bold text-xl">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            AI Home
          </span>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={isActive('/chat')}>
          <Link
            to="/chat"
            className={`flex items-center gap-1 px-3 py-2 rounded-lg transition ${
              isActive('/chat')
                ? 'text-blue-600 dark:text-blue-400 font-semibold'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Chat
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isActive('/resources')}>
          <Link
            to="/resources"
            className={`flex items-center gap-1 px-3 py-2 rounded-lg transition ${
              isActive('/resources')
                ? 'text-blue-600 dark:text-blue-400 font-semibold'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <Package className="w-4 h-4" />
            Resources
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {user?.username}
          </span>
        </NavbarItem>

        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="light" className="text-gray-600 dark:text-gray-400">
                <Settings className="w-5 h-5" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Actions">
              <DropdownItem
                key="settings"
                startContent={<Settings className="w-4 h-4" />}
                onPress={() => navigate('/config')}
              >
                Settings
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                startContent={<LogOut className="w-4 h-4" />}
                onPress={handleLogout}
              >
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
