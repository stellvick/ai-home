import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Lazy load pages
const Login = React.lazy(() => import('@/pages/Login'))
const Resources = React.lazy(() => import('@/pages/Resources'))
const Chat = React.lazy(() => import('@/pages/Chat'))
const Config = React.lazy(() => import('@/pages/Config'))
const NotFound = React.lazy(() => import('@/pages/NotFound'))

// Loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <p>Loading...</p>
  </div>
)

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/config" element={<Config />} />
          <Route path="/" element={<Navigate to="/chat" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
