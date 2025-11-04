import { QueryClientProvider } from '@tanstack/react-query'
import { HeroUIProvider } from '@heroui/react'
import { AppRouter } from '@/lib/router'
import { queryClient } from '@/lib/react-query'
import { useThemeStore } from '@/stores/theme'
import { Navigation } from '@/components/Navigation'

function App() {
  const theme = useThemeStore((state) => state.theme)

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <div
          className={`min-h-screen ${theme === 'dark' ? 'dark' : 'light'}`}
          style={{ colorScheme: theme }}
        >
          <Navigation />
          <AppRouter />
        </div>
      </HeroUIProvider>
    </QueryClientProvider>
  )
}

export default App
