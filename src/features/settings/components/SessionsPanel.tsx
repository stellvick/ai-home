import { Button, Listbox, ListboxItem } from '@heroui/react'

export const SessionsPanel: React.FC = () => {
  // Mock sessions
  const sessions = [
    { id: '1', device: 'Chrome on Mac', location: 'São Paulo, BR', lastActive: 'Agora' },
    { id: '2', device: 'Safari on iPhone', location: 'São Paulo, BR', lastActive: '2 horas atrás' },
  ]

  const handleLogoutAll = () => {
    console.log('Logout all sessions')
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Sessões Ativas</h2>

      <Listbox className="bg-white/10 rounded-lg p-4">
        {sessions.map((session) => (
          <ListboxItem key={session.id} className="text-white">
            <div>
              <div className="font-medium">{session.device}</div>
              <div className="text-sm text-white/70">{session.location} • {session.lastActive}</div>
            </div>
          </ListboxItem>
        ))}
      </Listbox>

      <Button onClick={handleLogoutAll} className="bg-red-600 text-white hover:bg-red-700">
        Encerrar Todas as Sessões
      </Button>
    </div>
  )
}