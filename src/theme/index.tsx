import { createContext, useContext, useEffect } from 'react'
import { useSettingsStore } from '../store/settings'
import { themes } from './themes'

const ThemeContext = createContext<string>('oraculo-lunar')

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useSettingsStore()

  useEffect(() => {
    const root = document.documentElement
    const themeColors = themes[theme].colors
    const themeTypography = themes[theme].typography

    // Apply colors
    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
    })

    // Apply typography
    root.style.setProperty('--font-family', themeTypography.fontFamily)
    root.style.setProperty('--heading-font-weight', themeTypography.heading.fontWeight)
    root.style.setProperty('--heading-letter-spacing', themeTypography.heading.letterSpacing)
    root.style.setProperty('--body-font-weight', themeTypography.body.fontWeight)
    root.style.setProperty('--body-line-height', themeTypography.body.lineHeight)

    // Set theme class on body for additional styling
    document.body.className = `theme-${theme}`
  }, [theme])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = () => {
      document.body.classList.toggle('reduce-motion', mediaQuery.matches)
    }
    handleChange()
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}