# Phase 0 Research — Oráculo IA — Branding, UI e Temas

## Unknowns and Decisions

1) Environment variables (mock vs real)
- Decision: Use VITE_USE_MOCK (true|false) and VITE_API_BASE_URL
- Rationale: Simples, padrão em Vite; permite trocar backend n8n sem rebuild.
- Alternatives: Single VITE_API_MODE=mock|real (rejeitado por menor clareza de URL base).

2) Pagination defaults
- Decision: Default pageSize=20; max=100; page starts at 1
- Rationale: 20 equilibra densidade/legibilidade; limites evitam respostas muito grandes.
- Alternatives: 10 (mais cliques), 50 (carga visual maior em mobile).

3) Filter fields for listings
- Decision: Search por título e descrição (case-insensitive); filtros adicionais opcionais por status (avaliado: true/false)
- Rationale: Reflete necessidades iniciais (avaliação) e simplicidade.
- Alternatives: Campos dinâmicos por entidade (complexidade inicial maior).

4) Theme identifiers
- Decision: Theme ids: oraculo-lunar (default), oraculo-sombras
- Rationale: Coerente com spec; nomes estáveis em storage e CSS tokens.
- Alternatives: En-US names; rejeitado por desalinhamento de branding local.

5) Token usage and header
- Decision: Header Authorization: Bearer <token>; storage key: auth_token
- Rationale: Convencional; compatível com serviços típicos; fácil integração n8n.
- Alternatives: Cookies; rejeitado por escopo frontend-only e simplicidade.

6) Error handling baseline
- Decision: Mensagens amigáveis (não técnicas); retry com backoff simples; estados empty e loading explícitos
- Rationale: Alinha-se à UX do spec e à constituição.
- Alternatives: Silenciar detalhes; rejeitado (baixa clareza ao usuário).

7) Images usage
- Decision: Usar favicon e logo do diretório /assets; nomes definidos durante implementação (ex.: favicon.ico, logo.svg)
- Rationale: Constituição exige; filenames podem variar; plano permite ajuste.
- Alternatives: Baixar imagens externas; rejeitado por independência do repo.

## Consolidated Decisions

- Env: VITE_USE_MOCK, VITE_API_BASE_URL
- Pagination: page=1, pageSize=20, max=100
- Search: título e descrição; filtro status (avaliado)
- Themes: oraculo-lunar (default), oraculo-sombras
- Auth: Authorization: Bearer, storage key auth_token
- UX states: loading/empty/errors definidos
- Imagens: usar /assets (favicon, logo)
