import { EvaluationStats as EvaluationStatsType } from '../../types/evaluation'
import { Progress } from '@heroui/react'

interface EvaluationStatsProps {
  stats: EvaluationStatsType
}

const RUNE_LABELS = {
  legendary: '⭐✨',
  masterful: '⭐⭐',
  skilled: '⭐',
  apprentice: '◆',
  novice: '◇',
}

const RUNE_COLORS = {
  legendary: 'from-yellow-500 to-orange-500',
  masterful: 'from-green-500 to-emerald-500',
  skilled: 'from-blue-500 to-cyan-500',
  apprentice: 'from-orange-500 to-red-500',
  novice: 'from-gray-500 to-slate-500',
}

const EvaluationStats = ({ stats }: EvaluationStatsProps) => {
  const maxRatings = Math.max(...Object.values(stats.ratingDistribution))

  return (
    <div className="space-y-4">
      {/* Rune Rating Distribution */}
      <div className="space-y-3">
        <h4 className="oracle-title text-sm text-mystical-gold">Rune Distribution</h4>
        {(
          Object.entries(stats.ratingDistribution) as [
            keyof typeof stats.ratingDistribution,
            number,
          ][]
        ).map(([rune, count]) => (
          <div key={rune} className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">
                {RUNE_LABELS[rune as keyof typeof RUNE_LABELS]} {rune}
              </span>
              <span className="text-mystical-gold font-semibold">{count}</span>
            </div>
            <Progress
              value={maxRatings > 0 ? (count / maxRatings) * 100 : 0}
              className="h-2"
              classNames={{
                indicator: `bg-gradient-to-r ${RUNE_COLORS[rune as keyof typeof RUNE_COLORS]}`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Top Tags */}
      {stats.topTags.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-mystical-gold/20">
          <h4 className="oracle-title text-sm text-mystical-gold">Top Tags</h4>
          <div className="flex flex-wrap gap-2">
            {stats.topTags.map((tag) => (
              <span key={tag} className="inline-block px-2 py-1 text-xs rounded bg-mystical-gold/10 text-mystical-gold">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default EvaluationStats
