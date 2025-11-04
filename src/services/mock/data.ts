import type { Chat, Conversation, Message, Resource, User } from '@/types'

// Mock data for chats
export const mockChats: Chat[] = [
  {
    id: '1',
    name: 'General Chat',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'AI Analysis',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Development',
    created_at: new Date().toISOString(),
  },
]

// Mock data for conversations
export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    chat_id: '1',
    title: 'Hello World',
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'What is machine learning?',
        timestamp: new Date(),
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content:
          'Machine learning is a subset of artificial intelligence that enables systems to learn from data.',
        timestamp: new Date(),
      },
    ] as Message[],
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 'conv-2',
    chat_id: '1',
    title: 'API Questions',
    messages: [
      {
        id: 'msg-3',
        role: 'user',
        content: 'How do I integrate an API?',
        timestamp: new Date(),
      },
      {
        id: 'msg-4',
        role: 'assistant',
        content:
          'You can integrate an API by making HTTP requests to the API endpoints.',
        timestamp: new Date(),
      },
    ] as Message[],
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 'conv-3',
    chat_id: '2',
    title: 'Data Analysis',
    messages: [
      {
        id: 'msg-5',
        role: 'user',
        content: 'Analyze this dataset',
        timestamp: new Date(),
      },
    ] as Message[],
    created_at: new Date(),
    updated_at: new Date(),
  },
]

// Mock data for resources
export const mockResources: Resource[] = [
  {
    id: 'res-1',
    name: 'OpenAI GPT',
    api_url: 'https://api.openai.com/v1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'res-2',
    name: 'Claude AI',
    api_url: 'https://api.anthropic.com/v1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// Mock user
export const mockUser: User = {
  id: 'user-1',
  username: 'testuser',
  jwt: 'mock-jwt-token-' + Date.now(),
}
