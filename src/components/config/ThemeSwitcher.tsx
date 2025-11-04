import { useThemeStore } from '@/stores/theme'
import { Button } from '@heroui/react'
import { Moon, Sun } from 'lucide-react'

export const ThemeSwitcher = () => {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg bg-white dark:bg-gray-800">
      <div className="flex items-center gap-2">
        {theme === 'light' ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
        <span className="capitalize font-medium">{theme} Mode</span>
      </div>
      <Button
        isIconOnly
        onClick={toggleTheme}
        size="sm"
        variant="flat"
      >
        {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      </Button>
    </div>
  )
}
