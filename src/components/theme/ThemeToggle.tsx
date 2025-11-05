import React from 'react'
import { Button } from '@heroui/react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

export const ThemeToggle: React.FC = () => {
  const { toggleTheme, isDarkMode } = useTheme()

  return (
    <Button
      isIconOnly
      variant="light"
      className="mystical-btn transition-all hover:scale-110"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDarkMode ? 'lunar' : 'shadow'} theme`}
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-indigo-500" />
      )}
    </Button>
  )
}

export default ThemeToggle
