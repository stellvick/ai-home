# API Contracts: AI Resource Management and Evaluation

**Date**: 2025-11-04
**Feature**: AI Resource Management and Evaluation
**Purpose**: Define API endpoints and contracts for n8n integration

## Authentication

### JWT Creation
**Endpoint**: `POST https://n8n.stellvick.fun/webhook-test/962701ed-f87d-4ec1-b965-ae74259d0041`
**Method**: POST
**Auth**: Basic Auth (username/password)
**Request Body**:
```json
{
  "username": "string",
  "password": "string"
}
```
**Response**:
```json
{
  "token": "jwt_string",
  "expires_in": 3600
}
```
**Error Responses**:
- 401: Invalid credentials
- 500: Server error

## Resources API

### Get All Resources
**Endpoint**: `GET /api/resources`
**Auth**: Bearer JWT
**Query Params**:
- `type`: filter by type (prompt|response|image)
- `evaluated`: filter by evaluation status (true|false)
- `limit`: number (default 20)
- `offset`: number (default 0)
**Response**:
```json
{
  "resources": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "evaluated": false,
      "type": "prompt",
      "api_endpoint": "string",
      "created_at": "2025-11-04T00:00:00Z",
      "updated_at": "2025-11-04T00:00:00Z"
    }
  ],
  "total": 100
}
```

### Create Resource
**Endpoint**: `POST /api/resources`
**Auth**: Bearer JWT
**Request Body**:
```json
{
  "title": "string",
  "description": "string",
  "type": "prompt",
  "api_endpoint": "string"
}
```
**Response**: Resource object

### Evaluate Resource
**Endpoint**: `POST /api/resources/{id}/evaluate`
**Auth**: Bearer JWT
**Request Body**:
```json
{
  "score": 4,
  "comments": "Good quality"
}
```
**Response**: Evaluation object

## Chats API

### Get All Chats
**Endpoint**: `GET /api/chats`
**Auth**: Bearer JWT
**Response**:
```json
{
  "chats": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "active": true,
      "created_at": "2025-11-04T00:00:00Z"
    }
  ]
}
```

### Get Chat Conversations
**Endpoint**: `GET /api/chats/{id}/conversations`
**Auth**: Bearer JWT
**Response**:
```json
{
  "conversations": [
    {
      "id": "string",
      "title": "string",
      "messages": [
        {
          "id": "string",
          "role": "user",
          "content": "Hello",
          "timestamp": "2025-11-04T00:00:00Z"
        }
      ],
      "created_date": "2025-11-04T00:00:00Z"
    }
  ]
}
```

### Send Message to Conversation
**Endpoint**: `POST /api/conversations/{id}/messages`
**Auth**: Bearer JWT
**Request Body**:
```json
{
  "content": "User message",
  "role": "user"
}
```
**Response**: Updated conversation

### Create Conversation
**Endpoint**: `POST /api/chats/{id}/conversations`
**Auth**: Bearer JWT
**Request Body**:
```json
{
  "title": "Optional title"
}
```
**Response**: Conversation object

### Update Conversation Title
**Endpoint**: `PUT /api/conversations/{id}`
**Auth**: Bearer JWT
**Request Body**:
```json
{
  "title": "New title"
}
```
**Response**: Updated conversation

### Delete Conversation
**Endpoint**: `DELETE /api/conversations/{id}`
**Auth**: Bearer JWT
**Response**: 204 No Content

## Notes

- All APIs will be implemented as n8n webhooks
- Initial development uses mock implementations
- JWT stored securely using encrypt-storage
- Error handling follows standard HTTP status codes