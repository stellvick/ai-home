import { useState } from 'react'
import { Button } from '@heroui/react'
import { Input } from '@/components/base/Input'
import { resourceSchema, type ResourceFormData } from '@/utils/validation'
import { resourceService } from '@/services/resource'
import { useResourceStore } from '@/stores/resource'
import type { Resource } from '@/types'

interface ResourceFormProps {
  initialData?: Resource
  onSuccess?: () => void
  isLoading?: boolean
}

export const ResourceForm = ({
  initialData,
  onSuccess,
  isLoading: externalLoading = false,
}: ResourceFormProps) => {
  const [name, setName] = useState(initialData?.name || '')
  const [api_url, setApiUrl] = useState(initialData?.api_url || '')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(externalLoading)

  const addResource = useResourceStore((state) => state.addResource)
  const updateResource = useResourceStore((state) => state.updateResource)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const formData: ResourceFormData = { name, api_url }
      await resourceSchema.validate(formData)

      if (initialData) {
        const updated = await resourceService.updateResource(initialData.id, {
          name,
          api_url,
        })
        updateResource(initialData.id, updated)
      } else {
        const created = await resourceService.createResource({
          name,
          api_url,
        })
        addResource(created)
      }

      setName('')
      setApiUrl('')
      onSuccess?.()
    } catch (err: any) {
      setError(err.message || 'Failed to save resource')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Resource Name"
        placeholder="e.g., OpenAI GPT"
        value={name}
        onChange={(e) => setName(e.target.value)}
        isDisabled={isLoading}
        required
      />
      <Input
        label="API URL"
        placeholder="https://api.example.com/v1"
        value={api_url}
        onChange={(e) => setApiUrl(e.target.value)}
        isDisabled={isLoading}
        required
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button
        type="submit"
        className="w-full"
        isLoading={isLoading}
        isDisabled={isLoading}
      >
        {isLoading
          ? 'Saving...'
          : initialData
            ? 'Update Resource'
            : 'Create Resource'}
      </Button>
    </form>
  )
}
