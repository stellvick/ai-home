import { create } from 'zustand'
import type { Resource } from '@/types'

interface ResourceStore {
  resources: Resource[]
  selectedResource: Resource | null
  setResources: (resources: Resource[]) => void
  setSelectedResource: (resource: Resource | null) => void
  addResource: (resource: Resource) => void
  removeResource: (id: string) => void
  updateResource: (id: string, resource: Partial<Resource>) => void
}

export const useResourceStore = create<ResourceStore>((set) => ({
  resources: [],
  selectedResource: null,
  setResources: (resources) => set({ resources }),
  setSelectedResource: (resource) => set({ selectedResource: resource }),
  addResource: (resource) =>
    set((state) => ({ resources: [...state.resources, resource] })),
  removeResource: (id) =>
    set((state) => ({
      resources: state.resources.filter((r) => r.id !== id),
      selectedResource:
        state.selectedResource?.id === id ? null : state.selectedResource,
    })),
  updateResource: (id, updates) =>
    set((state) => ({
      resources: state.resources.map((r) =>
        r.id === id ? { ...r, ...updates } : r
      ),
      selectedResource:
        state.selectedResource?.id === id
          ? { ...state.selectedResource, ...updates }
          : state.selectedResource,
    })),
}))
