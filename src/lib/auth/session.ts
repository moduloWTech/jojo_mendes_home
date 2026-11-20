import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, signAdminToken, type AdminSessionPayload } from './jwt';

export const ADMIN_COOKIE_NAME = 'jojo_admin_session';

/**
 * Retorna os dados da sessão a partir dos cookies da requisição.
 */
export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyAdminToken(token);
  } catch {
    return null;
  }
}

/**
 * Auxiliar para verificar autenticação em Route Handlers.
 * Se inválido, retorna uma NextResponse com status 401 e json padronizado.
 */
export async function requireAdminSession(
  request?: NextRequest
): Promise<AdminSessionPayload | NextResponse> {
  let token: string | undefined;

  if (request) {
    token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    // Permite também header Authorization: Bearer <token>
    if (!token) {
      const authHeader = request.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.substring(7).trim();
      }
    }
  }

  if (!token) {
    try {
      const cookieStore = await cookies();
      token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    } catch {
      // Ignora erro se chamado fora do request store do Next.js (ex: em testes de integração)
    }
  }

  if (!token) {
    return NextResponse.json(
      { error: 'Não autorizado. Faça login para continuar.', code: 'UNAUTHORIZED' },
      { status: 401 }
    );
  }

  const session = await verifyAdminToken(token);
  if (!session) {
    return NextResponse.json(
      { error: 'Sessão inválida ou expirada.', code: 'UNAUTHORIZED' },
      { status: 401 }
    );
  }

  return session;
}

/**
 * Cria o cookie de sessão httpOnly e seguro.
 */
export async function setAdminSessionCookie(payload: {
  userId: string;
  email: string;
  name: string;
}): Promise<string> {
  const token = await signAdminToken(payload);
  try {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });
  } catch {
    // Ignora erro se fora do request store
  }

  return token;
}

/**
 * Remove o cookie de sessão para logout.
 */
export async function clearAdminSessionCookie(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_COOKIE_NAME);
  } catch {
    // Ignora erro se fora do request store
  }
}
