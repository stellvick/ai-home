# Data Model: AI Resource Evaluation System

**Date**: 2025-11-04
**Feature**: AI Resource Evaluation System

## Overview

The data model supports a web-based AI resource management system with JWT authentication, resource evaluation workflows, and multi-chat management. Data flows between a React frontend and API backend, with local encrypted storage for session management.

## Core Entities

### User
**Purpose**: Represents authenticated application users
**Attributes**:
- `id`: string (UUID from authentication system)
- `email`: string (user's email address)
- `name`: string (display name)
- `createdAt`: DateTime
- `lastLoginAt`: DateTime

**Relationships**:
- Many-to-many with AI Resource (users can share resources)
- One-to-many with Evaluation Result (user's evaluation history)

**Validation Rules**:
- Email must be valid format
- Name required, 2-100 characters

### AI Resource
**Purpose**: Represents registered AI systems with specific API endpoints
**Attributes**:
- `id`: string (UUID)
- `name`: string (human-readable resource name)
- `description`: string (resource purpose and capabilities)
- `apiEndpoint`: string (base URL for API calls)
- `apiKey`: string (encrypted, optional authentication key)
- `resourceType`: enum ('chat', 'image', 'text', 'multimodal')
- `isActive`: boolean (resource availability status)
- `createdAt`: DateTime
- `updatedAt`: DateTime

**Relationships**:
- Many-to-many with User (shared access)
- One-to-many with Evaluation Item (items from this resource)

**Validation Rules**:
- Name required, 3-100 characters
- API endpoint must be valid URL
- Resource type must be one of defined enums

### Evaluation Item
**Purpose**: Individual items to be evaluated (prompts, responses, images)
**Attributes**:
- `id`: string (UUID)
- `title`: string (item identifier/title)
- `description`: string (item content or summary)
- `content`: string|object (full item data, may be JSON for complex content)
- `itemType`: enum ('prompt', 'response', 'image', 'other')
- `metadata`: object (additional item properties like size, format, etc.)
- `createdAt`: DateTime
- `fetchedAt`: DateTime

**Relationships**:
- Many-to-many with AI Resource (item can belong to multiple resources)
- One-to-many with Evaluation Result (evaluation history)

**Validation Rules**:
- Title required, 1-200 characters
- Content required (format depends on itemType)

### Evaluation Result
**Purpose**: Stores the outcome of evaluating an item
**Attributes**:
- `id`: string (UUID)
- `evaluationItemId`: string (foreign key)
- `userId`: string (foreign key)
- `rating`: number (1-5 scale, optional)
- `feedback`: string (evaluation comments)
- `tags`: string[] (categorization tags)
- `evaluationData`: object (structured evaluation results)
- `createdAt`: DateTime
- `updatedAt`: DateTime

**Relationships**:
- Many-to-one with Evaluation Item
- Many-to-one with User

**Validation Rules**:
- Rating must be 1-5 if provided
- Feedback optional but recommended
- Tags array can be empty

### Chat
**Purpose**: Represents different AI chat systems
**Attributes**:
- `id`: string (UUID)
- `name`: string (chat system name, e.g., "GPT-4", "Claude")
- `description`: string (chat capabilities)
- `apiEndpoint`: string (chat API endpoint)
- `model`: string (specific model version)
- `isActive`: boolean
- `createdAt`: DateTime

**Relationships**:
- One-to-many with Conversation

**Validation Rules**:
- Name required, 2-50 characters
- API endpoint must be valid URL

### Conversation
**Purpose**: Individual conversation threads within a chat
**Attributes**:
- `id`: string (UUID)
- `chatId`: string (foreign key)
- `title`: string (optional conversation title)
- `messages`: object[] (conversation message history)
- `metadata`: object (conversation properties like token count, duration)
- `createdAt`: DateTime
- `updatedAt`: DateTime

**Relationships**:
- Many-to-one with Chat

**Validation Rules**:
- Title optional, 0-200 characters if provided
- Messages array can be empty for new conversations

## Data Flow Patterns

### Authentication Flow
1. User submits credentials to existing JWT API
2. JWT token stored in encrypted local storage
3. Token included in all API requests
4. Token validated on each request

### Resource Evaluation Flow
1. User selects AI Resource
2. System fetches evaluation items via resource API
3. Items displayed with evaluation interface
4. User evaluates items individually
5. Results saved to database with user attribution

### Chat Management Flow
1. User selects from available chats
2. Conversation list loaded for selected chat
3. User can create, title, or delete conversations
4. Chat switching updates conversation list
5. All conversations persist indefinitely

## Storage Strategy

### API Backend Storage
- User, AI Resource, Evaluation Result, Chat, Conversation entities
- Persistent storage in database (implementation not specified)
- Supports concurrent access by multiple users

### Frontend Storage
- JWT tokens and session data in encrypted local storage
- Temporary caching of evaluation items during sessions
- UI preferences and theme settings

## Data Validation & Constraints

### Business Rules
- Users can access resources shared with them
- Evaluation items can be evaluated multiple times by different users
- Conversations are scoped to specific chats
- All evaluation data retained indefinitely
- Up to 10 concurrent users supported

### Data Integrity
- Foreign key relationships maintained
- Cascading deletes prevented (archive instead)
- Unique constraints on critical identifiers
- Audit trail for evaluation changes

## Performance Considerations

### Query Optimization
- Evaluation items filtered by resource and user
- Conversations indexed by chat for fast switching
- Recent evaluations cached for quick access

### Scalability Limits
- 1000 items per evaluation session
- 5+ simultaneous chats per user
- 10 concurrent users total
- Indefinite data retention (archive strategy needed for very old data)