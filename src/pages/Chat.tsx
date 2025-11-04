import { useEffect, useState } from 'react'
import { ProtectedRoute } from '@/lib/auth-middleware'
import { useChatStore } from '@/stores/chat'
import { chatService } from '@/services/chat'

const Chat = () => {
  const chats = useChatStore((state) => state.chats)
  const conversations = useChatStore((state) => state.conversations)
  const setChats = useChatStore((state) => state.setChats)
  const setConversations = useChatStore((state) => state.setConversations)
  const setSelectedChat = useChatStore((state) => state.setSelectedChat)
  const selectedChat = useChatStore((state) => state.selectedChat)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadChats()
  }, [])

  useEffect(() => {
    if (selectedChat) {
      loadConversations(selectedChat.id)
    }
  }, [selectedChat])

  const loadChats = async () => {
    try {
      setIsLoading(true)
      const data = await chatService.getChats()
      setChats(data)
      if (data.length > 0) {
        setSelectedChat(data[0])
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const loadConversations = async (chatId: string) => {
    try {
      const data = await chatService.getConversations(chatId)
      setConversations(data)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-white dark:bg-gray-900">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-200 dark:border-gray-700 p-4">
          <h2 className="text-xl font-bold mb-4">Chats</h2>
          {isLoading ? (
            <p>Loading chats...</p>
          ) : (
            <div className="space-y-2">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`w-full text-left p-3 rounded ${
                    selectedChat?.id === chat.id
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {chat.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="p-6">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <h1 className="text-3xl font-bold mb-4">
              {selectedChat?.name || 'Select a chat'}
            </h1>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Conversations</h2>
              {conversations.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">No conversations yet</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800"
                    >
                      <h3 className="font-semibold">{conv.title || 'Untitled'}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {conv.messages.length} messages
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Chat
