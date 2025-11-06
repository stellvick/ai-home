# Data Model — IA Oracle

## Entities

### PerfilUsuario
- id (string)
- nome (string)
- avatarUrl (string, optional)
- bio (string, optional)

### PreferenciaNotificacao
- id (string)
- usuarioId (string)
- tipo ("sistema" | "produto")
- canais ({ email?: boolean, sms?: boolean, push?: boolean })

### ConfigChatIA
- id (string)
- usuarioId (string)
- tom (string)
- modelo (string)  # rótulo amigável
- historicoHabilitado (boolean)

### Sessao
- id (string)
- usuarioId (string)
- criadoEm (datetime)
- expiraEm (datetime)
- ativo (boolean)

### TemaVisual
- id ("oraculo-lunar" | "oraculo-sombras")
- nome (string)
- paleta: { primario: string, secundario: string, realce: string, fundo: string, texto: string }
- tipografia: { titulo: string, texto: string }

### Recurso
- id (string)
- titulo (string)
- descricao (string)
- avaliado (boolean)

### Avaliacao
- id (string)
- recursoId (string)
- nota (number) # representação visual pode mapear para símbolos na UI
- comentario (string, optional)
- criadoEm (datetime)

### Chat
- id (string)
- nome (string)
- criadoEm (datetime)

### Conversa
- id (string)
- chatId (string)
- titulo (string)
- mensagens ([Mensagem])
- criadoEm (datetime)

### Mensagem
- id (string)
- conversaId (string)
- autor ("usuario" | "ia")
- conteudo (string)
- criadoEm (datetime)

## Relationships
- PerfilUsuario 1—N PreferenciaNotificacao
- PerfilUsuario 1—N ConfigChatIA (ou 1—1 efetivo por ativo)
- PerfilUsuario 1—N Sessao
- Recurso 1—N Avaliacao
- Chat 1—N Conversa; Conversa 1—N Mensagem

## Identity & Constraints
- id: UUIDs
- Uniqueness: Conversa.titulo único por chat (opcional)
- Pagination: padrão page=1, pageSize=20, max=100
- Soft limits: strings até 280 chars em títulos; 2k em descrições/comentários
