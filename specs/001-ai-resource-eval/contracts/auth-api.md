# API Contracts: Authentication

**Date**: 2025-11-04
**Feature**: AI Resource Evaluation System

## Authentication API

### POST /auth/login
Authenticate user and return JWT token.

**Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```

**Response (200)**:
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "email": "string",
    "name": "string"
  },
  "expiresAt": "2025-11-04T10:00:00Z"
}
```

**Error Responses**:
- 401: Invalid credentials
- 429: Too many attempts

### POST /auth/refresh
Refresh JWT token before expiration.

**Headers**:
- Authorization: Bearer {token}

**Response (200)**:
```json
{
  "token": "string",
  "expiresAt": "2025-11-04T10:00:00Z"
}
```

**Error Responses**:
- 401: Invalid or expired token

### GET /auth/verify
Verify current JWT token validity.

**Headers**:
- Authorization: Bearer {token}

**Response (200)**:
```json
{
  "valid": true,
  "user": {
    "id": "string",
    "email": "string",
    "name": "string"
  }
}
```

**Error Responses**:
- 401: Invalid token