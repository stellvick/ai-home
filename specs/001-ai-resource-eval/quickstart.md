# Quickstart: AI Resource Evaluation System

**Date**: 2025-11-04
**Feature**: AI Resource Evaluation System

## Overview

This guide helps you set up the development environment for the AI Resource Evaluation System, a React-based web application for managing and evaluating AI resources.

## Prerequisites

- Node.js 18+ and npm
- Git
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- API backend with JWT authentication (existing)

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI**: Tailwind CSS + HeroUI components
- **State Management**: Zustand
- **Data Fetching**: React Query (TanStack Query)
- **Forms & Validation**: React Hook Form + Yup
- **Storage**: encrypt-storage for session data
- **Icons**: Lucide React
- **Utilities**: react-use custom hooks

## Installation

1. **Clone and setup the project**:
   ```bash
   git clone <repository-url>
   cd ai-resource-evaluation
   git checkout 001-ai-resource-eval
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment setup**:
   Create `.env.local` file:
   ```env
   VITE_API_BASE_URL=http://localhost:3001/api
   VITE_JWT_SECRET_KEY=your-jwt-secret
   VITE_ENCRYPT_STORAGE_KEY=your-encrypt-key
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # HeroUI-based components
│   └── forms/          # Form components
├── pages/              # Route-based pages
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Main dashboard
│   ├── resources/      # Resource management
│   ├── evaluation/     # Evaluation workflows
│   └── chat/           # Chat management
├── hooks/              # Custom React hooks
├── stores/             # Zustand state stores
├── services/           # API services & React Query hooks
├── types/              # TypeScript definitions
├── validation/         # Yup schemas
├── utils/              # Helper functions
└── constants/          # App constants
```

## Key Features Setup

### Authentication Setup

The application uses JWT authentication. The login API endpoint should be configured in the environment variables.

**Login Flow**:
1. User enters credentials on login page
2. JWT token stored in encrypted local storage
3. Token automatically included in API requests
4. Automatic token refresh before expiration

### Resource Management

**Registering AI Resources**:
1. Navigate to Resources page
2. Click "Add Resource"
3. Fill in resource details (name, API endpoint, type)
4. Test connection (optional)
5. Save resource

**Supported Resource Types**:
- Chat: Conversational AI models
- Image: Image generation/analysis
- Text: Text processing models
- Multimodal: Multiple input types

### Evaluation Workflow

**Evaluating Resources**:
1. Select a registered resource
2. Click "Fetch Items" to load evaluation items
3. Review each item individually
4. Provide rating, feedback, and tags
5. Submit evaluation (saved automatically)

**Evaluation Criteria**:
- Rating: 1-5 scale
- Feedback: Text comments
- Tags: Categorization labels
- Custom data: Structured evaluation results

### Chat Management

**Managing Chats**:
1. View available chat systems in sidebar
2. Click chat to view conversations
3. Create new conversations
4. Add titles to conversations
5. Delete unwanted conversations

**Chat Switching**:
- Conversation list updates automatically when switching chats
- Each chat maintains separate conversation history
- Conversations persist across sessions

### UI Customization

**Themes**:
- Two built-in themes (Light/Dark)
- Theme selection in configuration page
- Settings persist across sessions

**Configuration**:
- Access via user menu
- Theme selection
- Other preferences (future feature)

## Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Production build
npm run preview      # Preview production build

# Code Quality
npm run lint         # ESLint checking
npm run type-check   # TypeScript checking

# Testing (when implemented)
npm run test         # Run tests
npm run test:watch   # Watch mode tests
```

## API Integration

The application expects a REST API backend with the following endpoints:

- `POST /auth/login` - User authentication
- `GET /api/resources` - List AI resources
- `POST /api/resources` - Register new resource
- `GET /api/resources/{id}/items` - Fetch evaluation items
- `POST /api/evaluations` - Submit evaluations
- `GET /api/chats` - List chat systems
- `GET /api/chats/{id}/conversations` - Get conversations
- `POST /api/conversations` - Create conversation
- `PUT /api/conversations/{id}` - Update conversation
- `DELETE /api/conversations/{id}` - Delete conversation

## Troubleshooting

### Common Issues

**Login fails**:
- Check API endpoint configuration
- Verify JWT secret matches backend
- Check browser console for network errors

**Resources not loading**:
- Verify API connectivity
- Check resource API endpoints are accessible
- Review browser network tab for failed requests

**Chat switching slow**:
- Check React Query cache configuration
- Verify API response times
- Review browser performance tab

**Theme not applying**:
- Clear browser cache
- Check local storage for theme settings
- Verify Tailwind CSS is loading

### Performance Tips

- Use React DevTools Profiler to identify bottlenecks
- Enable React Query DevTools for API debugging
- Monitor bundle size with `npm run build -- --analyze`
- Use browser DevTools for network and performance analysis

## Next Steps

After setup, you can:

1. **Explore the codebase** - Review component structure and patterns
2. **Add new features** - Follow the established patterns for consistency
3. **Run the application** - Test all user workflows end-to-end
4. **Create tasks** - Use `/speckit.tasks` to break down implementation work