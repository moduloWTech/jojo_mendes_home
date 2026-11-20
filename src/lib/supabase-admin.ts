import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })
    : null;

export const GALLERY_BUCKET = 'galeria';

/**
 * Faz upload de imagem para o Supabase Storage.
 * Retorna a URL pública gerada.
 */
export async function uploadGalleryPhotoToStorage(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  if (!supabaseAdmin) {
    throw new Error('Supabase Storage não está configurado no ambiente.');
  }

  const uniqueFileName = `${Date.now()}-${fileName.replace(/\s+/g, '-').toLowerCase()}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from(GALLERY_BUCKET)
    .upload(uniqueFileName, fileBuffer, {
      contentType,
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Erro no upload para o Supabase Storage: ${uploadError.message}`);
  }

  const { data } = supabaseAdmin.storage
    .from(GALLERY_BUCKET)
    .getPublicUrl(uniqueFileName);

  return data.publicUrl;
}

