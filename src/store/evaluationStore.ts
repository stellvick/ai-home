import { create } from 'zustand'
import { EvaluationResource, EvaluationFilters } from '../types/evaluation'

interface EvaluationState {
  evaluations: EvaluationResource[]
  currentEvaluation: EvaluationResource | null
  isLoading: boolean
  error: string | null
  filters: EvaluationFilters

  // Actions
  setEvaluations: (evaluations: EvaluationResource[]) => void
  addEvaluation: (evaluation: EvaluationResource) => void
  setCurrentEvaluation: (evaluation: EvaluationResource | null) => void
  setIsLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  setFilters: (filters: EvaluationFilters) => void
  clearFilters: () => void
}

export const useEvaluationStore = create<EvaluationState>((set) => ({
  evaluations: [],
  currentEvaluation: null,
  isLoading: false,
  error: null,
  filters: {},

  setEvaluations: (evaluations: EvaluationResource[]) =>
    set({
      evaluations,
    }),

  addEvaluation: (evaluation: EvaluationResource) =>
    set((state) => ({
      evaluations: [evaluation, ...state.evaluations],
    })),

  setCurrentEvaluation: (evaluation: EvaluationResource | null) =>
    set({
      currentEvaluation: evaluation,
    }),

  setIsLoading: (isLoading: boolean) =>
    set({
      isLoading,
    }),

  setError: (error: string | null) =>
    set({
      error,
    }),

  setFilters: (filters: EvaluationFilters) =>
    set({
      filters,
    }),

  clearFilters: () =>
    set({
      filters: {},
    }),
}))
