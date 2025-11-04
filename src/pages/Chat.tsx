import { useEffect, useState } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Spinner,
  Button,
  ScrollShadow,
} from '@heroui/react'
import { MessageSquare, Plus, Search } from 'lucide-react'
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
        <div className="w-72 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex flex-col">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Chats</h2>
              <Button isIconOnly size="sm" variant="light">
                <Plus className="w-5 h-5" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search chats..."
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <ScrollShadow className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Spinner size="sm" />
              </div>
            ) : (
              <div className="p-4 space-y-2">
                {chats.length === 0 ? (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                    No chats yet
                  </p>
                ) : (
                  chats.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedChat?.id === chat.id
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{chat.name}</span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </ScrollShadow>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-8">
            {error && (
              <Card className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 mb-6">
                <CardBody>
                  <p className="text-red-700 dark:text-red-300">{error}</p>
                </CardBody>
              </Card>
            )}

            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">
                {selectedChat?.name || 'Select a chat'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedChat ? 'View and manage conversations' : 'Choose a chat to get started'}
              </p>
            </div>

            {selectedChat && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-4">Conversations</h2>
                  {conversations.length === 0 ? (
                    <Card>
                      <CardBody className="text-center py-12">
                        <MessageSquare className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                        <p className="text-gray-500 dark:text-gray-400">
                          No conversations yet. Start a new conversation to begin.
                        </p>
                      </CardBody>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {conversations.map((conv) => (
                        <Card key={conv.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                          <CardHeader className="flex flex-col items-start px-6 py-4">
                            <h3 className="font-semibold text-lg">
                              {conv.title || 'Untitled Conversation'}
                            </h3>
                          </CardHeader>
                          <Divider />
                          <CardBody>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <MessageSquare className="w-4 h-4" />
                              <span>{conv.messages.length} messages</span>
                            </div>
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Chat
