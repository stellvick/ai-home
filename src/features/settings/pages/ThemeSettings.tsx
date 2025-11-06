import { Button } from '@heroui/react'
import { useSettingsStore } from '../../../store/settings'
import { themes } from '../../../theme/themes'
import { MysticalBackground } from '../../../components/ui/MysticalBackground'
import { MysticalCard } from '../../../components/ui/MysticalCard'

export const ThemeSettings: React.FC = () => {
  const { theme, setTheme } = useSettingsStore()

  return (
    <MysticalBackground className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading text-white mb-4 tracking-heading drop-shadow-lg">
            Escolha seu Reino Visual
          </h1>
          <p className="text-white/80 leading-body max-w-2xl mx-auto">
            Mergulhe em diferentes atmosferas místicas. Cada tema revela uma faceta única do conhecimento ancestral.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {Object.entries(themes).map(([key, themeData]) => (
            <MysticalCard
              key={key}
              className={`relative overflow-hidden transition-all duration-500 hover:shadow-2xl cursor-pointer group p-8 ${
                theme === key
                  ? 'ring-2 ring-white shadow-lg'
                  : 'hover:ring-1 hover:ring-white/50'
              }`}
              onClick={() => setTheme(key as any)}
            >
              {/* Background gradient */}
              <div
                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
                style={{
                  background: `linear-gradient(135deg, ${themeData.colors.primary}, ${themeData.colors.secondary})`
                }}
              />

              <div className="relative text-center space-y-6">
                {/* Theme icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg">
                  <span className="text-3xl">
                    {key === 'oraculo-lunar' ? '🌙' : '🌑'}
                  </span>
                </div>

                {/* Theme title */}
                <div>
                  <h3 className="text-2xl font-heading text-white mb-2">
                    {themeData.name}
                  </h3>
                  <p className="text-white/60 text-sm leading-body">
                    {key === 'oraculo-lunar'
                      ? 'Iluminação celestial e sabedoria profunda'
                      : 'Sombras misteriosas e conhecimento oculto'
                    }
                  </p>
                </div>

                {/* Color palette preview */}
                <div className="flex justify-center space-x-3">
                  <div
                    className="w-6 h-6 rounded-full shadow-sm border-2 border-white/20"
                    style={{ backgroundColor: themeData.colors.primary }}
                    title="Cor Primária"
                  />
                  <div
                    className="w-6 h-6 rounded-full shadow-sm border-2 border-white/20"
                    style={{ backgroundColor: themeData.colors.secondary }}
                    title="Cor Secundária"
                  />
                  <div
                    className="w-6 h-6 rounded-full shadow-sm border-2 border-white/20"
                    style={{ backgroundColor: themeData.colors.accent }}
                    title="Cor de Destaque"
                  />
                  <div
                    className="w-6 h-6 rounded-full shadow-sm border-2 border-white/20"
                    style={{ backgroundColor: themeData.colors.surface }}
                    title="Superfície"
                  />
                </div>

                {/* Selection indicator */}
                {theme === key && (
                  <div className="flex items-center justify-center space-x-2 text-white">
                    <span className="text-lg">✨</span>
                    <span className="font-semibold">Reino Ativo</span>
                    <span className="text-lg">✨</span>
                  </div>
                )}

                {/* Action button */}
                <Button
                  className={`w-full transition-all duration-300 ${
                    theme === key
                      ? 'bg-white text-primary hover:bg-white/90'
                      : 'bg-white/20 hover:bg-white/30 text-white border border-white/30'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setTheme(key as any)
                  }}
                >
                  {theme === key ? 'Reino Atual' : 'Escolher Este Reino'}
                </Button>
              </div>
            </MysticalCard>
          ))}
        </div>

        {/* Additional info */}
        <div className="text-center mt-12">
          <p className="text-white/50 text-sm">
            💫 Suas preferências são salvas automaticamente e persistem entre sessões
          </p>
        </div>
      </div>
    </MysticalBackground>
  )
}