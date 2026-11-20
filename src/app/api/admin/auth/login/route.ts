import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adminLoginSchema } from '@/lib/validation/admin';
import { verifyPassword, hashPassword } from '@/lib/auth/password';
import { setAdminSessionCookie } from '@/lib/auth/session';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: 'Corpo da requisição inválido.' },
        { status: 400 }
      );
    }

    const validation = adminLoginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Dados inválidos.',
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    // Busca o usuário no banco de dados
    let user = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Modo Bootstrap inicial: se o banco ainda não possuir nenhum usuário admin,
    // cria o primeiro admin automaticamente com as credenciais enviadas (facilita o primeiro setup)
    if (!user) {
      const totalAdmins = await prisma.adminUser.count().catch(() => 0);
      if (totalAdmins === 0) {
        const passwordHash = await hashPassword(password);
        user = await prisma.adminUser.create({
          data: {
            email: email.toLowerCase(),
            name: 'Administrador Jojo Mendes',
            passwordHash,
          },
        });
      }
    }

    if (!user) {
      return NextResponse.json(
        { error: 'E-mail ou senha incorretos.' },
        { status: 401 }
      );
    }

    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'E-mail ou senha incorretos.' },
        { status: 401 }
      );
    }

    // Emite cookie de sessão seguro
    await setAdminSessionCookie({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    return NextResponse.json({
      message: 'Login realizado com sucesso.',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro interno do servidor';
    return NextResponse.json(
      { error: 'Erro ao processar login.', details: message },
      { status: 500 }
    );
  }
}

