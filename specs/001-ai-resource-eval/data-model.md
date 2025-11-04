# Data Model: AI Resource Evaluation

**Date**: 2025-11-04
**Feature**: AI Resource Evaluation

## Entities and Relationships

### Resource
Represents an AI resource (prompt, response, image) for evaluation.

**Fields**:
- id: UUID (primary key)
- title: String (required, max 255 chars)
- description: String (optional, max 1000 chars)
- api_endpoint: String (required, URL format)
- evaluated: Boolean (default false)
- created_at: Timestamp
- updated_at: Timestamp

**Relationships**:
- Has many Evaluations (one-to-many)

**Validation Rules**:
- Title must be unique per user
- API endpoint must be valid URL
- Description optional but recommended

### Chat
Represents a distinct AI chat instance.

**Fields**:
- id: UUID (primary key)
- name: String (required, max 100 chars)
- created_at: Timestamp

**Relationships**:
- Has many Conversations (one-to-many)

**Validation Rules**:
- Name must be unique per user

### Conversation
Represents a conversation within a chat.

**Fields**:
- id: UUID (primary key)
- chat_id: UUID (foreign key to Chat)
- title: String (optional, max 255 chars)
- messages: JSON array (required, stores message history)
- created_at: Timestamp
- updated_at: Timestamp

**Relationships**:
- Belongs to Chat (many-to-one)

**Validation Rules**:
- Messages must contain at least one message
- Title can be auto-generated if not provided

### Evaluation
Represents an evaluation result for a resource.

**Fields**:
- id: UUID (primary key)
- resource_id: UUID (foreign key to Resource)
- evaluation_data: JSON (required, stores rating, comments, etc.)
- timestamp: Timestamp

**Relationships**:
- Belongs to Resource (many-to-one)

**Validation Rules**:
- Evaluation data must include rating (1-5 scale)
- Comments optional

## State Transitions

### Resource States
- Unevaluated (evaluated = false)
- Evaluated (evaluated = true)

Transition: Unevaluated → Evaluated (upon completion of evaluation process)

### Conversation States
- Active (has recent messages)
- Archived (marked for deletion)

Transition: Active → Archived (user action)

## Data Volume Assumptions

- Resources: 1000 per user
- Chats: 10 per user
- Conversations: 100 per chat
- Evaluations: 1 per resource evaluation session