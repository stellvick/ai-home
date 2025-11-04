import type { Resource, Evaluation } from '@/types'

export interface ResourceWithEvaluations extends Resource {
  evaluations?: Evaluation[]
}

export interface ResourceFilter {
  search?: string
  limit?: number
  offset?: number
}
