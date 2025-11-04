# Tasks: AI Resource Evaluation System

**Input**: Design documents from `/specs/001-ai-resource-eval/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No automated tests required per specification - manual testing only.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Frontend**: `src/` at repository root following plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create Vite React TypeScript project structure per implementation plan
- [ ] T002 Install and configure core dependencies: React 18, TypeScript 5.x, Vite 5.x, Tailwind CSS, HeroUI, React Query, Yup, Zustand, encrypt-storage, react-use, Lucide React
- [ ] T003 [P] Configure ESLint and Prettier for code quality
- [ ] T004 [P] Setup environment configuration files (.env.local template)
- [ ] T005 Create base directory structure: src/components/, src/pages/, src/hooks/, src/stores/, src/services/, src/utils/, src/types/, src/validation/, src/constants/, src/assets/

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 Setup Zustand stores for global state management (auth, ui theme)
- [ ] T007 [P] Create base TypeScript types for entities: User, AI Resource, Evaluation Item, Evaluation Result, Chat, Conversation in src/types/index.ts
- [ ] T008 [P] Setup React Query client configuration with error handling in src/services/apiClient.ts
- [ ] T009 [P] Create Yup validation schemas for forms in src/validation/index.ts
- [ ] T010 Configure Tailwind CSS with HeroUI integration in tailwind.config.js
- [ ] T011 Setup routing structure with React Router in src/App.tsx
- [ ] T012 Create base UI components wrapper with HeroUI provider in src/components/ui/index.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - User Authentication (Priority: P1) 🎯 MVP

**Goal**: Secure JWT-based login system allowing users to authenticate and access the application

**Independent Test**: Login with valid/invalid credentials, verify JWT storage, test protected route access

### Implementation for User Story 1

- [ ] T013 [P] [US1] Create authentication store with Zustand in src/stores/authStore.ts
- [ ] T014 [P] [US1] Create login form component with validation in src/components/forms/LoginForm.tsx
- [ ] T015 [P] [US1] Create authentication service functions in src/services/authService.ts
- [ ] T016 [US1] Create login page component in src/pages/auth/LoginPage.tsx
- [ ] T017 [US1] Implement JWT token management utilities in src/utils/authUtils.ts
- [ ] T018 [US1] Add authentication route protection wrapper in src/components/auth/ProtectedRoute.tsx
- [ ] T019 [US1] Integrate login flow with API endpoints (POST /auth/login, GET /auth/verify)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Resource Registration and Evaluation (Priority: P2)

**Goal**: Register AI resources and evaluate their items individually with results stored in database

**Independent Test**: Register resource, fetch evaluation items, evaluate individual items, verify evaluation status saved

### Implementation for User Story 2

- [ ] T020 [P] [US2] Create AI Resource model types extension in src/types/resource.ts
- [ ] T021 [P] [US2] Create Evaluation Item and Result model types in src/types/evaluation.ts
- [ ] T022 [P] [US2] Create resource management service in src/services/resourceService.ts
- [ ] T023 [P] [US2] Create evaluation service in src/services/evaluationService.ts
- [ ] T024 [US2] Create resource registration form component in src/components/forms/ResourceForm.tsx
- [ ] T025 [US2] Create resources list page in src/pages/resources/ResourcesPage.tsx
- [ ] T026 [US2] Create evaluation workflow page in src/pages/evaluation/EvaluationPage.tsx
- [ ] T027 [US2] Create evaluation item component in src/components/evaluation/EvaluationItem.tsx
- [ ] T028 [US2] Implement filtering functionality for resources and evaluations in src/hooks/useFilters.ts
- [ ] T029 [US2] Integrate with API endpoints (GET/POST /api/resources, GET /api/resources/{id}/items, POST /api/evaluations)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - AI Chat Management (Priority: P3)

**Goal**: Manage multiple AI chats, view conversations within each chat, add titles, and delete conversations

**Independent Test**: Create multiple chats, switch between them, manage conversations within each chat, verify conversation lists update

### Implementation for User Story 3

- [ ] T030 [P] [US3] Create Chat and Conversation model types in src/types/chat.ts
- [ ] T031 [P] [US3] Create chat management service in src/services/chatService.ts
- [ ] T032 [US3] Create chat sidebar component in src/components/chat/ChatSidebar.tsx
- [ ] T033 [US3] Create conversations list component in src/components/chat/ConversationsList.tsx
- [ ] T034 [US3] Create conversation item component with title editing in src/components/chat/ConversationItem.tsx
- [ ] T035 [US3] Create chat management page in src/pages/chat/ChatPage.tsx
- [ ] T036 [US3] Implement chat switching logic with conversation list updates in src/hooks/useChat.ts
- [ ] T037 [US3] Add conversation creation and deletion functionality in src/components/chat/ConversationActions.tsx
- [ ] T038 [US3] Implement filtering for conversations in src/hooks/useConversationFilters.ts
- [ ] T039 [US3] Integrate with API endpoints (GET /api/chats, GET/POST /api/chats/{id}/conversations, PUT/DELETE /api/conversations/{id})

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - UI Customization (Priority: P4)

**Goal**: Provide theme selection and configuration settings for UI customization

**Independent Test**: Switch between themes, verify visual changes, access configuration options

### Implementation for User Story 4

- [ ] T040 [P] [US4] Create UI theme store with Zustand in src/stores/uiStore.ts
- [ ] T041 [P] [US4] Create theme configuration utilities in src/utils/themeUtils.ts
- [ ] T042 [US4] Implement two visual themes (Light/Dark) in src/constants/themes.ts
- [ ] T043 [US4] Create configuration page component in src/pages/settings/ConfigPage.tsx
- [ ] T044 [US4] Create theme selector component in src/components/settings/ThemeSelector.tsx
- [ ] T045 [US4] Add theme persistence to local storage in src/hooks/useTheme.ts
- [ ] T046 [US4] Integrate theme switching across all components

**Checkpoint**: All user stories including UI customization should be complete

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T047 [P] Add error handling and user-friendly error messages across all components
- [ ] T048 [P] Implement loading states and skeleton components for better UX
- [ ] T049 Add responsive design improvements for mobile/tablet views
- [ ] T050 Performance optimization: implement lazy loading for routes and components
- [ ] T051 Add accessibility improvements (ARIA labels, keyboard navigation)
- [ ] T052 Create main dashboard page integrating all features in src/pages/DashboardPage.tsx
- [ ] T053 Add navigation header with user menu in src/components/layout/Header.tsx
- [ ] T054 Update README.md with setup and usage instructions
- [ ] T055 Run quickstart.md validation and update if needed

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3 → P4)
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent of other stories
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Independent of other stories
- **User Story 4 (P4)**: Can start after Foundational (Phase 2) - Independent of other stories

### Within Each User Story

- Types before services
- Services before components
- Core components before pages
- Integration with API endpoints last
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Types and services within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 2

```bash
# Launch all types for User Story 2 together:
Task: "Create AI Resource model types extension in src/types/resource.ts"
Task: "Create Evaluation Item and Result model types in src/types/evaluation.ts"

# Launch all services for User Story 2 together:
Task: "Create resource management service in src/services/resourceService.ts"
Task: "Create evaluation service in src/services/evaluationService.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
   - Developer D: User Story 4
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence</content>
<parameter name="filePath">/Users/igorrabelo/Documents/GIT/ai-home/specs/001-ai-resource-eval/tasks.md