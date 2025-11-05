import React from 'react'

export interface TypographyProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'overline'
  children: React.ReactNode
  className?: string
}

export const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  className = '',
}) => {
  const fontFamily = variant === 'h1' || variant === 'h2' || variant === 'h3' ? 'cinzel-decorative' : 'montserrat'

  const variantStyles = {
    h1: 'text-4xl font-bold tracking-tight',
    h2: 'text-3xl font-bold tracking-tight',
    h3: 'text-2xl font-bold tracking-wide',
    h4: 'text-xl font-semibold tracking-wide',
    h5: 'text-lg font-semibold',
    h6: 'text-base font-semibold',
    body: 'text-base leading-relaxed',
    caption: 'text-sm leading-relaxed',
    overline: 'text-xs uppercase tracking-widest',
  }

  const tagMap: Record<string, React.ElementType> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    body: 'p',
    caption: 'p',
    overline: 'p',
  }

  const Tag = tagMap[variant]

  return React.createElement(
    Tag,
    {
      className: `text-[var(--color-text)] transition-colors ${variantStyles[variant]} font-${fontFamily} ${className}`,
    },
    children
  )
}
