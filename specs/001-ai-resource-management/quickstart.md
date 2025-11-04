# Quickstart: AI Resource Management and Evaluation

**Date**: 2025-11-04
**Feature**: AI Resource Management and Evaluation

## Prerequisites

- Node.js 20+
- npm or yarn
- Access to n8n API endpoints

## Installation

1. Clone the repository and navigate to the project root
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   Create `.env` file with:
   ```
   VITE_API_BASE_URL=https://your-n8n-api-url
   VITE_JWT_SECRET=your-jwt-secret
   ```

## Development

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open http://localhost:5173 in your browser

## Building for Production

```bash
npm run build
```

## Usage

1. **Login**: Enter your JWT token on the login page
2. **Register Resources**: Add AI resources with their API configurations
3. **Evaluate Resources**: Select a resource, fetch items, and evaluate them
4. **AI Chat**: Choose a chat model (GPT-4, Claude, grok), view and manage conversations
5. **Themes**: Switch between Light and Dark themes in configuration
6. **Filters**: Use filters on resource and conversation lists

## API Endpoints

See `contracts/api.yaml` for detailed API specifications.

## Manual Testing

- Test login with valid/invalid JWT
- Register resources and verify API calls
- Evaluate items and check data persistence
- Switch between chat models and manage conversations
- Change themes and verify persistence
- Use filters and verify results

## Troubleshooting

- Ensure n8n API is running and accessible
- Check browser console for errors
- Verify JWT token validity
- Clear browser cache if theme changes don't apply