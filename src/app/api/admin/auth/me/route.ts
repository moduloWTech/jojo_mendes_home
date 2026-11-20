import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const authResult = await requireAdminSession(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const user = await prisma.adminUser.findUnique({
    where: { id: authResult.userId },
    select: { id: true, email: true, name: true, createdAt: true },
  });

  if (!user) {
    return NextResponse.json(
      { error: 'Usuário não encontrado.', code: 'NOT_FOUND' },
      { status: 404 }
    );
  }

  return NextResponse.json({ user });
}

