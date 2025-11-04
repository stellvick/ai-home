# Tasks: AI Resource Management and Evaluation

**Input**: Design documents from `/specs/001-ai-resource-management/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Tests are OPTIONAL - not included as not requested in specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Frontend**: `src/` at repository root
- Adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create Vite + React + TypeScript project structure
- [ ] T002 [P] Install core dependencies: React 19, TypeScript, Vite
- [ ] T003 [P] Install UI dependencies: HeroUI, Tailwind CSS 4, @tailwindcss/postcss
- [ ] T004 Configure Tailwind CSS with PostCSS in vite.config.ts
- [ ] T005 Setup TypeScript configuration in tsconfig.json
- [ ] T006 Create project directory structure per plan.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T007 Create API service layer in src/services/api.ts
- [ ] T008 Setup React Router for navigation in src/App.tsx
- [ ] T009 [P] Create base layout component in src/components/Layout.tsx
- [ ] T010 [P] Create header component in src/components/Header.tsx
- [ ] T011 Implement theme system with CSS variables in src/styles/theme.css
- [ ] T012 Create authentication context in src/contexts/AuthContext.tsx
- [ ] T013 Create configuration context in src/contexts/ConfigContext.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - User Login (Priority: P1) 🎯 MVP

**Goal**: Allow users to log in using JWT authentication

**Independent Test**: Can be fully tested by entering JWT token and verifying access to main dashboard

- [ ] T014 [US1] Create login page component in src/pages/Login.tsx
- [ ] T015 [US1] Implement JWT authentication service in src/services/auth.ts
- [ ] T016 [US1] Add login route protection in src/App.tsx
- [ ] T017 [US1] Integrate login with auth context

**Checkpoint**: User Story 1 should be fully functional and independently testable

---

## Phase 4: User Story 3 - Evaluate AI Resource Items (Priority: P1) 🎯 MVP

**Goal**: Enable evaluation of AI resource items

**Independent Test**: Can be fully tested by selecting a resource, fetching items, evaluating one item, and verifying evaluation is saved

- [ ] T018 [US3] Create resource selection component in src/components/ResourceSelector.tsx
- [ ] T019 [US3] Create evaluation item component in src/components/EvaluationItem.tsx
- [ ] T020 [US3] Create evaluation list component in src/components/EvaluationList.tsx
- [ ] T021 [US3] Implement evaluation API service in src/services/evaluation.ts
- [ ] T022 [US3] Create evaluation page in src/pages/Evaluation.tsx
- [ ] T023 [US3] Add evaluation route in src/App.tsx

**Checkpoint**: User Stories 1 AND 3 should both work independently

---

## Phase 5: User Story 4 - Manage AI Chats and Conversations (Priority: P1) 🎯 MVP

**Goal**: Provide AI chat interface with conversation management

**Independent Test**: Can be fully tested by selecting a chat, viewing conversations, adding a title to one, and deleting another

- [ ] T024 [US4] Create chat selector component in src/components/ChatSelector.tsx
- [ ] T025 [US4] Create conversation list component in src/components/ConversationList.tsx
- [ ] T026 [US4] Create conversation item component in src/components/ConversationItem.tsx
- [ ] T027 [US4] Implement chat API service in src/services/chat.ts
- [ ] T028 [US4] Create chat page in src/pages/Chat.tsx
- [ ] T029 [US4] Add chat route in src/App.tsx

**Checkpoint**: User Stories 1, 3 AND 4 should all work independently

---

## Phase 6: User Story 2 - Register AI Resource (Priority: P2)

**Goal**: Allow registration of AI resources with API configurations

**Independent Test**: Can be fully tested by registering a resource and verifying it appears in the resources list

- [ ] T030 [US2] Create resource registration form in src/components/ResourceForm.tsx
- [ ] T031 [US2] Create resources list component in src/components/ResourcesList.tsx
- [ ] T032 [US2] Implement resource API service in src/services/resource.ts
- [ ] T033 [US2] Create resources management page in src/pages/Resources.tsx
- [ ] T034 [US2] Add resources route in src/App.tsx

**Checkpoint**: All user stories should be independently functional

---

## Phase 7: User Story 5 - Select UI Themes (Priority: P3)

**Goal**: Enable theme switching between Light and Dark

**Independent Test**: Can be fully tested by selecting a theme and verifying UI changes

- [ ] T035 [US5] Create theme selector component in src/components/ThemeSelector.tsx
- [ ] T036 [US5] Integrate theme switching with config context
- [ ] T037 [US5] Add theme selector to header component

---

## Phase 8: User Story 6 - Access Configuration Page (Priority: P3)

**Goal**: Provide configuration page for app settings

**Independent Test**: Can be fully tested by navigating to configuration page and verifying it loads

- [ ] T038 [US6] Create configuration page in src/pages/Config.tsx
- [ ] T039 [US6] Implement configuration persistence in config context
- [ ] T040 [US6] Add configuration route in src/App.tsx

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T041 [P] Add filter functionality to resources list in src/components/ResourcesList.tsx
- [ ] T042 [P] Add filter functionality to conversations list in src/components/ConversationList.tsx
- [ ] T043 Implement responsive design across all components
- [ ] T044 Add global error handling and user feedback
- [ ] T045 Optimize component performance with React.memo
- [ ] T046 Add loading states and skeletons
- [ ] T047 Final styling and visual polish

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-8)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 9)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 4 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 5 (P3)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 6 (P3)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Within Each User Story

- Components before pages
- API services before components
- Routes added last in each story

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Components within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

### Parallel Example: User Story 3

```bash
# Launch all components for User Story 3 together:
Task: "Create resource selection component in src/components/ResourceSelector.tsx"
Task: "Create evaluation item component in src/components/EvaluationItem.tsx"
Task: "Create evaluation list component in src/components/EvaluationList.tsx"
```

---

## Implementation Strategy

### MVP First (User Stories 1, 3, 4 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Login)
4. Complete Phase 4: User Story 3 (Evaluation)
5. Complete Phase 5: User Story 4 (AI Chat)
6. **STOP and VALIDATE**: Test all three stories independently
7. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (Basic login)
3. Add User Story 3 → Test independently → Deploy/Demo (Login + Evaluation)
4. Add User Story 4 → Test independently → Deploy/Demo (Login + Evaluation + Chat)
5. Add remaining stories incrementally
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Login)
   - Developer B: User Story 3 (Evaluation)
   - Developer C: User Story 4 (AI Chat)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence