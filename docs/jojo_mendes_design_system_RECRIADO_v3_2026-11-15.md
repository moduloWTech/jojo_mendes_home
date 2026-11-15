# DESIGN SYSTEM — JOJO MENDES

**Versão:** 3.0 — documento recriado  
**Data:** 15 de novembro de 2026  
**Projeto:** Site oficial da cantora Jojo Mendes  
**Status:** especificação para desenvolvimento; validar cores e famílias tipográficas com a identidade oficial  
**Tecnologia-alvo:** Next.js + React + TypeScript + Tailwind CSS

> **CONTRATO PARA A IA IMPLEMENTADORA:** este documento determina a aparência e o comportamento visual da experiência. Não substituir tokens por preferências pessoais, não criar uma segunda identidade visual e não inventar conteúdo real da cantora. O logotipo, as fotografias e a referência enviada pela cliente prevalecem como materiais oficiais. As regras de estrutura e textos estão nos documentos complementares de Especificação Técnica/Layout e Copy/CTAs.

---

## 01. Objetivo e princípios

O site deve traduzir a energia dos shows de Jojo Mendes em uma experiência digital sofisticada, escura, editorial e centrada em fotografias e vídeos. A navegação precisa atender fãs que querem acompanhar agenda e vídeos e produtores que desejam contratar apresentações.

**Princípios inegociáveis:**

1. A artista é protagonista; interface não compete com imagem ou vídeo.
2. O caminho para **Agendar show** deve ser reconhecível, acessível e funcional.
3. Mobile e desktop são duas composições deliberadas, dentro de uma única aplicação.
4. Uso consistente de cores, fontes, ritmos e estados de interface.
5. Acessibilidade e desempenho são requisitos, não ornamentos.
6. Dados ausentes são identificados como pendentes; nunca preenchidos como fatos fictícios.

**Hierarquia de referências:** (1) identidade e materiais oficiais aprovados; (2) mapa de copy e CTA; (3) especificação técnica e layout; (4) design system; (5) screenshot de referência para atmosfera e composição, sem reprodução literal da marca de terceiros.

---

## 02. Direção artística

**Palavras-chave:** palco, presença, elegância, música ao vivo, calor, fotografia imersiva, contraste, proximidade.

**Composição:** fundos escuros, títulos editoriais expressivos, fotografia em escala grande, blocos de texto objetivos, acentos em dourado-âmbar. O bordô funciona como cor de ambientação, não como cor principal de botões.

**Tratamento fotográfico:** preservar pele, iluminação de palco e as cores originais da cantora. Aplicar overlay apenas quando necessário à legibilidade. Não deformar, suavizar excessivamente ou gerar fotos artificiais que se passem por fotos reais.

**Logotipo:** usar somente a marca oficial entregue; preferir SVG ou PNG transparente de alta qualidade. Não redesenhar usando fontes do site. Aplicar áreas de respiro mínimas equivalentes a 20% da altura visível da marca; nunca distorcer proporções.

---

## 03. Cores — tokens primitivos

As cores abaixo constituem **proposta visual inicial** e devem ser verificadas contra a identidade aprovada da Jojo.

| Token | HEX | Uso |
|---|---|---|
| `ink-950` | `#0B0B0D` | Fundo global |
| `ink-900` | `#141317` | Fundo de seção alternada |
| `ink-800` | `#232127` | Cards, menus e modais |
| `ink-700` | `#353139` | Superfícies elevadas |
| `cream-50` | `#FAF7F1` | Texto principal no tema escuro |
| `cream-100` | `#EFE9DF` | Fundo claro de contraste |
| `cream-300` | `#D2C9BC` | Texto secundário |
| `gold-300` | `#F7D995` | Destaques de texto e hover |
| `gold-400` | `#EFC16B` | CTA primário |
| `gold-500` | `#DDA84E` | Variação dourada |
| `gold-700` | `#805514` | Acento sobre superfícies claras |
| `wine-700` | `#732D45` | Acento editorial |
| `wine-900` | `#391924` | Fundo editorial eventual |
| `success-400` | `#4ADE80` | Estado positivo |
| `warning-400` | `#FBBF24` | Aviso |
| `danger-400` | `#FB7185` | Erro |

### 03.1 Cores semânticas

| Token | Valor | Contexto |
|---|---|---|
| `--color-bg` | `#0B0B0D` | Corpo do site |
| `--color-bg-alt` | `#141317` | Alternância de blocos |
| `--color-surface` | `#232127` | Cards |
| `--color-surface-hover` | `#353139` | Hover de cards interativos |
| `--color-text` | `#FAF7F1` | Títulos/corpo |
| `--color-text-muted` | `#D2C9BC` | Legendas e apoio |
| `--color-text-inverse` | `#0B0B0D` | Texto sobre dourado |
| `--color-primary` | `#EFC16B` | Ação principal |
| `--color-primary-hover` | `#F7D995` | Hover da ação |
| `--color-border` | `#514A51` | Campos e bordas |
| `--color-border-subtle` | `#343036` | Divisores |
| `--color-focus` | `#F7D995` | Foco de teclado |
| `--color-danger` | `#FB7185` | Mensagens de erro |

### 03.2 Regras de combinação

- Plano de fundo padrão: `ink-950` + texto `cream-50`.
- Card padrão: `ink-800` + texto `cream-50` + borda sutil.
- CTA primário: `gold-400` + texto `ink-950`; no hover, `gold-300`.
- CTA secundário escuro: fundo transparente + contorno creme claro + texto creme.
- Áreas claras excepcionais: `cream-100` + texto `ink-950`; recalibrar contraste dos acentos.
- Bordô apenas em decoração, fundo de seção especial ou detalhes que não substituam a hierarquia do dourado.
- Não usar dourado claro em texto pequeno sobre creme claro.
- Conferir contraste real: WCAG AA — 4,5:1 para texto comum, 3:1 para texto grande e componentes informativos.

---

## 04. Tipografia

**Títulos:** `Cormorant Garamond`, pesos 600 e 700, fallback `Georgia, serif`.  
**Interface e corpo:** `Manrope`, pesos 400, 500, 600 e 700, fallback `Arial, sans-serif`.

Essas fontes são propostas de UI; **não definem a tipografia do logotipo**. Usar `next/font` e evitar carregamento redundante de famílias.

### 04.1 Escala tipográfica fechada

Valores: `font-size / line-height`, em **px CSS**.

| Papel | Mobile 320–767 | Tablet 768–1199 | Desktop ≥1200 | Família/peso |
|---|---|---|---|---|
| Display XL | 48 / 50 | 72 / 76 | 104 / 104 | Cormorant 600 |
| Display L | 40 / 44 | 56 / 62 | 80 / 84 | Cormorant 600 |
| H1 | 36 / 40 | 48 / 54 | 64 / 68 | Cormorant 600 |
| H2 | 32 / 38 | 40 / 46 | 52 / 58 | Cormorant 600 |
| H3 | 26 / 32 | 30 / 38 | 36 / 44 | Cormorant 600 |
| H4 | 22 / 28 | 24 / 32 | 28 / 36 | Manrope 700 |
| Corpo grande | 18 / 29 | 19 / 30 | 20 / 32 | Manrope 400 |
| Corpo padrão | 16 / 26 | 16 / 27 | 17 / 28 | Manrope 400 |
| Corpo pequeno | 14 / 22 | 14 / 22 | 14 / 22 | Manrope 400 |
| Label de campo | 14 / 20 | 14 / 20 | 14 / 20 | Manrope 700 |
| Eyebrow | 12 / 18 | 12 / 19 | 13 / 20 | Manrope 700 |
| Legenda | 12 / 18 | 12 / 18 | 12 / 18 | Manrope 500 |

**Tracking:** Display `-0.035em`; H1 `-0.025em`; H2 `-0.02em`; H3/H4 `-0.015em`; eyebrow `0.12em`; corpo `0`. Não usar `letter-spacing` negativo em parágrafos.

**Regras:** máximo de `65ch` para texto longo; `text-wrap: balance` em títulos curtos quando suportado; evitar mais de três linhas de título na maioria dos componentes; corpo de formulários mobile sempre ≥16 px para reduzir zoom automático; não centralizar biografias extensas.

---

## 05. Breakpoints e estratégia responsiva

| Composição | Faixa de viewport |
|---|---|
| Mobile | 320–767 px |
| Tablet (transição) | 768–1199 px |
| Desktop | ≥1200 px |

Breakpoints do Tailwind a configurar: `sm: 480`, `md: 768`, `lg: 1024`, `xl: 1200`, `2xl: 1440` px. O tablet usa decisões intermediárias definidas, sem apenas ampliar o celular.

**Arquitetura visual:** `HeaderMobile`/`HeaderDesktop` e `HeroMobile`/`HeroDesktop` quando a composição for realmente diferente; componentes e dados compartilhados para cards, botões e textos. Não detectar pelo user-agent. Não criar duas aplicações independentes.

**Larguras para validação:** 320, 360, 375, 390, 430, 768, 1024, 1200, 1280, 1440 e 1920 px. Não permitir scroll horizontal em nenhuma.

---

## 06. Espaçamentos e ritmo

**Base:** 4 px; evitar espaços arbitrários que não existam nos tokens.

| Token | Valor |
|---|---|
| `space-0` | 0 px |
| `space-1` | 4 px |
| `space-2` | 8 px |
| `space-3` | 12 px |
| `space-4` | 16 px |
| `space-5` | 20 px |
| `space-6` | 24 px |
| `space-8` | 32 px |
| `space-10` | 40 px |
| `space-12` | 48 px |
| `space-14` | 56 px |
| `space-16` | 64 px |
| `space-20` | 80 px |
| `space-24` | 96 px |
| `space-28` | 112 px |
| `space-32` | 128 px |
| `space-40` | 160 px |

### 06.1 Métricas por dispositivo

| Item | Mobile | Tablet | Desktop |
|---|---|---|---|
| Margem lateral de página | 20 px (16 px em 320) | 32 px | 64 px (máximo via container) |
| Padding vertical de seção | 64 px | 88 px | 112 px |
| Espaço entre título e conteúdo | 28 px | 36 px | 48 px |
| Espaço entre eyebrow e título | 8 px | 10 px | 12 px |
| Espaço título e parágrafo | 16 px | 20 px | 24 px |
| Gaps de cards | 16 px | 20 px | 24 px |
| Gap entre colunas editoriais | 24 px | 40 px | 64 px |
| Padding interno de card | 20 px | 24 px | 32 px |
| Gap vertical entre campos | 20 px | 24 px | 24 px |
| Espaço entre CTAs lado a lado | 12 px | 12 px | 16 px |
| Distância segura do fim de seção para CTA | 24 px | 32 px | 40 px |

**Regra de respiro:** sempre usar a seção e não o elemento individual para criar a maior parcela do espaço vertical. Nunca adicionar margem vertical duplicada em componentes adjacentes.

---

## 07. Containers e grids

### 07.1 Larguras

| Breakpoint | Colunas | Gutters | Container |
|---|---:|---:|---|
| Mobile | 4 | 16 px | largura disponível, padding lateral da seção |
| Tablet | 8 | 20 px | largura disponível, padding 32 px |
| Desktop | 12 | 24 px | `max-width: 1280px`, centralizado |
| Desktop ≥1440 | 12 | 24 px | `max-width: 1280px`, centralizado |

**Exceções:** Hero e algumas fotos de destaque são full-bleed, ocupando toda a viewport. O conteúdo textual dentro desses blocos respeita safe-area e margens de segurança.

**Grid de conteúdo:** história desktop 5/7 colunas ou 6/6 conforme a fotografia; agenda desktop 3 cards por linha; vídeos 1 destaque + 2 secundários; galeria desktop mosaico; formação desktop cards em grid. Mobile: uma coluna para conteúdo textual e cards, com exceção de mosaicos aprovados.

---

## 08. Bordas, raios e sombras

| Token | Mobile | Desktop | Destino |
|---|---:|---:|---|
| `radius-sm` | 8 px | 8 px | Labels e controles compactos |
| `radius-md` | 12 px | 12 px | Inputs e botões |
| `radius-lg` | 16 px | 20 px | Cards |
| `radius-xl` | 20 px | 24 px | Mídia em destaque |
| `radius-2xl` | 24 px | 32 px | Painéis especiais |
| `radius-pill` | 999 px | 999 px | Chips opcionais |

Bordas de 1 px com `--color-border-subtle` em cards; 1 px com `--color-border` em campos. Sombras discretas porque o site é predominantemente escuro: `0 12px 32px rgba(0,0,0,.20)` para cards elevados; `0 24px 64px rgba(0,0,0,.36)` para overlays e modal. Não adicionar glow forte em todos os componentes.

---

## 09. Botões e links

### 09.1 Variantes

- **Primary:** fundo `gold-400`, texto `ink-950`, peso 700, ícone opcional à direita, hover `gold-300`.
- **Secondary:** fundo transparente, texto `cream-50`, borda `1px solid cream-50` com opacidade adequada; hover fundo creme muito suave.
- **Text:** texto em creme/dourado conforme contexto, underline no hover **e** foco.
- **Destructive:** somente para ações destrutivas reais; não utilizar como destaque comercial.

### 09.2 Dimensões

| Medida | Mobile | Tablet | Desktop |
|---|---|---|---|
| Altura botão principal | 52 px | 52 px | 56 px |
| Altura botão secundário | 52 px | 52 px | 56 px |
| Padding horizontal | 24 px | 28 px | 32 px |
| Fonte | 15 px / 20 | 15 px / 20 | 16 px / 22 |
| Raio | 12 px | 12 px | 12 px |
| Ícone | 18 px | 18 px | 20 px |
| Espaço texto/ícone | 8 px | 8 px | 10 px |
| Área mínima de toque dos ícones isolados | 44 × 44 px | 44 × 44 px | 44 × 44 px |

**Estados obrigatórios:** default, hover (ponteiro), active, focus-visible (anel 2 px com afastamento 3 px), disabled (baixa ênfase mas legível), loading (texto e spinner sem mudança de largura). Desabilitar clique duplo em envios reais.

**CTAs aprovados:** Hero possui exatamente **Agendar show** (primary, leva a `/contratacao`) e **Ver agenda** (secondary, leva a `/#agenda`). Header possui Agendar show; área de contratação repete Agendar show. Botões extras não devem ser adicionados à Hero.

---

## 10. Header e navegação

| Propriedade | Mobile | Tablet | Desktop |
|---|---|---|---|
| Altura do header | 64 px | 72 px | 80 px |
| Navegação | Menu drawer | Menu drawer | Links horizontais |
| Alinhamento logo | Esquerda | Esquerda | Esquerda |
| Largura máxima visual da logo no header | 120 px | 144 px | 168 px |
| Gatilho menu | 44 × 44 px | 44 × 44 px | Não existe |
| Fundo ao entrar na página | Transparente sobre Hero | Transparente | Transparente |
| Fundo após rolagem | Grafite translúcido + backdrop | Idem | Idem |

**Menu:** Início, História, Agenda, Vídeos, Galeria, Músicos, com Agendar show destacado. Área de imprensa no rodapé. Menu mobile de largura total e altura compatível com viewport; fechar via botão, Escape, clique em link e clique fora; prender foco adequadamente, restaurar foco ao fechar e bloquear rolagem ao fundo.

**Sticky:** o header é fixo e usa `scroll-margin-top` em todas as âncoras para não encobrir títulos. Não manter o menu sobre a caixa de diálogo da galeria.

---

## 11. Hero cinematográfica

### 11.1 Conteúdo que deve aparecer

1. Mídia de fundo: vídeo próprio da artista quando entregue ou foto oficial como fallback.
2. Overlay/gradiente para garantir legibilidade.
3. Logotipo oficial em destaque.
4. Exatamente dois CTAs: **Agendar show** e **Ver agenda**.

**Não incluir** tagline, biografia, headline editorial, redes sociais, contadores ou terceiro botão na Hero. A imagem da cliente orienta o acabamento visual; não autoriza a invenção de textos.

### 11.2 Mobile

- Altura mínima `100svh`, expandindo caso controles precisem de mais espaço.
- Preferência por foto/vídeo vertical `9:16`, `object-fit: cover` e `object-position` ajustável no conteúdo.
- Conteúdo centralizado horizontalmente, agrupado na parte inferior/média inferior sem cobrir o rosto.
- Logotipo: largura alvo `min(72vw, 300px)`, sem altura fixa e sem distorção.
- CTAs em coluna, gap `12px`, cada um com largura de até `320px` e respeitando as margens laterais.
- Folga inferior: `max(32px, env(safe-area-inset-bottom) + 24px)`.

### 11.3 Desktop

- Altura mínima `100vh` (preferir unidades dinâmicas adequadas quando necessário).
- Foto/vídeo horizontal `16:9`, cobrindo a largura total sem barras pretas.
- Logotipo em destaque central, largura máxima `480px`, sujeito à área segura do enquadramento.
- Dois CTAs em linha com gap `16px`, centralizados sob a marca, largura automática e altura 56 px.
- Fundo e composição criam sensação de palco; nunca diminuir contraste a ponto de tornar botões ilegíveis.

### 11.4 Vídeo e fallback

- Na Hero: vídeo **local ou próprio** com `muted`, `playsInline`, `autoPlay`, `loop`, `poster`; se não houver arquivo, usar foto.
- Não incorporar vídeo genérico do YouTube na Hero.
- A seção Vídeos usa embeds YouTube com IDs configuráveis; podem existir vídeos demonstrativos temporários claramente identificados, sem atribuí-los à artista.
- Não carregar vídeos ocultos de ambas as composições simultaneamente sem necessidade.
- Ao respeitar `prefers-reduced-motion`, preferir poster estático.

---

## 12. Componentes de seção

### 12.1 Cabeçalho de seção

Um `SectionHeading` compartilhado com eyebrow opcional, H2 e descrição opcional. Mobile alinhado à esquerda salvo decisão explícita de composição; desktop pode centralizar cabeçalhos curtos de agenda/vídeos. Largura máxima da descrição `65ch`.

### 12.2 História

**Mobile:** título, fotografia vertical com `aspect-ratio: 4/5`, biografia em parágrafos e respiro 24 px. **Desktop:** composição editorial em duas colunas (foto 5/12, texto 7/12), foto grande com bordas discretas. Não criar cronologia ou números de carreira não fornecidos.

### 12.3 Agenda

**Mobile:** cards empilhados, altura natural. **Tablet:** 2 colunas. **Desktop:** 3 colunas. Cada `ShowCard` tem data real, local, cidade e link de detalhes apenas se existir URL válida. Estado vazio: mensagem discreta informando que novas datas serão divulgadas, sem inventar evento. Card com hover sutil, nunca transformar o card inteiro em link se parte dele não tiver destino.

### 12.4 Vídeos do YouTube

**Mobile:** primeiro vídeo em proporção 16:9 com largura disponível, secundários em lista/coluna. **Desktop:** um vídeo destaque ocupando a maior área e dois secundários ao lado ou abaixo, de acordo com a grade especificada. Thumbnails com botão visível “Reproduzir vídeo”, título e origem (YouTube); ativar iframe somente sob interação quando possível. Placeholders não devem afirmar conteúdo oficial da cantora.

### 12.5 Galeria

**Mobile:** imagens em uma coluna ou duas colunas apenas em composições adequadas e testadas em 320 px. **Desktop:** mosaico editorial com diferentes proporções, sem recortar rostos. Abrir em lightbox acessível com fechar, próximo/anterior, Escape, foco controlado e texto alternativo descritivo. Não baixar imagens enormes quando miniaturas bastarem.

### 12.6 Formação musical

Cards apresentam somente músicos confirmados. Mencionados no escopo: tecladista e guitarrista, sujeitos à confirmação e ativos oficiais; não supor nomes ou fotos. **Mobile:** 1 coluna; **tablet:** 2; **desktop:** até 3, dependendo da quantidade real. Outros integrantes podem variar, sem cadastro fictício.

### 12.7 Chamada de contratação

Bloco editorial com contraste forte, texto definido no documento de copy e botão **Agendar show**. Mobile: empilhado e CTA de largura quase total; desktop: texto e CTA com alinhamento equilibrado sem perder ênfase. Botão leva a `/contratacao`, nunca a URL inventada.

### 12.8 Material para divulgação

Arquivos oficiais em cards/lista com tipo de arquivo e tamanho se conhecidos. Link **Baixar arquivo** somente com download real. Se ausente, exibir estado “Em preparação” não clicável. Não gerar automaticamente logotipo/press kit não autorizado.

### 12.9 Footer

Fundo `ink-900` ou `ink-950`; divisor sutil. Mobile em coluna: marca, links, Instagram/TikTok/YouTube, contato quando fornecido, direitos e privacidade. Desktop em 3 ou 4 grupos discretos; sem apresentar redes não entregues como links funcionais.

---

## 13. Formulários — página de contratação

**Composição:** mobile 1 coluna, desktop container até `760px` para formulário (não ampliar inputs a 1280 px). Os campos e a copy exata seguem o mapa de CTA e o documento técnico; estrutura de grupos lógica e rótulos explícitos.

| Estilo | Mobile | Desktop |
|---|---|---|
| Altura mínima do input | 52 px | 56 px |
| Altura inicial textarea | 132 px | 144 px |
| Padding horizontal input | 16 px | 18 px |
| Raio | 12 px | 12 px |
| Fonte do conteúdo | 16 px | 16 px |
| Tamanho do label | 14 px | 14 px |
| Gap label-campo | 8 px | 8 px |
| Espaço entre campos | 20 px | 24 px |
| Mensagem de ajuda/erro | 12–14 px | 12–14 px |

**Estados:** vazio, preenchido, hover, focus-visible, erro, disabled, carregando, sucesso real e falha. Mensagem de erro sob o campo com associação via `aria-describedby`. Campos obrigatórios indicados no rótulo. Erro de envio não apaga os dados digitados. Não exibir sucesso fictício quando endpoint ainda for demonstrativo.

---

## 14. Ícones, mídia e padrões de imagem

**Ícones:** biblioteca `lucide-react`; espessura predominante 1,75–2 px; tamanho 20 px em botões e 24 px em interface geral; ícones isolados com área interativa mínima de 44 × 44 px. Não misturar conjuntos de ícones com estilos incongruentes.

**Fotos:** usar `next/image`, `sizes` correto, formatos modernos quando suportados, resolução suficiente para alta densidade sem baixar arquivos excessivos; `alt` descritivo para foto informativa e `alt=""` para imagem totalmente decorativa. Nunca deixar texto embutido em imagens como único meio de comunicação.

**Proporções de referência:** retratos 4:5; Hero mobile 9:16; Hero desktop 16:9; thumbs YouTube 16:9; foto editorial pode variar mediante referência. Ajustar foco com `object-position` por asset, não apenas `center` universal.

**Overlays fotográficos:** Hero deve ter camada base escura com intensidade ajustada aos quadros e gradiente mais forte próximo ao texto. Evitar excesso de vinheta em áreas sem conteúdo.

---

## 15. Motion e microinterações

| Efeito | Duração | Curva | Regra |
|---|---|---|---|
| Hover de botão | 160 ms | ease-out | Cor, leve elevação opcional |
| Hover de card | 200 ms | ease-out | Elevação de até 2 px |
| Drawer abrir/fechar | 240 ms | ease-in-out | Transform/opacity |
| Entrada de seção | 400 ms | ease-out | Opacidade + translateY ≤16 px |
| Modal/lightbox | 200 ms | ease-out | Opacidade e escala muito discreta |
| Scroll para âncora | Nativo/suave | — | Desligar suavização em reduced motion |

**Restrições:** não animar tudo ao mesmo tempo; não atrasar texto até ele ficar invisível para leitores/usuários; não executar animações por scroll que bloqueiem conteúdo. Respeitar `prefers-reduced-motion: reduce`, removendo deslocamentos e autoplay decorativo quando possível.

---

## 16. Acessibilidade e semântica

- Objetivo WCAG 2.2 AA; validar após aplicação da mídia real.
- Ordem de leitura igual à hierarquia visual; apenas um H1 semântico por página (pode ser visualmente oculto se a Hero usa só logotipo).
- Header, `main`, `nav`, `section`, `footer` semânticos.
- Botões são `<button>` quando há ação local; navegação usa `<a>`/`Link`.
- Foco de teclado visível em todos os controles, inclusive lightbox e menu.
- Menu e modal gerenciam foco, Escape e fundo inerte quando aplicável.
- Botões de vídeos com nome acessível; iframe com `title`.
- Formulário com labels e erros associados.
- Contraste do texto sobre vídeo e imagens testado nos frames claros.
- Toques interativos sem alvos minúsculos; mínimo operacional 44 × 44 px como padrão deste projeto.
- Site totalmente navegável em zoom de 200% e testável com teclado.

---

## 17. Performance e qualidade

- Priorizar **LCP (Largest Contentful Paint)** da Hero: poster/foto leve, dimensões conhecidas, não bloquear renderização com JS pesado.
- Prevenir **CLS (Cumulative Layout Shift)**: reservar dimensões de fotos, vídeo e embeds.
- Reduzir **INP (Interaction to Next Paint)**: componentes client-side somente onde há interação.
- Imagens abaixo da primeira tela com lazy loading; Hero com prioridade quando necessário.
- Embed YouTube sob demanda ou com thumbnail para evitar scripts externos antes da interação.
- Não baixar mobile e desktop videos pesados simultaneamente.
- Não carregar fontes com pesos que não sejam utilizados.
- Evitar carrosséis automáticos de alta frequência.
- Conferir Lighthouse e testes reais em rede móvel; metas de Core Web Vitals: LCP ≤2,5 s, INP ≤200 ms, CLS ≤0,1 no percentil 75 em condições de campo.

---

## 18. Design tokens implementáveis

Estes valores devem existir **uma única vez**, preferencialmente em `src/app/globals.css` e integração com o tema Tailwind. Exemplo de contrato inicial:

```css
:root {
  --color-bg: #0B0B0D;
  --color-bg-alt: #141317;
  --color-surface: #232127;
  --color-surface-hover: #353139;
  --color-text: #FAF7F1;
  --color-text-muted: #D2C9BC;
  --color-text-inverse: #0B0B0D;
  --color-primary: #EFC16B;
  --color-primary-hover: #F7D995;
  --color-border: #514A51;
  --color-border-subtle: #343036;
  --color-focus: #F7D995;

  --container-max: 1280px;
  --radius-button: 12px;
  --radius-card: 20px;
  --shadow-card: 0 12px 32px rgba(0,0,0,.20);
  --shadow-modal: 0 24px 64px rgba(0,0,0,.36);
  --ease-standard: cubic-bezier(.2,.8,.2,1);
}

html { scroll-behavior: smooth; }
body { background: var(--color-bg); color: var(--color-text); }
:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 3px; }
section[id] { scroll-margin-top: 88px; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
```

**Tailwind:** mapear as propriedades CSS a classes semânticas ou tokens em tema; evitar `bg-[#...]` e `text-[#...]` repetidos no JSX. Breakpoint desktop especial em 1200 px. Definir utilitário de container com padding responsivo conforme seção 06.

### 18.1 Nomes de componentes sugeridos

`SiteHeader`, `HeaderMobile`, `HeaderDesktop`, `MobileMenu`, `HeroMobile`, `HeroDesktop`, `PrimaryButton`, `SecondaryButton`, `SectionHeading`, `ShowCard`, `YouTubeVideoCard`, `PhotoGallery`, `Lightbox`, `MusicianCard`, `BookingCTA`, `BookingForm`, `PressAssetCard`, `SiteFooter`.

Componentes devem aceitar props tipadas e obter textos/URLs da fonte única de dados. Não misturar textos fixos não aprovados dentro do JSX com dados de conteúdo da cantora.

---

## 19. Mapa de aplicação dos tokens por seção

| Seção | Fundo | Título | Cards/mídia | CTA principal |
|---|---|---|---|---|
| Header | Transparente → `ink-900` translúcido | Navegação Manrope | Logo oficial | Agendar show |
| Hero | Vídeo/foto + overlay | Logo oficial, sem headline visual | Mídia full-bleed | Agendar show + Ver agenda |
| História | `ink-950` | H2 Cormorant | Foto editorial | Nenhum obrigatório |
| Agenda | `ink-900` | H2 Cormorant | Cards `ink-800` | Só links reais por evento |
| Vídeos | `ink-950` | H2 Cormorant | YouTube 16:9 | Assistir no YouTube |
| Galeria | `ink-900` | H2 Cormorant | Mosaico fotográfico | Abrir foto |
| Formação | `ink-950` | H2 Cormorant | Cards de músicos | Nenhum obrigatório |
| Contratação | `wine-900` ou `ink-900` com contraste validado | H2 Cormorant | Bloco editorial | Agendar show |
| Divulgação | `ink-950` | H2 Cormorant | Lista de assets | Baixar, se real |
| Footer | `ink-900` | Labels Manrope | Links agrupados | Redes oficiais |

---

## 20. Checklist de aceite visual

### Identidade
- [ ] Logotipo oficial correto, proporcional, sem recriação.
- [ ] Paleta conferida com arquivos oficiais e alterada apenas mediante aprovação.
- [ ] Fonte Cormorant para títulos e Manrope para UI, salvo mudança aprovada.
- [ ] Nenhuma foto fictícia apresentada como foto real da artista.

### Mobile (320, 360, 390, 430 px)
- [ ] Nenhuma rolagem horizontal; CTAs cabem na viewport.
- [ ] Hero ocupa a tela inicial sem cortar controles nem cobrir o rosto.
- [ ] Header e drawer funcionam por toque e teclado.
- [ ] Cards empilhados e espaçados em 16 px.
- [ ] Textos legíveis, inputs em ≥16 px.
- [ ] Safe-area respeitada na Hero e em componentes fixos.

### Tablet (768, 1024 px)
- [ ] Grid intermediário coerente, sem espaços vazios estranhos.
- [ ] Header compacto e menus acessíveis.
- [ ] Títulos não extrapolam seus containers.

### Desktop (1200, 1440, 1920 px)
- [ ] Header horizontal e Hero em composição cinematográfica.
- [ ] Container editorial ≤1280 px; mídias full-bleed apenas onde planejadas.
- [ ] Agenda em até 3 colunas, vídeos com destaque, galeria mosaico.
- [ ] Respiro vertical de seção de 112 px, salvo exceção documentada.

### Comportamento e conversão
- [ ] Hero exibe somente logotipo + Agendar show + Ver agenda.
- [ ] Botões apontam para destinos válidos e previstos no mapa de copy.
- [ ] YouTube temporário identificado como demo; substituição por ID simples.
- [ ] Sem links falsos, shows inventados, formulários com sucesso simulado.
- [ ] Estados hover, foco, erro, loading e disabled completos.
- [ ] Lightbox, menu e formulário acessíveis com teclado.
- [ ] Verificados contraste e redução de movimento.

---

## 21. Entregáveis para a IA desenvolvedora

A IA deve receber **este design system**, o documento de Especificação Técnica/Layout, o documento de Copy/CTAs, a screenshot de referência enviada pela cliente, o logotipo oficial, as fotos autorizadas e os links oficiais de Instagram, TikTok e YouTube.

**Resultado esperado:** uma única aplicação Next.js + React + TypeScript + Tailwind CSS com composições mobile e desktop dedicadas, tokens centralizados, componentes reutilizáveis e fidelidade aos materiais da cliente. Se algum ativo necessário não foi entregue, a IA deve usar estados de ausência honestos em vez de inventar informações ou alterar a direção visual.

**Regra final:** decisões visuais não explicitadas só podem ser tomadas quando necessárias para completar um comportamento técnico, seguindo os tokens e princípios desta especificação. Mudanças substanciais de cores, fontes, ordem das seções ou CTAs exigem validação do responsável pelo projeto.
