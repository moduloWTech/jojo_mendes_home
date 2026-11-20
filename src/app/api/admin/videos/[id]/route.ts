import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdminSession } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { adminVideoSchema, extractYouTubeId } from '@/lib/validation/admin';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const authResult = await requireAdminSession(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { id } = await context.params;

  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: 'Corpo da requisição inválido.' },
        { status: 400 }
      );
    }

    const validation = adminVideoSchema.partial().safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Dados inválidos.',
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {};
    if (validation.data.title !== undefined) updateData.title = validation.data.title;
    if (validation.data.isDemo !== undefined) updateData.isDemo = validation.data.isDemo;
    if (validation.data.order !== undefined) updateData.order = validation.data.order;

    if (validation.data.youtubeUrlOrId) {
      const youtubeId = extractYouTubeId(validation.data.youtubeUrlOrId);
      if (!youtubeId) {
        return NextResponse.json(
          { error: 'Link ou ID do YouTube inválido.' },
          { status: 400 }
        );
      }
      updateData.youtubeId = youtubeId;
    }

    const updatedVideo = await prisma.video.update({
      where: { id },
      data: updateData,
    });

    try {
      revalidatePath('/');
    } catch {
      // Ignora erro fora de runtime Next
    }

    return NextResponse.json({ video: updatedVideo });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro ao atualizar vídeo';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const authResult = await requireAdminSession(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { id } = await context.params;

  try {
    await prisma.video.delete({
      where: { id },
    });

    try {
      revalidatePath('/');
    } catch {
      // Ignora erro fora de runtime Next
    }

    return NextResponse.json({ message: 'Vídeo excluído com sucesso.' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro ao excluir vídeo';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

