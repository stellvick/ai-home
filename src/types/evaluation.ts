// Evaluation types
export type ResourceType = 'prompt' | 'response' | 'image' | 'document' | 'conversation'
export type RuneRating = 'legendary' | 'masterful' | 'skilled' | 'apprentice' | 'novice'
export type EvaluationStatus = 'pending' | 'analyzing' | 'reviewing' | 'completed' | 'failed'

export interface EvaluationResource {
  id: string
  userId: string
  title: string
  description?: string
  type: ResourceType
  content: ResourceContent
  evaluation: EvaluationResult
  metadata: ResourceMetadata
  status: EvaluationStatus
  createdAt: Date
  evaluatedAt?: Date
  tags: string[]
}

export interface ResourceContent {
  text?: string
  fileUrl?: string
  fileName?: string
  fileSize?: number
  mimeType?: string
}

export interface EvaluationResult {
  overallScore: number
  aiAnalysis: AIAnalysis
  humanReview?: HumanReview
  runeRating: RuneRating
  recommendations: string[]
}

export interface AIAnalysis {
  score: number
  confidence: number
  criteria: AnalysisCriteria
  processingTime: number
}

export interface HumanReview {
  score: number
  reviewer: string
  comments: string
  reviewedAt: Date
}

export interface AnalysisCriteria {
  clarity: number
  effectiveness: number
  creativity: number
  technicalQuality: number
}

export interface ResourceMetadata {
  originalSize?: number
  dimensions?: {
    width: number
    height: number
  }
  duration?: number
  checksum?: string
}

export interface EvaluationSubmitRequest {
  title: string
  description?: string
  type: ResourceType
  content: ResourceContent
  tags?: string[]
}

export interface EvaluationFilters {
  status?: EvaluationStatus
  type?: ResourceType
  dateFrom?: Date
  dateTo?: Date
  tags?: string[]
  search?: string
}

export interface EvaluationStats {
  totalEvaluations: number
  averageScore: number
  ratingDistribution: Record<RuneRating, number>
  topTags: string[]
}
