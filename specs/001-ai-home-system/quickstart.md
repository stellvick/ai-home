# Quick Start: AI Home System

**Date**: 2025-11-04
**Feature**: 001-ai-home-system

## Prerequisites

- Node.js 18+
- npm or yarn
- Git

## Installation

1. **Clone and navigate to the project**:
   ```bash
   git checkout 001-ai-home-system
   cd ai-home
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment setup**:
   Create `.env.local` file:
   ```env
   VITE_JWT_SECRET=your-jwt-secret-here
   VITE_N8N_AUTH_URL=https://n8n.stellvick.fun/webhook/962701ed-f87d-4ec1-b965-ae74259d0041
   VITE_API_BASE_URL=https://n8n.stellvick.fun/webhook
   ```

4. **Install Tailwind CSS PostCSS plugin** (as per requirements):
   ```bash
   npm install @tailwindcss/postcss
   ```

   Update `postcss.config.js`:
   ```js
   module.exports = {
     plugins: {
       '@tailwindcss/postcss': {},
       autoprefixer: {},
     },
   }
   ```

## Development

1. **Start development server**:
   ```bash
   npm run dev
   ```

2. **Open browser**:
   Navigate to `http://localhost:5173`

## Mock Data Usage

The application starts with mock data for all features except login. To switch to real APIs:

1. Ensure n8n webhooks are configured
2. Update service files to use real API endpoints instead of mock functions
3. Test authentication with real credentials

## Key Features

### Authentication
- Login with username/password
- JWT token storage with encryption
- Automatic token refresh

### Resource Management
- Register AI resources with API URLs
- View and manage resources
- Filter resources

### Chat Interface
- Select from multiple chats
- View conversations with filtering
- Add/edit conversation titles
- Delete conversations
- Real-time conversation switching

### Evaluation System
- Fetch responses from resources
- Evaluate responses individually
- Save evaluations to database
- Track evaluation status

### Themes & Configuration
- Switch between two themes
- Access configuration page
- Persistent settings

## Development Workflow

1. **Component Development**: Use HeroUI components first
2. **State Management**: Use Zustand stores
3. **Data Fetching**: Use React Query
4. **Validation**: Use Yup schemas
5. **Icons**: Use Lucide React
6. **Styling**: Use Tailwind CSS

## Testing

Manual testing only - focus on:
- UI/UX quality
- Component interactions
- Data flow
- Error handling

## Deployment

1. **Build for production**:
   ```bash
   npm run build
   ```

2. **Preview build**:
   ```bash
   npm run preview
   ```

3. **Deploy built files** to your hosting platform

## Troubleshooting

### Common Issues

**Tailwind not working**:
- Ensure `@tailwindcss/postcss` is installed
- Check PostCSS configuration

**API calls failing**:
- Verify environment variables
- Check n8n webhook URLs
- Use mock data for development

**Authentication issues**:
- Verify JWT secret in environment
- Check token storage

**Build errors**:
- Ensure all dependencies are installed
- Check TypeScript types
- Verify Vite configuration

### Performance Tips

- Use React Query for caching
- Implement lazy loading for routes
- Optimize HeroUI component usage
- Monitor bundle size

## Next Steps

After initial development:
1. Replace mock data with real n8n APIs
2. Add error boundaries
3. Implement loading states
4. Add accessibility features
5. Performance optimization