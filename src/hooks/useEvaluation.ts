import { useCallback, useState } from 'react'
import { useEvaluationStore } from '../store/evaluationStore'
import evaluationService from '../services/api/evaluationService'
import {
  EvaluationResource,
  EvaluationSubmitRequest,
  EvaluationFilters,
  EvaluationStats,
} from '../types/evaluation'

export const useEvaluation = () => {
  const {
    evaluations,
    currentEvaluation,
    isLoading,
    error,
    filters,
    setEvaluations,
    addEvaluation,
    setCurrentEvaluation,
    setIsLoading,
    setError,
    setFilters,
    clearFilters,
  } = useEvaluationStore()

  const [localError, setLocalError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [stats, setStats] = useState<EvaluationStats | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  // Load evaluations
  const loadEvaluations = useCallback(async () => {
    try {
      setIsLoading(true)
      setLocalError(null)
      const data = await evaluationService.getEvaluations(currentPage, 20, filters)
      setEvaluations(data.data)
      setTotalCount(data.total)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load evaluations'
      setError(message)
      setLocalError(message)
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, filters, setEvaluations, setIsLoading, setError])

  // Load statistics
  const loadStats = useCallback(async () => {
    try {
      const statsData = await evaluationService.getEvaluationStats()
      setStats(statsData)
    } catch (err) {
      console.error('Failed to load stats:', err)
    }
  }, [])

  // Submit new evaluation
  const handleSubmitEvaluation = useCallback(
    async (data: EvaluationSubmitRequest) => {
      try {
        setIsSubmitting(true)
        setLocalError(null)
        const result = await evaluationService.submitEvaluation(data)
        addEvaluation(result)
        setError(null)
        await loadStats()
        return result
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to submit evaluation'
        setError(message)
        setLocalError(message)
        throw err
      } finally {
        setIsSubmitting(false)
      }
    },
    [addEvaluation, setError, loadStats]
  )

  // Get single evaluation
  const handleGetEvaluation = useCallback(
    async (id: string) => {
      try {
        setLocalError(null)
        const result = await evaluationService.getEvaluation(id)
        setCurrentEvaluation(result)
        return result
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to get evaluation'
        setError(message)
        setLocalError(message)
        throw err
      }
    },
    [setCurrentEvaluation, setError]
  )

  // Delete evaluation
  const handleDeleteEvaluation = useCallback(
    async (id: string) => {
      try {
        setIsDeleting(true)
        setLocalError(null)
        await evaluationService.deleteEvaluation(id)
        // Remove from local list
        setEvaluations(evaluations.filter((e) => e.id !== id))
        setTotalCount(totalCount - 1)
        setError(null)
        await loadStats()
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to delete evaluation'
        setError(message)
        setLocalError(message)
        throw err
      } finally {
        setIsDeleting(false)
      }
    },
    [evaluations, totalCount, setEvaluations, setError, loadStats]
  )

  // Search evaluations
  const handleSearchEvaluations = useCallback(
    async (query: string) => {
      try {
        setIsSearching(true)
        setLocalError(null)
        if (!query.trim()) {
          await loadEvaluations()
        } else {
          const results = await evaluationService.searchEvaluations(query)
          setEvaluations(results)
          setTotalCount(results.length)
        }
        setError(null)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Search failed'
        setError(message)
        setLocalError(message)
        throw err
      } finally {
        setIsSearching(false)
      }
    },
    [loadEvaluations, setEvaluations, setError]
  )

  // Export evaluation
  const handleExportEvaluation = useCallback(
    async (id: string) => {
      try {
        setIsExporting(true)
        setLocalError(null)
        const blob = await evaluationService.exportEvaluationAsPDF(id)
        // Trigger download
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `evaluation-${id}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to export evaluation'
        setLocalError(message)
        throw err
      } finally {
        setIsExporting(false)
      }
    },
    []
  )

  // Select evaluation
  const handleSelectEvaluation = useCallback(
    (evaluation: EvaluationResource | null) => {
      setCurrentEvaluation(evaluation)
    },
    [setCurrentEvaluation]
  )

  // Apply filters
  const handleApplyFilters = useCallback(
    (newFilters: EvaluationFilters) => {
      setFilters(newFilters)
      setCurrentPage(1) // Reset to first page
    },
    [setFilters]
  )

  // Clear filters
  const handleClearFilters = useCallback(() => {
    clearFilters()
    setCurrentPage(1)
  }, [clearFilters])

  // Change page
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  return {
    // State
    evaluations,
    currentEvaluation,
    isLoading,
    error: error || localError,
    filters,
    totalCount,
    currentPage,
    stats,

    // Actions
    loadEvaluations,
    loadStats,
    submitEvaluation: handleSubmitEvaluation,
    getEvaluation: handleGetEvaluation,
    deleteEvaluation: handleDeleteEvaluation,
    searchEvaluations: handleSearchEvaluations,
    exportEvaluation: handleExportEvaluation,
    selectEvaluation: handleSelectEvaluation,
    applyFilters: handleApplyFilters,
    clearFilters: handleClearFilters,
    setPage: handlePageChange,

    // Loading states
    isSubmitting,
    isDeleting,
    isSearching,
    isExporting,
  }
}

