import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdminSession } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { adminShowSchema } from '@/lib/validation/admin';

export async function GET(request: NextRequest) {
  const authResult = await requireAdminSession(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  try {
    const shows = await prisma.show.findMany({
      orderBy: [{ date: 'asc' }, { time: 'asc' }],
    });
    return NextResponse.json({ shows });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro ao buscar shows';
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

    const validation = adminShowSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Dados inválidos.',
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const newShow = await prisma.show.create({
      data: {
        date: validation.data.date,
        city: validation.data.city,
        state: validation.data.state,
        venue: validation.data.venue,
        time: validation.data.time || null,
        detailsUrl: validation.data.detailsUrl || null,
        status: validation.data.status,
        order: validation.data.order,
      },
    });

    // Revalidação instantânea do cache da Home pública
    try {
      revalidatePath('/');
    } catch {
      // Ignora erro de revalidação fora de contexto de request Next
    }

    return NextResponse.json({ show: newShow }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro ao cadastrar show';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

