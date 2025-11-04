import axios from 'axios'
import type { Evaluation, Response } from '@/types'
import { storage } from '@/utils/storage'

const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'https://n8n.stellvick.fun/webhook'

// Use mock data for now
const USE_MOCK = true
const mockEvaluations: Evaluation[] = []

const getHeaders = () => ({
  Authorization: `Bearer ${storage.getJWT() || ''}`,
})

export const evaluationService = {
  async getResponses(resourceId: string): Promise<Response[]> {
    try {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return []
      }

      const response = await axios.get<Response[]>(
        `${API_BASE_URL}/resources/${resourceId}/responses`,
        {
          headers: getHeaders(),
        }
      )
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to fetch responses')
      }
      throw error
    }
  },

  async getEvaluations(filters?: { resource_id?: string; conversation_id?: string }): Promise<Evaluation[]> {
    try {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return mockEvaluations.filter((e) => {
          if (filters?.resource_id && e.resource_id !== filters.resource_id) return false
          if (filters?.conversation_id && e.conversation_id !== filters.conversation_id) return false
          return true
        })
      }

      const params = new URLSearchParams()
      if (filters?.resource_id) params.append('resource_id', filters.resource_id)
      if (filters?.conversation_id) params.append('conversation_id', filters.conversation_id)

      const response = await axios.get<Evaluation[]>(
        `${API_BASE_URL}/evaluations?${params}`,
        {
          headers: getHeaders(),
        }
      )
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to fetch evaluations')
      }
      throw error
    }
  },

  async createEvaluation(evaluation: Omit<Evaluation, 'id' | 'created_at' | 'updated_at'>): Promise<Evaluation> {
    try {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        const newEvaluation: Evaluation = {
          ...evaluation,
          id: `eval-${Date.now()}`,
          created_at: new Date(),
          updated_at: new Date(),
        }
        mockEvaluations.push(newEvaluation)
        return newEvaluation
      }

      const response = await axios.post<Evaluation>(`${API_BASE_URL}/evaluations`, evaluation, {
        headers: getHeaders(),
      })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to create evaluation')
      }
      throw error
    }
  },

  async deleteEvaluation(id: string): Promise<void> {
    try {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        const index = mockEvaluations.findIndex((e) => e.id === id)
        if (index !== -1) mockEvaluations.splice(index, 1)
        return
      }

      await axios.delete(`${API_BASE_URL}/evaluations/${id}`, {
        headers: getHeaders(),
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to delete evaluation')
      }
      throw error
    }
  },
}
