import type { User } from '@/types'

export interface UserProfile extends User {
  createdAt?: Date
  updatedAt?: Date
}

export type UserContextType = {
  user: UserProfile | null
  isLoading: boolean
  error: string | null
}
