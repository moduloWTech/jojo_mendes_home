import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdminSession } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { adminPhotoSchema } from '@/lib/validation/admin';
import { uploadGalleryPhotoToStorage, supabaseAdmin } from '@/lib/supabase-admin';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
  const authResult = await requireAdminSession(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  try {
    const photos = await prisma.galleryImage.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
    return NextResponse.json({ photos });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro ao buscar fotos';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authResult = await requireAdminSession(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  try {
    const contentType = request.headers.get('content-type') || '';

    // Opção 1: Multipart FormData (Upload de arquivo direto)
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;
      const alt = (formData.get('alt') as string | null) || 'Foto oficial Jojo Mendes';
      const order = Number(formData.get('order') || 0);

      if (!file) {
        return NextResponse.json(
          { error: 'Nenhum arquivo de imagem enviado.' },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      let publicSrc: string;

      if (process.env.BLOB_READ_WRITE_TOKEN) {
        // Vercel Blob Storage nativo
        const { put } = await import('@vercel/blob');
        const safeName = `${Date.now()}-${file.name.replace(/\s+/g, '-').toLowerCase()}`;
        const blob = await put(`galeria/${safeName}`, file, {
          access: 'public',
          token: process.env.BLOB_READ_WRITE_TOKEN.trim(),
        });
        publicSrc = blob.url;
      } else if (supabaseAdmin) {
        publicSrc = await uploadGalleryPhotoToStorage(
          buffer,
          file.name,
          file.type || 'image/jpeg'
        );
      } else {
        // Fallback local caso nenhum storage em nuvem esteja configurado
        const uploadDir = path.join(process.cwd(), 'public', 'media', 'uploads');
        await fs.mkdir(uploadDir, { recursive: true });
        const safeName = `${Date.now()}-${file.name.replace(/\s+/g, '-').toLowerCase()}`;
        await fs.writeFile(path.join(uploadDir, safeName), buffer);
        publicSrc = `/media/uploads/${safeName}`;
      }

      const newPhoto = await prisma.galleryImage.create({
        data: {
          src: publicSrc,
          alt,
          width: 1200,
          height: 800,
          order,
        },
      });

      try {
        revalidatePath('/');
      } catch {
        // Ignora erro fora de runtime Next
      }

      return NextResponse.json({ photo: newPhoto }, { status: 201 });
    }

    // Opção 2: JSON payload (URL pré-existente)
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: 'Corpo da requisição inválido.' },
        { status: 400 }
      );
    }

    const validation = adminPhotoSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Dados inválidos.',
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const newPhoto = await prisma.galleryImage.create({
      data: validation.data,
    });

    try {
      revalidatePath('/');
    } catch {
      // Ignora erro fora de runtime Next
    }

    return NextResponse.json({ photo: newPhoto }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro ao cadastrar foto';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

