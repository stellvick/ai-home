import { useEffect, useState } from 'react'
import { Card, CardBody, Button, Spinner } from '@heroui/react'
import { Plus, MessageSquare, Archive } from 'lucide-react'
import { useChatStore } from '../store/chatStore'
import { useAuth } from '../hooks/useAuth'
import { ChatSession, OracleAvatar } from '../types/chat'
import ChatSessionList from '../components/chat/ChatSessionList'
import ChatInterface from '../components/chat/ChatInterface'
import CreateSessionModal from '../components/chat/CreateSessionModal'

const ORACLE_AVATARS: { value: OracleAvatar; label: string; emoji: string }[] = [
  { value: 'lunar-sage', label: 'Lunar Sage', emoji: '🌙' },
  { value: 'shadow-seer', label: 'Shadow Seer', emoji: '🌑' },
  { value: 'crystal-guardian', label: 'Crystal Guardian', emoji: '🔮' },
  { value: 'mystic-oracle', label: 'Mystic Oracle', emoji: '✨' },
]

const ChatPage = () => {
  const { isAuthenticated } = useAuth()
  const {
    sessions,
    currentSession,
    isLoading,
    setSessions,
    setCurrentSession,
    removeSession,
  } = useChatStore()

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  useEffect(() => {
    if (isAuthenticated && sessions.length === 0) {
      // Mock data - in real app would fetch from API
      setSessions([])
    }
  }, [isAuthenticated, sessions.length, setSessions])

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-lunar-900 via-purple-900 to-shadow-900">
        <Card className="mystical-card max-w-md">
          <CardBody className="gap-4">
            <h2 className="oracle-title text-2xl">Access Required</h2>
            <p className="text-gray-400">Please log in to access the chat interface.</p>
          </CardBody>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lunar-900 via-purple-900 to-shadow-900 flex">
      {/* Sidebar - Session List */}
      <div className="w-64 bg-gray-900/50 border-r border-mystical-gold/20 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-mystical-gold/20">
          <h2 className="oracle-title text-lg text-mystical-gold mb-3">Oracle Sessions</h2>
          <Button
            fullWidth
            color="primary"
            variant="shadow"
            startContent={<Plus size={18} />}
            onPress={() => setIsCreateModalOpen(true)}
            className="mystical-btn"
          >
            New Chat
          </Button>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <Spinner size="sm" label="Loading..." />
            </div>
          ) : sessions.length === 0 ? (
            <div className="p-4 text-center text-gray-400 text-sm">
              <MessageSquare className="mx-auto mb-2 opacity-50" size={24} />
              <p>No chats yet. Start a new conversation!</p>
            </div>
          ) : (
            <ChatSessionList
              sessions={sessions}
              currentSession={currentSession}
              onSelectSession={setCurrentSession}
              onDeleteSession={removeSession}
            />
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentSession ? (
          <>
            {/* Chat Header */}
            <div className="bg-gray-900/50 border-b border-mystical-gold/20 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl">
                  {ORACLE_AVATARS.find((a) => a.value === currentSession.avatar)?.emoji}
                </div>
                <div>
                  <h3 className="oracle-title text-lg">{currentSession.title}</h3>
                  <p className="text-xs text-gray-400">
                    {currentSession.messages.length} messages
                  </p>
                </div>
              </div>
              <Button isIconOnly variant="flat" className="mystical-btn">
                <Archive size={18} />
              </Button>
            </div>

            {/* Chat Interface */}
            <ChatInterface session={currentSession} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Card className="mystical-card max-w-md text-center">
              <CardBody className="gap-4">
                <div className="text-6xl">🔮</div>
                <h3 className="oracle-title text-2xl">Welcome to Oracle Chat</h3>
                <p className="text-gray-400">
                  Select a conversation or create a new one to begin your mystical dialogue
                </p>
                <Button
                  color="primary"
                  variant="shadow"
                  onPress={() => setIsCreateModalOpen(true)}
                  className="mystical-btn mt-4"
                  startContent={<Plus size={18} />}
                >
                  Start New Chat
                </Button>
              </CardBody>
            </Card>
          </div>
        )}
      </div>

      {/* Create Session Modal */}
      <CreateSessionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateSession={(session: ChatSession) => {
          setSessions([session, ...sessions])
          setCurrentSession(session)
          setIsCreateModalOpen(false)
        }}
      />
    </div>
  )
}

export default ChatPage
