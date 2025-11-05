import React, { useEffect } from 'react'
import { useThemeStore } from '../../store/themeStore'

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme } = useThemeStore()

  useEffect(() => {
    // Set theme on root element
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    root.classList.toggle('dark', theme === 'shadow')

    // Store theme preference
    localStorage.setItem('theme', theme)
  }, [theme])

  return <>{children}</>
}

export default ThemeProvider
