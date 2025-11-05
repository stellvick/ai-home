# Feature Specification: Oráculo IA — Branding, UI e Temas

**Feature Branch**: `001-oracle-branding-ux`  
**Created**: 2025-11-05  
**Status**: Draft  
**Input**: Descrição do usuário (resumo): Branding e voz da marca, identidade visual (paleta/ tipografia), estrutura e páginas do website em dark mode, diretrizes de UX/UI e motion, dois temas visuais, e página de configurações (perfil, tema, notificações, segurança, chat IA).

## Clarifications

### Session 2025-11-05

- Q: Perfis de usuário no MVP? → A: C — apenas página de login pública (app fechado); demais páginas requerem autenticação.

## User Scenarios & Testing

### User Story 1 - Compreender a proposta na página de Login (Priority: P1)

Como visitante, quero acessar a página de Login e entender de forma sucinta a proposta de valor do Oráculo IA, com visual místico e CTA claro para criar conta ou entrar, para decidir avançar.

**Why this priority**: A primeira impressão define confiança e continuidade de navegação.

**Independent Test**: Exibir a página de Login a usuários-alvo; validar se conseguem explicar a proposta em até 10 segundos após o carregamento.

**Acceptance Scenarios**:

1. Given que o usuário acessa a página de Login, When o conteúdo acima da dobra carrega, Then a mensagem principal e call-to-action (entrar/criar conta) ficam visíveis e legíveis com contraste adequado.
2. Given que o usuário rola a página (se aplicável), When seções adicionais aparecem, Then animações leves não prejudicam legibilidade nem performance.

---

### User Story 2 - Selecionar e aplicar um tema visual (Priority: P1)

Como usuário, quero alternar entre dois temas visuais oficiais e pré-visualizar instantaneamente, para personalizar minha experiência.

**Why this priority**: O tema é parte central da identidade e da imersão proposta.

**Independent Test**: Acessar Configurações > Tema; alternar entre os dois temas; confirmar que a aplicação atualiza visualmente sem recarregar página e preferência persiste.

**Acceptance Scenarios**:

1. Given que o usuário está em Configurações, When alterna o tema, Then a interface reflete o tema selecionado em todas as páginas atuais.
2. Given que o usuário retorna mais tarde, When reabre a aplicação, Then o tema escolhido permanece aplicado.

---

### User Story 3 - Entrar e navegar com feedback claro (Priority: P2)

Como usuário, quero me cadastrar/entrar de forma simples com feedback claro e, após autenticado, acessar o Dashboard para ver recursos e próximos passos.

**Why this priority**: Fluxos de entrada são críticos para adoção; precisam ser rápidos e confiáveis.

**Independent Test**: Completar cadastro/entrada com dados válidos; validar mensagens de erro amigáveis para entradas inválidas; checar redirecionamento ao Dashboard.

**Acceptance Scenarios**:

1. Given formulário válido, When envio, Then recebo confirmação e sou encaminhado ao Dashboard em até 3 segundos percebidos.
2. Given entradas inválidas, When envio, Then mensagens explicam claramente o erro e como corrigir.

---

### User Story 4 - Ajustar preferências e segurança (Priority: P2)

Como usuário, quero editar perfil, notificações, segurança e preferências do chat IA, para adaptar o produto às minhas necessidades.

**Why this priority**: Configurações são essenciais para controle e confiança.

**Independent Test**: Alterar cada aba de Configurações, salvar e verificar persistência e efeito imediato quando aplicável.

**Acceptance Scenarios**:

1. Given mudanças em Notificações, When salvo, Then preferências são persistidas e refletidas em comunicações futuras.
2. Given sessões ativas, When encerro uma sessão, Then ela deixa de constar na lista e não mantém acesso.

### Edge Cases

- Preferência de “reduzir movimento” do sistema: animações devem suavizar/desabilitar sem perda de contexto.
- Ambientes de baixo contraste/iluminação: textos e ícones mantêm contraste mínimo recomendado.
- Dispositivos de baixo desempenho: efeitos visuais não degradam interação (entrada de dados/navegação permanece fluida).
- Navegação apenas por teclado e uso de leitores de tela: foco visível, ordem lógica e rótulos acessíveis.
- Pré-visualização de tema: alterações não persistem até confirmação explícita.

## Requirements (mandatory)

### Functional Requirements

- FR-001: A marca e tom de voz devem ser aplicados de forma consistente em textos, títulos e mensagens-chave em todas as páginas principais.
 - FR-002: A primeira tela pública (Login/Cadastro) deve comunicar proposta de valor de forma clara acima da dobra, com call-to-action destacado e contraste adequado.
- FR-003: A navegação deve ser intuitiva com menu fixo, breadcrumbs em páginas internas e estados de foco/hover visíveis.
- FR-004: O fluxo de cadastro/entrada deve ser simples, com mensagens de erro claras e feedback de progresso; após sucesso, direcionar ao Dashboard.
- FR-005: Após autenticação, o usuário deve ver um Dashboard com visão geral e atalhos para áreas-chave.
- FR-006: A listagem de recursos deve oferecer filtros básicos e uma forma temática de avaliação (ícones/símbolos) sem ambiguidade.
- FR-007: Deve haver uma página de chat com IA que permita múltiplas conversas, histórico opcional e avatar temático.
- FR-008: A página de Configurações deve conter abas: Perfil (nome, avatar, biografia), Tema Visual (alternância entre dois temas oficiais com preview), Notificações (tipos e canais), Segurança (listar/encerrar sessões, renovar acesso), Chat IA (tom, modelo/nome e histórico on/off).
- FR-009: Preferências de Tema e Configurações devem persistir entre sessões do usuário.
- FR-010: A identidade visual deve seguir paleta de cores e diretrizes tipográficas coerentes com a marca.
- FR-011: Animações devem ser suaves, discretas e com modo reduzido, respeitando preferências de acessibilidade do sistema.
- FR-012: A interface deve ser responsiva, adaptando layout e navegação a tamanhos de tela móveis e desktop.
- FR-013: Conteúdos e controles devem atingir contrastes mínimos conforme diretrizes de acessibilidade.
- FR-014: Ícones e símbolos temáticos devem apoiar compreensão, não substituir texto essencial.
- FR-015: Sessões do usuário devem ser seguras e permitir encerramento manual de dispositivos/sessões listadas.
- FR-016: Integrações de dados (cadastro/listagem/avaliação) devem operar por meio de um serviço externo definido, com mensagens de erro amigáveis em caso de indisponibilidade.
 - FR-017: MVP inclui as páginas: Home (autenticada), Login/Cadastro (pública), Dashboard, Configurações e Chat IA. Somente Login/Cadastro é público; demais páginas requerem autenticação.
 - FR-018: Autenticação padrão por email/senha nesta entrega, sem 2FA ou login social.
 - FR-019: Tema padrão na primeira execução é "Oráculo Lunar"; ao primeiro acesso, exibir mensagem discreta informando o tema aplicado e como alterá-lo nas Configurações.

#### Acceptance Criteria por Requisito

- AC-001 (FR-001): Nas páginas Home, Login/Cadastro, Dashboard, Configurações e Chat, textos e títulos seguem voz e mensagens-chave aprovadas; revisão identifica 0 inconsistências críticas.
 - AC-002 (FR-002): Na página de Login/Cadastro, conteúdo acima da dobra contém headline de proposta de valor e CTA principal; contraste texto/plano de fundo atende diretriz mínima; CTA é navegável por teclado.
- AC-003 (FR-003): Menu fixo visível em telas desktop e acessível em mobile; breadcrumbs presentes em páginas internas; foco visível e ordem lógica por tab.
- AC-004 (FR-004): Formulários de login/cadastro validam campos obrigatórios com mensagens claras; em submissão válida, usuário é direcionado ao Dashboard; em erro, feedback não técnico orienta correção.
- AC-005 (FR-005): Após autenticação, Dashboard exibe pelo menos: saudação, atalhos para páginas principais e indicadores resumidos.
- AC-006 (FR-006): Listagem de recursos permite filtrar por ao menos um critério; avaliação é registrada com representação temática inequívoca; estado vazio oferece instrução clara.
- AC-007 (FR-007): Página de chat permite criar múltiplas conversas; usuário visualiza histórico (quando habilitado) e avatar temático; envio e exibição têm feedback de estado.
- AC-008 (FR-008): Configurações possuem abas Perfil, Tema Visual, Notificações, Segurança e Chat IA; cada aba salva preferências com confirmação visual.
- AC-009 (FR-009): Preferências persistem após fechar e reabrir a aplicação; teste de reabertura confirma valores mantidos.
- AC-010 (FR-010): Paleta e tipografia aplicadas conforme diretrizes; contrastes respeitam padrões definidos; variações de peso/tamanho mantêm legibilidade.
- AC-011 (FR-011): Animações utilizam duração/atenuação suaves; quando a preferência do sistema for reduzir movimento, animações são minimizadas/desativadas.
- AC-012 (FR-012): Layout se adapta corretamente em viewport mobile (≤ 768px) e desktop (≥ 1024px); componentes não transbordam e permanecem utilizáveis.
- AC-013 (FR-013): Verificação de contraste para texto essencial atinge nível mínimo equivalente ao AA; estados de foco/erro também atendem contraste mínimo.
- AC-014 (FR-014): Ícones e símbolos possuem rótulos/texto de apoio; nenhum conteúdo essencial depende exclusivamente de iconografia.
- AC-015 (FR-015): Página de Segurança lista sessões ativas; ação de encerrar remove sessão da listagem e impede novo acesso sem reautenticação.
- AC-016 (FR-016): Em indisponibilidade do serviço externo, interface exibe mensagem amigável e opção de tentar novamente; aplicação permanece responsiva.
 - AC-017 (FR-017): Build de MVP inclui e torna navegáveis as 5 páginas definidas; Login/Cadastro é acessível sem autenticação; tentativas de acesso às demais páginas redirecionam para Login.
- AC-018 (FR-018): Somente fluxo de email/senha está disponível; UI não apresenta opções de 2FA ou login social nesta entrega.
- AC-019 (FR-019): Primeiro acesso aplica "Oráculo Lunar" por padrão; usuário vê mensagem discreta indicando o tema e caminho para alterar (Configurações > Tema Visual).

### Key Entities

- TemaVisual: nome, paleta (cores primárias/secundárias/realces), diretrizes tipográficas, regras de animação.
- PerfilUsuario: nome, avatar, biografia curta.
- PreferenciaNotificacao: tipos (sistema/produto), canais (email/SMS/push), status por tipo.
- ConfigChatIA: tom, identificação do modelo (rótulo), histórico habilitado/limpar.
- Sessao: lista de sessões ativas, criação, expiração, encerramento manual.
- Recurso e Avaliacao: item cadastrável/avaliável e suas avaliações temáticas (alto nível; sem detalhes técnicos).

## Success Criteria (mandatory)

### Measurable Outcomes

- SC-001: 90% dos usuários entendem a proposta de valor na Home em até 10 segundos (teste moderado de usabilidade).
- SC-002: 95% dos usuários conseguem alternar o tema e confirmar a mudança em menos de 10 segundos, percebendo atualização imediata.
- SC-003: 90% completam cadastro/entrada em até 1 minuto com feedback claro e sem ajuda.
- SC-004: Todo texto essencial atende critérios de contraste equivalentes ao nível AA de acessibilidade.
- SC-005: Usuários com preferência de reduzir movimento não percebem efeitos que causem desconforto; 100% das animações reduzidas/desativadas nesse modo.
- SC-006: Em dispositivos móveis típicos, conteúdo principal da Home é percebido como carregado rapidamente (≈ até 3 segundos) por pelo menos 85% dos participantes em testes.
- SC-007: Satisfação média ≥ 4/5 nas áreas de Tema, Navegação e Feedback das interações nas primeiras avaliações com usuários.
