import React from 'react'
import { Card, CardBody, CardHeader, Divider, Spacer } from '@heroui/react'
import { useTheme } from '../hooks/useTheme'
import { MysticalButton } from '../components/common/MysticalButton'
import { MysticalCard } from '../components/common/MysticalCard'
import { RuneRating } from '../components/common/RuneRating'
import { Typography } from '../components/theme/Typography'
import Navbar from '../components/layout/Navbar'
import Breadcrumbs from '../components/layout/Breadcrumbs'

export const ThemeShowcase: React.FC = () => {
  const { theme, isDarkMode } = useTheme()

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Theme Showcase', isActive: true },
  ]

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      <Navbar
        title="Oráculo IA - Theme Showcase"
        items={[
          { label: 'Dashboard', href: '/' },
          { label: 'Chat', href: '/chat' },
          { label: 'Settings', href: '/settings' },
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems} />

        <Spacer y={8} />

        {/* Theme Info */}
        <Card className="bg-[var(--color-surface)] border border-[var(--color-border)]">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <Typography variant="h2">Theme Showcase</Typography>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Current Theme: <span className="font-semibold capitalize">{theme}</span>
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <Typography variant="body">
              Welcome to the AI Oracle Platform theme showcase. This page demonstrates all mystical
              UI components and the two available themes: Lunar (ethereal blue aesthetic) and Shadow
              (dark fantasy aesthetic).
            </Typography>
          </CardBody>
        </Card>

        <Spacer y={6} />

        {/* Typography Section */}
        <MysticalCard title="Typography System" description="Mystical text styles with mystical fonts">
          <div className="space-y-4">
            <div>
              <Typography variant="h1">Heading 1 - Cinzel Decorative</Typography>
              <Typography variant="caption" className="text-[var(--color-text-secondary)]">
                Used for main page titles
              </Typography>
            </div>

            <div>
              <Typography variant="h2">Heading 2 - Cinzel Decorative</Typography>
              <Typography variant="caption" className="text-[var(--color-text-secondary)]">
                Used for section titles
              </Typography>
            </div>

            <div>
              <Typography variant="h3">Heading 3 - Cinzel Decorative</Typography>
              <Typography variant="caption" className="text-[var(--color-text-secondary)]">
                Used for subsections
              </Typography>
            </div>

            <div>
              <Typography variant="body">
                This is body text using Montserrat font. It is the primary text style for regular
                content throughout the platform.
              </Typography>
              <Typography variant="caption" className="text-[var(--color-text-secondary)]">
                Used for regular content and descriptions
              </Typography>
            </div>

            <div>
              <Typography variant="overline">Overline - All Caps</Typography>
              <Typography variant="caption" className="text-[var(--color-text-secondary)]">
                Used for labels and metadata
              </Typography>
            </div>
          </div>
        </MysticalCard>

        <Spacer y={6} />

        {/* Color Palette */}
        <MysticalCard title="Color Palette" description="Mystical colors for both themes">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Typography variant="h4" className="mb-4">
                Primary Colors
              </Typography>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded border border-[var(--color-border)]"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  />
                  <Typography variant="body">Primary: var(--color-primary)</Typography>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded border border-[var(--color-border)]"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                  />
                  <Typography variant="body">Secondary: var(--color-secondary)</Typography>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded border border-[var(--color-border)]"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  />
                  <Typography variant="body">Accent: var(--color-accent)</Typography>
                </div>
              </div>
            </div>

            <div>
              <Typography variant="h4" className="mb-4">
                Functional Colors
              </Typography>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded border border-[var(--color-border)]"
                    style={{ backgroundColor: 'var(--color-gold)' }}
                  />
                  <Typography variant="body">Gold: var(--color-gold)</Typography>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded"
                    style={{ backgroundColor: 'var(--color-background)' }}
                  />
                  <Typography variant="body">Background: var(--color-background)</Typography>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded border border-[var(--color-border)]"
                    style={{ backgroundColor: 'var(--color-surface)' }}
                  />
                  <Typography variant="body">Surface: var(--color-surface)</Typography>
                </div>
              </div>
            </div>
          </div>
        </MysticalCard>

        <Spacer y={6} />

        {/* Button Variants */}
        <MysticalCard title="Button Variants" description="All mystical button styles">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <MysticalButton mysticalVariant="primary">Primary Button</MysticalButton>
              <Typography variant="caption" className="text-[var(--color-text-secondary)] mt-2">
                Primary action
              </Typography>
            </div>
            <div>
              <MysticalButton mysticalVariant="secondary">Secondary Button</MysticalButton>
              <Typography variant="caption" className="text-[var(--color-text-secondary)] mt-2">
                Secondary action
              </Typography>
            </div>
            <div>
              <MysticalButton mysticalVariant="accent">Accent Button</MysticalButton>
              <Typography variant="caption" className="text-[var(--color-text-secondary)] mt-2">
                Highlighted action
              </Typography>
            </div>
            <div>
              <MysticalButton mysticalVariant="glow">Glow Button</MysticalButton>
              <Typography variant="caption" className="text-[var(--color-text-secondary)] mt-2">
                Emphasized action
              </Typography>
            </div>
          </div>
        </MysticalCard>

        <Spacer y={6} />

        {/* Rune Ratings */}
        <MysticalCard title="Rune Rating System" description="Mystical evaluation ratings">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div>
              <RuneRating rating="legendary" score={100} />
            </div>
            <div>
              <RuneRating rating="masterful" score={85} />
            </div>
            <div>
              <RuneRating rating="skilled" score={70} />
            </div>
            <div>
              <RuneRating rating="apprentice" score={50} />
            </div>
            <div>
              <RuneRating rating="novice" score={25} />
            </div>
          </div>
        </MysticalCard>

        <Spacer y={6} />

        {/* Cards */}
        <MysticalCard title="Card Components" description="Mystical card styling">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MysticalCard
              title="Card 1"
              description="This is a mystical card component with title and description"
            >
              <Typography variant="body">
                Card content goes here. Cards are used to group related information and provide
                visual separation.
              </Typography>
            </MysticalCard>
            <MysticalCard
              title="Card 2"
              description="Another example of a mystical card"
            >
              <Typography variant="body">
                You can place any content inside mystical cards, including text, forms, and other
                components.
              </Typography>
            </MysticalCard>
          </div>
        </MysticalCard>

        <Spacer y={6} />

        {/* Theme Information */}
        <MysticalCard title="Current Theme Information" description="Active theme details">
          <div className="space-y-4">
            <div>
              <Typography variant="overline">Theme Type</Typography>
              <Typography variant="h5" className="capitalize">
                {theme} Theme
              </Typography>
              <Typography variant="caption" className="text-[var(--color-text-secondary)]">
                {isDarkMode ? 'Dark fantasy aesthetic with gold accents' : 'Ethereal blue aesthetic'}
              </Typography>
            </div>

            <Divider />

            <Typography variant="body">
              <strong>CSS Variables:</strong> All theme colors are stored as CSS custom properties,
              making it easy to create responsive, theme-aware components. The theme automatically
              switches on page load based on user preferences stored in localStorage.
            </Typography>

            <Typography variant="body">
              <strong>Accessibility:</strong> The mystical theme system maintains proper color
              contrast ratios for WCAG AA compliance in both themes. Use semantic HTML and ARIA
              labels for interactive components.
            </Typography>
          </div>
        </MysticalCard>

        <Spacer y={8} />
      </div>
    </div>
  )
}

export default ThemeShowcase
