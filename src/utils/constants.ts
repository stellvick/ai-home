// Application constants

export const APP_NAME = 'Oráculo IA'
export const APP_VERSION = '1.0.0'

// Theme constants
export const THEMES = {
  LUNAR: 'lunar',
  SHADOW: 'shadow',
} as const

export type Theme = (typeof THEMES)[keyof typeof THEMES]

// Oracle avatars
export const ORACLE_AVATARS = {
  LUNAR_SAGE: 'lunar-sage',
  SHADOW_SEER: 'shadow-seer',
  CRYSTAL_GUARDIAN: 'crystal-guardian',
  MYSTIC_ORACLE: 'mystic-oracle',
} as const

export const AVATAR_DESCRIPTIONS: Record<string, string> = {
  'lunar-sage': 'Luna Sage - Wise and ethereal guide',
  'shadow-seer': 'Shadow Seer - Mysterious and insightful oracle',
  'crystal-guardian': 'Crystal Guardian - Protective and clear-minded',
  'mystic-oracle': 'Mystic Oracle - Enigmatic and wise',
}

// Rune ratings
export const RUNE_RATINGS = {
  LEGENDARY: 'legendary',
  MASTERFUL: 'masterful',
  SKILLED: 'skilled',
  APPRENTICE: 'apprentice',
  NOVICE: 'novice',
} as const

// Resource types
export const RESOURCE_TYPES = {
  PROMPT: 'prompt',
  RESPONSE: 'response',
  IMAGE: 'image',
  DOCUMENT: 'document',
  CONVERSATION: 'conversation',
} as const

// Evaluation status
export const EVALUATION_STATUS = {
  PENDING: 'pending',
  ANALYZING: 'analyzing',
  REVIEWING: 'reviewing',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const

// API configuration
export const API_TIMEOUT = 30000 // 30 seconds
export const API_RETRY_ATTEMPTS = 3
export const API_RETRY_DELAY = 1000 // 1 second

// File upload
export const MAX_FILE_SIZE = 100 * 1024 * 1024 // 100 MB
export const ALLOWED_FILE_TYPES = [
  'text/plain',
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

// Pagination
export const DEFAULT_PAGE_SIZE = 20
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

// Message limits
export const MAX_MESSAGE_LENGTH = 10000
export const MAX_CONTEXT_WINDOW = 50

// Storage keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  PREFERENCES: 'preferences',
  THEME: 'theme',
}

// Feature flags
export const FEATURE_FLAGS = {
  ENABLE_MOCK_API: import.meta.env.VITE_ENABLE_MOCK_API === 'true',
  ENABLE_WEBSOCKETS: import.meta.env.VITE_ENABLE_WEBSOCKETS === 'true',
}

// Mystical colors (Lunar theme)
export const LUNAR_COLORS = {
  PRIMARY: '#0b2545',
  PRIMARY_LIGHT: '#1a3a5a',
  SECONDARY: '#f5f5f5',
  ACCENT: '#4b00ff',
  GOLD: '#d4af37',
}

// Mystical colors (Shadow theme)
export const SHADOW_COLORS = {
  PRIMARY: '#2e2e2e',
  PRIMARY_LIGHT: '#404040',
  SECONDARY: '#d4af37',
  ACCENT: '#8b0000',
  GOLD: '#d4af37',
}

// Animations
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
}

// Regex patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  USERNAME: /^[a-zA-Z0-9_]{3,50}$/,
}
