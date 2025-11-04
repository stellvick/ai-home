# Data Model: AI Home System

**Date**: 2025-11-04
**Feature**: 001-ai-home-system

## Overview

The AI Home system manages AI resources, chat interactions, and response evaluations. All data is handled via n8n APIs with frontend state management.

## Entities

### User
Represents an authenticated user of the system.

**Fields**:
- `id`: string (unique identifier)
- `username`: string (login username, required, 3-50 characters)
- `jwt`: string (JWT token, stored securely)

**Validation Rules**:
- Username must be unique
- JWT must be valid and not expired

**Relationships**:
- 1:N with Resource (user can have multiple AI resources)

### Resource
Represents an AI resource with specific API configuration.

**Fields**:
- `id`: string (unique identifier)
- `name`: string (display name, required, 1-100 characters)
- `api_url`: string (n8n API endpoint, required, valid URL)

**Validation Rules**:
- API URL must be a valid HTTPS URL
- Name must be unique per user

**Relationships**:
- N:1 with User
- 1:N with Evaluation (resource provides responses to evaluate)

### Chat
Represents an AI chat instance that can contain multiple conversations.

**Fields**:
- `id`: string (unique identifier)
- `name`: string (display name, optional, 1-100 characters)

**Validation Rules**:
- Name is optional but recommended for organization

**Relationships**:
- 1:N with Conversation

### Conversation
Represents a chat session with optional title and message history.

**Fields**:
- `id`: string (unique identifier)
- `chat_id`: string (reference to parent chat, required)
- `title`: string (optional title, 1-200 characters)
- `messages`: Message[] (array of chat messages)
- `created_at`: Date
- `updated_at`: Date

**Validation Rules**:
- chat_id must reference existing Chat
- Title is optional

**Relationships**:
- N:1 with Chat
- 1:N with Evaluation

**Sub-types**:
```typescript
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
```

### Evaluation
Represents the evaluation of an AI response.

**Fields**:
- `id`: string (unique identifier)
- `resource_id`: string (reference to AI resource, required)
- `conversation_id`: string (reference to conversation, required)
- `response_id`: string (identifier of the specific response being evaluated, required)
- `title`: string (evaluation title, required, 1-200 characters)
- `description`: string (evaluation details, required, 1-1000 characters)
- `evaluated`: boolean (evaluation status, default false)
- `created_at`: Date
- `updated_at`: Date

**Validation Rules**:
- resource_id must reference existing Resource
- conversation_id must reference existing Conversation
- Title and description required when evaluated = true

**Relationships**:
- N:1 with Resource
- N:1 with Conversation

## State Transitions

### Evaluation Lifecycle
- **Initial**: evaluated = false, title/description optional
- **In Progress**: evaluated = false, user working on evaluation
- **Completed**: evaluated = true, title and description required, sent to database

### Conversation States
- **Active**: Being used for current chat
- **Archived**: No longer active but preserved

## Data Flow

1. User authenticates → JWT stored
2. User registers Resources → stored locally/managed via API
3. User selects Chat → loads Conversations
4. User interacts in Conversation → messages stored
5. System fetches responses from Resource API → creates Evaluations
6. User evaluates responses → updates Evaluation status → sends to database

## Validation Schema (Yup)

```typescript
import * as yup from 'yup';

export const userSchema = yup.object({
  username: yup.string().min(3).max(50).required(),
});

export const resourceSchema = yup.object({
  name: yup.string().min(1).max(100).required(),
  api_url: yup.string().url().required(),
});

export const evaluationSchema = yup.object({
  title: yup.string().when('evaluated', {
    is: true,
    then: yup.string().min(1).max(200).required(),
  }),
  description: yup.string().when('evaluated', {
    is: true,
    then: yup.string().min(1).max(1000).required(),
  }),
  evaluated: yup.boolean(),
});
```

## Storage Strategy

- **Authentication**: JWT stored in encrypted storage
- **User Preferences**: Local storage with encryption
- **Application Data**: Zustand stores with persistence
- **API Data**: React Query cache with appropriate TTL
- **Evaluations**: Sent to n8n API/database when completed