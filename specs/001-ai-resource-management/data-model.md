# Data Model: AI Resource Management and Evaluation

**Date**: 2025-11-04
**Feature**: AI Resource Management and Evaluation
**Purpose**: Define data structures, relationships, and validation rules

## Entities

### Resource
Represents AI-generated content that can be evaluated.

**Fields**:
- `id`: string (unique identifier)
- `title`: string (required, max 200 chars)
- `description`: string (required, max 1000 chars)
- `evaluated`: boolean (default: false)
- `type`: enum ('prompt', 'response', 'image') (required)
- `api_endpoint`: string (URL for fetching/updating resource data)
- `created_at`: date
- `updated_at`: date

**Validation Rules**:
- Title and description cannot be empty
- Type must be one of the allowed values
- API endpoint must be valid URL format

**Relationships**:
- Has many Evaluations (one-to-many)

### Evaluation
Assessment of a specific resource.

**Fields**:
- `id`: string (unique identifier)
- `resource_id`: string (foreign key to Resource)
- `score`: number (1-5 scale, required)
- `comments`: string (optional, max 500 chars)
- `evaluator`: string (user identifier, required)
- `timestamp`: date (required)

**Validation Rules**:
- Score must be between 1 and 5
- Resource must exist
- Comments optional but if provided, not empty

**Relationships**:
- Belongs to Resource (many-to-one)

### Chat
Container for AI conversations.

**Fields**:
- `id`: string (unique identifier)
- `name`: string (required, max 100 chars)
- `description`: string (optional, max 500 chars)
- `active`: boolean (default: true)
- `created_at`: date

**Validation Rules**:
- Name cannot be empty

**Relationships**:
- Has many Conversations (one-to-many)

### Conversation
Individual chat session within a chat.

**Fields**:
- `id`: string (unique identifier)
- `chat_id`: string (foreign key to Chat)
- `title`: string (optional, auto-generated or user-set, max 200 chars)
- `messages`: array of Message objects
- `created_date`: date
- `updated_at`: date

**Message Object**:
- `id`: string
- `role`: enum ('user', 'assistant', 'system')
- `content`: string (required)
- `timestamp`: date

**Validation Rules**:
- Chat must exist
- Messages array cannot be empty for active conversations
- Role must be valid enum value

**Relationships**:
- Belongs to Chat (many-to-one)

## State Transitions

### Resource Lifecycle
- **Created**: evaluated = false
- **Evaluated**: evaluated = true (after evaluation saved)
- No deletion (archive instead)

### Chat Lifecycle
- **Created**: active = true
- **Archived**: active = false
- Conversations remain accessible

### Conversation Lifecycle
- **Created**: empty messages
- **Active**: has messages, can add more
- **Archived**: no new messages, but readable

## Data Integrity Rules

- Foreign key constraints: evaluations reference valid resources, conversations reference valid chats
- Unique constraints: resource titles within same type? (optional)
- Cascade deletes: deleting chat deletes conversations, deleting resource deletes evaluations (or archive)

## Mock Data Structure

For initial development, mock data will follow these schemas with sample values.