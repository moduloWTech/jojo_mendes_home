import type {
  ArtistStoryChapter,
  ArtistVideo,
  BiographyContent,
  GalleryImage,
  HeroMedia,
  Musician,
  PressAsset,
  Show,
  SocialLinks,
} from '@/types/site';

export const brand = {
  name: 'Jojo Mendes',
  logo: {
    src: '/media/jojo/logo-oficial.png',
    alt: 'Jojo Mendes',
    width: 866,
    height: 288,
  },
  emblem: {
    src: '/media/jojo/logo-simbolo.png',
    alt: 'Símbolo Jojo Mendes',
    width: 500,
    height: 500,
  },
} as const;

/**
 * Links oficiais das redes sociais.
 * Quando null, o link não é renderizado no rodapé (zero links fictícios).
 */
export const socialLinks: SocialLinks = {
  instagram: 'https://www.instagram.com/jojomendesoficial',
  tiktok: null,
  youtube: 'https://www.youtube.com/@jojomendesoficial',
};

/**
 * Contato comercial oficial.
 * Mantido como null até ser fornecido oficialmente pela equipe da cantora.
 */
export const commercialContact: {
  email: string | null;
  phone: string | null;
  whatsappUrl: string;
  whatsappRawNumber: string;
} = {
  email: null,
  phone: '(98) 98451-0178',
  whatsappRawNumber: '5598984510178',
  whatsappUrl:
    'https://wa.me/5598984510178?text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20shows%20e%20contrata%C3%A7%C3%A3o%20de%20Jojo%20Mendes.',
};

/**
 * Mídia da Hero cinematográfica (#inicio).
 * Usa o vídeo oficial enviado (/media/jojo/video_hero.mp4) e poster estático real.
 */
export const heroMedia: HeroMedia = {
  videoMobile: '/media/jojo/jojo_bg_mobile_0_7.mp4',
  videoDesktop: '/media/jojo/jojo_init_site.mp4',
  posterMobile: '/media/jojo/hero-poster.jpg',
  posterDesktop: '/media/jojo/hero-poster.jpg',
  posterAlt: 'Jojo Mendes cantando ao vivo no palco',
  positionMobile: 'center 25%',
  positionDesktop: 'center 30%',
};

/**
 * Biografia da artista (#historia).
 * Texto provisório literal aprovado na documentação até envio da biografia oficial.
 */
export const biography: BiographyContent = {
  isProvisional: false,
  paragraphs: [
    'A música faz parte de quem eu sou desde os meus primeiros passos. Comecei a cantar aos três anos no coral da igreja — e como eu era bem pequena, precisavam me colocar em cima de um banquinho atrás do púlpito para que o microfone me alcançasse. Em casa, passava os dias cantando de tudo: de louvores a clássicos que marcaram minha infância.',
    'Minha história nos palcos começou a mudar quando acompanhei uma prima em um teste de locução em estúdio. No intervalo, sentei para cantar despretensiosamente com um tecladista que gravava por lá. Ali fui descoberta. A partir dali vieram os ensaios, o rock, os bailes de bolero, a Banda Fox, Banda Rubi e parcerias inesquecíveis na noite.',
    'Cada ensaio e cada palco foram fundamentais para construir a artista que sou hoje. Na minha carreira solo, levo essa história inteira comigo: um repertório feito para emocionar, dançar e celebrar a vida ao lado de quem ama a boa música.',
  ],
  photo: {
    src: '/media/jojo/foto-estudio-microfone.png',
    alt: 'Jojo Mendes em estúdio segurando o microfone',
    width: 1088,
    height: 1446,
    positionMobile: 'center top',
    positionDesktop: 'center top',
  },
};

/**
 * Capítulos autobiográficos da artista (#historia), revelados sequencialmente no scroll.
 */
export const artistStoryChapters: ArtistStoryChapter[] = [
  {
    id: 1,
    chapter: '01',
    badge: 'A Infância & As Raízes',
    title: 'A menina do banquinho',
    text: 'Aos três anos de idade, eu já cantava no coral da igreja. Como era pequenininha, me colocavam em cima de um banquinho atrás do púlpito para alcançar o microfone. Em casa, passava o dia cantando louvores e os clássicos da infância.',
  },
  {
    id: 2,
    chapter: '02',
    badge: 'A Descoberta',
    title: 'A surpresa no estúdio',
    text: 'Fui acompanhar minha prima num teste de locução em estúdio. No intervalo, comecei a cantar despretensiosamente com um rapaz que tocava teclado por lá. Me ouviram e ali recebi o convite para a minha primeira banda.',
  },
  {
    id: 3,
    chapter: '03',
    badge: 'A Estrada & A Noite',
    title: 'A escola dos palcos',
    text: 'Passei pela Banda Fox, pela Banda Rubi, cantei do rock ao bolero e dividi o microfone em palcos marcantes da noite. Essa bagagem eclética me ensinou a sentir a energia do público e a dominar o palco.',
  },
  {
    id: 4,
    chapter: '04',
    badge: 'Carreira Solo',
    title: 'Minha voz, minha verdade',
    text: 'Hoje, na minha carreira solo, canto com a alma aberta. É um repertório pensado para fazer dançar, emocionar e celebrar a vida ao lado de quem ama a boa música popular.',
  },
];

/**
 * Agenda de shows (#agenda).
 * 20 datas de demonstração no mês atual para validação visual do layout da dobra de Agenda.
 */
export const shows: Show[] = [
  {
    id: 'show-01',
    date: '2026-11-01',
    city: 'Recife',
    state: 'PE',
    venue: 'Villa Forró Music Hall',
    time: '21:30',
    status: 'confirmed',
  },
  {
    id: 'show-02',
    date: '2026-11-03',
    city: 'Olinda',
    state: 'PE',
    venue: 'Varanda do Alto — Sessão Acústica',
    time: '20:00',
    status: 'confirmed',
  },
  {
    id: 'show-03',
    date: '2026-11-05',
    city: 'Caruaru',
    state: 'PE',
    venue: 'Pátio de Eventos Luiz Gonzaga',
    time: '22:00',
    status: 'confirmed',
  },
  {
    id: 'show-04',
    date: '2026-11-06',
    city: 'João Pessoa',
    state: 'PB',
    venue: 'Arena Tambaú Sunset',
    time: '19:30',
    status: 'confirmed',
  },
  {
    id: 'show-05',
    date: '2026-11-07',
    city: 'Campina Grande',
    state: 'PB',
    venue: 'Vila Sítio São João',
    time: '22:30',
    status: 'confirmed',
  },
  {
    id: 'show-06',
    date: '2026-11-08',
    city: 'Natal',
    state: 'RN',
    venue: 'Espaço Ponta Negra Ao Vivo',
    time: '21:00',
    status: 'confirmed',
  },
  {
    id: 'show-07',
    date: '2026-11-10',
    city: 'Maceió',
    state: 'AL',
    venue: 'Orla Pajuçara Lounge',
    time: '20:30',
    status: 'confirmed',
  },
  {
    id: 'show-08',
    date: '2026-11-12',
    city: 'Aracaju',
    state: 'SE',
    venue: 'Passarela do Caranguejo Prime',
    time: '21:30',
    status: 'confirmed',
  },
  {
    id: 'show-09',
    date: '2026-11-13',
    city: 'Salvador',
    state: 'BA',
    venue: 'Largo do Pelourinho — Noite de Cantiga',
    time: '21:00',
    status: 'confirmed',
  },
  {
    id: 'show-10',
    date: '2026-11-14',
    city: 'Feira de Santana',
    state: 'BA',
    venue: 'Estação Forró & Tradição',
    time: '22:30',
    status: 'confirmed',
  },
  {
    id: 'show-11',
    date: '2026-11-15',
    city: 'Petrolina',
    state: 'PE',
    venue: 'Orla do Rio São Francisco',
    time: '20:00',
    status: 'confirmed',
  },
  {
    id: 'show-12',
    date: '2026-11-17',
    city: 'Juazeiro do Norte',
    state: 'CE',
    venue: 'Centro Cultural do Cariri',
    time: '21:00',
    status: 'confirmed',
  },
  {
    id: 'show-13',
    date: '2026-11-19',
    city: 'Fortaleza',
    state: 'CE',
    venue: 'Kukukaya Casa de Forró',
    time: '22:00',
    status: 'confirmed',
  },
  {
    id: 'show-14',
    date: '2026-11-20',
    city: 'Fortaleza',
    state: 'CE',
    venue: 'Festival Ventos do Nordeste — Praia de Iracema',
    time: '21:30',
    status: 'confirmed',
  },
  {
    id: 'show-15',
    date: '2026-11-21',
    city: 'Mossoró',
    state: 'RN',
    venue: 'Estação das Artes Elizeu Ventania',
    time: '22:30',
    status: 'confirmed',
  },
  {
    id: 'show-16',
    date: '2026-11-22',
    city: 'Garanhuns',
    state: 'PE',
    venue: 'Praça Mestre Dominguinhos',
    time: '20:30',
    status: 'confirmed',
  },
  {
    id: 'show-17',
    date: '2026-11-25',
    city: 'Gravatá',
    state: 'PE',
    venue: 'Villa da Serra Music',
    time: '21:00',
    status: 'confirmed',
  },
  {
    id: 'show-18',
    date: '2026-11-27',
    city: 'São Paulo',
    state: 'SP',
    venue: 'CTN — Centro de Tradições Nordestinas',
    time: '22:30',
    status: 'confirmed',
  },
  {
    id: 'show-19',
    date: '2026-11-28',
    city: 'Rio de Janeiro',
    state: 'RJ',
    venue: 'Feira de São Cristóvão — Palco Principal',
    time: '22:00',
    status: 'confirmed',
  },
  {
    id: 'show-20',
    date: '2026-11-29',
    city: 'Recife',
    state: 'PE',
    venue: 'Marco Zero — Encerramento da Turnê do Mês',
    time: '19:30',
    status: 'confirmed',
  },
];

/**
 * Vídeos (#videos).
 * Enquanto os IDs oficiais do YouTube da cantora não forem enviados,
 * utiliza vídeos demonstrativos claramente identificados com isDemo: true.
 */
/**
 * Vídeos oficiais da artista (#videos).
 * Apresentações oficiais do canal @jojomendesoficial.
 */
export const videos: ArtistVideo[] = [
  {
    id: 'video-01',
    youtubeId: 'QaEwVp334kA',
    title: 'Jojo Mendes — Ao Vivo (Seresta & Arrocha)',
    isDemo: false,
  },
  {
    id: 'video-02',
    youtubeId: 'bE1HTm7x9PY',
    title: 'Quatro Enganados (Versão Arrocha)',
    isDemo: false,
  },
  {
    id: 'video-03',
    youtubeId: 'VHxHgoNqpL4',
    title: 'Body Splash — Jojo Mendes',
    isDemo: false,
  },
  {
    id: 'video-04',
    youtubeId: 'icHtU7KSk2A',
    title: 'Me Leva Pra Casa / Escrito Nas Estrelas / Saudades',
    isDemo: false,
  },
  {
    id: 'video-05',
    youtubeId: 'E4ZxPY98Xfs',
    title: 'Canudinho — Jojo Mendes',
    isDemo: false,
  },
  {
    id: 'video-06',
    youtubeId: 'afPdDCRmcjw',
    title: 'Perigo — Jojo Mendes',
    isDemo: false,
  },
];

/**
 * Galeria de fotos oficiais (#galeria).
 * Exclusivamente fotos da pasta fotos_/album_de_fotos.
 */
export const gallery: GalleryImage[] = [
  {
    id: 'galeria-1',
    src: '/media/jojo/foto-ensaio-violao.jpeg',
    alt: 'Jojo Mendes sorrindo enquanto toca violão e canta ao microfone',
    width: 1199,
    height: 1312,
    positionMobile: 'center 20%',
    positionDesktop: 'center 20%',
  },
  {
    id: 'galeria-2',
    src: '/media/jojo/foto-palco-noite.jpeg',
    alt: 'Jojo Mendes cantando no palco sob iluminação noturna de show',
    width: 960,
    height: 960,
    positionMobile: 'center 20%',
    positionDesktop: 'center 20%',
  },
  {
    id: 'galeria-3',
    src: '/media/jojo/foto-show-mesa.jpeg',
    alt: 'Jojo Mendes cantando ao microfone durante apresentação ao vivo',
    width: 1199,
    height: 1312,
    positionMobile: 'center 18%',
    positionDesktop: 'center 18%',
  },
  {
    id: 'galeria-4',
    src: '/media/jojo/foto-ensaio-retrato.jpeg',
    alt: 'Retrato de Jojo Mendes sorrindo com microfone na mão',
    width: 995,
    height: 1581,
    positionMobile: 'center 15%',
    positionDesktop: 'center 15%',
  },
  {
    id: 'galeria-5',
    src: '/media/jojo/foto-show-sorrindo.jpeg',
    alt: 'Jojo Mendes sorrindo e cantando ao microfone em apresentação',
    width: 1086,
    height: 1448,
    positionMobile: 'center 20%',
    positionDesktop: 'center 20%',
  },
  {
    id: 'galeria-6',
    src: '/media/jojo/foto-ensaio-cantando.jpeg',
    alt: 'Jojo Mendes cantando ao microfone com a mão estendida',
    width: 1199,
    height: 1312,
    positionMobile: 'center 15%',
    positionDesktop: 'center 15%',
  },
  {
    id: 'galeria-7',
    src: '/media/jojo/foto-estudio-microfone.png',
    alt: 'Jojo Mendes em estúdio musical segurando microfone',
    width: 1088,
    height: 1446,
    positionMobile: 'center 15%',
    positionDesktop: 'center 15%',
  },
  {
    id: 'galeria-8',
    src: '/media/jojo/foto-recorte.jpeg',
    alt: 'Jojo Mendes cantando ao microfone e apontando para o público',
    width: 1118,
    height: 1600,
    positionMobile: 'center 15%',
    positionDesktop: 'center 15%',
  },
];

/**
 * Foto de fundo e editorial para as áreas de contratação.
 */
export const bookingMedia = {
  bannerBackground: {
    src: '/media/jojo/foto-palco-noite.jpeg',
    alt: '',
    positionMobile: 'center 25%',
    positionDesktop: 'center 30%',
  },
  pageEditorialPhoto: {
    src: '/media/jojo/foto-ensaio-violao.jpeg',
    alt: 'Jojo Mendes tocando violão e cantando ao microfone',
    width: 1199,
    height: 1312,
    positionDesktop: 'center 20%',
  },
} as const;

/**
 * Formação musical (#musicos).
 * Mantido vazio até confirmação nominal e fotos autorizadas dos integrantes.
 */
export const musicians: Musician[] = [];

/**
 * Material de divulgação / Imprensa (#imprensa).
 * Arquivos oficiais em alta resolução para download por contratantes e imprensa.
 */
export const pressAssets: PressAsset[] = [
  {
    id: 'press-logo-oficial',
    title: 'Logotipo Oficial Dourado',
    href: '/media/jojo/logo-oficial.png',
    format: 'PNG HD',
    sizeLabel: '866 × 288 px',
    category: 'logo',
    thumbnail: '/media/jojo/logo-oficial.png',
    badge: 'Fundo Transparente',
    isTransparent: true,
  },
  {
    id: 'press-logo-simbolo',
    title: 'Símbolo & Emblema Oficial (JM)',
    href: '/media/jojo/logo-simbolo.png',
    format: 'PNG HD',
    sizeLabel: '500 × 500 px',
    category: 'logo',
    thumbnail: '/media/jojo/logo-simbolo.png',
    badge: 'Ícone Oficial',
    isTransparent: true,
  },
  {
    id: 'press-foto-recorte',
    title: 'Foto Recortada para Cartazes',
    href: '/media/jojo/jojo-foto-recorte-cartaz.png',
    format: 'PNG HD',
    sizeLabel: '682 × 1024 px',
    category: 'foto',
    thumbnail: '/media/jojo/jojo-foto-recorte-cartaz.png',
    badge: 'Pronta para Flyer',
    isTransparent: true,
  },
  {
    id: 'press-mapa-palco',
    title: 'Mapa de Palco & Rider Técnico',
    href: '/media/mapa-palco-jojo-mendes.png',
    format: 'PNG HD',
    sizeLabel: '1448 × 1086 px',
    category: 'rider',
    thumbnail: '/media/mapa-palco-jojo-mendes.png',
    badge: 'Ficha Técnica Oficial',
    isTransparent: false,
  },
];

export const brazilianStates = [
  { value: 'AC', label: 'Acre (AC)' },
  { value: 'AL', label: 'Alagoas (AL)' },
  { value: 'AP', label: 'Amapá (AP)' },
  { value: 'AM', label: 'Amazonas (AM)' },
  { value: 'BA', label: 'Bahia (BA)' },
  { value: 'CE', label: 'Ceará (CE)' },
  { value: 'DF', label: 'Distrito Federal (DF)' },
  { value: 'ES', label: 'Espírito Santo (ES)' },
  { value: 'GO', label: 'Goiás (GO)' },
  { value: 'MA', label: 'Maranhão (MA)' },
  { value: 'MT', label: 'Mato Grosso (MT)' },
  { value: 'MS', label: 'Mato Grosso do Sul (MS)' },
  { value: 'MG', label: 'Minas Gerais (MG)' },
  { value: 'PA', label: 'Pará (PA)' },
  { value: 'PB', label: 'Paraíba (PB)' },
  { value: 'PR', label: 'Paraná (PR)' },
  { value: 'PE', label: 'Pernambuco (PE)' },
  { value: 'PI', label: 'Piauí (PI)' },
  { value: 'RJ', label: 'Rio de Janeiro (RJ)' },
  { value: 'RN', label: 'Rio Grande do Norte (RN)' },
  { value: 'RS', label: 'Rio Grande do Sul (RS)' },
  { value: 'RO', label: 'Rondônia (RO)' },
  { value: 'RR', label: 'Roraima (RR)' },
  { value: 'SC', label: 'Santa Catarina (SC)' },
  { value: 'SP', label: 'São Paulo (SP)' },
  { value: 'SE', label: 'Sergipe (SE)' },
  { value: 'TO', label: 'Tocantins (TO)' },
  { value: 'EX', label: 'Exterior' },
] as const;

