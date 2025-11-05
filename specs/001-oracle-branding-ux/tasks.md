# Tasks — Oráculo IA — Branding, UI e Temas

Branch: 001-oracle-branding-ux  
Spec: specs/001-oracle-branding-ux/spec.md  
Plan: specs/001-oracle-branding-ux/plan.md

## Phase 1 — Setup (project initialization)

- [ ] T001 Initialize Vite + React 19 + TS project structure in repo root
- [ ] T002 Add Tailwind 4 PostCSS plugin in postcss.config.(js|mjs) with @tailwindcss/postcss
- [ ] T003 Create tailwind.config.ts with project paths and theme tokens
- [ ] T004 Create src/index.css with Tailwind base/components/utilities imports
- [ ] T005 [P] Configure HeroUI per docs in src/theme/hero-ui.ts and wrap app provider
- [ ] T006 Install and wire react-router with src/routes/router.tsx and RouterProvider in src/main.tsx
- [ ] T007 Create .env.example with VITE_USE_MOCK and VITE_API_BASE_URL
- [ ] T008 [P] Add lucide-react icon setup in src/components/icons/Icon.tsx
- [ ] T009 [P] Add react-use and basic utilities in src/hooks/useIsReducedMotion.ts

## Phase 2 — Foundational (shared prerequisites)

- [ ] T010 Create src/services/http.ts (fetch wrapper) reading VITE_API_BASE_URL and Authorization header
- [ ] T011 Implement mock/real switch in src/services/api/index.ts using VITE_USE_MOCK
- [ ] T012 [P] Create real API clients in src/services/api/real/{auth.ts,items.ts,resources.ts,chats.ts,conversations.ts}
- [ ] T013 [P] Create mock API clients in src/services/api/mock/{items.ts,resources.ts,chats.ts,conversations.ts}
- [ ] T014 Define types from OpenAPI in src/types/contracts.ts (derive interfaces for Item, Recurso, Chat, Conversa)
- [ ] T015 Setup encrypt-storage in src/services/auth/storage.ts (key: auth_token)
- [ ] T016 Create Zustand stores: src/store/{auth.ts,ui.ts,settings.ts}
- [ ] T017 [P] Theme provider and tokens in src/theme/{index.tsx,themes.ts} with ids oraculo-lunar/oraculo-sombras
- [ ] T018 [P] App shell layout using HeroUI in src/components/layout/AppShell.tsx (header/sidebar, slots)
- [ ] T019 Route guards in src/routes/guards/RequireAuth.tsx (redirect to /login when no token)
- [ ] T020 Public/private routes in src/routes/paths.ts and wiring in src/routes/router.tsx
- [ ] T021 Global toasts/snackbars and error boundary in src/components/feedback/{Toaster.tsx,ErrorBoundary.tsx}
- [ ] T022 Accessibility baseline (focus ring, skip links) in src/components/a11y/{SkipToContent.tsx}

## Phase 3 — [US1] Página de Login comunica proposta (P1)

Goal: Página pública /login com mensagem de valor clara, visual místico e CTA; validação com Yup; login real; redirect pós-login.
Independent test: Usuários entendem a proposta em 10s; submissão válida leva ao Dashboard; inválida mostra erros claros.

- [ ] T023 [US1] Create src/features/auth/pages/LoginPage.tsx (HeroUI form, brand copy, CTA)
- [ ] T024 [US1] Yup schema in src/features/auth/validation/login.schema.ts
- [ ] T025 [US1] Auth service login() using POST /auth/login in src/services/api/real/auth.ts
- [ ] T026 [US1] On success, save token via encrypt-storage and update auth store (src/store/auth.ts)
- [ ] T027 [US1] Route /login public in src/routes/router.tsx; link guards redirect to dashboard after login
- [ ] T028 [US1] Visual: background/illustration using assets/ and brand colors; ensure contrast

## Phase 4 — [US2] Seleção e aplicação de tema (P1)

Goal: Alternar entre oraculo-lunar (padrão) e oraculo-sombras; preview instantâneo; persistência; respeito a reduzir movimento.
Independent test: Alternância em <10s com efeito imediato; preferência persiste em reload.

- [ ] T029 [P] [US2] Theme settings page in src/features/settings/pages/ThemeSettings.tsx (toggle + preview)
- [ ] T030 [US2] Persist theme selection in settings store and local storage
- [ ] T031 [US2] Apply theme across app via ThemeProvider (src/theme/index.tsx)
- [ ] T032 [US2] Honor prefers-reduced-motion in animations (src/theme/themes.ts)

## Phase 5 — [US3] Autenticação e navegação com feedback (P2)

Goal: Fluxo de login/cadastro simples (cadastro pode ser adiado); pós-login direciona Dashboard; erros claros.
Independent test: Login válido redireciona; inválido mostra mensagens; loading states visíveis.

- [ ] T033 [US3] Implement RequireAuth guard and redirect behavior (src/routes/guards/RequireAuth.tsx)
- [ ] T034 [US3] Add logout action clearing encrypt-storage and store (src/store/auth.ts)
- [ ] T035 [US3] Loading/disabled states on login form (src/features/auth/pages/LoginPage.tsx)

## Phase 6 — [US4] Dashboard: lista, busca, paginação, detalhes (P2)

Goal: Exibir itens de API mock com paginação e busca; modal de detalhes ao clicar.
Independent test: Buscar por termo; navegar páginas; abrir modal com detalhes; estados vazios e erro informativos.

- [ ] T036 [US4] Items service: list/get in src/services/api/{real,mock}/items.ts
- [ ] T037 [P] [US4] Dashboard page in src/features/dashboard/pages/DashboardPage.tsx (layout + header)
- [ ] T038 [P] [US4] ItemList component with React Query, search and pagination in src/features/dashboard/components/ItemList.tsx
- [ ] T039 [US4] ItemModal component for details in src/features/dashboard/components/ItemModal.tsx
- [ ] T040 [US4] useQueryParams hook for page/search in src/hooks/useQueryParams.ts

## Phase 7 — [US5] Chat IA: múltiplos chats e conversas (P2)

Goal: Selecionar chat, listar conversas, criar/renomear/deletar conversas; trocar chat atualiza lista.
Independent test: Trocar chat muda conversas; criar/renomear/deletar reflete imediatamente; UX clara.

- [ ] T041 [US5] Chat services in src/services/api/{real,mock}/chats.ts and conversations.ts
- [ ] T042 [P] [US5] ChatPage in src/features/chat/pages/ChatPage.tsx
- [ ] T043 [P] [US5] ChatList component in src/features/chat/components/ChatList.tsx
- [ ] T044 [US5] ConversationList component with CRUD in src/features/chat/components/ConversationList.tsx

## Phase 8 — [US6] Recursos & Avaliação (P2)

Goal: Listar recursos com filtros (avaliado/search) e avaliar item (POST /resources/{id}/evaluate); representação temática.
Independent test: Filtro por status e busca; registrar avaliação; feedback claro em sucesso/erro.

- [ ] T045 [US6] Resources service in src/services/api/{real,mock}/resources.ts
- [ ] T046 [P] [US6] ResourcesPage in src/features/resources/pages/ResourcesPage.tsx
- [ ] T047 [US6] ResourceList with filters and pagination in src/features/resources/components/ResourceList.tsx
- [ ] T048 [US6] Evaluate action UI in src/features/resources/components/EvaluateButton.tsx

## Phase 9 — [US7] Configurações: Perfil, Notificações, Segurança, Chat IA (P2)

Goal: Abas de configurações; salvar preferências; listar/encerrar sessões (UI baseada no backend n8n); configs de chat IA.
Independent test: Alterar cada aba e persistir; encerrar sessão remove da lista; mensagens claras.

- [ ] T049 [US7] Settings layout with tabs in src/features/settings/pages/SettingsPage.tsx
- [ ] T050 [P] [US7] Perfil form in src/features/settings/components/ProfileForm.tsx
- [ ] T051 [P] [US7] Notificações form in src/features/settings/components/NotificationsForm.tsx
- [ ] T052 [P] [US7] Segurança (sessões) UI in src/features/settings/components/SessionsPanel.tsx
- [ ] T053 [US7] Chat IA preferences in src/features/settings/components/ChatPreferences.tsx

## Final Phase — Polish & Cross-Cutting

- [ ] T054 A11y: keyboard navigation, focus outlines, aria-labels across components
- [ ] T055 Error/empty/loading states standardized components in src/components/feedback/*
- [ ] T056 Use assets: favicon and logo from /assets in index.html and layout header
- [ ] T057 404 and fallback routes in src/routes/router.tsx
- [ ] T058 Performance: memoization and suspense where applicable; respect prefers-reduced-motion
- [ ] T059 Documentation: update quickstart.md with actual commands and env usage

## Dependencies (story order)

1) US1 → 2) US2 → 3) US3 → 4) US4 → 5) US5 → 6) US6 → 7) US7
- Foundational Phase must complete before US phases
- US4/US5/US6 can run partially in parallel once foundational is ready

## Parallel execution examples

- Example A: T037 [US4], T042 [US5], T046 [US6] in parallel (different features)
- Example B: T012 real clients and T013 mock clients in parallel
- Example C: T017 theme and T018 layout in parallel

## Implementation strategy

- MVP slice: US1 (Login page with real auth and brand communication) + basics of US3 (guard + redirect)
- Incremental delivery: US2 (Themes) → US4 (Dashboard) → US5 (Chat) → US6 (Resources) → US7 (Settings)

