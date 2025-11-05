import { Select, SelectItem, Button } from '@heroui/react'
import { RotateCcw } from 'lucide-react'
import { EvaluationFilters as EvaluationFiltersType } from '../../types/evaluation'
import { useState } from 'react'

interface EvaluationFiltersProps {
  onApplyFilters: (filters: EvaluationFiltersType) => void
  onClearFilters: () => void
}

const typeOptions = [
  { value: 'prompt', label: 'Prompt' },
  { value: 'response', label: 'Response' },
  { value: 'image', label: 'Image' },
  { value: 'document', label: 'Document' },
  { value: 'conversation', label: 'Conversation' },
]

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'analyzing', label: 'Analyzing' },
  { value: 'reviewing', label: 'Reviewing' },
  { value: 'completed', label: 'Completed' },
  { value: 'failed', label: 'Failed' },
]

const EvaluationFilters = ({ onApplyFilters, onClearFilters }: EvaluationFiltersProps) => {
  const [search, setSearch] = useState('')
  const [type, setType] = useState<string>('')
  const [status, setStatus] = useState<string>('')

  const handleApply = () => {
    const filters: EvaluationFiltersType = {}
    if (search.trim()) filters.search = search
    if (type) filters.type = type as any
    if (status) filters.status = status as any
    onApplyFilters(filters)
  }

  const handleClear = () => {
    setSearch('')
    setType('')
    setStatus('')
    onClearFilters()
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div>
          <label className="text-sm text-gray-400 block mb-2">Search Title/Description</label>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-mystical-gold"
          />
        </div>

        {/* Type Filter */}
        <div>
          <label className="text-sm text-gray-400 block mb-2">Content Type</label>
          <Select
            selectedKeys={type ? [type] : []}
            onChange={(e) => setType(e.target.value)}
            placeholder="All types"
            className="mystical-select text-sm"
          >
            {typeOptions.map((opt) => (
              <SelectItem key={opt.value}>{opt.label}</SelectItem>
            ))}
          </Select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="text-sm text-gray-400 block mb-2">Status</label>
          <Select
            selectedKeys={status ? [status] : []}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="All statuses"
            className="mystical-select text-sm"
          >
            {statusOptions.map((opt) => (
              <SelectItem key={opt.value}>{opt.label}</SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <Button
          isIconOnly
          variant="flat"
          startContent={<RotateCcw size={18} />}
          onPress={handleClear}
          className="mystical-btn"
        >
          Reset
        </Button>
        <Button
          color="primary"
          variant="shadow"
          onPress={handleApply}
          className="mystical-btn"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  )
}

export default EvaluationFilters
