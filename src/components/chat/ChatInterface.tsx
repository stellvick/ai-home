import { useRef, useEffect, useState } from 'react'
import { Input, Button } from '@heroui/react'
import { Send } from 'lucide-react'
import { ChatSession, ChatMessage, MessageType } from '../../types/chat'
import { useChatStore } from '../../store/chatStore'

interface ChatInterfaceProps {
  session: ChatSession
}

const ChatInterface = ({ session }: ChatInterfaceProps) => {
  const [messageText, setMessageText] = useState('')
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { updateSession } = useChatStore()

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [session.messages])

  const handleSendMessage = async () => {
    if (!messageText.trim()) return

    setIsSending(true)

    try {
      // Create user message
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        sessionId: session.id,
        type: 'user' as MessageType,
        content: messageText,
        timestamp: new Date(),
      }

      // Simulate API call with delay for AI response
      setTimeout(() => {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sessionId: session.id,
          type: 'assistant' as MessageType,
          content: `I sense your inquiry: "${messageText}". The oracle contemplates this wisdom... 🔮`,
          timestamp: new Date(),
          metadata: {
            tokens: Math.floor(Math.random() * 100),
            processingTime: Math.floor(Math.random() * 2000),
          },
        }

        const updatedSession = {
          ...session,
          messages: [...session.messages, userMessage, assistantMessage],
          lastActiveAt: new Date(),
        }
        updateSession(updatedSession)
        setMessageText('')
        setIsSending(false)
      }, 500)
    } catch (error) {
      console.error('Failed to send message:', error)
      setIsSending(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-transparent to-gray-900/20">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {session.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-3">
              <div className="text-5xl">✨</div>
              <p className="text-gray-400">Begin your conversation with the oracle...</p>
            </div>
          </div>
        ) : (
          session.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-mystical-gold/20 text-white border border-mystical-gold/50'
                    : message.type === 'system'
                    ? 'bg-gray-700/50 text-gray-300 italic'
                    : 'bg-gray-800/60 text-gray-200 border border-mystical-gold/20'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs text-gray-500 mt-1 opacity-75">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-gray-900/50 border-t border-mystical-gold/20 p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Speak to the oracle..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            className="mystical-input"
            disabled={isSending}
          />
          <Button
            isIconOnly
            color="primary"
            variant="shadow"
            onClick={handleSendMessage}
            isDisabled={!messageText.trim() || isSending}
            isLoading={isSending}
            className="mystical-btn"
          >
            <Send size={18} />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}

export default ChatInterface
