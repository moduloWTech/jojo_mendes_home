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
  width: number;
  height: number;
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

export type HeroMedia = {
  videoMobile: string | null;
  videoDesktop: string | null;
  posterMobile: string;
  posterDesktop: string;
  posterAlt: string;
  positionMobile?: string;
  positionDesktop?: string;
};

export type BiographyContent = {
  isProvisional: boolean;
  paragraphs: string[];
  photo: {
    src: string;
    alt: string;
    width: number;
    height: number;
    positionMobile?: string;
    positionDesktop?: string;
  };
};

export type ArtistStoryChapter = {
  id: number;
  chapter: string;
  badge: string;
  title: string;
  text: string;
};

