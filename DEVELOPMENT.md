# Development Guide

## Setup Instructions

### Initial Setup
1. Clone the repository
2. Run `npm install --legacy-peer-deps`
3. Copy `.env.local.example` to `.env.local`
4. Configure environment variables
5. Run `npm run dev`

## Development Workflow

### Starting Development Server
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### Type Checking
TypeScript compilation happens during build and is configured in `tsconfig.json` with strict mode enabled.

## Code Structure

### Services (`src/services/`)
- Handle API communication and business logic
- Use axios for HTTP requests
- Implement mock fallbacks for development
- Return typed responses using TypeScript interfaces

Example:
```typescript
export const myService = {
  async getData(): Promise<DataType> {
    // Implementation
  }
}
```

### Stores (`src/stores/`)
- Zustand stores for global state
- Automatically persisted using persist middleware
- Type-safe with TypeScript interfaces

Example:
```typescript
export const useMyStore = create<StoreType>((set) => ({
  // Store implementation
}))
```

### Components (`src/components/`)
- Reusable React components
- Use HeroUI components as base
- Keep components focused and single-responsibility
- Pass data via props, use stores for global state

Example:
```typescript
export const MyComponent: React.FC<Props> = ({ data }) => {
  return <div>{data}</div>
}
```

### Types (`src/types/`)
- Define TypeScript interfaces for all data
- Export reusable types
- Keep types organized by feature

### Utils (`src/utils/`)
- Helper functions and utilities
- Validation schemas (Yup)
- Storage utilities
- Common algorithms

## Common Tasks

### Adding a New Page

1. Create page component in `src/pages/PageName.tsx`:
```typescript
import { ProtectedRoute } from '@/lib/auth-middleware'

const PageName = () => {
  return (
    <ProtectedRoute>
      <div className="p-8">
        {/* Page content */}
      </div>
    </ProtectedRoute>
  )
}

export default PageName
```

2. Add route in `src/lib/router.tsx`:
```typescript
const PageName = React.lazy(() => import('@/pages/PageName'))

// In Routes:
<Route path="/page-name" element={<PageName />} />
```

### Adding a New Store

1. Create store in `src/stores/storeName.ts`:
```typescript
import { create } from 'zustand'

interface StoreType {
  // State properties
  property: string
  // Methods
  setProperty: (value: string) => void
}

export const useStore = create<StoreType>((set) => ({
  property: '',
  setProperty: (value) => set({ property: value }),
}))
```

2. Use in components:
```typescript
const Component = () => {
  const property = useStore((state) => state.property)
  const setProperty = useStore((state) => state.setProperty)
  // Use store...
}
```

### Adding a New Service

1. Create service in `src/services/serviceName.ts`:
```typescript
import axios from 'axios'
import type { DataType } from '@/types'

const API_URL = (import.meta as any).env?.VITE_API_URL || 'https://api.example.com'
const USE_MOCK = true

export const myService = {
  async fetchData(): Promise<DataType[]> {
    try {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return []
      }

      const response = await axios.get<DataType[]>(`${API_URL}/data`)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to fetch')
      }
      throw error
    }
  }
}
```

### Adding a New Component

1. Create component in appropriate directory:
```typescript
import React from 'react'
import { Button } from '@heroui/react'

interface ComponentProps {
  title: string
  onAction: () => void
}

export const MyComponent: React.FC<ComponentProps> = ({
  title,
  onAction,
}) => {
  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={onAction}>Action</Button>
    </div>
  )
}
```

2. Use in pages or other components:
```typescript
import { MyComponent } from '@/components/MyComponent'

// In JSX:
<MyComponent title="Test" onAction={() => console.log('clicked')} />
```

## Working with Forms

### Validation with Yup

1. Define schema in `src/utils/validation.ts`:
```typescript
export const myFormSchema = yup.object({
  field: yup.string().required('Field is required'),
  email: yup.string().email().required(),
})

export type MyFormData = yup.InferType<typeof myFormSchema>
```

2. Use in component:
```typescript
const Component = () => {
  const [data, setData] = useState<MyFormData>()
  
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      await myFormSchema.validate(data)
      // Submit
    } catch (error) {
      // Handle validation error
    }
  }
}
```

## Working with Authentication

### Protected Routes

Wrap components with `ProtectedRoute`:
```typescript
import { ProtectedRoute } from '@/lib/auth-middleware'

const MyPage = () => (
  <ProtectedRoute>
    <div>Protected content</div>
  </ProtectedRoute>
)
```

### Using Auth Store

```typescript
import { useAuthStore } from '@/stores/auth'

const Component = () => {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  
  return <div>Hello {user?.username}</div>
}
```

## Working with Themes

### Using Theme Store

```typescript
import { useThemeStore } from '@/stores/theme'

const Component = () => {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)
  
  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  )
}
```

## Styling with Tailwind

### Dark Mode

Use `dark:` prefix for dark mode styles:
```tsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
  Content
</div>
```

### Responsive Design

Use responsive prefixes:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Items
</div>
```

## Environment Variables

Available environment variables:
- `VITE_JWT_SECRET`: JWT secret for token verification
- `VITE_N8N_AUTH_URL`: n8n authentication endpoint
- `VITE_API_BASE_URL`: n8n API base URL
- `VITE_APP_NAME`: Application name
- `VITE_APP_ENV`: Environment (development, production)

## Debugging

### Browser DevTools
- React Developer Tools extension recommended
- Use Redux DevTools for store debugging
- Network tab for API debugging

### Logging
```typescript
// Temporary logging
console.log('Debug:', value)

// Remove before committing
```

## Performance Monitoring

### React Query DevTools
React Query automatically caches API responses. Monitor cache with browser DevTools.

### Bundle Size
Check bundle size:
```bash
npm run build
# Check dist/ folder size
```

## Common Issues

### Module Not Found
- Check import paths use `@/` alias correctly
- Verify files exist at the path
- Clear node_modules and reinstall

### Type Errors
- Ensure all types are properly defined
- Check TypeScript strict mode in tsconfig.json
- Use `any` type only as last resort

### Build Failures
- Clear dist/ folder: `rm -rf dist`
- Reinstall dependencies: `npm install --legacy-peer-deps`
- Check for circular dependencies
- Verify all imports are valid

## Git Workflow

1. Create feature branch: `git checkout -b feature/feature-name`
2. Make changes and test
3. Commit changes: `git commit -m "feat: description"`
4. Push to remote: `git push origin feature/feature-name`
5. Create pull request

## Commit Message Format

- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `docs:` - Documentation
- `style:` - Code style changes
- `chore:` - Build process, dependencies

Example: `git commit -m "feat: add user profile page"`
