import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Input, Listbox, ListboxItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@heroui/react'
import { api } from '../../../services/api'
import { Chat } from '../../../types/contracts'

interface ChatListProps {
  selectedChatId: string | null
  onSelectChat: (chatId: string | null) => void
}

export const ChatList: React.FC<ChatListProps> = ({ selectedChatId, onSelectChat }) => {
  const { data: chats, isLoading } = useQuery({
    queryKey: ['chats'],
    queryFn: () => api.getChats(),
  })

  const queryClient = useQueryClient()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [newChatName, setNewChatName] = useState('')

  const createMutation = useMutation({
    mutationFn: (nome: string) => api.createChat({ nome }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'] })
      setNewChatName('')
      onClose()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: ({ chatId }: { chatId: string }) => api.deleteChat(chatId),
    onSuccess: (_, { chatId }) => {
      queryClient.invalidateQueries({ queryKey: ['chats'] })
      if (selectedChatId === chatId) onSelectChat(null)
    },
  })

  const handleCreate = () => {
    if (newChatName.trim()) {
      createMutation.mutate(newChatName.trim())
    }
  }

  const handleDelete = (chatId: string) => {
    deleteMutation.mutate({ chatId })
  }

  if (isLoading) return <div className="p-4">Carregando chats...</div>

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Chats</h3>
      <Listbox className="mb-4">
        {chats?.map((chat: Chat) => (
          <ListboxItem
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={selectedChatId === chat.id ? 'bg-primary/20' : ''}
          >
            <div className="flex justify-between items-center w-full">
              <span>{chat.nome}</span>
              <Button size="sm" variant="ghost" color="danger" onClick={(e) => { e.stopPropagation(); handleDelete(chat.id) }}>
                🗑️
              </Button>
            </div>
          </ListboxItem>
        ))}
      </Listbox>
      <Button onClick={onOpen} className="w-full">Novo Chat</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Criar Novo Chat</ModalHeader>
          <ModalBody>
            <Input
              value={newChatName}
              onChange={(e) => setNewChatName(e.target.value)}
              placeholder="Nome do chat"
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>Cancelar</Button>
            <Button onClick={handleCreate} disabled={createMutation.isPending}>
              {createMutation.isPending ? 'Criando...' : 'Criar'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}