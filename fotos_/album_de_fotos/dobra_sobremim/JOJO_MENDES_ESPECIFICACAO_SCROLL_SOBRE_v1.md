# Jojo Mendes — Especificação de implementação da composição interativa por scroll

**Versão:** 1.0  
**Seção:** Sobre Jojo  
**Aplicação:** site público — Next.js + React + TypeScript + Tailwind CSS  
**Animação:** GSAP + ScrollTrigger  
**Estado:** instrução de implementação para agente de IA, sujeita à validação visual final

---

## 1. Objetivo e experiência aprovada

Implementar na seção **Sobre Jojo** uma composição editorial vertical: quatro fotografias da cantora, distribuídas em faixas horizontais arredondadas no fundo, e uma fotografia da Jojo de corpo inteiro, em destaque e sobreposta às faixas. A visitante rola a página e, em sequência, **uma faixa do fundo por vez passa de preto e branco para suas cores verdadeiras**, retornando depois ao preto e branco. A Jojo central **permanece sempre em preto e branco**. Após a última faixa, a página continua normalmente.

Este efeito é **controlado pelo scroll**, e não um vídeo rodando automaticamente. O progresso da animação segue a posição de rolagem, inclusive quando o usuário rola de volta.

### Regras inegociáveis

1. **Não aplicar zoom, aproximação, afastamento, parallax, rotação, deslocamento nem mudança de enquadramento** a qualquer camada durante o efeito.
2. **Manter a composição inteira enquadrada** (todas as quatro faixas, a Jojo central, a cabeça e os pés); nunca usar `object-fit: cover` se isso cortar o conteúdo.
3. Não mudar rostos, posições, figurino, iluminação ou geometria durante a transição.
4. O **único elemento animado é a visibilidade/saturação da cor** em cada uma das quatro faixas de fundo.
5. Exibir **no máximo uma faixa colorida por vez**. Ao avançar para a seguinte, a anterior volta ao monocromático.
6. Manter a Jojo da frente visualmente acima das quatro faixas (`z-index`), **100% monocromática** do começo ao fim.
7. A sequência funciona em ambos os sentidos: rolar para cima reverte a animação.
8. Respeitar `prefers-reduced-motion` e oferecer alternativa estática.

## 2. Sequência narrativa exata

| Estado | Faixa 1 (topo) | Faixa 2 | Faixa 3 | Faixa 4 (base) | Jojo central |
|---|---|---|---|---|---|
| 00 — Início | P&B | P&B | P&B | P&B | P&B |
| 01 | **Colorida** | P&B | P&B | P&B | P&B |
| 02 | P&B | **Colorida** | P&B | P&B | P&B |
| 03 | P&B | P&B | **Colorida** | P&B | P&B |
| 04 | P&B | P&B | P&B | **Colorida** | P&B |
| 05 — Saída | P&B | P&B | P&B | P&B | P&B |

Cada mudança deve ter entrada e saída suaves, sem flashes. O estado inicial e final são idênticos. A duração não é expressa em segundos: **o tempo da interação é determinado pela rolagem**. Não usar reprodução automática nem avançar por intervalos de tempo.

## 3. Arquivos de referência e restrições reais dos materiais

Materiais já usados na discussão (nomes dos arquivos enviados/gerados):

- `Jojo Mendes em Destaque Musical(3).png`: composição vertical inicial, 1024 × 1536, que estabelece o layout com quatro faixas e a Jojo central.
- `colagem_editorial_de_jojo_em_ação.png`: variação visual com faixa superior colorida.
- `colagem_colorida_e_grayscale_de_jojo.png`: variação com segunda faixa colorida.
- `colagem_vertical_com_terceiro_painel_colorido.png`: variação com terceira faixa colorida.
- `colagem_do_jojo_em_preto_e_branco_e_cores.png`: variação com faixa inferior colorida.
- Fotos originais aprovadas da Jojo fornecidas pelo cliente para composição final.

**Atenção essencial:** as quatro imagens coloridas foram geradas separadamente por IA. Apesar de terem **1024 × 1536**, isso **não significa** que sejam pixel a pixel idênticas na posição da cantora, bordas, corpos, roupas e painéis. **Não** sobrepor essas quatro imagens inteiras fazendo crossfade: isso pode criar “fantasmas”, morphing, pulos de posição e mudanças no rosto. Antes do desenvolvimento, inspecionar a correspondência geométrica. Os estados gerados servem prioritariamente como **referência visual do efeito**.

**Atenção sobre “cores verdadeiras”:** não recuperar cor de uma imagem já convertida para P&B por recolorização arbitrária. Utilizar as **fotos originais em cores aprovadas**, respeitando suas cores reais. Se o painel da colagem inicial não puder ser associado fielmente à foto original, preparar a composição final novamente em camadas a partir das fontes, sem inventar cores.

## 4. Estratégia recomendada de produção de assets

Preparar um conjunto único de ativos registrado a partir da mesma composição-mestre. Todos os arquivos precisam ter dimensão idêntica, coordenadas idênticas e canal alfa correto.

Estrutura sugerida:

```text
public/
  images/
    sobre-jojo/
      composicao-base-pb.webp          # 1024x1536: montagem final P&B, sem mudança de enquadramento
      painel-01-cor.webp               # camada RGBA: SÓ interior da faixa 1, com cor verdadeira
      painel-02-cor.webp               # camada RGBA: SÓ interior da faixa 2
      painel-03-cor.webp               # camada RGBA: SÓ interior da faixa 3
      painel-04-cor.webp               # camada RGBA: SÓ interior da faixa 4
      jojo-frente-pb.webp              # recorte RGBA da cantora principal, sempre monocromático
```

**Método de composição preferido:**

1. Recriar uma composição-mestre com os quatro painéis **a partir das fotos originais em cores**, cada qual com a sua área recortada e bordas arredondadas. Separar a Jojo central em transparência precisa (cabelo, mãos, microfone, cordão, contorno de roupa e pés).
2. Exportar o **fundo-base monocromático** com as quatro faixas em P&B, sem a Jojo da frente.
3. Exportar uma camada **RGBA por faixa**: fora da faixa, 100% transparente; dentro dela, a versão original colorida. Observar que o alfa deve respeitar os cantos arredondados e qualquer oclusão intencional.
4. Exportar a **Jojo central recortada e em P&B** como a última camada, acima de todos os painéis.
5. Todas as exportações devem ter a **mesma dimensão e alinhamento absolutos**. O recorte e a posição nunca mudam de um estado para outro.
6. Exportar para WebP ou AVIF conforme suporte e qualidade; manter PNGs de edição. Não compactar agressivamente rostos.

> Se o material final estiver temporariamente disponível apenas como colagens completas de estados gerados pela IA, **parar a integração visual definitiva** e solicitar/produzir os assets alinhados. Não mascarar defeitos geométricos com transições rápidas.

## 5. Especificação de layout

### Desktop

- Seção **Sobre Jojo** depois da Hero e da abertura cinematográfica, quando esta for exibida.
- Grid em duas colunas quando houver espaço: composição visual em uma coluna e o texto editorial **Sobre Jojo** na outra, conforme design system/copy aprovada.
- A composição deve **caber por inteiro na viewport**, respeitando o aspecto **2:3** e sem ser cortada. Usar `object-fit: contain` ou, de preferência, dimensões proporcionais controladas por `aspect-ratio: 2 / 3`.
- Se a altura da viewport for baixa, reduzir proporcionalmente a composição; não cortar a parte superior ou inferior para manter o layout.
- O efeito deve fixar a área visual durante o trecho de scroll; não prender o usuário por mais distância do que o necessário.

### Mobile

- Layout dedicado de **uma coluna**, com a composição completa e texto em posição apropriada, sem encobrir as fotografias.
- Não usar o mesmo tamanho fixo de desktop. Limitar a altura máxima da composição à área útil da viewport e preservar `2:3` com `contain`.
- O pin/scroll deve ser testado em Safari iOS e Chrome Android, considerando as barras de navegador variáveis. Preferir viewport dinâmica quando adequado, sem deslocar a composição.
- Garantir que os quatro momentos sejam perceptíveis com rolagem normal, sem impor gestos artificiais.

### Tablet

- Adotar a variação que preservar enquadramento e legibilidade; não forçar duas colunas se faltar altura ou largura.

## 6. Arquitetura React e GSAP

**Componente:** `SobreJojoScroll`  
**Local sugerido:** `src/components/sections/SobreJojoScroll.tsx` (ajustar ao padrão de pastas existente).  
**Biblioteca:** `gsap` com `ScrollTrigger`. Criar um *Client Component* (`'use client'`) em Next.js App Router.

Camadas DOM:

```tsx
<section aria-labelledby="sobre-jojo-title" ref={sectionRef}>
  <div ref={pinRef} className="...">
    <div className="relative aspect-[2/3] ..." aria-hidden="true">
      <Image src="/images/sobre-jojo/composicao-base-pb.webp" fill ... />
      <Image ref={panel1Ref} src="/images/sobre-jojo/painel-01-cor.webp" fill ... />
      <Image ref={panel2Ref} src="/images/sobre-jojo/painel-02-cor.webp" fill ... />
      <Image ref={panel3Ref} src="/images/sobre-jojo/painel-03-cor.webp" fill ... />
      <Image ref={panel4Ref} src="/images/sobre-jojo/painel-04-cor.webp" fill ... />
      <Image src="/images/sobre-jojo/jojo-frente-pb.webp" fill ... />
    </div>
    <div>... conteúdo de Sobre Jojo ...</div>
  </div>
</section>
```

Esse trecho é **esquemático**, não código pronto: `next/image` exige configuração correta de `sizes`, dimensões e eventuais referências DOM; pode ser mais simples usar `div`s com `ref` envolvendo os `<Image>` para animar opacidade. Cada camada deve usar a mesma caixa (`position: absolute; inset: 0; width: 100%; height: 100%`) e `object-fit: contain` / dimensionamento equivalente. A Jojo central vai acima dos painéis.

### Timeline sugerida (pseudocódigo GSAP)

```ts
const panels = [panel1, panel2, panel3, panel4];
gsap.set(panels, { autoAlpha: 0 });

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: pinElement,
    start: 'top top',
    end: '+=240%', // ponto inicial de ajuste, testar por viewport
    pin: true,
    scrub: true,
    invalidateOnRefresh: true,
    anticipatePin: 1,
  },
});

panels.forEach((panel) => {
  tl.to(panel, { autoAlpha: 1, duration: 0.4, ease: 'none' });
  tl.to(panel, { autoAlpha: 1, duration: 0.2, ease: 'none' }); // pequeno período de destaque
  tl.to(panel, { autoAlpha: 0, duration: 0.4, ease: 'none' });
});
```

A timeline deve garantir sobreposição zero de destaque entre painéis, iniciando e terminando com todos invisíveis. O `end` é apenas referência inicial; ajustar com testes reais. Usar `gsap.context()`/`useGSAP` para escopo, limpeza de triggers no unmount, e `ScrollTrigger.refresh()` depois de alterações relevantes no layout. Evitar instâncias duplicadas durante Strict Mode.

### Lógica de acessibilidade

- Se `prefers-reduced-motion: reduce`, **não inicializar a timeline nem usar pin**. Mostrar composição estática monocromática com conteúdo textual normalmente disponível.
- O conteúdo biográfico precisa estar no DOM como texto real, não embutido na imagem.
- As camadas decorativas não devem ser anunciadas repetidamente por leitores de tela. Oferecer descrição única apropriada no contêiner/elemento semântico.
- Não capturar wheel/touch para simular scroll: usar scroll nativo.

## 7. Condições de carregamento e desempenho

- Não carregar vídeo nesta seção: a animação é montada com imagens estáticas.
- Usar versões comprimidas e dimensionadas responsivamente dos mesmos assets; manter qualidade de imagem satisfatória.
- As quatro camadas RGBA sobrepostas podem consumir memória: verificar o custo total e o desempenho mobile. Pré-carregar somente o necessário para iniciar o efeito sem flashes; carregar demais imagens conforme estratégia adequada.
- A animação deve atuar prioritariamente em `opacity`/`autoAlpha`, sem recalcular cortes ou layout durante o scroll.
- Evitar `filter: grayscale()` em vários elementos grandes a cada frame se houver alternativa com layers pré-exportadas. É aceitável manter a base P&B estática e animar apenas a opacidade de painéis já coloridos.
- Respeitar a barra de navegação e viewport dinâmica; revisar `ScrollTrigger.refresh()`.

## 8. Critérios de aceite verificáveis

A implementação só está pronta quando:

- [ ] A imagem inicial é inteiramente P&B, inclusive a Jojo central.
- [ ] Ao rolar: painel superior ganha cor verdadeira e volta a P&B.
- [ ] Em seguida: painel 2 ganha cor verdadeira e volta a P&B.
- [ ] Em seguida: painel 3 ganha cor verdadeira e volta a P&B.
- [ ] Em seguida: painel 4 ganha cor verdadeira e volta a P&B.
- [ ] Nunca há dois painéis coloridos ao mesmo tempo.
- [ ] Jojo central não recebe cor em nenhum frame.
- [ ] **Zero zoom, zero corte, zero movimento e zero alteração geométrica** em todas as camadas.
- [ ] Nenhum rosto ou borda “salta” quando uma faixa acende ou apaga.
- [ ] Todas as quatro faixas e a Jojo inteira são visíveis em desktop e mobile.
- [ ] Rolagem reversa desfaz os estados corretamente.
- [ ] `prefers-reduced-motion` desativa pin e animação.
- [ ] Não há tremulação de scroll, sobreposição inesperada com header nem scroll preso.
- [ ] Biografia e CTAs da seção continuam legíveis e acionáveis.
- [ ] A seção funciona sem JavaScript como composição estática de fallback, quando possível.

## 9. Fluxo de implementação para o agente

1. **Auditar os arquivos fornecidos** e identificar as fotografias originais corretas para cada faixa. Não confiar apenas nos estados gerados separadamente.
2. **Montar os assets finais alinhados** em uma única composição-mestre com base P&B, quatro overlays coloridos e recorte P&B da Jojo central.
3. **Criar componente React com dimensões responsivas**, mantendo a proporção completa e todos os elementos no mesmo sistema de coordenadas.
4. **Implementar timeline GSAP + ScrollTrigger** com `pin` e `scrub`, em sequência estritamente controlada pela rolagem.
5. **Testar o componente isoladamente**: início, 4 estados ativos, reversão, saída e redução de movimento.
6. **Integrar à seção Sobre Jojo**, mantendo o design system, o texto existente e evitando reestruturar outras seções da página.
7. **Validar em desktop/mobile** com screenshots da mesma composição em todos os estados; conferir pixels de pontos de referência para detectar qualquer deslocamento.

## 10. Fora do escopo

- Gerar vídeo novo ou usar o vídeo anterior como player nesta seção.
- Animar movimento da cantora, boca, expressões, microfone ou fundo.
- Criar efeitos de câmera, partículas, luzes pulsantes, 3D ou parallax.
- Redesenhar a identidade visual, trocar o design da Hero ou alterar a arquitetura da API e do painel administrativo.
- Inventar nova biografia da artista ou novos CTAs.

---

**Comando de implementação resumido:** construir a experiência visual da seção Sobre Jojo com **fotos reais coloridas alinhadas, a Jojo central sempre P&B, quatro painéis ativados sequencialmente pela rolagem com GSAP ScrollTrigger e enquadramento absolutamente fixo**, preservando todo o site existente.
