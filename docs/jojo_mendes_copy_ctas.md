# Jojo Mendes — Copywriting, Conteúdo e Mapa de CTAs

**Versão:** 1.0  
**Data:** 15/11/2026  
**Objetivo:** especificar os textos exibidos, sua posição no layout, comportamento responsivo, links e estados alternativos, para implementação sem decisões criativas improvisadas.  
**Documentos complementares obrigatórios:** `jojo_mendes_design_system.md` e `jojo_mendes_especificacao_tecnica_layout.md`.

> **ORDEM PARA A IA IMPLEMENTADORA:** reproduzir exatamente as copies aprovadas neste documento. Não inventar fatos da vida da cantora, shows, prêmios, depoimentos, músicos, cidades, contatos ou resultados. Textos explicitamente marcados como **PROVISÓRIO** podem aparecer no protótipo, mas não devem ser publicados como conteúdo oficial sem aprovação. Quando um link ou asset não existir, seguir o estado vazio definido aqui. Respeitar a ordem e os layouts estabelecidos na especificação técnica; este arquivo é a fonte de verdade para **copy e CTAs**.

## 1. Estratégia editorial

### 1.1 Públicos e jornada

- **Fãs:** reconhecer a artista → conhecer sua história → consultar agenda → consumir vídeos/fotos → seguir nas redes.
- **Contratantes e produtores:** reconhecer a artista → conhecer sua apresentação → verificar potencial do show → acessar o formulário de contratação.

**Conversão principal:** envio real de solicitação de contratação em `/contratacao`.  
**Conversão secundária:** clique para consultar a agenda `/#agenda`.  
**Engajamento:** abrir vídeos, visualizar fotos, seguir perfis oficiais.

### 1.2 Tom de voz

- Próximo, caloroso, artístico e confiante, sem linguagem corporativa.
- Títulos curtos, de fácil leitura; dar protagonismo à imagem e ao palco.
- Evitar promessas não verificadas: “o melhor show”, “milhares de fãs”, “sucesso nacional”, “agenda lotada”.
- Não repetir chamadas comerciais em toda seção. A contratação será enfatizada na Hero, no header, na chamada comercial e na página específica.
- Sem emojis, exclamações em excesso, textos genéricos longos ou falsas urgências.
- Não usar lorem ipsum nem frases inventadas em nome da cantora.

### 1.3 Regras de grafia

- Nome da artista: **Jojo Mendes**.
- Botão da ação principal, sempre: **Agendar show**.
- Botão de agenda na Hero, sempre: **Ver agenda**.
- Redes: **Instagram**, **TikTok**, **YouTube**.
- Usar acentuação correta: “Vídeos”, “Próximos shows”, “Contratação”, “Músicos”.
- Rótulos editoriais em letras maiúsculas via CSS (`text-transform`) ou string como indicada; não usar caixa-alta nos parágrafos.

## 2. Mapa de navegação e CTAs — fonte de verdade

| Local | Elemento / rótulo exato | Tipo | Destino / ação | Visibilidade |
|---|---|---|---|---|
| Header desktop | Início | Link | `/#inicio` | Desktop |
| Header desktop | História | Link | `/#historia` | Desktop |
| Header desktop | Agenda | Link | `/#agenda` | Desktop |
| Header desktop | Vídeos | Link | `/#videos` | Desktop |
| Header desktop | Galeria | Link | `/#galeria` | Desktop |
| Header desktop | Músicos | Link | `/#musicos` | Desktop |
| Header desktop | Agendar show | CTA primário | `/contratacao` | Desktop |
| Menu mobile aberto | Mesmo menu do desktop, na mesma ordem | Links + CTA | Mesmos destinos | Mobile/tablet |
| Hero | Agendar show | CTA primário | `/contratacao` | Todos |
| Hero | Ver agenda | CTA secundário | `/#agenda` | Todos |
| Cards da agenda | Ver detalhes | Link contextual | Link **real** do evento, se houver | Condicional |
| Agenda com mais itens | Ver mais datas | Ação local | Expandir cards; depois muda para “Ver menos datas” | Condicional |
| Vídeo em destaque e cards | Assistir vídeo | Ação de mídia | Abre player YouTube no site | Quando há vídeo |
| Bloco de vídeo | Assistir no YouTube | Link externo | URL do vídeo real/demonstrativo | Quando há vídeo |
| Galeria | Abrir foto | Ação em mídia | Lightbox; texto acessível | Quando há fotos |
| Galeria com mais fotos | Ver mais fotos | Ação local | Expande galeria; muda para “Ver menos fotos” | Condicional |
| Chamada comercial | Agendar show | CTA primário | `/contratacao` | Todos |
| Imprensa | Baixar arquivo | Ação de download | Arquivo real configurado | Condicional |
| Footer | Instagram / TikTok / YouTube | Links externos | URLs oficiais fornecidas | Cada um somente se válido |
| Footer | Política de privacidade | Link | `/privacidade` | Todos |
| Página de contratação | Enviar solicitação | CTA do formulário | `POST /api/contratacao` | Todos |
| Página 404 | Voltar ao início | CTA secundário | `/` | Todos |

**Regra:** nunca renderizar CTA clicável apontando para `#`, URL fictícia, e-mail inventado ou número de WhatsApp não fornecido. Ausência de dados = ocultar a ação ou usar um estado vazio explicitamente definido.

## 3. Home — copy por dobra e posicionamento

> “Dobra” significa seção vertical da página, **não** uma altura fixa de tela. Os blocos seguem a ordem estabelecida na especificação técnica.

### 3.0 Header — navegação persistente

**Textos visíveis:**
- Logo oficial da artista (arquivo fornecido; não substituir por uma logo tipográfica inventada).
- Links: `Início` · `História` · `Agenda` · `Vídeos` · `Galeria` · `Músicos`.
- CTA destacado: **Agendar show**.

**Desktop:** logo à esquerda, links na horizontal ao centro, botão primário à direita. CTA visível mesmo durante a rolagem. Não criar outra faixa promocional acima do header.  
**Mobile/tablet:** logo à esquerda e botão de ícone à direita, com texto acessível `Abrir menu`; ao abrir, links em coluna e **Agendar show** na área final do painel. Ícone passa a `Fechar menu`. O menu fechado não exibe o CTA em texto no header para evitar aperto.

**ARIA:** `aria-label="Ir para o início"` no link do logo; menu possui `aria-expanded` e descrição clara.

### 3.1 Dobra 1 — Hero cinematográfica (`#inicio`)

**Copy visível, exatamente:**
- Identidade: **[LOGOTIPO OFICIAL DA JOJO MENDES]**.
- Botão 1: **Agendar show**.
- Botão 2: **Ver agenda**.

**Não colocar:** headline, subtítulo, frase de efeito, bio, hashtags, badge “oficial”, redes sociais, terceira ação, números, contadores ou textos superpostos adicionais.

**Desktop:** logo centralizada, com dois botões lado a lado abaixo (Agendar show à esquerda; Ver agenda à direita).  
**Mobile:** logo centralizada na zona inferior segura; botões empilhados abaixo, primeiro Agendar show, depois Ver agenda, com largura uniforme.  
**Destinos:** `/contratacao` e `/#agenda`.  
**Fundo:** vídeo próprio (se fornecido) ou foto oficial; nunca usar vídeo aleatório do YouTube na Hero.

**Microcopy:** nenhum texto extra.

### 3.2 Dobra 2 — História (`#historia`)

**Rótulo:** `A ARTISTA`  
**Título:** `Jojo Mendes`

**Texto provisório para protótipo (NÃO publicar como biografia real):**

> A história de Jojo Mendes será contada aqui, com as palavras e os momentos que fazem parte da sua trajetória.  
>  
> Este espaço receberá a biografia oficial da cantora, acompanhada de fotografias selecionadas.

**Quando chegar a biografia aprovada:** substituir integralmente pelos fatos reais, mantendo até 3 parágrafos, alvo de 280–500 caracteres (não cortar informações relevantes para se encaixar em um número arbitrário). Evitar subtítulos extras.

**Desktop:** foto editorial na coluna esquerda; rótulo, título e parágrafos à direita.  
**Mobile:** foto vertical primeiro; rótulo, título e parágrafos abaixo.  
**CTA:** **nenhum**. Não acrescentar “Saiba mais”, “Conheça minha história” ou “Agendar show” nesta seção.

### 3.3 Dobra 3 — Agenda (`#agenda`)

**Rótulo:** `ONDE NOS ENCONTRAR`  
**Título:** `Próximos shows`  
**Texto de abertura:** nenhum; deixar as datas em destaque.

**Cada card com dados reais contém, nesta ordem visual:**
1. Dia e mês, por exemplo `24` e `NOV` (exemplo de formato, **não** data de show real).
2. Cidade + UF: `[CIDADE] · [UF]`.
3. Nome do local: `[LOCAL DO EVENTO]`.
4. Horário: `[HORÁRIO]`, somente se confirmado.
5. Link opcional: **Ver detalhes**, somente se houver URL específica verificada do show.

**Estado sem shows:**
- Mensagem principal: **Novas datas em breve.**
- Apoio: **Acompanhe as redes oficiais para saber das próximas apresentações.**
- **Sem** botão adicional e **sem** criar cards falsos.

**Se houver mais do que o limite inicial:** botão **Ver mais datas**; após expansão, **Ver menos datas**.  
**Desktop:** 3 cards por linha e até 6 visíveis inicialmente.  
**Mobile:** 1 card por linha e até 4 visíveis inicialmente.  
**CTA comercial:** nenhum nesta seção.

### 3.4 Dobra 4 — Vídeos (`#videos`)

**Rótulo:** `NO PALCO E NAS TELAS`  
**Título:** `Vídeos`  
**Subtítulo:** nenhum.

**Vídeo principal:** capa 16:9, botão de reprodução com nome acessível **Assistir vídeo**, título obtido do cadastro do vídeo, link textual **Assistir no YouTube**.  
**Demais vídeos:** miniatura 16:9, título obtido do cadastro, ação **Assistir vídeo** e link para YouTube quando aplicável.

**Regra para vídeos demonstrativos:** usar conteúdo neutro, sem afirmar que é a cantora, com sinalização visível **Vídeo demonstrativo — substituir**. O título provisório deve ser **Prévia do layout de vídeo**, com numeração quando necessário (**Prévia do layout de vídeo 2**, etc.). Mesmo se o vídeo do YouTube tiver título original, **não** associá-lo à Jojo por meio do conteúdo da página.

**Desktop:** vídeo principal na esquerda (7/12) e lista compacta na direita (5/12).  
**Mobile:** vídeo principal primeiro, demais cards em coluna abaixo.  
**CTA da seção:** **Assistir no YouTube** (link associado ao vídeo em foco); não criar botões “Inscreva-se” sem decisão específica.

**Estado sem vídeos disponíveis:** `Vídeos em preparação.` + `Em breve, novos conteúdos por aqui.` Sem iframe quebrado.

### 3.5 Dobra 5 — Galeria (`#galeria`)

**Rótulo:** `MOMENTOS`  
**Título:** `Galeria`  
**Descrição:** nenhuma.

**Elementos:** fotos oficiais e seus `alt` descritivos, baseados no que a foto realmente mostra. A foto é a ação: click/tap abre lightbox. Não adicionar legenda editorial inventada sobre eventos ou cidades.

**Ações:**
- Acessibilidade da imagem: **Abrir foto [n] da galeria**.
- Navegação lightbox: **Foto anterior**, **Próxima foto**, **Fechar galeria**.
- Havendo mais fotos: **Ver mais fotos** / **Ver menos fotos**.

**Desktop:** mosaico assimétrico de 4 colunas.  
**Mobile:** mosaico de 2 colunas, primeira imagem em largura completa.  
**Estado sem fotos:** `Galeria em preparação.`; não gerar rostos ou imagens que se passem pela cantora.

### 3.6 Dobra 6 — Formação musical (`#musicos`)

**Rótulo:** `QUEM FAZ O SHOW`  
**Título:** `Nossa formação`  
**Descrição introdutória:** nenhuma.

**Card de integrante real:**
- Nome: `[NOME APROVADO]`.
- Função: `[INSTRUMENTO OU FUNÇÃO]`.

**Não preencher com:** nomes fictícios, imagens de banco de fotos apresentadas como integrantes, mini-biografias inventadas ou formação fixa não confirmada.

**Estado sem confirmação:** `Formação musical em atualização.`  
**CTA:** nenhum.  
**Desktop:** cards de 3–4 colunas; **mobile:** uma coluna (duas se houver espaço conforme layout técnico).

### 3.7 Dobra 7 — Chamada comercial (`#contratar`)

**Título exato:** `Leve Jojo Mendes para o seu evento`  
**Descrição exata:** `Entre em contato para consultar disponibilidade e informações sobre shows.`  
**Botão:** **Agendar show** → `/contratacao`.

**Desktop:** imagem de fundo aprovada + overlay; título e apoio à esquerda; botão alinhado à direita ou abaixo do texto, como definido no layout.  
**Mobile:** conteúdo centralizado em coluna, título → descrição → botão, com botão largo.  
**Não colocar:** preço “a partir de”, telefone inventado, escassez artificial, “últimas datas”, “contrate agora com desconto” ou formulário nesta faixa.

### 3.8 Dobra 8 — Material de divulgação (`#imprensa`)

**Rótulo:** `PARA PRODUTORES`  
**Título:** `Material de divulgação`  
**Apoio opcional somente quando arquivos reais existirem:** `Arquivos oficiais para divulgação e produção de eventos.`

**Cards de arquivos (somente se recebidos e autorizados):**
- Nome conforme o arquivo: `Logotipo oficial`, `Fotos de divulgação`, `Press kit`, `Rider técnico`.
- Metadados: `[FORMATO] · [TAMANHO DO ARQUIVO]`.
- Botão: **Baixar arquivo**.

**Estado sem arquivos:** `Materiais em preparação.`  
**Sem** botão de download desabilitado ou link vazio.  
**Desktop:** cards em 2–3 colunas; **mobile:** lista vertical.

### 3.9 Dobra 9 — Footer

**Marca:** logotipo oficial.  
**Linha descritiva curta:** `Site oficial de Jojo Mendes.`  
**Cabeçalho do grupo de links:** `Navegação`  
**Links:** `Início`, `História`, `Agenda`, `Vídeos`, `Galeria`, `Músicos`, `Material de divulgação`.  
**Cabeçalho das redes:** `Acompanhe`  
**Links:** `Instagram`, `TikTok`, `YouTube` — somente com URLs oficiais fornecidas.  
**Contato comercial:** só apresentar informação se for oficialmente fornecida.  
**Rodapé inferior:** `© {anoAtual} Jojo Mendes. Todos os direitos reservados.`  
**Link jurídico:** `Política de privacidade` → `/privacidade`.

**Desktop:** três colunas: marca, navegação, redes/contato.  
**Mobile:** marca primeiro, depois links e redes; rodapé inferior.  
**Não criar:** links para Spotify, WhatsApp, streaming, loja, assessoria ou produtor não fornecidos.

## 4. Página `/contratacao` — copy integral e posicionamento

### 4.1 Abertura

**H1:** `Agendar show`  
**Texto de apoio:** `Preencha os dados para solicitar informações sobre disponibilidade.`  
**Texto complementar curto na coluna editorial desktop:** `Conte um pouco sobre o seu evento. Essas informações ajudam a organizar o primeiro contato.`

**Desktop:** lado esquerdo, fotografia real (se houver), H1 e apoio; à direita formulário.  
**Mobile:** H1 e apoio no topo; formulário em sequência, sem fotografia ocupando uma dobra inteira antes dos campos.

### 4.2 Labels, exemplos, validações e ajuda

| Ordem | Label visível | Placeholder / exemplo | Obrigatório | Erro curto |
|---:|---|---|---|---|
| 1 | Nome do responsável | `Seu nome completo` | Sim | `Informe seu nome.` |
| 2 | WhatsApp para contato | `+55 (99) 99999-9999` (apenas formato ilustrativo) | Sim | `Informe um WhatsApp válido.` |
| 3 | Cidade do evento | `Cidade onde será o evento` | Sim | `Informe a cidade.` |
| 4 | Estado | `Selecione o estado` | Sim | `Selecione o estado.` |
| 5 | Data pretendida | Usar controle nativo de data, sem data pré-selecionada | Sim | `Selecione uma data válida.` |
| 6 | Local do evento | `Nome do espaço ou local` | Sim | `Informe o local do evento.` |
| 7 | Horário pretendido | Usar controle de horário | Não | `Confira o horário informado.` |
| 8 | Público estimado | `Quantidade aproximada de pessoas` | Não | `Informe uma quantidade válida.` |
| 9 | Informações adicionais | `Conte um pouco mais sobre o evento e a estrutura disponível.` | Não | `Revise as informações adicionais.` |

**Identificação de obrigatoriedade:** mostrar `*` em cada campo obrigatório e uma única legenda acima do formulário: `* Campos obrigatórios`. Não marcar os opcionais com asterisco.

**Consentimento (texto provisório sujeito a revisão jurídica):** `Li a Política de privacidade e concordo com o uso dos meus dados para o atendimento desta solicitação.` Com “Política de privacidade” como link para `/privacidade`. **Não ativar o envio real antes de disponibilizar e revisar a política.**

**Botão final:** **Enviar solicitação**.  
**Durante envio:** **Enviando solicitação...**.  
**Sucesso confirmado pelo backend:** `Solicitação enviada.` + `Nossa equipe entrará em contato pelo número informado.`  
**Erro de rede/servidor:** `Não foi possível enviar sua solicitação agora. Tente novamente.`  
**Falha de validação:** `Revise os campos indicados e tente novamente.`  
**Demo sem integração:** `Formulário de demonstração: envio ainda não habilitado.` — nunca exibir falso sucesso.

**Não criar:** orçamento estimado, tabela de preços, simulador, calendário de disponibilidade, promessa de resposta em X horas, redirecionamento a WhatsApp sem número oficial.

### 4.3 Rodapé da página

Usar footer global, inclusive redes oficiais válidas e política de privacidade. Não incluir segundo CTA “Agendar show” na própria página de contratação.

## 5. Página 404, carregamento e estados de interface

### 5.1 404

- Título: **Esta página não foi encontrada.**
- Apoio: **O endereço pode ter mudado ou não estar disponível.**
- CTA: **Voltar ao início** → `/`.

### 5.2 Feedback da interface

- Carregamento da agenda (se futuramente houver busca): `Carregando agenda...`.
- Carregamento dos arquivos: `Carregando materiais...`.
- Falha de foto: preservar fundo/placeholder discreto, **sem** texto publicitário substituto.
- Indisponibilidade do vídeo: `Este vídeo não está disponível no momento.` + ação `Assistir no YouTube` apenas se URL continuar válida.
- Nunca transformar ausência de dados em conteúdo aparentemente factual.

## 6. Hierarquia visual das CTAs

**Primário:** fundo dourado (conforme Design System), texto de alto contraste. Usar em **Agendar show** (header desktop, Hero, faixa comercial) e **Enviar solicitação** (formulário).  
**Secundário:** contorno claro/estilo do Design System, em **Ver agenda**, **Voltar ao início**.  
**Terciário/textual:** links da navegação, **Assistir no YouTube**, **Ver detalhes**, **Ver mais datas**, **Ver mais fotos**.  
**Ações de utilidade:** **Baixar arquivo**, **Fechar galeria**, **Foto anterior**, **Próxima foto**.

**Regras antissaturação:**
- Exatamente **dois** CTAs na Hero.
- Um único CTA comercial na chamada final.
- Nenhum CTA comercial introduzido na História, Agenda, Galeria ou Formação.
- Na página de contratação, **Enviar solicitação** é a única ação primária.
- Não usar CTA flutuante persistente de WhatsApp, pop-ups de captura, barras promocionais ou modais automáticos.

## 7. Mobile versus desktop — mapa de ênfase

| Seção | Mobile | Desktop |
|---|---|---|
| Header | Menu em painel; CTA só quando menu aberto | Menu horizontal + CTA em destaque à direita |
| Hero | Logo + **Agendar show** e **Ver agenda** empilhados | Logo + os dois CTAs lado a lado |
| História | Foto antes da copy | Foto esquerda / copy direita |
| Agenda | Cards em pilha, datas grandes | Grid de 3 colunas |
| Vídeos | Destaque primeiro; lista abaixo | Destaque esquerda / lista direita |
| Galeria | Mosaico 2 colunas | Mosaico 4 colunas |
| Formação | 1–2 colunas | 3–4 colunas |
| Contratação (faixa) | Título + apoio + botão centralizados | Layout editorial horizontal |
| Imprensa | Arquivos em lista | Arquivos em grid |
| Footer | Blocos empilhados | 3 colunas |
| Formulário | Uma coluna, botão largo | Grade de campos e coluna editorial |

**Não abreviar ou reescrever copies por breakpoint.** Só layout, alinhamento e eventual truncamento estritamente visual devem mudar. Nenhuma informação essencial pode sumir no mobile.

## 8. Estrutura de dados sugerida para a implementação

Centralizar as strings fixas em `src/content/copy.ts` (ou dentro de `site.ts` em grupos tipados), separadas de conteúdos alimentados por dados. Não espalhar copies por múltiplos JSX.

```ts
export const copy = {
  nav: {
    home: 'Início',
    history: 'História',
    schedule: 'Agenda',
    videos: 'Vídeos',
    gallery: 'Galeria',
    musicians: 'Músicos',
    booking: 'Agendar show',
  },
  hero: { primaryCta: 'Agendar show', secondaryCta: 'Ver agenda' },
  history: { eyebrow: 'A ARTISTA', title: 'Jojo Mendes' },
  schedule: {
    eyebrow: 'ONDE NOS ENCONTRAR',
    title: 'Próximos shows',
    emptyTitle: 'Novas datas em breve.',
    emptyDescription: 'Acompanhe as redes oficiais para saber das próximas apresentações.',
  },
  videos: { eyebrow: 'NO PALCO E NAS TELAS', title: 'Vídeos' },
  gallery: { eyebrow: 'MOMENTOS', title: 'Galeria' },
  musicians: { eyebrow: 'QUEM FAZ O SHOW', title: 'Nossa formação' },
  bookingBanner: {
    title: 'Leve Jojo Mendes para o seu evento',
    description: 'Entre em contato para consultar disponibilidade e informações sobre shows.',
    cta: 'Agendar show',
  },
  press: { eyebrow: 'PARA PRODUTORES', title: 'Material de divulgação' },
  bookingPage: {
    title: 'Agendar show',
    description: 'Preencha os dados para solicitar informações sobre disponibilidade.',
    submit: 'Enviar solicitação',
  },
} as const;

export const destinations = {
  booking: '/contratacao',
  schedule: '/#agenda',
  privacy: '/privacidade',
} as const;
```

**Dados que virão do usuário:** `assets.logo`, `assets.heroMobile`, `assets.heroDesktop`, `assets.historyPhoto`, `biography`, `shows[]`, `videos[]`, `gallery[]`, `musicians[]`, `pressFiles[]`, `socials.instagram`, `socials.tiktok`, `socials.youtube`, `commercialContact`. Inicializar faltantes com `null` ou `[]`, não criar dados inventados.

## 9. SEO e metadados — copies previstas

**Home**  
- `<title>`: `Jojo Mendes | Site Oficial`  
- `description`: `Conheça Jojo Mendes, confira a agenda de shows, assista aos vídeos e encontre informações para contratação de apresentações.`

**Contratação**  
- `<title>`: `Agendar Show | Jojo Mendes`  
- `description`: `Solicite informações sobre disponibilidade e contratação de shows de Jojo Mendes.`

**404**  
- `<title>`: `Página não encontrada | Jojo Mendes`.

**Open Graph:** título e descrição alinhados às páginas; imagem social oficial somente se fornecida. Não gerar fotografia fictícia. Não atribuir gênero musical, cidade de origem ou premiações não confirmados nas metatags.

## 10. Conteúdos pendentes para publicação final

| Item | Situação inicial | Conduta da IA |
|---|---|---|
| Identidade / logotipo | Usuário fornecerá | Usar arquivo oficial |
| Fotos | Usuário fornecerá | Usar as fotografias recebidas |
| Captura do site de referência | Usuário fornecerá | Adaptar estrutura visual, sem copiar copy |
| Biografia oficial | Pendente | Exibir somente texto claramente provisório em ambiente de protótipo |
| Agenda | Pendente | Usar estado vazio, sem datas falsas |
| Vídeos oficiais | Pendente | Usar vídeos YouTube demonstrativos rotulados |
| Formação nominal | Pendente | Exibir “Formação musical em atualização.” |
| Press kit e rider | Pendente | Exibir “Materiais em preparação.” |
| Redes oficiais | Usuário fornecerá | Renderizar links após validação |
| Contato comercial | Pendente | Não inserir telefone/e-mail inventado |
| Destino funcional do formulário | Pendente | Exibir estado demo sem falso envio |
| Política de privacidade | Pendente revisão | Não publicar declaração jurídica fictícia |

## 11. Critérios de aceite editorial e de conversão

- [ ] Hero contém **somente logo + dois CTAs** nos dois layouts.
- [ ] Botões **Agendar show** levam a `/contratacao` em todos os pontos.
- [ ] **Ver agenda** leva corretamente a `/#agenda`.
- [ ] Navegação, âncoras e header respeitam acessibilidade e scroll offset.
- [ ] Rótulos, títulos, mensagens de vazio e textos do formulário seguem este documento literalmente.
- [ ] Layout mobile mantém todas as informações e ações importantes.
- [ ] Nenhum show, músico, biografia, depoimento, contato ou prêmio foi inventado.
- [ ] Vídeos demonstrativos estão rotulados como demonstrativos.
- [ ] Redes sociais aparecem somente quando URLs oficiais forem inseridas.
- [ ] Galeria e vídeos possuem nomes acessíveis e ações funcionais.
- [ ] Arquivos de imprensa não são falsos downloads.
- [ ] Formulário não exibe sucesso sem envio real confirmado.
- [ ] Copy de consentimento e política de privacidade recebem revisão antes da publicação.
- [ ] Todas as copies ficam centralizadas e facilmente editáveis, sem refazer o JSX.

---

**Instrução final à IA:** implemente fielmente a especificação técnica, o Design System e o presente mapa de conteúdo. Se a referência visual da cliente apresentar textos ou elementos conflitantes, preserve o desenho geral desejado sem alterar a estrutura, as CTAs e as copies aqui definidas. Não adicione seções, slogans, botões ou funcionalidades não especificadas.
