import type {
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
  instagram: null,
  tiktok: null,
  youtube: null,
};

/**
 * Contato comercial oficial.
 * Mantido como null até ser fornecido oficialmente pela equipe da cantora.
 */
export const commercialContact: {
  email: string | null;
  phone: string | null;
} = {
  email: null,
  phone: null,
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
  isProvisional: true,
  paragraphs: [
    'A história de Jojo Mendes será contada aqui, com as palavras e os momentos que fazem parte da sua trajetória.',
    'Este espaço receberá a biografia oficial da cantora, acompanhada de fotografias selecionadas.',
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
export const videos: ArtistVideo[] = [
  {
    id: 'demo-video-1',
    youtubeId: 'aqz-KE-bpKQ',
    title: 'Prévia do layout de vídeo',
    isDemo: true,
  },
  {
    id: 'demo-video-2',
    youtubeId: 'LXb3EKWsInQ',
    title: 'Prévia do layout de vídeo 2',
    isDemo: true,
  },
  {
    id: 'demo-video-3',
    youtubeId: 'ysz5S6PUM-U',
    title: 'Prévia do layout de vídeo 3',
    isDemo: true,
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
 * Mantido vazio até liberação oficial de press kit e rider técnico para exibir "Materiais em preparação.".
 */
export const pressAssets: PressAsset[] = [];

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

