# Data Model: AI Oracle Platform

**Phase 1 Data Design** | **Date**: November 5, 2025

## Core Entities

### User Entity
**Purpose**: Represents authenticated platform users with personalization and security data

```typescript
interface User {
  id: string;                    // Unique user identifier
  email: string;                 // Login credential and contact
  username: string;              // Display name
  avatar?: string;               // Profile image URL or selection
  biography?: string;            // User description
  preferences: UserPreferences;  // Personalization settings
  createdAt: Date;              // Account creation timestamp
  lastLoginAt: Date;            // Security tracking
  isActive: boolean;            // Account status
}

interface UserPreferences {
  theme: 'lunar' | 'shadow';     // Visual theme selection
  notifications: NotificationSettings;
  chatSettings: ChatSettings;
  language?: string;             // Localization (future)
  timezone?: string;             // Time display preferences
}

interface NotificationSettings {
  evaluationComplete: boolean;   // Notify on evaluation completion
  chatMentions: boolean;         // Notify on chat activity
  securityAlerts: boolean;       // Notify on security events
  pushoverEnabled: boolean;      // Backend Pushover integration
}

interface ChatSettings {
  aiPersonality: 'mystical' | 'professional' | 'casual';
  aiTone: 'formal' | 'friendly' | 'enigmatic';
  historyEnabled: boolean;       // Store chat history
  contextLength: number;         // Messages to maintain context
}
```

**Validation Rules**:
- Email must be valid format and unique
- Username required, 3-50 characters
- Avatar URL must be valid if provided
- Biography max 500 characters

**State Transitions**:
- Created → Active (email verification)
- Active → Inactive (user deactivation)
- Active ↔ Active (preference updates)

### EvaluationResource Entity
**Purpose**: Represents AI content submitted for quality assessment

```typescript
interface EvaluationResource {
  id: string;                    // Unique evaluation identifier
  userId: string;                // Owner reference
  title: string;                 // User-provided title
  description?: string;          // Optional description
  type: ResourceType;            // Content classification
  content: ResourceContent;      // Actual content data
  evaluation: EvaluationResult;  // Assessment results
  metadata: ResourceMetadata;    // File/upload information
  status: EvaluationStatus;      // Processing state
  createdAt: Date;              // Submission timestamp
  evaluatedAt?: Date;           // Completion timestamp
  tags: string[];               // User-defined tags for organization
}

type ResourceType = 'prompt' | 'response' | 'image' | 'document' | 'conversation';

interface ResourceContent {
  text?: string;                 // Text-based content
  fileUrl?: string;             // Uploaded file reference
  fileName?: string;            // Original file name
  fileSize?: number;            // File size in bytes
  mimeType?: string;            // File content type
}

interface EvaluationResult {
  overallScore: number;          // 0-100 composite score
  aiAnalysis: AIAnalysis;        // Automated assessment
  humanReview?: HumanReview;     // Expert validation
  runeRating: RuneRating;        // Mystical UI representation
  recommendations: string[];     // Improvement suggestions
}

interface AIAnalysis {
  score: number;                 // AI-generated score
  confidence: number;            // AI confidence level
  criteria: AnalysisCriteria;    // Detailed breakdown
  processingTime: number;        // Analysis duration
}

interface HumanReview {
  score: number;                 // Expert assessment
  reviewer: string;              // Expert identifier
  comments: string;              // Detailed feedback
  reviewedAt: Date;             // Review timestamp
}

type RuneRating = 'legendary' | 'masterful' | 'skilled' | 'apprentice' | 'novice';

interface AnalysisCriteria {
  clarity: number;               // Content clarity score
  effectiveness: number;         // Purpose achievement
  creativity: number;            // Innovation assessment
  technicalQuality: number;      // Technical execution
}

interface ResourceMetadata {
  originalSize?: number;         // File size before processing
  dimensions?: {                 // Image/video dimensions
    width: number;
    height: number;
  };
  duration?: number;             // Audio/video duration
  checksum?: string;             // File integrity
}

type EvaluationStatus = 'pending' | 'analyzing' | 'reviewing' | 'completed' | 'failed';
```

**Validation Rules**:
- File size must not exceed 100MB
- Title required, 1-200 characters
- Content must include either text or file reference
- Tags max 10 items, each 1-50 characters

**State Transitions**:
- Created → Pending (initial submission)
- Pending → Analyzing (AI processing starts)
- Analyzing → Reviewing (human expert validation)
- Analyzing/Reviewing → Completed (assessment finished)
- Any → Failed (error conditions)

### ChatSession Entity
**Purpose**: Represents individual AI conversation contexts

```typescript
interface ChatSession {
  id: string;                    // Unique session identifier
  userId: string;                // Owner reference
  title: string;                 // User-defined or auto-generated title
  avatar: OracleAvatar;          // Visual representation
  messages: ChatMessage[];       // Conversation history
  context: ConversationContext;  // AI context preservation
  settings: SessionSettings;     // Conversation configuration
  status: SessionStatus;         // Current state
  createdAt: Date;              // Session start time
  lastActiveAt: Date;           // Last interaction time
  isArchived: boolean;          // Archive status
}

interface ChatMessage {
  id: string;                    // Unique message identifier
  sessionId: string;             // Session reference
  type: 'user' | 'assistant' | 'system';
  content: string;               // Message text
  timestamp: Date;               // Send/receive time
  metadata?: MessageMetadata;    // Additional data
}

interface MessageMetadata {
  tokens?: number;               // Token count for AI messages
  processingTime?: number;       // Response generation time
  modelUsed?: string;           // AI model identifier
  confidence?: number;          // Response confidence
}

type OracleAvatar = 'lunar-sage' | 'shadow-seer' | 'crystal-guardian' | 'mystic-oracle';

interface ConversationContext {
  personality: string;           // Current AI personality
  tone: string;                 // Communication style
  systemPrompt: string;         // Base instructions
  contextWindow: ChatMessage[]; // Recent messages for context
  customInstructions?: string;  // User-defined behavior
}

interface SessionSettings {
  maxMessages: number;          // Context window size
  autoTitle: boolean;           // Generate titles automatically
  saveHistory: boolean;         // Persist conversation
  temperature: number;          // AI randomness (0-1)
}

type SessionStatus = 'active' | 'idle' | 'archived' | 'error';
```

**Validation Rules**:
- Title required if not auto-generated, 1-100 characters
- Message content required, max 10,000 characters
- Context window max 50 messages
- Settings temperature between 0 and 1

**State Transitions**:
- Created → Active (first message)
- Active → Idle (no activity timeout)
- Idle → Active (new message)
- Active/Idle → Archived (user action)
- Any → Error (system failures)

### AuthenticationSession Entity
**Purpose**: Represents secure user sessions and JWT token management

```typescript
interface AuthenticationSession {
  id: string;                    // Unique session identifier
  userId: string;                // User reference
  deviceInfo: DeviceInfo;        // Client identification
  tokenHash: string;            // JWT token hash (not full token)
  createdAt: Date;              // Login timestamp
  lastAccessAt: Date;           // Recent activity
  expiresAt: Date;              // Session expiration
  isActive: boolean;            // Session validity
  ipAddress: string;            // Security tracking
  userAgent: string;            // Browser/client info
}

interface DeviceInfo {
  type: 'desktop' | 'mobile' | 'tablet' | 'unknown';
  browser?: string;             // Browser identification
  os?: string;                  // Operating system
  isTrusted: boolean;          // Device trust status
}
```

**Validation Rules**:
- Device type must be recognized enum value
- IP address must be valid format
- Token hash required and unique
- Expiration must be future timestamp

**State Transitions**:
- Created → Active (successful login)
- Active → Inactive (logout or expiration)
- Active → Active (token refresh)

## Relationships

### User Relationships
- **User 1:N EvaluationResource**: User owns multiple evaluations
- **User 1:N ChatSession**: User maintains multiple chat sessions
- **User 1:N AuthenticationSession**: User can have multiple active sessions

### Cross-Entity Relationships
- **EvaluationResource N:M Tags**: Many-to-many through tagging system
- **ChatSession 1:N ChatMessage**: Session contains ordered messages
- **User preferences**: Embedded document pattern for user customization

## Data Access Patterns

### Authentication Flow
1. User login → Create AuthenticationSession
2. Store encrypted JWT in browser via encrypt-storage
3. Session validation on each API request
4. Token refresh handled by backend services

### Evaluation Workflow
1. User submits content → Create EvaluationResource
2. Backend processes → Update with AI analysis
3. Human expert reviews → Add human assessment
4. Frontend displays → Rune-based rating system

### Chat Management
1. User starts conversation → Create ChatSession
2. Messages exchanged → Append to ChatMessage array
3. Context preserved → Maintain conversation window
4. Session limits → Managed by backend services

### Theme and Preferences
1. User changes theme → Update UserPreferences
2. Real-time UI update → Zustand store propagation
3. Persistence → API call to save preferences
4. Session restoration → Load preferences on login

## Storage Considerations

### Frontend Storage (Browser)
- **encrypt-storage**: JWT tokens, sensitive session data
- **localStorage**: Theme preferences, UI state
- **sessionStorage**: Temporary chat draft messages
- **IndexedDB**: Chat history caching (future enhancement)

### API Integration Points
- **Authentication**: Login, logout, token refresh, session management
- **Evaluation**: Submit content, retrieve results, search history
- **Chat**: Send messages, retrieve conversations, manage sessions
- **User Management**: Profile updates, preferences, notification settings

### Mock Data Strategy
- Realistic user profiles with varied preferences
- Sample evaluations across all content types
- Chat conversations with different AI personalities
- Session data for testing authentication flows