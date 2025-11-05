import React from 'react'
import { Chip } from '@heroui/react'

export type RuneType = 'legendary' | 'masterful' | 'skilled' | 'apprentice' | 'novice'

export interface RuneRatingProps {
  rating: RuneType
  score?: number
  showScore?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const runeConfig: Record<RuneType, { label: string; color: string; symbol: string; description: string }> = {
  legendary: {
    label: 'Legendary',
    color: 'gold',
    symbol: '⭐✨',
    description: 'Transcendent mastery',
  },
  masterful: {
    label: 'Masterful',
    color: 'success',
    symbol: '⭐⭐',
    description: 'Expert level excellence',
  },
  skilled: {
    label: 'Skilled',
    color: 'primary',
    symbol: '⭐',
    description: 'Competent proficiency',
  },
  apprentice: {
    label: 'Apprentice',
    color: 'warning',
    symbol: '◆',
    description: 'Learning progress',
  },
  novice: {
    label: 'Novice',
    color: 'secondary',
    symbol: '◇',
    description: 'Beginning journey',
  },
}

export const RuneRating: React.FC<RuneRatingProps> = ({
  rating,
  score,
  showScore = true,
  size = 'md',
}) => {
  const config = runeConfig[rating]

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  const colorClasses: Record<string, string> = {
    gold: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400',
    success: 'bg-green-500/20 text-green-600 dark:text-green-400',
    primary: 'bg-blue-500/20 text-blue-600 dark:text-blue-400',
    warning: 'bg-orange-500/20 text-orange-600 dark:text-orange-400',
    secondary: 'bg-gray-500/20 text-gray-600 dark:text-gray-400',
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Chip
        variant="flat"
        className={`${colorClasses[config.color]} ${sizeClasses[size]} font-semibold`}
        startContent={config.symbol}
      >
        {config.label}
      </Chip>
      <p className="text-xs text-[var(--color-text-secondary)] italic">{config.description}</p>
      {showScore && score !== undefined && (
        <p className="text-sm font-semibold text-[var(--color-text)]">Score: {score}%</p>
      )}
    </div>
  )
}

export default RuneRating
