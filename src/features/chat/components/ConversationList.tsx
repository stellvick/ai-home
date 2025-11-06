import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Input, Listbox, ListboxItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@heroui/react'
import { api } from '../../../services/api'
import { Conversa } from '../../../types/contracts'

interface ConversationListProps {
  chatId: string
}

export const ConversationList: React.FC<ConversationListProps> = ({ chatId }) => {
  const { data: conversations, isLoading } = useQuery({
    queryKey: ['conversations', chatId],
    queryFn: () => api.getConversations(chatId),
  })

  const queryClient = useQueryClient()
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure()
  const { isOpen: isRenameOpen, onOpen: onRenameOpen, onClose: onRenameClose } = useDisclosure()
  const [newConversationTitle, setNewConversationTitle] = useState('')
  const [renameConversationId, setRenameConversationId] = useState<string | null>(null)
  const [renameTitle, setRenameTitle] = useState('')

  const createMutation = useMutation({
    mutationFn: ({ titulo }: { titulo: string }) => api.createConversation(chatId, { titulo }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations', chatId] })
      setNewConversationTitle('')
      onCreateClose()
    },
  })

  const renameMutation = useMutation({
    mutationFn: ({ id, titulo }: { id: string; titulo: string }) => api.renameConversation(id, { titulo }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations', chatId] })
      setRenameTitle('')
      setRenameConversationId(null)
      onRenameClose()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => api.deleteConversation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations', chatId] })
    },
  })

  const handleCreate = () => {
    if (newConversationTitle.trim()) {
      createMutation.mutate({ titulo: newConversationTitle.trim() })
    }
  }

  const handleRename = () => {
    if (renameConversationId && renameTitle.trim()) {
      renameMutation.mutate({ id: renameConversationId, titulo: renameTitle.trim() })
    }
  }

  const handleDelete = (id: string) => {
    deleteMutation.mutate({ id })
  }

  const openRenameModal = (conversation: Conversa) => {
    setRenameConversationId(conversation.id)
    setRenameTitle(conversation.titulo)
    onRenameOpen()
  }

  if (isLoading) return <div className="p-4">Carregando conversas...</div>

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Conversas</h3>
      <Listbox className="mb-4">
        {conversations?.items.map((conversation: Conversa) => (
          <ListboxItem key={conversation.id}>
            <div className="flex justify-between items-center w-full">
              <span>{conversation.titulo}</span>
              <div>
                <Button size="sm" variant="ghost" onClick={() => openRenameModal(conversation)}>
                  ✏️
                </Button>
                <Button size="sm" variant="ghost" color="danger" onClick={() => handleDelete(conversation.id)}>
                  🗑️
                </Button>
              </div>
            </div>
          </ListboxItem>
        ))}
      </Listbox>
      <Button onClick={onCreateOpen} className="w-full">Nova Conversa</Button>

      <Modal isOpen={isCreateOpen} onClose={onCreateClose}>
        <ModalContent>
          <ModalHeader>Criar Nova Conversa</ModalHeader>
          <ModalBody>
            <Input
              value={newConversationTitle}
              onChange={(e) => setNewConversationTitle(e.target.value)}
              placeholder="Título da conversa"
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onCreateClose}>Cancelar</Button>
            <Button onClick={handleCreate} disabled={createMutation.isPending}>
              {createMutation.isPending ? 'Criando...' : 'Criar'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isRenameOpen} onClose={onRenameClose}>
        <ModalContent>
          <ModalHeader>Renomear Conversa</ModalHeader>
          <ModalBody>
            <Input
              value={renameTitle}
              onChange={(e) => setRenameTitle(e.target.value)}
              placeholder="Novo título"
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onRenameClose}>Cancelar</Button>
            <Button onClick={handleRename} disabled={renameMutation.isPending}>
              {renameMutation.isPending ? 'Renomeando...' : 'Renomear'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}