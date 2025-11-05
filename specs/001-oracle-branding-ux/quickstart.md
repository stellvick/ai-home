# Quickstart — Oráculo IA (Frontend SPA)

## Requisitos
- Node 18+
- Navegador moderno

## Variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto (Vite lê `VITE_`):

```
VITE_USE_MOCK=true
VITE_API_BASE_URL=https://n8n.example.com/api # ajuste quando usar real
```

- Login usa backend real. Se `VITE_USE_MOCK=true`, demais rotas usam mocks compatíveis com os contratos (`specs/001-oracle-branding-ux/contracts/openapi.yaml`).

## Instalação do stack
- Tailwind 4 via PostCSS: instale `@tailwindcss/postcss` em vez de `tailwindcss` como plugin PostCSS.
- HeroUI: siga a documentação oficial.

Referências:
- HeroUI intro: https://www.heroui.com/docs/guide/introduction
- HeroUI instalação: https://www.heroui.com/docs/guide/installation
- HeroUI componentes: https://www.heroui.com/docs/components/accordion
- Theme: https://www.heroui.com/docs/customization/theme
- Tailwind PostCSS plugin: `@tailwindcss/postcss`

## Estrutura sugerida (src/)
- `features/auth`: login, guards, encrypt-storage
- `features/dashboard`: lista, filtros, paginação, modal
- `features/chat`: chats e conversas
- `features/settings`: perfil, tema, notificações, segurança, chat IA
- `services`: API (mock/real) alinhada ao OpenAPI
- `store`: Zustand (auth/ui/settings)
- `theme`: temas `oraculo-lunar` (padrão) e `oraculo-sombras`

## Convenções
- Header de autenticação: `Authorization: Bearer <token>`
- Page params: `page` (1..N), `pageSize` (default 20, max 100)
- Busca: `search` (título/descrição); filtro: `avaliado`

## Rodando (exemplo)
1. Instale dependências do projeto (package.json existente/atualizar conforme necessário)
2. Execute dev server (Vite)
3. Acesse a página de Login (pública); demais rotas exigem autenticação

Observação: Imagens do site (favicon, logo) devem ser servidas a partir de `/assets` conforme a constituição.
