# Data Model: AI Resource Management and Evaluation

**Date**: 2025-11-04
**Feature**: AI Resource Management and Evaluation
**Plan**: specs/001-ai-resource-management/plan.md

## Entities

### AI Resource
Represents a type of AI content to evaluate (e.g., chat responses, prompts).

**Fields**:
- id: string (unique identifier)
- name: string (display name)
- apiConfig: object (API endpoint, auth details for fetching items)

**Validation**:
- name: required, non-empty
- apiConfig: valid URL, required auth if needed

**Relationships**:
- Has many Evaluation Items

### Evaluation Item
Individual item to evaluate.

**Fields**:
- id: string
- resourceId: string (foreign key to AI Resource)
- title: string
- description: string
- evaluated: boolean (default false)

**Validation**:
- title: required
- description: optional
- evaluated: boolean

**Relationships**:
- Belongs to AI Resource

### AI Chat
Different chat types/models.

**Fields**:
- id: string
- name: string (GPT-4, Claude, grok)
- apiConfig: object (API details for chat interactions)

**Validation**:
- name: required, one of [GPT-4, Claude, grok]

**Relationships**:
- Has many Conversations

### Conversation
Chat conversation.

**Fields**:
- id: string
- chatId: string (foreign key to AI Chat)
- title: string (optional)
- messages: array of message objects (role, content, timestamp)

**Validation**:
- title: optional
- messages: array of valid message objects

**Relationships**:
- Belongs to AI Chat

### Theme
UI theme options.

**Fields**:
- id: string
- name: string (Light, Dark)

**Validation**:
- name: one of [Light, Dark]

### Configuration
App settings.

**Fields**:
- theme: string (current selected theme)

**Validation**:
- theme: one of [Light, Dark]

## State Transitions

### Evaluation Item
- Not Evaluated (evaluated: false) → Evaluated (evaluated: true)
- No undo once evaluated

### Conversation
- Created → Title added (optional) → Messages added → Deleted

## Data Flow

1. User selects AI Resource
2. System fetches Evaluation Items via API
3. User evaluates items, updates evaluated status
4. System sends evaluation data to API
5. User selects AI Chat
6. System loads conversations for selected chat
7. User manages conversations (add title, delete)
8. Theme selection persists in configuration