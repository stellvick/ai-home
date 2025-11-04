# Quickstart: AI Resource Management and Evaluation

**Date**: 2025-11-04
**Feature**: AI Resource Management and Evaluation

## Prerequisites

- Node.js 18+
- npm or yarn
- Git

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-home
git checkout 001-ai-resource-management
```

2. Install dependencies:
```bash
npm install
```

3. Install Tailwind CSS PostCSS plugin:
```bash
npm install @tailwindcss/postcss
```

4. Configure environment variables:
Create `.env` file:
```
VITE_JWT_API_URL=https://n8n.stellvick.fun/webhook-test/962701ed-f87d-4ec1-b965-ae74259d0041
VITE_JWT_SECRET=your-jwt-secret-here
```

## Development

1. Start development server:
```bash
npm run dev
```

2. Open browser to `http://localhost:5173`

## Features Overview

### Login
- Enter username and password
- JWT obtained from n8n API
- Redirects to main dashboard on success

### Resources Management
- View list of AI resources with filters
- Register new resources (prompts, responses, images)
- Evaluate resources with scoring and comments

### AI Chat
- Select from available chats
- View and manage conversations
- Add titles to conversations
- Send messages and receive AI responses
- Delete conversations

### Configuration
- Switch between light and dark themes
- Access settings page

## Mock Data

Initially, the application uses mock data for all features except login. To switch to real APIs, update the service files in `src/services/`.

## Building for Production

```bash
npm run build
```

## Manual Testing Checklist

- [ ] Login with valid credentials
- [ ] Login with invalid credentials shows error
- [ ] View resources list with filters
- [ ] Register new resource
- [ ] Evaluate a resource
- [ ] Switch between chats
- [ ] View conversations in selected chat
- [ ] Send message in chat
- [ ] Add title to conversation
- [ ] Delete conversation
- [ ] Switch themes
- [ ] Access configuration page
- [ ] UI is modern and visually pleasing

## Troubleshooting

- **Tailwind CSS issues**: Ensure @tailwindcss/postcss is installed and PostCSS config is correct
- **API errors**: Check network tab for failed requests, verify JWT token
- **Build errors**: Clear node_modules and reinstall dependencies