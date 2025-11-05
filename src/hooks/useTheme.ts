import { useThemeStore } from '../store/themeStore'
import { THEMES } from '../utils/constants'

export const useTheme = () => {
  const { theme, setTheme, toggleTheme } = useThemeStore()

  const isDarkMode = theme === THEMES.SHADOW

  return {
    theme,
    isDarkMode,
    setTheme,
    toggleTheme,
    themes: THEMES,
  }
}
