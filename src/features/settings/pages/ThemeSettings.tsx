import { Card, CardBody, Button } from '@heroui/react'
import { useSettingsStore } from '../../../store/settings'
import { themes } from '../../../theme/themes'

export const ThemeSettings: React.FC = () => {
  const { theme, setTheme } = useSettingsStore()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-heading text-foreground mb-4 tracking-heading">
          Escolha seu Reino Visual
        </h1>
        <p className="text-foreground/70 leading-body max-w-2xl mx-auto">
          Mergulhe em diferentes atmosferas místicas. Cada tema revela uma faceta única do conhecimento ancestral.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(themes).map(([key, themeData]) => (
          <Card
            key={key}
            className={`relative overflow-hidden transition-all duration-500 hover:shadow-2xl cursor-pointer group ${
              theme === key
                ? 'ring-2 ring-primary shadow-lg glow-primary'
                : 'hover:ring-1 hover:ring-primary/50'
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

            <CardBody className="relative p-8">
              <div className="text-center space-y-6">
                {/* Theme icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg">
                  <span className="text-3xl">
                    {key === 'oraculo-lunar' ? '🌙' : '🌑'}
                  </span>
                </div>

                {/* Theme title */}
                <div>
                  <h3 className="text-2xl font-heading text-foreground mb-2">
                    {themeData.name}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-body">
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
                  <div className="flex items-center justify-center space-x-2 text-primary">
                    <span className="text-lg">✨</span>
                    <span className="font-semibold">Reino Ativo</span>
                    <span className="text-lg">✨</span>
                  </div>
                )}

                {/* Action button */}
                <Button
                  className={`w-full transition-all duration-300 ${
                    theme === key
                      ? 'bg-primary hover:bg-primary/90 text-white'
                      : 'bg-surface hover:bg-surface/80 text-foreground border border-border'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setTheme(key as any)
                  }}
                >
                  {theme === key ? 'Reino Atual' : 'Escolher Este Reino'}
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Additional info */}
      <div className="text-center">
        <p className="text-foreground/50 text-sm">
          💫 Suas preferências são salvas automaticamente e persistem entre sessões
        </p>
      </div>
    </div>
  )
}