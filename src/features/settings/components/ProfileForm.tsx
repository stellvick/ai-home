import { useState } from 'react'
import { Button, Input, Textarea } from '@heroui/react'

export const ProfileForm: React.FC = () => {
  const [nome, setNome] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [bio, setBio] = useState('')

  const handleSave = () => {
    // Save logic
    console.log('Saving profile', { nome, avatarUrl, bio })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Perfil do Usuário</h2>

      <Input
        label="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Seu nome completo"
        classNames={{
          label: "text-white/90",
          input: "bg-white/10 border-white/20 text-white placeholder:text-white/50",
          inputWrapper: "bg-white/10 border-white/20 hover:border-white/40 focus:border-white",
        }}
      />

      <Input
        label="URL do Avatar"
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
        placeholder="https://..."
        classNames={{
          label: "text-white/90",
          input: "bg-white/10 border-white/20 text-white placeholder:text-white/50",
          inputWrapper: "bg-white/10 border-white/20 hover:border-white/40 focus:border-white",
        }}
      />

      <Textarea
        label="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Conte um pouco sobre você..."
        classNames={{
          label: "text-white/90",
          input: "bg-white/10 border-white/20 text-white placeholder:text-white/50",
          inputWrapper: "bg-white/10 border-white/20 hover:border-white/40 focus:border-white",
        }}
      />

      <Button onClick={handleSave} className="bg-white text-primary hover:bg-white/90">
        Salvar Perfil
      </Button>
    </div>
  )
}