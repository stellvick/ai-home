# Implementation Plan: Oráculo IA — Branding, UI e Temas

**Branch**: `001-oracle-branding-ux` | **Date**: 2025-11-05 | **Spec**: specs/001-oracle-branding-ux/spec.md
**Input**: Feature specification from `/specs/001-oracle-branding-ux/spec.md`

## Summary

Frontend web (TypeScript + React 19, Vite, Tailwind 4, HeroUI) delivering: Login público (com validação Yup e autenticação simples com token em encrypt-storage), Dashboard com lista paginada e buscável (React Query + filtros), detalhes via modal, Chat IA multi-conversas, Configurações (Perfil, Tema, Notificações, Segurança, Chat). Dois temas oficiais (Oráculo Lunar padrão e Oráculo das Sombras) e UI/UX com estilo místico consistente (backgrounds gradientes, glassmorphism cards com bordas brand, elementos decorativos sutis). Integra com API (n8n) via variável de ambiente para alternar mock/real (mock inicialmente; login real).

## Technical Context

**Language/Version**: TypeScript (ES2023), React 19
**Primary Dependencies**: Vite, Tailwind 4 (via @tailwindcss/postcss), HeroUI, React Query, Yup, Zustand, encrypt-storage, react-use, lucide-react
**Storage**: Frontend-only; token seguro no encrypt-storage; preferências (tema, configs) persistidas no storage
**Testing**: Não requerido por constituição (manual/UX QA)
**Target Platform**: Navegadores modernos (desktop e mobile)
**Project Type**: Web SPA
**Performance Goals**:
- Perceptual load: conteúdo acima da dobra em ~3s em mobile típico
- Interações responsivas (<100ms percepção) e animações suaves; respeitar reduzir movimento
**Constraints**:
- Frontend-only; utilizar componentes HeroUI prioritariamente
- Alternância mock/real por ambiente
- Sessões gerenciadas pelo backend (n8n); frontend respeita expiração
**Scale/Scope**:
- MVP: Login (público), Dashboard, Configurações, Chat IA (autenticados)
- Lista com paginação (padrão 20 itens) e busca por título/descrição

NEEDS CLARIFICATION captured for Phase 0 research:
- Env vars finais (nomes): base URL e toggle de mock
- Page size padrão e limites de paginação
- Campos de filtro iniciais além de busca textual
- Naming canônico dos temas (ids)

## Constitution Check

Gate evaluation (pre-Phase 0): PASS
- Clean Code: previsto
- UI/UX moderno com HeroUI: previsto
- Frontend-only com stack definido: previsto
- Sem testes automatizados obrigatórios: compatível
- Objetividade e baixa complexidade: previsto

## Project Structure

### Documentation (this feature)

```text
specs/001-oracle-branding-ux/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/
```

### Source Code (repository root)

```text
src/
├── assets/                 # imagens e ícones (usa /assets do repo quando buildar)
├── components/             # UI reutilizável (HeroUI wrappers, MysticalBackground, MysticalCard)
├── features/
│   ├── auth/               # login, rotas protegidas, token storage
│   ├── dashboard/          # listagem, filtros, paginação, modal de detalhes
│   ├── chat/               # seleção de chat, conversas, CRUD
│   └── settings/           # perfil, tema, notificações, segurança, chat IA
├── hooks/                  # hooks personalizados (ex.: useAuth, useTheme, useQueryParams)
├── store/                  # Zustand stores (auth, ui, settings)
├── services/               # API clients (mock e real com mesmo contrato)
├── routes/                 # roteamento e guards
└── theme/                  # temas (tokens/cfg)
```

**Structure Decision**: SPA única; camadas separadas por feature + serviços e estado global com Zustand; contratos orientam clients mock/real.

## Complexity Tracking

N/A — nenhuma violação prevista.
