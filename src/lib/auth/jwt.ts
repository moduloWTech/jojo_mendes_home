import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

const JWT_SECRET =
  process.env.ADMIN_JWT_SECRET ||
  'jojo-mendes-default-dev-secret-change-in-production-min32chars';
const TOKEN_EXPIRY = '7d';

let cachedKey: CryptoKey | null = null;

async function getSigningKey(): Promise<CryptoKey> {
  if (cachedKey) return cachedKey;
  const rawKey = new TextEncoder().encode(JWT_SECRET);
  cachedKey = await crypto.subtle.importKey(
    'raw',
    rawKey,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
  return cachedKey;
}

export interface AdminSessionPayload extends JWTPayload {
  userId: string;
  email: string;
  name: string;
}

export async function signAdminToken(payload: {
  userId: string;
  email: string;
  name: string;
}): Promise<string> {
  const key = await getSigningKey();
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(key);
}

export async function verifyAdminToken(
  token: string
): Promise<AdminSessionPayload | null> {
  try {
    const key = await getSigningKey();
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
    });
    return payload as AdminSessionPayload;
  } catch {
    return null;
  }
}
