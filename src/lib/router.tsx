import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Navigation } from '@/components/Navigation'

// Lazy load pages
const Login = lazy(() => import('@/pages/Login'))
const Resources = lazy(() => import('@/pages/Resources'))
const Chat = lazy(() => import('@/pages/Chat'))
const Config = lazy(() => import('@/pages/Config'))
const NotFound = lazy(() => import('@/pages/NotFound'))

// Loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <p>Loading...</p>
  </div>
)

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navigation />
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
