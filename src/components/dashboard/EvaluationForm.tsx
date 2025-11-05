import { useState } from 'react'
import { Button, Input, Textarea, Card, CardBody, Select, SelectItem, Chip } from '@heroui/react'
import { Upload } from 'lucide-react'
import { useEvaluation } from '../../hooks/useEvaluation'
import { ResourceType, ResourceContent } from '../../types/evaluation'

interface EvaluationFormProps {
  onSuccess?: () => void
}

const resourceTypes: { value: ResourceType; label: string }[] = [
  { value: 'prompt', label: 'Prompt' },
  { value: 'response', label: 'Response' },
  { value: 'image', label: 'Image' },
  { value: 'document', label: 'Document' },
  { value: 'conversation', label: 'Conversation' },
]

const EvaluationForm = ({ onSuccess }: EvaluationFormProps) => {
  const { submitEvaluation, isSubmitting } = useEvaluation()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'prompt' as ResourceType,
    content: '',
    tags: [] as string[],
  })

  const [tagInput, setTagInput] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.toLowerCase())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.toLowerCase()],
      }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.title.trim()) {
      setError('Please enter a title')
      return
    }

    if (!formData.content.trim()) {
      setError('Please enter content to evaluate')
      return
    }

    try {
      const resourceContent: ResourceContent = {
        text: formData.content,
      }

      await submitEvaluation({
        title: formData.title,
        description: formData.description || undefined,
        type: formData.type,
        content: resourceContent,
        tags: formData.tags,
      })

      // Reset form
      setFormData({
        title: '',
        description: '',
        type: 'prompt',
        content: '',
        tags: [],
      })

      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit evaluation')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Card className="bg-red-900/20 border border-red-500/50">
          <CardBody>
            <p className="text-red-400">{error}</p>
          </CardBody>
        </Card>
      )}

      {/* Title */}
      <Input
        label="Title"
        placeholder="Enter evaluation title"
        value={formData.title}
        onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
        className="mystical-input"
        required
        maxLength={200}
      />

      {/* Description */}
      <Textarea
        label="Description (optional)"
        placeholder="Provide additional context about this content"
        value={formData.description}
        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
        className="mystical-textarea"
        maxLength={500}
        rows={2}
      />

      {/* Resource Type */}
      <Select
        label="Content Type"
        selectedKeys={[formData.type]}
        onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value as ResourceType }))}
        className="mystical-select"
      >
        {resourceTypes.map((type) => (
          <SelectItem key={type.value}>
            {type.label}
          </SelectItem>
        ))}
      </Select>

      {/* Content */}
      <Textarea
        label="Content to Evaluate"
        placeholder="Paste your AI-generated content here (up to 100MB for files)"
        value={formData.content}
        onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
        className="mystical-textarea"
        required
        minRows={6}
      />

      {/* Tags */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">Tags (optional)</label>
        <div className="flex gap-2">
          <Input
            placeholder="Add tag and press Enter or click Add"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleAddTag()
              }
            }}
            className="mystical-input flex-1"
          />
          <Button
            isIconOnly
            onClick={handleAddTag}
            className="mystical-btn"
            isDisabled={!tagInput.trim() || isSubmitting}
          >
            +
          </Button>
        </div>

        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag) => (
              <Chip
                key={tag}
                variant="flat"
                className="bg-mystical-gold/20 text-mystical-gold"
                onClose={() => handleRemoveTag(tag)}
              >
                {tag}
              </Chip>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-2 pt-4">
        <Button
          color="default"
          variant="flat"
          onClick={() => {
            setFormData({
              title: '',
              description: '',
              type: 'prompt',
              content: '',
              tags: [],
            })
            setError(null)
          }}
          disabled={isSubmitting}
        >
          Clear
        </Button>
        <Button
          color="primary"
          variant="shadow"
          type="submit"
          startContent={<Upload size={18} />}
          isLoading={isSubmitting}
          className="mystical-btn"
        >
          Submit for Evaluation
        </Button>
      </div>
    </form>
  )
}

export default EvaluationForm
