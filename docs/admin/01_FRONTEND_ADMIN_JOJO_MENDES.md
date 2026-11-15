# JOJO MENDES — ESPECIFICAÇÃO DO FRONTEND ADMINISTRATIVO

**Versão:** 1.0  
**Data:** 15/11/2026  
**Status:** especificação de implementação (MVP)  
**Aplicação:** `apps/admin` — Vite + React + TypeScript  
**Documento complementar:** `02_API_BANCO_JOJO_MENDES.md`

> **Objetivo:** construir o painel para que a artista (ou responsável autorizado) gerencie shows, fotografias, vídeos do YouTube e a mídia da Hero sem alterar o código do site público. Este documento define telas, componentes, regras e estados; não delegar decisões estruturais relevantes ao agente implementador.

## 1. Limites e decisões imutáveis

- O site **público permanece em Next.js**, preservando seu design system e copy já definidos. Este projeto **não recria** o site público.
- O painel será uma **SPA Vite/React**, isolada, de preferência em `admin.<dominio-do-site>`; domínio definitivo via configuração de ambiente.
- A API será **Fastify + TypeScript**, em `apps/api`. O admin **não acessa diretamente Prisma ou tabelas Postgres**.
- **Supabase Auth**: e-mail + senha, sessões renováveis; a API valida o access token e confere uma conta administradora ativa.
- **Supabase Storage**: imagens e vídeo da Hero via upload autorizado pela API; YouTube somente links, nunca upload pelo painel.
- Rascunhos não aparecem no site público. Publicar é ação explícita.
- **Duas experiências de layout planejadas:** mobile (<768 px) e desktop (>=1200 px); tablet (768–1199 px) adapta o desktop com navegação compacta. **Não criar duas aplicações nem duplicar regras de negócio.**
- O painel deve ser **em português brasileiro**. Datas exibidas em `dd/MM/yyyy`, horário 24h; persistência de instantes em UTC; timezone do evento persistido explicitamente (`America/Fortaleza` como valor inicial editável).
- Toda interface deve respeitar a identidade preto/grafite, dourado e creme do Design System do site público, mas com uso funcional: legibilidade e contraste são prioridade.

## 2. Stack de implementação

| Área | Escolha | Finalidade |
|---|---|---|
| Build | Vite | Desenvolvimento e build do painel |
| UI | React + TypeScript (strict) | Componentes tipados |
| Estilos | Tailwind CSS | Tokens e estilos responsivos |
| Navegação | React Router | Rotas protegidas |
| Busca e cache | TanStack Query | Consultas, mutações e invalidação |
| Formulários | React Hook Form + Zod | Erros por campo e validação |
| Auth | `@supabase/supabase-js` (somente Auth) | Login e obtenção do token |
| API client | `fetch` tipado | Header Bearer, erros, abort, timeout |
| Ícones | Lucide React | Consistência visual |
| Testes | Vitest + React Testing Library + Playwright | Unidade, integração e ponta a ponta |

Pacotes e versões: fixar versões estáveis compatíveis na instalação; verificar documentação oficial no momento do desenvolvimento. **Não escolher bibliotecas adicionais sem justificativa.**

## 3. Identidade visual administrativa

### 3.1 Tokens

| Token | Valor |
|---|---|
| `--background` | `#0B0B0D` |
| `--surface` | `#232127` |
| `--accent` | `#EFC16B` |
| `--text` | `#FAF7F1` |
| `--muted` | `#B9B4AE` (proposto para textos secundários; verificar contraste) |
| `--danger` | `#F87171` (feedback de erro; verificar contraste) |
| `--success` | `#86EFAC` (feedback de sucesso; verificar contraste) |
| `--border` | `#48434A` |

Tokens visuais são compatíveis com o projeto público, mas a referência definitiva de cores, fontes, raios e sombras é o **Design System Jojo Mendes**. Se a marca oficial exigir ajuste, fazê-lo em tokens centralizados.

### 3.2 Layout e escala

| Elemento | Mobile (<768) | Tablet (768–1199) | Desktop (>=1200) |
|---|---:|---:|---:|
| Margem horizontal de tela | 16 px | 24 px | 32 px |
| Largura máxima de conteúdo | 100% | 100% | 1440 px |
| Espaço entre grupos | 24 px | 28 px | 32 px |
| Espaço entre campos | 16 px | 16 px | 20 px |
| Header | 64 px | 72 px | 72 px |
| Sidebar | drawer sobreposto, 280 px | compacta 72 px | fixa 256 px |
| Grid do dashboard | 1 coluna | 2 colunas | 4 colunas |
| Formulários | 1 coluna | 2 se fizer sentido | 2 colunas |
| Diálogo | quase toda largura, 16 px de margem | até 640 px | até 720 px |
| Controles acionáveis | mínimo 44×44 px | mínimo 44×44 px | mínimo 44×44 px |

Tipografia: usar as famílias do Design System principal, `font-display: swap`, fallback confiável. Texto-base 16 px; etiquetas 14 px; título de tela 28/34/36 px (mobile/tablet/desktop). Não reduzir texto importante abaixo de 14 px.

## 4. Rotas

| Rota | Acesso | Conteúdo |
|---|---|---|
| `/login` | pública | Entrar com e-mail e senha |
| `/recuperar-senha` | pública | Solicitação de recuperação |
| `/redefinir-senha` | fluxo Supabase | Trocar a senha após validar sessão de recuperação |
| `/` | admin | Dashboard |
| `/shows` | admin | Lista e filtros de shows |
| `/shows/novo` | admin | Criar show |
| `/shows/:id/editar` | admin | Editar show |
| `/galeria` | admin | Lista de álbuns |
| `/galeria/:albumId` | admin | Fotos do álbum |
| `/videos` | admin | Gerenciar links do YouTube |
| `/hero` | admin | Configurar desktop/mobile da Hero |
| `/configuracoes` | admin | Conta, segurança e informações da sessão |
| `*` | conforme sessão | Página não encontrada |

O `/login` redireciona usuários autenticados e autorizados para `/`. Páginas administrativas só renderizam dados após verificação da API em `/v1/admin/me`. Rejeição `403` leva a uma tela de “Conta sem permissão”, sem expor dados.

## 5. Navegação e estrutura de cada tela

### 5.1 Shell

**Desktop:** sidebar esquerda fixa 256 px contendo símbolo JM, Dashboard, Shows, Galeria, Vídeos, Hero e Configurações. Topbar horizontal: título, avatar/nome da conta e “Sair”. Conteúdo com breadcrumbs simples nas páginas internas. Sidebar ativa com destaque dourado e marcador lateral.

**Mobile:** header fixo no topo com menu, marca reduzida e perfil. Menu abre drawer sobreposto acessível, fecha por Escape, seleção e clique fora. Conteúdo ocupa a largura disponível. Não usar tabela horizontal que exija rolagem em todos os fluxos: renderizar cards equivalentes nas listagens.

### 5.2 `/login`

Fundo escuro, símbolo JM centralizado, card contendo: título **“Acessar painel”**, e-mail, senha com controle exibir/ocultar, botão **“Entrar”**, link **“Esqueci minha senha”**. Não criar cadastro público. Erro genérico **“Não foi possível entrar. Confira seus dados e tente novamente.”** para evitar enumeração de contas. Carregamento desativa submissões duplicadas. Recuperação confirma envio sem revelar se a conta existe.

### 5.3 `/` — Dashboard

Topo: **“Visão geral”** com texto auxiliar **“Gerencie o conteúdo exibido no site.”**

1. Cards: **Próximos shows**, **Fotos publicadas**, **Vídeos publicados**, **Hero ativa**.
2. Bloco **“Próximos shows”**, até cinco eventos ordenados por data, com ação **“Ver agenda”**.
3. Bloco **“Ações rápidas”**: **“Adicionar show”**, **“Enviar fotos”**, **“Adicionar vídeo”**, **“Trocar Hero”**.
4. Estados vazios claros com a respectiva ação primária; nunca inventar métricas ou números.

### 5.4 `/shows` — Gerenciar agenda

Cabeçalho: **“Agenda de shows”**. CTA principal **“Novo show”** (canto superior direito no desktop, ação visível em toda a largura no mobile). Filtros: texto (evento, cidade), status (todos/rascunho/publicado/cancelado/adiado/arquivado), período (futuros/passados/todos). Padrão de ordenação: próximos primeiro. Paginação real via API; não carregar tudo para filtrar no navegador.

**Lista desktop:** data, evento, cidade/UF, local, status, última alteração e ações. **Mobile:** cards com data/hora, nome, localização, badge de status e menu de ações. Ações por show: Editar, Publicar/Retirar da publicação, Adiar, Cancelar, Arquivar. Exclusão definitiva não é ação primária; trabalhar com arquivamento e exclusão lógica.

**Formulário `shows/novo` e `shows/:id/editar`:**

| Campo | Obrigatório | Comportamento |
|---|---|---|
| Nome do evento | Sim | 3–140 caracteres |
| Data local do show | Sim | Seletor de data |
| Horário local | Sim | `HH:mm` |
| Fuso horário | Sim | default `America/Fortaleza`, editável |
| Cidade | Sim | 2–100 caracteres |
| UF | Sim | lista de unidades federativas brasileiras, com opção de evento internacional futuramente |
| Local | Sim | 2–160 caracteres |
| Descrição | Não | até 2.000 caracteres, texto puro |
| Link de ingresso | Não | URL HTTPS válida |
| Cartaz | Não | escolher/enviar imagem do Storage |
| Estado editorial | Sim | rascunho ou publicar (ação separada) |

Mostrar antes de publicar uma prévia com data, hora e localização. Salvar por padrão em **rascunho**. Botões: **“Salvar rascunho”**, **“Publicar”** (habilitado somente após validação), **“Cancelar”** (volta à lista, confirma alterações não salvas). Se show está passado, continuar exibindo em histórico conforme filtro público decidido no site; nunca apagar automaticamente.

### 5.5 `/galeria` e `/galeria/:albumId`

Página de álbuns: **“Galeria de fotos”**, CTA **“Criar álbum”**. Card de álbum com capa, título, quantidade de fotos, status, ações Editar/Ver/Arquivar/Publicar. Álbuns são úteis para separar eventos, ensaios e apresentações, sem obrigar a ter vários no MVP; fornecer álbum inicial **“Galeria principal”**.

Tela de álbum: título, descrição opcional, status e grid de imagens. CTA principal **“Adicionar fotos”**. Seleção de múltiplos arquivos, grade de prévia, progresso individual, possibilidade de cancelar uploads ainda não finalizados, destacar falhas, reprocessar somente falhas. Após upload concluído, permitir: editar descrição alternativa (`alt`), definir foto de capa, reordenar, ocultar e remover com confirmação. Suportar imagens JPG, PNG e WebP; HEIC somente se houver conversão confiável implementada. Limites definidos em conjunto com a API; apresentar o limite antes do upload. Priorizar imagens otimizadas e responsivas.

**Exclusão:** ao “Excluir foto”, pedir confirmação; o servidor faz exclusão lógica e mantém janela de recuperação definida pelo backend. Se uma mídia estiver em uso na Hero, proibir remoção e explicar o vínculo.

### 5.6 `/videos`

Cabeçalho: **“Vídeos”**, CTA **“Adicionar vídeo”**. Card com thumbnail, título, data de inclusão, status e ações Editar, Publicar/Despublicar, Reordenar, Arquivar.

Form: **“Link do vídeo no YouTube”**, **“Título”** (editável, obrigatório), **“Descrição”** (opcional), **“Ordem”** (opcional; interface de reordenar), botão **“Validar link”** e prévia embed carregada somente ao solicitar, evitando carregar players desnecessários. A API extrai/valida o vídeo ID; o admin **nunca grava HTML iframe bruto**. Inicialmente usar placeholders claramente identificados como demonstrativos; só publicar dados aprovados pela pessoa administradora.

### 5.7 `/hero`

Cabeçalho: **“Vídeo da Hero”** e orientação **“Configure os arquivos exibidos na abertura do site.”**

- Duas áreas: **Desktop (16:9)** e **Mobile (9:16)**. Cada uma tem vídeo atual, substituição, imagem alternativa/poster e visualização do corte (object-fit cover).
- Campos: `videoDesktop`, `videoMobile`, `posterDesktop`, `posterMobile`.
- Upload de vídeo com progresso e retomada quando suportada; arquivos MP4/H.264 como formato preferido de compatibilidade, exigindo validação do servidor. Vídeos sem áudio são recomendados para autoplay no navegador; a reprodução automática pode variar por política do browser.
- Botões: **“Salvar como rascunho”**, **“Visualizar alterações”**, **“Publicar Hero”**.
- Publicação **atômica do conjunto**: desktop + mobile + posters válidos. Se falhar, Hero publicada anterior continua funcionando.
- A seção pública usa um único conjunto ativo. Preservar versão anterior para reversão; ação **“Restaurar versão anterior”** com confirmação.
- Avisar se arquivo for pesado, mas não recodificar vídeo no navegador. O backend define limites e processamento externo se necessário.

### 5.8 `/configuracoes`

Exibir e-mail da conta, nome de exibição, **“Alterar senha”** via fluxo Supabase, **“Sair de todos os dispositivos”** se suporte do provedor estiver implementado, e orientações de MFA (autenticação multifator) caso habilitada. **Não criar gestão pública de usuários**. Nenhuma chave de serviço pode aparecer no painel.

## 6. Componentes obrigatórios

- `AdminLayout`, `Sidebar`, `MobileNavigation`, `Topbar`, `PageHeader`, `Breadcrumbs`.
- `RequireAuth` + `RequireAdmin` (estado inicial `checking`, nunca permitir flash de dados privados).
- `StatCard`, `StatusBadge`, `EmptyState`, `ErrorState`, `Skeleton`, `ConfirmDialog`, `Toast`.
- `TextField`, `TextareaField`, `SelectField`, `DateField`, `TimeField`, `UrlField`, `SubmitBar`.
- `ResponsiveDataList`, `Pagination`, `SearchFilters`, `ImageGrid`, `UploadQueue`, `MediaPicker`.
- `VideoPreview`, `HeroDevicePreview`, `UnsavedChangesGuard`, `FormErrorSummary`.

Todos os ícones têm rótulos acessíveis. Não confiar apenas em cor para distinguir status.

## 7. Fluxo de autenticação

1. Formulário envia credenciais para Supabase Auth pelo SDK.
2. SDK retorna sessão; o painel obtém token de acesso.
3. Painel chama `GET /v1/admin/me` com `Authorization: Bearer <access_token>`.
4. API valida assinatura/claims do token e verifica `AdminUser.active=true` no banco.
5. Se autorizado, abre o dashboard. Se `401`, tenta uma renovação controlada via SDK; se `403`, mostra conta sem permissão.
6. Em logout, encerrar sessão Supabase, limpar cache TanStack Query e voltar ao login.

**Segurança:** não guardar tokens manualmente em `localStorage`; usar mecanismos da biblioteca Supabase e avaliar o armazenamento de sessão conforme modelo de ameaça. Não registrar token em log ou analytics. Não colocar `service_role`/`secret key` no bundle Vite. Evitar usar armazenamento persistente para dados sensíveis do painel; limpar cache no logout.

## 8. Contrato de chamadas ao backend

Usar exclusivamente rotas `/v1/admin/*` para mudanças administrativas. Consultas públicas são separadas em `/v1/public/*`. Respostas de sucesso usam formato `{ data, meta? }`; erros `{ error: { code, message, details?, requestId } }`. Nunca inferir erros pelo texto de uma mensagem; usar `code`.

Principais chamadas:

| Recurso | Chamadas no painel |
|---|---|
| Sessão | `GET /v1/admin/me` |
| Dashboard | `GET /v1/admin/dashboard` |
| Shows | `GET/POST /v1/admin/shows`, `GET/PATCH /v1/admin/shows/:id`, `POST /:id/publish`, `POST /:id/unpublish`, `POST /:id/archive` |
| Álbuns | `GET/POST /v1/admin/albums`, `PATCH /v1/admin/albums/:id`, `POST /:id/publish`, `POST /:id/archive` |
| Fotos | `GET/POST /v1/admin/albums/:id/photos`, `PATCH /v1/admin/photos/:id`, `POST /:id/archive`, `PUT /v1/admin/albums/:id/photo-order` |
| Vídeos | `GET/POST /v1/admin/videos`, `PATCH /v1/admin/videos/:id`, `POST /:id/publish`, `POST /:id/unpublish`, `POST /:id/archive`, `PUT /v1/admin/videos/order` |
| Hero | `GET /v1/admin/hero`, `POST /v1/admin/hero/drafts`, `GET /v1/admin/hero/drafts/:id`, `POST /v1/admin/hero/drafts/:id/publish`, `POST /v1/admin/hero/versions/:id/restore` |
| Uploads | `POST /v1/admin/uploads/authorize`, `POST /v1/admin/uploads/:id/complete`, `POST /v1/admin/uploads/:id/abort` |

Detalhes exatos de payload, status HTTP e semântica estão no documento da API. A geração de tipos a partir de contratos compartilhados é obrigatória; não copiar manualmente os tipos de payload em aplicações diferentes.

## 9. Regras dos estados e feedback

- **Loading:** skeleton para consultas; spinner apenas em botões de ação.
- **Empty:** explicar o que falta e dar CTA principal.
- **Network error:** mostrar mensagem e **“Tentar novamente”**; preservar dados do formulário.
- **Validation error (`422`):** exibir por campo, foco no primeiro inválido.
- **Unauthorized (`401`):** tentativa controlada de renovação, depois login.
- **Forbidden (`403`):** tela de acesso negado.
- **Conflict (`409`):** informar que o item foi alterado, solicitar atualização, preservar rascunho local quando possível.
- **Upload parcial:** informar arquivos com sucesso/falha; nunca marcar todos como concluídos.
- **Mutação bem-sucedida:** toast breve; invalidação do cache administrativo; mostrar status atualizado.
- **Publicação:** confirmar **somente depois** que a API retornar sucesso; caso a sincronização com Next.js esteja pendente, apresentar “Publicado — atualização do site em andamento” quando a API indicar esse estado.
- Botões destrutivos exigem confirmação e usam linguagem explícita, não apenas ícones.

## 10. Estrutura de diretórios

```text
apps/admin/
├─ public/
├─ src/
│  ├─ app/
│  │  ├─ providers/           # QueryClient, Auth e Router
│  │  ├─ routes.tsx
│  │  └─ App.tsx
│  ├─ components/
│  │  ├─ layout/
│  │  ├─ ui/
│  │  ├─ forms/
│  │  └─ media/
│  ├─ features/
│  │  ├─ auth/
│  │  ├─ dashboard/
│  │  ├─ shows/
│  │  ├─ gallery/
│  │  ├─ videos/
│  │  └─ hero/
│  ├─ lib/
│  │  ├─ api-client.ts
│  │  ├─ supabase-auth.ts
│  │  ├─ query-keys.ts
│  │  └─ date-format.ts
│  ├─ styles/
│  └─ main.tsx
├─ .env.example
├─ vite.config.ts
└─ package.json
```

Componentes de domínio ficam próximos de suas features. Contratos compartilhados ficam em `packages/contracts`; não importar código de servidor no bundle do painel.

## 11. Variáveis de ambiente do admin

```env
VITE_API_BASE_URL=https://api.exemplo.com
VITE_SUPABASE_URL=https://projeto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=chave_publicavel
```

Somente valores públicos no `VITE_*`. **Nunca** expor senhas do banco, JWT signing secrets ou chave secreta de Supabase.

## 12. Tratamento de fotos e vídeos

- Fazer validação de extensão/tamanho no cliente **por conveniência**, mas respeitar validação final do servidor.
- Upload direto ao Storage **apenas depois da autorização pela API**; informar progresso.
- Após upload concluído, chamar API de confirmação para registrar `MediaAsset` em estado `READY`.
- Mostrar arquivos sem conclusão como erro ou pendentes, não no grid publicado.
- Sanitizar/validar links do YouTube via API; usar embeds de origem permitida `youtube-nocookie.com` quando adequado; não executar HTML de terceiros.
- Fotos devem ter campo `alt` adequado e imagens otimizadas; carregamento lazy nas grades.

## 13. Acessibilidade e performance

- WCAG 2.2 AA como objetivo; labels visíveis, foco por teclado, mensagens de erro associadas a inputs.
- Modal com foco contido e retorno ao botão de origem; menu mobile com ESC e `aria-expanded`.
- Não carregar todos os vídeos, imagens e records ao abrir dashboard; usar paginação, lazy loading e thumbnails.
- Evitar re-render global nos uploads; exibir progresso por arquivo.
- Respeitar `prefers-reduced-motion` e desabilitar animações não essenciais.
- Adotar `noindex` no admin; nunca tratar isso como controle de segurança.

## 14. Critérios de aceite / testes E2E

1. Sem login, todas as rotas protegidas redirecionam ao login, sem mostrar dados privados no primeiro frame.
2. Usuário autenticado sem registro ativo de admin recebe `403` e não acessa o painel.
3. Admin cria show em rascunho; show não aparece no endpoint público.
4. Admin publica show; lista e site público exibem informações corretas após revalidação.
5. Admin cancela ou adia show; status fica explícito; show passado permanece no histórico.
6. Admin envia 5 fotos; uma falha; UI identifica 4 sucessos e 1 falha e permite repetir apenas a falha.
7. Não é possível apagar arquivo usado pela Hero ativa.
8. Admin cadastra URL YouTube inválida; sistema rejeita sem gravar registro.
9. Admin cria nova Hero e visualiza mobile/desktop; publicação falha → Hero anterior permanece ativa.
10. Admin publica nova Hero; página pública utiliza a mídia correta por dispositivo.
11. Em 390 px, nenhuma ação crítica fica inacessível e não há overflow horizontal na tela principal.
12. Em 1440 px, navegação sidebar, listas e formulários usam a composição desktop.
13. Logout elimina dados privados de cache e exige nova autenticação.
14. Erro de rede e conflito não apagam conteúdo digitado.

## 15. Ordem de implementação

**Fase A:** setup do app, layout base, autenticação e proteção de rotas, cliente API e contratos.  
**Fase B:** agenda de shows ponta a ponta.  
**Fase C:** galeria, álbuns e upload.  
**Fase D:** links do YouTube.  
**Fase E:** Hero com duas versões, previews e rollback.  
**Fase F:** testes E2E, ajustes mobile, acessibilidade e build de produção.

## 16. Fora do escopo inicial

CRM, venda de ingressos, financeiro, analytics avançado, editor visual genérico do site, múltiplos papéis de administração, publicação agendada, processamento/transcodificação pesado de vídeo, notificações push. Preparar organização modular para crescimento, **sem construir funcionalidades não solicitadas**.

## 17. Definição de pronto

A tarefa só está concluída quando: interfaces mobile/desktop estão operacionais; dados vêm da API real; nenhum mock é enviado para produção; autenticação funciona; operações têm feedback correto; erros são tratados; uploads têm confirmação e limites; contratos de API estão sincronizados; testes principais passam; `.env.example` e README com comandos locais/deploy estão incluídos.

---

**Orientação ao agente:** seguir esta especificação e o documento da API. Ao encontrar lacuna operacional, escolher a solução mais simples e segura, registrar a decisão em `docs/DECISIONS.md`, sem modificar escopo, copy pública ou design system unilateralmente.
