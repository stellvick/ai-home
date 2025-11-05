import { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Button, Divider, Spinner } from '@heroui/react'
import { Plus } from 'lucide-react'
import { useEvaluation } from '../hooks/useEvaluation'
import { useAuth } from '../hooks/useAuth'
import { EvaluationResource } from '../types/evaluation'
import EvaluationForm from '../components/dashboard/EvaluationForm'
import EvaluationResults from '../components/dashboard/EvaluationResults'
import EvaluationHistory from '../components/dashboard/EvaluationHistory'
import EvaluationStats from '../components/dashboard/EvaluationStats'
import EvaluationFilters from '../components/dashboard/EvaluationFilters'

type ViewMode = 'overview' | 'submit' | 'results'

const DashboardPage = () => {
  const { isAuthenticated } = useAuth()
  const {
    evaluations,
    currentEvaluation,
    isLoading,
    error,
    stats,
    loadEvaluations,
    loadStats,
    selectEvaluation,
    applyFilters,
    clearFilters,
  } = useEvaluation()

  const [viewMode, setViewMode] = useState<ViewMode>('overview')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      loadEvaluations()
      loadStats()
    }
  }, [isAuthenticated, loadEvaluations, loadStats])

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-lunar-900 via-purple-900 to-shadow-900">
        <Card className="mystical-card max-w-md">
          <CardBody className="gap-4">
            <h2 className="oracle-title text-2xl">Access Required</h2>
            <p className="text-gray-400">Please log in to access the evaluation dashboard.</p>
          </CardBody>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lunar-900 via-purple-900 to-shadow-900 py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="oracle-title text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-mystical-gold to-mystical-cyan">
            Evaluation Dashboard
          </h1>
          <p className="text-gray-400">Submit and evaluate your AI-generated content</p>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="mystical-card bg-red-900/20 border border-red-500/50">
            <CardBody>
              <p className="text-red-400">{error}</p>
            </CardBody>
          </Card>
        )}

        {/* Main Navigation */}
        <div className="flex gap-2 flex-wrap">
          <Button
            isIconOnly
            color={viewMode === 'overview' ? 'primary' : 'default'}
            variant={viewMode === 'overview' ? 'shadow' : 'flat'}
            onPress={() => setViewMode('overview')}
            className="mystical-btn"
          >
            📊
          </Button>
          <Button
            startContent={<Plus size={20} />}
            color={viewMode === 'submit' ? 'primary' : 'default'}
            variant={viewMode === 'submit' ? 'shadow' : 'flat'}
            onPress={() => setViewMode('submit')}
            className="mystical-btn"
          >
            Submit
          </Button>
          {currentEvaluation && (
            <Button
              color={viewMode === 'results' ? 'primary' : 'default'}
              variant={viewMode === 'results' ? 'shadow' : 'flat'}
              onPress={() => setViewMode('results')}
              className="mystical-btn"
            >
              View Results
            </Button>
          )}
        </div>

        {/* Content Areas */}
        {viewMode === 'overview' && (
          <div className="space-y-6">
            {/* Statistics */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="mystical-card">
                  <CardBody className="gap-2">
                    <p className="text-sm text-gray-400">Total Evaluations</p>
                    <p className="oracle-title text-3xl">{stats.totalEvaluations}</p>
                  </CardBody>
                </Card>
                <Card className="mystical-card">
                  <CardBody className="gap-2">
                    <p className="text-sm text-gray-400">Average Score</p>
                    <p className="oracle-title text-3xl text-mystical-gold">{stats.averageScore}</p>
                  </CardBody>
                </Card>
                <Card className="mystical-card lg:col-span-2">
                  <CardBody>
                    <EvaluationStats stats={stats} />
                  </CardBody>
                </Card>
              </div>
            )}

            <Divider className="bg-mystical-gold/20" />

            {/* Filters and History */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="oracle-title text-2xl">Recent Evaluations</h2>
                <Button
                  isIconOnly
                  variant="flat"
                  onPress={() => setShowFilters(!showFilters)}
                  className="mystical-btn"
                >
                  🔍
                </Button>
              </div>

              {showFilters && (
                <Card className="mystical-card">
                  <CardBody>
                    <EvaluationFilters onApplyFilters={applyFilters} onClearFilters={clearFilters} />
                  </CardBody>
                </Card>
              )}

              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Spinner label="Loading evaluations..." color="warning" />
                </div>
              ) : (
                <EvaluationHistory
                  evaluations={evaluations}
                  onSelectEvaluation={(evaluation: EvaluationResource) => {
                    selectEvaluation(evaluation)
                    setViewMode('results')
                  }}
                  isLoading={isLoading}
                />
              )}
            </div>
          </div>
        )}

        {viewMode === 'submit' && (
          <Card className="mystical-card">
            <CardHeader className="flex flex-col items-start px-4 py-4 gap-2 border-b border-mystical-gold/20">
              <h2 className="oracle-title text-2xl">Submit Content for Evaluation</h2>
              <p className="text-sm text-gray-400">Upload your AI-generated content for analysis</p>
            </CardHeader>
            <CardBody>
              <EvaluationForm
                onSuccess={() => {
                  loadEvaluations()
                  loadStats()
                  setViewMode('overview')
                }}
              />
            </CardBody>
          </Card>
        )}

        {viewMode === 'results' && currentEvaluation && (
          <Card className="mystical-card">
            <CardHeader className="flex flex-col items-start px-4 py-4 gap-2 border-b border-mystical-gold/20">
              <h2 className="oracle-title text-2xl">Evaluation Results</h2>
              <p className="text-sm text-gray-400">{currentEvaluation.title}</p>
            </CardHeader>
            <CardBody>
              <EvaluationResults evaluation={currentEvaluation} />
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
