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
  videoMobile: '/media/jojo/video_hero.mp4',
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
 * Inicializada vazia conforme documentação para exibir o estado vazio honesto ("Novas datas em breve.").
 */
export const shows: Show[] = [];

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

