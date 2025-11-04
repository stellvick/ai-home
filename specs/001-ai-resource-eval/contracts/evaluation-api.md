# API Contracts: Evaluation Management

**Date**: 2025-11-04
**Feature**: AI Resource Evaluation System

## Evaluation API

### POST /api/evaluations
Submit evaluation result for an item.

**Headers**:
- Authorization: Bearer {token}

**Request Body**:
```json
{
  "evaluationItemId": "string",
  "rating": 4,
  "feedback": "string",
  "tags": ["quality", "accuracy"],
  "evaluationData": {
    "criteria": {
      "accuracy": 5,
      "relevance": 4,
      "clarity": 3
    }
  }
}
```

**Response (201)**:
```json
{
  "id": "string",
  "evaluationItemId": "string",
  "userId": "string",
  "rating": 4,
  "feedback": "string",
  "tags": ["quality", "accuracy"],
  "createdAt": "2025-11-04T10:00:00Z"
}
```

### GET /api/evaluations
Get evaluation results with filtering.

**Headers**:
- Authorization: Bearer {token}

**Query Parameters**:
- resourceId: string (optional)
- itemId: string (optional)
- userId: string (optional)
- rating: number (optional)
- tags: string[] (optional)
- page: number (optional, default 1)
- limit: number (optional, default 20)

**Response (200)**:
```json
{
  "evaluations": [
    {
      "id": "string",
      "evaluationItemId": "string",
      "userId": "string",
      "rating": 4,
      "feedback": "string",
      "tags": ["quality"],
      "createdAt": "2025-11-04T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150
  }
}
```

### PUT /api/evaluations/{id}
Update an existing evaluation.

**Headers**:
- Authorization: Bearer {token}

**Request Body**:
```json
{
  "rating": 5,
  "feedback": "Updated feedback",
  "tags": ["quality", "improved"]
}
```

**Response (200)**:
```json
{
  "id": "string",
  "evaluationItemId": "string",
  "rating": 5,
  "feedback": "Updated feedback",
  "updatedAt": "2025-11-04T10:30:00Z"
}
```

**Error Responses**:
- 403: Cannot modify other user's evaluations
- 404: Evaluation not found