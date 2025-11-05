import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Chip } from '@heroui/react'
import { Recurso } from '../../../types/contracts'

interface ItemModalProps {
  item: Recurso | null
  isOpen: boolean
  onClose: () => void
}

export const ItemModal: React.FC<ItemModalProps> = ({ item, isOpen, onClose }) => {
  if (!item) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      classNames={{
        base: "bg-surface border border-border",
        header: "border-b border-border",
        body: "py-6",
        footer: "border-t border-border",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex items-center space-x-3">
          <span className="text-2xl">📖</span>
          <div>
            <h2 className="text-xl font-heading text-foreground">{item.titulo}</h2>
            <Chip
              size="sm"
              variant={item.avaliado ? "solid" : "bordered"}
              color={item.avaliado ? "success" : "default"}
              className="mt-1"
            >
              {item.avaliado ? "⭐ Recurso Avaliado" : "⏳ Aguardando Avaliação"}
            </Chip>
          </div>
        </ModalHeader>

        <ModalBody>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Descrição Mística</h3>
              <p className="text-foreground/80 leading-body bg-background/50 p-4 rounded-lg border border-border">
                {item.descricao}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background/30 p-4 rounded-lg border border-border">
                <h4 className="font-semibold text-foreground mb-2">Status</h4>
                <p className="text-foreground/70">
                  {item.avaliado
                    ? "Este recurso já foi avaliado pela comunidade"
                    : "Este recurso aguarda sua avaliação valiosa"
                  }
                </p>
              </div>

              <div className="bg-background/30 p-4 rounded-lg border border-border">
                <h4 className="font-semibold text-foreground mb-2">Identificador</h4>
                <p className="text-foreground/70 font-mono text-sm">
                  #{item.id}
                </p>
              </div>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="ghost"
            onClick={onClose}
            className="mr-2"
          >
            Fechar
          </Button>
          <Button
            className="bg-primary hover:bg-primary/90"
            onClick={onClose}
          >
            Explorar Mais Recursos
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}