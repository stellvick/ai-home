import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsState {
  theme: 'oraculo-lunar' | 'oraculo-sombras'
  setTheme: (theme: 'oraculo-lunar' | 'oraculo-sombras') => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'oraculo-lunar',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'settings',
    }
  )
)