# Jojo Mendes — Especificação Técnica, Arquitetura e Layout

**Versão:** 1.0  
**Data:** 15/11/2026  
**Natureza:** documento de execução para agente de IA desenvolvedor  
**Status:** escopo fechado para MVP visual; conteúdo real e identidade oficial serão entregues pelo contratante  
**Documento complementar obrigatório:** `jojo_mendes_design_system.md` (Design System v1.0)

> **INSTRUÇÃO À IA IMPLEMENTADORA:** construa exatamente a experiência definida aqui. Não invente marca, biografia, datas de shows, equipe, vídeos oficiais, dados de contato ou links. Quando um material real não tiver sido fornecido, utilize placeholder claramente identificado, com layout final funcional. A imagem de referência enviada pela cliente serve para orientar composição e atmosfera, não para copiar textos, logotipos ou código. Se conflitar com a identidade oficial ou este escopo, respeite a ordem de precedência abaixo.

## 1. Objetivo e critérios de sucesso

Criar o site oficial da cantora **Jojo Mendes**, com estética de espetáculo e percurso simples para duas audiências: fãs (agenda, história, vídeos e fotos) e produtores (contratação de shows). A interface deve ser excelente em **mobile e desktop**, com composições intencionalmente distintas, em vez de apenas reduzir o desktop.

**Prioridades em ordem:** 1) contratação de shows; 2) agenda; 3) posicionamento artístico; 4) distribuição de conteúdo/seguidores.

**Critérios de aceite:**
- Funciona em 320, 360, 390, 430, 768, 1024, 1280, 1440 e 1920 px, sem rolagem horizontal.
- Navegação por teclado, foco visível, sem interações bloqueadas por vídeo.
- Os CTAs da Hero são **exatamente** “Agendar show” e “Ver agenda”; não incluir frase de efeito nem parágrafo na Hero.
- Mobile e desktop têm estrutura visual própria conforme as seções 5–7.
- Vídeos de conteúdo incorporados do **YouTube**; IDs configuráveis e substituíveis sem mexer nos componentes.
- Sem show, artista da equipe, depoimento, contato ou link fictício se passando por real.
- Formulário não simula envio bem-sucedido: exibe corretamente situação de demo ou integra backend real.

## 2. Insumos que serão entregues à IA

O implementador receberá:
1. **Captura/imagem de site de referência indicada pela cliente** — observar ritmo visual, proporções, hierarquia e linguagem; adaptar ao conteúdo e à marca Jojo Mendes.
2. **Logotipo oficial** — preferencialmente SVG; usar sem redesenhar, deformar ou sobrepor tipografia inventada.
3. **Fotos da cantora** — organizar por finalidade, escolher enquadramentos apropriados para celular e desktop.
4. **Links oficiais:** Instagram, TikTok e canal do YouTube.
5. Poster e/ou vídeo da Hero, **se fornecidos**; até lá usar foto estática real da cantora. Não substituir a Hero por um YouTube aleatório.
6. Posteriormente: biografia aprovada, shows reais, dados comerciais, integrantes autorizados, press kit e vídeos oficiais.

**Contrato de assets:** salvar arquivos em `public/media/jojo/`, com nomes descritivos; não fazer hotlink de fotos de terceiros, não usar imagem gerada que se passe pela Jojo. Criar `src/content/site.ts` como fonte única de textos, URLs, imagens, agenda e IDs de vídeos. URLs ausentes são `null`, nunca `#` como se fossem links válidos.

### Precedência de instruções
1. Identidade oficial e material real aprovado da artista.
2. Este documento (escopo, layout e comportamento).
3. Design System v1.0 (tokens visuais e componentes).
4. Imagem de referência do site da cliente (direção estética, nunca clonagem literal).
5. Boas práticas da stack; qualquer divergência deve ser documentada.

## 3. Stack e decisões de arquitetura — fechadas

| Camada | Tecnologia | Decisão |
|---|---|---|
| Framework | **Next.js** com App Router | Uma aplicação, rotas estáveis, SSR/SSG conforme conteúdo |
| UI | **React + TypeScript** | Componentes tipados, composicionais |
| Estilo | **Tailwind CSS** | Tokens do Design System via tema/CSS variables; não usar valores arbitrários repetidos |
| Imagens | `next/image` | Tamanhos e prioridades por contexto |
| Fontes | `next/font` | Cormorant Garamond (títulos) e Manrope (interface), conforme Design System |
| Ícones | `lucide-react` | SVG consistente, sem biblioteca duplicada |
| Animação | CSS + `IntersectionObserver` quando necessário | Não incluir GSAP/Framer Motion/Three.js no MVP |
| Validação | Zod (cliente e servidor) | Esquema único do formulário |
| Formulários | React Hook Form + Zod | Erros acessíveis e estado de envio |
| Backend de contato | Next.js Route Handler `POST /api/contratacao` | Adaptador de envio configurável; envio real só após credencial/destino fornecido |
| Conteúdo inicial | Arquivo TypeScript tipado em `src/content/` | Sem CMS e sem banco de dados no MVP |
| Deploy | Plataforma compatível com Next.js | Variáveis de ambiente documentadas; não vincular sem autorização |
| Testes | Vitest + Testing Library, Playwright | Testes críticos de componentes e fluxos |

**Não implementar nesta fase:** painel administrativo, login, pagamentos, venda de ingressos, API externa de agenda, chatbot, blog, CMS, múltiplos idiomas, e-commerce, mapas carregados automaticamente, feed dinâmico de Instagram/TikTok, microserviços.

**Responsividade com duas composições:** criar `HeroMobile`/`HeroDesktop`, `HeaderMobile`/`HeaderDesktop` e as variantes específicas dos blocos com mudanças expressivas de layout; compartilhar conteúdo, hooks e primitives (`Button`, `SectionHeading`, `ShowCard`, `SocialLink`, `VideoCard`). Usar CSS media queries/container queries e Tailwind para seleção visual; **não** depender de user-agent nem renderizar conteúdo semanticamente duplicado para leitor de tela. Não criar dois projetos Next.js separados.

**Breakpoints do Design System:** `sm >= 480`, `md >= 768`, `lg >= 1024`, `xl >= 1200`, `2xl >= 1440`. Para esta experiência: **mobile até 767 px**, **tablet 768–1199 px** (layout intermediário), **desktop a partir de 1200 px**. A decisão depende da largura disponível, não do nome do dispositivo.

## 4. Estrutura de rotas

| Caminho | Papel | Comportamento |
|---|---|---|
| `/` | **Página principal** com todas as dobras abaixo | Navegação por âncoras |
| `/#historia` | História | Scroll para seção, compensar header fixo |
| `/#agenda` | Agenda de shows | Exibir estado vazio se não houver shows |
| `/#videos` | Vídeos | Cards YouTube |
| `/#galeria` | Fotos | Lightbox |
| `/#musicos` | Formação | Mostrar apenas profissionais confirmados |
| `/#imprensa` | Material de divulgação | Arquivos reais ou estado “Em preparação” |
| `/contratacao` | Página de conversão com formulário completo | URL de destino de “Agendar show” |
| `/privacidade` | Página de política de privacidade | Conteúdo jurídico **a ser aprovado**, não inventar política final |
| `/_not-found` | Não criar rota pública; usar `not-found.tsx` | Página 404 personalizada |

**Menu principal:** Início, História, Agenda, Vídeos, Galeria, Músicos. Ação destacada à direita: **Agendar show**. O bloco de imprensa é acessível pelo footer; não acrescentar itens extras ao menu sem solicitação.

## 5. Home — ordem exata das dobras

“Dobra” é usada aqui como **bloco visual de rolagem**, não garantia de que cada bloco caberá inteiro em uma única viewport. Respeitar esta ordem:

| Ordem | Bloco | Principal objetivo | CTA/link |
|---:|---|---|---|
| 0 | Header | Navegação + conversão | Agendar show |
| 1 | Hero cinematográfica | Apresentar marca e converter | Agendar show / Ver agenda |
| 2 | História | Aproximação com a artista | Sem CTA comercial obrigatório |
| 3 | Agenda | Informar futuros shows | Ver detalhes (somente se link real) |
| 4 | Vídeos | Mostrar apresentações e clipes via YouTube | Assistir no YouTube |
| 5 | Galeria de fotos | Atmosfera dos shows | Abrir foto |
| 6 | Formação musical | Apresentar músicos confirmados | Sem CTA obrigatório |
| 7 | Chamada final para contratação | Conversão após conhecer a artista | Agendar show |
| 8 | Imprensa / Divulgação | Material para produtores e imprensa | Download (somente com arquivo real) |
| 9 | Footer | Redes oficiais e navegação secundária | Instagram, TikTok, YouTube |

### 5.0 Header — comportamento global

**Mobile (0–767 px):** header fixo, `64px`, logotipo à esquerda com largura máxima visual de ~120 px, ícone menu à direita (`44x44px` mínimo). Transparente sobre topo da Hero; ao rolar, fundo escuro semitransparente com legibilidade. Menu abre em painel vertical escuro de largura total, links em coluna, separadores suaves e botão Agendar show destacado. O drawer fecha por botão, Escape, clique em link e clique externo. Bloquear scroll de fundo e gerenciar foco.

**Tablet (768–1199 px):** usar o header mobile expandido, altura `72px`, com logotipo um pouco maior.

**Desktop (>=1200 px):** header fixo `80px`, logotipo à esquerda, links horizontais centralizados, Agendar show à direita. Fundo inicialmente transparente; ao scroll torna-se grafite translúcido. Itens com underline sutil em hover/foco. Sem mega menu.

### 5.1 Dobra 1 — Hero

**Conteúdo exato:** logo oficial em posição de destaque + dois botões **Agendar show** e **Ver agenda**. **Sem título textual, subtítulo, frase promocional, contadores, ícones sociais ou terceiro CTA.**

**Mobile:** `min-height: 100svh` com crescimento quando necessário; vídeo/foto vertical preenchendo fundo (`object-fit: cover`) com `object-position` ajustável no arquivo de conteúdo. Camada de escurecimento/gradiente sob marca e CTAs. Logotipo centralizado na metade inferior, sem sobrepor rosto; dois botões empilhados com 12 px de distância, largura disponível até 320 px, posicionados acima da safe-area inferior. Em telas muito baixas permitir scroll em vez de cortar controles.

**Desktop:** Hero `min-height: 100svh`; fundo vídeo horizontal 16:9/foto em largura total; logotipo grande centralizado, ligeiramente abaixo do eixo visual; dois botões **lado a lado**, 16 px de gap. A imagem/vídeo da artista deve preservar o rosto, evitando crop agressivo; fundo com overlay necessário para contraste.

**Comportamento do vídeo de fundo (distinto dos vídeos do YouTube):** caso haja MP4/WebM fornecido, reproduzir `muted`, `playsInline`, `loop`, `autoplay` quando permitido, `poster` obrigatório e versão vertical/horizontal se disponíveis. Sem vídeo fornecido, mostrar **foto da Jojo**, sem player fake. Respeitar `prefers-reduced-motion`, economia de dados e bloqueios de autoplay: poster continua funcional. Não usar embed YouTube nesta Hero.

### 5.2 Dobra 2 — História

**Conteúdo:** micro-rótulo “A ARTISTA”, título “Jojo Mendes”, biografia **aprovada**, foto editorial da cantora. Sem criar data de nascimento, conquistas ou trajetória imaginárias.

**Mobile:** fundo escuro, foto vertical com proporção `4:5` e bordas discretas; abaixo, micro-rótulo, título e texto de 2–3 parágrafos curtos. Espaçamento entre foto e texto: 24 px. Enquanto não houver biografia, exibir texto neutro claramente marcado no código como conteúdo pendente, por exemplo “A história da artista será apresentada aqui.”

**Desktop:** 12 colunas: foto nos 5 primeiros slots, espaço/gutter, texto ocupando 6–7 slots à direita; centralização vertical do texto, título de destaque, largura de leitura de até `65ch`. Foto com altura de 560–680 px e foco no rosto. Sem carrossel de biografia.

### 5.3 Dobra 3 — Agenda de shows

**Conteúdo:** rótulo “ONDE NOS ENCONTRAR”, título “Próximos shows”, cards com data, cidade/UF, local e horário **somente quando confirmados**.

**Mobile:** cards em coluna única com data destacada à esquerda/superior, informações à direita/abaixo. 16 px entre cards; incluir no máximo 4 próximos shows visíveis antes de um eventual botão “Ver mais” (apenas se houver mais dados e expansão implementada).

**Desktop:** grid de 3 cards por linha, com largura equilibrada e espaçamento de 24 px; até 6 itens iniciais. Se houver mais, botão “Ver mais datas” expande no próprio bloco. Evitar carrossel automático.

**Sem dados de agenda:** mostrar estado vazio bonito e honesto: “Novas datas em breve.” Não inventar cidade, locais, datas nem links de ingresso.

### 5.4 Dobra 4 — Vídeos do YouTube

**Conteúdo:** rótulo “NO PALCO E NAS TELAS”, título “Vídeos”, um **vídeo em destaque** e até 4 cards menores. Fonte: `videoId` e título em `site.ts`.

**Mobile:** destaque 16:9 ocupando a largura do container; abaixo, lista de cards com thumbnail 16:9 à esquerda ou acima e título ao lado/abaixo conforme largura; no MVP adotar **cards empilhados, thumbnail acima do título** para clareza. 16 px entre cards. Sem autoplay nem vídeo tocando ao rolar.

**Desktop:** grade editorial: vídeo em destaque ocupando **7/12 colunas** à esquerda e lista de até 4 vídeos em **5/12 colunas** à direita, com cards horizontais pequenos (thumbnail + título). Espaço entre colunas 32 px.

**Integração:** a miniatura pode utilizar `https://i.ytimg.com/vi/{id}/hqdefault.jpg`; abrir iframe `youtube-nocookie.com/embed/{id}` **somente após interação do usuário** (click-to-play); `title` acessível, `allowFullScreen`, controles de player disponíveis, proporção 16:9. Também oferecer link “Assistir no YouTube”. Ao fechar/trocar vídeo, desmontar iframe para parar áudio.

**Dados provisórios:** enquanto os vídeos oficiais não forem fornecidos, permitir ID(s) de demonstração no array `demoVideos` com badge textual **“Vídeo demonstrativo — substituir”**. Pode começar com o ID público de demonstração `aqz-KE-bpKQ`; se indisponível, manter card com placeholder e aviso. Nunca rotular vídeos de terceiros como apresentação da Jojo. Ao fornecer IDs oficiais, trocar **apenas os dados**.

### 5.5 Dobra 5 — Galeria

**Conteúdo:** rótulo “MOMENTOS”, título “Galeria”, fotos autênticas fornecidas da cantora, sem copiar marca d’água nem gerar retratos falsos.

**Mobile:** mosaico de **2 colunas**, gaps de 12 px, a primeira foto ocupa as 2 colunas com aspecto 4:3; demais fotos com aspecto 1:1 ou 4:5. Mostrar inicialmente até 7 fotos (1 grande + 6 pequenas). Botão “Ver mais fotos” expande se houver outras.

**Desktop:** grid assimétrico com **4 colunas** e gaps de 16 px; primeira foto ocupa 2 colunas × 2 linhas e demais completam a malha. Exibir até 9 inicialmente. Usar ordem previsível e tamanhos conhecidos para evitar deslocamento de layout.

**Interação:** abrir lightbox acessível, com navegação anterior/próxima, fechar, Escape, foco e legenda/alt individual. Não abrir nova aba para visualizar imagem. Se houver menos fotos, grid deve se ajustar sem células vazias artificiais.

### 5.6 Dobra 6 — Formação musical

**Conteúdo:** rótulo “QUEM FAZ O SHOW”, título “Nossa formação”, cards de integrantes com foto real, nome e instrumento/função. Dar suporte a tecladista e guitarrista identificados quando os dados chegarem; demais músicos podem variar.

**Mobile:** cards em uma coluna, foto 4:5, nome e função abaixo; se houver 2 ou mais integrantes e espaço >=480 px, grid de 2 colunas. Não exibir rostos genéricos atribuídos a pessoas reais.

**Desktop:** grid de 3–4 colunas, cards editoriais, foto 3:4; efeito hover sutil de zoom de até 1.03 sem deslocar layout.

**Sem integrantes confirmados:** omitir os cards; manter seção compacta com mensagem “Formação musical em atualização” **ou ocultar a seção** se não houver qualquer informação autorizada, sem quebrar a ordem das demais seções. A decisão padrão do MVP é **seção compacta com mensagem**.

### 5.7 Dobra 7 — Contratação (chamada final)

**Conteúdo exato:** título “Leve Jojo Mendes para o seu evento”, apoio “Entre em contato para consultar disponibilidade e informações sobre shows.”, botão único **“Agendar show”**, destino `/contratacao`.

**Mobile:** bloco com fundo bordô profundo, texto centralizado, foto de palco ao fundo **se fornecida e legível**, CTA largura total até 320 px; padding vertical 64 px.

**Desktop:** faixa editorial ampla com foto de fundo recortada, overlay grafite/bordô, título grande à esquerda e botão à direita/alinhado abaixo do texto; padding vertical de 96–112 px. Não inserir formulário inteiro nesta dobra.

### 5.8 Dobra 8 — Imprensa / divulgação

**Conteúdo:** rótulo “PARA PRODUTORES”, título “Material de divulgação”, arquivos oficiais oferecidos: logotipo, fotos de divulgação, press kit e rider técnico **somente se disponibilizados e autorizados**.

**Mobile:** lista vertical com ícone de arquivo, nome, formato e ação download; gap 12 px.

**Desktop:** grid de 2–3 cards, com borda discreta, nome do material, tipo/tamanho e botão download. Se não houver arquivos, estado “Materiais em preparação” e nenhum botão que falhe.

### 5.9 Dobra 9 — Footer

**Mobile:** logo, linha de redes (Instagram, TikTok, YouTube), links de navegação, contato comercial se fornecido, privacidade e copyright; blocos empilhados, padding 48–64 px.

**Desktop:** 3 colunas: marca/resumo curto; navegação; redes e contato. Faixa final com copyright e privacidade. Sem telefone, endereço ou e-mail inventados.

**Redes:** renderizar somente URLs oficiais válidas que o usuário fornecer. Abrir em nova aba com `rel="noopener noreferrer"`, ícones com `aria-label`. Não construir feed embedded das redes.

## 6. Página `/contratacao` — layout final

**Objetivo:** receber solicitações reais de contratação com clareza. A rota é acessada pelos CTAs da Home.

**Mobile:** header compacto + topo editorial simples com título **“Agendar show”** + apoio “Preencha os dados para solicitar informações sobre disponibilidade.”; formulário em coluna única; após o envio mostrar estado correspondente; footer básico. Campos com altura mínima 48 px.

**Desktop:** largura máxima de container 1200 px, conteúdo em 2 colunas: à esquerda (4/12) foto aprovada da cantora e texto curto; à direita (8/12) formulário em superfície grafite. Campos de nome e WhatsApp, data e horário, cidade e estado podem ficar em pares se couber; demais em linhas completas. Sem formulário em modal.

### Campos (ordem obrigatória)

| Campo | Tipo | Obrigatório | Regra |
|---|---|---|---|
| Nome completo / responsável | `text` | Sim | 2–120 caracteres |
| WhatsApp com DDI | `tel` | Sim | Aceitar telefone internacional validável |
| Cidade do evento | `text` | Sim | 2–100 caracteres |
| Estado/UF | `select` | Sim | UFs brasileiras + opção exterior se aplicável |
| Data pretendida | `date` | Sim | Não permitir data passada |
| Local do evento | `text` | Sim | 2–160 caracteres |
| Horário pretendido | `time` | Não | Sem valor inventado |
| Público estimado | `number` | Não | Inteiro positivo razoável |
| Estrutura / informações adicionais | `textarea` | Não | Máximo 2000 caracteres |
| Consentimento / ciência da política | `checkbox` | Sim | Texto submetido à revisão jurídica; link `/privacidade` |

**Botão:** “Enviar solicitação”. Exibir spinner durante envio; bloquear duplo clique; retornar mensagens claras. Após sucesso real: “Solicitação enviada. Nossa equipe entrará em contato.” Em erro: “Não foi possível enviar agora. Tente novamente.” Em ambiente de demonstração sem envio configurado, **não exibir sucesso**; mostrar “Formulário de demonstração: envio ainda não habilitado.”

**Contrato técnico:** `POST /api/contratacao` recebe JSON validado por Zod, aplica limite de tamanho, honeypot, rate limit e logging seguro (sem dados sensíveis em logs). O servidor usa adaptador `sendBookingInquiry()` para provedor de e-mail configurado posteriormente. Sem credenciais, devolver **503 com `code: "NOT_CONFIGURED"`**, nunca 200 falso. Não expor chaves no cliente. Usar resposta `200/201` apenas após confirmação de aceite pelo provedor.

**Privacidade:** página `/privacidade` deve existir, mas o texto final precisa ser providenciado/revisado por responsável. Não publicar uma política genérica inventada como documento legal definitivo. Não armazenar solicitações em banco sem escopo de retenção definido.

## 7. Matriz de layout e medidas

| Elemento | Mobile (<768) | Tablet (768–1199) | Desktop (>=1200) |
|---|---|---|---|
| Container horizontal | margem 20 px (mín. 16) | 32 px | máx. 1280 px + margem 48 px |
| Header | 64 px | 72 px | 80 px |
| Hero | min. 100svh, mídia 9:16 | min. 100svh, crop adaptável | min. 100svh, mídia 16:9 |
| Padding vertical de seção | 64 px | 80 px | 112 px |
| Grid principal | 4 colunas | 8 colunas | 12 colunas |
| Gap entre cards | 16 px | 20 px | 24 px |
| Botão primário | altura mín. 48 px | 48 px | 52 px |
| História | foto + texto empilhados | 2 colunas | 5/7 colunas |
| Agenda | 1 card/linha | 2 cards/linha | 3 cards/linha |
| Vídeos | destaque + cards verticais | destaque + lista | destaque 7/12 + lista 5/12 |
| Galeria | 2 colunas, 1 imagem 2x | 3 colunas | 4 colunas, 1 imagem 2×2 |
| Músicos | 1 (ou 2 em >=480) | 2–3 | 3–4 |
| Contratação | form 1 coluna | form 1 coluna larga | foto 4/12 + form 8/12 |

**Sistema visual:** usar exatamente tokens e fontes do `jojo_mendes_design_system.md`: preto `#0B0B0D`, grafite `#232127`, dourado `#EFC16B`, creme `#FAF7F1`, bordô `#732D45`, enquanto a identidade oficial não exigir ajuste. Fonte Cormorant Garamond para títulos e Manrope para texto/UI. **Não criar um segundo design system.**

## 8. Motion e transições

- Hero: sem zoom automático de câmera via CSS; vídeo natural ou foto estática.
- Entrada de seções: fade + deslocamento vertical discreto (`12–20px`, `300–500ms`) uma vez quando visíveis; conteúdo continua acessível sem JavaScript.
- Cards: hover leve de elevação, sem animação constante.
- Menu mobile: abertura em `200–250ms`, foco gerenciado.
- Respeitar `prefers-reduced-motion: reduce`: eliminar entrada/transformações não essenciais e usar poster na Hero.
- Nunca atrasar exibição de texto ou interação por animação; evitar efeitos de scroll pesados neste MVP.

## 9. Organização dos componentes

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    contratacao/page.tsx
    privacidade/page.tsx
    api/contratacao/route.ts
    not-found.tsx
  components/
    ui/                 # Button, Container, SectionHeading, Input, Modal
    navigation/         # Header, HeaderMobile, HeaderDesktop, MobileMenu
    home/
      Hero.tsx          # controla variantes e fallback
      HeroMobile.tsx
      HeroDesktop.tsx
      HistoriaSection.tsx
      AgendaSection.tsx
      VideosSection.tsx
      GaleriaSection.tsx
      MusicosSection.tsx
      ContratacaoCTASection.tsx
      ImprensaSection.tsx
    media/              # YouTubeVideoCard, YouTubePlayer, PhotoLightbox
    booking/            # BookingForm, BookingFormFields
    layout/             # Footer, SocialLinks
  content/
    site.ts             # dados e conteúdo; não hardcode nos componentes
  lib/
    validation/booking.ts
    booking/sendBookingInquiry.ts
    utils.ts
  types/
    site.ts
public/
  media/jojo/           # logotipo, fotos, posters, vídeos autorizados
  placeholders/         # assets neutros para desenvolvimento
```

**Regra:** se uma seção tem variantes mobile/desktop, variantes recebem o **mesmo modelo de dados** e usam mesmo design system. Componentes visuais podem divergir; lógica e conteúdo não devem ser duplicados.

## 10. Modelos de dados de conteúdo

```ts
export type SocialLinks = {
  instagram: string | null;
  tiktok: string | null;
  youtube: string | null;
};

export type Show = {
  id: string;
  date: string; // YYYY-MM-DD
  city: string;
  state: string;
  venue: string;
  time?: string; // HH:mm; apenas se confirmado
  detailsUrl?: string;
  status: 'confirmed' | 'sold_out' | 'cancelled';
};

export type ArtistVideo = {
  id: string;
  youtubeId: string;
  title: string;
  isDemo: boolean;
};

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  positionMobile?: string;
  positionDesktop?: string;
};

export type Musician = {
  id: string;
  name: string;
  role: string;
  photo: string;
  confirmed: boolean;
};

export type PressAsset = {
  id: string;
  title: string;
  href: string;
  format: string;
  sizeLabel?: string;
};
```

`site.ts` deve exportar `brand`, `socialLinks`, `heroMedia`, `biography`, `shows`, `videos`, `gallery`, `musicians`, `pressAssets`. Implementar arrays vazios e estados vazios corretos. URLs de redes e mídia precisam ser verificadas, não estimadas.

## 11. SEO, acessibilidade e performance

**SEO (otimização para mecanismos de busca):** metadados por rota, `title` “Jojo Mendes | Site Oficial”, descrição neutra aprovada, Open Graph com imagem oficial entregue, canonical conforme domínio real após definido, sitemap e robots no momento do deploy; JSON-LD de `MusicGroup` ou `Person` **apenas se validado com dados oficiais**. Não inventar eventos para rich results.

**Acessibilidade:** documento `lang="pt-BR"`; um H1 semântico por página (na Home pode ser o nome acessível da artista, visualmente oculto se necessário, sem criar texto visual na Hero); ordem de headings; rótulos; tabulação; focus ring; contraste WCAG 2.2 AA como meta; alt apropriado; Escape em modais/menus; `aria-live` em status de envio; botões com alvo de toque >=44 px recomendado. Não ocultar conteúdo semanticamente por CSS de modo inconsistente entre variantes.

**Performance:** priorizar poster da Hero/primeira imagem (LCP); lazy-load imagens abaixo da dobra; YouTube iframe somente sob clique; `next/image` com `sizes` correto; fontes com `next/font`; evitar scripts de terceiros desnecessários; não carregar duas mídias pesadas de Hero simultaneamente em mobile e desktop; media queries com `<picture>`/`source` para posters e `source media` para vídeos quando viável. Metas de experiência medidas em campo: LCP <=2,5s, INP <=200ms, CLS <=0,1 no percentil 75.

**Segurança:** validação de URL de embed (usar apenas ID de YouTube, nunca HTML arbitrário), `rel` em links externos, `Content-Security-Policy` compatível com YouTube e Next.js, rate limit do endpoint e não publicar segredos no bundle.

## 12. Plano de execução obrigatório da IA

1. **Auditar os insumos:** identificar logo, imagens, referência e redes. Criar inventário de arquivos; não declarar conteúdo ausente como recebido.
2. **Configurar Next.js + React + TypeScript + Tailwind:** importar design tokens, fontes, `app/layout.tsx`, metadados e styles.
3. **Construir primitives + Header e Hero:** primeiro mobile, depois composição desktop específica; validar botões e fallback.
4. **Construir Home na ordem fechada:** História, Agenda, Vídeos, Galeria, Músicos, CTA contratação, Imprensa, Footer.
5. **Construir `/contratacao` e `/privacidade`:** validação e estados; adaptador sem envio fake.
6. **Adicionar conteúdo real recebido** em `site.ts`; usar demo **visivelmente identificada** nos vídeos temporários.
7. **Testar variantes** em todos os viewports da seção 1 e fluxo completo da contratação.
8. **Ajustar conformidade ao mock de referência** sem sacrificar contratos e conteúdo real.
9. **Entregar README** com setup, `.env.example`, como substituir vídeos do YouTube, inserir agenda, trocar fotos, configurar envio e realizar deploy.

### Entregáveis mínimos

- Código-fonte Next.js funcional, sem erros de TypeScript/lint/build.
- Home completa com estados vazios reais e experiências mobile/desktop.
- Página de contratação, API com estado de configuração explícito, política provisória pendente de aprovação.
- Componentes com acessibilidade básica e testes de fluxo principais.
- README, `.env.example` e lista objetiva do que falta receber da artista.

## 13. Restrições que a IA não pode contrariar

1. **Não** criar estrutura visual genérica de “template SaaS”, gradientes aleatórios, cards de métricas ou áreas tecnológicas.
2. **Não** mudar a ordem das dobras ou adicionar novas seções sem aprovação.
3. **Não** inventar biografia, depoimentos, agenda, integrantes, marcas patrocinadoras ou dados comerciais.
4. **Não** exibir vídeos de terceiros como se fossem vídeos oficiais da artista.
5. **Não** usar YouTube como fundo de Hero; os embeds são somente na seção **Vídeos**.
6. **Não** criar experiência mobile como simples encolhimento do desktop; respeitar as composições especificadas.
7. **Não** gerar duas aplicações ou manter bases de dados duplicadas para mobile/desktop.
8. **Não** ativar formulário de captação sem backend funcional e privacidade revisada.
9. **Não** implementar bibliotecas/efeitos complexos fora do escopo por preferência estética.
10. **Não** distorcer logotipo ou fazer retratos sintéticos da cantora se passando por fotos oficiais.

## 14. Checklist de aceite final

- [ ] Logo oficial, fotos e referências integrados sem distorção.
- [ ] Home em ordem correta; Hero com exatamente dois CTAs e nenhum texto promocional.
- [ ] Header mobile com menu acessível; header desktop com navegação horizontal.
- [ ] Mobile e desktop com layouts próprios em todas as seções especificadas.
- [ ] Agenda sem eventos inventados; estados vazios funcionais.
- [ ] Vídeos do YouTube por ID, demo identificada, lazy player, troca por dados simples.
- [ ] Galeria com `alt` e lightbox acessível.
- [ ] Músicos apenas confirmados ou aviso de conteúdo pendente.
- [ ] Links oficiais Instagram, TikTok e YouTube funcionando.
- [ ] Contratação com validação e sem falso sucesso.
- [ ] Design tokens, espaçamentos e tipografia consistentes com Design System v1.0.
- [ ] Navegação, teclado, contraste, `prefers-reduced-motion` e responsividade revisados.
- [ ] Build, lint e testes de navegação/formulário executados.
- [ ] README descreve substituição de assets, vídeos e configuração de envio.

---

**Nota final à IA:** se os materiais da cliente sugerirem uma estética diferente da proposta do Design System, manter inicialmente os tokens definidos e **registrar discrepâncias para revisão**, sem reformular o projeto por conta própria. A prioridade desta etapa é implementar uma primeira versão fiel à arquitetura e ao layout acordados, usando conteúdo real quando disponível e placeholders honestos quando não.
