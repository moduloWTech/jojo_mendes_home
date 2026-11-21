# Jojo Mendes — Site Oficial & Painel Administrativo

Aplicação oficial da cantora **Jojo Mendes**, desenvolvida sob os mais rigorosos padrões de engenharia da **MW Technology**. 

Construída com **Next.js 15 (App Router) + React 19 + TypeScript (Strict) + Tailwind CSS + Prisma 6 + PostgreSQL (Neon na Nuvem / Docker Local) + Vercel Blob**.

---

## 1. Visão Geral da Arquitetura

O sistema adota uma arquitetura integrada full-stack (Next.js App Router) que elimina a necessidade de múltiplos servidores e garante extrema performance, consistência de tipos e custo de infraestrutura zero em produção:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        NEXT.JS 15 APP ROUTER                           │
├──────────────────────────────────┬─────────────────────────────────────┤
│      ÁREA PÚBLICA (FÃS/CLIENTES) │     PAINEL ADMINISTRATIVO (/admin)  │
│  - Hero Cinematográfica          │  - Login com JWT httpOnly           │
│  - Agenda de Shows Dinâmica      │  - Gestão de Shows (CRUD + Horário) │
│  - Galeria de Fotos 3D (8 slots) │  - Upload para Vercel Blob          │
│  - Vídeos Oficiais do YouTube    │  - Gestão de Vídeos Oficiais        │
│  - Contratação Direta WhatsApp   │  - Modais & Toasts Luxuosos (UI)    │
└────────────────┬─────────────────┴──────────────────┬──────────────────┘
                 │                                    │
                 ▼                                    ▼
       ┌──────────────────┐                 ┌──────────────────┐
       │ Endpoints API    │                 │ Endpoints Admin  │
       │ /api/shows       │                 │ /api/admin/*     │
       │ /api/galeria     │                 │ (Sessão Protegida│
       │ /api/videos      │                 │  com Middleware) │
       └─────────┬────────┘                 └─────────┬────────┘
                 │                                    │
                 └──────────────────┬─────────────────┘
                                    │ Prisma ORM (v6)
                                    ▼
       ┌───────────────────────────────────────────────────────────────┐
       │                      PERSISTÊNCIA & STORAGE                   │
       ├───────────────────────────────┬───────────────────────────────┤
       │ BANCO DE DADOS (PostgreSQL):  │ ARMAZENAMENTO DE IMAGENS:     │
       │ • Produção: Neon (Vercel)     │ • Produção: Vercel Blob       │
       │ • Local: Docker Compose :5433 │ • Local: public/media/uploads │
       └───────────────────────────────┴───────────────────────────────┘
```

---

## 2. Separação de Ambientes & Variáveis (.env)

O projeto possui separação estrita de variáveis de ambiente para garantir segurança e facilidade operacional:

### A. Ambiente Local (Docker / Container): `.env` e `.env.local`
Configurado para rodar com o banco de dados PostgreSQL local via Docker Compose (porta `5433`). No ambiente local, os uploads são salvos em `public/media/uploads/` sem depender de rede externa.

```env
# Banco de Dados Local (Docker)
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/jojomendes?schema=public"
DIRECT_URL="postgresql://postgres:postgres@localhost:5433/jojomendes?schema=public"

# Sessão e Credenciais Padrão do Painel Admin
JWT_SECRET="jojo_mendes_super_secret_jwt_key_mw_tech_2026"
ADMIN_DEFAULT_EMAIL="admin@jojomendes.com.br"
ADMIN_DEFAULT_PASSWORD="admin_jojo_2026!"
```

### B. Ambiente de Produção (Vercel): `.env.production`
Reúne as variáveis e credenciais em nuvem configuradas na Vercel:

```env
# Banco de Dados em Nuvem (Neon / Vercel Postgres)
DATABASE_URL="postgresql://neondb_owner:npg_mlSr5hJN0FqD@ep-raspy-dawn-b6avkbg5-pooler.c-2.sa-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require"
DIRECT_URL="postgresql://neondb_owner:npg_mlSr5hJN0FqD@ep-raspy-dawn-b6avkbg5.c-2.sa-east-1.aws.neon.tech/neondb?sslmode=require"

# Sessão e Credenciais Padrão
JWT_SECRET="jojo_mendes_super_secret_jwt_key_mw_tech_2026"
ADMIN_DEFAULT_EMAIL="admin@jojomendes.com.br"
ADMIN_DEFAULT_PASSWORD="admin_jojo_2026!"

# Armazenamento de Imagens em Nuvem (Vercel Blob)
BLOB_STORE_ID="store_xxHYOguiAPb5H61g"
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
```

> [!NOTE]
> Os arquivos `.env`, `.env*.local` e `.env.production` são protegidos pelo `.gitignore` e **nunca** são enviados ao GitHub.

---

## 3. Comandos do Sistema

```bash
# 1. Instalação de Dependências
npm install

# 2. Servidor de Desenvolvimento
npm run dev

# 3. Qualidade de Código & Testes
npm run typecheck         # Verificação estrita de tipagem TypeScript
npm test                  # Execução da suíte completa Vitest (27 testes)

# 4. Banco de Dados Local (Docker Compose)
npm run db:up             # Inicia o container PostgreSQL local na porta 5433
npm run db:down           # Para o container PostgreSQL
npm run db:push           # Sincroniza o schema Prisma com o banco ativo
npm run db:studio         # Abre interface gráfica do Prisma Studio para visualização

# 5. Build de Produção
npm run build
npm start
```

---

## 4. Painel Administrativo (`/admin`)

O painel administrativo exclusivo foi desenvolvido sob a identidade visual de luxo da cantora (Dark #0B0B0C e Ouro Champagne #E4C068).

- **URL de Acesso:** `/admin/login`
- **E-mail inicial:** `admin@jojomendes.com.br`
- **Senha inicial:** `admin_jojo_2026!`
- **Segurança da Sessão:** JWT criptografado armazenado em cookie seguro `httpOnly` com flag `SameSite=Strict` e proteção via Next.js Middleware. Senhas salvas com hash `bcrypt`.
- **Experiência do Usuário (Zero Alerts Nativos):** Não são utilizados `window.alert()` ou `window.confirm()`. Todas as confirmações de exclusão e mensagens de sucesso utilizam o `ConfirmModal` estilizado e o `ToastContext` integrado.

### Funcionalidades do Painel:
1. **Visão Geral (`/admin`):** Métricas em tempo real de shows cadastrados, fotos ativas na galeria, vídeos em exibição e atalhos rápidos.
2. **Agenda de Shows (`/admin/shows`):**
   - Cadastro, edição e exclusão de eventos da turnê.
   - Campos: Data, Horário do evento (ex: `22:00`), Local/Espaço, Cidade, UF, Status (Confirmado, Esgotado, Cancelado) e Link para compra de ingressos / Mais informações.
   - Reflete instantaneamente na página inicial (`AgendaSection`).
3. **Galeria de Fotos (`/admin/fotos`):**
   - Limite de **8 fotos ativas** (alinhado com o anel de visualização 3D da home).
   - **Upload direto:** envia a imagem diretamente para o **Vercel Blob** em produção (ou `public/media/uploads` local).
   - **Link Direto:** permite colar URL externa de qualquer CDN ou link público.
   - Exclusão sincronizada: ao apagar uma foto, o arquivo correspondente também é limpo no Vercel Blob.
4. **Vídeos Oficiais (`/admin/videos`):**
   - Suporta colar links completos do YouTube (`youtube.com/watch?v=...`, `youtu.be/...`) ou IDs diretos.
   - Gera automaticamente thumbnail de alta qualidade do YouTube.
   - Controle de ordenação e exclusão.

---

## 5. Fluxo Comercial & Contratação via WhatsApp (`/contratacao`)

O site prioriza a agilidade comercial máxima para contratação de shows:
- O contratante preenche os dados do evento (Nome, WhatsApp, Cidade/UF, Data, Local e Público Estimado).
- Ao enviar, a aplicação valida os dados com Zod, formata a proposta completa e **abre imediatamente a conversa oficial no WhatsApp da equipe de Jojo Mendes**.
- A interface exibe confirmação imediata e botão de retorno rápido.

---

## 6. Padrões de Qualidade MW Technology

- **Acessibilidade:** Conformidade com WCAG 2.1 (contraste mínimo AAA em textos e AA em elementos interativos).
- **Resiliência de Endpoints:** Os endpoints públicos (`/api/shows`, `/api/galeria`, `/api/videos`) possuem mecanismo de fallback inteligente — se o banco estiver temporariamente indisponível durante instabilidades externas, o site continua carregando o conteúdo base sem quebrar para o usuário final.
- **Next.js Image Optimization:** Domínios remotos e blobs configurados com segurança no `next.config.ts`.
