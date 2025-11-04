import { useThemeStore } from '@/stores/theme'
import { Button, Switch, Card, CardBody } from '@heroui/react'
import { Moon, Sun } from 'lucide-react'

export const ThemeSwitcher = () => {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {theme === 'light' ? (
          <Sun className="w-5 h-5 text-amber-500" />
        ) : (
          <Moon className="w-5 h-5 text-indigo-500" />
        )}
        <div>
          <p className="font-medium capitalize">{theme} Mode</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {theme === 'light' 
              ? 'Bright and easy on the eyes' 
              : 'Dark theme for low light environments'}
          </p>
        </div>
      </div>
      <Switch
        isSelected={theme === 'dark'}
        onChange={toggleTheme}
        size="lg"
      />
    </div>
  )
}
