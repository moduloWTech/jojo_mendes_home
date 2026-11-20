import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdminSession } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { adminVideoSchema, extractYouTubeId } from '@/lib/validation/admin';

export async function GET(request: NextRequest) {
  const authResult = await requireAdminSession(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  try {
    const videos = await prisma.video.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
    return NextResponse.json({ videos });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro ao buscar vídeos';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authResult = await requireAdminSession(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: 'Corpo da requisição inválido.' },
        { status: 400 }
      );
    }

    const validation = adminVideoSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Dados inválidos.',
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const youtubeId = extractYouTubeId(validation.data.youtubeUrlOrId);
    if (!youtubeId) {
      return NextResponse.json(
        { error: 'Link ou ID do YouTube inválido. Cole o link completo ou o ID de 11 caracteres.' },
        { status: 400 }
      );
    }

    const newVideo = await prisma.video.create({
      data: {
        youtubeId,
        title: validation.data.title,
        isDemo: validation.data.isDemo,
        order: validation.data.order,
      },
    });

    try {
      revalidatePath('/');
    } catch {
      // Ignora erro fora de runtime Next
    }

    return NextResponse.json({ video: newVideo }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro ao cadastrar vídeo';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

