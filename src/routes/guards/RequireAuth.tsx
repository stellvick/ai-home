import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'

interface RequireAuthProps {
  children: React.ReactNode
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}