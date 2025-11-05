import React from 'react'
import { Card, CardBody, CardHeader, CardProps } from '@heroui/react'

export interface MysticalCardProps extends Omit<CardProps, 'children'> {
  children: React.ReactNode
  header?: React.ReactNode
  title?: string
  description?: string
}

export const MysticalCard: React.FC<MysticalCardProps> = ({
  children,
  header,
  title,
  description,
  className = '',
  ...props
}) => {
  return (
    <Card
      {...props}
      className={`mystical-card bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-lg)] rounded-lg ${className}`}
    >
      {(header || title || description) && (
        <CardHeader className="flex flex-col items-start px-4 py-4 gap-2 border-b border-[var(--color-border-light)]">
          {header}
          {title && <h3 className="text-lg font-semibold text-[var(--color-text)]">{title}</h3>}
          {description && <p className="text-sm text-[var(--color-text-secondary)]">{description}</p>}
        </CardHeader>
      )}
      <CardBody className="px-4 py-4">{children}</CardBody>
    </Card>
  )
}

export default MysticalCard
