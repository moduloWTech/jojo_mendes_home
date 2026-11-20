import { z } from 'zod';

export const adminLoginSchema = z.object({
  email: z.string().trim().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres'),
});

export const adminShowSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato AAAA-MM-DD'),
  city: z.string().trim().min(2, 'Informe a cidade'),
  state: z.string().trim().length(2, 'UF deve ter exatamente 2 letras').toUpperCase(),
  venue: z.string().trim().min(2, 'Informe o local do evento'),
  time: z
    .string()
    .trim()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Horário deve estar no formato HH:mm')
    .optional()
    .nullable(),
  detailsUrl: z
    .string()
    .trim()
    .url('Link inválido')
    .optional()
    .nullable()
    .or(z.literal('')),
  status: z.enum(['confirmed', 'sold_out', 'cancelled']).default('confirmed'),
  order: z.number().int().default(0),
});

export const adminVideoSchema = z.object({
  youtubeUrlOrId: z.string().trim().min(3, 'Informe o link ou ID do YouTube'),
  title: z.string().trim().min(2, 'Informe o título do vídeo'),
  isDemo: z.boolean().default(false),
  order: z.number().int().default(0),
});

export const adminPhotoSchema = z.object({
  src: z.string().trim().url('URL da imagem inválida'),
  alt: z.string().trim().min(2, 'Informe a descrição da foto para acessibilidade'),
  width: z.number().int().positive().default(1200),
  height: z.number().int().positive().default(800),
  positionMobile: z.string().trim().optional().nullable(),
  positionDesktop: z.string().trim().optional().nullable(),
  order: z.number().int().default(0),
});

/**
 * Utilitário para extrair o ID do YouTube a partir de URLs variadas ou ID puro.
 */
export function extractYouTubeId(input: string): string | null {
  const cleanInput = input.trim();
  // Se já for um ID de 11 caracteres alfanuméricos
  if (/^[a-zA-Z0-9_-]{11}$/.test(cleanInput)) {
    return cleanInput;
  }

  try {
    const parsed = new URL(cleanInput);
    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.slice(1).split('?')[0];
      return id && id.length === 11 ? id : null;
    }
    if (parsed.hostname.includes('youtube.com')) {
      const v = parsed.searchParams.get('v');
      if (v && v.length === 11) return v;
      if (parsed.pathname.startsWith('/embed/')) {
        const id = parsed.pathname.split('/embed/')[1]?.split('?')[0];
        return id && id.length === 11 ? id : null;
      }
      if (parsed.pathname.startsWith('/shorts/')) {
        const id = parsed.pathname.split('/shorts/')[1]?.split('?')[0];
        return id && id.length === 11 ? id : null;
      }
    }
  } catch {
    // Não é uma URL válida
  }

  const match = cleanInput.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  return match ? match[1] : null;
}

