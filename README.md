# AI Home System

A modern web application for managing AI resources, conducting chat interactions, and evaluating AI responses. Built with React 19, TypeScript, and Vite.

## Features

### User Authentication (User Story 1)
- JWT-based authentication system
- Secure login with encrypted token storage
- Protected routes and middleware
- Session management

### AI Resource Management (User Story 2)
- Register and manage multiple AI resources
- API configuration and monitoring
- Resource filtering and organization
- Evaluation capabilities for AI responses

### Chat Interface (User Story 3)
- Multi-chat support with persistent conversations
- Conversation management (create, edit, delete, search)
- Message history and context preservation
- Real-time chat switching

### Theme & Configuration (User Story 4)
- Light/Dark theme switching
- User profile management
- Application settings and preferences
- Persistent theme selection

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build**: Vite 5
- **Styling**: Tailwind CSS 4 with @tailwindcss/postcss
- **UI Components**: HeroUI
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Form Validation**: Yup
- **Storage**: Encrypted localStorage
- **Icons**: Lucide React
- **Routing**: React Router

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/stellvick/ai-home.git
cd ai-home
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Create environment configuration:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your API endpoints:
```env
VITE_JWT_SECRET=your-jwt-secret
VITE_N8N_AUTH_URL=https://your-n8n-instance/webhook/auth
VITE_API_BASE_URL=https://your-n8n-instance/webhook
```

### Development

Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173`

### Building

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── auth/         # Authentication components
│   ├── base/         # Base HeroUI wrapper components
│   ├── config/       # Configuration page components
│   ├── resources/    # Resource management components
│   └── Navigation.tsx # Main navigation bar
├── pages/            # Page components
│   ├── Login.tsx
│   ├── Chat.tsx
│   ├── Resources.tsx
│   └── Config.tsx
├── services/         # API and business logic
│   ├── auth.ts
│   ├── chat.ts
│   ├── resource.ts
│   ├── evaluation.ts
│   └── mock/         # Mock data for development
├── stores/           # Zustand state management
│   ├── auth.ts
│   ├── chat.ts
│   ├── resource.ts
│   └── theme.ts
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
│   ├── validation.ts  # Yup validation schemas
│   └── storage.ts    # Storage utilities
├── lib/              # Library configurations
│   ├── react-query.ts
│   ├── router.tsx
│   └── auth-middleware.ts
├── App.tsx           # Main App component
├── main.tsx          # Entry point
└── index.css         # Global styles
```

## Authentication Flow

1. User enters credentials on login page
2. Credentials validated with Yup schemas
3. Authentication service communicates with n8n API
4. JWT token received and stored in encrypted storage
5. User redirected to main application
6. Protected routes check for valid JWT before rendering

## Mock Data Usage

The application starts with mock data for all features except login. To enable real API calls:

1. Set `USE_MOCK = false` in each service file
2. Configure valid n8n API endpoints in environment variables
3. Ensure n8n workflows are deployed and accessible

## API Integration

All API endpoints are defined through OpenAPI contracts:
- `specs/001-ai-home-system/contracts/auth-api.yaml`
- `specs/001-ai-home-system/contracts/resources-api.yaml`
- `specs/001-ai-home-system/contracts/chat-api.yaml`
- `specs/001-ai-home-system/contracts/evaluation-api.yaml`

## Development Guidelines

### Component Development
- Use HeroUI components as primary UI library
- Wrap HeroUI components in custom components for consistency
- Follow React 19 best practices and patterns

### State Management
- Use Zustand stores for global state
- Keep store logic simple and focused
- Use store persistence for user preferences

### Data Fetching
- Use React Query for API calls
- Implement proper error handling
- Use service layer pattern for API communication

### Form Validation
- Use Yup schemas for all form validation
- Display validation errors to users
- Prevent submission of invalid data

### Styling
- Use Tailwind CSS utility classes
- Support both light and dark themes
- Use dark: prefix for dark mode styles
- Maintain responsive design for all breakpoints

## Testing

Manual testing focus:
- UI/UX quality and responsiveness
- Component interactions
- Data flow and state management
- Error handling and user feedback
- Authentication and route protection

## Performance Optimization

- Lazy loading of routes
- React Query caching with 5-minute staleTime
- Optimized bundle size with tree-shaking
- Efficient re-render prevention with Zustand
- CSS optimization with Tailwind 4

## Error Handling

- Try-catch blocks around all async operations
- User-friendly error messages
- Error logging for debugging
- Graceful degradation with fallbacks

## Browser Support

- Modern browsers with ES2020 support
- Chrome, Firefox, Safari, Edge (latest versions)

## Deployment

1. Build the application: `npm run build`
2. Distribute the `dist/` folder to your hosting platform
3. Configure environment variables on the host
4. Ensure CORS is configured if APIs are on different domains

## Contributing

1. Follow the existing code style and structure
2. Use TypeScript for all new code
3. Implement proper error handling
4. Update documentation for new features
5. Test changes before committing

## License

MIT

## Support

For issues and questions, please open an issue on GitHub or contact the development team.
