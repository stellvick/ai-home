import {
  EvaluationResource,
  EvaluationSubmitRequest,
  EvaluationFilters,
  EvaluationStats,
} from '../../types/evaluation'
import { getFilteredMockEvaluations, getMockEvaluationStats } from '../mock/evaluationMock'

interface EvaluationListResponse {
  data: EvaluationResource[]
  total: number
  page: number
  limit: number
}

export class EvaluationService {
  /**
   * Submit a new evaluation resource
   */
  async submitEvaluation(data: EvaluationSubmitRequest): Promise<EvaluationResource> {
    // Mock implementation - replace with real API when backend is ready
    return new Promise((resolve) => {
      setTimeout(() => {
        const newEvaluation: EvaluationResource = {
          id: Date.now().toString(),
          userId: '1', // Would come from auth context
          title: data.title,
          description: data.description,
          type: data.type,
          content: data.content,
          evaluation: {
            overallScore: 0,
            aiAnalysis: {
              score: 0,
              confidence: 0,
              criteria: {
                clarity: 0,
                effectiveness: 0,
                creativity: 0,
                technicalQuality: 0,
              },
              processingTime: 0,
            },
            runeRating: 'novice',
            recommendations: [],
          },
          metadata: {},
          status: 'pending',
          createdAt: new Date(),
          tags: data.tags || [],
        }
        resolve(newEvaluation)
      }, 500)
    })
  }

  /**
   * Get all evaluations for current user with pagination
   */
  async getEvaluations(
    page: number = 1,
    limit: number = 20,
    filters?: EvaluationFilters
  ): Promise<EvaluationListResponse> {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = getFilteredMockEvaluations(
          filters?.search,
          filters?.type,
          filters?.status
        )

        const total = filtered.length
        const start = (page - 1) * limit
        const end = start + limit
        const paginated = filtered.slice(start, end)

        resolve({
          data: paginated,
          total,
          page,
          limit,
        })
      }, 300)
    })
  }

  /**
   * Get a specific evaluation by ID
   */
  async getEvaluation(id: string): Promise<EvaluationResource> {
    // Mock implementation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const evaluation = getFilteredMockEvaluations().find((e) => e.id === id)
        if (evaluation) {
          resolve(evaluation)
        } else {
          reject(new Error(`Evaluation ${id} not found`))
        }
      }, 200)
    })
  }

  /**
   * Update an existing evaluation
   */
  async updateEvaluation(
    id: string,
    data: Partial<EvaluationResource>
  ): Promise<EvaluationResource> {
    // Mock implementation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const evaluation = getFilteredMockEvaluations().find((e) => e.id === id)
        if (evaluation) {
          const updated = { ...evaluation, ...data }
          resolve(updated)
        } else {
          reject(new Error(`Evaluation ${id} not found`))
        }
      }, 300)
    })
  }

  /**
   * Delete an evaluation
   */
  async deleteEvaluation(_id: string): Promise<{ success: boolean }> {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true })
      }, 200)
    })
  }

  /**
   * Get evaluation statistics
   */
  async getEvaluationStats(): Promise<EvaluationStats> {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const stats = getMockEvaluationStats()
        resolve({
          totalEvaluations: stats.totalEvaluations,
          averageScore: stats.averageScore,
          ratingDistribution: stats.ratingDistribution,
          topTags: stats.topTags,
        })
      }, 200)
    })
  }

  /**
   * Search evaluations
   */
  async searchEvaluations(query: string): Promise<EvaluationResource[]> {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = getFilteredMockEvaluations(query)
        resolve(results)
      }, 300)
    })
  }

  /**
   * Export evaluation as PDF
   */
  async exportEvaluationAsPDF(_id: string): Promise<Blob> {
    // Mock implementation - returns empty blob
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(new Blob(['PDF content would go here'], { type: 'application/pdf' }))
      }, 500)
    })
  }

  /**
   * Batch delete evaluations
   */
  async deleteEvaluations(ids: string[]): Promise<{ deleted: number }> {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ deleted: ids.length })
      }, 300)
    })
  }
}

export default new EvaluationService()
