import React from 'react'
import { Breadcrumbs as HeroBreadcrumbs, BreadcrumbItem } from '@heroui/react'
import { ChevronRight } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  href?: string
  isActive?: boolean
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <HeroBreadcrumbs
      separator={<ChevronRight className="w-3 h-3" />}
      className={`text-[var(--color-text)] ${className}`}
    >
      {items.map((item, index) => (
        <BreadcrumbItem
          key={index}
          href={item.href}
          isCurrent={item.isActive || index === items.length - 1}
          className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]"
        >
          {item.label}
        </BreadcrumbItem>
      ))}
    </HeroBreadcrumbs>
  )
}

export default Breadcrumbs
