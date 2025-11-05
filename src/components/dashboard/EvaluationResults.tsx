import { Card, CardBody, CardHeader, Progress, Button, Divider } from '@heroui/react'
import { Download, Share2, Trash2 } from 'lucide-react'
import { EvaluationResource, RuneRating as RuneRatingType } from '../../types/evaluation'
import RuneRatingComponent from '../common/RuneRating'

interface EvaluationResultsProps {
  evaluation: EvaluationResource
  onExport?: () => void
  onShare?: () => void
  onDelete?: () => void
}

const RUNE_DESCRIPTIONS: Record<RuneRatingType, string> = {
  legendary: 'Exceptional quality - ready for immediate use',
  masterful: 'Excellent quality with minor refinements possible',
  skilled: 'Good quality with some improvements recommended',
  apprentice: 'Acceptable quality but needs substantial work',
  novice: 'Early stage - significant improvements needed',
}

const EvaluationResults = ({
  evaluation,
  onExport,
  onShare,
  onDelete,
}: EvaluationResultsProps) => {
  const { evaluation: result } = evaluation
  const statusColor = {
    pending: 'warning',
    analyzing: 'primary',
    reviewing: 'info',
    completed: 'success',
    failed: 'danger',
  }[evaluation.status]

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'bg-gradient-to-r from-green-500 to-emerald-500'
    if (score >= 70) return 'bg-gradient-to-r from-blue-500 to-cyan-500'
    if (score >= 55) return 'bg-gradient-to-r from-yellow-500 to-orange-500'
    return 'bg-gradient-to-r from-red-500 to-pink-500'
  }

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Overall Score</span>
          <span className={`oracle-title text-3xl ${getScoreColor(result.overallScore)} bg-clip-text text-transparent`}>
            {result.overallScore}%
          </span>
        </div>
        <Progress
          value={result.overallScore}
          className="h-3"
          classNames={{
            indicator: getScoreColor(result.overallScore),
          }}
        />
      </div>

      {/* Rune Rating */}
      <Card className="mystical-card bg-mystical-gold/5 border border-mystical-gold/20">
        <CardBody className="gap-3">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🔮</div>
            <div className="flex-1">
              <p className="text-xs text-gray-400">Mystical Assessment</p>
              <RuneRatingComponent rating={result.runeRating} size="md" score={result.overallScore} />
              <p className="text-sm text-gray-300 mt-1">{RUNE_DESCRIPTIONS[result.runeRating]}</p>
            </div>
          </div>
        </CardBody>
      </Card>

      <Divider className="bg-mystical-gold/20" />

      {/* AI Analysis Details */}
      <div className="space-y-3">
        <h3 className="oracle-title text-lg">AI Analysis</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="mystical-card">
            <CardBody className="gap-2">
              <p className="text-xs text-gray-400">Clarity</p>
              <div className="flex items-end gap-2">
                <span className="oracle-title text-2xl">{result.aiAnalysis.criteria.clarity}</span>
                <span className="text-xs text-gray-500">/100</span>
              </div>
              <Progress
                value={result.aiAnalysis.criteria.clarity}
                size="sm"
                color="success"
              />
            </CardBody>
          </Card>

          <Card className="mystical-card">
            <CardBody className="gap-2">
              <p className="text-xs text-gray-400">Effectiveness</p>
              <div className="flex items-end gap-2">
                <span className="oracle-title text-2xl">{result.aiAnalysis.criteria.effectiveness}</span>
                <span className="text-xs text-gray-500">/100</span>
              </div>
              <Progress
                value={result.aiAnalysis.criteria.effectiveness}
                size="sm"
                color="primary"
              />
            </CardBody>
          </Card>

          <Card className="mystical-card">
            <CardBody className="gap-2">
              <p className="text-xs text-gray-400">Creativity</p>
              <div className="flex items-end gap-2">
                <span className="oracle-title text-2xl">{result.aiAnalysis.criteria.creativity}</span>
                <span className="text-xs text-gray-500">/100</span>
              </div>
              <Progress
                value={result.aiAnalysis.criteria.creativity}
                size="sm"
                color="warning"
              />
            </CardBody>
          </Card>

          <Card className="mystical-card">
            <CardBody className="gap-2">
              <p className="text-xs text-gray-400">Technical Quality</p>
              <div className="flex items-end gap-2">
                <span className="oracle-title text-2xl">{result.aiAnalysis.criteria.technicalQuality}</span>
                <span className="text-xs text-gray-500">/100</span>
              </div>
              <Progress
                value={result.aiAnalysis.criteria.technicalQuality}
                size="sm"
                color="secondary"
              />
            </CardBody>
          </Card>
        </div>
      </div>

      <Divider className="bg-mystical-gold/20" />

      {/* Human Review (if available) */}
      {result.humanReview && (
        <div className="space-y-3">
          <h3 className="oracle-title text-lg">✨ Expert Review</h3>
          <Card className="mystical-card bg-mystical-gold/5 border border-mystical-gold/30">
            <CardHeader className="flex flex-col items-start gap-2">
              <div className="flex justify-between items-start w-full">
                <div>
                  <p className="font-semibold text-mystical-gold">{result.humanReview.reviewer}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(result.humanReview.reviewedAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="oracle-title text-2xl text-mystical-gold">{result.humanReview.score}</span>
              </div>
            </CardHeader>
            <Divider className="bg-mystical-gold/20" />
            <CardBody>
              <p className="text-gray-300">{result.humanReview.comments}</p>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="space-y-3">
          <h3 className="oracle-title text-lg">Recommendations for Improvement</h3>
          <ul className="space-y-2">
            {result.recommendations.map((rec, idx) => (
              <li key={idx} className="flex gap-3 text-gray-300">
                <span className="text-mystical-gold min-w-fit">→</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Metadata */}
      <Card className="mystical-card opacity-75">
        <CardBody className="gap-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-xs text-gray-400">Type</p>
              <p className="text-gray-300 capitalize">{evaluation.type}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Status</p>
              <p className={`capitalize text-${statusColor}-400`}>{evaluation.status}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Submitted</p>
              <p className="text-gray-300">{new Date(evaluation.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Processing Time</p>
              <p className="text-gray-300">{result.aiAnalysis.processingTime}ms</p>
            </div>
          </div>

          {evaluation.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {evaluation.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-2 py-1 text-xs rounded bg-mystical-gold/10 text-mystical-gold"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-4">
        {onExport && (
          <Button
            isIconOnly
            variant="flat"
            startContent={<Download size={18} />}
            onPress={onExport}
            className="mystical-btn"
          >
            Export
          </Button>
        )}
        {onShare && (
          <Button
            isIconOnly
            variant="flat"
            startContent={<Share2 size={18} />}
            onPress={onShare}
            className="mystical-btn"
          >
            Share
          </Button>
        )}
        {onDelete && (
          <Button
            isIconOnly
            variant="flat"
            color="danger"
            startContent={<Trash2 size={18} />}
            onPress={onDelete}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  )
}

export default EvaluationResults
