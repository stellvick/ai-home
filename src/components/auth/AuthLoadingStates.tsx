import React from 'react'
import { Spinner, Card, CardBody } from '@heroui/react'

export interface AuthLoadingStateProps {
  message?: string
  variant?: 'full-screen' | 'inline' | 'overlay'
}

export const AuthLoadingState: React.FC<AuthLoadingStateProps> = ({
  message = 'Loading...',
  variant = 'inline',
}) => {
  if (variant === 'full-screen') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[var(--color-background)]/80 backdrop-blur-sm z-50">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-[var(--color-border)] border-t-[var(--color-accent)] animate-spin"></div>
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[var(--color-accent-light)] to-[var(--color-accent)] opacity-20"></div>
            </div>
          </div>
          <Spinner color="current" label={message} />
          <style>{`
            @keyframes mysticalGlow {
              0%, 100% {
                box-shadow: 0 0 20px rgba(75, 0, 130, 0.5);
              }
              50% {
                box-shadow: 0 0 40px rgba(75, 0, 130, 0.8);
              }
            }
            .animate-mystical-glow {
              animation: mysticalGlow 2s ease-in-out infinite;
            }
          `}</style>
        </div>
      </div>
    )
  }

  if (variant === 'overlay') {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-background)]/40 backdrop-blur-sm z-40 rounded-lg">
        <Spinner color="current" label={message} />
      </div>
    )
  }

  // Default inline variant
  return (
    <Card className="w-full bg-[var(--color-surface)] border border-[var(--color-border)]">
      <CardBody className="gap-4 p-8 flex items-center justify-center min-h-[200px]">
        <Spinner color="current" label={message} />
      </CardBody>
    </Card>
  )
}

export interface AuthAnimationProps {
  type: 'shimmer' | 'pulse' | 'spin' | 'mystical'
  children: React.ReactNode
}

export const AuthAnimation: React.FC<AuthAnimationProps> = ({ type, children }) => {
  const getAnimationClass = () => {
    switch (type) {
      case 'shimmer':
        return 'animate-pulse'
      case 'pulse':
        return 'animate-pulse'
      case 'spin':
        return 'animate-spin'
      case 'mystical':
        return 'animate-mystical-glow'
      default:
        return ''
    }
  }

  return (
    <div className={getAnimationClass()}>
      {children}
      <style>{`
        @keyframes mysticalGlow {
          0%, 100% {
            opacity: 0.7;
            filter: drop-shadow(0 0 10px rgba(75, 0, 130, 0.5));
          }
          50% {
            opacity: 1;
            filter: drop-shadow(0 0 20px rgba(75, 0, 130, 0.8));
          }
        }
        .animate-mystical-glow {
          animation: mysticalGlow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export interface LoginSkeletonProps {
  count?: number
}

export const LoginSkeleton: React.FC<LoginSkeletonProps> = ({ count = 1 }) => {
  return (
    <div className="w-full max-w-md space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="w-full bg-[var(--color-surface)] border border-[var(--color-border)]">
          <CardBody className="gap-4 p-6">
            {/* Header skeleton */}
            <div className="h-8 bg-[var(--color-surface-dark)] rounded-lg animate-pulse"></div>

            {/* Description skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-[var(--color-surface-dark)] rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-[var(--color-surface-dark)] rounded animate-pulse w-1/2"></div>
            </div>

            {/* Form fields skeleton */}
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, j) => (
                <div key={j} className="h-10 bg-[var(--color-surface-dark)] rounded-lg animate-pulse"></div>
              ))}
            </div>

            {/* Button skeleton */}
            <div className="h-10 bg-[var(--color-accent)] rounded-lg animate-pulse opacity-50"></div>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}

export default AuthLoadingState
