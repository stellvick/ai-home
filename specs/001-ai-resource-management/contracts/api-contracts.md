# API Contracts: AI Resource Management

**Date**: 2025-11-04  
**Feature**: AI Resource Management  
**Phase**: 1 - Design & Contracts  

## Overview

All APIs are provided by n8n workflows. Authentication uses JWT tokens in Authorization header. Data is JSON-based.

## Authentication Endpoints

### POST /auth/login
Authenticate user and obtain JWT token.

**Request**:
```json
{
  "username": "string",
  "password": "string"
}
```

**Response** (200):
```json
{
  "token": "jwt_string",
  "user": {
    "id": "string",
    "username": "string"
  }
}
```

**Errors**: 401 Unauthorized

## Resource Management Endpoints

### GET /resources
List user's resources with filters.

**Query Parameters**:
- `status`: 'unevaluated' | 'approved' | 'rejected'
- `type`: 'prompt' | 'response' | 'image' | 'other'
- `limit`: number (default 50)
- `offset`: number (default 0)

**Response** (200):
```json
{
  "resources": [
    {
      "id": "string",
      "apiEndpoint": "string",
      "type": "string",
      "title": "string",
      "description": "string",
      "createdDate": "ISO8601",
      "evaluationStatus": "string",
      "comments": "string?"
    }
  ],
  "total": number
}
```

### POST /resources
Create a new resource.

**Request**:
```json
{
  "apiEndpoint": "string",
  "type": "string",
  "title": "string",
  "description": "string"
}
```

**Response** (201):
```json
{
  "id": "string",
  "createdDate": "ISO8601"
}
```

### GET /resources/{resourceId}/items
Fetch evaluable items from a resource.

**Response** (200):
```json
{
  "items": [
    {
      "id": "string",
      "title": "string",
      "description": "string"
    }
  ]
}
```

### POST /evaluations
Submit evaluation for an item.

**Request**:
```json
{
  "resourceId": "string",
  "itemId": "string",
  "status": "approved" | "rejected",
  "comments": "string?"
}
```

**Response** (200): Empty

## Chat Endpoints

### GET /chats
List available chats.

**Response** (200):
```json
{
  "chats": [
    {
      "id": "string",
      "name": "string"
    }
  ]
}
```

### GET /chats/{chatId}/conversations
List conversations for a chat with filters.

**Query Parameters**:
- `limit`: number (default 50)
- `offset`: number (default 0)

**Response** (200):
```json
{
  "conversations": [
    {
      "id": "string",
      "title": "string?",
      "createdDate": "ISO8601"
    }
  ]
}
```

### PUT /conversations/{conversationId}/title
Update conversation title.

**Request**:
```json
{
  "title": "string"
}
```

**Response** (200): Empty

### DELETE /conversations/{conversationId}
Delete a conversation.

**Response** (204): Empty

## Configuration Endpoints

### GET /config
Get user configuration (themes, etc.)

**Response** (200):
```json
{
  "theme": "light" | "dark"
}
```

### PUT /config
Update user configuration.

**Request**:
```json
{
  "theme": "light" | "dark"
}
```

**Response** (200): Empty

## Error Responses

All endpoints may return:
- 400 Bad Request: Invalid input
- 401 Unauthorized: Missing/invalid JWT
- 403 Forbidden: Insufficient permissions
- 404 Not Found: Resource not found
- 500 Internal Server Error: Server error

**Error Format**:
```json
{
  "error": "string",
  "message": "string"
}
```