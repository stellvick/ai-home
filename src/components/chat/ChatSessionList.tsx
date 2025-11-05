import { Button } from '@heroui/react'
import { Trash2 } from 'lucide-react'
import { ChatSession } from '../../types/chat'

interface ChatSessionListProps {
  sessions: ChatSession[]
  currentSession: ChatSession | null
  onSelectSession: (session: ChatSession) => void
  onDeleteSession: (sessionId: string) => void
}

const ChatSessionList = ({
  sessions,
  currentSession,
  onSelectSession,
  onDeleteSession,
}: ChatSessionListProps) => {
  return (
    <div className="space-y-2 p-2">
      {sessions.map((session) => (
        <div
          key={session.id}
          className={`p-3 rounded-lg cursor-pointer transition-all group ${
            currentSession?.id === session.id
              ? 'bg-mystical-gold/20 border border-mystical-gold/50'
              : 'bg-gray-800/30 hover:bg-gray-800/60 border border-gray-700/30'
          }`}
          onClick={() => onSelectSession(session)}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{session.title}</p>
              <p className="text-xs text-gray-500">
                {new Date(session.lastActiveAt).toLocaleDateString()}
              </p>
            </div>
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              className="opacity-0 group-hover:opacity-100 transition"
              onClick={(e) => {
                e.stopPropagation()
                onDeleteSession(session.id)
              }}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChatSessionList
