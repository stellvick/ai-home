# API Contracts: AI Resources Management

**Date**: 2025-11-04
**Feature**: AI Resource Evaluation System

## AI Resources API

### GET /api/resources
Get list of available AI resources.

**Headers**:
- Authorization: Bearer {token}

**Query Parameters**:
- page: number (optional, default 1)
- limit: number (optional, default 20)
- type: string (optional filter)

**Response (200)**:
```json
{
  "resources": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "resourceType": "chat|image|text|multimodal",
      "isActive": true,
      "createdAt": "2025-11-04T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5
  }
}
```

### POST /api/resources
Register a new AI resource.

**Headers**:
- Authorization: Bearer {token}

**Request Body**:
```json
{
  "name": "string",
  "description": "string",
  "apiEndpoint": "string",
  "apiKey": "string (optional)",
  "resourceType": "chat|image|text|multimodal"
}
```

**Response (201)**:
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "resourceType": "string",
  "isActive": true,
  "createdAt": "2025-11-04T10:00:00Z"
}
```

### GET /api/resources/{id}/items
Fetch evaluation items from a specific AI resource.

**Headers**:
- Authorization: Bearer {token}

**Query Parameters**:
- limit: number (optional, default 50)
- offset: number (optional, default 0)

**Response (200)**:
```json
{
  "items": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "content": "string|object",
      "itemType": "prompt|response|image|other",
      "metadata": {}
    }
  ],
  "hasMore": true
}
```

**Error Responses**:
- 404: Resource not found
- 503: Resource API unavailable