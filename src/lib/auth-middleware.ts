import React from 'react'
import { Navigate } from 'react-router-dom'
import { authService } from '@/services/auth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated()

  if (!isAuthenticated) {
    return React.createElement(Navigate, { to: '/login', replace: true })
  }

  return React.createElement(React.Fragment, {}, children)
}
