import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdminSession } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { adminShowSchema } from '@/lib/validation/admin';

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

    const validation = adminShowSchema.partial().safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Dados inválidos.',
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const updatedShow = await prisma.show.update({
      where: { id },
      data: validation.data,
    });

    try {
      revalidatePath('/');
    } catch {
      // Ignora erro fora de runtime Next
    }

    return NextResponse.json({ show: updatedShow });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro ao atualizar show';
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
    await prisma.show.delete({
      where: { id },
    });

    try {
      revalidatePath('/');
    } catch {
      // Ignora erro fora de runtime Next
    }

    return NextResponse.json({ message: 'Show excluído com sucesso.' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro ao excluir show';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

