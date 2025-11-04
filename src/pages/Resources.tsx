import { useEffect, useState } from 'react'
import { ProtectedRoute } from '@/lib/auth-middleware'
import { useResourceStore } from '@/stores/resource'
import { resourceService } from '@/services/resource'

const Resources = () => {
  const resources = useResourceStore((state) => state.resources)
  const setResources = useResourceStore((state) => state.setResources)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadResources()
  }, [])

  const loadResources = async () => {
    try {
      setIsLoading(true)
      const data = await resourceService.getResources()
      setResources(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">AI Resources</h1>
        {isLoading && <p>Loading resources...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="border rounded-lg p-4 bg-white dark:bg-gray-800"
            >
              <h2 className="text-lg font-semibold">{resource.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {resource.api_url}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Resources
