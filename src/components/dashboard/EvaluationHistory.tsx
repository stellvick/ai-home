import { Card, CardBody, Pagination } from '@heroui/react'
import { EvaluationResource } from '../../types/evaluation'
import RuneRatingComponent from '../common/RuneRating'
import { useState } from 'react'

interface EvaluationHistoryProps {
  evaluations: EvaluationResource[]
  onSelectEvaluation: (evaluation: EvaluationResource) => void
  isLoading?: boolean
  itemsPerPage?: number
}

const EvaluationHistory = ({
  evaluations,
  onSelectEvaluation,
  isLoading = false,
  itemsPerPage = 10,
}: EvaluationHistoryProps) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(evaluations.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const endIdx = startIdx + itemsPerPage
  const currentEvaluations = evaluations.slice(startIdx, endIdx)

  if (isLoading) {
    return <div className="text-center text-gray-400">Loading evaluations...</div>
  }

  if (evaluations.length === 0) {
    return (
      <Card className="mystical-card">
        <CardBody className="py-16">
          <div className="text-center space-y-3">
            <div className="text-4xl">📋</div>
            <p className="text-gray-400">No evaluations yet. Submit your first content to get started!</p>
          </div>
        </CardBody>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Evaluations List */}
      <div className="space-y-3">
        {currentEvaluations.map((evaluation) => (
          <Card
            key={evaluation.id}
            className="mystical-card hover:shadow-lg hover:shadow-mystical-gold/20 transition-all cursor-pointer"
            isPressable
            onPress={() => onSelectEvaluation(evaluation)}
          >
            <CardBody className="p-4">
              <div className="flex items-start justify-between gap-4">
                {/* Content */}
                <div className="flex-1 min-w-0 space-y-2">
                  {/* Title */}
                  <div className="flex items-start gap-2">
                    <div className="text-lg min-w-fit">
                      {evaluation.type === 'prompt' && '❓'}
                      {evaluation.type === 'response' && '💬'}
                      {evaluation.type === 'image' && '🖼️'}
                      {evaluation.type === 'document' && '📄'}
                      {evaluation.type === 'conversation' && '💭'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white truncate">{evaluation.title}</h4>
                      <p className="text-xs text-gray-400 line-clamp-1">{evaluation.description}</p>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-xs bg-mystical-gold/10 text-mystical-gold px-2 py-1 rounded capitalize">
                      {evaluation.type}
                    </span>

                    <span
                      className={`text-xs px-2 py-1 rounded capitalize ${
                        evaluation.status === 'completed'
                          ? 'bg-green-500/10 text-green-400'
                          : evaluation.status === 'pending'
                          ? 'bg-yellow-500/10 text-yellow-400'
                          : 'bg-blue-500/10 text-blue-400'
                      }`}
                    >
                      {evaluation.status}
                    </span>

                    <span className="text-xs text-gray-500">
                      {new Date(evaluation.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Tags */}
                  {evaluation.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {evaluation.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs bg-gray-700/50 text-gray-300 px-1.5 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                      {evaluation.tags.length > 3 && (
                        <span className="text-xs text-gray-500">+{evaluation.tags.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Score and Rating */}
                {evaluation.status === 'completed' && (
                  <div className="flex flex-col items-end gap-2 min-w-fit">
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Score</p>
                      <p className="oracle-title text-2xl text-mystical-gold">
                        {evaluation.evaluation.overallScore}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <RuneRatingComponent
                        rating={evaluation.evaluation.runeRating}
                        size="sm"
                        showScore={false}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Human Review Badge */}
              {evaluation.evaluation.humanReview && (
                <div className="mt-2 flex items-center gap-2 text-xs text-mystical-gold border-t border-mystical-gold/20 pt-2">
                  <span>✨</span>
                  <span>Expert review available</span>
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            total={totalPages}
            page={currentPage}
            onChange={setCurrentPage}
            color="primary"
            className="mystical-pagination"
          />
        </div>
      )}
    </div>
  )
}

export default EvaluationHistory
