import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Spinner, Alert } from '@heroui/react'
import { Trash2, LogOut, AlertCircle } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

export interface Session {
  id: string
  deviceType: 'desktop' | 'mobile' | 'tablet' | 'unknown'
  deviceInfo: {
    browser?: string
    os?: string
  }
  ipAddress: string
  lastAccessAt: Date
  createdAt: Date
  isCurrent: boolean
}

export interface SessionManagerProps {
  onSessionRevoked?: (sessionId: string) => void
}

export const SessionManager: React.FC<SessionManagerProps> = ({ onSessionRevoked }) => {
  const { isAuthenticated } = useAuth()
  const [sessions, setSessions] = useState<Session[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  // Mock: Load sessions from device
  useEffect(() => {
    if (!isAuthenticated) return

    const loadSessions = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Mock sessions data
        const mockSessions: Session[] = [
          {
            id: '1',
            deviceType: 'desktop',
            deviceInfo: {
              browser: 'Chrome',
              os: 'macOS',
            },
            ipAddress: '192.168.1.100',
            lastAccessAt: new Date(),
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            isCurrent: true,
          },
          {
            id: '2',
            deviceType: 'mobile',
            deviceInfo: {
              browser: 'Safari',
              os: 'iOS',
            },
            ipAddress: '203.0.113.42',
            lastAccessAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            isCurrent: false,
          },
          {
            id: '3',
            deviceType: 'tablet',
            deviceInfo: {
              browser: 'Firefox',
              os: 'Linux',
            },
            ipAddress: '198.51.100.85',
            lastAccessAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
            isCurrent: false,
          },
        ]

        setSessions(mockSessions)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load sessions'
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    loadSessions()
  }, [isAuthenticated])

  const handleRevokeSession = (session: Session) => {
    setSelectedSession(session)
    onOpen()
  }

  const confirmRevokeSession = async () => {
    if (!selectedSession) return

    try {
      setIsLoading(true)
      setError(null)

      // Mock: Remove session
      setSessions((prev) => prev.filter((s) => s.id !== selectedSession.id))
      onSessionRevoked?.(selectedSession.id)

      onOpenChange()
      setSelectedSession(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to revoke session'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile':
        return '📱'
      case 'tablet':
        return '📱'
      case 'desktop':
        return '💻'
      default:
        return '🖥️'
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (isLoading && sessions.length === 0) {
    return (
      <Card className="w-full bg-[var(--color-surface)] border border-[var(--color-border)]">
        <CardBody className="gap-4 p-6 flex items-center justify-center min-h-[300px]">
          <Spinner color="current" />
          <p className="text-[var(--color-text-secondary)]">Loading sessions...</p>
        </CardBody>
      </Card>
    )
  }

  return (
    <>
      <Card className="w-full bg-[var(--color-surface)] border border-[var(--color-border)]">
        <CardHeader className="flex flex-col gap-3 border-b border-[var(--color-border)] p-4">
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text)] font-cinzel-decorative">
              Active Sessions
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Manage your active sessions and revoke access from devices
            </p>
          </div>
        </CardHeader>

        <CardBody className="gap-4 p-6">
          {error && (
            <Alert
              color="danger"
              icon={<AlertCircle className="w-4 h-4" />}
              className="bg-red-500/10 text-red-600 dark:text-red-400"
            >
              {error}
            </Alert>
          )}

          {sessions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[var(--color-text-secondary)]">No active sessions found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table
                aria-label="Active sessions"
                className="text-[var(--color-text)]"
                color="secondary"
              >
                <TableHeader>
                  <TableColumn className="bg-[var(--color-surface-dark)]">Device</TableColumn>
                  <TableColumn className="bg-[var(--color-surface-dark)]">Browser</TableColumn>
                  <TableColumn className="bg-[var(--color-surface-dark)]">IP Address</TableColumn>
                  <TableColumn className="bg-[var(--color-surface-dark)]">Last Active</TableColumn>
                  <TableColumn className="bg-[var(--color-surface-dark)]">Status</TableColumn>
                  <TableColumn className="bg-[var(--color-surface-dark)] w-20">Actions</TableColumn>
                </TableHeader>
                <TableBody>
                  {sessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getDeviceIcon(session.deviceType)}</span>
                          <span className="capitalize">{session.deviceType}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {session.deviceInfo.browser || 'Unknown'} ({session.deviceInfo.os || 'Unknown'})
                      </TableCell>
                      <TableCell className="font-mono text-sm">{session.ipAddress}</TableCell>
                      <TableCell>{formatDate(session.lastAccessAt)}</TableCell>
                      <TableCell>
                        {session.isCurrent ? (
                          <Chip
                            startContent={<LogOut className="w-3 h-3" />}
                            variant="flat"
                            color="success"
                            size="sm"
                          >
                            Current
                          </Chip>
                        ) : (
                          <Chip variant="flat" color="default" size="sm">
                            Inactive
                          </Chip>
                        )}
                      </TableCell>
                      <TableCell>
                        {!session.isCurrent && (
                          <Button
                            isIconOnly
                            color="danger"
                            variant="flat"
                            size="sm"
                            onPress={() => handleRevokeSession(session)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="pt-4 border-t border-[var(--color-border)]">
            <p className="text-xs text-[var(--color-text-secondary)]">
              Sessions expire automatically after 30 days of inactivity. You can manually revoke access
              from specific devices at any time.
            </p>
          </div>
        </CardBody>
      </Card>

      {/* Revoke session confirmation modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold text-[var(--color-text)]">Revoke Session</h3>
              </ModalHeader>
              <ModalBody>
                <p className="text-[var(--color-text-secondary)]">
                  Are you sure you want to revoke access from this device?
                </p>
                {selectedSession && (
                  <div className="mt-4 p-3 bg-[var(--color-surface-dark)] rounded-lg">
                    <p className="text-sm text-[var(--color-text)]">
                      <span className="font-semibold">Device:</span> {selectedSession.deviceType}
                    </p>
                    <p className="text-sm text-[var(--color-text)]">
                      <span className="font-semibold">Browser:</span> {selectedSession.deviceInfo.browser}
                    </p>
                    <p className="text-sm text-[var(--color-text)]">
                      <span className="font-semibold">IP:</span> {selectedSession.ipAddress}
                    </p>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={confirmRevokeSession}
                  isLoading={isLoading}
                >
                  Revoke Access
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default SessionManager
