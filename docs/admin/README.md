# Documentação Técnica: Painel Administrativo (Fase 2)
**Projeto:** Jojo Mendes — Site Oficial e Gestão de Conteúdo  
**Prazo de Entrega:** 4 dias  
**Arquitetura:** Next.js App Router (Admin integrado em `/admin`), Prisma ORM, Supabase (PostgreSQL & Storage)

---

## 1. Visão Geral & Objetivos

Esta fase tem como objetivo conferir autonomia total à cliente (Jojo Mendes e equipe de produção) para gerenciar o conteúdo dinâmico do site sem necessidade de intervenção técnica de código.

### Módulos em Escopo:
1. **Agenda de Shows:** Criação, edição, exclusão e gestão de status (Confirmado, Esgotado, Cancelado).
2. **Galeria de Fotos:** Upload de novas fotos para o Supabase Storage, gestão de legendas acessíveis e exclusão.
3. **Vídeos em Destaque:** Cadastro de links do YouTube, alteração de títulos, ordem e marcação de material oficial vs. demonstração.

---

## 2. Decisão Arquitetural: Admin Integrado no Next.js

Para viabilizar a entrega com máxima qualidade dentro do prazo de **4 dias**, adotou-se o modelo **monolítico moderno (Next.js Full-Stack)**:

```
┌─────────────────────────────────────────────────────────────────┐
│                       Aplicação Next.js                         │
│                                                                 │
│   ┌─────────────────────┐             ┌─────────────────────┐   │
│   │    Site Público     │             │    Painel Admin     │   │
│   │   (/, /contratacao) │             │    (/admin/*)       │   │
│   └──────────┬──────────┘             └──────────┬──────────┘   │
│              │                                   │              │
│              ▼                                   ▼              │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │   Server Actions / Route Handlers (/api/admin/...)      │   │
│   │   - Revalidação via revalidatePath('/')                 │   │
│   └──────────────────────────┬──────────────────────────────┘   │
└──────────────────────────────┼──────────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
   ┌───────────────────┐                 ┌───────────────────┐
   │    PostgreSQL     │                 │ Supabase Storage  │
   │  (via Prisma ORM) │                 │  (Bucket Fotos)   │
   └───────────────────┘                 └───────────────────┘
```

### Vantagens do Modelo Integrado:
* **Zero atrito com CORS:** O painel administrativo e a API compartilham a mesma origem (`window.location.origin`).
* **Deploy único:** Um único repositório e deploy contínuo (Vercel ou similar).
* **Autenticação segura via Cookies `httpOnly`:** Elimina a vulnerabilidade de tokens JWT salvos em `localStorage`.
* **Atualização instantânea (Cache Revalidation):** Quando a cliente altera um dado no `/admin`, o servidor aciona `revalidatePath('/')`, e o site público reflete a mudança no mesmo instante.
* **Fallback resiliente:** Se o banco de dados estiver vazio ou em manutenção temporária, o site público exibe o estado padrão sem travar a interface.

---

## 3. Modelagem do Banco de Dados (Prisma Schema)

O banco de dados PostgreSQL será hospedado no Supabase e manipulado via **Prisma ORM**.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// 1. Usuário Administrador
model AdminUser {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String   // Hash bcrypt seguro
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("admin_users")
}

// 2. Agenda de Shows
enum ShowStatus {
  confirmed
  sold_out
  cancelled
}

model Show {
  id         String     @id @default(uuid())
  date       DateTime   // Data do evento
  time       String?    // Ex: "22:00" (opcional)
  city       String
  state      String     // Ex: "MA", "PI"
  venue      String     // Ex: "Praça Maria Aragão"
  detailsUrl String?    // Link para compra de ingressos ou detalhes
  status     ShowStatus @default(confirmed)
  order      Int        @default(0)
  createdAt  DateTime   @default(now())
  updatedAt  DateTime   @updatedAt

  @@index([date])
  @@map("shows")
}

// 3. Galeria de Fotos
model GalleryImage {
  id        String   @id @default(uuid())
  src       String   // URL pública gerada no Supabase Storage
  alt       String   // Descrição da imagem para acessibilidade
  width     Int      @default(1200)
  height    Int      @default(800)
  order     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("gallery_images")
}

// 4. Vídeos do YouTube
model Video {
  id        String   @id @default(uuid())
  youtubeId String   // ID do vídeo no YouTube (ex: "dQw4w9WgXcQ")
  title     String
  isDemo    Boolean  @default(false)
  order     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("videos")
}
```

---

## 4. Estrutura de Rotas e Telas do Admin

```
src/
├── app/
│   ├── (public)/                 # Rotas públicas do site
│   │   ├── page.tsx              # Home com leitura dinâmica
│   │   └── contratacao/page.tsx
│   ├── admin/                    # Área protegida
│   │   ├── layout.tsx            # Layout com barra lateral, header e botão de sair
│   │   ├── login/
│   │   │   └── page.tsx          # Tela de login limpa e segura
│   │   ├── page.tsx              # Dashboard resumo (cards rápidos)
│   │   ├── shows/
│   │   │   └── page.tsx          # Gestão de shows (Tabela + Modal de cadastro/edição)
│   │   ├── fotos/
│   │   │   └── page.tsx          # Gestão de fotos (Grid + Dropzone de upload + Exclusão)
│   │   └── videos/
│   │       └── page.tsx          # Gestão de vídeos (Lista + Cadastro de link do YouTube)
│   └── api/
│       ├── admin/
│       │   ├── auth/             # Login, Logout e Verificação de sessão
│       │   ├── shows/            # CRUD de shows
│       │   ├── fotos/            # Upload e exclusão no Storage + Banco
│       │   └── videos/           # CRUD de vídeos
│       └── ...
├── lib/
│   ├── prisma.ts                 # Cliente Prisma singleton
│   ├── supabase-admin.ts         # Cliente Supabase com Service Role para storage
│   └── auth/                     # Helpers de senha (bcrypt) e JWT/Cookies
└── middleware.ts                 # Bloqueio de rotas não autorizadas em /admin/*
```

---

## 5. Fluxos Detalhados por Módulo

### 5.1. Autenticação & Sessão (`/admin/login`)
1. A cliente acessa `/admin`.
2. Se não houver cookie de sessão válido, o `middleware.ts` redireciona para `/admin/login`.
3. Informa e-mail e senha.
4. O servidor valida o hash com `bcryptjs` e emite um cookie seguro `jojo_admin_token` (`HttpOnly`, `SameSite=Lax`, `Secure`).
5. Redirecionamento para o dashboard com feedback visual.

### 5.2. Gestão de Shows (`/admin/shows`)
* **Listagem:** Tabela ordenada pelas datas mais próximas com badge de status colorido (`Confirmado` [verde], `Esgotado` [dourado], `Cancelado` [vermelho]).
* **Criação/Edição:** Formulário com validação Zod (Data, Horário, Cidade, UF, Local, Status, Link).
* **Ações rápidas:** Botão de alternar status com 1 clique e botão de excluir com confirmação.
* **Disparo:** Ao salvar, chama `revalidatePath('/')` para atualizar a agenda na Home imediatamente.

### 5.3. Gestão de Fotos (`/admin/fotos`)
* **Upload:** Componente Drag & Drop com suporte a `.jpg`, `.png`, `.webp` (limite recomendado de 5MB por foto).
* **Processamento:**
  1. Envia arquivo para a rota `/api/admin/fotos/upload`.
  2. A rota armazena no bucket público `galeria` do Supabase.
  3. Salva os metadados (URL pública, legenda/alt, dimensões) no Prisma.
* **Exclusão:** Remove o registro do banco de dados e apaga o arquivo correspondente no bucket do Supabase.

### 5.4. Gestão de Vídeos (`/admin/videos`)
* **Cadastro inteligente:** A cliente pode colar o link completo do YouTube (`https://www.youtube.com/watch?v=XYZ` ou `https://youtu.be/XYZ`). Um helper extrai automaticamente o `youtubeId` limpo.
* **Edição de Título e Categoria:** Permite marcar se o vídeo é "Oficial" ou "Demonstrativo/Ensaio".
* **Exclusão:** Remove da playlist exibida no carrossel de vídeos da Home.

---

## 6. Cronograma de Execução (Sprint de 4 Dias)

| Dia | Foco Principal | Entregáveis |
| :--- | :--- | :--- |
| **Dia 1** | **Fundação & Segurança** | • Instalação do Prisma e cliente singleton.<br>• Definição do `schema.prisma` e migração no Supabase.<br>• Seed do primeiro usuário administrador.<br>• Tela de Login e Middleware de proteção de rotas `/admin/*`. |
| **Dia 2** | **Módulo Shows (Agenda)** | • CRUD completo de Shows na API (`/api/admin/shows`).<br>• Tela administrativa `/admin/shows` (Tabela, Modal, Validações).<br>• Atualização da seção de Agenda na Home para consumir do banco com revalidação automática. |
| **Dia 3** | **Módulo Fotos & Vídeos** | • Configuração do bucket de Storage no Supabase.<br>• Upload e exclusão de fotos em `/admin/fotos`.<br>• CRUD e extração automática de IDs do YouTube em `/admin/videos`.<br>• Atualização das seções de Galeria e Vídeos na Home. |
| **Dia 4** | **Polimento, Testes & Homologação** | • Revisão de responsividade no mobile para a cliente acessar pelo celular.<br>• Testes automatizados de ponta a ponta das rotas de API.<br>• Deploy no ambiente de produção e testes de validação com a cliente. |

---

## 7. Variáveis de Ambiente Necessárias (`.env.local`)

```env
# Conexão com o Banco PostgreSQL do Supabase (Transaction Pooler ou Direct)
DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"

# Supabase Storage & Autenticação
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT_REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOi..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOi..."

# Chave Secreta para Sessão do Admin
ADMIN_JWT_SECRET="chave_super_secreta_aleatoria_com_minimo_32_caracteres"
```

---

*Documentação elaborada para guiar o desenvolvimento ágil e garantir estabilidade, segurança e independência para a cliente.*

