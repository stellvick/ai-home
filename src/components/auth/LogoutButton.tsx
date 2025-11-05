import React, { useState } from 'react'
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Spinner } from '@heroui/react'
import { LogOut, AlertCircle } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export interface LogoutButtonProps {
  variant?: 'solid' | 'flat' | 'bordered' | 'shadow'
  showText?: boolean
  onLogoutComplete?: () => void
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  variant = 'flat',
  showText = true,
  onLogoutComplete,
}) => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleLogoutClick = () => {
    setError(null)
    onOpen()
  }

  const handleConfirmLogout = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Perform logout with secure cleanup
      await logout()

      // Clear any local caches or session data
      sessionStorage.clear()

      // Wait a moment for store updates to propagate
      await new Promise((resolve) => setTimeout(resolve, 300))

      onLogoutComplete?.()

      // Navigate to login page
      navigate('/login', { replace: true })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Logout failed. Please try again.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button
        color="danger"
        variant={variant}
        startContent={<LogOut className="w-4 h-4" />}
        onPress={handleLogoutClick}
      >
        {showText && 'Logout'}
      </Button>

      {/* Logout confirmation modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold text-[var(--color-text)]">Confirm Logout</h3>
              </ModalHeader>
              <ModalBody>
                <p className="text-[var(--color-text-secondary)]">
                  Are you sure you want to logout? You will be returned to the login page.
                </p>
                {error && (
                  <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="light"
                  onPress={onClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={handleConfirmLogout}
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging out...' : 'Logout'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

/**
 * Secure logout confirmation dialog component
 * Can be used to show logout confirmation in protected routes
 */
export interface SecureLogoutDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export const SecureLogoutDialog: React.FC<SecureLogoutDialogProps> = ({ isOpen, onOpenChange }) => {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogout = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Perform complete logout
      await logout()

      // Clear session data
      sessionStorage.clear()
      localStorage.removeItem('auth-session-id')

      // Navigate to login
      onOpenChange(false)
      navigate('/login', { replace: true })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to logout securely'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" isDismissable={false}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">Secure Logout</h3>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2 py-4">
                    <Spinner size="sm" color="current" />
                    <p className="text-[var(--color-text-secondary)]">Securely logging out...</p>
                  </div>
                ) : (
                  <>
                    <div className="p-3 bg-[var(--color-surface-dark)] rounded-lg">
                      <p className="text-sm font-semibold text-[var(--color-text)]">
                        User: {user?.email}
                      </p>
                      <p className="text-xs text-[var(--color-text-secondary)]">
                        Your session will be securely terminated and all local data will be cleared.
                      </p>
                    </div>

                    {error && (
                      <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                      </div>
                    )}

                    <ul className="text-xs text-[var(--color-text-secondary)] space-y-1 list-disc list-inside">
                      <li>Session token will be revoked</li>
                      <li>Encrypted credentials will be removed</li>
                      <li>Session storage will be cleared</li>
                      <li>You will be redirected to login page</li>
                    </ul>
                  </>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="default"
                variant="light"
                onPress={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                color="danger"
                onPress={handleLogout}
                isLoading={isLoading}
                disabled={isLoading}
              >
                Logout Securely
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default LogoutButton
