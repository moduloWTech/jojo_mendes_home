import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { hashPassword, verifyPassword } from '@/lib/auth/password';
import { signAdminToken, verifyAdminToken } from '@/lib/auth/jwt';
import { extractYouTubeId, adminShowSchema } from '@/lib/validation/admin';
import { prisma } from '@/lib/prisma';
import { POST as loginHandler } from '@/app/api/admin/auth/login/route';
import { POST as logoutHandler } from '@/app/api/admin/auth/logout/route';
import { GET as meHandler } from '@/app/api/admin/auth/me/route';
import { GET as getShowsHandler, POST as createShowHandler } from '@/app/api/admin/shows/route';
import { POST as createVideoHandler } from '@/app/api/admin/videos/route';
import { GET as publicShowsHandler } from '@/app/api/shows/route';
import { GET as publicGaleriaHandler } from '@/app/api/galeria/route';

describe('MW Technology — Padrões de Autenticação e Segurança da API', () => {
  it('hashPassword e verifyPassword funcionam com criptografia bcrypt', async () => {
    const rawPass = 'SenhaForte123!';
    const hashed = await hashPassword(rawPass);

    expect(hashed).not.toBe(rawPass);
    expect(await verifyPassword(rawPass, hashed)).toBe(true);
    expect(await verifyPassword('SenhaErrada', hashed)).toBe(false);
  });

  it('signAdminToken e verifyAdminToken geram e validam tokens JWT seguros (jose)', async () => {
    const payload = {
      userId: 'user-uuid-123',
      email: 'admin@jojomendes.com.br',
      name: 'Admin Jojo',
    };

    const token = await signAdminToken(payload);
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(20);

    const decoded = await verifyAdminToken(token);
    expect(decoded).not.toBeNull();
    expect(decoded?.userId).toBe(payload.userId);
    expect(decoded?.email).toBe(payload.email);
    expect(decoded?.name).toBe(payload.name);

    const invalid = await verifyAdminToken('token.invalido.falso');
    expect(invalid).toBeNull();
  });
});

describe('MW Technology — Validações Estritas da API Admin', () => {
  it('extractYouTubeId extrai IDs válidos de múltiplos formatos de link', () => {
    expect(extractYouTubeId('dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    expect(extractYouTubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    expect(extractYouTubeId('https://youtu.be/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    expect(extractYouTubeId('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    expect(extractYouTubeId('https://www.youtube.com/shorts/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    expect(extractYouTubeId('https://google.com')).toBeNull();
    expect(extractYouTubeId('curto')).toBeNull();
  });

  it('adminShowSchema rejeita payloads incompletos ou formatos de data inválidos', () => {
    const invalidDate = adminShowSchema.safeParse({
      date: '20-12-2026', // Formato errado (deve ser AAAA-MM-DD)
      city: 'São Luís',
      state: 'MA',
      venue: 'Praça',
    });
    expect(invalidDate.success).toBe(false);

    const validPayload = adminShowSchema.safeParse({
      date: '2026-12-20',
      city: 'São Luís',
      state: 'MA',
      venue: 'Praça Maria Aragão',
      time: '22:00',
      status: 'confirmed',
    });
    expect(validPayload.success).toBe(true);
  });
});

describe('MW Technology — Route Handlers: Autenticação e Sessão', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('POST /api/admin/auth/login retorna 400 se e-mail ou senha forem inválidos', async () => {
    const req = new NextRequest('http://localhost/api/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'invalido', password: '123' }),
    });

    const res = await loginHandler(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Dados inválidos.');
  });

  it('POST /api/admin/auth/login retorna 401 se credenciais não conferirem', async () => {
    vi.spyOn(prisma.adminUser, 'findUnique').mockResolvedValueOnce(null);
    vi.spyOn(prisma.adminUser, 'count').mockResolvedValueOnce(1); // já existem admins

    const req = new NextRequest('http://localhost/api/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@jojomendes.com', password: 'senhaIncorreta123' }),
    });

    const res = await loginHandler(req);
    expect(res.status).toBe(401);
  });

  it('POST /api/admin/auth/logout retorna 200 e limpa sessão', async () => {
    const res = await logoutHandler();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.message).toContain('Desconectado');
  });

  it('GET /api/admin/auth/me retorna 401 se não houver cookie ou token de autorização', async () => {
    const req = new NextRequest('http://localhost/api/admin/auth/me', {
      method: 'GET',
    });

    const res = await meHandler(req);
    expect(res.status).toBe(401);
  });

  it('GET /api/admin/auth/me retorna dados do usuário com Bearer token válido', async () => {
    const token = await signAdminToken({
      userId: 'admin-1',
      email: 'admin@jojo.com',
      name: 'Produtor Oficial',
    });

    vi.spyOn(prisma.adminUser, 'findUnique').mockResolvedValueOnce({
      id: 'admin-1',
      email: 'admin@jojo.com',
      name: 'Produtor Oficial',
      passwordHash: 'hash',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const req = new NextRequest('http://localhost/api/admin/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await meHandler(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.user.email).toBe('admin@jojo.com');
  });
});

describe('MW Technology — Route Handlers: Proteção e CRUD de Shows e Mídia', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('POST /api/admin/shows bloqueia requisição não autenticada com 401', async () => {
    const req = new NextRequest('http://localhost/api/admin/shows', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: '2026-12-20',
        city: 'São Luís',
        state: 'MA',
        venue: 'Praça',
      }),
    });

    const res = await createShowHandler(req);
    expect(res.status).toBe(401);
  });

  it('POST /api/admin/shows cria show e retorna 201 com autenticação válida', async () => {
    const token = await signAdminToken({
      userId: 'admin-1',
      email: 'admin@jojo.com',
      name: 'Admin Jojo',
    });

    vi.spyOn(prisma.show, 'create').mockResolvedValueOnce({
      id: 'show-test-1',
      date: '2026-12-20',
      time: '22:00',
      city: 'São Luís',
      state: 'MA',
      venue: 'Praça Maria Aragão',
      detailsUrl: null,
      status: 'confirmed',
      order: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const req = new NextRequest('http://localhost/api/admin/shows', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        date: '2026-12-20',
        time: '22:00',
        city: 'São Luís',
        state: 'MA',
        venue: 'Praça Maria Aragão',
        status: 'confirmed',
      }),
    });

    const res = await createShowHandler(req);
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.show.id).toBe('show-test-1');
  });

  it('POST /api/admin/videos rejeita links inválidos do YouTube com 400', async () => {
    const token = await signAdminToken({
      userId: 'admin-1',
      email: 'admin@jojo.com',
      name: 'Admin Jojo',
    });

    const req = new NextRequest('http://localhost/api/admin/videos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        youtubeUrlOrId: 'https://site-aleatorio.com/video',
        title: 'Vídeo Inválido',
      }),
    });

    const res = await createVideoHandler(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain('YouTube');
  });
});

describe('MW Technology — Endpoints Públicos com Fallback Resiliente', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('GET /api/shows retorna dados do banco quando disponível', async () => {
    vi.spyOn(prisma.show, 'findMany').mockResolvedValueOnce([
      {
        id: 'show-db-1',
        date: '2026-12-25',
        time: '23:00',
        city: 'Teresina',
        state: 'PI',
        venue: 'Festival',
        detailsUrl: null,
        status: 'confirmed',
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const res = await publicShowsHandler();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.source).toBe('database');
    expect(data.shows[0].city).toBe('Teresina');
  });

  it('GET /api/shows aciona fallback estático se o banco falhar ou estiver vazio', async () => {
    vi.spyOn(prisma.show, 'findMany').mockRejectedValueOnce(new Error('Conexão recusada'));

    const res = await publicShowsHandler();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.source).toBe('static_fallback');
    expect(Array.isArray(data.shows)).toBe(true);
  });

  it('GET /api/galeria respeita estritamente o limite máximo de 8 fotos', async () => {
    const res = await publicGaleriaHandler();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.photos.length).toBeLessThanOrEqual(8);
  });
});

