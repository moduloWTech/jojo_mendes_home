# JOJO MENDES — MANUAL TÉCNICO DO SISTEMA & PAINEL ADMINISTRATIVO

**Empresa Desenvolvedora:** MW Technology  
**Aplicação:** Site Oficial & Painel Administrativo Jojo Mendes  
**Framework:** Next.js 15 (App Router) + React 19 + TypeScript  
**ORM & Banco:** Prisma 6 + PostgreSQL (Neon na Nuvem / Docker Compose Local)  
**Armazenamento:** Vercel Blob (`@vercel/blob`)  

---

## 1. Modelos de Dados (Prisma Schema)

O schema do banco de dados está localizado em `prisma/schema.prisma` e mapeia 4 modelos principais:

### 1.1. Usuário Administrador (`admin_users`)
```prisma
model AdminUser {
  id           String   @id @default(uuid())
  email        String   @unique
  passwordHash String
  name         String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@map("admin_users")
}
```
- Autenticação com senhas criptografadas usando `bcryptjs` (salt 12).
- O primeiro login com `ADMIN_DEFAULT_EMAIL` e `ADMIN_DEFAULT_PASSWORD` cria automaticamente o usuário administrador caso o banco esteja vazio.

### 1.2. Agenda de Shows (`shows`)
```prisma
enum ShowStatus {
  confirmed
  sold_out
  cancelled
}

model Show {
  id         String     @id @default(uuid())
  date       String     // YYYY-MM-DD
  time       String?    // Ex: "22:00"
  city       String
  state      String     // Ex: "MA"
  venue      String
  detailsUrl String?    // Link para ingressos
  status     ShowStatus @default(confirmed)
  order      Int        @default(0)
  createdAt  DateTime   @default(now())
  updatedAt  DateTime   @updatedAt

  @@index([date])
  @@map("shows")
}
```

### 1.3. Galeria de Fotos (`gallery_images`)
```prisma
model GalleryImage {
  id              String   @id @default(uuid())
  src             String   // URL do Vercel Blob ou externa
  alt             String
  width           Int      @default(1200)
  height          Int      @default(800)
  positionMobile  String?
  positionDesktop String?
  order           Int      @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@map("gallery_images")
}
```
- Restrito a no máximo **8 fotos ativas** para compatibilidade com a geometria 3D do anel da página inicial.

### 1.4. Vídeos Oficiais (`videos`)
```prisma
model Video {
  id        String   @id @default(uuid())
  youtubeId String
  title     String
  isDemo    Boolean  @default(false)
  order     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("videos")
}
```

---

## 2. Rotas e APIs

### 2.1. APIs Públicas (com Fallback Resiliente)
- `GET /api/shows` ➔ Retorna a lista de shows ordenados por data. Se o banco falhar, devolve fallback estático de `src/content/site.ts`.
- `GET /api/galeria` ➔ Retorna até 8 fotos da galeria.
- `GET /api/videos` ➔ Retorna os vídeos oficiais cadastrados.
- `POST /api/contratacao` ➔ Valida dados da proposta e processa a solicitação para WhatsApp.

### 2.2. APIs Administrativas (Protegidas por JWT httpOnly)
- `POST /api/admin/auth/login` ➔ Valida e-mail/senha, gera JWT assinado e armazena em cookie `jojo_admin_token` (httpOnly, Secure, SameSite=Strict).
- `POST /api/admin/auth/logout` ➔ Invalida e limpa o cookie da sessão.
- `GET /api/admin/auth/me` ➔ Retorna informações do administrador autenticado.
- `GET/POST /api/admin/shows` & `PUT/DELETE /api/admin/shows/[id]` ➔ Gestão completa da agenda.
- `GET/POST /api/admin/fotos` & `DELETE /api/admin/fotos/[id]` ➔ Upload para Vercel Blob e exclusão sincronizada.
- `GET/POST /api/admin/videos` & `DELETE /api/admin/videos/[id]` ➔ Gestão de vídeos do YouTube.

---

## 3. Segurança e Middleware

O arquivo `src/middleware.ts` intercepta todas as requisições para `/admin/*` (exceto `/admin/login`) e rotas `/api/admin/*` (exceto login).
- Sessões inválidas ou expiradas em páginas redirecionam automaticamente para `/admin/login`.
- Requisições não autorizadas na API recebem resposta `401 Unauthorized` em JSON.

---

## 4. Integração Vercel Blob

- O upload de fotos utiliza o SDK oficial `@vercel/blob`.
- No endpoint `POST /api/admin/fotos`, se a variável `BLOB_READ_WRITE_TOKEN` estiver presente, o arquivo é enviado diretamente ao bucket Vercel e a URL pública da CDN é salva no banco.
- Ao deletar uma foto via `DELETE /api/admin/fotos/[id]`, o arquivo é excluído automaticamente da CDN do Blob caso seja uma URL gerenciada pela Vercel.
- O `next.config.ts` possui `remotePatterns` configurados com wildcard para aceitar todas as URLs seguras de CDN sem gerar erros de renderização no `<Image />`.

