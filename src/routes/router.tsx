import { createBrowserRouter } from 'react-router-dom'
import { RequireAuth } from './guards/RequireAuth'
import { paths } from './paths'
import { LoginPage } from '../features/auth/pages/LoginPage'
import { DashboardPage } from '../features/dashboard/pages/DashboardPage'
import { ThemeSettings } from '../features/settings/pages/ThemeSettings'

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
        <div className="min-h-screen bg-background p-6">
          <h1 className="text-2xl font-heading text-foreground mb-6">Configurações</h1>
          <p className="text-foreground/70">Página de configurações em desenvolvimento...</p>
        </div>
      </RequireAuth>
    ),
  },
  {
    path: paths.chat,
    element: (
      <RequireAuth>
        <div className="min-h-screen bg-background p-6">
          <h1 className="text-2xl font-heading text-foreground mb-6">Chat IA</h1>
          <p className="text-foreground/70">Chat IA em desenvolvimento...</p>
        </div>
      </RequireAuth>
    ),
  },
  {
    path: paths.resources,
    element: (
      <RequireAuth>
        <div className="min-h-screen bg-background p-6">
          <h1 className="text-2xl font-heading text-foreground mb-6">Recursos</h1>
          <p className="text-foreground/70">Página de recursos em desenvolvimento...</p>
        </div>
      </RequireAuth>
    ),
  },
  {
    path: '/',
    element: <div>Home</div>,
  },
])