# Research: AI Oracle Platform

**Phase 0 Research Findings** | **Date**: November 5, 2025

## Technology Stack Decisions

### Decision: React 19 + TypeScript Setup
**Rationale**: React 19 provides the latest performance improvements, enhanced concurrent features, and better TypeScript integration. Combined with TypeScript, it ensures type safety and improved developer experience for the complex mystical UI components.

**Alternatives considered**: 
- React 18: Lacks latest performance optimizations
- Vue 3: Not aligned with specified technology stack
- Next.js: Adds unnecessary complexity for frontend-only requirement

### Decision: Vite Build Tool Configuration
**Rationale**: Vite provides lightning-fast development server, optimized builds, and excellent TypeScript support. Critical for the rich mystical animations and responsive performance requirements (<2s load times).

**Alternatives considered**:
- Create React App: Slower development experience, deprecated
- Webpack: More complex configuration for similar results
- Rollup: Less developer-friendly for React development

### Decision: Tailwind 4 with @tailwindcss/postcss
**Rationale**: Tailwind 4 with PostCSS plugin provides the utility-first approach needed for the mystical theming system. The @tailwindcss/postcss package addresses the plugin compatibility issue mentioned in requirements.

**Alternatives considered**:
- Styled Components: Less maintainable for complex theming
- CSS Modules: Doesn't provide the utility system needed
- Emotion: Additional complexity without clear benefits

### Decision: HeroUI Component Library Integration
**Rationale**: HeroUI (https://www.heroui.com/docs/guide/introduction) provides modern, customizable components that can be themed for the mystical Oracle interface. Reduces development time while maintaining UI/UX excellence required by constitution.

**Alternatives considered**:
- Custom components only: Too time-intensive, against constitution
- Material-UI: Doesn't align with mystical aesthetic requirements
- Chakra UI: Less customizable for unique theming needs

### Decision: State Management with Zustand
**Rationale**: Zustand provides clean, minimal boilerplate state management perfect for authentication, theme switching, chat sessions, and evaluation data. Aligns with clean code principles.

**Alternatives considered**:
- Redux Toolkit: Excessive boilerplate for project scope
- Context API only: Insufficient for complex state like chat sessions
- Jotai: Less mature ecosystem

### Decision: React Query for Data Management
**Rationale**: React Query handles API caching, synchronization, and loading states efficiently. Essential for evaluation history, chat management, and real-time features with backend APIs.

**Alternatives considered**:
- SWR: Less feature-complete
- Apollo Client: Overkill for REST APIs
- Custom fetch logic: Against clean code principles

### Decision: Yup for Form Validation
**Rationale**: Yup provides schema-based validation perfect for login forms, evaluation submissions, and settings. Integrates well with React Hook Form patterns.

**Alternatives considered**:
- Zod: Less React ecosystem integration
- Joi: Browser compatibility concerns
- Custom validation: Code duplication issues

### Decision: encrypt-storage for Secure Token Management
**Rationale**: Provides encrypted localStorage for JWT tokens, meeting security requirements while keeping tokens client-side as specified (backend manages expiration).

**Alternatives considered**:
- Plain localStorage: Security vulnerability
- SessionStorage: UX issues with tab closing
- Cookies: Complexity for SPA architecture

## Architecture Patterns

### Decision: Custom Hooks Pattern
**Rationale**: Custom hooks (useAuth, useTheme, useChat, useApi) encapsulate business logic and provide reusable interfaces. Supports clean code and React best practices.

**Alternatives considered**:
- Higher-order components: Less flexible, outdated pattern
- Render props: More complex for simple state management
- Class components: Not aligned with modern React

### Decision: Mock API Integration Strategy
**Rationale**: Create realistic mock data structure matching expected backend API. Enables frontend development while backend is prepared. Easy transition to real APIs.

**Alternatives considered**:
- Static JSON files: Less realistic data patterns
- No mocking: Blocks development progress
- Third-party mocking services: External dependency concerns

### Decision: Mystical Theme Implementation
**Rationale**: CSS custom properties + Tailwind classes enable dynamic theme switching between Lunar (ethereal) and Shadow (dark fantasy) modes. Supports the brand identity requirements.

**Alternatives considered**:
- Separate CSS files: Poor performance for theme switching
- JavaScript theme objects: Less maintainable
- Single theme only: Doesn't meet requirements

## Integration Considerations

### Decision: File Upload Handling (100MB limit)
**Rationale**: Use HTML5 file input with client-side validation for size/type checking. FormData for multipart uploads to backend API. Progress indicators for large files.

**Alternatives considered**:
- Drag-and-drop only: Accessibility concerns
- Third-party upload libraries: Unnecessary complexity
- No size validation: Poor user experience

### Decision: Chat Interface Real-time Communication
**Rationale**: WebSocket connection for real-time chat with fallback to polling. Maintains multiple conversation contexts as specified (backend manages session limits).

**Alternatives considered**:
- Polling only: Poor user experience
- Server-sent events: Less interactive
- WebRTC: Overkill for text chat

### Decision: Responsive Design Strategy
**Rationale**: Mobile-first approach with Tailwind responsive utilities. HeroUI components provide built-in responsiveness. Mystical animations scale appropriately.

**Alternatives considered**:
- Desktop-first: Poor mobile experience
- Separate mobile site: Code duplication
- Native mobile apps: Against frontend-only requirement

## Performance Optimizations

### Decision: Code Splitting and Lazy Loading
**Rationale**: Route-based code splitting for pages, lazy loading for modal components like evaluation details. Meets <2s load time requirements.

**Alternatives considered**:
- No code splitting: Poor initial load performance
- Component-level splitting: Complexity without clear benefits
- Aggressive splitting: Network overhead concerns

### Decision: Asset Optimization Strategy
**Rationale**: Vite handles bundling optimization. Images in /assets optimized for web. SVG icons via Lucide React for scalability.

**Alternatives considered**:
- CDN assets: External dependency
- Base64 encoding: Bundle size concerns  
- Icon fonts: Less accessible than SVG

## Security Considerations

### Decision: Client-side Security Model
**Rationale**: JWT validation handled by backend, frontend focuses on secure storage and UI protection. Route guards prevent unauthorized access to protected pages.

**Alternatives considered**:
- Client-side JWT validation: Security vulnerability
- Session-based auth: Requires backend session management
- No authentication: Against requirements