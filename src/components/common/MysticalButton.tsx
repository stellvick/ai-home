import React from 'react'
import { Button, ButtonProps } from '@heroui/react'

export interface MysticalButtonProps extends Omit<ButtonProps, 'children' | 'variant'> {
  children: React.ReactNode
  mysticalVariant?: 'primary' | 'secondary' | 'accent' | 'glow'
}

export const MysticalButton: React.FC<MysticalButtonProps> = ({
  children,
  mysticalVariant = 'primary',
  className = '',
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-[var(--color-primary)] text-[var(--color-secondary)] hover:bg-[var(--color-primary-light)]',
    secondary: 'bg-[var(--color-secondary)] text-[var(--color-primary)] hover:bg-[var(--color-secondary-dark)]',
    accent: 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-light)]',
    glow: 'bg-[var(--color-primary)] text-[var(--color-secondary)] shadow-lg hover:shadow-xl hover:scale-105 transition-transform',
  }

  return (
    <Button
      {...props}
      className={`mystical-btn transition-all duration-200 ${variantStyles[mysticalVariant]} ${className}`}
    >
      {children}
    </Button>
  )
}

export default MysticalButton
