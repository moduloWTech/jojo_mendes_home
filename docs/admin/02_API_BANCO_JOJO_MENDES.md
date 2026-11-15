# JOJO MENDES — ESPECIFICAÇÃO DA API, BANCO E ARMAZENAMENTO

**Versão:** 1.0  
**Data:** 15/11/2026  
**Status:** especificação de implementação (MVP)  
**Aplicação:** `apps/api` — Node.js + Fastify + TypeScript + Prisma + PostgreSQL (Supabase)  
**Documento complementar:** `01_FRONTEND_ADMIN_JOJO_MENDES.md`

> **Objetivo:** API REST única que entrega conteúdo publicado ao site público (Next.js) e permite a usuários administradores autorizados gerenciar shows, álbuns/fotos, vídeos do YouTube e versões da Hero. O projeto preserva a separação entre experiência pública e operações administrativas.

## 1. Arquitetura e responsabilidades

```text
┌───────────────────────┐      ┌────────────────────────┐
│ Site público Next.js  │      │ Admin Vite + React     │
│ conteúdo publicado    │      │ autenticação Supabase  │
└──────────┬────────────┘      └───────────┬────────────┘
           │ GET /v1/public/*              │ Bearer JWT + /v1/admin/*
           └─────────────┬─────────────────┘
                         ▼
               ┌──────────────────────┐
               │ Fastify REST API     │
               │ Zod + políticas auth │
               │ serviços + Prisma    │
               └───────┬───────┬──────┘
                       │       │
                  ┌────▼───┐ ┌─▼─────────────────┐
                  │Postgres│ │Supabase Storage    │
                  │Supabase│ │mídias do projeto   │
                  └────────┘ └───────────────────┘
                         │
                         └── evento após publicação → endpoint secreto
                             Next.js /api/internal/revalidate
```

- **Fastify é autoridade de autorização e regras de negócio**. Validar identidade (Supabase Auth) **e** permissão de administrador no banco.
- **Prisma é o único ORM de acesso às tabelas de negócio**. O frontend nunca conecta diretamente no banco.
- **Storage guarda bytes**, PostgreSQL guarda chaves, estados, referências, metadados, ordem e auditoria.
- **Next.js** consome apenas endpoints públicos e pode ter cache por tags; a API aciona revalidação após publicação.
- **Site público nunca recebe rascunhos nem URLs de acesso privado ao painel**.
- Tratar um único administrador no MVP, mas permitir cadastrar outro por processo operacional seguro, sem tela de cadastro público.

## 2. Stack e convenções

| Item | Escolha |
|---|---|
| Runtime | Node.js LTS suportado |
| Servidor | Fastify + TypeScript strict |
| Validação | Zod, esquemas compartilhados no pacote `packages/contracts` |
| Banco | PostgreSQL do Supabase |
| Persistência | Prisma ORM + migrations versionadas |
| Login | Supabase Auth e-mail/senha, JWT validado no Fastify |
| Armazenamento | Supabase Storage; chave secreta somente no servidor |
| Logs | Logger nativo Pino do Fastify com mascaramento |
| Testes | Vitest + `fastify.inject`; integração com banco de testes |
| OpenAPI | Geração a partir de schemas quando possível; `/docs` somente ambiente autorizado |

**Não instalar serviços de fila, Redis ou mensageria agora.** Revalidação com retry simples/outbox persistida se necessário; implementar apenas a complexidade justificada pelos requisitos.

## 3. Convenções REST

- Prefixo `/v1`.
- Admin: `/v1/admin/*` protegido; público: `/v1/public/*` leitura, sem sessão.
- JSON em camelCase; IDs UUID; instantes UTC ISO 8601; timezone IANA armazenada em cada show.
- Paginação: `?page=1&pageSize=20`, máximo `pageSize=100`.
- Lista padrão: `{ "data": [...], "meta": { "page": 1, "pageSize": 20, "total": 53 } }`.
- Item: `{ "data": { ... } }`.
- Erro: `{ "error": { "code": "VALIDATION_ERROR", "message": "...", "details": [], "requestId": "..." } }`.
- Usar `ETag`/`version` ou controle otimista por `updatedAt`/`version` para mutações críticas; versão de linha inteira é recomendada para evitar sobrescrita silenciosa.
- Toda rota que altera conteúdo valida schema, autenticação, permissão e estado atual.
- Aceitar `Idempotency-Key` em criação e confirmação de uploads, com armazenamento de chave e resultado por tempo configurado para evitar duplicidade por retry.

## 4. Autenticação e autorização

### 4.1 Login

O painel usa Supabase Auth via SDK. **A API não recebe nem armazena a senha.** Recebe `Authorization: Bearer <JWT>` em cada requisição admin.

### 4.2 Verificação na API

1. Exigir token presente.
2. Verificar **assinatura criptográfica**, emissor, audiência, expiração e algoritmo de acordo com configuração do projeto Supabase. Usar `supabase.auth.getClaims(token)` ou JWKS e biblioteca mantida, não apenas decodificar JWT.
3. Extrair `sub` como ID de usuário Supabase.
4. Consultar `AdminUser` por `authUserId`, com `active=true`. Falha retorna `403`.
5. Adicionar `request.admin = { id, authUserId, role }` ao contexto tipado do Fastify.
6. Enforce `role=OWNER` ou `ADMIN` nas rotas administrativas; `OWNER` reservado para futuras operações de conta.

Para invalidação imediata de conta, a checagem de `AdminUser.active` é obrigatória em cada requisição; para revogação completa de sessão siga política do provedor. Token com assinatura válida não significa autorização administrativa.

### 4.3 Bootstrap inicial

- Criar conta manualmente no painel de autenticação do Supabase/convite administrativo seguro.
- Inserir `AdminUser` via script CLI restrito usando o `authUserId` correto.
- **Desabilitar criação pública de contas** e restringir provedores de login conforme necessidade.
- MFA recomendado. Usar rate limit no login do provedor e nas rotas de API; nunca enviar senha para logs.

### 4.4 CORS e segurança HTTP

- CORS allowlist explícita para domínio do admin e domínio público; sem `*` para rotas autenticadas.
- HTTPS obrigatório em produção; `@fastify/helmet`, rate limit e limites de payload.
- Nunca expor `SUPABASE_SECRET_KEY`/`service_role`, DATABASE_URL ou segredo de revalidação ao navegador.
- Verificar `Content-Type`, não confiar em MIME enviado pelo cliente; evitar SVG executável como upload no MVP.
- Aplicar limites de recursos e proteção contra SSRF em qualquer consulta externa a metadados do YouTube: preferir parse de URL sem fetch arbitrário.

## 5. Modelagem de dados — fonte de verdade

### 5.1 Enums

```text
Role: OWNER, ADMIN
PublicationStatus: DRAFT, PUBLISHED, ARCHIVED
ShowStatus: SCHEDULED, POSTPONED, CANCELLED
MediaKind: IMAGE, VIDEO
MediaStatus: PENDING, READY, FAILED, DELETED
UploadPurpose: GALLERY_IMAGE, SHOW_POSTER, HERO_DESKTOP_VIDEO,
               HERO_MOBILE_VIDEO, HERO_DESKTOP_POSTER, HERO_MOBILE_POSTER
HeroVersionStatus: DRAFT, PUBLISHED, ARCHIVED
```

**Separar estado editorial de estado do show.** Ex.: um show `PUBLISHED + CANCELLED` deve permanecer público com etiqueta “Cancelado”, e não simplesmente desaparecer.

### 5.2 Entidades e campos

**`AdminUser`**
- `id UUID pk`, `authUserId String @unique`, `displayName String`, `role Role default OWNER`, `active Boolean default true`, `createdAt`, `updatedAt`.
- Credenciais e hashes de senha ficam em Supabase Auth, **nunca nesta tabela**.

**`Show`**
- `id UUID pk`, `title String`, `description String?`, `startsAt DateTime` (UTC), `timeZone String` (IANA), `city String`, `region String`, `venue String`, `ticketUrl String?`, `posterMediaId UUID?`, `publicationStatus PublicationStatus default DRAFT`, `showStatus ShowStatus default SCHEDULED`, `version Int default 1`, `publishedAt DateTime?`, `archivedAt DateTime?`, `createdAt`, `updatedAt`.
- Índices: `(publicationStatus, startsAt)`, `(showStatus, startsAt)`.

**`GalleryAlbum`**
- `id UUID pk`, `title String`, `description String?`, `coverPhotoId UUID?` (referência lógica validada no serviço para evitar ciclo), `sortOrder Int default 0`, `publicationStatus PublicationStatus default DRAFT`, `publishedAt?`, `archivedAt?`, `createdAt`, `updatedAt`, `version Int`.

**`GalleryPhoto`**
- `id UUID pk`, `albumId UUID fk`, `mediaId UUID fk unique` (uma foto de galeria pertence a um álbum no MVP), `altText String`, `caption String?`, `sortOrder Int default 0`, `publicationStatus PublicationStatus default DRAFT`, `archivedAt?`, `createdAt`, `updatedAt`, `version Int`.
- Índice `(albumId, publicationStatus, sortOrder)`.

**`Video`**
- `id UUID pk`, `youtubeVideoId String`, `title String`, `description String?`, `sortOrder Int default 0`, `publicationStatus PublicationStatus default DRAFT`, `publishedAt?`, `archivedAt?`, `createdAt`, `updatedAt`, `version Int`.
- `youtubeVideoId` restringido a padrão ID YouTube de 11 caracteres, sem armazenar iframe HTML. Evitar duplicata de IDs ativos com validação e índice de unicidade se a regra do produto exigir.

**`MediaAsset`**
- `id UUID pk`, `kind MediaKind`, `purpose UploadPurpose`, `bucket String`, `storagePath String @unique`, `mimeType String`, `originalFileName String`, `sizeBytes BigInt`, `width Int?`, `height Int?`, `durationSeconds Float?`, `checksum String?`, `status MediaStatus default PENDING`, `uploadedByAdminId UUID`, `createdAt`, `readyAt?`, `deletedAt?`.
- Referência persistente é `bucket + storagePath`, **não URL pública mutável**. Para exibição pública, gerar URL apropriada apenas para mídia publicada.

**`HeroVersion`**
- `id UUID pk`, `desktopVideoMediaId UUID`, `mobileVideoMediaId UUID`, `desktopPosterMediaId UUID`, `mobilePosterMediaId UUID`, `status HeroVersionStatus`, `revision Int @unique`, `createdByAdminId UUID`, `createdAt`, `publishedAt?`.
- Links para `MediaAsset` do tipo/purpose esperado em estado `READY`.

**`SiteSettings`**
- `id String pk` singleton (`main`), `activeHeroVersionId UUID?`, `updatedAt`, `version Int`.
- Troca de Hero dentro de **transação de banco**: alterar versão publicada e ponteiro ativo; preservar versão anterior para rollback. Se não houver Hero ativa, site público usa fallback definido pelo design system, nunca tela quebrada.

**`UploadSession`**
- `id UUID pk`, `createdByAdminId UUID`, `purpose UploadPurpose`, `bucket`, `storagePath`, `mimeType`, `maxSizeBytes BigInt`, `status PENDING/COMPLETED/ABORTED/EXPIRED`, `expiresAt`, `createdAt`, `completedAt?`, `idempotencyKey String?`.
- Somente uploads autorizados e confirmados se tornam mídias disponíveis.

**`AuditLog`**
- `id UUID pk`, `actorAdminId UUID?`, `action String`, `entityType String`, `entityId String`, `beforeJson Json?`, `afterJson Json?`, `requestId String`, `createdAt`.
- Remover tokens, segredos e informações pessoais desnecessárias dos snapshots.

**`PublishOutbox`** (recomendado para consistência da sincronização)
- `id UUID pk`, `resource String`, `resourceId String?`, `status PENDING/DELIVERED/FAILED`, `attempts Int`, `nextAttemptAt DateTime?`, `lastError String?`, `createdAt`, `deliveredAt?`.
- Gravar na mesma transação que a publicação, enviar revalidação após commit e reexecutar em falhas. Worker simples pode rodar cron job controlado, sem fila externa.

### 5.3 Regras relacionais e integridade

- `Show.posterMediaId` opcional; apenas imagens `READY`.
- Fotos visíveis: álbum `PUBLISHED` **e** foto `PUBLISHED` **e** mídia `READY`.
- Vídeos visíveis: `PUBLISHED`.
- Hero ativa: `SiteSettings.activeHeroVersionId` aponta para uma versão `PUBLISHED` com todos os assets `READY`.
- Arquivamento não remove arquivo físico automaticamente; remoção física apenas após retenção e verificação de referências.
- Todas as gravações críticas usam `version` para concorrência otimista (`409` se mudou).

> **Prisma:** implementar estes modelos no `schema.prisma`, com índices, constraints e enums correspondentes, usando migrações versionadas. A lista acima é contrato de domínio e evita impor sintaxe Prisma suscetível a diferenças entre versões maiores. Gerar o schema real com a versão instalada e adicionar testes de integridade.

## 6. Contratos de endpoints públicos

| Método | Rota | Resposta |
|---|---|---|
| GET | `/v1/public/shows?scope=upcoming&page=1&pageSize=20` | Shows `PUBLISHED`, ordenados cronologicamente, incluindo cancelados/adiados com status explícito |
| GET | `/v1/public/shows/:id` | Show público ou `404` |
| GET | `/v1/public/albums?page=1&pageSize=20` | Álbuns publicados, com capa |
| GET | `/v1/public/albums/:id/photos?page=1&pageSize=30` | Fotos publicadas de álbum publicado |
| GET | `/v1/public/videos?page=1&pageSize=20` | Links/IDs publicados na ordem definida |
| GET | `/v1/public/hero` | Hero ativa com URLs de mídias autorizadas para exibição pública e posters; fallback se não existir |

`scope`: `upcoming` (default), `past`, `all`. A definição de “futuro” compara `startsAt` UTC com horário atual. O cliente público decide como exibir cancelados/adiados, não os omite silenciosamente. Respostas públicas contêm campos de apresentação, sem informações de auditoria, IDs internos de admins, paths privados ou tokens.

## 7. Contratos de endpoints admin

### 7.1 Identidade e Dashboard

| Método | Rota | Ação |
|---|---|---|
| GET | `/v1/admin/me` | Retornar `id`, `displayName`, `role` e `email` da conta autenticada (conforme identidade validada) |
| GET | `/v1/admin/dashboard` | Contagens publicadas/futuras, próximos 5 shows e status Hero |

### 7.2 Shows

| Método | Rota | Ação |
|---|---|---|
| GET | `/v1/admin/shows` | Lista com `q`, `status`, `scope`, `page`, `pageSize` |
| POST | `/v1/admin/shows` | Criar em `DRAFT` |
| GET | `/v1/admin/shows/:id` | Obter dados completos |
| PATCH | `/v1/admin/shows/:id` | Editar com `version` |
| POST | `/v1/admin/shows/:id/publish` | Validar e publicar |
| POST | `/v1/admin/shows/:id/unpublish` | Retornar a `DRAFT` |
| POST | `/v1/admin/shows/:id/archive` | Arquivar (exclusão lógica) |

Exemplo `POST /v1/admin/shows`:

```json
{
  "title": "Festival da Cidade",
  "description": "Apresentação ao vivo",
  "localDate": "2026-12-05",
  "localTime": "21:30",
  "timeZone": "America/Fortaleza",
  "city": "São Luís",
  "region": "MA",
  "venue": "Local a confirmar",
  "ticketUrl": null,
  "posterMediaId": null
}
```

O backend **converte** `localDate + localTime + timeZone` para `startsAt` UTC; rejeita horários ambíguos ou inexistentes em fusos com transição de horário de verão, em vez de deduzir silenciosamente. `PATCH` inclui `version` e campos modificados. Para cancelar/adiar um show, `PATCH` recebe `showStatus`; adiar também exige nova data/hora quando definida. Evento sem horário confirmado deve permanecer `DRAFT` até definição (MVP).

### 7.3 Álbuns e fotos

| Método | Rota | Ação |
|---|---|---|
| GET/POST | `/v1/admin/albums` | Listar/criar álbuns |
| GET/PATCH | `/v1/admin/albums/:id` | Obter/editar |
| POST | `/v1/admin/albums/:id/publish` | Publicar álbum |
| POST | `/v1/admin/albums/:id/archive` | Arquivar álbum |
| GET/POST | `/v1/admin/albums/:id/photos` | Listar/adicionar fotos `READY` ao álbum (inicialmente `DRAFT`) |
| PATCH | `/v1/admin/photos/:id` | Editar `altText`, `caption`, status e version |
| POST | `/v1/admin/photos/:id/archive` | Ocultar/arquivar foto |
| PUT | `/v1/admin/albums/:id/photo-order` | Reordenar lista de IDs, validando propriedade e duplicatas |

Publicação do álbum não publica automaticamente fotos em rascunho. Interface deve indicar quando álbum publicado não contém nenhuma foto pública. Alterar capa só se foto pertence ao álbum, está `READY` e pode ser exibida.

### 7.4 Vídeos do YouTube

| Método | Rota | Ação |
|---|---|---|
| GET/POST | `/v1/admin/videos` | Listar/criar vídeo em DRAFT |
| GET/PATCH | `/v1/admin/videos/:id` | Obter/editar |
| POST | `/v1/admin/videos/:id/publish` | Publicar |
| POST | `/v1/admin/videos/:id/unpublish` | Despublicar |
| POST | `/v1/admin/videos/:id/archive` | Arquivar |
| PUT | `/v1/admin/videos/order` | Reordenar IDs |

Exemplo de criação:

```json
{
  "youtubeUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "title": "Vídeo demonstrativo — substituir antes da publicação",
  "description": null
}
```

Aceitar apenas `youtube.com/watch?v=`, `youtu.be/ID`, `youtube.com/shorts/ID` e `youtube.com/embed/ID` com host verificado (sem aceitar subdomínios fraudulentos). Validar ID e construir embed seguro no cliente; links e conteúdo demonstrativos não são dados oficiais. Se verificar disponibilidade do vídeo, fazê-lo via API oficial autorizada; **não prometer verificação de disponibilidade apenas por sintaxe do ID**.

### 7.5 Hero

| Método | Rota | Ação |
|---|---|---|
| GET | `/v1/admin/hero` | Hero ativa e histórico de versões resumido |
| POST | `/v1/admin/hero/drafts` | Criar nova versão em DRAFT com 4 IDs de mídia |
| GET | `/v1/admin/hero/drafts/:id` | Obter rascunho |
| POST | `/v1/admin/hero/drafts/:id/publish` | Publicar atomicamente e alterar ponteiro ativo |
| POST | `/v1/admin/hero/versions/:id/restore` | Publicar novamente versão anterior válida |

Exemplo:

```json
{
  "desktopVideoMediaId": "<uuid>",
  "mobileVideoMediaId": "<uuid>",
  "desktopPosterMediaId": "<uuid>",
  "mobilePosterMediaId": "<uuid>"
}
```

Validações: quatro mídias `READY`, purpose correto, formato suportado, dimensões e proporções aceitáveis ou aviso de crop; teste de acesso do arquivo. Ao publicar, em uma transação: marcar versão anterior como `ARCHIVED` (histórico), nova `PUBLISHED`, atualizar `SiteSettings.activeHeroVersionId`, criar registro de auditoria e outbox. **Nunca desativar a Hero anterior antes de ter nova válida**.

### 7.6 Uploads (imagens/vídeos)

| Método | Rota | Ação |
|---|---|---|
| POST | `/v1/admin/uploads/authorize` | Validar finalidade/metadata, criar sessão e retornar upload assinado de curta duração |
| POST | `/v1/admin/uploads/:id/complete` | Verificar bytes efetivamente recebidos, tipo/tamanho real, registrar `MediaAsset READY` |
| POST | `/v1/admin/uploads/:id/abort` | Abortar sessão pendente e limpar arquivo temporário se existir |

Payload de autorização:

```json
{
  "purpose": "GALLERY_IMAGE",
  "fileName": "palco.jpg",
  "mimeType": "image/jpeg",
  "sizeBytes": 1536000
}
```

Resposta:

```json
{
  "data": {
    "uploadId": "<uuid>",
    "bucket": "jojo-media",
    "storagePath": "staging/<uuid>/palco.jpg",
    "method": "signed-standard",
    "upload": { "signedUrl": "<short-lived-url>", "token": "<short-lived-token>" },
    "expiresAt": "2026-11-15T16:00:00Z"
  }
}
```

**Contrato de transporte:** usar valores exatos retornados pelo SDK/server; o exemplo acima é ilustrativo. Para vídeos grandes, o backend pode retornar `method: "signed-resumable"`, com instruções específicas TUS. O admin interpreta `method`, não inventa a URL. Não permitir upsert/overwrite em caminho ativo; usar paths únicos e imutáveis.

### 7.7 Códigos HTTP

- `200` leitura/edição/ações com payload; `201` criação; `204` quando sem corpo.
- `400` dados malformados; `401` ausente/inválido/expirado; `403` autenticado sem autorização.
- `404` recurso não encontrado/indisponível; `409` conflito de versão/estado; `413` upload acima do limite; `415` arquivo não suportado; `422` falhas de campos/regras; `429` limite de requisições; `500` falha inesperada; `503` dependência indisponível.
- Nunca devolver stacktrace, segredos ou SQL ao navegador.

## 8. Política de uploads e armazenamento

### 8.1 Buckets e acesso

- Bucket `jojo-media` com regras explícitas; uploads do painel passam por autorização da API.
- Usar chave de alto privilégio somente em servidor. Verificar configuração de acesso público/privado: **somente arquivos aprovados para publicação podem ser servidos publicamente**.
- Recomendação de implementação: bucket privado de **staging** + bucket público de **published**, com promoção de arquivos no backend e paths imutáveis, ou mecanismo equivalente que impeça pré-publicação. Manter a estratégia consistente no código e testes. Se for usado bucket público único, entender que rascunhos com URL conhecida não são privados; **não escolher isso** se a exigência for confidencialidade antes da publicação.
- No MVP, simplificar mantendo **`jojo-staging` privado** e **`jojo-published` público**, sem gravação direta de usuários no published; cópia/promover por serviço no publish. Registros de mídia guardam bucket e storagePath atuais. Conteúdo do site público nunca recebe staging URLs.
- Na publicação de fotos ou da Hero, promover as mídias necessárias e garantir que estejam acessíveis antes de mudar estado/ponteiro ativo. Como Storage e Postgres não compartilham transação, usar operação idempotente e recuperação de falhas, sem remover mídia anterior até sucesso.

### 8.2 Limites iniciais (configuráveis)

| Uso | Tipos | Limite por arquivo | Condição |
|---|---|---:|---|
| Galeria | JPEG/PNG/WebP | 15 MB | gerar thumbnails / imagens otimizadas quando implementado |
| Cartaz de show | JPEG/PNG/WebP | 15 MB | orientação preferencial vertical |
| Poster Hero | JPEG/PNG/WebP | 15 MB | desktop 16:9 / mobile 9:16 |
| Vídeo Hero | MP4 (H.264 preferencial) | 150 MB | recomendar vídeo curto e sem áudio |

Os limites são **propostas operacionais**; ajustar ao plano real do Supabase e às restrições de proxy/hosting. Medir desempenho e custo antes de permitir arquivos muito maiores. Validate tamanho/bytes reais, assinatura/magic number, codecs e dimensões no backend ou serviço de processamento confiável. No MVP, rejeitar arquivo incompatível; **não fingir transcodificação automática**.

### 8.3 Ciclo de vida

`AUTHORIZED → UPLOADING → UPLOADED → VALIDATING → READY` ou `FAILED/ABORTED/EXPIRED`. Arquivo não verificado nunca está `READY`. `complete` deve confirmar existência, path esperado, metadata real e permissões. Operações incompletas e arquivos órfãos removidos por job periódico, com retenção de segurança. Não armazenar URLs assinadas como fonte de verdade.

### 8.4 Exclusão e referências

- No painel, **arquivar primeiro**; exclusão lógica do registro.
- Rotina de limpeza física só após, por exemplo, 30 dias (valor configurável), sem nenhuma referência ativa da galeria, do show ou da Hero atual/histórica protegida.
- Registrar auditoria e permitir restaurar enquanto houver arquivo e retenção. Proibir excluir mídia em uso pela Hero ativa.

## 9. Fluxo de publicação e sincronização com Next.js

1. Admin envia `publish` autenticado.
2. API valida requisitos, assets, versão e dependências de Storage.
3. API aplica mutação em Postgres, registra AuditLog e evento PublishOutbox na **mesma transação**.
4. Após commit, serviço de publicação chama endpoint interno do Next.js com autenticação robusta (`Authorization: Bearer <internal_secret>` ou HMAC com timestamp e replay protection); restringir origem quando possível.
5. Handler Next.js revalida as tags ou paths pertinentes de acordo com a configuração da versão do Next.js. Exemplo de tags: `shows`, `gallery`, `videos`, `hero`.
6. Marcar outbox como entregue; em falha, retry com backoff e métrica de pendências.

**Importante:** revalidação pode servir conteúdo stale-while-revalidate, dependendo da função e configuração do cache; não prometer atualização instantânea se esse mecanismo for escolhido. O site deve continuar funcional durante a falha de sincronização, e o painel informar estado pendente.

A API pública pode usar `Cache-Control` apropriado sem bloquear revogações urgentes; combinar TTL moderado e invalidação. Não cachear endpoints administrativos em intermediários compartilhados.

## 10. Organização do backend

```text
apps/api/
├─ prisma/
│  ├─ schema.prisma
│  └─ migrations/
├─ src/
│  ├─ app.ts                      # buildFastify()
│  ├─ server.ts                   # bootstrap e listen
│  ├─ config/env.ts               # validar env na inicialização
│  ├─ plugins/
│  │  ├─ auth.ts
│  │  ├─ prisma.ts
│  │  ├─ cors.ts
│  │  └─ error-handler.ts
│  ├─ modules/
│  │  ├─ admin/
│  │  ├─ dashboard/
│  │  ├─ shows/
│  │  ├─ albums/
│  │  ├─ photos/
│  │  ├─ videos/
│  │  ├─ hero/
│  │  ├─ uploads/
│  │  └─ public/
│  ├─ services/
│  │  ├─ storage-service.ts
│  │  ├─ publishing-service.ts
│  │  └─ audit-service.ts
│  ├─ jobs/
│  │  ├─ publish-outbox.ts
│  │  └─ cleanup-stale-uploads.ts
│  ├─ lib/
│  │  ├─ youtube.ts
│  │  ├─ time-zone.ts
│  │  └─ errors.ts
│  └─ tests/
├─ .env.example
└─ package.json
packages/contracts/
├─ src/               # esquemas Zod, tipos, erros e enums comuns
└─ package.json
```

Cada módulo tem `routes`, `schemas`, `service` e `repository` quando necessário. Route handlers finos; regras no service; Prisma no repository/service; dependências injetáveis para testar. Não criar abstrações genéricas sem necessidade.

## 11. Variáveis de ambiente da API

```env
NODE_ENV=development
PORT=3333
PUBLIC_API_ORIGIN=http://localhost:3333
ADMIN_ORIGIN=http://localhost:5173
WEB_ORIGIN=http://localhost:3000

DATABASE_URL=postgresql://USER:PASSWORD@SUPABASE_POOLER:6543/postgres
DIRECT_URL=postgresql://USER:PASSWORD@SUPABASE_DIRECT:5432/postgres

SUPABASE_URL=https://projeto.supabase.co
SUPABASE_PUBLISHABLE_KEY=chave_publicavel
SUPABASE_SECRET_KEY=chave_secreta_servidor
SUPABASE_JWT_ISSUER=https://projeto.supabase.co/auth/v1
SUPABASE_JWT_AUDIENCE=authenticated

STORAGE_STAGING_BUCKET=jojo-staging
STORAGE_PUBLIC_BUCKET=jojo-published
MEDIA_UPLOAD_MAX_IMAGE_BYTES=15728640
MEDIA_UPLOAD_MAX_VIDEO_BYTES=157286400

NEXT_REVALIDATE_URL=https://site.exemplo.com/api/internal/revalidate
NEXT_REVALIDATE_SECRET=segredo_longo_aleatorio
```

**Nunca commitar `.env` real.** Validar variáveis ao iniciar; falhar explicitamente se obrigatórias faltam. Dependendo da versão do Prisma, `DIRECT_URL` e o adapter de driver podem ser configurados em `prisma.config.ts`; seguir a versão instalada. Para Supabase, usar **pooler na execução** e **conexão direta nas migrações**, conforme a documentação do serviço.

## 12. Integração Next.js (contrato que o agente do frontend público deverá cumprir)

- O frontend público consulta GET `/v1/public/*`; apenas publicações.
- Ao compor a Hero, selecionar recursos adequados ao dispositivo por `<picture>` e `<video>` com fontes e posters separados; **não depender de JavaScript para uma troca visual crítica quando HTML/CSS resolve**.
- Handler `/api/internal/revalidate` do Next.js recebe chamada somente do backend, valida segredo ou HMAC, limita verbos e body, e revalida tags/paths definidos.
- Dashboard não faz alterações diretamente no Next.js; o backend é responsável pelo gatilho de revalidação.
- O time do site público deve confirmar se versão instalada de Next usa `revalidateTag`, `revalidatePath`, `updateTag` ou combinação, **sem assumir comportamento de cache padrão idêntico entre versões**.

## 13. Testes obrigatórios da API

**Unidade:** parser robusto de YouTube URL; regras de status; conversão timezone; validação de payload; checagem de mídia elegível.

**Integração:**

1. Sem token em admin → 401.
2. Token válido de usuário comum → 403.
3. Token de admin inativo → 403.
4. Criar show → DRAFT; consulta pública não retorna.
5. Publicar show → consulta pública retorna, status `CANCELLED` segue visível com marca.
6. Conflito de version no PATCH → 409 e não sobrescreve.
7. Upload com MIME incompatível/tamanho excessivo → 415/413.
8. Assinatura de upload expirada ou sem bytes → não cria asset READY.
9. Falha na promoção da Hero → ponteiro anterior permanece ativo.
10. Falha na notificação do Next → publicação no banco válida e outbox pendente para retry.
11. Arquivar foto não apaga asset referenciado pela Hero.
12. URLs de YouTube host falsificado são rejeitadas.
13. Rotas públicas nunca retornam dados privados de audit/admin.
14. Reordenação de fotos/vídeos rejeita ID duplicado ou fora do escopo.
15. Cleanup não remove mídia ativa ou dentro do prazo de retenção.

**E2E de contrato:** executar conjunto real admin ↔ API ↔ site público em ambiente de staging com Storage e banco separados da produção.

## 14. Deploy, observabilidade e operações

- Ambientes: local, staging, produção; projetos/buckets e segredos segregados.
- Hospedar Fastify num runtime Node persistente ou ambiente adequado; observar conexões máximas do Postgres, reciclagem e limite de pool.
- Logs estruturados (`requestId`, rota, status, latência, adminId quando houver) **sem JWT ou detalhes sensíveis**.
- Monitorar 5xx, 401/403 anômalos, latência, falhas no Storage, outbox pendente, tamanho de mídia e custos de banda.
- Healthchecks: `/health/live` sem dependências externas; `/health/ready` confirma Postgres e dependências essenciais sob timeout.
- Backup do PostgreSQL e procedimento de restore **testado**. Versionamento/backup das mídias publicadas precisa estratégia separada; backup apenas do banco **não recupera** arquivos do Storage.
- Migrations executadas no pipeline antes da nova versão, com procedimento de rollback lógico; evitar `db push` em produção.
- Documentar configuração CORS, DNS e domínio real na implantação.

## 15. Roadmap de execução

**Etapa 1 — Base:** workspace, TypeScript, Fastify, Prisma + Supabase, migration, seed admin seguro, healthchecks, auth middleware, contratos e testes básicos.

**Etapa 2 — Shows:** CRUD, status, filtros, publicação e rotas públicas.

**Etapa 3 — Media:** Storage staging/published, autorização/complete, metadados, validação, cleanup.

**Etapa 4 — Galeria:** álbuns, fotos, ordem, capa, publicação.

**Etapa 5 — YouTube:** parser, CRUD, ordenação e publicação.

**Etapa 6 — Hero:** rascunho, 4 assets, troca atômica, rollback e consultas públicas.

**Etapa 7 — Sincronização:** outbox, endpoint seguro Next.js, observabilidade, testes integrados e deploy.

## 16. Fora do escopo MVP

Pagamentos, venda de ingressos, CRM, cadastro público, múltiplos perfis granulares, análises de audiência, IA generativa, fila distribuída, CDN/transcodificação de vídeo profissional, editor geral de páginas e agendamento futuro de publicação. Não integrar serviços não solicitados sem decisão explícita.

## 17. Critérios de aceite

- Todas as rotas descritas têm validação e tipos compartilhados com o admin.
- API admin exige token verificado e `AdminUser.active`; controles de permissão no servidor.
- Dados públicos só refletem publicações válidas e mídias aprovadas.
- Upload não passa o arquivo inteiro pelo Fastify; autorização e confirmação seguras.
- Substituição da Hero não quebra versão ativa, mesmo se Storage ou revalidação falhar.
- Migrations versionadas, seed seguro e testes passam em ambiente limpo.
- Logs não vazam credenciais; CORS e headers de segurança estão configurados.
- README contém instalação, variáveis, migrations, seed, testes, desenvolvimento local e deploy.
- Contrato OpenAPI ou documentação equivalente é gerado e revisado.

## 18. Fontes técnicas para validação durante implementação

- Supabase Auth / JWT: https://supabase.com/docs/guides/auth/jwts
- Supabase Auth / getClaims: https://supabase.com/docs/reference/javascript/auth-getclaims
- Supabase Storage / upload assinado: https://supabase.com/docs/guides/storage/uploads/standard-uploads
- Supabase Storage / upload retomável: https://supabase.com/docs/guides/storage/uploads/resumable-uploads
- Supabase + Prisma: https://supabase.com/docs/guides/database/prisma
- Prisma + Supabase: https://www.prisma.io/docs/orm/v6/overview/databases/supabase
- Next.js / cache: https://nextjs.org/docs/app/api-reference/functions/revalidateTag
- Next.js / revalidação: https://nextjs.org/docs/app/getting-started/revalidating

---

**Orientação ao agente:** implementar contrato, segurança e testes antes de integrar produção. Não alterar o site público, a copy e o design system sem instrução explícita. Quando alguma hipótese de infraestrutura não puder ser validada, documentar em `docs/DECISIONS.md` e não presumir que houve upload/publicação ou backup com sucesso.
