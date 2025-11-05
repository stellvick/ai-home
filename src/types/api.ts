// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: ApiError
  timestamp: Date
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
}

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  pages: number
}

export interface RequestConfig {
  headers?: Record<string, string>
  timeout?: number
  withCredentials?: boolean
  params?: Record<string, unknown>
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

export class ApiException extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'ApiException'
  }
}
