# Quickstart Guide: AI Oracle Platform

**Get started with the mystical AI evaluation platform in minutes**

## Prerequisites

- Node.js 18+ installed
- Git for version control
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Code editor (VS Code recommended)

## Installation

### 1. Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd ai-home

# Switch to feature branch
git checkout 001-ai-oracle-platform

# Install dependencies
npm install
```

### 2. Configure Environment

Create `.env.local` file in project root:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3001/api/v1
VITE_WEBSOCKET_URL=ws://localhost:3001/ws

# App Configuration
VITE_APP_NAME="Oráculo IA"
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_MOCK_API=true
VITE_ENABLE_WEBSOCKETS=false

# Security (for development only)
VITE_ENCRYPTION_KEY=dev-encryption-key-change-in-production
```

### 3. Start Development Server

```bash
# Start the development server
npm run dev

# Application will be available at:
# http://localhost:5173
```

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── auth/            # Login, registration components
│   ├── chat/            # Chat interface components
│   ├── dashboard/       # Dashboard and evaluation UI
│   ├── layout/          # Navigation, headers, footers
│   ├── theme/           # Theme switching components
│   └── common/          # Shared utility components
├── pages/               # Route-level components
├── hooks/               # Custom React hooks
├── services/            # API and external services
├── store/               # Zustand state management
├── types/               # TypeScript definitions
├── utils/               # Utility functions
└── styles/              # Global styles and themes
```

## Development Workflow

### 1. Authentication Flow

Test the login system with mock data:

```typescript
// Default test credentials
const testUser = {
  email: 'oracle@example.com',
  password: 'mysticalPassword123'
};
```

**Login Page Features:**
- Yup form validation
- Mystical animations
- JWT token storage with encrypt-storage
- Automatic redirect to dashboard

### 2. Theme System

Switch between mystical themes:

```typescript
// Theme options
const themes = {
  lunar: {
    primary: 'blue-silver ethereal aesthetic',
    colors: ['#0B2545', '#F5F5F5', '#4B0082']
  },
  shadow: {
    primary: 'dark fantasy aesthetic',  
    colors: ['#2E2E2E', '#D4AF37', '#8B0000']
  }
};
```

**Theme Features:**
- Real-time theme switching
- Persistent theme selection
- HeroUI component theming
- Custom CSS properties

### 3. Evaluation System

Test AI content evaluation:

```typescript
// Sample evaluation workflow
1. Navigate to Dashboard
2. Click "Submit for Evaluation"
3. Upload content (text, image, or file)
4. View mock AI analysis results
5. See rune-based rating system
```

**Evaluation Features:**
- Multi-modal content support (100MB limit)
- Hybrid AI + human validation display
- Searchable evaluation history
- Pagination for large datasets

### 4. Chat Interface

Interact with AI Oracle:

```typescript
// Chat session features
1. Create new chat session
2. Select Oracle avatar/personality
3. Configure AI tone and behavior
4. Send messages with mystical UI
5. View parchment-style chat history
```

**Chat Features:**
- Multiple simultaneous sessions
- Context preservation
- Avatar selection (lunar-sage, shadow-seer, etc.)
- WebSocket ready (mock polling initially)

## Key Components

### Authentication (useAuth hook)

```typescript
const { user, login, logout, isAuthenticated } = useAuth();

// Login with validation
await login({ email, password });

// Secure logout
await logout();
```

### Theme Management (useTheme hook)

```typescript
const { theme, setTheme, isDarkMode } = useTheme();

// Switch themes
setTheme('lunar' | 'shadow');

// Theme-aware components
const buttonClass = `mystical-btn ${theme}-variant`;
```

### API Integration (useApi hook)

```typescript
const { get, post, isLoading, error } = useApi();

// Fetch evaluations with pagination
const evaluations = await get('/evaluations', { 
  page: 1, 
  limit: 20 
});

// Submit new evaluation
await post('/evaluations', formData);
```

### State Management (Zustand stores)

```typescript
// Authentication store
const useAuthStore = create((set) => ({
  user: null,
  token: null,
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null, token: null })
}));

// Theme store
const useThemeStore = create((set) => ({
  currentTheme: 'lunar',
  setTheme: (theme) => set({ currentTheme: theme })
}));
```

## HeroUI Components

Reference the official documentation: https://www.heroui.com/docs/guide/introduction

### Essential Components

```tsx
import {
  Button,
  Input,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalContent,
  Navbar,
  Avatar,
  Progress,
  Select,
  SelectItem,
  Chip,
  Pagination
} from "@heroui/react";

// Example usage with mystical theming
<Button 
  color="primary" 
  variant="shadow"
  className="mystical-glow"
>
  Submit to Oracle
</Button>
```

### Custom Styled Components

```tsx
// Mystical card with theme support
<Card className={`mystical-card ${theme}-theme`}>
  <CardHeader className="rune-border">
    <h3 className="oracle-title">Evaluation Results</h3>
  </CardHeader>
  <CardBody>
    <RuneRating score={evaluation.overallScore} />
  </CardBody>
</Card>
```

## Mock Data Development

### API Mocking Strategy

Located in `src/services/mock/`:

```typescript
// Mock user data
export const mockUsers = [
  {
    id: '1',
    email: 'oracle@example.com',
    username: 'OracleMaster',
    preferences: { theme: 'lunar' }
  }
];

// Mock evaluations
export const mockEvaluations = [
  {
    id: '1',
    title: 'AI Prompt Analysis',
    type: 'prompt',
    evaluation: {
      overallScore: 85,
      runeRating: 'masterful'
    }
  }
];
```

### Switching to Real API

1. Update `VITE_ENABLE_MOCK_API=false` in `.env.local`
2. Ensure backend API is running
3. Update `VITE_API_BASE_URL` to real endpoint
4. Test authentication flow with real backend

## Build and Deployment

### Development Build

```bash
# Type check
npm run type-check

# Lint code
npm run lint

# Build for development
npm run build:dev
```

### Production Build

```bash
# Build optimized production bundle
npm run build

# Preview production build
npm run preview

# Serve from dist/ directory
```

### Environment-specific Builds

```bash
# Staging environment
npm run build:staging

# Production environment  
npm run build:production
```

## Troubleshooting

### Common Issues

**1. Tailwind CSS PostCSS Error**
```bash
# Install the correct PostCSS plugin
npm install @tailwindcss/postcss --save-dev

# Update postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  }
}
```

**2. HeroUI Component Styling Issues**
```bash
# Ensure HeroUI CSS is imported
import "@heroui/react/styles.css";

# Check Tailwind config includes HeroUI
module.exports = {
  content: [
    "./node_modules/@heroui/**/*.{js,ts,jsx,tsx}"
  ]
}
```

**3. encrypt-storage Not Working**
```bash
# Check encryption key is set
console.log(process.env.VITE_ENCRYPTION_KEY);

# Verify browser localStorage support
if (typeof Storage !== "undefined") {
  // localStorage available
}
```

**4. Mock API Not Loading**
```bash
# Check environment variable
console.log(process.env.VITE_ENABLE_MOCK_API);

# Verify mock data imports
import { mockUsers } from '@/services/mock';
```

### Performance Tips

- Use React.lazy() for route-based code splitting
- Optimize images in /assets folder
- Implement virtual scrolling for large evaluation lists
- Use React Query caching for API responses
- Minimize bundle size with tree shaking

### Debugging Tools

```bash
# React Developer Tools
# Redux DevTools (for Zustand)
# Vite build analysis
npm run build -- --analyze

# Bundle size analysis
npx vite-bundle-analyzer dist
```

## Next Steps

1. **Complete Authentication**: Test all auth flows
2. **Theme Customization**: Adjust mystical colors and animations
3. **Mock Data**: Add comprehensive test datasets
4. **Component Library**: Build reusable Oracle-themed components
5. **API Integration**: Connect to real backend services
6. **Performance**: Optimize for production deployment

## Resources

- [HeroUI Documentation](https://www.heroui.com/docs/guide/introduction)
- [React Query Guide](https://tanstack.com/query/latest/docs/react/overview)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Yup Validation](https://github.com/jquense/yup)
- [Vite Configuration](https://vitejs.dev/config/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Support

For development questions or issues:
1. Check the troubleshooting section above
2. Review component documentation links
3. Consult the API specification in `/contracts/api.yaml`
4. Reference the data model in `data-model.md`