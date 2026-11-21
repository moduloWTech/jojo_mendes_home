import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdminSession } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const authResult = await requireAdminSession(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { id } = await context.params;

  try {
    const photo = await prisma.galleryImage.findUnique({
      where: { id },
    });

    if (photo && photo.src.includes('public.blob.vercel-storage.com') && process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const { del } = await import('@vercel/blob');
        await del(photo.src);
      } catch (delError) {
        console.warn('Aviso ao remover blob da Vercel:', delError);
      }
    }

    await prisma.galleryImage.delete({
      where: { id },
    });

    try {
      revalidatePath('/');
    } catch {
      // Ignora erro fora de runtime Next
    }

    return NextResponse.json({ message: 'Foto excluída com sucesso.' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro ao excluir foto';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

