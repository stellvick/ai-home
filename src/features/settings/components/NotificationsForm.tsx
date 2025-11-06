import { useState } from 'react'
import { Button, Checkbox } from '@heroui/react'

export const NotificationsForm: React.FC = () => {
  const [sistema, setSistema] = useState({ email: false, sms: false, push: false })
  const [produto, setProduto] = useState({ email: false, sms: false, push: false })

  const handleSave = () => {
    console.log('Saving notifications', { sistema, produto })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Preferências de Notificação</h2>

      <div>
        <h3 className="font-medium text-white mb-3">Notificações do Sistema</h3>
        <div className="space-y-2">
          <Checkbox isSelected={sistema.email} onValueChange={(v) => setSistema({ ...sistema, email: v })}>
            <span className="text-white">Email</span>
          </Checkbox>
          <Checkbox isSelected={sistema.sms} onValueChange={(v) => setSistema({ ...sistema, sms: v })}>
            <span className="text-white">SMS</span>
          </Checkbox>
          <Checkbox isSelected={sistema.push} onValueChange={(v) => setSistema({ ...sistema, push: v })}>
            <span className="text-white">Push</span>
          </Checkbox>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-white mb-3">Notificações de Produto</h3>
        <div className="space-y-2">
          <Checkbox isSelected={produto.email} onValueChange={(v) => setProduto({ ...produto, email: v })}>
            <span className="text-white">Email</span>
          </Checkbox>
          <Checkbox isSelected={produto.sms} onValueChange={(v) => setProduto({ ...produto, sms: v })}>
            <span className="text-white">SMS</span>
          </Checkbox>
          <Checkbox isSelected={produto.push} onValueChange={(v) => setProduto({ ...produto, push: v })}>
            <span className="text-white">Push</span>
          </Checkbox>
        </div>
      </div>

      <Button onClick={handleSave} className="bg-white text-primary hover:bg-white/90">
        Salvar Preferências
      </Button>
    </div>
  )
}