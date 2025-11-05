import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from '@heroui/react'
import { useState } from 'react'
import { ChatSession, OracleAvatar, ConversationContext, SessionSettings } from '../../types/chat'

interface CreateSessionModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateSession: (session: ChatSession) => void
}

const ORACLE_AVATARS: { value: OracleAvatar; label: string; emoji: string; systemPrompt: string }[] = [
  {
    value: 'lunar-sage',
    label: 'Lunar Sage',
    emoji: '🌙',
    systemPrompt: 'You are a wise oracle bathed in moonlight, offering ethereal guidance and cosmic wisdom.',
  },
  {
    value: 'shadow-seer',
    label: 'Shadow Seer',
    emoji: '🌑',
    systemPrompt: 'You are a mysterious oracle of shadows, revealing hidden truths with dark mystique.',
  },
  {
    value: 'crystal-guardian',
    label: 'Crystal Guardian',
    emoji: '🔮',
    systemPrompt: 'You are a guardian of crystalline secrets, channeling pure and clear wisdom.',
  },
  {
    value: 'mystic-oracle',
    label: 'Mystic Oracle',
    emoji: '✨',
    systemPrompt: 'You are a mystical oracle of ancient power, weaving prophecies and sacred knowledge.',
  },
]

const CreateSessionModal = ({ isOpen, onClose, onCreateSession }: CreateSessionModalProps) => {
  const [title, setTitle] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState<OracleAvatar>('lunar-sage')
  const [tone, setTone] = useState('mystical')

  const handleCreate = () => {
    if (!title.trim()) return

    const oracleConfig = ORACLE_AVATARS.find((a) => a.value === selectedAvatar)!

    const newSession: ChatSession = {
      id: Date.now().toString(),
      userId: '1', // Would come from auth context
      title: title.trim(),
      avatar: selectedAvatar,
      messages: [],
      context: {
        personality: selectedAvatar,
        tone,
        systemPrompt: oracleConfig.systemPrompt,
        contextWindow: [],
        customInstructions: undefined,
      } as ConversationContext,
      settings: {
        maxMessages: 50,
        autoTitle: false,
        saveHistory: true,
        temperature: 0.7,
      } as SessionSettings,
      status: 'active',
      createdAt: new Date(),
      lastActiveAt: new Date(),
      isArchived: false,
    }

    onCreateSession(newSession)
    setTitle('')
    setSelectedAvatar('lunar-sage')
    setTone('mystical')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur" size="md">
      <ModalContent className="mystical-card">
        <ModalHeader className="flex flex-col gap-1 oracle-title">✨ New Oracle Session</ModalHeader>
        <ModalBody className="gap-4">
          {/* Title */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Session Title</label>
            <Input
              placeholder="e.g., Cosmic Wisdom, Shadow Insights..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mystical-input"
            />
          </div>

          {/* Oracle Avatar Selection */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Choose Your Oracle</label>
            <div className="grid grid-cols-2 gap-2">
              {ORACLE_AVATARS.map((avatar) => (
                <button
                  key={avatar.value}
                  onClick={() => setSelectedAvatar(avatar.value)}
                  className={`p-3 rounded-lg border-2 transition-all text-center ${
                    selectedAvatar === avatar.value
                      ? 'border-mystical-gold bg-mystical-gold/20'
                      : 'border-gray-700 hover:border-mystical-gold/50'
                  }`}
                >
                  <div className="text-2xl mb-1">{avatar.emoji}</div>
                  <p className="text-xs font-medium text-white">{avatar.label}</p>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {ORACLE_AVATARS.find((a) => a.value === selectedAvatar)?.systemPrompt}
            </p>
          </div>

          {/* Tone Selection */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Conversation Tone</label>
            <Select
              selectedKeys={[tone]}
              onChange={(e) => setTone(e.target.value)}
              className="mystical-select"
            >
              <SelectItem key="mystical">Mystical & Enigmatic</SelectItem>
              <SelectItem key="professional">Professional & Clear</SelectItem>
              <SelectItem key="casual">Casual & Friendly</SelectItem>
              <SelectItem key="poetic">Poetic & Lyrical</SelectItem>
            </Select>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onPress={onClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            variant="shadow"
            onPress={handleCreate}
            isDisabled={!title.trim()}
            className="mystical-btn"
          >
            Create Session
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateSessionModal
