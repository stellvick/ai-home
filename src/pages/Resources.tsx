import { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Divider, Spinner, Chip } from '@heroui/react'
import { AlertCircle } from 'lucide-react'
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
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">AI Resources</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and monitor your AI resource integrations
          </p>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Spinner label="Loading resources..." />
          </div>
        )}

        {error && (
          <Card className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 mb-6">
            <CardBody className="flex flex-row gap-4">
              <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0" />
              <div>
                <p className="text-red-700 dark:text-red-300 font-semibold">Error</p>
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            </CardBody>
          </Card>
        )}

        {!isLoading && resources.length === 0 && (
          <Card>
            <CardBody className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No resources found</p>
            </CardBody>
          </Card>
        )}

        {!isLoading && resources.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-col items-start px-6 py-4">
                  <h2 className="text-xl font-semibold">{resource.name}</h2>
                  <Chip variant="flat" className="mt-2" size="sm">
                    Active
                  </Chip>
                </CardHeader>
                <Divider />
                <CardBody className="gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      API Endpoint
                    </p>
                    <p className="text-sm font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded break-all">
                      {resource.api_url}
                    </p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors">
                      Test
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium transition-colors">
                      Edit
                    </button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}

export default Resources
