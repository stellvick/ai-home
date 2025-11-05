// Authentication types
export interface User {
  id: string
  email: string
  username: string
  avatar?: string
  biography?: string
  preferences: UserPreferences
  createdAt: Date
  lastLoginAt: Date
  isActive: boolean
}

export interface UserPreferences {
  theme: 'lunar' | 'shadow'
  notifications: NotificationSettings
  chatSettings: ChatSettings
  language?: string
  timezone?: string
}

export interface NotificationSettings {
  evaluationComplete: boolean
  chatMentions: boolean
  securityAlerts: boolean
  pushoverEnabled: boolean
}

export interface ChatSettings {
  aiPersonality: 'mystical' | 'professional' | 'casual'
  aiTone: 'formal' | 'friendly' | 'enigmatic'
  historyEnabled: boolean
  contextLength: number
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
  expiresIn: number
}

export interface RegisterRequest {
  email: string
  username: string
  password: string
  passwordConfirm: string
}

export interface AuthenticationSession {
  id: string
  userId: string
  deviceInfo: DeviceInfo
  tokenHash: string
  createdAt: Date
  lastAccessAt: Date
  expiresAt: Date
  isActive: boolean
  ipAddress: string
  userAgent: string
}

export interface DeviceInfo {
  type: 'desktop' | 'mobile' | 'tablet' | 'unknown'
  browser?: string
  os?: string
  isTrusted: boolean
}
