import { User } from '../../types/auth'

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'oracle@example.com',
    username: 'OracleMaster',
    avatar: '✨',
    biography: 'A mystical guide in the realm of AI',
    preferences: {
      theme: 'lunar',
      notifications: {
        evaluationComplete: true,
        chatMentions: true,
        securityAlerts: true,
        pushoverEnabled: false,
      },
      chatSettings: {
        aiPersonality: 'mystical',
        aiTone: 'enigmatic',
        historyEnabled: true,
        contextLength: 20,
      },
    },
    createdAt: new Date('2024-01-01'),
    lastLoginAt: new Date(),
    isActive: true,
  },
  {
    id: '2',
    email: 'sage@example.com',
    username: 'ShadowSeer',
    avatar: '🌙',
    biography: 'A keeper of ancient wisdom',
    preferences: {
      theme: 'shadow',
      notifications: {
        evaluationComplete: true,
        chatMentions: false,
        securityAlerts: true,
        pushoverEnabled: true,
      },
      chatSettings: {
        aiPersonality: 'professional',
        aiTone: 'formal',
        historyEnabled: true,
        contextLength: 30,
      },
    },
    createdAt: new Date('2024-02-01'),
    lastLoginAt: new Date(),
    isActive: true,
  },
]

export const mockAuthTokens: Record<string, string> = {
  'oracle@example.com': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6Im9yYWNsZUBleGFtcGxlLmNvbSIsImlhdCI6MTcwMDAwMDAwMH0.MOCK_TOKEN_1',
  'sage@example.com': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJlbWFpbCI6InNhZ2VAZXhhbXBsZS5jb20iLCJpYXQiOjE3MDAwMDAwMDB9.MOCK_TOKEN_2',
}

export const mockCredentials: Record<string, string> = {
  'oracle@example.com': 'mysticalPassword123',
  'sage@example.com': 'shadowPassword456',
}

export const mockAuthResponses = {
  successLogin: (email: string) => ({
    user: mockUsers.find((u) => u.email === email) || mockUsers[0],
    token: mockAuthTokens[email as keyof typeof mockAuthTokens] || mockAuthTokens['oracle@example.com'],
    refreshToken: 'mock-refresh-token',
  }),

  successRegister: (userData: any) => ({
    user: {
      id: '999',
      email: userData.email,
      username: userData.username,
      avatar: '✨',
      biography: '',
      preferences: {
        theme: 'lunar' as const,
        notifications: {
          evaluationComplete: true,
          chatMentions: true,
          securityAlerts: true,
          pushoverEnabled: false,
        },
        chatSettings: {
          aiPersonality: 'mystical' as const,
          aiTone: 'enigmatic' as const,
          historyEnabled: true,
          contextLength: 20,
        },
      },
      createdAt: new Date(),
      lastLoginAt: new Date(),
      isActive: true,
    },
    token: 'mock-jwt-token-new-user',
    refreshToken: 'mock-refresh-token',
  }),

  invalidCredentials: {
    error: {
      code: 'INVALID_CREDENTIALS',
      message: 'Invalid email or password',
    },
  },

  userNotFound: {
    error: {
      code: 'USER_NOT_FOUND',
      message: 'User not found',
    },
  },
}
