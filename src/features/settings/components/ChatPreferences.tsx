import { useState } from 'react'
import { Button, Input, Select, SelectItem, Checkbox } from '@heroui/react'

export const ChatPreferences: React.FC = () => {
  const [tom, setTom] = useState('')
  const [modelo, setModelo] = useState('')
  const [historicoHabilitado, setHistoricoHabilitado] = useState(false)

  const handleSave = () => {
    console.log('Saving chat preferences', { tom, modelo, historicoHabilitado })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Preferências do Chat IA</h2>

      <Input
        label="Tom"
        value={tom}
        onChange={(e) => setTom(e.target.value)}
        placeholder="Ex: Amigável, Profissional"
        classNames={{
          label: "text-white/90",
          input: "bg-white/10 border-white/20 text-white placeholder:text-white/50",
          inputWrapper: "bg-white/10 border-white/20 hover:border-white/40 focus:border-white",
        }}
      />

      <Select
        label="Modelo"
        selectedKeys={modelo ? [modelo] : []}
        onSelectionChange={(keys) => setModelo(Array.from(keys)[0] as string)}
        classNames={{
          label: "text-white/90",
          trigger: "bg-white/10 border-white/20 text-white",
          listbox: "bg-white/10",
        }}
      >
        <SelectItem key="gpt-4">GPT-4</SelectItem>
        <SelectItem key="gpt-3.5">GPT-3.5</SelectItem>
        <SelectItem key="claude">Claude</SelectItem>
      </Select>

      <Checkbox
        isSelected={historicoHabilitado}
        onValueChange={setHistoricoHabilitado}
        classNames={{
          label: "text-white",
        }}
      >
        Habilitar histórico de conversas
      </Checkbox>

      <Button onClick={handleSave} className="bg-white text-primary hover:bg-white/90">
        Salvar Preferências
      </Button>
    </div>
  )
}