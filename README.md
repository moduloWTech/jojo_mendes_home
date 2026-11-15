# Jojo Mendes — Site Oficial

Aplicação oficial da cantora **Jojo Mendes**, desenvolvida em **Next.js (App Router) + React + TypeScript + Tailwind CSS**, seguindo rigorosamente o Design System v3.0, a Especificação Técnica/Layout e o Mapa de Copywriting & CTAs em `docs/`.

---

## 1. Como executar localmente

```bash
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm run dev

# Executar checagem de tipos e testes automatizados
npm run typecheck
npm test

# Gerar build de produção
npm run build
npm start
```

---

## 2. Onde atualizar conteúdos e mídias (`src/content/site.ts`)

Toda a alimentação de conteúdo está centralizada em **`src/content/site.ts`** e as copies fixas em **`src/content/copy.ts`** (sem textos espalhados nos componentes JSX):

- **Vídeo e Poster da Hero (`heroMedia`):** arquivos em `public/media/jojo/video_hero.mp4` e `public/media/jojo/hero-poster.jpg`.
- **Biografia (`biography`):** substituir os parágrafos provisórios em `biography.paragraphs` e alterar `isProvisional: false` quando o texto oficial for aprovado.
- **Agenda (`shows`):** adicionar objetos ao array `shows` com `id`, `date` (`YYYY-MM-DD`), `city`, `state`, `venue`, `time` (opcional) e `detailsUrl` (opcional). Quando vazio, exibe automaticamente `"Novas datas em breve."`.
- **Vídeos do YouTube (`videos`):** substituir os itens demonstrativos pelos IDs reais do YouTube da cantora e definir `isDemo: false`.
- **Galeria (`gallery`):** fotos oficiais em `public/media/jojo/` vindas de `fotos_/album_de_fotos/`.
- **Formação musical (`musicians`):** adicionar integrantes reais com `confirmed: true` quando autorizados.
- **Material de divulgação (`pressAssets`):** adicionar arquivos reais autorizados em `public/media/jojo/` para habilitar o botão `"Baixar arquivo"`.
- **Redes sociais (`socialLinks`):** preencher `instagram`, `tiktok` e `youtube` com as URLs oficiais verificadas.

---

## 3. Como ativar o envio real do formulário (`/contratacao`)

1. Copie `.env.example` para `.env.local`.
2. Configure `BOOKING_WEBHOOK_URL` **ou** `RESEND_API_KEY` + `BOOKING_RECIPIENT_EMAIL`.
3. Revise e aprove o texto jurídico definitivo em `/privacidade` (`src/content/copy.ts` -> `privacyPage`).
4. Enquanto não configurado, `POST /api/contratacao` retorna `503` (`NOT_CONFIGURED`) e a interface informa `"Formulário de demonstração: envio ainda não habilitado."` (nunca simula falso envio).

---

## 4. Pendências de conteúdo oficial da artista para publicação final

- [ ] Biografia oficial aprovada.
- [ ] Datas reais da agenda de shows.
- [ ] IDs dos vídeos oficiais do YouTube da cantora.
- [ ] Nomes, funções e fotos confirmadas dos músicos da formação.
- [ ] Arquivos de Press Kit e Rider Técnico para download.
- [ ] URLs oficiais de Instagram, TikTok e YouTube.
- [ ] Contato comercial oficial e credenciais do provedor de envio do formulário.
- [ ] Revisão jurídica da Política de Privacidade (`/privacidade`).

