# API Contracts: Chat Management

**Date**: 2025-11-04
**Feature**: AI Resource Evaluation System

## Chat Management API

### GET /api/chats
Get list of available chat systems.

**Headers**:
- Authorization: Bearer {token}

**Response (200)**:
```json
{
  "chats": [
    {
      "id": "string",
      "name": "GPT-4",
      "description": "OpenAI GPT-4 chat model",
      "model": "gpt-4",
      "isActive": true
    },
    {
      "id": "string",
      "name": "Claude",
      "description": "Anthropic Claude chat model",
      "model": "claude-3",
      "isActive": true
    }
  ]
}
```

### GET /api/chats/{chatId}/conversations
Get conversations for a specific chat.

**Headers**:
- Authorization: Bearer {token}

**Query Parameters**:
- page: number (optional, default 1)
- limit: number (optional, default 20)
- search: string (optional, search in titles)

**Response (200)**:
```json
{
  "conversations": [
    {
      "id": "string",
      "title": "API Design Discussion",
      "messageCount": 15,
      "createdAt": "2025-11-04T09:00:00Z",
      "updatedAt": "2025-11-04T09:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5
  }
}
```

### POST /api/chats/{chatId}/conversations
Create a new conversation in a chat.

**Headers**:
- Authorization: Bearer {token}

**Request Body**:
```json
{
  "title": "New Conversation",
  "initialMessage": "Hello, I need help with..."
}
```

**Response (201)**:
```json
{
  "id": "string",
  "chatId": "string",
  "title": "New Conversation",
  "messages": [
    {
      "role": "user",
      "content": "Hello, I need help with...",
      "timestamp": "2025-11-04T10:00:00Z"
    }
  ],
  "createdAt": "2025-11-04T10:00:00Z"
}
```

### PUT /api/conversations/{id}
Update conversation title.

**Headers**:
- Authorization: Bearer {token}

**Request Body**:
```json
{
  "title": "Updated Conversation Title"
}
```

**Response (200)**:
```json
{
  "id": "string",
  "title": "Updated Conversation Title",
  "updatedAt": "2025-11-04T10:15:00Z"
}
```

### DELETE /api/conversations/{id}
Delete a conversation.

**Headers**:
- Authorization: Bearer {token}

**Response (204)**: No content

**Error Responses**:
- 403: Cannot delete other user's conversations
- 404: Conversation not found