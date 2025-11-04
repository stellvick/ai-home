# Quickstart: AI Resource Management

**Date**: 2025-11-04  
**Feature**: AI Resource Management  
**Phase**: 1 - Design & Contracts  

## Prerequisites

- Node.js 18+
- npm or yarn
- Environment variables configured

## Installation

1. Clone the repository and checkout the feature branch:
   ```bash
   git checkout 001-ai-resource-management
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create `.env.local` with:
   ```
   VITE_API_BASE_URL=https://n8n.stellvick.fun/webhook
   VITE_JWT_SECRET=your_secret_here
   ```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

## Key Features

1. **Login**: Use your credentials to authenticate via JWT
2. **Resource Management**: Register AI resources and evaluate items
3. **AI Chat**: Access multiple chats and manage conversations
4. **Themes**: Switch between Light and Dark themes
5. **Configuration**: Access settings page

## API Endpoints

All data is fetched from n8n APIs. Ensure the workflows are active and accessible.

## Troubleshooting

- **Login fails**: Check JWT API availability and credentials
- **API errors**: Verify n8n webhook URLs and authentication
- **Build issues**: Ensure all dependencies are installed correctly
- **Tailwind not working**: Confirm @tailwindcss/postcss is installed and configured

## Manual Testing Checklist

- [ ] Login with valid credentials
- [ ] Register a new resource
- [ ] Fetch and evaluate items
- [ ] Switch between chats
- [ ] Add titles to conversations
- [ ] Delete conversations
- [ ] Change themes
- [ ] Access configuration page
- [ ] Verify responsive design on different screen sizes