import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Textarea } from '@heroui/react'
import { api } from '../../../services/api'

interface EvaluateButtonProps {
  resourceId: string
  onEvaluated?: () => void
}

export const EvaluateButton: React.FC<EvaluateButtonProps> = ({ resourceId, onEvaluated }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [nota, setNota] = useState('')
  const [comentario, setComentario] = useState('')

  const queryClient = useQueryClient()

  const evaluateMutation = useMutation({
    mutationFn: (data: { nota: number; comentario?: string }) => api.evaluateResource(resourceId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] })
      setIsOpen(false)
      setNota('')
      setComentario('')
      onEvaluated?.()
    },
  })

  const handleSubmit = () => {
    const notaNum = parseInt(nota)
    if (isNaN(notaNum) || notaNum < 0) return
    evaluateMutation.mutate({ nota: notaNum, comentario: comentario || undefined })
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)} color="primary" size="sm">
        Avaliar
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContent>
          <ModalHeader>Avaliar Recurso</ModalHeader>
          <ModalBody className="space-y-4">
            <Input
              type="number"
              label="Nota"
              placeholder="0-10"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              min="0"
            />
            <Textarea
              label="Comentário (opcional)"
              placeholder="Deixe seu comentário..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancelar</Button>
            <Button onClick={handleSubmit} disabled={evaluateMutation.isPending}>
              {evaluateMutation.isPending ? 'Avaliando...' : 'Avaliar'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}