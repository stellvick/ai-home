import React from 'react'
import { Navbar as HeroNavbar, NavbarBrand, NavbarContent, NavbarItem, Link } from '@heroui/react'
import ThemeToggle from '../theme/ThemeToggle'

export interface NavbarProps {
  title?: string
  items?: Array<{ label: string; href: string; isActive?: boolean }>
  rightContent?: React.ReactNode
}

export const Navbar: React.FC<NavbarProps> = ({
  title = 'Oráculo IA',
  items = [],
  rightContent,
}) => {
  return (
    <HeroNavbar
      isBordered
      className="bg-[var(--color-surface)] border-b border-[var(--color-border)]"
    >
      <NavbarBrand>
        <div className="flex items-center gap-2">
          <div className="mystical-glow w-8 h-8 flex items-center justify-center rounded">
            <span className="text-lg font-bold text-[var(--color-accent)]">✨</span>
          </div>
          <p className="font-bold text-lg text-[var(--color-text)]">{title}</p>
        </div>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {items.map((item) => (
          <NavbarItem
            key={item.href}
            isActive={item.isActive}
          >
            <Link
              color={item.isActive ? 'primary' : 'foreground'}
              href={item.href}
              className="text-[var(--color-text)] hover:text-[var(--color-accent)]"
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        {rightContent}
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>
  )
}

export default Navbar
