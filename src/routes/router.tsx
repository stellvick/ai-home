import { createBrowserRouter } from 'react-router-dom'
import { RequireAuth } from './guards/RequireAuth'
import { paths } from './paths'
import { LoginPage } from '../features/auth/pages/LoginPage'
import { DashboardPage } from '../features/dashboard/pages/DashboardPage'
import { ThemeSettings } from '../features/settings/pages/ThemeSettings'
import { ChatPage } from '../features/chat/pages/ChatPage'
import { ResourcesPage } from '../features/resources/pages/ResourcesPage'
import { SettingsPage } from '../features/settings/pages/SettingsPage'

export const router = createBrowserRouter([
  {
    path: paths.login,
    element: <LoginPage />,
  },
  {
    path: paths.dashboard,
    element: (
      <RequireAuth>
        <DashboardPage />
      </RequireAuth>
    ),
  },
  {
    path: paths.themeSettings,
    element: (
      <RequireAuth>
        <div className="min-h-screen bg-background p-6">
          <ThemeSettings />
        </div>
      </RequireAuth>
    ),
  },
  {
    path: paths.settings,
    element: (
      <RequireAuth>
        <SettingsPage />
      </RequireAuth>
    ),
  },
  {
    path: paths.chat,
    element: (
      <RequireAuth>
        <ChatPage />
      </RequireAuth>
    ),
  },
  {
    path: paths.resources,
    element: (
      <RequireAuth>
        <ResourcesPage />
      </RequireAuth>
    ),
  },
  {
    path: '/',
    element: <div>Home</div>,
  },
  {
    path: '*',
    element: <div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">404 - Página não encontrada</h1></div>,
  },
])