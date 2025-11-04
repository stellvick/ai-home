# Data Model: AI Resource Management

**Date**: 2025-11-04  
**Feature**: AI Resource Management  
**Phase**: 1 - Design & Contracts  

## Entities

### User
**Purpose**: Represents authenticated users of the application

**Fields**:
- `id`: string (unique identifier from auth API)
- `username`: string (login username)
- `token`: string (JWT token, stored encrypted)

**Validation Rules**:
- `username`: required, min 3 chars, max 50 chars
- `token`: required when authenticated

**Relationships**:
- 1:N with Resource (user can manage multiple resources)
- 1:N with Chat (user can access multiple chats)

### Resource
**Purpose**: Represents AI resources that can be evaluated (prompts, responses, images, etc.)

**Fields**:
- `id`: string (unique identifier)
- `apiEndpoint`: string (URL for fetching items)
- `type`: enum ('prompt', 'response', 'image', 'other')
- `title`: string (resource title)
- `description`: string (resource description)
- `createdDate`: Date (when resource was registered)
- `evaluationStatus`: enum ('unevaluated', 'approved', 'rejected')
- `comments`: string (optional evaluation comments)

**Validation Rules**:
- `apiEndpoint`: required, valid URL
- `type`: required, one of allowed values
- `title`: required, min 1 char, max 200 chars
- `description`: required, min 1 char, max 1000 chars
- `evaluationStatus`: defaults to 'unevaluated'
- `comments`: optional, max 500 chars

**Relationships**:
- N:1 with User (belongs to one user)

**State Transitions**:
- `unevaluated` → `approved` (with optional comments)
- `unevaluated` → `rejected` (with optional comments)
- No transitions from approved/rejected (immutable evaluations)

### Chat
**Purpose**: Represents different AI chat instances or types

**Fields**:
- `id`: string (unique identifier)
- `name`: string (display name for the chat)
- `apiEndpoint`: string (URL for chat operations)

**Validation Rules**:
- `name`: required, min 1 char, max 100 chars
- `apiEndpoint`: required, valid URL

**Relationships**:
- N:1 with User (user accesses chats)
- 1:N with Conversation (chat contains multiple conversations)

### Conversation
**Purpose**: Represents individual chat conversations within a chat

**Fields**:
- `id`: string (unique identifier)
- `chatId`: string (reference to parent chat)
- `title`: string (optional conversation title)
- `createdDate`: Date (when conversation was created)
- `lastUpdated`: Date (last modification time)

**Validation Rules**:
- `title`: optional, max 200 chars
- `chatId`: required, references valid Chat

**Relationships**:
- N:1 with Chat (belongs to one chat)

## Data Flow

1. **Authentication**: User logs in, receives JWT, stored in encrypted sessionStorage
2. **Resource Management**: User registers resources with API details, fetches items for evaluation
3. **Evaluation**: Items are evaluated as approved/rejected with optional comments, saved via API
4. **Chat Access**: User selects chats, views conversations, can add titles or delete conversations
5. **Theming**: Theme preference stored in localStorage (not encrypted, as not sensitive)

## API Data Structures

### Login Request/Response
```typescript
interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
  };
}
```

### Resource Item (for evaluation)
```typescript
interface ResourceItem {
  id: string;
  title: string;
  description: string;
  type: 'prompt' | 'response' | 'image' | 'other';
}
```

### Evaluation Submission
```typescript
interface EvaluationRequest {
  resourceId: string;
  itemId: string;
  status: 'approved' | 'rejected';
  comments?: string;
}
```

### Chat/Conversation Structures
```typescript
interface Chat {
  id: string;
  name: string;
}

interface Conversation {
  id: string;
  title?: string;
  createdDate: string;
}
```