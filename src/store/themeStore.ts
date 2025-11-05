import { create } from 'zustand'
import { THEMES } from '../utils/constants'

export type Theme = (typeof THEMES)[keyof typeof THEMES]

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>((set) => {
  // Initialize theme from localStorage or default to lunar
  const savedTheme = (localStorage.getItem('theme') as Theme) || THEMES.LUNAR

  return {
    theme: savedTheme,
    setTheme: (theme: Theme) => set({ theme }),
    toggleTheme: () =>
      set((state) => ({
        theme: state.theme === THEMES.LUNAR ? THEMES.SHADOW : THEMES.LUNAR,
      })),
  }
})
