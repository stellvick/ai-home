import { useState } from 'react'
import { ChatList } from '../components/ChatList'
import { ConversationList } from '../components/ConversationList'
import { MysticalBackground } from '../../../components/ui/MysticalBackground'
import { MysticalCard } from '../../../components/ui/MysticalCard'

export const ChatPage: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)

  return (
    <MysticalBackground className="flex">
      <div className="w-1/4 p-4">
        <MysticalCard className="h-full">
          <ChatList selectedChatId={selectedChatId} onSelectChat={setSelectedChatId} />
        </MysticalCard>
      </div>
      <div className="w-3/4 p-4">
        {selectedChatId ? (
          <MysticalCard className="h-full">
            <ConversationList chatId={selectedChatId} />
          </MysticalCard>
        ) : (
          <MysticalCard className="h-full flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-heading text-white mb-4">Bem-vindo ao Chat IA</h2>
              <p className="text-white/70">Selecione um chat para iniciar uma conversa mística</p>
            </div>
          </MysticalCard>
        )}
      </div>
    </MysticalBackground>
  )
}