import axios from 'axios'
import type { Resource } from '@/types'
import { mockResources } from '@/services/mock/data'
import { storage } from '@/utils/storage'

const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'https://n8n.stellvick.fun/webhook'

// Use mock data for now
const USE_MOCK = true

const getHeaders = () => ({
  Authorization: `Bearer ${storage.getJWT() || ''}`,
})

export const resourceService = {
  async getResources(): Promise<Resource[]> {
    try {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return mockResources
      }

      const response = await axios.get<Resource[]>(`${API_BASE_URL}/resources`, {
        headers: getHeaders(),
      })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to fetch resources')
      }
      throw error
    }
  },

  async getResource(id: string): Promise<Resource> {
    try {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 200))
        const resource = mockResources.find((r) => r.id === id)
        if (!resource) throw new Error('Resource not found')
        return resource
      }

      const response = await axios.get<Resource>(`${API_BASE_URL}/resources/${id}`, {
        headers: getHeaders(),
      })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to fetch resource')
      }
      throw error
    }
  },

  async createResource(resource: Omit<Resource, 'id' | 'created_at' | 'updated_at'>): Promise<Resource> {
    try {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        const newResource: Resource = {
          ...resource,
          id: `res-${Date.now()}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
        mockResources.push(newResource)
        return newResource
      }

      const response = await axios.post<Resource>(`${API_BASE_URL}/resources`, resource, {
        headers: getHeaders(),
      })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to create resource')
      }
      throw error
    }
  },

  async updateResource(id: string, updates: Partial<Resource>): Promise<Resource> {
    try {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        const index = mockResources.findIndex((r) => r.id === id)
        if (index === -1) throw new Error('Resource not found')
        const updated = { ...mockResources[index], ...updates, updated_at: new Date().toISOString() }
        mockResources[index] = updated
        return updated
      }

      const response = await axios.put<Resource>(
        `${API_BASE_URL}/resources/${id}`,
        updates,
        {
          headers: getHeaders(),
        }
      )
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to update resource')
      }
      throw error
    }
  },

  async deleteResource(id: string): Promise<void> {
    try {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        const index = mockResources.findIndex((r) => r.id === id)
        if (index === -1) throw new Error('Resource not found')
        mockResources.splice(index, 1)
        return
      }

      await axios.delete(`${API_BASE_URL}/resources/${id}`, {
        headers: getHeaders(),
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to delete resource')
      }
      throw error
    }
  },
}
